// supabase/functions/qualify-lead/index.ts
// Accepts { lead_id } OR { email, submitted_at }
// Scores with Claude, updates DB, emails Tim, kicks off follow-up sequence
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const AGENT_SECRET  = Deno.env.get('CW_AGENT_SECRET') ?? '';
const ANTHROPIC_KEY = Deno.env.get('ANTHROPIC_API_KEY') ?? '';
const SUPA_URL      = Deno.env.get('SUPABASE_URL') ?? '';
const SUPA_SVC      = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const RESEND_KEY    = Deno.env.get('RESEND_API_KEY') ?? '';
const CORS = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
const STAGE_COLOR: Record<string,string> = { 'Qualified':'#22c55e','Quote Needed':'#f59e0b','Call Needed':'#f97316' };

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: CORS });

  const secret = req.headers.get('x-agent-secret') ?? '';
  if (AGENT_SECRET && secret !== AGENT_SECRET)
    return new Response('Unauthorized', { status: 401, headers: CORS });

  const body = await req.json().catch(() => ({}));
  const { lead_id, email, submitted_at } = body;

  if (!lead_id && !email)
    return new Response(JSON.stringify({ error: 'lead_id or email required' }), { status: 400, headers: CORS });

  const db = createClient(SUPA_URL, SUPA_SVC);
  let lead: any = null;

  if (lead_id) {
    const { data } = await db.from('quote_requests').select('*').eq('id', lead_id).single();
    lead = data;
  }
  if (!lead && email) {
    const since = submitted_at
      ? new Date(new Date(submitted_at).getTime() - 15000).toISOString()
      : new Date(Date.now() - 180000).toISOString();
    console.log('Email lookup:', email, 'since:', since);
    const { data } = await db
      .from('quote_requests').select('*')
      .eq('email', email)
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(1).maybeSingle();
    lead = data;
  }

  if (!lead)
    return new Response(JSON.stringify({ error: 'Lead not found', lead_id, email }), { status: 404, headers: CORS });

  console.log('Lead:', lead.first_name, lead.last_name, lead.email);

  // Score with Claude
  let score = 50, stage = 'Quote Needed', ai_used = false;
  let summary = `${lead.first_name} ${lead.last_name} — ${lead.trip_type||'travel'} to ${lead.destination||'unspecified'}`;
  let tags: string[] = [], next_action = `Reply to ${lead.email}`, wants_financing = false;

  if (ANTHROPIC_KEY) {
    try {
      const prompt = `Lead qualification for Crestwell Travel (SE US: cruises, all-inclusive, group travel).
Return ONLY valid JSON: {"score":<1-100>,"stage":"Qualified|Quote Needed|Call Needed","summary":"<one sentence>","tags":["tag1"],"next_action":"<one sentence>","wants_financing":<boolean>}
Scoring: 80+=ready to quote. 60-79=missing details. 40-59=vague. Call Needed=group10+/luxury/financing.
Lead: ${lead.first_name} ${lead.last_name} | ${lead.email} | ${lead.phone||'no phone'}
${lead.trip_type||'?'} to ${lead.destination||'?'} | Depart: ${lead.departure_date||'flexible'} | Adults: ${lead.travelers_adults||'?'} | Budget: ${lead.budget||'?'}
Message: ${lead.message||'none'}`;

      const ai = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type':'application/json','x-api-key':ANTHROPIC_KEY,'anthropic-version':'2023-06-01' },
        body: JSON.stringify({ model:'claude-haiku-4-5-20251001', max_tokens:300, messages:[{role:'user',content:prompt}] }),
      });
      const q = JSON.parse(((await ai.json()).content?.[0]?.text??'{}').replace(/```json|```/g,'').trim());
      score=q.score??score; stage=q.stage??stage; summary=q.summary??summary;
      tags=q.tags??tags; next_action=q.next_action??next_action; wants_financing=q.wants_financing??false;
      ai_used = true;
      console.log('Claude:', stage, score);
    } catch(e) { console.error('Claude:', e); }
  }

  // Update DB
  let db_updated = false;
  const { error: updateErr } = await db.from('quote_requests').update({
    status: stage==='Qualified'?'qualified':'new',
    ai_score: score, ai_stage: stage, ai_summary: summary,
    ai_tags: tags, ai_next_action: next_action,
    ai_processed_at: new Date().toISOString(), wants_financing,
  }).eq('id', lead.id);
  if (updateErr) console.error('DB update:', updateErr.message);
  else { db_updated = true; lead = { ...lead, ai_stage: stage, ai_score: score, ai_summary: summary, wants_financing }; }

  // Email Tim
  let email_id: string|undefined;
  if (RESEND_KEY) {
    const color = STAGE_COLOR[stage]||'#94a3b8';
    const bar = '█'.repeat(Math.round(score/5))+'░'.repeat(20-Math.round(score/5));
    const emailRes = await fetch('https://api.resend.com/emails', {
      method:'POST',
      headers:{ 'Authorization':`Bearer ${RESEND_KEY}`,'Content-Type':'application/json' },
      body: JSON.stringify({
        from:'Crestwell AI <noreply@crestwellgetaways.com>',
        to:'info@crestwellgetaways.com',
        subject:`[${stage}] ${lead.first_name} ${lead.last_name} — Score ${score}/100`,
        html:`<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#0d1b2a"><div style="background:#0d1b2a;padding:28px 32px"><h1 style="color:#c9a84c;font-weight:300;font-size:1.4rem;margin:0 0 8px">New Lead — AI Qualified</h1><span style="background:${color}22;border:1px solid ${color};padding:4px 14px;color:${color};font-family:sans-serif;font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase">${stage}${ai_used?'':' (default)'}</span></div><div style="background:#faf8f3;padding:32px"><div style="padding:20px;background:white;border-left:3px solid #c9a84c;margin-bottom:20px"><div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-family:sans-serif;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;color:#94a3b8">Lead Quality Score</span><strong style="font-family:sans-serif;font-size:1.1rem;color:#0d1b2a">${score}<span style="font-size:0.75rem;color:#94a3b8">/100</span></strong></div><div style="font-family:monospace;font-size:0.75rem;color:${color};letter-spacing:-1px">${bar}</div><p style="font-family:sans-serif;font-size:0.85rem;color:#374151;margin:10px 0 0;font-style:italic">${summary}</p></div><div style="padding:14px 18px;background:${color}11;border:1px solid ${color}33;margin-bottom:20px"><p style="font-family:sans-serif;font-size:0.65rem;letter-spacing:0.14em;text-transform:uppercase;color:#94a3b8;margin:0 0 4px">Recommended Next Action</p><p style="font-family:sans-serif;font-size:0.9rem;color:#0d1b2a;font-weight:500;margin:0">${next_action}</p></div><table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:0.85rem;margin-bottom:20px">${([["Name",`${lead.first_name} ${lead.last_name}`],["Email",lead.email],["Phone",lead.phone||"—"],["Trip",lead.trip_type||"—"],["Destination",lead.destination||"—"],["Dates",lead.departure_date||"Flexible"],["Travelers",`${lead.travelers_adults||2} adult(s), ${lead.travelers_children||0} child(ren)`],["Budget",lead.budget||"—"],["Financing",wants_financing?"✓ Interested":"No"],["Tags",tags.join(', ')||"—"]] as [string,string][]).map(([l,v])=>`<tr style="border-bottom:1px solid #e2e8f0"><td style="padding:8px 0;color:#64748b;width:35%">${l}</td><td style="padding:8px 0;color:#0d1b2a">${v}</td></tr>`).join('')}${lead.message?`<tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Message</td><td style="padding:8px 0;color:#0d1b2a">${lead.message}</td></tr>`:""}</table><div style="display:flex;gap:12px;flex-wrap:wrap"><a href="mailto:${lead.email}?subject=Re: Your Crestwell Travel Inquiry" style="background:#c9a84c;color:#0d1b2a;padding:12px 24px;text-decoration:none;font-family:sans-serif;font-size:0.8rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase">Reply to ${lead.first_name}</a>${lead.phone?`<a href="tel:${lead.phone}" style="background:#0d1b2a;color:white;padding:12px 24px;text-decoration:none;font-family:sans-serif;font-size:0.8rem;font-weight:600;border:1px solid rgba(255,255,255,0.2)">Call ${lead.first_name}</a>`:""}</div></div><div style="background:#0d1b2a;padding:14px 32px;text-align:center"><p style="color:rgba(255,255,255,0.3);font-size:0.7rem;font-family:sans-serif;margin:0">Crestwell AI Agent · ${new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</p></div></div>`,
      }),
    });
    const ed = await emailRes.json();
    email_id = ed.id;
    console.log('Email sent:', email_id);
  }

  // Kick off follow-up sequence (Qualified only — gated inside lead-followup)
  fetch(`${SUPA_URL}/functions/v1/lead-followup`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json', 'x-agent-secret': AGENT_SECRET },
    body: JSON.stringify({ lead_id: lead.id }),
  }).catch(e => console.error('Sequence error:', e));

  return new Response(
    JSON.stringify({ success:true, score, stage, ai_used, db_updated, email_id }),
    { headers: CORS }
  );
});
