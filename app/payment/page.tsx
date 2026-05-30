'use client';
import { Suspense } from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import TokenGate, { type TokenData } from '@/components/TokenGate';

type PaymentTab = 'stripe' | 'affirm' | 'plan';
type PaymentType = 'custom' | 'deposit' | 'balance' | 'package';
type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

const PACKAGES = [
  { id: 'pkg-caribbean-7', name: 'Caribbean 7-Night Cruise', amount: 149900 },
  { id: 'pkg-mediterranean-10', name: 'Mediterranean 10-Night Cruise', amount: 299900 },
  { id: 'pkg-alaska-7', name: 'Alaska 7-Night Cruise', amount: 189900 },
  { id: 'pkg-bahamas-4', name: 'Bahamas 4-Night Cruise', amount: 89900 },
  { id: 'pkg-europe-river-8', name: 'Europe River Cruise 8-Night', amount: 349900 },
  { id: 'pkg-all-inclusive', name: 'All-Inclusive Resort Package', amount: 199900 },
];

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const STRIPE_PK = 'pk_live_51RrgVIPJljF0WNcYMZK3XH5QGmffC4LsV0e8EdSglGdrD8SlY9akQwJhBO8N2d87i574E3ONKvbsabfgKc3SDSq500gJ96MghZ';
const SITE_DOMAIN = 'https://crestwellgetaways.com';

function formatCents(cents: number) {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

// ─── Payment plan schedule calculator ────────────────────────────────────────

type PlanResult = { months: number; monthlyAmount: number; schedule: { date: string; amount: number }[]; deadline: Date } | null;

function calcPaymentPlan(totalCents: number, travelDateStr: string): PlanResult {
  if (!travelDateStr || totalCents < 100) return null;
  const today = new Date(); today.setHours(0,0,0,0);
  const travel = new Date(travelDateStr);
  const deadline = new Date(travel);
  deadline.setDate(deadline.getDate() - 90);
  if (deadline <= today) return null;
  const months = Math.max(1, Math.floor((deadline.getTime() - today.getTime()) / (30.44 * 86400000)));
  const monthlyAmount = Math.ceil(totalCents / months);
  const schedule: { date: string; amount: number }[] = [];
  let running = 0;
  for (let i = 0; i < months; i++) {
    const d = new Date(today); d.setMonth(d.getMonth() + i + 1);
    const isLast = i === months - 1;
    const amt = isLast ? totalCents - running : monthlyAmount;
    running += amt;
    schedule.push({ date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }), amount: amt });
  }
  return { months, monthlyAmount, schedule, deadline };
}

// ─── Fee offsets ──────────────────────────────────────────────────────────────
// Option 1: Build processing fees into displayed total
// Stripe: 2.9% + $0.30 → we use 3.2% buffer to fully cover
// Affirm Enhanced: 7.99% + $0.30 → we use 8.3% buffer
const STRIPE_FEE_RATE  = 0.032;   // 3.2%
const AFFIRM_FEE_RATE  = 0.083;   // 8.3%
const STRIPE_FIXED     = 30;      // 30 cents fixed
const AFFIRM_FIXED     = 30;      // 30 cents fixed

function calcStripeFee(baseCents: number): number {
  return Math.round(baseCents * STRIPE_FEE_RATE) + STRIPE_FIXED;
}

function calcAffirmFee(baseCents: number): number {
  return Math.round(baseCents * AFFIRM_FEE_RATE) + AFFIRM_FIXED;
}

function calcStripeTotal(baseCents: number): number {
  return baseCents + calcStripeFee(baseCents);
}

function calcAffirmTotal(baseCents: number): number {
  return baseCents + calcAffirmFee(baseCents);
}

function parseDollarAmount(val: string): number {
  const num = parseFloat(val.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : Math.round(num * 100);
}

function SuccessScreen({ amount, method, name, bookingRef }: {
  amount: number; method: string; name: string; bookingRef: string;
}) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 32px' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem', color: 'white' }}>✓</div>
      <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 8 }}>Payment Successful</h2>
      <p style={{ color: 'var(--slate)', fontSize: '0.9rem', marginBottom: 32 }}>
        Thank you, {name}. Your payment of <strong style={{ color: 'var(--navy)' }}>{formatCents(amount)}</strong> has been received via {method === 'stripe' ? 'credit/debit card' : 'Affirm'}.
      </p>
      <div style={{ background: 'var(--cream)', padding: '20px', marginBottom: 32, textAlign: 'left' }}>
        {[
          { label: 'Amount Paid', value: formatCents(amount) },
          { label: 'Payment Method', value: method === 'stripe' ? 'Credit / Debit Card' : method === 'plan' ? 'Payment Plan — Auto-Draft' : 'Affirm — Buy Now Pay Later' },
          ...(bookingRef ? [{ label: 'Booking Reference', value: bookingRef }] : []),
          { label: 'Confirmation', value: 'A receipt has been sent to your email' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(13,27,42,0.06)', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--slate)' }}>{item.label}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--navy)', fontWeight: 500 }}>{item.value}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="btn-navy" style={{ textDecoration: 'none' }}>Back to Home</Link>
        <Link href="/contact" style={{ padding: '12px 24px', border: '1px solid var(--navy)', color: 'var(--navy)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Contact Us</Link>
      </div>
    </div>
  );
}

