import { NextResponse } from "next/server";
import { logPaymentIp } from "@/lib/logPaymentIp";

// POST /api/payment-log
// Called from client-side payment pages (pay, payment, financing) to log IP server-side.
// The client cannot read its own real IP — this route extracts it from request headers.
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    await logPaymentIp({
      req,
      page:         body.page        ?? "pay",
      outcome:      body.outcome     ?? "attempted",
      amountCents:  body.amountCents ?? undefined,
      currency:     body.currency    ?? "usd",
      stripePmId:   body.stripePmId  ?? undefined,
      lastFour:     body.lastFour    ?? undefined,
      clientId:     body.clientId    ?? undefined,
      bookingId:    body.bookingId   ?? undefined,
      failureReason: body.failureReason ?? undefined,
    });
    return NextResponse.json({ ok: true });
  } catch {
    // Always return 200 — never let logging block a payment
    return NextResponse.json({ ok: false });
  }
}
