// CHRIS — Agent 4: Pre-Trip Nurture & Traveler Readiness
// supabase/functions/chris/index.ts
// Trigger: lead status changes to 'booked'
// Milestone emails tied to departure_date:
//   Step 0: Immediately on booking ("You're booked!")
//   Step 1: 4 months out
//   Step 2: 2 months out
//   Step 3: 1 month out
//   Step 4: 1 week out
// POST { lead_id }      — schedule nurture sequence
// POST { run_due:true } — process due milestones (pg_cron daily @ 9am)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPA_URL      = Deno.env.get('SUPABASE_URL') ?? '';
const SUPA_SVC      = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const RESEND_KEY    = Deno.env.get('RESEND_API_KEY') ?? '';
const ANTHROPIC_KEY = Deno.env.get('ANTHROPIC_API_KEY') ?? '';
const AGENT_SECRET  = Deno.env.get('CW_AGENT_SECRET') ?? '';
const CORS = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };

const MILESTONES = [
  { step: 0, days_before_departure: null, label: 'Booking Confirmation' },
  { step: 1, days_before_departure: 120,  label: '4 Months Out' },
  { step: 2, days_before_departure: 60,   label: '2 Months Out' },
  { step: 3, days_before_departure: 30,   label: '1 Month Out' },
  { step: 4, days_before_departure: 7,    label: '1 Week Out' },
];

async function claudeNurtureEmail(step: number, lead: any, daysOut: number | null): Promise<{ subject: string; html: string }> {
  const dept = lead.departure_date
    ? new Date(lead.departure_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'your departure date';

  const stepContext = [
    `BOOKING CONFIRMATION — sent immediately after booking. Goal: celebrate, confirm key trip details, set expectations, make them feel taken care of. Include: warm congratulations, trip summary, what Crestwell handles, next step. Tone: celebratory, warm, confident.`,
    `4 MONTHS OUT milestone. Goal: keep excitement high, share 2-3 destination-specific tips, prompt passport/document check. Include: destination spotlight, practical tip for their trip type, passport expiration reminder (6 months beyond travel). Tone: excited travel advisor.`,
    `2 MONTHS OUT milestone. Goal: get them organized on logistics. Include: documents checklist (passport, travel insurance, visas), 2-3 excursion/activity recommendations for their destination, reminder Tim can arrange extras. Tone: organized, helpful.`,
    `1 MONTH OUT countdown. Goal: build excitement, ensure full preparation. Include: packing checklist for their trip type, travel insurance reminder (urgent if not yet purchased), arrival/embarkation tips, Tim's direct line. Tone: warm urgency.`,
    `1 WEEK OUT — final pre-departure email. Goal: get them over the finish line feeling 100% ready. Include: final checklist (docs, confirmations, notify bank, download apps, charge devices), what to expect at check-in, Tim's direct cell for day-of questions, genuine personal send-off. Tone: warm, personal, excited for them.`,
  ][step];

  const prompt = `You are Tim Crestwell, owner of Crestwell Travel Services — SE US travel agency (cruises, all-inclusive, group travel in GA, TN, AL).
Write a pre-trip nurture email to a booked traveler. Return ONLY valid JSON: {"subject": "...", "body": "..."}
Rules: body uses only HTML <p> and <ul>/<li> tags. Subject is specific and exciting. Sign off as Tim Crestwell 888.508.6893. No AI/automation mentions. Use actual traveler data. Make them feel like your most valued client.
MILESTONE: ${stepContext}
TRAVELER: ${lead.first_name} ${lead.last_name} | ${lead.destination||'your destination'} | ${lead.trip_type||'travel'} | Departure: ${dept} | ${lead.travelers_adults||2} adults${(lead.travelers_children||0)>0?`, ${lead.travelers_children} children`:''} | Days out: ${daysOut!==null?daysOut:'just booked'} | Summary: ${lead.ai_summary||''}`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 800, messages: [{ role: 'user', content: prompt }] }),
    });
    const raw = ((await res.json()).content?.[0]?.text ?? '{}').replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(raw);
    return {
      subject: parsed.subject ?? `Your ${lead.destination||'trip'} — ${MILESTONES[step].label}`,
      html: wrapEmail(parsed.body ?? `<p>Hi ${lead.first_name}, excited for your upcoming trip! — Tim</p>`, step, lead),
    };
  } catch (e) {
    console.error('Chris Claude error step', step, ':', e);
    return {
      subject: `Your ${lead.destination||'trip'} — ${MILESTONES[step].label}`,
      html: wrapEmail(getFallback(step, lead, dept), step, lead),
    };
  }
}

