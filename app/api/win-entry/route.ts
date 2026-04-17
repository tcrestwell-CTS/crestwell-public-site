import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const CORS = { 'Access-Control-Allow-Origin': '*' };

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, city, partySize, destination, timeline, budget } = body;

    if (!email || !firstName) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
    }

    // Save to Supabase
    await fetch(`${SUPABASE_URL}/rest/v1/win_entries`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        first_name: firstName, last_name: lastName,
        email: email.toLowerCase().trim(), phone: phone || null,
        city: city || null, party_size: partySize || null,
        destination: destination || null, timeline: timeline || null,
        budget: budget || null, source: 'digital-signage-qr',
        created_at: new Date().toISOString(),
      }),
    });

    // Notify Tim via Resend
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Crestwell Travel <send@crestwellgetaways.com>',
        to: ['tcrestwell@crestwellgetaways.com'],
        subject: `🎉 New Win Entry — ${firstName} ${lastName} (${city})`,
        html: `
          <h2>New Dinner for Two Entry</h2>
          <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:600;">Name</td><td style="padding:8px;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:600;">Email</td><td style="padding:8px;">${email}</td></tr>
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:600;">Phone</td><td style="padding:8px;">${phone || '—'}</td></tr>
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:600;">City</td><td style="padding:8px;">${city || '—'}</td></tr>
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:600;">Destination</td><td style="padding:8px;">${destination || '—'}</td></tr>
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:600;">Party Size</td><td style="padding:8px;">${partySize || '—'}</td></tr>
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:600;">Timeline</td><td style="padding:8px;">${timeline || '—'}</td></tr>
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:600;">Budget/pp</td><td style="padding:8px;">${budget || '—'}</td></tr>
            <tr><td style="padding:8px;background:#f9f9f9;font-weight:600;">Source</td><td style="padding:8px;">Digital Signage QR Code</td></tr>
          </table>
        `,
      }),
    });

    // Send confirmation to entrant
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Tim Crestwell <send@crestwellgetaways.com>',
        to: [email.toLowerCase().trim()],
        subject: "You're entered! 🎉 Crestwell Travel Gift Card Giveaway",
        html: `
          <div style="font-family:-apple-system,sans-serif;max-width:560px;margin:0 auto;padding:24px;">
            <h1 style="color:#0D1B2A;">You're entered, ${firstName}!</h1>
            <p style="color:#374151;line-height:1.7;">Thanks for entering our <strong>Dinner for Two Gift Card</strong> giveaway. We'll announce the winner soon!</p>
            <div style="background:#FEF3C7;border-left:4px solid #C9A84C;padding:16px 20px;margin:24px 0;">
              <p style="margin:0;color:#92400e;font-weight:600;">In the meantime — did you know our vacation planning is completely FREE?</p>
              <p style="margin:8px 0 0;color:#78350f;font-size:0.9rem;">We'll find you the best rates on ${destination || 'your dream vacation'} and handle everything. No fees, ever.</p>
            </div>
            <a href="https://crestwellgetaways.com/request-quote?source=win-entry" style="display:inline-block;background:#0D1B2A;color:white;padding:12px 32px;text-decoration:none;font-weight:700;border-radius:4px;">Start Planning My Trip</a>
            <p style="margin-top:32px;color:#6b7280;font-size:0.85rem;">Tim Crestwell · Crestwell Travel Services<br>888-508-6893 · crestwellgetaways.com</p>
          </div>
        `,
      }),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error('win-entry error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
