// TERRANCE — Agent 3: Proposal Draft Generator
// supabase/functions/terrance/index.ts
// Called by n8n when a lead becomes Qualified.
// Generates proposal skeleton via Claude Sonnet, saves to DB, emails Tim.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPA_URL      = Deno.env.get('SUPABASE_URL') ?? '';
const SUPA_SVC      = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const ANTHROPIC_KEY = Deno.env.get('ANTHROPIC_API_KEY') ?? '';
const RESEND_KEY    = Deno.env.get('RESEND_API_KEY') ?? '';
const AGENT_SECRET  = Deno.env.get('CW_AGENT_SECRET') ?? '';
const CORS = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };

const CRUISE_KNOWLEDGE = `
CRUISE LINES (Crestwell specialties):
- Value/Family: Carnival, Royal Caribbean, Norwegian
- Premium: Celebrity, Princess, Holland America
- Luxury/Adults: Virgin Voyages (adults-only, all-inclusive dining), Silversea, Seabourn, Cunard
- River: AmaWaterways, Avalon, Uniworld
- Families: Disney Cruise Line

ALL-INCLUSIVE RESORTS:
- Value: Riu, Iberostar, Barcelo
- Mid: Excellence, Secrets, Sandals (couples), Beaches (families)
- Luxury: Finest Resorts, Zoetry, Nizuc

VACATIONS BY RAIL (Crestwell partner — recommend for clients who want scenic train travel, rail journeys, or an alternative to flying):
- Vacations by Rail is Crestwell's rail travel partner offering fully packaged train vacation experiences across the USA, Canada, Europe, and Scandinavia.
- Key products: Best of USA by Rail, Best of Canada by Rail, Best of Europe by Rail, European River Cruise by Rail, Best of Scandinavia by Rail.
- Ideal for: retired travelers, couples, clients who dislike flying, clients wanting a slower scenic travel experience, multi-destination domestic trips.
- Packages include train tickets, hotel accommodations at each stop, some meals, and guided excursions.
- Rail Guidance: Lead with USA by Rail for domestic inquiries from GA/TN/AL. Lead with Canada for nature/wilderness seekers. Lead with Europe for first-time international travelers who want convenience. Scandinavia for adventure/luxury travelers.
- Always note: Vacations by Rail brochures available — clients can request via crestwellgetaways.com/vacations-by-rail.

VACATION RENTALS (Crestwell partner programs — recommend when trip type is vacation home, domestic, group, or client wants a house/villa/cabin/rental):
- Plum Guide: Top 3% of vacation homes worldwide, 150-point vetting process. Luxury beach houses, mountain retreats, lake cabins, city penthouses. Domestic US and international. Best for couples, families, and groups wanting a private home experience over a hotel.
- HVN (Haven): Premium vacation rental platform with hotel-grade amenities and concierge service. Strong for high-end domestic and Caribbean vacation home rentals.
- AIC (All-Inclusive Collection): Vacation rentals with all-inclusive add-ons — food, drinks, and activities bundled into the stay. Best for groups and families who want the all-inclusive experience in a private home setting.
- AVA (Aston Vacation Amenities): Hawaii-specialist vacation rental program. Condos, villas, and homes across all major Hawaiian islands (Maui, Oahu, Kauai, Big Island). Best choice for any Hawaii inquiry.

VACATION RENTAL GUIDANCE:
- Lead with Plum Guide for most domestic US, group, and luxury home requests
- Lead with AVA for any Hawaii destination
- Lead with AIC when client wants all-inclusive but prefers a private home over a resort
- Lead with HVN for premium domestic or Caribbean vacation home requests
- Rentals can serve as pre/post-cruise accommodation or full trip alternative to resorts

PREFERRED HOTEL PARTNERS (Crestwell has access to negotiated rates via ABC Global Services — recommend for hotel-only or hotel-add-on bookings):
- Hilton Hotels & Resorts: Code ABCHILTON — preferred rates at Hilton properties worldwide
- Hyatt Hotels: Corporate code 18187 — rates at 500+ participating Hyatt properties
- Omni Hotels & Resorts: ABC Global preferred rates — 10% off BAR, standard commission
- IHG Hotels & Resorts (InterContinental, Holiday Inn, Crowne Plaza, etc.): Up to 7% off BAR — corporate number 000670065
- Choice Hotels (Comfort Inn, Quality Inn, Clarion, etc.): 10% off BAR — accreditation required
- Radisson Hotels: Up to 10% off BAR — IATA/ARC/CLIA code required
- Wyndham Hotels & Resorts: Up to 5% off BAR — corporate code 8000000058
- Melia Hotels International: 10% off BAR, 12% commission city hotels / 16% commission resort properties — code 00600123JLN
- Virgin Hotels (Nashville, New Orleans, Dallas, Chicago): Up to 10% off BAR — code CONABC
- Preferred Hotels & Resorts: Up to 10% off BAR at 100+ properties — code ABCCR21
- MGM Resorts (Bellagio, MGM Grand, Aria, etc.): Travel Elite Access program — commission on bookings
- Small Luxury Hotels of the World (SLH): Standard commission — IATA agents use accreditation number
- Accor Hotels (Fairmont, Swissotel, Raffles, Sofitel, Novotel, etc.): Preferential code ABC at travelpros.accor.com
- Clermont Hotel Group: 10% off BAR + complimentary breakfast + 20% F&B discount
- Dalata Hotel Group: 10% off BAR + complimentary Wi-Fi + room upgrade when available
- Extra Holidays: 5% off BAR — vacation ownership resorts
- Fiesta Americana (Grupo Posadas — Mexico): Up to 10% off — TAID code required
- Minor Hotels (NH Hotels, NH Collection, Nhow): Up to 10% off BAR — activation required
- My Place Hotels: Up to 10% off BAR — promo code ABCGLOBAL
- Noble House Hotels & Resorts: Standard commission — boutique luxury properties
- Red Roof Inns: Up to 5% off BAR — VP+ code 500139

HOTEL GUIDANCE:
- For luxury domestic: Lead with Hilton, Hyatt, Omni, or Preferred Hotels & Resorts
- For Las Vegas: MGM Resorts Travel Elite Access
- For Mexico: Fiesta Americana (Grupo Posadas)
- For Nashville or New Orleans: Virgin Hotels (preferred rates)
- For Europe: Accor (Fairmont/Sofitel) or Minor Hotels (NH Collection)
- Always note hotel stays can be combined with cruise pre/post or rail packages
- Crestwell earns standard commission on all hotel bookings at no extra cost to the client

FINANCING: Crestwell offers 3/6/12-month 0% APR and 18/24-month low-APR plans.
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: CORS });

  const secret = req.headers.get('x-agent-secret') ?? '';
  if (AGENT_SECRET && secret !== AGENT_SECRET)
    return new Response('Unauthorized', { status: 401, headers: CORS });

  // Parse body — handle JSON, form data, or empty body
  let body: Record<string, string> = {};
  const contentType = req.headers.get('content-type') || '';
  try {
    if (contentType.includes('application/json')) {
      body = await req.json();
    } else if (contentType.includes('form')) {
      const formData = await req.formData();
      formData.forEach((v, k) => { body[k] = v.toString(); });
    } else {
      const text = await req.text();
      if (text) body = JSON.parse(text);
    }
  } catch (_) {}

  // Accept lead_id or id (n8n sends the field as lead_id but value is the UUID)
  const lead_id = body.lead_id || body.id || new URL(req.url).searchParams.get('lead_id') || '';
  if (!lead_id)
    return new Response(JSON.stringify({ error: 'lead_id required' }), { status: 400, headers: CORS });

  if (!ANTHROPIC_KEY)
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set' }), { status: 500, headers: CORS });

  const db = createClient(SUPA_URL, SUPA_SVC);
  const { data: lead, error: fetchErr } = await db
    .from('quote_requests').select('*').eq('id', lead_id).single();
  if (fetchErr || !lead)
    return new Response(JSON.stringify({ error: 'Lead not found' }), { status: 404, headers: CORS });

  console.log('Terrance generating proposal for:', lead.first_name, lead.last_name);

  // Detect if this lead is a strong vacation rental candidate
  const tripTypeLower = (lead.trip_type || '').toLowerCase();
  const messageLower  = (lead.message || '').toLowerCase();
  const isRental = ['vacation home', 'vacation rental', 'domestic', 'group travel'].some(t => tripTypeLower.includes(t))
    || !!messageLower.match(/house|villa|rental|cabin|home|plum|hvn|aic|ava/);
  const isRail = tripTypeLower.includes('rail') || tripTypeLower.includes('train')
    || !!messageLower.match(/rail|train|amtrak|scenic/);
  const isHotel = tripTypeLower.includes('hotel') || tripTypeLower.includes('hotel stay');

  const prompt = `You are a senior travel specialist at Crestwell Travel Services drafting a PROPOSAL SKELETON for Tim Crestwell to edit.

