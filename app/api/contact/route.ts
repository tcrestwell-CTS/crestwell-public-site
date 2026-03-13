import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const body = await request.json();
  const { name, email, phone, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message required' }, { status: 400 });
  }

  try {
    // Save to Supabase
    await supabase.from('contact_messages').insert([{
      name, email, phone, subject, message, status: 'new',
    }]);

    // Notify Tim
    await resend.emails.send({
      from: 'Crestwell Travel Services <noreply@crestwellgetaways.com>',
      to: 'info@crestwellgetaways.com',
      subject: `New Contact Message — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0d1b2a;">
          <div style="background: #0d1b2a; padding: 32px; text-align: center;">
            <h1 style="color: #c9a84c; font-weight: 300; font-size: 1.8rem; margin: 0;">New Contact Message</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 0.85rem; font-family: sans-serif;">Crestwell Travel Services</p>
          </div>
          <div style="padding: 40px 32px; background: #faf8f3;">
            <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 0.875rem;">
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b; width: 40%;">Name</td>
                <td style="padding: 10px 0; color: #0d1b2a; font-weight: 500;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #c9a84c;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b;">Phone</td>
                <td style="padding: 10px 0; color: #0d1b2a;">${phone || 'Not provided'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b;">Subject</td>
                <td style="padding: 10px 0; color: #0d1b2a;">${subject || 'General Inquiry'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #0d1b2a; line-height: 1.65;">${message}</td>
              </tr>
            </table>
            <div style="margin-top: 32px; text-align: center;">
              <a href="mailto:${email}?subject=Re: ${subject || 'Your Crestwell Inquiry'}" style="background: #c9a84c; color: #0d1b2a; padding: 14px 32px; text-decoration: none; font-family: sans-serif; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">
                Reply to ${name}
              </a>
            </div>
          </div>
          <div style="background: #0d1b2a; padding: 20px 32px; text-align: center;">
            <p style="color: rgba(255,255,255,0.4); font-size: 0.75rem; font-family: sans-serif; margin: 0;">Crestwell Travel Services · Georgia · Tennessee · Alabama</p>
          </div>
        </div>
      `,
    });

    // Confirm to sender
    await resend.emails.send({
      from: 'Crestwell Travel Services<noreply@crestwellgetaways.com>',
      to: email,
      subject: `Thanks for reaching out, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0d1b2a;">
          <div style="background: #0d1b2a; padding: 32px; text-align: center;">
            <h1 style="color: #c9a84c; font-weight: 300; font-size: 1.8rem; margin: 0;">Crestwell Travel Services</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 0.85rem; font-family: sans-serif;">See the World One Port at a Time</p>
          </div>
          <div style="padding: 48px 32px; background: #faf8f3; text-align: center;">
            <h2 style="font-weight: 300; font-size: 1.6rem; color: #0d1b2a; margin: 0 0 16px;">Message Received!</h2>
            <p style="font-family: sans-serif; font-size: 0.9rem; color: #64748b; line-height: 1.75; margin: 0 0 12px;">
              Hi ${name.split(' ')[0]}, thanks for contacting Crestwell Travel Services.
            </p>
            <p style="font-family: sans-serif; font-size: 0.9rem; color: #64748b; line-height: 1.75; margin: 0 0 32px;">
              We'll get back to you within <strong style="color: #0d1b2a;">24 hours</strong>. In the meantime, feel free to browse our destinations.
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
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
