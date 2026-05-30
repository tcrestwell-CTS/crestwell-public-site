// lib/logPaymentIp.ts
// Server-side utility — call from any payment API route.
// Extracts real client IP from Vercel/Cloudflare headers and logs to payment_ip_logs.

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Simple risk flags — auto-flag suspicious patterns
function detectFlags(ip: string | null, ua: string | null, country: string | null) {
  const flags: string[] = [];
  if (!ip)                                     flags.push("no_ip");
  if (!ua || ua.length < 10)                   flags.push("no_user_agent");
  if (ua && /bot|crawl|spider/i.test(ua))      flags.push("bot_ua");
  if (country && !["US","CA","GB","AU","MX","BS","JM","BB"].includes(country))
                                               flags.push("unusual_country:" + country);
  return flags;
}

export function getRealIp(req: Request): string | null {
  const headers = req.headers;
  return (
    headers.get("cf-connecting-ip") ||
    headers.get("x-real-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    headers.get("x-vercel-forwarded-for") ||
    null
  );
}

export async function logPaymentIp(opts: {
  req:         Request;
  page:        string;
  outcome:     "attempted" | "succeeded" | "failed" | "blocked";
  amountCents?: number;
  currency?:   string;
  stripePmId?: string;
  lastFour?:   string;
  clientId?:   string;
  bookingId?:  string;
  rentalId?:   string;
  failureReason?: string;
}): Promise<void> {
  try {
    const ip      = getRealIp(opts.req);
    const ua      = opts.req.headers.get("user-agent");
    const referer = opts.req.headers.get("referer");
    const country = opts.req.headers.get("cf-ipcountry") ||
                    opts.req.headers.get("x-vercel-ip-country");

    const flags = detectFlags(ip, ua, country);
    const flagged = flags.length > 0;

    const record = {
      page:           opts.page,
      ip_address:     ip,
      user_agent:     ua,
      referer:        referer,
      country:        country,
      amount_cents:   opts.amountCents ?? null,
      currency:       opts.currency ?? "usd",
      stripe_pm_id:   opts.stripePmId ?? null,
      last_four:      opts.lastFour ?? null,
      client_id:      opts.clientId ?? null,
      booking_id:     opts.bookingId ?? null,
      rental_id:      opts.rentalId ?? null,
      outcome:        opts.outcome,
      failure_reason: opts.failureReason ?? null,
      flagged,
      flag_reason:    flags.join(", ") || null,
    };

    await fetch(`${SUPABASE_URL}/rest/v1/payment_ip_logs`, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "apikey":        SUPABASE_ANON,
        "Authorization": "Bearer " + SUPABASE_ANON,
        "Prefer":        "return=minimal",
      },
      body: JSON.stringify(record),
    });

    if (flagged) {
      console.warn(\`[payment-ip] FLAGGED \${opts.page} from \${ip} (\${country}): \${flags.join(", ")}\`);
    }
  } catch (err) {
    // Never throw — IP logging must never block a payment
    console.error("[payment-ip] Log failed (non-fatal):", err);
  }
}
