import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const PDF_URL = "https://crestwellgetaways.com/southeast-port-guide.pdf";
const FROM = "Tim Crestwell <tim@crestwellgetaways.com>";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, city } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400, headers: CORS });
    }

    const firstName = name?.split(" ")[0] || "there";

    // 1. Save lead to Supabase
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/lead_magnet_subscribers`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: name || null,
          email: email.toLowerCase().trim(),
          city: city || null,
          source: "southeast-port-guide",
          created_at: new Date().toISOString(),
        }),
      });
    } catch (dbErr) {
      console.error("Supabase insert failed:", dbErr);
      // Non-fatal — still send the email
    }

    // 2. Send PDF via Resend
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [email.toLowerCase().trim()],
        subject: "Your Southeast Port Guide is here 🚢",
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
            <div style="text-align:center;margin-bottom:32px;">
              <h1 style="color:#0D1B2A;font-size:24px;margin:0;">Crestwell Travel Services</h1>
            </div>

            <h2 style="color:#0D1B2A;">Hi ${firstName}, your guide is ready!</h2>

            <p style="color:#374151;line-height:1.6;">
              Thanks for grabbing the <strong>Southeast Cruiser's Port Guide</strong>. Inside you'll find
              drive times, parking costs, cruise lines, and Tim's honest take on every major port within
              reach of Georgia, Tennessee, Alabama, and Florida.
            </p>

            <div style="text-align:center;margin:32px 0;">
              <a href="${PDF_URL}"
                 style="background-color:#C9A84C;color:#0D1B2A;padding:14px 36px;text-decoration:none;
                        border-radius:4px;font-weight:700;font-size:16px;display:inline-block;">
                Download Your Free Guide →
              </a>
            </div>

            <p style="color:#374151;line-height:1.6;">
              Once you've had a chance to read through it, feel free to reply to this email — I'm happy
              to give you a personal port recommendation based on where you're coming from and what kind
              of cruise you're looking for. No sales pressure, ever.
            </p>

            <p style="color:#374151;line-height:1.6;">
              Happy cruising,<br/>
              <strong>Tim Crestwell</strong><br/>
              Crestwell Travel Services<br/>
              <a href="tel:8885086893" style="color:#C9A84C;">888.508.6893</a> ·
              <a href="https://crestwellgetaways.com" style="color:#C9A84C;">crestwellgetaways.com</a>
            </p>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;"/>
            <p style="color:#9ca3af;font-size:12px;text-align:center;">
              Crestwell Travel Services · Chattanooga, TN · ASTA Member · CLIA Certified
            </p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.json();
      console.error("Resend error:", err);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500, headers: CORS });
    }

    return NextResponse.json({ success: true }, { status: 200, headers: CORS });

  } catch (err) {
    console.error("lead-magnet error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: CORS });
  }
}
