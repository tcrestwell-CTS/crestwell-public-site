"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { createClient } from "@supabase/supabase-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function RentalPaymentInner() {
  const token = useSearchParams().get("token");
  const [rental, setRental] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!token) { setError("Missing token"); setLoading(false); return; }
      const { data: tok } = await supabase
        .from("rental_payment_tokens")
        .select("rental_id, used, expires_at")
        .eq("token", token)
        .maybeSingle();
      if (!tok) { setError("Invalid link"); setLoading(false); return; }
      if (tok.used) { setError("This link has already been used."); setLoading(false); return; }
      if (new Date(tok.expires_at) < new Date()) { setError("This link has expired."); setLoading(false); return; }
      const { data: r } = await supabase
        .from("car_rental_requests").select("*").eq("id", tok.rental_id).single();
      setRental(r);
      setLoading(false);
    })();
  }, [token]);

  if (loading) return <p className="p-8 text-center" style={{ fontFamily: "var(--font-body)", color: "var(--slate)" }}>Loading...</p>;
  if (error) return (
    <div style={{ maxWidth: 560, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "var(--navy)", marginBottom: 12 }}>Unable to Load</h1>
      <p style={{ color: "var(--slate)", fontFamily: "var(--font-body)" }}>{error}</p>
    </div>
  );
  if (!rental) return null;

  return (
    <div style={{ background: "var(--warm-white)", minHeight: "100vh", padding: "80px 24px" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-body)", marginBottom: 8 }}>
            Crestwell Travel Services
          </p>
          <h1 className="font-display" style={{ fontSize: "2rem", fontWeight: 400, color: "var(--navy)", marginBottom: 8 }}>
            Secure Card Collection
          </h1>
          <p style={{ fontSize: "0.85rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>
            Your card will not be charged — it is used to secure your rental reservation.
          </p>
        </div>

        <div style={{ background: "var(--navy)", borderRadius: 12, padding: "20px 24px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,var(--gold),rgba(201,168,76,0.6),var(--gold))" }} />
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", marginBottom: 12 }}>Reservation Summary</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px", fontSize: "0.85rem", fontFamily: "var(--font-body)" }}>
            <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Provider</span><br /><span style={{ color: "var(--gold)", fontWeight: 700, textTransform: "capitalize" }}>{rental.provider}</span></div>
            <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Vehicle</span><br /><span style={{ color: "white" }}>{rental.vehicle_class}</span></div>
            <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Pickup</span><br /><span style={{ color: "white" }}>{rental.pickup_location}<br />{rental.pickup_date} at {rental.pickup_time}</span></div>
            <div><span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Drop-off</span><br /><span style={{ color: "white" }}>{rental.dropoff_location || rental.pickup_location}<br />{rental.return_date ? `${rental.return_date} at ${rental.return_time}` : "Same day"}</span></div>
            {rental.quoted_price && (
              <div style={{ gridColumn: "1 / -1" }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem" }}>Quoted Total</span><br />
                <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: "1.1rem" }}>${Number(rental.quoted_price).toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        <Elements stripe={stripePromise}>
          <CardForm token={token!} rental={rental} />
        </Elements>

        <p style={{ fontSize: "0.72rem", color: "var(--slate)", marginTop: 16, textAlign: "center", fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
          Your card is processed securely by Stripe. Crestwell Travel Services never stores your full card number.
        </p>
      </div>
    </div>
  );
}

function CardForm({ token, rental }: { token: string; rental: any }) {
  const stripe = useStripe();
  const elements = useElements();
  const [name, setName] = useState(rental.driver_name || "");
  const [zip, setZip] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const inputSt: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 8,
    border: "1.5px solid rgba(13,27,42,0.15)", fontSize: "0.9rem",
    color: "var(--navy)", background: "#fff", boxSizing: "border-box",
    outline: "none", fontFamily: "var(--font-body)",
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setErr(null);
    const card = elements.getElement(CardElement);
    if (!card) { setSubmitting(false); return; }
    stripe.createPaymentMethod({ type: "card", card, billing_details: { name, address: { postal_code: zip } } })
      .then(({ paymentMethod, error: pmErr }) => {
        if (pmErr || !paymentMethod) throw new Error(pmErr?.message ?? "Card error");
        return fetch("/api/rental-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            paymentMethodId: paymentMethod.id,
            last4: paymentMethod.card?.last4,
            expMonth: paymentMethod.card?.exp_month,
            expYear: paymentMethod.card?.exp_year,
            cardholderName: name,
            billingZip: zip,
          }),
        });
      })
      .then(res => res.json().then((d: any) => ({ ok: res.ok, d })))
      .then(({ ok, d }: any) => {
        if (!ok) throw new Error(d.error || "Failed");
        setDone(true);
      })
      .catch((e: Error) => setErr(e.message))
      .finally(() => setSubmitting(false));
  };

  if (done) return (
    <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: 12, padding: "28px 24px", textAlign: "center" }}>
      <div style={{ fontSize: "2rem", marginBottom: 12 }}>&#10003;</div>
      <h2 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#166534", marginBottom: 8 }}>Card Saved</h2>
      <p style={{ fontSize: "0.85rem", color: "#166534", fontFamily: "var(--font-body)", lineHeight: 1.7 }}>
        Your agent will complete the reservation and email you a confirmation shortly.<br />
        Questions? Call us at <strong>888.508.6893</strong>.
      </p>
    </div>
  );

  return (
    <div style={{ background: "white", borderRadius: 12, padding: "28px 24px", border: "1px solid rgba(13,27,42,0.1)" }}>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--slate)", marginBottom: 6, fontFamily: "var(--font-body)" }}>
          Cardholder Name
        </label>
        <input value={name} onChange={e => setName(e.target.value)} required style={inputSt} placeholder="Name as it appears on card" />
      </div>
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--slate)", marginBottom: 6, fontFamily: "var(--font-body)" }}>
          Card Details
        </label>
        <div style={{ border: "1.5px solid rgba(13,27,42,0.15)", borderRadius: 8, padding: "14px 16px", background: "#fff" }}>
          <CardElement options={{ style: { base: { fontSize: "16px", color: "#0d1b2a", fontFamily: "system-ui, sans-serif" } } }} />
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--slate)", marginBottom: 6, fontFamily: "var(--font-body)" }}>
          Billing ZIP
        </label>
        <input value={zip} onChange={e => setZip(e.target.value)} required style={inputSt} placeholder="30301" />
      </div>
      {err && <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 8, padding: "10px 14px", fontSize: "0.82rem", color: "#991b1b", marginBottom: 16, fontFamily: "var(--font-body)" }}>{err}</div>}
      <button onClick={onSubmit} disabled={!stripe || submitting}
        style={{ width: "100%", padding: "14px", background: !stripe || submitting ? "#cbd5e1" : "var(--navy)", color: !stripe || submitting ? "#94a3b8" : "var(--gold)", border: "none", borderRadius: 8, cursor: !stripe || submitting ? "not-allowed" : "pointer", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>
        {submitting ? "Saving..." : "Save Card Securely"}
      </button>
    </div>
  );
}

export default function RentalPaymentPage() {
  return (
    <Suspense fallback={<p className="p-8 text-center">Loading...</p>}>
      <RentalPaymentInner />
    </Suspense>
  );
}
