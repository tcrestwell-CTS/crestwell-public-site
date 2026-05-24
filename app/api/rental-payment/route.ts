import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-04-30.basil" });
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { token, paymentMethodId, last4, expMonth, expYear, cardholderName, billingZip } = await req.json();
    if (!token || !paymentMethodId) {
      return NextResponse.json({ error: "Missing token or payment method" }, { status: 400 });
    }

    // Validate token
    const { data: tok } = await supabase
      .from("rental_payment_tokens")
      .select("id, rental_id, used, expires_at")
      .eq("token", token)
      .maybeSingle();

    if (!tok) return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    if (tok.used) return NextResponse.json({ error: "Token already used" }, { status: 400 });
    if (new Date(tok.expires_at) < new Date()) {
      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    // Verify PaymentMethod exists in Stripe
    const pm = await stripe.paymentMethods.retrieve(paymentMethodId);
    if (!pm) return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });

    const now = new Date().toISOString();

    // Update rental with card info
    const { data: rental, error: updErr } = await supabase
      .from("car_rental_requests")
      .update({
        cc_stripe_pm_id:      paymentMethodId,
        cc_last_four:         last4           ? String(last4)     : null,
        cc_expiry:            expMonth && expYear
                                ? String(expMonth).padStart(2, "0") + "/" + String(expYear).slice(-2)
                                : null,
        cc_cardholder_name:   cardholderName  || null,
        cc_billing_zip:       billingZip      || null,
        cc_full_collected:    true,
        cc_collected_at:      now,
        cc_collection_method: "secure_link",
        updated_at:           now,
      })
      .eq("id", tok.rental_id)
      .select("*")
      .single();

    if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 });

    // Mark token used
    await supabase
      .from("rental_payment_tokens")
      .update({ used: true, used_at: now })
      .eq("id", tok.id);

    // Notify agent (best-effort)
    try {
      const notifyEmail = rental?.assigned_agent
        ? await supabase.from("profiles").select("email").eq("user_id", rental.assigned_agent).maybeSingle()
            .then(({ data }) => data?.email ?? "info@crestwellgetaways.com")
        : "info@crestwellgetaways.com";

      await resend.emails.send({
        from: "Crestwell <noreply@crestwellgetaways.com>",
        to: [notifyEmail],
        subject: `Card collected for ${rental?.driver_name} — ${rental?.provider}`,
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0d1b2a;color:white;padding:40px;">
            <h2 style="color:#c9a84c;margin:0 0 20px;">Card Collected via Secure Link</h2>
            <table style="width:100%;font-size:0.9rem;">
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Driver</td><td style="color:white;">${rental?.driver_name}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Provider</td><td style="color:#c9a84c;font-weight:700;text-transform:capitalize;">${rental?.provider}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Pickup</td><td style="color:white;">${rental?.pickup_date} at ${rental?.pickup_time}</td></tr>
              <tr><td style="padding:8px 0;color:rgba(255,255,255,0.5);">Card</td><td style="color:white;">••••${last4} exp ${expMonth}/${expYear}</td></tr>
            </table>
            <p style="margin-top:24px;font-size:0.85rem;color:rgba(255,255,255,0.5);">Open the rental in the CRM to submit to the provider.</p>
          </div>`,
      });
    } catch (emailErr) {
      console.error("Notification email failed (non-fatal):", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Server error" }, { status: 500 });
  }
}
