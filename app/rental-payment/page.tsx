"use client";
import { useEffect, useState } from "react";
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

export default function RentalPaymentPage() {
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

  if (loading) return <p className="p-8">Loading…</p>;
  if (error)   return <div className="p-8 max-w-xl mx-auto"><h1 className="text-2xl font-bold">Unable to load</h1><p>{error}</p></div>;
  if (!rental) return null;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Secure Card Collection</h1>
      <div className="border rounded p-4 mb-4 space-y-1 text-sm">
        <div><b>Provider:</b> {rental.provider}</div>
        <div><b>Vehicle:</b> {rental.vehicle_class}</div>
        <div><b>Pickup:</b> {rental.pickup_location} — {rental.pickup_date} {rental.pickup_time}</div>
        <div><b>Drop-off:</b> {rental.dropoff_location || rental.pickup_location} — {rental.return_date} {rental.return_time}</div>
        {rental.quoted_price && <div className="text-lg"><b>Total: ${Number(rental.quoted_price).toFixed(2)}</b></div>}
      </div>
      <Elements stripe={stripePromise}>
        <CardForm token={token!} rental={rental} />
      </Elements>
      <p className="text-xs text-gray-500 mt-4">
        Your card is stored securely by Stripe — never on our servers.
      </p>
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true); setErr(null);
    const card = elements.getElement(CardElement);
    if (!card) { setSubmitting(false); return; }
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card", card,
      billing_details: { name, address: { postal_code: zip } },
    });
    if (error || !paymentMethod) {
      setErr(error?.message ?? "Card error"); setSubmitting(false); return;
    }
    const res = await fetch("/api/rental-payment", {
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
    const data = await res.json();
    if (!res.ok) { setErr(data.error || "Failed"); setSubmitting(false); return; }
    setDone(true);
  };

  if (done) return (
    <div className="border rounded p-4 bg-green-50">
      <h2 className="font-bold text-lg">Card Saved</h2>
      <p>Your agent will complete the reservation and email you a confirmation shortly.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Cardholder Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required
          className="border rounded w-full px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Card</label>
        <div className="border rounded px-3 py-3"><CardElement /></div>
      </div>
      <div>
        <label className="block text-sm font-medium">Billing ZIP</label>
        <input value={zip} onChange={(e) => setZip(e.target.value)} required
          className="border rounded w-full px-3 py-2" />
      </div>
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <button type="submit" disabled={!stripe || submitting}
        className="bg-[#0a2540] text-white font-semibold px-6 py-3 rounded w-full">
        {submitting ? "Saving…" : "Save Card Securely"}
      </button>
    </form>
  );
}
