import { NextRequest, NextResponse } from "next/server";

// Server-side proxy to cts-agent-dash's create-standalone-payment edge
// function -- same reasoning as create-virtual-card's proxy: the internal
// agent secret must never reach the browser.
const CTS_SUPABASE_URL = process.env.CTS_SUPABASE_URL!;
const CTS_SUPABASE_ANON_KEY = process.env.CTS_SUPABASE_ANON_KEY!;
const CW_AGENT_SECRET = process.env.CW_AGENT_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { customer_name, customer_email, customer_phone, amount, trip_name, booking_ref, payment_type } = body;

  if (!customer_name || !customer_email || !amount || !trip_name) {
    return NextResponse.json(
      { error: "customer_name, customer_email, amount, and trip_name are required" },
      { status: 400 }
    );
  }

  const res = await fetch(`${CTS_SUPABASE_URL}/functions/v1/create-standalone-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": CTS_SUPABASE_ANON_KEY,
      "x-agent-secret": CW_AGENT_SECRET,
    },
    body: JSON.stringify({ customer_name, customer_email, customer_phone, amount, trip_name, booking_ref, payment_type }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("create-standalone-payment proxy failed:", data);
    return NextResponse.json({ error: data?.error || "Failed to create payment record" }, { status: 502 });
  }

  return NextResponse.json(data);
}
