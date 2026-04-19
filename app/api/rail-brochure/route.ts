import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const FROM = "Tim Crestwell <send@crestwellgetaways.com>";
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const BROCHURES: Record<string, { label: string; url: string }> = {
  usa:    { label: "Best of USA by Rail 2026",    url: "https://crestwellgetaways.com/guides/VBR_Best_of_USA_2026.pdf" },
  canada: { label: "Best of Canada by Rail 2026", url: "https://crestwellgetaways.com/guides/VBR_Best_of_Canada_2026.pdf" },
  europe: { label: "Best of Europe by Rail 2026", url: "https://crestwellgetaways.com/guides/VBR_Best_of_Europe_2026.pdf" },
  river:  { label: "Best of River Cruise 2026",   url: "https://crestwellgetaways.com/guides/VBR_Best_of_River_Cruise_2026.pdf" },
  scand:  { label: "Scandinavia by Rail 2026",    url: "https://crestwellgetaways.com/guides/VBR_Scandinavia_2026.pdf" },
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, brochure = "usa" } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400, headers: CORS });
    }
    const b = BROCHURES[brochure] ?? BROCHURES.usa;
    const firstName = name?.split(" ")[0] || "there";

    try {
      await fetch(`${SUPABASE_URL}/rest/v1/lead_magnet_subscribers`, {
        method: "POST",
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify({ name: name || null, email: email.toLowerCase().trim(), source: `rail-brochure-${brochure}`, created_at: new Date().toISOString() }),
      });
    } catch (e) { console.error("DB error:", e); }

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [email.toLowerCase().trim()],
        subject: `Your ${b.label} is on its way 🚂`,
        html: `<div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h1 style="color:#0D1B2A;">Crestwell Travel Services</h1>
          <p style="color:#C9A84C;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;">Vacations by Rail</p>
          <h2 style="color:#0D1B2A;">Hi ${firstName}, your brochure is ready!</h2>
          <p style="color:#374151;line-height:1.6;">Here is your <strong>${b.label}</strong> — packed with itineraries, departure dates, and everything you need to plan an unforgettable rail journey.</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${b.url}" style="background:#C9A84C;color:#0D1B2A;padding:14px 36px;text-decoration:none;border-radius:4px;font-weight:700;font-size:16px;display:inline-block;">Download ${b.label} →</a>
          </div>
          <p style="color:#374151;line-height:1.6;">Reply to this email or call me — I can build a custom rail vacation quote for you. No obligation.<br/><strong>Tim Crestwell</strong> · <a href="tel:8885086893" style="color:#C9A84C;">888.508.6893</a></p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;"/>
          <p style="color:#9ca3af;font-size:12px;text-align:center;">Crestwell Travel Services · Chattanooga, TN · ASTA Member · CLIA Certified</p>
        </div>`,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.json().catch(() => ({}));
      return NextResponse.json({ error: `Email failed` }, { status: 500, headers: CORS });
    }
    return NextResponse.json({ success: true }, { status: 200, headers: CORS });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500, headers: CORS });
  }
}
