import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    // Save to Supabase
    await supabase.from('quote_requests').insert([{
      first_name, last_name, email, phone,
      trip_type, destination, departure_date,
      travelers_adults, travelers_children,
      budget, flexibility, message,
      status: 'new',
    }]);

    // Send notification to Tim
    await resend.emails.send({
      from: 'Crestwell Travel <noreply@crestwellgetaways.com>',
      to: 'info@crestwellgetaways.com',
      subject: `New Quote Request — ${first_name} ${last_name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #0d1b2a;">
          <div style="background: #0d1b2a; padding: 32px; text-align: center;">
            <h1 style="color: #c9a84c; font-weight: 300; font-size: 1.8rem; margin: 0;">New Quote Request</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 0.85rem; font-family: sans-serif;">Crestwell Travel Services</p>
          </div>
          <div style="padding: 40px 32px; background: #faf8f3;">
            <table style="width: 100%; border-collapse: collapse; font-family: sans-serif; font-size: 0.875rem;">
              <tr><td colspan="2" style="padding: 0 0 20px;"><strong style="font-size: 1rem; color: #0d1b2a;">Contact Information</strong></td></tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b; width: 40%;">Name</td>
                <td style="padding: 10px 0; color: #0d1b2a; font-weight: 500;">${first_name} ${last_name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #c9a84c;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b;">Phone</td>
                <td style="padding: 10px 0; color: #0d1b2a;">${phone || 'Not provided'}</td>
              </tr>
              <tr><td colspan="2" style="padding: 28px 0 12px;"><strong style="font-size: 1rem; color: #0d1b2a;">Trip Details</strong></td></tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b;">Trip Type</td>
                <td style="padding: 10px 0; color: #0d1b2a;">${trip_type || 'Not specified'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b;">Destination</td>
                <td style="padding: 10px 0; color: #0d1b2a;">${destination || 'Open / Flexible'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b;">Departure Date</td>
                <td style="padding: 10px 0; color: #0d1b2a;">${departure_date || 'Flexible'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b;">Flexibility</td>
                <td style="padding: 10px 0; color: #0d1b2a;">${flexibility || 'Not specified'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b;">Travelers</td>
                <td style="padding: 10px 0; color: #0d1b2a;">${travelers_adults || 2} adult(s), ${travelers_children || 0} child(ren)</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 10px 0; color: #64748b;">Budget</td>
                <td style="padding: 10px 0; color: #0d1b2a;">${budget || 'Not specified'}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Notes</td>
                <td style="padding: 10px 0; color: #0d1b2a;">${message}</td>
              </tr>` : ''}
            </table>
            <div style="margin-top: 32px; text-align: center;">
              <a href="mailto:${email}?subject=Re: Your Crestwell Travel Quote Request" style="background: #c9a84c; color: #0d1b2a; padding: 14px 32px; text-decoration: none; font-family: sans-serif; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;">
                Reply to ${first_name}
              </a>
            </div>
          </div>
          <div style="background: #0d1b2a; padding: 20px 32px; text-align: center;">
            <p style="color: rgba(255,255,255,0.4); font-size: 0.75rem; font-family: sans-serif; margin: 0;">Crestwell Travel Services · Georgia · Tennessee · Alabama</p>
          </div>
        </div>
      `,
    });

    // Send confirmation to client
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
            <div style="width: 64px; height: 64px; background: #c9a84c; border-radius: 50%; margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; line-height: 64px;">✓</div>
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
              Questions in the meantime? Reply to this email or reach us at<br/>
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