function PaymentPageInner({ tokenData, token }: { tokenData: TokenData; token: string }) {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState<PaymentTab>('stripe');
  const [paymentType, setPaymentType] = useState<PaymentType>(
(tokenData.payment_type && ['custom','deposit','balance','package'].includes(tokenData.payment_type) ? tokenData.payment_type as PaymentType : 'custom')
  );
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [error, setError] = useState('');
  const [customerName, setCustomerName] = useState(tokenData.client_name || '');
  const [customerEmail, setCustomerEmail] = useState(tokenData.client_email || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingRef, setBookingRef] = useState(tokenData.booking_ref || '');
  const [tripName, setTripName] = useState(tokenData.trip_name || '');
  const [customAmount, setCustomAmount] = useState(
    tokenData.amount && tokenData.payment_type !== 'package' ? tokenData.amount.toFixed(2) : ''
  );
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[0].id);
  const [notes, setNotes] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerState, setCustomerState] = useState('');
  const [customerZip, setCustomerZip] = useState('');
  const [stripeReady, setStripeReady] = useState(false);
  const [travelDate, setTravelDate] = useState('');
  const [planMonths, setPlanMonths] = useState(0);
  const [planMonthlyAmount, setPlanMonthlyAmount] = useState(0);
  const [planSchedule, setPlanSchedule] = useState<{ date: string; amount: number }[]>([]);
  const [consentAutopay, setConsentAutopay] = useState(false);
  const [planCardReady, setPlanCardReady] = useState(false);
  const planCardRef = useRef<any>(null);
  const planCardMount = useRef<HTMLDivElement>(null);
  const [successData, setSuccessData] = useState<{ amount: number; method: string; name: string; bookingRef: string } | null>(null);

  const stripeRef = useRef<any>(null);
  const cardRef = useRef<any>(null);
  const cardMountRef = useRef<HTMLDivElement>(null);

  const amountCents = paymentType === 'package'
    ? PACKAGES.find(p => p.id === selectedPackage)?.amount ?? 0
    : parseDollarAmount(customAmount);

  // Recalculate plan when amount or travel date changes
  useEffect(() => {
    if (tab !== 'plan' || !travelDate || amountCents < 100) {
      setPlanMonths(0); setPlanMonthlyAmount(0); setPlanSchedule([]); return;
    }
    const plan = calcPaymentPlan(calcStripeTotal(amountCents), travelDate);
    if (plan) { setPlanMonths(plan.months); setPlanMonthlyAmount(plan.monthlyAmount); setPlanSchedule(plan.schedule); }
    else { setPlanMonths(0); setPlanMonthlyAmount(0); setPlanSchedule([]); }
  }, [tab, travelDate, amountCents]);

  // Mount plan card when on plan tab
  useEffect(() => {
    if (tab !== 'plan') {
      if (planCardRef.current) { planCardRef.current.unmount(); planCardRef.current = null; setPlanCardReady(false); }
      return;
    }
    if (!window.StripeInstance) return;
    if (!stripeRef.current) stripeRef.current = window.StripeInstance(STRIPE_PK);
    if (planCardRef.current) return;
    const elements = stripeRef.current.elements();
    planCardRef.current = elements.create('card', { style: { base: { fontFamily: 'Georgia, serif', fontSize: '16px', color: '#0d1b2a', '::placeholder': { color: '#94a3b8' } }, invalid: { color: '#dc2626' } } });
    const tryMount = () => { if (planCardMount.current) { planCardRef.current.mount(planCardMount.current); setPlanCardReady(true); } else setTimeout(tryMount, 50); };
    tryMount();
  }, [tab]);

  const mountStripe = () => {
    if (!window.StripeInstance) return;
    if (!stripeRef.current) {
      stripeRef.current = window.StripeInstance(STRIPE_PK);
    }
    if (cardRef.current) return; // already created
    const elements = stripeRef.current.elements();
    cardRef.current = elements.create('card', {
      style: {
        base: {
          fontFamily: '"Georgia", serif',
          fontSize: '16px',
          color: '#0d1b2a',
          fontWeight: '400',
          '::placeholder': { color: '#94a3b8' },
          iconColor: '#0d1b2a',
        },
        invalid: { color: '#dc2626', iconColor: '#dc2626' },
      },
    });
    // Wait for DOM node then mount
    const tryMount = () => {
      if (cardMountRef.current) {
        cardRef.current.mount(cardMountRef.current);
        setStripeReady(true);
      } else {
        setTimeout(tryMount, 50);
      }
    };
    tryMount();
  };


  useEffect(() => {
    if (tab === 'stripe') {
      if (window.StripeInstance) {
        mountStripe();
      }
      // If Stripe.js not loaded yet, Script onLoad will call mountStripe
    } else {
      // Unmount card when switching away so it can remount cleanly
      if (cardRef.current) {
        cardRef.current.unmount();
        cardRef.current = null;
        setStripeReady(false);
      }
    }
  }, [tab]);

  const handlePlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripeRef.current || !planCardRef.current) return;
    if (amountCents < 50) { setError('Minimum payment is $0.50'); return; }
    if (!customerName || !customerEmail) { setError('Name and email are required'); return; }
    if (!travelDate) { setError('Please enter your travel date'); return; }
    if (planSchedule.length === 0) { setError('Travel date must be more than 90 days away to set up a payment plan'); return; }
    if (!consentAutopay) { setError('You must authorize the auto-draft payment agreement to continue'); return; }
    setStatus('processing'); setError('');
    try {
      logIp('attempted', { page: 'payment' });
    const { paymentMethod, error: pmErr } = await stripeRef.current.createPaymentMethod({
        type: 'card', card: planCardRef.current,
        billing_details: { name: customerName, email: customerEmail },
      });
      if (pmErr) throw new Error(pmErr.message);
      const res = await fetch(`${SUPABASE_URL}/functions/v1/create-payment-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount_cents: calcStripeTotal(amountCents),
          travel_date: travelDate,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          booking_ref: bookingRef,
          trip_name: paymentType === 'package' ? PACKAGES.find(p => p.id === selectedPackage)?.name : tripName,
          payment_method_id: paymentMethod.id,
          months: planMonths,
          monthly_amount_cents: planMonthlyAmount,
          notes,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setSuccessData({ amount: calcStripeTotal(amountCents), method: 'plan', name: customerName, bookingRef });
      setStatus('success');
    } catch (err: any) { setError(err.message || 'Payment plan setup failed.'); setStatus('error'); }
  };

  const handleStripeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripeRef.current || !cardRef.current) return;
    if (amountCents < 50) { setError('Minimum payment is $0.50'); return; }
    if (!customerName || !customerEmail) { setError('Name and email are required'); return; }
    setStatus('processing'); setError('');
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount_cents: calcStripeTotal(amountCents),
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          booking_ref: bookingRef,
          trip_name: paymentType === 'package' ? PACKAGES.find(p => p.id === selectedPackage)?.name : tripName,
          payment_type: paymentType,
          notes,
          // Pass CRM IDs from URL params if deep-linked from agent portal
          ...(searchParams.get('trip_payment_id') ? { trip_payment_id: searchParams.get('trip_payment_id') } : {}),
          ...(searchParams.get('trip_id') ? { trip_id: searchParams.get('trip_id') } : {}),
        }),
      });
      const { clientSecret, error: fnError } = await res.json();
      if (fnError) throw new Error(fnError);
      const { error: stripeError, paymentIntent } = await stripeRef.current.confirmCardPayment(clientSecret, {
        payment_method: { card: cardRef.current, billing_details: { name: customerName, email: customerEmail } },
      });
      if (stripeError) throw new Error(stripeError.message);
      if (paymentIntent.status === 'succeeded') { logIp('succeeded', { page: 'payment', lastFour: paymentMethod?.card?.last4 });
        setSuccessData({ amount: calcStripeTotal(amountCents), method: 'stripe', name: customerName, bookingRef });
        setStatus('success');
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
      setStatus('error');
    }
  };

  const handleAffirmCheckout = async () => {
    if (amountCents < 5000) { setError('Affirm requires a minimum of $50'); return; }
    if (!customerName || !customerEmail) { setError('Name and email are required'); return; }
    if (!customerAddress || !customerCity || !customerState || !customerZip) {
      setError('Please fill in your full address — required by Affirm'); return;
    }
    if (!window.affirm) { setError('Affirm is loading. Please try again in a moment.'); return; }
    setStatus('processing'); setError('');

    const nameParts = customerName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '-';
    const orderId = bookingRef || `CTS-${Date.now()}`;
    const itemName = paymentType === 'package'
      ? (PACKAGES.find(p => p.id === selectedPackage)?.name || 'Travel Package')
      : (tripName || 'Travel Service');

    try {
      window.affirm.checkout({
        merchant: {
          user_cancel_url: `${SITE_DOMAIN}/payment/result?affirm_cancelled=1`,
          user_confirmation_url: 'https://zbtnulzvwreqzbmxulpv.supabase.co/functions/v1/affirm-webhook',
          user_confirmation_url_action: 'POST',
          name: 'Crestwell Travel Services',
          public_api_key: process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY || '',
        },
        shipping: {
          name: { first: customerName.split(' ')[0] || customerName, last: customerName.split(' ').slice(1).join(' ') || '' },
          address: {
            line1: customerAddress || '1 Travel Plaza',
            line2: '',
            city: customerCity || 'Chattanooga',
            state: customerState || 'TN',
            zipcode: customerZip || '37401',
            country: 'USA',
          },
          email: customerEmail,
          phone_number: customerPhone || '0000000000',
        },
        billing: {
          name: { first: customerName.split(' ')[0] || customerName, last: customerName.split(' ').slice(1).join(' ') || '' },
          address: {
            line1: customerAddress || '1 Travel Plaza',
            line2: '',
            city: customerCity || 'Chattanooga',
            state: customerState || 'TN',
            zipcode: customerZip || '37401',
            country: 'USA',
          },
          email: customerEmail,
          phone_number: customerPhone || '0000000000',
        },
        items: [{
          display_name: itemName,
          sku: orderId,
          unit_price: calcAffirmTotal(amountCents),
          qty: 1,
          item_image_url: 'https://crestwellgetaways.com/images/ASTAHorizontalCMYK0247817c-a713-4d83-9e60-913564067b77.png',
          item_url: `${SITE_DOMAIN}/payment`,
        }],
        metadata: {
          shipping_type: 'travel_service',
          booking_ref: orderId,
          itinerary: [
            {
              type: 'cruise',
              sku: orderId,
              display_name: (itemName || 'Cruise Vacation').replace(/\+/g, ' '),
              additional_value: [{ booking_ref: orderId }],
            }
          ],
        },
        order_id: orderId,
        currency: 'USD',
        total: calcAffirmTotal(amountCents),
        tax_amount: 0,
        shipping_amount: 0,
        discounts: {},
      });

      window.affirm.checkout.open({
        onFail: (e: any) => {
          console.error('Affirm onFail:', e);
          setError('Affirm checkout was cancelled or unavailable.');
          setStatus('idle');
        },
        onSuccess: async ({ checkout_token }: { checkout_token: string }) => {
          try {
            const res = await fetch(`${SUPABASE_URL}/functions/v1/create-affirm-charge`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                checkout_token,
                amount_cents: calcAffirmTotal(amountCents),
                customer_name: customerName,
                customer_email: customerEmail,
                booking_ref: orderId,
                trip_name: itemName,
                payment_type: paymentType,
              }),
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setSuccessData({ amount: amountCents, method: 'affirm', name: customerName, bookingRef: orderId });
            setStatus('success');
          } catch (err: any) {
            setError(err.message || 'Affirm charge failed. Please contact us.');
            setStatus('error');
          }
        },
      });
    } catch (err: any) {
      console.error('Affirm checkout error:', err);
      setError('Failed to open Affirm. Please try again or pay by card.');
      setStatus('idle');
    }
  };

  if (status === 'success' && successData) {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 72 }}>
        <div style={{ maxWidth: 600, margin: '60px auto 80px', background: 'white', boxShadow: '0 4px 40px rgba(13,27,42,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
          <SuccessScreen {...successData} />
        </div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', border: '1px solid rgba(13,27,42,0.35)',
    fontSize: '0.9rem', fontFamily: 'var(--font-body)', color: '#0d1b2a',
    background: 'white', outline: 'none', boxSizing: 'border-box',
    fontWeight: 400,
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.68rem', letterSpacing: '0.12em',
    textTransform: 'uppercase', color: '#374151', marginBottom: 6, fontFamily: 'var(--font-body)',
  };

  return (
    <>
      <Script id="stripe-js" src="https://js.stripe.com/v3/" strategy="afterInteractive" onLoad={() => { if (tab === 'stripe') mountStripe(); }} />
      <Script id="affirm-js" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        _affirm_config = { public_api_key: "${process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY || ''}", script: "https://cdn1.affirm.com/js/v2/affirm.js" };
        (function(l,g,m,e,a,f,b){var d,c=l[m]||{},h=document.createElement(f),n=document.getElementsByTagName(f)[0],k=function(a,b,c){return function(){a[b]._.push([c,arguments])}};c[e]=k(c,e,"set");d=c[e];c[a]={};c[a]._=[];d._=[];c[a][b]=k(c,a,b);a=0;for(b="set add save post open empty reset on off trigger ready setProduct".split(" ");a<b.length;a++)d[b[a]]=k(c,e,b[a]);a=0;for(b=["get","token","url","items"];a<b.length;a++)d[b[a]]=function(){};h.async=!0;h.src=g[f];n.parentNode.insertBefore(h,n);delete g[f];d(g);l[m]=c})(window,_affirm_config,"affirm","checkout","ui","script","ready");
      ` }} />

      {/* Hero */}
      <section style={{ background: 'var(--navy)', paddingTop: 120, paddingBottom: 48, position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', position: 'absolute', top: 72, left: 0, right: 0 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Secure Checkout</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>Make a Payment</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', maxWidth: 460, margin: '0 auto 24px', lineHeight: 1.75 }}>
            Pay your deposit or balance securely. Choose between card payment or Affirm monthly installments.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            {['🔒 SSL Encrypted', '✓ PCI Compliant', '💳 All Major Cards', '📅 Pay Over Time with Affirm'].map((b, i) => (
              <span key={i} style={{ fontSize: '0.68rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ background: 'var(--cream)', padding: '48px 32px 80px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ background: 'white', boxShadow: '0 4px 40px rgba(13,27,42,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>

            {/* Payment type */}
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(13,27,42,0.08)' }}>
              <div style={labelStyle}>Payment For</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {([{ id: 'custom', label: 'Custom Amount' }, { id: 'deposit', label: 'Deposit' }, { id: 'balance', label: 'Final Balance' }, { id: 'package', label: 'Package' }] as { id: PaymentType; label: string }[]).map(pt => (
                  <button key={pt.id} onClick={() => setPaymentType(pt.id)} style={{ padding: '8px 16px', border: '1px solid', borderColor: paymentType === pt.id ? 'var(--navy)' : 'rgba(13,27,42,0.15)', background: paymentType === pt.id ? 'var(--navy)' : 'white', color: paymentType === pt.id ? 'white' : 'var(--slate)', fontSize: '0.75rem', letterSpacing: '0.06em', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {pt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Token pre-fill notice */}
            {tokenData.amount && tokenData.amount > 0 && (
              <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>✓</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--navy)' }}>
                  Your specialist has pre-filled this payment
                  {tokenData.trip_name ? <> for <strong>{tokenData.trip_name}</strong></> : ''}.
                  {' '}You may adjust if needed.
                </span>
              </div>
            )}

            {/* Amount */}
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(13,27,42,0.08)' }}>
              {paymentType === 'package' ? (
                <>
                  <label style={labelStyle}>Select Package</label>
                  <select value={selectedPackage} onChange={e => setSelectedPackage(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {PACKAGES.map(pkg => <option key={pkg.id} value={pkg.id}>{pkg.name} — {formatCents(pkg.amount)}</option>)}
                  </select>
                  <div style={{ marginTop: 10, fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: 'var(--navy)', fontWeight: 300 }}>{formatCents(PACKAGES.find(p => p.id === selectedPackage)?.amount ?? 0)}</div>
                </>
              ) : (
                <>
                  <label style={labelStyle}>Amount {paymentType !== 'custom' ? `(${paymentType === 'deposit' ? 'Deposit' : 'Balance Due'})` : ''}</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--slate)' }}>$</span>
                    <input type="number" min="0.50" step="0.01" placeholder="0.00" value={customAmount} onChange={e => setCustomAmount(e.target.value)} style={{ ...inputStyle, paddingLeft: 28 }} />
                  </div>
                  {amountCents > 0 && <div style={{ marginTop: 8, fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: 'var(--navy)', fontWeight: 300 }}>{formatCents(amountCents)}</div>}
                </>
              )}
            </div>

            {/* Customer info */}
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(13,27,42,0.08)' }}>
              <div style={labelStyle}>Your Information</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Jane Smith" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="jane@example.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="(555) 000-0000" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Booking / Invoice Ref</label>
                  <input type="text" value={bookingRef} onChange={e => setBookingRef(e.target.value)} placeholder="CTS-12345" style={inputStyle} />
                </div>
                {paymentType !== 'package' && (
                  <div>
                    <label style={labelStyle}>Trip Name</label>
                    <input type="text" value={tripName} onChange={e => setTripName(e.target.value)} placeholder="Caribbean Cruise" style={inputStyle} />
                  </div>
                )}
                {/* Address fields - shown when Affirm tab is active */}
                {tab === 'affirm' && (<>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Street Address * <span style={{ color: 'var(--gold)', fontSize: '0.65rem' }}>(Required for Affirm)</span></label>
                    <input type="text" value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} placeholder="123 Main St" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>City *</label>
                    <input type="text" value={customerCity} onChange={e => setCustomerCity(e.target.value)} placeholder="Chattanooga" style={inputStyle} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                      <label style={labelStyle}>State *</label>
                      <input type="text" value={customerState} onChange={e => setCustomerState(e.target.value.toUpperCase().slice(0,2))} placeholder="TN" maxLength={2} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>ZIP *</label>
                      <input type="text" value={customerZip} onChange={e => setCustomerZip(e.target.value)} placeholder="37401" maxLength={5} style={inputStyle} />
                    </div>
                  </div>
                </>)}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Notes (optional)</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any additional info..." rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(13,27,42,0.08)' }}>
              {([{ id: 'stripe' as PaymentTab, label: '💳 Credit / Debit Card' }, { id: 'affirm' as PaymentTab, label: '📅 Pay Over Time (Affirm)' }, { id: 'plan' as PaymentTab, label: '🗓️ Payment Plan' }]).map(t => (
                <button key={t.id} onClick={() => { setTab(t.id); setError(''); }} style={{ flex: 1, padding: '16px 20px', background: 'none', border: 'none', borderBottom: tab === t.id ? '2px solid var(--gold)' : '2px solid transparent', color: tab === t.id ? 'var(--navy)' : 'var(--slate)', fontSize: '0.78rem', fontFamily: 'var(--font-body)', fontWeight: tab === t.id ? 600 : 400, letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Stripe */}
            {tab === 'stripe' && (
              <form onSubmit={handleStripeSubmit} style={{ padding: '28px 32px' }}>
                <label style={labelStyle}>Card Details</label>
                <div ref={cardMountRef} style={{ padding: '14px 16px', border: '1px solid rgba(13,27,42,0.4)', marginBottom: 20, minHeight: 52, background: 'white', borderRadius: 2 }} />
                {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 14px', marginBottom: 16, fontSize: '0.82rem', color: '#dc2626' }}>{error}</div>}
                                {amountCents > 0 && (
                  <div style={{ background: 'var(--cream)', padding: '14px 16px', marginBottom: 16, fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, color: 'var(--slate)' }}>
                      <span>Trip Amount</span><span>{formatCents(amountCents)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'var(--slate)' }}>
                      <span>Card Processing Fee (3.2%)</span><span>{formatCents(calcStripeFee(amountCents))}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--navy)', borderTop: '1px solid rgba(13,27,42,0.1)', paddingTop: 8 }}>
                      <span>Total Charged</span><span>{formatCents(calcStripeTotal(amountCents))}</span>
                    </div>
                  </div>
                )}
                <button type="submit" disabled={status === 'processing' || !stripeReady || amountCents < 50} className="btn-primary" style={{ width: '100%', border: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: '14px', opacity: status === 'processing' || !stripeReady || amountCents < 50 ? 0.6 : 1 }}>
                  {status === 'processing' ? 'Processing…' : `Pay ${amountCents > 0 ? formatCents(calcStripeTotal(amountCents)) : 'Securely'}`}
                </button>
                <p style={{ fontSize: '0.72rem', color: 'var(--slate)', textAlign: 'center', marginTop: 12 }}>🔒 Your card details are encrypted and never stored on our servers.</p>
              </form>
            )}

            {/* Affirm */}
            {tab === 'affirm' && (
              <div style={{ padding: '28px 32px' }}>
                <div style={{ background: 'var(--cream)', padding: '20px', marginBottom: 20, borderLeft: '3px solid var(--gold)' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--navy)', marginBottom: 6, fontWeight: 500 }}>Buy Now, Pay Over Time</p>
                  <p style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.7 }}>Split your travel payment into manageable monthly installments. Quick application, no hidden fees. Minimum $50.</p>
                </div>
                {amountCents >= 5000 && (
                  <div style={{ background: 'white', border: '1px solid rgba(13,27,42,0.1)', padding: '16px', marginBottom: 20, textAlign: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: '#4b5563', marginBottom: 4 }}>Estimated monthly payment</p>
                    <p className="font-display" style={{ fontSize: '1.5rem', color: 'var(--navy)', fontWeight: 300 }}>{formatCents(Math.ceil(calcAffirmTotal(amountCents) / 12))}<span style={{ fontSize: '0.8rem', color: 'var(--slate)' }}>/mo</span></p>
                    <p style={{ fontSize: '0.68rem', color: 'var(--slate)', marginTop: 4 }}>over 12 months · actual terms set by Affirm</p>
                  </div>
                )}
                {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 14px', marginBottom: 16, fontSize: '0.82rem', color: '#dc2626' }}>{error}</div>}
                                {amountCents >= 5000 && (
                  <div style={{ background: 'var(--cream)', padding: '14px 16px', marginBottom: 16, fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, color: 'var(--slate)' }}>
                      <span>Trip Amount</span><span>{formatCents(amountCents)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'var(--slate)' }}>
                      <span>Affirm Processing Fee (8.3%)</span><span>{formatCents(calcAffirmFee(amountCents))}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--navy)', borderTop: '1px solid rgba(13,27,42,0.1)', paddingTop: 8 }}>
                      <span>Total Charged</span><span>{formatCents(calcAffirmTotal(amountCents))}</span>
                    </div>
                  </div>
                )}
                <button onClick={handleAffirmCheckout} disabled={status === 'processing' || amountCents < 5000} style={{ width: '100%', padding: '14px', background: amountCents >= 5000 && status !== 'processing' ? '#0d1b2a' : '#e5e7eb', color: 'white', border: 'none', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 600, cursor: amountCents >= 5000 ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
                  {status === 'processing' ? 'Opening Affirm…' : `Continue with Affirm${amountCents > 0 ? ` — ${formatCents(calcAffirmTotal(amountCents))}` : ''}`}
                </button>
                {amountCents > 0 && amountCents < 5000 && <p style={{ fontSize: '0.72rem', color: '#dc2626', textAlign: 'center', marginTop: 8 }}>Affirm requires a minimum payment of $50</p>}
                <p style={{ fontSize: '0.72rem', color: 'var(--slate)', textAlign: 'center', marginTop: 12 }}>You will be redirected to Affirm to complete your application. Subject to credit approval.</p>
              </div>
            )}
            {/* Plan tab */}
            {tab === 'plan' && (
              <form onSubmit={handlePlanSubmit} style={{ padding: '28px 32px' }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#374151', marginBottom: 6, fontFamily: 'var(--font-body)' }}>
                    Travel Date <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <input type="date" value={travelDate} onChange={e => setTravelDate(e.target.value)}
                    min={new Date(Date.now() + 91 * 86400000).toISOString().split('T')[0]}
                    style={{ width: '100%', padding: '11px 14px', border: '1px solid rgba(13,27,42,0.35)', fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: '#0d1b2a', background: 'white', outline: 'none', boxSizing: 'border-box' }} />
                  <p style={{ fontSize: '0.7rem', color: 'var(--slate)', marginTop: 4 }}>Final payment due 90 days before departure. Minimum 91 days away required.</p>
                </div>

                {travelDate && planSchedule.length === 0 && amountCents > 0 && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', marginBottom: 16, fontSize: '0.82rem', color: '#dc2626' }}>
                    Travel date must be at least 91 days from today to set up a payment plan.
                  </div>
                )}

                {planSchedule.length > 0 && amountCents > 0 && (
                  <>
                    <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', padding: '16px 20px', marginBottom: 12 }}>
                      <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 10 }}>Payment Plan Summary</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {[
                          { label: 'Total Amount', value: formatCents(calcStripeTotal(amountCents)) },
                          { label: 'Monthly Payment', value: formatCents(planMonthlyAmount) },
                          { label: 'Number of Payments', value: `${planMonths} months` },
                          { label: 'Final Payment Due', value: planSchedule[planSchedule.length - 1]?.date || '' },
                        ].map((item, i) => (
                          <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(13,27,42,0.06)' }}>
                            <div style={{ fontSize: '0.62rem', color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{item.label}</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 600 }}>{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ border: '1px solid rgba(13,27,42,0.08)', overflow: 'hidden', marginBottom: 16 }}>
                      <div style={{ padding: '10px 16px', background: 'var(--navy)', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Draft Date</span>
                        <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Amount</span>
                      </div>
                      <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                        {planSchedule.map((p, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 16px', borderBottom: i < planSchedule.length - 1 ? '1px solid rgba(13,27,42,0.05)' : 'none', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--navy)' }}>
                              {p.date}
                              {i === planSchedule.length - 1 && <span style={{ fontSize: '0.65rem', background: 'var(--gold)', color: 'var(--navy)', padding: '1px 6px', marginLeft: 8, fontWeight: 600 }}>FINAL</span>}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--navy)', fontWeight: 600 }}>{formatCents(p.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--slate)', marginBottom: 16 }}>⚡ First payment drafted today upon setup. Remaining payments auto-drafted on the dates above.</p>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#374151', marginBottom: 6, fontFamily: 'var(--font-body)' }}>Card for Auto-Draft Payments</label>
                      <div ref={planCardMount} style={{ padding: '14px 16px', border: '1px solid rgba(13,27,42,0.35)', background: 'white', minHeight: 50 }} />
                      <p style={{ fontSize: '0.7rem', color: 'var(--slate)', marginTop: 4 }}>🔒 Stored securely by Stripe. Never stored on our servers.</p>
                    </div>

                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px 16px', marginBottom: 14, fontSize: '0.75rem', color: '#374151', lineHeight: 1.7, maxHeight: 160, overflowY: 'auto' }}>
                      <strong>AUTO-DRAFT PAYMENT AUTHORIZATION & TERMS:</strong><br /><br />
                      By checking below, I authorize Crestwell Travel Services and Stripe to automatically charge the card provided on each scheduled payment date.<br /><br />
                      <strong>Grace Period:</strong> Each payment has a 5-day grace period. If a payment fails, Stripe will automatically retry within the grace period.<br /><br />
                      <strong>Late Payment Fee:</strong> Any payment not successfully collected within the 5-day grace period will incur a <strong>$25 late payment fee</strong>, which will be added to the next scheduled draft.<br /><br />
                      <strong>Cancellation Policy:</strong> Two (2) missed payments — payments not collected within their respective 5-day grace periods — will result in <strong>automatic cancellation</strong> of this payment plan and your booking reservation. Any amounts collected prior to cancellation are non-refundable except per Crestwell's standard cancellation policy.<br /><br />
                      <strong>Cancellation Notice:</strong> You may cancel this auto-draft authorization by contacting us at least 5 business days before the next scheduled payment at <strong>888.508.6893</strong> or <strong>info@crestwellgetaways.com</strong>.<br /><br />
                      This plan completes 90 days before your travel date to ensure full payment prior to departure.
                    </div>

                    <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer', marginBottom: 16 }}>
                      <input type="checkbox" checked={consentAutopay} onChange={e => setConsentAutopay(e.target.checked)} style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, cursor: 'pointer' }} />
                      <div>
                        <span style={{ fontSize: '0.875rem', color: '#0d1b2a', fontWeight: 600 }}>
                          I authorize {planMonths} monthly auto-draft payment{planMonths > 1 ? 's' : ''} of {formatCents(planMonthlyAmount)} as scheduled
                        </span>
                        <p style={{ fontSize: '0.72rem', color: '#6b7280', marginTop: 3, lineHeight: 1.5 }}>
                          I understand: (1) payments include a 5-day grace period, (2) a $25 late fee applies after the grace period, (3) 2 missed payments will result in automatic cancellation of my plan and booking, and (4) my final payment completes 90 days before travel.
                        </p>
                      </div>
                    </label>

                    <div style={{ background: 'var(--cream)', padding: '12px 16px', marginBottom: 16, fontSize: '0.78rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, color: 'var(--slate)' }}><span>Trip Amount</span><span>{formatCents(amountCents)}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'var(--slate)' }}><span>Processing Fee (3.2%)</span><span>{formatCents(calcStripeFee(amountCents))}</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--navy)', borderTop: '1px solid rgba(13,27,42,0.1)', paddingTop: 8 }}><span>Total Collected</span><span>{formatCents(calcStripeTotal(amountCents))}</span></div>
                    </div>

                    {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '10px 14px', marginBottom: 14, fontSize: '0.82rem', color: '#dc2626' }}>{error}</div>}

                    <button type="submit" disabled={status === 'processing' || !planCardReady || !consentAutopay} className="btn-primary"
                      style={{ width: '100%', border: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: '13px', opacity: (status === 'processing' || !planCardReady || !consentAutopay) ? 0.6 : 1 }}>
                      {status === 'processing' ? 'Setting Up Plan...' : `Confirm Plan — ${planMonths} × ${formatCents(planMonthlyAmount)}/mo`}
                    </button>
                    <p style={{ fontSize: '0.7rem', color: 'var(--slate)', textAlign: 'center', marginTop: 10 }}>First draft today. Subsequent payments auto-drafted monthly until complete.</p>
                  </>
                )}
              </form>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <p style={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.7 }}>
              Questions? Call <a href="tel:8885086893" style={{ color: 'var(--navy)', fontWeight: 500, textDecoration: 'none' }}>888.508.6893</a> or email <a href="mailto:info@crestwellgetaways.com" style={{ color: 'var(--navy)', fontWeight: 500, textDecoration: 'none' }}>info@crestwellgetaways.com</a>
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          .payment-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

declare global {
  interface Window { StripeInstance: any; affirm: any; _affirm_config: any; }
}

function PaymentPageWithGate() {
  return (
    <TokenGate linkType="payment">
      {(tokenData, token) => <PaymentPageInner tokenData={tokenData} token={token} />}
    </TokenGate>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div style={{ background: 'var(--navy)', minHeight: '100vh' }} />}>
      <PaymentPageWithGate />
    </Suspense>
  );
}