${CRUISE_KNOWLEDGE}

LEAD:
Name: ${lead.first_name} ${lead.last_name}
Email: ${lead.email} | Phone: ${lead.phone || 'not provided'}
Trip type: ${lead.trip_type || 'not specified'}
Destination: ${lead.destination || 'open'}
Departure: ${lead.departure_date || 'flexible'}
Travelers: ${lead.travelers_adults || 2} adults, ${lead.travelers_children || 0} children
Budget: ${lead.budget || 'not specified'}
Message: ${lead.message || 'none'}
AI summary: ${lead.ai_summary || ''}
Wants financing: ${lead.wants_financing ? 'YES' : 'no'}

${isRental ? `IMPORTANT: This lead is a strong vacation rental candidate. Lead with the most appropriate Crestwell rental partner (Plum Guide, HVN, AIC, or AVA) based on destination. Structure options A/B/C around rental options first.` : ''}
${isRail ? `IMPORTANT: This lead is a strong Vacations by Rail candidate. Lead with the most appropriate rail package (USA, Canada, Europe, or Scandinavia) based on destination. Structure options A/B/C around rail packages first.` : ''}
${isHotel ? `IMPORTANT: This lead is requesting a hotel stay. Lead with the best ABC Global Services hotel partner for their destination. Recommend 2-3 specific brands with rate codes.` : ''}

