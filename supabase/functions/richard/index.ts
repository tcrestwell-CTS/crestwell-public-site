// RICHARD — Agent 2: Follow-up Sequence
// supabase/functions/richard/index.ts
// Qualified leads only. Claude generates every email fresh.
// POST { lead_id }      — schedule 5-step sequence
// POST { run_due:true } — process due steps (pg_cron hourly)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPA_URL      = Deno.env.get('SUPABASE_URL') ?? '';
const SUPA_SVC      = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const RESEND_KEY    = Deno.env.get('RESEND_API_KEY') ?? '';
const ANTHROPIC_KEY = Deno.env.get('ANTHROPIC_API_KEY') ?? '';
const AGENT_SECRET  = Deno.env.get('CW_AGENT_SECRET') ?? '';
const CORS = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };

const STEPS = [
  { step: 0, delay_days: 0  },
  { step: 1, delay_days: 2  },
  { step: 2, delay_days: 5  },
  { step: 3, delay_days: 10 },
  { step: 4, delay_days: 21 },
];

const STOP_STATUSES = ['booked', 'declined', 'do_not_contact'];

async function claudeEmail(step: number, lead: any): Promise<{ subject: string; html: string }> {
  const stepContext = [
    `FIRST email — submitted minutes ago. Goal: warm welcome, acknowledge their specific trip, clear next step. Be the expert friend who knows travel.`,
    `2-DAY follow-up. No reply yet. Goal: gentle nudge under 100 words. Reference a specific trip detail.`,
    `5-DAY follow-up. Still no reply. Goal: add value — one specific insight for their destination/trip type.`,
    `10-DAY follow-up. Goal: brief and honest. Easy out OR easy yes. Under 80 words.`,
    `FINAL follow-up at 21 days. Goal: close gracefully, leave door open. Under 80 words. Warm and human.`,
  ][step];

  const prompt = `You are Tim Crestwell, owner of Crestwell Travel Services — SE US travel agency (cruises, all-inclusive, group travel).
Write a follow-up email to a qualified lead. Return ONLY valid JSON: {"subject": "...", "body": "..."}
Rules: body uses only HTML <p> tags. Subject is trip-specific. Sign off as Tim Crestwell 888.508.6893. No AI/automation mentions. Use actual data.
STEP: ${stepContext}
LEAD: ${lead.first_name} ${lead.last_name} | ${lead.trip_type||'travel'} to ${lead.destination||'open'} | ${lead.departure_date||'flexible'} | ${lead.travelers_adults||2} adults | Budget: ${lead.budget||'?'} | Message: ${lead.message||'none'} | Summary: ${lead.ai_summary||''}`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 600, messages: [{ role: 'user', content: prompt }] }),
    });
    const raw = ((await res.json()).content?.[0]?.text ?? '{}').replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(raw);
    return {
      subject: parsed.subject ?? `Following up — ${lead.destination || 'your trip'}`,
      html: wrapEmail(parsed.body ?? `<p>Hi ${lead.first_name}, just following up. Reply anytime — Tim</p>`),
    };
  } catch (e) {
    console.error('Richard Claude error:', e);
    return {
      subject: `Following up — ${lead.destination || 'your trip'}`,
      html: wrapEmail(`<p>Hi ${lead.first_name}, just checking in on your ${lead.destination||'travel'} inquiry. Reply whenever you're ready.</p><p>Tim Crestwell<br/>888.508.6893</p>`),
    };
  }
}

function wrapEmail(body: string): string {
  return `<!DOCTYPE html><html><body>
<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#0d1b2a">
  <div style="background:#0d1b2a;padding:20px 32px">
    <span style="color:#c9a84c;font-size:1.1rem;font-weight:300;letter-spacing:0.05em">Crestwell Travel Services</span>
  </div>
  <div style="padding:36px 32px;background:#faf8f3;line-height:1.8;font-size:0.95rem">${body}</div>
  <div style="background:#f0ede6;padding:16px 32px;border-top:1px solid #e2d9c8">
    <p style="font-family:sans-serif;font-size:0.7rem;color:#94a3b8;margin:0">
      You received this because you submitted a travel inquiry at crestwellgetaways.com.<br/>
      To stop receiving follow-ups, reply with "stop".
    </p>
  </div>
  <div style="background:#0d1b2a;padding:16px 32px;text-align:center">
    <p style="color:rgba(255,255,255,0.35);font-family:sans-serif;font-size:0.7rem;margin:0">
      Richard (Agent 2) · Crestwell AI · <a href="https://crestwellgetaways.com" style="color:#c9a84c">crestwellgetaways.com</a>
    </p>
  </div>
</div>
</body></html>`;
}

