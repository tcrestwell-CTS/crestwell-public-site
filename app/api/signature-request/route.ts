// Dedicated intake for Crestwell Signature Experiences invitation requests.
// Saves to quote_requests (so it shows in the CRM like any lead), emails Tim a
// dedicated alert, and sends the requester a tailored confirmation.
// Deliberately does NOT fire Tiara (the automated lead-qualifier) — these
// requests get a personal follow-up instead.
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const ALERT_TO = 'tim@crestwelltravels.com';

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { first_name, last_name, email, phone, budget, interest, occasion, referred, notes } = body;

  if (!first_name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email))) {
    return NextResponse.json({ error: 'Name and a valid email are required' }, { status: 400 });
  }

  const message = [
    'Signature Experiences invitation request',
    interest && `Most interested in: ${interest}`,
    occasion && `Upcoming occasion: ${occasion}`,
    referred && `Referred by / existing client: ${referred}`,
    notes,
  ].filter(Boolean).join('\n');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error: insertError } = await supabase.from('quote_requests').insert([{
    first_name,
    last_name: last_name || '-',
    email,
    phone: phone || '',
    trip_type: 'Signature Experiences',
    travelers_adults: 1,
    travelers_children: 0,
    budget: budget || null,
    message,
    status: 'new',
    funnel_name: 'Signature Experiences',
    lead_source: 'signature-experiences',
  }]);

  if (insertError) {
    console.error('[signature-request] insert failed:', insertError);
    return NextResponse.json(
      { error: 'We could not save your request. Please try again or call us at 888.508.6893.' },
      { status: 500 }
    );
  }

  // Lead is saved; emails are best-effort and must not fail the request.
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const fullName = `${first_name} ${last_name || ''}`.trim();

    await resend.emails.send({
      from: 'Crestwell Signature Experiences <noreply@crestwellgetaways.com>',
      to: [ALERT_TO],
      reply_to: email,
      subject: `⭐ Signature Experiences request: ${fullName}${budget ? ` (${budget})` : ''}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;background:#0d1b2a;color:white;padding:32px;">
          <p style="color:#c9a84c;font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 8px;">New invitation request</p>
          <h2 style="color:#c9a84c;margin:0 0 20px;font-weight:400;">Signature Experiences</h2>
          ${[
            ['Name', fullName], ['Email', email], ['Phone', phone], ['Trip investment', budget],
            ['Interested in', interest], ['Occasion', occasion], ['Referred by', referred], ['Notes', notes],
          ].filter(([, v]) => v).map(([k, v]) =>
            `<p style="color:rgba(255,255,255,0.75);font-size:0.9rem;margin:0 0 8px;"><strong style="color:white;">${k}:</strong> ${esc(v)}</p>`
          ).join('')}
          <p style="color:rgba(255,255,255,0.5);font-size:0.8rem;margin:20px 0 0;">Promised: personal reply within one business day. Saved to the CRM as a new quote request (source: signature-experiences). Reply to this email to respond directly.</p>
        </div>`,
    });

    await resend.emails.send({
      from: 'Crestwell Travel Services <noreply@crestwellgetaways.com>',
      to: email,
      reply_to: 'info@crestwellgetaways.com',
      subject: 'Your Signature Experiences request',
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#0d1b2a;">
          <div style="background:#0d1b2a;padding:32px;text-align:center;">
            <h1 style="color:#c9a84c;font-weight:300;font-size:1.7rem;margin:0;">Crestwell Signature Experiences</h1>
          </div>
          <div style="padding:40px 32px;background:#faf8f3;">
            <p style="font-family:sans-serif;font-size:0.95rem;line-height:1.75;">Hi ${esc(first_name)},</p>
            <p style="font-family:sans-serif;font-size:0.95rem;line-height:1.75;">Thank you for requesting an invitation to Crestwell Signature Experiences. A member of our team reviews every request personally and will be in touch within <strong>one business day</strong>.</p>
            <p style="font-family:sans-serif;font-size:0.9rem;line-height:1.75;color:#64748b;">Questions in the meantime? Call us at <strong style="color:#0d1b2a;">888.508.6893</strong>.</p>
          </div>
          <div style="background:#0d1b2a;padding:20px;text-align:center;">
            <p style="color:rgba(255,255,255,0.4);font-family:sans-serif;font-size:0.75rem;margin:0;">© Crestwell Travel Services · crestwellgetaways.com</p>
          </div>
        </div>`,
    });
  } catch (err) {
    console.error('[signature-request] email error:', err);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