function getFallback(step: number, lead: any, dept: string): string {
  const n = lead.first_name, d = lead.destination||'your destination';
  return ({
    0: `<p>Hi ${n},</p><p>Your trip to <strong>${d}</strong> is officially booked — congratulations! I am honored to be your travel advisor for this one.</p><p>I will be in touch as your departure approaches with tips, checklists, and everything you need to travel with confidence. Reach out anytime.</p><p>Tim Crestwell<br/>888.508.6893</p>`,
    1: `<p>Hi ${n},</p><p>Four months until ${d} — the countdown is on! Now is a great time to confirm your passport is valid at least 6 months beyond your travel date and start a packing list.</p><p>Tim Crestwell<br/>888.508.6893</p>`,
    2: `<p>Hi ${n},</p><p>Two months out! Quick checklist: passport valid, travel insurance in place, and start thinking about excursions at ${d}. I can help arrange any extras — just ask.</p><p>Tim Crestwell<br/>888.508.6893</p>`,
    3: `<p>Hi ${n},</p><p>One month until ${d}! Time to finalize your packing list and confirm all documents are in order. If you haven't purchased travel insurance yet, now is the time.</p><p>Tim Crestwell<br/>888.508.6893</p>`,
    4: `<p>Hi ${n},</p><p>One week away! Pack your documents, notify your bank, download any apps you need — ${d} is almost here. I am available day-of at 888.508.6893. Have an incredible trip!</p><p>Tim Crestwell<br/>888.508.6893</p>`,
  } as Record<number,string>)[step] ?? '';
}