Write a proposal skeleton in clean markdown:

# ${lead.first_name} ${lead.last_name} - ${lead.trip_type || 'Travel'} Proposal
Date: ${new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})} | Score: ${lead.ai_score || 'N/A'}/100 | Budget: ${lead.budget || 'TBD'}
Travelers: ${lead.travelers_adults || 2} adults | Departure: ${lead.departure_date || 'Flexible'}

---

## Recommended Options

### Option A - Best Fit
[Ship/resort, itinerary, cabin type, est price range per person, 2-3 sentence rationale]

### Option B - Value Pick
[Different line, lower price, details, rationale]

### Option C - Upgrade
[Premium option, details, rationale]

---

## Itinerary Skeleton
[Day-by-day, 5-10 days. Port names, key activities.]

---

## Key Inclusions
- [4-6 specific inclusions for this trip]

---

## Also Available
- Flights from Chattanooga (CHA) or Atlanta (ATL) available upon request
- Pre/post hotel stays and airport & port transfers available upon request

---

## Financing
${lead.wants_financing ? 'Client requested monthly payments. Present 6-month 0% APR. Calculate at quote time.' : 'No financing requested. Mention as option if budget is a concern.'}

---

## Tims Checklist
- [ ] Confirm availability: [ship/resort + dates]
- [ ] Pull live pricing for Options A, B, C
- [ ] Check group rates (${(lead.travelers_adults || 2) >= 8 ? 'YES - qualifies' : 'no'})
- [ ] [Specific action from their message]
- [ ] Send quote within 24 hours

