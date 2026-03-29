import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getAttribution } from '@/lib/utm-capture';

const payload = {
  ...existingFormFields,
  ...getAttribution(),  // adds gclid, utm_source, utm_campaign, etc.
};
export async function POST(request: NextRequest) {
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
  } = body;

  if (!first_name || !last_name || !email) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
  }

  try {
    // Record timestamp BEFORE insert so agent can find the row by email+time
    const submitted_at = new Date().toISOString();

    // Save to Supabase (anon key — insert only, no SELECT needed)
    await supabase.from('quote_requests').insert([{
      first_name, last_name, email, phone,
      trip_type, destination, departure_date,
      travelers_adults, travelers_children,
      budget, flexibility, message,
      status: 'new',
    }]);

    // ── Fire AI qualification agent (non-blocking) ──────────────────────────
    // Passes email + submitted_at — the edge function uses its service role
    // key to look up the row, so no service role key needed here.
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    fetch(`${supabaseUrl}/functions/v1/qualify-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-agent-secret': process.env.CW_AGENT_SECRET || '',
      },
      body: JSON.stringify({ email, submitted_at }),
    })
      .then(r => r.json().then(d => console.log('Agent:', r.status, d)))
      .catch(err => console.error('Agent error:', err));

    // ── Confirmation email to the client ────────────────────────────────────
    // The AI-enriched notification to Tim is sent by the edge function above.
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
            <p style="font-family: sans-serif; font-size: 0.85rem; color: #94a3b8; margin: 0 0 24px;">
              Questions? Reply to this email or reach us at<br/>
              <a href="mailto:info@crestwellgetaways.com" style="color: #c9a84c;">info@crestwellgetaways.com</a>
            </p>
            <a href="https://crestwellgetaways.com/destinations" style="background: #c9a84c; color: #0d1b2a; padding: 14px 32px; text-decoration: none; font-family: sans-serif; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">
              Browse Destinations
            </a>
          </div>
          <div style="background: #0d1b2a; padding: 20px 32px; text-align: center;">
            <p style="color: rgba(255,255,255,0.4); font-size: 0.75rem; font-family: sans-serif; margin: 0;">© ${new Date().getFullYear()} Crestwell Travel Services · Georgia · Tennessee · Alabama</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Quote submission error:', err);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
