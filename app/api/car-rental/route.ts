import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      tripType, pickupLocation, dropoffLocation, pickupDate, pickupTime,
      returnDate, returnTime, vehicleClass, provider, driverName, driverEmail,
      driverPhone, driverAge, additionalDrivers, flightNumber, notes,
    } = body;

    if (!driverName || !driverEmail || !pickupLocation || !pickupDate || !provider) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }

    const providerUrls: Record<string, string> = {
      enterprise: 'https://www.enterprise.com',
      alamo: 'https://www.alamo.com',
      national: 'https://www.nationalcar.com',
      hertz: 'https://www.hertz.com',
      thrifty: 'https://www.thrifty.com',
      dollar: 'https://www.dollar.com',
      sixt: 'https://www.sixt.com',
    };

    const isOneWay = tripType === 'one-way';

    // Send notification to Tim
    await resend.emails.send({
      from: 'Crestwell Travel <noreply@crestwellgetaways.com>',
      to: 'tim@crestwelltravels.com',
      subject: `New Car Rental Request — ${driverName} | ${provider.toUpperCase()}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #0d1b2a; color: white; padding: 40px;">
          <div style="border-bottom: 2px solid #c9a84c; padding-bottom: 20px; margin-bottom: 28px;">
            <h2 style="color: #c9a84c; margin: 0; font-size: 1.3rem; letter-spacing: 0.05em;">New Car Rental Request</h2>
            <p style="color: rgba(255,255,255,0.5); margin: 4px 0 0; font-size: 0.85rem;">Crestwell Travel Services</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
            <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5); width: 40%;">Trip Type</td><td style="color: white; font-weight: 600;">${isOneWay ? 'One-Way' : 'Round Trip'}</td></tr>
            <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5);">Provider</td><td style="color: #c9a84c; font-weight: 700; text-transform: uppercase;">${provider}</td></tr>
            <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5);">Vehicle Class</td><td style="color: white;">${vehicleClass}</td></tr>
            <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5);">Pickup</td><td style="color: white;">${pickupLocation} — ${pickupDate} at ${pickupTime}</td></tr>
            <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5);">Drop-off</td><td style="color: white;">${isOneWay ? dropoffLocation : pickupLocation} — ${isOneWay ? '' : (returnDate + ' at ' + returnTime)}</td></tr>
            ${!isOneWay ? `<tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5);">Return</td><td style="color: white;">${returnDate} at ${returnTime}</td></tr>` : ''}
            <tr><td colspan="2" style="padding: 20px 0 8px; color: #c9a84c; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; border-top: 1px solid rgba(201,168,76,0.2);">Driver Details</td></tr>
            <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5);">Name</td><td style="color: white;">${driverName}</td></tr>
            <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5);">Email</td><td style="color: white;">${driverEmail}</td></tr>
            <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5);">Phone</td><td style="color: white;">${driverPhone || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5);">Driver Age</td><td style="color: white;">${driverAge}</td></tr>
            <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5);">Additional Drivers</td><td style="color: white;">${additionalDrivers || '0'}</td></tr>
            ${flightNumber ? `<tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5);">Flight #</td><td style="color: white;">${flightNumber}</td></tr>` : ''}
            ${notes ? `<tr><td style="padding: 8px 0; color: rgba(255,255,255,0.5);">Notes</td><td style="color: white;">${notes}</td></tr>` : ''}
          </table>
          <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.75rem; color: rgba(255,255,255,0.3);">
            Crestwell Travel Services · 888.508.6893 · crestwellgetaways.com
          </div>
        </div>
      `,
    });

    // Send confirmation to customer
    await resend.emails.send({
      from: 'Crestwell Travel <noreply@crestwellgetaways.com>',
      to: driverEmail,
      subject: 'Your Car Rental Request — Crestwell Travel Services',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0d1b2a; padding: 32px 40px;">
            <h2 style="color: #c9a84c; margin: 0; font-size: 1.2rem;">Rental Request Received</h2>
          </div>
          <div style="padding: 32px 40px; background: #faf8f4;">
            <p style="color: #1e2d52; font-size: 1rem; line-height: 1.7;">Hi ${driverName},</p>
            <p style="color: #475569; font-size: 0.95rem; line-height: 1.7;">
              We've received your car rental request and will be in touch within a few hours to confirm your reservation with <strong>${provider.charAt(0).toUpperCase() + provider.slice(1)}</strong>.
            </p>
            <div style="background: #e8e4dc; padding: 20px 24px; margin: 24px 0; border-left: 3px solid #c9a84c;">
              <p style="margin: 0 0 8px; font-size: 0.8rem; color: #7a8aa3; letter-spacing: 0.1em; text-transform: uppercase;">Your Request</p>
              <p style="margin: 0; color: #1e2d52; font-size: 0.95rem;">
                ${tripType === 'one-way' ? 'One-Way' : 'Round Trip'} · ${vehicleClass}<br/>
                ${pickupLocation} → ${tripType === 'one-way' ? dropoffLocation : 'Return same location'}<br/>
                ${pickupDate} at ${pickupTime}
              </p>
            </div>
            <p style="color: #475569; font-size: 0.9rem; line-height: 1.7;">
              Questions? Call us at <strong>888.508.6893</strong> or reply to this email.
            </p>
            <p style="color: #475569; font-size: 0.9rem;">
              — Tim Crestwell<br/>
              <span style="color: #7a8aa3;">Crestwell Travel Services</span>
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Car rental form error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