async function scheduleSequence(db: any, lead: any): Promise<{ scheduled: number }> {
  if (lead.ai_stage !== 'Qualified') {
    console.log(`Richard: skip — ${lead.email} is ${lead.ai_stage}`);
    return { scheduled: 0 };
  }
  if (lead.sequence_started) {
    console.log(`Richard: already started for ${lead.email}`);
    return { scheduled: 0 };
  }
  const now = new Date();
  const rows = STEPS.map(({ step, delay_days }) => ({
    lead_id: lead.id, step,
    scheduled_at: new Date(now.getTime() + delay_days * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
  }));
  const { error } = await db.from('lead_followups').insert(rows);
  if (error) { console.error('Richard schedule error:', error.message); return { scheduled: 0 }; }
  await db.from('quote_requests').update({ sequence_started: true }).eq('id', lead.id);
  console.log(`Richard: scheduled ${rows.length} steps for ${lead.email}`);
  return { scheduled: rows.length };
}

async function sendFollowup(db: any, followup: any, lead: any): Promise<boolean> {
  if (STOP_STATUSES.includes(lead.status) || lead.sequence_paused) {
    await db.from('lead_followups').update({ status: 'skipped' }).eq('id', followup.id);
    return false;
  }
  const { subject, html } = await claudeEmail(followup.step, lead);
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from:'Tim at Crestwell <tim@crestwellgetaways.com>', to:lead.email, reply_to:'info@crestwellgetaways.com', subject, html }),
  });
  const emailData = await emailRes.json();
  if (!emailRes.ok) { console.error(`Richard Resend error step ${followup.step}:`, JSON.stringify(emailData)); return false; }
  await db.from('lead_followups').update({ status:'sent', sent_at:new Date().toISOString(), resend_id:emailData.id }).eq('id', followup.id);
  console.log(`Richard ✓ step ${followup.step} -> ${lead.email}`);
  return true;
}

async function processDue(db: any): Promise<{ processed: number; sent: number; skipped: number }> {
  const { data: due, error } = await db
    .from('lead_followups').select('*, quote_requests(*)')
    .eq('status', 'pending').lte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true }).limit(50);
  if (error) { console.error('Richard processDue error:', error.message); return { processed:0, sent:0, skipped:0 }; }
  if (!due?.length) { console.log('Richard: no due followups'); return { processed:0, sent:0, skipped:0 }; }
  let sent = 0, skipped = 0;
  for (const followup of due) {
    const lead = followup.quote_requests;
    if (!lead) { skipped++; continue; }
    const ok = await sendFollowup(db, followup, lead);
    if (ok) sent++; else skipped++;
    await new Promise(r => setTimeout(r, 300));
  }
  return { processed: due.length, sent, skipped };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: CORS });
  const secret = req.headers.get('x-agent-secret') ?? '';
  if (AGENT_SECRET && secret !== AGENT_SECRET) return new Response('Unauthorized', { status: 401, headers: CORS });
  const body = await req.json().catch(() => ({}));
  const db = createClient(SUPA_URL, SUPA_SVC);
  if (body.lead_id) {
    const { data: lead } = await db.from('quote_requests').select('*').eq('id', body.lead_id).single();
    if (!lead) return new Response(JSON.stringify({ error: 'Lead not found' }), { status: 404, headers: CORS });
    const result = await scheduleSequence(db, lead);
    return new Response(JSON.stringify({ ...result, agent:'Richard' }), { headers: CORS });
  }
  if (body.run_due) {
    const result = await processDue(db);
    return new Response(JSON.stringify({ ...result, agent:'Richard' }), { headers: CORS });
  }
  return new Response(JSON.stringify({ error: 'lead_id or run_due required' }), { status: 400, headers: CORS });
});
