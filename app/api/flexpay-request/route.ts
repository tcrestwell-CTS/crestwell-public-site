import { NextRequest, NextResponse } from "next/server";

const RESEND_KEY = process.env.RESEND_API_KEY!;

function formatCents(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  const {
    name, email, phone,
    trip_name, amount_cents,
    guests, cabin_code, cabin_name, fare,
    room_price, voyage, flexpay_option,
  } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email required" }, { status: 400 });
  }

  const freqLabel =
    flexpay_option === "weekly"   ? "Weekly"   :
    flexpay_option === "biweekly" ? "Bi-Weekly" : "Monthly";

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
      <div style="background:#0D1B2A;padding:24px 32px;">
        <div style="font-family:Georgia,serif;font-size:22px;color:white;">Crestwell Travel Services</div>
        <div style="font-size:11px;color:#C9A84C;letter-spacing:0.2em;text-transform:uppercase;margin-top:4px;">FlexPay Request</div>
      </div>

      <div style="padding:32px;background:#faf8f3;">
        <div style="background:#f5f3ff;border-left:4px solid #7c3aed;padding:16px 20px;margin-bottom:28px;border-radius:0 6px 6px 0;">
          <div style="font-size:0.85rem;font-weight:700;color:#7c3aed;margin-bottom:4px;">💜 New FlexPay Request</div>
          <div style="font-size:0.82rem;color:#4c1d95;">A customer has requested a flexible payment plan. Please contact them within 1 business day.</div>
        </div>

        <h2 style="font-family:Georgia,serif;font-size:1.3rem;font-weight:400;color:#0D1B2A;margin:0 0 20px;">Customer Information</h2>
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem;margin-bottom:28px;">
          <tr style="background:#f1f5f9;"><td style="padding:10px 14px;font-weight:600;color:#0D1B2A;width:38%;">Full Name</td><td style="padding:10px 14px;color:#374151;">${name}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#0D1B2A;">Email</td><td style="padding:10px 14px;"><a href="mailto:${email}" style="color:#0057b8;">${email}</a></td></tr>
          <tr style="background:#f1f5f9;"><td style="padding:10px 14px;font-weight:600;color:#0D1B2A;">Phone</td><td style="padding:10px 14px;">${phone || "—"}</td></tr>
        </table>

        <h2 style="font-family:Georgia,serif;font-size:1.3rem;font-weight:400;color:#0D1B2A;margin:0 0 20px;">Trip &amp; Cabin Details</h2>
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem;margin-bottom:28px;">
          <tr style="background:#f1f5f9;"><td style="padding:10px 14px;font-weight:600;color:#0D1B2A;width:38%;">Trip</td><td style="padding:10px 14px;color:#374151;">${trip_name || "—"}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#0D1B2A;">Voyage #</td><td style="padding:10px 14px;color:#374151;">${voyage || "—"}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding:10px 14px;font-weight:600;color:#0D1B2A;">Cabin Code</td><td style="padding:10px 14px;color:#374151;">${cabin_code || "—"}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#0D1B2A;">Cabin Name</td><td style="padding:10px 14px;color:#374151;">${cabin_name || "—"}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding:10px 14px;font-weight:600;color:#0D1B2A;">Fare Type</td><td style="padding:10px 14px;color:#374151;">${fare || "Standard"}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#0D1B2A;">Room Price</td><td style="padding:10px 14px;color:#374151;">${room_price ? "USD $" + Number(room_price).toLocaleString() : "—"}</td></tr>
          <tr style="background:#f1f5f9;"><td style="padding:10px 14px;font-weight:600;color:#0D1B2A;">Guests</td><td style="padding:10px 14px;color:#374151;">${guests || "—"}</td></tr>
        </table>

        <h2 style="font-family:Georgia,serif;font-size:1.3rem;font-weight:400;color:#0D1B2A;margin:0 0 20px;">FlexPay Details</h2>
        <table style="width:100%;border-collapse:collapse;font-size:0.88rem;margin-bottom:28px;">
          <tr style="background:#f5f3ff;"><td style="padding:10px 14px;font-weight:600;color:#4c1d95;width:38%;">Deposit Amount</td><td style="padding:10px 14px;font-weight:700;color:#7c3aed;font-size:1.1rem;">${amount_cents ? formatCents(Number(amount_cents)) : "—"}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#0D1B2A;">Payment Frequency</td><td style="padding:10px 14px;font-weight:700;color:#7c3aed;">${freqLabel}</td></tr>
        </table>

        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:16px 20px;">
          <p style="font-size:0.82rem;color:#1e40af;margin:0;"><strong>Next Steps:</strong> Contact ${name} at <a href="mailto:${email}" style="color:#1e40af;">${email}</a>${phone ? ` or ${phone}` : ""} to discuss and finalize their FlexPay payment plan.</p>
        </div>
      </div>

      <div style="background:#0D1B2A;padding:16px 32px;text-align:center;">
        <p style="color:rgba(255,255,255,0.3);font-size:0.72rem;margin:0;">Crestwell Travel Services &middot; FlexPay Request &middot; crestwellgetaways.com</p>
      </div>
    </div>
  `;

  const clientHtml = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#0D1B2A;padding:28px 36px;">
        <div style="font-family:Georgia,serif;font-size:26px;color:white;">Crestwell</div>
        <div style="font-size:11px;color:#C9A84C;letter-spacing:0.2em;text-transform:uppercase;margin-top:4px;">Travel Services</div>
      </div>
      <div style="padding:32px 36px;background:white;">
        <p style="font-family:Georgia,serif;font-size:20px;color:#0D1B2A;margin:0 0 16px;">Hi ${name},</p>
        <p style="font-size:14px;color:#4A5568;line-height:1.8;margin:0 0 16px;">
          Thank you for submitting your FlexPay request for <strong>${trip_name || "your group trip"}</strong>. We have received your request and a Crestwell representative will contact you within <strong>1 business day</strong> to finalize your payment plan.
        </p>
        <div style="background:#f5f3ff;border-left:4px solid #7c3aed;padding:16px 20px;margin:20px 0;border-radius:0 6px 6px 0;">
          <div style="font-size:0.82rem;font-weight:700;color:#7c3aed;margin-bottom:8px;">Your FlexPay Summary</div>
          <div style="font-size:0.88rem;color:#4c1d95;line-height:1.8;">
            ${cabin_code ? `<strong>Cabin:</strong> ${cabin_code} — ${cabin_name}<br/>` : ""}
            ${fare ? `<strong>Fare:</strong> ${fare}<br/>` : ""}
            <strong>Guests:</strong> ${guests || "—"}<br/>
            <strong>Deposit:</strong> ${amount_cents ? formatCents(Number(amount_cents)) : "—"}<br/>
            <strong>Preferred Frequency:</strong> ${freqLabel}
          </div>
        </div>
        <p style="font-size:14px;color:#4A5568;line-height:1.8;margin:0 0 24px;">
          Questions? Reply to this email or call us at <strong>470-232-9288</strong>.
        </p>
        <a href="tel:4702329288" style="display:inline-block;background:#C9A84C;color:#0D1B2A;padding:12px 28px;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;border-radius:4px;">Call 470-232-9288</a>
      </div>
      <div style="background:#0D1B2A;padding:20px 36px;">
        <div style="font-family:Georgia,serif;font-size:16px;color:white;">Tim Crestwell</div>
        <div style="font-size:12px;color:#C9A84C;">Crestwell Travel Services &middot; crestwellgetaways.com</div>
      </div>
    </div>
  `;

  // Send to Tim
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Crestwell FlexPay <noreply@crestwellgetaways.com>",
      to: ["info@crestwellgetaways.com"],
      reply_to: email,
      subject: `💜 FlexPay Request — ${name} | ${trip_name || "Group Trip"} | ${freqLabel}`,
      html,
    }),
  });

  // Send confirmation to client
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Tim Crestwell <info@crestwellgetaways.com>",
      to: [email],
      reply_to: "info@crestwellgetaways.com",
      subject: "Your Crestwell FlexPay Request — We Received It!",
      html: clientHtml,
    }),
  });

  return NextResponse.json({ ok: true });
}
