import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const AGENT_SECRET = process.env.CW_AGENT_SECRET!;
const ASHLEY_URL = `${SUPABASE_URL}/functions/v1/ashley`;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lead_id = searchParams.get("lead_id");
  const secret  = searchParams.get("secret");

  // Validate the short token (first 16 chars of agent secret)
  if (!secret || !AGENT_SECRET.startsWith(secret) || secret.length < 12) {
    return new NextResponse(approvalPage("❌ Invalid approval link.", false), {
      status: 401, headers: { "Content-Type": "text/html", ...CORS }
    });
  }

  if (!lead_id) {
    return new NextResponse(approvalPage("❌ Missing lead ID.", false), {
      status: 400, headers: { "Content-Type": "text/html", ...CORS }
    });
  }

  // Call Ashley
  const res = await fetch(ASHLEY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-agent-secret": AGENT_SECRET },
    body: JSON.stringify({ lead_id }),
  });

  const data = await res.json().catch(() => ({}));

  if (res.ok && data.success) {
    return new NextResponse(
      approvalPage(`✅ Quote sent to ${data.client} at ${data.email}`, true),
      { status: 200, headers: { "Content-Type": "text/html", ...CORS } }
    );
  } else {
    return new NextResponse(
      approvalPage(`❌ Ashley error: ${data.error || "Unknown error"}`, false),
      { status: 500, headers: { "Content-Type": "text/html", ...CORS } }
    );
  }
}

function approvalPage(message: string, success: boolean) {
  const color = success ? "#2D6A4F" : "#CC0000";
  const bg = success ? "#f0fdf4" : "#fff0f0";
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Ashley — Quote Approval</title></head>
<body style="font-family:Arial,sans-serif;background:#f8f6f0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
<div style="background:white;border-radius:8px;padding:48px;max-width:480px;text-align:center;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
  <div style="font-family:Georgia,serif;font-size:28px;color:#0D1B2A;margin-bottom:4px;">Crestwell</div>
  <div style="font-size:11px;color:#C9A84C;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:32px;">Travel Services</div>
  <div style="background:${bg};border-radius:6px;padding:20px;border-left:4px solid ${color};margin-bottom:24px;">
    <p style="margin:0;font-size:15px;color:${color};font-weight:bold;">${message}</p>
  </div>
  <p style="font-size:13px;color:#6b7280;margin:0;">Ashley — Agent 4 &nbsp;·&nbsp; Crestwell AI Suite</p>
</div>
</body></html>`;
}
