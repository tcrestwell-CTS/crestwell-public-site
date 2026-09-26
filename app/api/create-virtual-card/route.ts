import { NextRequest, NextResponse } from "next/server";

// Server-side proxy to cts-agent-dash's create-virtual-card edge function.
// Exists because that function requires an internal-caller secret
// (CW_AGENT_SECRET) that must never be exposed to the browser -- so the
// public /pay page calls this route instead of the edge function directly.
const CTS_SUPABASE_URL = process.env.CTS_SUPABASE_URL!;
const CW_AGENT_SECRET = process.env.CW_AGENT_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { paymentId, method, affirmCheckoutId } = body;

  if (!paymentId || !method) {
    return NextResponse.json({ error: "paymentId and method are required" }, { status: 400 });
  }

  const res = await fetch(`${CTS_SUPABASE_URL}/functions/v1/create-virtual-card`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-agent-secret": CW_AGENT_SECRET,
    },
    body: JSON.stringify({ paymentId, method, affirmCheckoutId }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("create-virtual-card proxy failed:", data);
    return NextResponse.json({ error: data?.error || "Failed to create virtual card" }, { status: 502 });
  }

  return NextResponse.json(data);
}