---
Terrance (Agent 3) - Crestwell AI Draft - ${new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}`;

  let proposal_draft = '';
  try {
    const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 2000, messages: [{ role: 'user', content: prompt }] }),
    });
    const aiData = await aiRes.json();
    if (!aiRes.ok) throw new Error(`Claude ${aiRes.status}: ${JSON.stringify(aiData.error)}`);
    proposal_draft = aiData.content?.[0]?.text ?? '';
    console.log('Terrance draft generated, length:', proposal_draft.length);
  } catch (e) {
    console.error('Terrance Claude error:', e);
    return new Response(JSON.stringify({ error: 'Claude failed', detail: String(e) }), { status: 500, headers: CORS });
  }

  let db_updated = false;
  const { error: updateErr } = await db.from('quote_requests').update({
    proposal_draft,
    proposal_status: 'draft_ready',
  }).eq('id', lead_id);
  if (updateErr) console.error('Terrance DB update (run migration if columns missing):', updateErr.message);
  else db_updated = true;

  let email_id: string | undefined;
  let email_sent = false;
  if (RESEND_KEY) {
    try {
      const subject = `Proposal Draft - ${lead.first_name} ${lead.last_name} (${lead.destination || 'Open'})`;
      const html = `<!DOCTYPE html><html><body>
<div style="font-family:Georgia,serif;max-width:700px;margin:0 auto;color:#0d1b2a">
  <div style="background:#0d1b2a;padding:24px 32px;display:flex;justify-content:space-between;align-items:center">
    <span style="color:#c9a84c;font-size:1.1rem;font-weight:300">Crestwell Travel Services</span>
    <span style="background:#22c55e22;border:1px solid #22c55e;color:#22c55e;font-family:sans-serif;font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:4px 12px">PROPOSAL DRAFT READY</span>
  </div>
  <div style="background:#faf8f3;padding:32px">
    <h2 style="font-weight:400;font-size:1.3rem;margin:0 0 4px">${lead.first_name} ${lead.last_name}</h2>
    <p style="font-family:sans-serif;font-size:0.85rem;color:#64748b;margin:0 0 24px">${lead.trip_type || ''} to ${lead.destination || 'Open'} &middot; Score: <strong>${lead.ai_score}/100</strong></p>
    <pre style="background:white;border:1px solid #e2e8f0;padding:24px;font-family:monospace;font-size:0.78rem;line-height:1.7;white-space:pre-wrap;color:#374151;overflow-x:auto">${proposal_draft}</pre>
    <div style="margin-top:20px;padding:14px 20px;background:#eff6ff;border:1px solid #bfdbfe">
      <p style="font-family:sans-serif;font-size:0.8rem;color:#1e40af;margin:0"><strong>Draft only.</strong> Fill in live pricing, confirm availability, then send to client.</p>
    </div>
    <div style="margin-top:16px">
      <a href="mailto:${lead.email}?subject=Your Travel Quote from Crestwell" style="background:#c9a84c;color:#0d1b2a;padding:10px 20px;text-decoration:none;font-family:sans-serif;font-size:0.8rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase">Reply to ${lead.first_name}</a>
      &nbsp;&nbsp;
      <a href="https://crestwellgetaways.com/api/ashley-approve?lead_id=${lead.id}&secret=${AGENT_SECRET.slice(0,16)}" style="background:#2D6A4F;color:white;padding:10px 20px;text-decoration:none;font-family:sans-serif;font-size:0.8rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase">✅ Approve — Send Quote to ${lead.first_name}</a>
    </div>
  </div>
  <div style="background:#0d1b2a;padding:14px 32px;text-align:center">
    <p style="color:rgba(255,255,255,0.3);font-family:sans-serif;font-size:0.7rem;margin:0">Terrance (Agent 3) &middot; Crestwell AI &middot; Claude Sonnet</p>
  </div>
</div>
</body></html>`;
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from:'Crestwell AI <noreply@crestwellgetaways.com>', to:'info@crestwellgetaways.com', subject, html }),
      });
      const emailData = await emailRes.json();
      email_id = emailData.id;
      email_sent = emailRes.ok;
      console.log('Terrance emailed Tim:', email_id);
    } catch(e) { console.error('Terrance Resend error:', e); }
  }

  return new Response(JSON.stringify({
    success: true, lead_id,
    lead_name: `${lead.first_name} ${lead.last_name}`,
    lead_email: lead.email, destination: lead.destination,
    trip_type: lead.trip_type, ai_score: lead.ai_score, ai_stage: lead.ai_stage,
    proposal_draft, db_updated, email_sent, email_id, agent: 'Terrance',
  }), { headers: CORS });
});
