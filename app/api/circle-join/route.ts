import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const resendClient = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, source, founding_member } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
    }

    const firstName = name.split(' ')[0];

    // 1. Notify Tim
    await resendClient.emails.send({
      from: 'Crestwell Circle <noreply@crestwellgetaways.com>',
      to: ['tim@crestwelltravels.com'],
      subject: `New Circle member: ${name}${founding_member ? ' (Founding)' : ''}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:500px;margin:0 auto;background:#0d1b2a;color:white;padding:32px;">
          <h2 style="color:#c9a84c;margin:0 0 16px;">New Circle Signup</h2>
          <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;margin:0 0 8px;"><strong style="color:white;">Name:</strong> ${name}</p>
          <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;margin:0 0 8px;"><strong style="color:white;">Email:</strong> ${email}</p>
          <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;margin:0 0 8px;"><strong style="color:white;">Source:</strong> ${source || 'landing_page'}</p>
          <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;margin:0;"><strong style="color:white;">Founding member:</strong> ${founding_member ? 'Yes ✓' : 'No'}</p>
        </div>`,
    });

    // 2. Send welcome email to new member
    await resendClient.emails.send({
      from: 'Tim Crestwell <tim@crestwellgetaways.com>',
      to: [email],
      replyTo: 'tim@crestwellgetaways.com',
      subject: "You're in — welcome to the Crestwell Circle",
      html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f4f0;font-family:Georgia,serif;">
<div style="max-width:600px;margin:0 auto;">

  <!-- Header -->
  <div style="background:#0d1b2a;padding:32px 40px;text-align:center;border-bottom:2px solid #c9a84c;">
    <p style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:#c9a84c;margin:0 0 8px;">A members-only travel community</p>
    <h1 style="font-size:1.6rem;font-weight:400;color:white;margin:0;">The Crestwell Circle</h1>
  </div>

  <!-- Body -->
  <div style="background:white;padding:40px;">
    <p style="font-size:1rem;color:#0d1b2a;line-height:1.7;margin:0 0 16px;">Hi ${firstName},</p>

    <p style="font-size:0.95rem;color:#475569;line-height:1.8;margin:0 0 16px;">
      You're in. Welcome to the Crestwell Circle.
    </p>

    <p style="font-size:0.95rem;color:#475569;line-height:1.8;margin:0 0 16px;">
      ${founding_member
        ? "You've joined as a <strong>Founding Member</strong> — which means the $100 onboard credit on every Circle-hosted trip is yours permanently. That perk closes at the end of launch month, and future members won't have it."
        : 'Your membership is confirmed and active starting today.'}
    </p>

    <!-- Benefits box -->
    <div style="background:#f8f7f4;border-left:3px solid #c9a84c;padding:20px 24px;margin:28px 0;">
      <p style="font-size:0.75rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#7a8aa3;margin:0 0 14px;">Your member benefits</p>
      <table style="width:100%;font-size:0.875rem;color:#1e2d52;border-collapse:collapse;">
        <tr><td style="padding:5px 0;">🚢</td><td style="padding:5px 8px;font-weight:600;">First Access</td><td style="padding:5px 0;color:#475569;">Every hosted trip before public release</td></tr>
        <tr><td style="padding:5px 0;">💰</td><td style="padding:5px 8px;font-weight:600;">Member Pricing</td><td style="padding:5px 0;color:#475569;">${founding_member ? '$100 onboard credit on all hosted trips — forever' : 'Savings on every hosted trip'}</td></tr>
        <tr><td style="padding:5px 0;">📬</td><td style="padding:5px 8px;font-weight:600;">Port Intel Briefing</td><td style="padding:5px 0;color:#475569;">Monthly, first Tuesday — starting next month</td></tr>
        <tr><td style="padding:5px 0;">⚡</td><td style="padding:5px 8px;font-weight:600;">Priority Response</td><td style="padding:5px 0;color:#475569;">24-hour turnaround on every quote</td></tr>
        <tr><td style="padding:5px 0;">🎁</td><td style="padding:5px 8px;font-weight:600;">Onboard Perks</td><td style="padding:5px 0;color:#475569;">Birthday/anniversary surprise on every booking</td></tr>
        <tr><td style="padding:5px 0;">🥂</td><td style="padding:5px 8px;font-weight:600;">Bon Voyage Gathering</td><td style="padding:5px 0;color:#475569;">Annual meetup in Chattanooga — you + one guest</td></tr>
      </table>
    </div>

    <p style="font-size:0.95rem;color:#475569;line-height:1.8;margin:0 0 16px;">
      <strong>What happens next:</strong> Your first Port Intel Briefing arrives the first Tuesday of next month. In the meantime, watch for a separate email in the next few weeks with the first hosted-trip announcement — Circle members get 48-hour early access before it goes anywhere else.
    </p>

    <p style="font-size:0.95rem;color:#475569;line-height:1.8;margin:0 0 28px;">
      When you're ready to plan a trip — hosted or custom — just reply to this email, or call me directly. Mention you're a Circle member and you go straight to the front of the queue.
    </p>

    <p style="font-size:0.95rem;color:#0d1b2a;line-height:1.8;margin:0;">
      Talk soon,<br><br>
      <strong>Tim Crestwell</strong><br>
      <span style="font-size:0.82rem;color:#7a8aa3;">Founder, Crestwell Travel Services</span>
    </p>
  </div>

  <!-- Signature strip -->
  <div style="background:#f0ede6;padding:20px 40px;border-top:1px solid rgba(13,27,42,0.1);">
    <p style="font-size:0.8rem;color:#1e2d52;margin:0 0 4px;"><strong>Tim Crestwell</strong> &middot; Crestwell Travel Services</p>
    <p style="font-size:0.78rem;color:#7a8aa3;margin:0 0 4px;">
      <a href="tel:8885086893" style="color:#7a8aa3;text-decoration:none;">888.508.6893</a> &middot;
      <a href="mailto:tim@crestwellgetaways.com" style="color:#7a8aa3;text-decoration:none;">tim@crestwellgetaways.com</a> &middot;
      <a href="https://crestwellgetaways.com" style="color:#7a8aa3;text-decoration:none;">crestwellgetaways.com</a>
    </p>
    <p style="font-size:0.72rem;color:#94a3b8;margin:0;">ASTA Member &middot; CLIA Certified &middot; Carnival Diamond Level Graduate</p>
  </div>

  <!-- Footer -->
  <div style="background:#0d1b2a;padding:16px 40px;text-align:center;">
    <p style="font-size:0.68rem;color:rgba(255,255,255,0.3);margin:0;line-height:1.6;">
      Crestwell Travel Services &middot; Chattanooga, TN &middot; Florida Seller of Travel Ref. No. ST46414<br>
      You're receiving this because you joined the Crestwell Circle.
    </p>
  </div>

</div>
</body>
</html>`,
    });

    // 3. Store in Supabase (best-effort)
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/receive-circle-member`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ name, email, source, founding_member }),
        }
      );
    } catch (dbErr) {
      console.error('Circle member storage failed (non-fatal):', dbErr);
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('Circle join error:', e);
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}