function wrapEmail(body: string, step: number, lead: any): string {
  const label = MILESTONES[step]?.label ?? 'Trip Update';
  const dept = lead.departure_date
    ? new Date(lead.departure_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';
  return `<!DOCTYPE html><html><body>
<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#0d1b2a">
  <div style="background:#0d1b2a;padding:20px 32px;display:flex;justify-content:space-between;align-items:center">
    <span style="color:#c9a84c;font-size:1.1rem;font-weight:300;letter-spacing:0.05em">Crestwell Travel Services</span>
    <span style="background:#c9a84c22;border:1px solid #c9a84c;color:#c9a84c;font-family:sans-serif;font-size:0.65rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:3px 10px">${label}</span>
  </div>
  ${dept ? `<div style="background:#c9a84c;padding:10px 32px;text-align:center"><p style="font-family:sans-serif;font-size:0.8rem;font-weight:700;color:#0d1b2a;margin:0;letter-spacing:0.05em">${(lead.destination||'YOUR TRIP').toUpperCase()} · ${dept}</p></div>` : ''}
  <div style="padding:36px 32px;background:#faf8f3;line-height:1.8;font-size:0.95rem">${body}</div>
  <div style="background:#f0ede6;padding:16px 32px;border-top:1px solid #e2d9c8">
    <p style="font-family:sans-serif;font-size:0.7rem;color:#94a3b8;margin:0">
      You are receiving this as a valued Crestwell Travel client.<br/>
      Questions? Reply here or call Tim directly at 888.508.6893.
    </p>
  </div>
  <div style="background:#0d1b2a;padding:16px 32px;text-align:center">
    <p style="color:rgba(255,255,255,0.35);font-family:sans-serif;font-size:0.7rem;margin:0">
      Chris (Agent 4) · Crestwell AI · <a href="https://crestwellgetaways.com" style="color:#c9a84c">crestwellgetaways.com</a>
    </p>
  </div>
</div>
</body></html>`;
}

async function scheduleNurture(db: any, lead: any): Promise<{ scheduled: number; skipped_steps: number[] }> {
  if (lead.status !== 'booked') {
    console.log(`Chris: skip — ${lead.email} status is ${lead.status}`);
    return { scheduled: 0, skipped_steps: [] };
  }
  const { data: existing } = await db.from('trip_nurture_log').select('id').eq('lead_id', lead.id).limit(1);
  if (existing?.length) { console.log(`Chris: already scheduled for ${lead.email}`); return { scheduled: 0, skipped_steps: [] }; }

  const now = new Date();
  const departure = lead.departure_date ? new Date(lead.departure_date) : null;
  const rows: any[] = [], skipped: number[] = [];

  for (const { step, days_before_departure, label } of MILESTONES) {
    let scheduled_at: string;
    if (step === 0) {
      scheduled_at = now.toISOString();
    } else if (departure && days_before_departure !== null) {
      const sendDate = new Date(departure);
      sendDate.setDate(sendDate.getDate() - days_before_departure);
      if (sendDate <= now) { skipped.push(step); continue; }
      scheduled_at = sendDate.toISOString();
    } else { if (step > 0) { skipped.push(step); continue; } scheduled_at = now.toISOString(); }
    rows.push({ lead_id: lead.id, step, label, scheduled_at, status: 'pending' });
  }

  if (!rows.length) return { scheduled: 0, skipped_steps: skipped };
  const { error } = await db.from('trip_nurture_log').insert(rows);
  if (error) { console.error('Chris schedule error:', error.message); return { scheduled: 0, skipped_steps: skipped }; }
  console.log(`Chris: scheduled ${rows.length} nurture steps for ${lead.email}`);
  return { scheduled: rows.length, skipped_steps: skipped };
}

async function sendNurture(db: any, entry: any, lead: any): Promise<boolean> {
  const daysOut = lead.departure_date
    ? Math.ceil((new Date(lead.departure_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  const { subject, html } = await claudeNurtureEmail(entry.step, lead, daysOut);
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from:'Tim at Crestwell <tim@crestwellgetaways.com>', to:lead.email, reply_to:'info@crestwellgetaways.com', subject, html }),
  });
  const emailData = await emailRes.json();
  if (!emailRes.ok) { console.error(`Chris Resend error step ${entry.step}:`, JSON.stringify(emailData)); return false; }
  await db.from('trip_nurture_log').update({ status:'sent', sent_at:new Date().toISOString(), resend_id:emailData.id }).eq('id', entry.id);
  console.log(`Chris ✓ step ${entry.step} (${entry.label}) -> ${lead.email}`);
  return true;
}

async function processDue(db: any): Promise<{ processed: number; sent: number; skipped: number }> {
  const { data: due, error } = await db
    .from('trip_nurture_log').select('*, quote_requests(*)')
    .eq('status', 'pending').lte('scheduled_at', new Date().toISOString())
    .order('scheduled_at', { ascending: true }).limit(50);
  if (error) { console.error('Chris processDue error:', error.message); return { processed:0, sent:0, skipped:0 }; }
  if (!due?.length) { console.log('Chris: no due nurture emails'); return { processed:0, sent:0, skipped:0 }; }
  let sent = 0, skipped = 0;
  for (const entry of due) {
    const lead = entry.quote_requests;
    if (!lead || lead.status !== 'booked') {
      await db.from('trip_nurture_log').update({ status: 'skipped' }).eq('id', entry.id);
      skipped++; continue;
    }
    const ok = await sendNurture(db, entry, lead);
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
    const result = await scheduleNurture(db, lead);
    return new Response(JSON.stringify({ ...result, agent:'Chris' }), { headers: CORS });
  }
  if (body.run_due) {
    const result = await processDue(db);
    return new Response(JSON.stringify({ ...result, agent:'Chris' }), { headers: CORS });
  }
  return new Response(JSON.stringify({ error: 'lead_id or run_due required' }), { status: 400, headers: CORS });
});
