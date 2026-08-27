// app/api/quote/route.ts
// Updated to capture UTM parameters + gclid for Google Ads attribution
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Agent storefronts ({slug}.crestwelltravels.com, a different domain
// entirely) submit quotes here in-page via a popup instead of navigating
// away — that's a genuine cross-origin request, so this needs real CORS
// support. Scoped to just crestwelltravels.com subdomains, not a blanket
// wildcard, since this endpoint accepts unauthenticated writes.
function corsHeaders(origin: string | null) {
  const allowed = origin && /^https:\/\/([a-z0-9-]+\.)?crestwelltravels\.com$/i.test(origin);
  return {
    'Access-Control-Allow-Origin': allowed ? origin! : '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(request.headers.get('origin')) });
}

export async function POST(request: NextRequest) {
  const cors = corsHeaders(request.headers.get('origin'));
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const body = await request.json();
  const {
    first_name, last_name, email, phone,
    trip_type, destination, departure_date,
    travelers_adults, travelers_children,
    budget, flexibility, message,
    gclid,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    // Set when submitted from an agent's personal storefront
    // ({slug}.crestwelltravels.com) — routes the lead directly to that
    // agent instead of the general pool.
    assigned_agent_id,
    funnel_name,
    // ── Triton (AI cruise finder) lead handoff — see TRITON_NOTES.md ──
    lead_source: leadSourceOverride,
    agent_context,
  } = body;

  if (!first_name || !last_name || !email) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400, headers: cors });
  }

  const lead_source = leadSourceOverride
    ? leadSourceOverride
    : gclid
      ? 'google_ads'
      : utm_source
        ? utm_source
        : 'direct';

  // quote_requests has no `agent_context` column yet (see TRITON_NOTES.md
  // for the ALTER TABLE needed). Fold it into the free-text message field
  // for now so nothing is silently dropped, instead of inserting a column
  // that doesn't exist (which would fail the whole insert).
  const messageWithAgentContext = agent_context
    ? [message, `[Triton agent_context — move to real column once added]\n${JSON.stringify(agent_context)}`]
        .filter(Boolean)
        .join('\n\n')
    : message;

  try {
    const submitted_at = new Date().toISOString();

    // BUG FIX: this never checked the insert's error return value — if
    // RLS blocked the write (which it did, confirmed: no anon INSERT
    // policy existed on quote_requests at all), this silently continued
    // on to fire Tiara and send the "Request Received!" confirmation
    // email regardless, meaning leads were never actually saved while
    // users believed their request went through. Same class of bug found
    // and fixed elsewhere in this project (CTN onboarding, doc checklist).
    // CONFIRMED root cause of real, live 500s (found in production logs):
    // quote_requests.travelers_adults is NOT NULL, but lighter-weight forms
    // like the veterans page don't ask for a traveler count at all, so it
    // arrives as undefined and the insert failed outright. Default to 1
    // rather than requiring every caller to know about this column.
    const { error: insertError } = await supabase.from('quote_requests').insert([{
      first_name, last_name, email, phone,
      trip_type, destination, departure_date,
      travelers_adults: travelers_adults ?? 1,
      travelers_children: travelers_children ?? 0,
      budget, flexibility, message: messageWithAgentContext,
      status: 'new',
      assigned_agent_id: assigned_agent_id || null,
      // Respect a specific funnel_name if the caller sent one (e.g. the
      // agent storefront popup sends 'Agent Storefront: {slug}') — was
      // previously hardcoded here, silently discarding anything more
      // specific the caller actually provided.
      funnel_name: funnel_name || (assigned_agent_id ? 'Agent Storefront' : null),
      gclid:        gclid        || null,
      utm_source:   utm_source   || null,
      utm_medium:   utm_medium   || null,
      utm_campaign: utm_campaign || null,
      utm_term:     utm_term     || null,
      utm_content:  utm_content  || null,
      lead_source,
    }]);

    if (insertError) {
      console.error('[quote] insert failed:', insertError);
      return NextResponse.json(
        { error: 'We could not save your request. Please try again or call us at 888.508.6893.' },
        { status: 500, headers: cors },
      );
    }

    // ── Fire Tiara — send full lead data so AI can qualify properly ──────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const agentSecret = process.env.CW_AGENT_SECRET || 'crestwell-agent-2024';
    fetch(`${supabaseUrl}/functions/v1/tiara`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-agent-secret': agentSecret,
        'Origin': 'https://crestwellgetaways.com',
      },
      body: JSON.stringify({
        name: `${first_name} ${last_name}`.trim(),
        email,
        phone:        phone         || '',
        trip_type:    trip_type     || '',
        destination:  destination   || '',
        travel_date:  departure_date|| '',
        group_size:   travelers_adults ? `${travelers_adults} adults` : '',
        budget:       budget        || '',
        message:      message       || '',
        submitted_at,
        lead_source,
        gclid:        gclid         || '',
        utm_source:   utm_source    || '',
        utm_medium:   utm_medium    || '',
        utm_campaign: utm_campaign  || '',
      }),
    })
      .then(r => r.json().then(d => console.log('Tiara:', r.status, JSON.stringify(d).slice(0, 200))))
      .catch(err => console.error('Tiara fire error:', err));

    // ── Confirmation email to client ──────────────────────────────────────
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Crestwell Travel <noreply@crestwellgetaways.com>',
      to: email,
      subject: `We received your quote request, ${first_name}!`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0d1b2a;">
          <div style="background: #0d1b2a; padding: 32px; text-align: center;">
            <h1 style="color: #c9a84c; font-weight: 300; font-size: 1.8rem; margin: 0;">Crestwell Travel Services</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 0.85rem; font-family: sans-serif;">See the World One Port at a Time</p>
          </div>
          <div style="padding: 48px 32px; background: #faf8f3; text-align: center;">
            <div style="width: 64px; height: 64px; background: #c9a84c; border-radius: 50%; margin: 0 auto 24px; line-height: 64px; font-size: 1.5rem;">✓</div>
            <h2 style="font-weight: 300; font-size: 1.6rem; color: #0d1b2a; margin: 0 0 16px;">Request Received!</h2>
            <p style="font-family: sans-serif; font-size: 0.9rem; color: #64748b; line-height: 1.75; margin: 0 0 12px;">
              Hi ${first_name}, thank you for reaching out to Crestwell Travel Services.
            </p>
            <p style="font-family: sans-serif; font-size: 0.9rem; color: #64748b; line-height: 1.75; margin: 0 0 32px;">
              One of our travel specialists will review your request and be in touch within <strong style="color: #0d1b2a;">24 hours</strong> with a personalized quote.
            </p>
            <div style="background: white; padding: 24px; text-align: left; margin-bottom: 32px; border-left: 3px solid #c9a84c;">
              <p style="font-family: sans-serif; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8; margin: 0 0 12px;">Your Request Summary</p>
              <p style="font-family: sans-serif; font-size: 0.875rem; color: #0d1b2a; margin: 4px 0;"><strong>Trip Type:</strong> ${trip_type || 'Not specified'}</p>
              <p style="font-family: sans-serif; font-size: 0.875rem; color: #0d1b2a; margin: 4px 0;"><strong>Destination:</strong> ${destination || 'Open / Flexible'}</p>
              <p style="font-family: sans-serif; font-size: 0.875rem; color: #0d1b2a; margin: 4px 0;"><strong>Travelers:</strong> ${travelers_adults || 2} adult(s), ${travelers_children || 0} child(ren)</p>
              <p style="font-family: sans-serif; font-size: 0.875rem; color: #0d1b2a; margin: 4px 0;"><strong>Departure:</strong> ${departure_date || 'Flexible'}</p>
            </div>
            <p style="font-family: sans-serif; font-size: 0.85rem; color: #64748b;">
              Questions? Call us at <strong style="color: #0d1b2a;">888.508.6893</strong>
            </p>
          </div>
          <div style="background: #0d1b2a; padding: 24px 32px; text-align: center;">
            <p style="color: rgba(255,255,255,0.4); font-family: sans-serif; font-size: 0.75rem; margin: 0;">
              © Crestwell Travel Services · <a href="https://crestwellgetaways.com" style="color: #c9a84c;">crestwellgetaways.com</a>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, submitted_at }, { status: 200, headers: cors });
  } catch (error) {
    console.error('Quote route error:', error);
    return NextResponse.json({ error: 'Failed to submit quote' }, { status: 500, headers: cors });
  }
}
