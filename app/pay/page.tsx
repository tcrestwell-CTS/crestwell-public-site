'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const STRIPE_PK = 'pk_live_51RrgVIPJljF0WNcYMZK3XH5QGmffC4LsV0e8EdSglGdrD8SlY9akQwJhBO8N2d87i574E3ONKvbsabfgKc3SDSq500gJ96MghZ';
const SITE_DOMAIN = 'https://crestwellgetaways.com';

// ─── Fee constants ────────────────────────────────────────────────────────────
const STRIPE_FEE_RATE = 0.032;
const AFFIRM_FEE_RATE = 0.083;
const STRIPE_FIXED    = 30;
const AFFIRM_FIXED    = 30;

// ─── Group trip packages ─────────────────────────────────────────────────────
const GROUP_TRIPS = [
  { id: 'bsc-cobb', name: 'BSC for Cobb County Cruise', depositPerPerson: 25000 },  // $250
  { id: 'angels-first', name: "Angels First Cruise", depositPerPerson: 15000 },       // $150
  { id: 'claires-60th', name: "Claire's 60th Birthday Celebration", depositPerPerson: 35000 },  // $350
];

function formatCents(cents: number) {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
function parseDollarAmount(val: string): number {
  const num = parseFloat(val.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : Math.round(num * 100);
}
function calcStripeFee(base: number)   { return Math.round(base * STRIPE_FEE_RATE) + STRIPE_FIXED; }
function calcAffirmFee(base: number)   { return Math.round(base * AFFIRM_FEE_RATE) + AFFIRM_FIXED; }
function calcStripeTotal(base: number) { return base + calcStripeFee(base); }
function calcAffirmTotal(base: number) { return base + calcAffirmFee(base); }

type Tab = 'stripe' | 'affirm';

// ─── Success screen ───────────────────────────────────────────────────────────
function SuccessScreen({ amount, method, name }: { amount: number; method: string; name: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 32px' }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem', color: 'white' }}>✓</div>
      <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 8 }}>Payment Received</h2>
      <p style={{ color: 'var(--slate)', fontSize: '0.9rem', marginBottom: 32, lineHeight: 1.7 }}>
        Thank you, {name}. Your payment of <strong style={{ color: 'var(--navy)' }}>{formatCents(amount)}</strong> has been received. Our team will be in touch shortly to confirm your booking details.
      </p>
      <div style={{ background: 'var(--cream)', padding: '16px 20px', marginBottom: 32, textAlign: 'left' }}>
        {[
          { label: 'Amount Paid', value: formatCents(amount) },
          { label: 'Method', value: method === 'stripe' ? 'Credit / Debit Card' : 'Affirm' },
          { label: 'Next Step', value: 'A receipt has been sent to your email' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < 2 ? '1px solid rgba(13,27,42,0.06)' : 'none', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--slate)' }}>{item.label}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--navy)', fontWeight: 500 }}>{item.value}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="btn-navy" style={{ textDecoration: 'none' }}>Back to Home</Link>
        <a href="tel:8885086893" style={{ padding: '12px 24px', border: '1px solid var(--navy)', color: 'var(--navy)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Call Us</a>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function PublicPayPage() {
  const [tab, setTab] = useState<Tab>('stripe');
  const [amount, setAmount] = useState('');
  const [tripId, setTripId] = useState('');
  const [persons, setPersons] = useState(1);
  const [useGroupTrip, setUseGroupTrip] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [tripName, setTripName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [stripeReady, setStripeReady] = useState(false);

  const stripeRef = useRef<any>(null);
  const cardRef   = useRef<any>(null);
  const cardMount = useRef<HTMLDivElement>(null);

  const selectedTrip = GROUP_TRIPS.find(t => t.id === tripId);
  const amountCents = useGroupTrip && selectedTrip
    ? selectedTrip.depositPerPerson * persons
    : parseDollarAmount(amount);
  const amountDisplay = useGroupTrip && selectedTrip
    ? `${selectedTrip.name} — ${persons} person${persons > 1 ? 's' : ''}`
    : (tripName || 'Travel Deposit');

  // Mount Stripe
  const mountStripe = () => {
    if (!window.Stripe) return;
    if (!stripeRef.current) stripeRef.current = window.Stripe(STRIPE_PK);
    if (cardRef.current) return;
    const elements = stripeRef.current.elements();
    cardRef.current = elements.create('card', {
      style: { base: { fontFamily: 'Georgia, serif', fontSize: '16px', color: '#0d1b2a', '::placeholder': { color: '#94a3b8' } }, invalid: { color: '#dc2626' } },
    });
    const tryMount = () => {
      if (cardMount.current) { cardRef.current.mount(cardMount.current); setStripeReady(true); }
      else setTimeout(tryMount, 50);
    };
    tryMount();
  };

  // ── Decode compact invite links (?d=base64) before reading params ──────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const d = params.get('d');
    if (!d) return;
    try {
      const json = atob(d.replace(/-/g, '+').replace(/_/g, '/'));
      const data = JSON.parse(json);
      const url = new URL(window.location.href);
      url.searchParams.delete('d');
      Object.entries(data).forEach(([key, value]) => {
        url.searchParams.set(key, String(value));
      });
      window.history.replaceState({}, '', url.toString());
      // Reload so the page re-reads expanded params
      window.location.replace(url.toString());
    } catch (e) {
      console.error('Failed to decode invite link data:', e);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tab === 'stripe') { if (window.Stripe) mountStripe(); }
    else {
      if (cardRef.current) { cardRef.current.unmount(); cardRef.current = null; setStripeReady(false); }
    }
  }, [tab]);

  // Stripe submit
  const handleStripe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (amountCents < 50) { setError('Minimum payment is $0.50'); return; }
    if (!name || !email) { setError('Name and email are required'); return; }
    setStatus('processing'); setError('');
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount_cents: calcStripeTotal(amountCents),
          customer_name: name, customer_email: email,
          customer_phone: phone,
          booking_ref: bookingRef,
          trip_name: useGroupTrip && selectedTrip ? selectedTrip.name : tripName,
          payment_type: 'deposit',
          notes: useGroupTrip ? `Group deposit: ${persons} persons` : 'Public deposit link',
          // Pass trip_id when known so create-payment-intent can match the right installment
          ...(useGroupTrip && selectedTrip?.id ? { trip_id: selectedTrip.id } : {}),
        }),
      });
      const { clientSecret, error: fnErr } = await res.json();
      if (fnErr) throw new Error(fnErr);
      const { error: stripeErr, paymentIntent } = await stripeRef.current.confirmCardPayment(clientSecret, {
        payment_method: { card: cardRef.current, billing_details: { name, email } },
      });
      if (stripeErr) throw new Error(stripeErr.message);
      if (paymentIntent.status === 'succeeded') setStatus('success');
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
      setStatus('error');
    }
  };

  // Affirm checkout
  const handleAffirm = () => {
    if (amountCents < 5000) { setError('Affirm requires a minimum of $50'); return; }
    if (!name || !email) { setError('Name and email are required'); return; }
    if (!address || !city || !state || !zip) { setError('Full address is required for Affirm'); return; }
    if (!window.affirm) { setError('Affirm is still loading. Please try again.'); return; }
    setStatus('processing'); setError('');
    const [firstName, ...rest] = name.trim().split(' ');
    window.affirm.checkout({
      merchant: {
        user_cancel_url: `${SITE_DOMAIN}/pay`,
        user_confirmation_url: `${SITE_DOMAIN}/pay`,
        user_confirmation_url_action: 'GET',
        name: 'Crestwell Travel Services',
        public_api_key: process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY || '',
      },
      shipping: {
        name: { full: name },
        address: { line1: address, city, state, zipcode: zip, country: 'USA' },
        email, phone_number: phone || '0000000000',
      },
      billing: {
        name: { full: name },
        address: { line1: address, city, state, zipcode: zip, country: 'USA' },
        email, phone_number: phone || '0000000000',
      },
      items: [{
        display_name: amountDisplay,
        sku: bookingRef || `CTS-DEP-${Date.now()}`,
        unit_price: calcAffirmTotal(amountCents),
        qty: 1,
      }],
      order_id: bookingRef || `CTS-DEP-${Date.now()}`,
      currency: 'USD',
      total: calcAffirmTotal(amountCents),
      tax_amount: 0, shipping_amount: 0, discounts: {},
    });
    window.affirm.checkout.open({
      onFail: (e: any) => { setError(e?.reason || 'Affirm checkout cancelled.'); setStatus('idle'); },
      onSuccess: async ({ checkout_token }: { checkout_token: string }) => {
        try {
          const res = await fetch(`${SUPABASE_URL}/functions/v1/create-affirm-charge`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              checkout_token, amount_cents: calcAffirmTotal(amountCents),
              customer_name: name, customer_email: email,
              booking_ref: bookingRef, trip_name: useGroupTrip && selectedTrip ? selectedTrip.name : tripName, payment_type: 'deposit',
            }),
          });
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          setStatus('success');
        } catch (err: any) { setError(err.message || 'Affirm charge failed.'); setStatus('error'); }
      },
    });
  };

  if (status === 'success') {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 72 }}>
        <div style={{ maxWidth: 560, margin: '60px auto 80px', background: 'white', boxShadow: '0 4px 40px rgba(13,27,42,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>
          <SuccessScreen amount={tab === 'stripe' ? calcStripeTotal(amountCents) : calcAffirmTotal(amountCents)} method={tab} name={name} />
        </div>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    border: '1px solid rgba(13,27,42,0.25)',
    fontSize: '0.875rem', fontFamily: 'var(--font-body)',
    color: '#0d1b2a', background: 'white',
    outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.68rem',
    letterSpacing: '0.1em', textTransform: 'uppercase',
    color: '#374151', marginBottom: 5, fontFamily: 'var(--font-body)',
  };

  return (
    <>
      <Script id="stripe-js" src="https://js.stripe.com/v3/" strategy="afterInteractive" onLoad={() => { if (tab === 'stripe') mountStripe(); }} />
      <Script id="affirm-js" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        _affirm_config = { public_api_key: "${process.env.NEXT_PUBLIC_AFFIRM_PUBLIC_KEY || ''}", script: "https://cdn1.affirm.com/js/v2/affirm.js" };
        (function(l,g,m,e,a,f,b){var d,c=l[m]||{},h=document.createElement(f),n=document.getElementsByTagName(f)[0],k=function(a,b,c){return function(){a[b]._.push([c,arguments])}};c[e]=k(c,e,"set");d=c[e];c[a]={};c[a]._=[];d._=[];c[a][b]=k(c,a,b);a=0;for(b="set add save post open empty reset on off trigger ready setProduct".split(" ");a<b.length;a++)d[b[a]]=k(c,e,b[a]);a=0;for(b=["get","token","url","items"];a<b.length;a++)d[b[a]]=function(){};h.async=!0;h.src=g[f];n.parentNode.insertBefore(h,n);delete g[f];d(g);l[m]=c})(window,_affirm_config,"affirm","checkout","ui","script","ready");
      ` }} />

      {/* Hero */}
      <section style={{ background: 'var(--navy)', paddingTop: 100, paddingBottom: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', position: 'absolute', top: 72, left: 0, right: 0 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 14 }}>Secure Payment</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 300, color: 'white', marginBottom: 12 }}>
            Make a Deposit
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', maxWidth: 440, margin: '0 auto 20px', lineHeight: 1.75 }}>
            Secure your travel booking with a deposit. Pay by card or choose Affirm to split into monthly installments.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            {['🔒 SSL Encrypted', '✓ PCI Compliant', '📅 Pay Over Time with Affirm'].map((b, i) => (
              <span key={i} style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ background: 'var(--cream)', padding: '40px 32px 80px' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <div style={{ background: 'white', boxShadow: '0 4px 40px rgba(13,27,42,0.08)', border: '1px solid rgba(201,168,76,0.15)' }}>

            {/* Amount */}
            <div style={{ padding: '28px 32px', borderBottom: '1px solid rgba(13,27,42,0.07)' }}>

              {/* Toggle */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                <button
                  onClick={() => setUseGroupTrip(false)}
                  style={{ flex: 1, padding: '9px', border: '1px solid', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.06em', fontFamily: 'var(--font-body)', transition: 'all 0.2s',
                    borderColor: !useGroupTrip ? 'var(--navy)' : 'rgba(13,27,42,0.2)',
                    background: !useGroupTrip ? 'var(--navy)' : 'white',
                    color: !useGroupTrip ? 'white' : 'var(--slate)',
                  }}>
                  Custom Amount
                </button>
                <button
                  onClick={() => setUseGroupTrip(true)}
                  style={{ flex: 1, padding: '9px', border: '1px solid', cursor: 'pointer', fontSize: '0.75rem', letterSpacing: '0.06em', fontFamily: 'var(--font-body)', transition: 'all 0.2s',
                    borderColor: useGroupTrip ? 'var(--navy)' : 'rgba(13,27,42,0.2)',
                    background: useGroupTrip ? 'var(--navy)' : 'white',
                    color: useGroupTrip ? 'white' : 'var(--slate)',
                  }}>
                  Group Trip Deposit
                </button>
              </div>

              {/* Custom amount */}
              {!useGroupTrip && (
                <>
                  <label style={labelStyle}>Deposit Amount <span style={{ color: '#dc2626' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: '1rem' }}>$</span>
                    <input
                      type="number" min="0.50" step="0.01" placeholder="0.00"
                      value={amount} onChange={e => setAmount(e.target.value)}
                      style={{ ...inputStyle, paddingLeft: 28, fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}
                    />
                  </div>
                  {amountCents > 0 && (
                    <div className="font-display" style={{ fontSize: '1.6rem', color: 'var(--navy)', fontWeight: 300, marginTop: 8 }}>
                      {formatCents(amountCents)}
                    </div>
                  )}
                </>
              )}

              {/* Group trip selector */}
              {useGroupTrip && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Select Trip <span style={{ color: '#dc2626' }}>*</span></label>
                    <select
                      value={tripId}
                      onChange={e => {
                        const t = GROUP_TRIPS.find(x => x.id === e.target.value);
                        setTripId(e.target.value);
                        if (t) setTripName(t.name);
                      }}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      <option value="">Choose a trip...</option>
                      {GROUP_TRIPS.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.name} — {formatCents(t.depositPerPerson)}/person
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Number of Persons <span style={{ color: '#dc2626' }}>*</span></label>
                    <select
                      value={persons}
                      onChange={e => setPersons(parseInt(e.target.value))}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'person' : 'persons'}</option>
                      ))}
                    </select>
                  </div>

                  {/* Deposit summary */}
                  {selectedTrip && (
                    <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.8rem', color: 'var(--slate)' }}>
                        <span>{selectedTrip.name}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.78rem', color: 'var(--slate)' }}>
                        <span>Deposit per person</span>
                        <span>{formatCents(selectedTrip.depositPerPerson)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.78rem', color: 'var(--slate)' }}>
                        <span>× {persons} {persons === 1 ? 'person' : 'persons'}</span>
                        <span>{formatCents(selectedTrip.depositPerPerson * persons)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--navy)', borderTop: '1px solid rgba(201,168,76,0.2)', paddingTop: 8, marginTop: 4 }}>
                        <span className="font-display" style={{ fontSize: '1rem' }}>Total Deposit</span>
                        <span className="font-display" style={{ fontSize: '1.4rem', fontWeight: 300 }}>{formatCents(amountCents)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Customer info */}
            <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(13,27,42,0.07)' }}>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 14 }}>Your Information</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Full Name <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Smith" style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Email <span style={{ color: '#dc2626' }}>*</span></label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@email.com" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 000-0000" style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Last Name <span style={{ color: '#dc2626' }}>*</span></label>
                    <input type="text" value={bookingRef} onChange={e => setBookingRef(e.target.value)} placeholder="Smith" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Trip</label>
                    <input
                      type="text"
                      value={tripName}
                      onChange={e => { if (!useGroupTrip) setTripName(e.target.value); }}
                      placeholder={useGroupTrip ? '' : 'Caribbean Cruise'}
                      readOnly={useGroupTrip}
                      style={{ ...inputStyle, background: useGroupTrip ? '#f8fafc' : 'white', color: useGroupTrip ? 'var(--navy)' : '#0d1b2a', cursor: useGroupTrip ? 'default' : 'text' }}
                    />
                  </div>
                </div>

                {/* Affirm address fields */}
                {tab === 'affirm' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8, borderTop: '1px solid rgba(13,27,42,0.06)' }}>
                    <div style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>Address Required for Affirm</div>
                    <div>
                      <label style={labelStyle}>Street Address <span style={{ color: '#dc2626' }}>*</span></label>
                      <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="123 Main St" style={inputStyle} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={labelStyle}>City <span style={{ color: '#dc2626' }}>*</span></label>
                        <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Chattanooga" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>State <span style={{ color: '#dc2626' }}>*</span></label>
                        <input type="text" value={state} onChange={e => setState(e.target.value.toUpperCase().slice(0, 2))} placeholder="TN" maxLength={2} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>ZIP <span style={{ color: '#dc2626' }}>*</span></label>
                        <input type="text" value={zip} onChange={e => setZip(e.target.value)} placeholder="37401" maxLength={5} style={inputStyle} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment method tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(13,27,42,0.07)' }}>
              {([{ id: 'stripe' as Tab, label: '💳 Credit / Debit Card' }, { id: 'affirm' as Tab, label: '📅 Pay Over Time (Affirm)' }]).map(t => (
                <button key={t.id} onClick={() => { setTab(t.id); setError(''); }} style={{
                  flex: 1, padding: '15px 16px', background: 'none', border: 'none',
                  borderBottom: tab === t.id ? '2px solid var(--gold)' : '2px solid transparent',
                  color: tab === t.id ? 'var(--navy)' : 'var(--slate)',
                  fontSize: '0.78rem', fontFamily: 'var(--font-body)',
                  fontWeight: tab === t.id ? 600 : 400,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Stripe */}
            {tab === 'stripe' && (
              <form onSubmit={handleStripe} style={{ padding: '24px 32px' }}>
                <label style={labelStyle}>Card Details</label>
                <div ref={cardMount} style={{ padding: '14px 16px', border: '1px solid rgba(13,27,42,0.35)', marginBottom: 16, minHeight: 50, background: 'white' }} />
                {amountCents > 0 && (
                  <div style={{ background: 'var(--cream)', padding: '12px 16px', marginBottom: 16, fontSize: '0.78rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, color: 'var(--slate)' }}>
                      <span>Deposit Amount</span><span>{formatCents(amountCents)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'var(--slate)' }}>
                      <span>Card Processing Fee (3.2%)</span><span>{formatCents(calcStripeFee(amountCents))}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--navy)', borderTop: '1px solid rgba(13,27,42,0.1)', paddingTop: 8 }}>
                      <span>Total Charged</span><span>{formatCents(calcStripeTotal(amountCents))}</span>
                    </div>
                  </div>
                )}
                {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '10px 14px', marginBottom: 14, fontSize: '0.82rem', color: '#dc2626' }}>{error}</div>}
                <button type="submit" disabled={status === 'processing' || !stripeReady || amountCents < 50} className="btn-primary"
                  style={{ width: '100%', border: 'none', cursor: 'pointer', fontSize: '0.875rem', padding: '13px', opacity: status === 'processing' || !stripeReady || amountCents < 50 ? 0.6 : 1 }}>
                  {status === 'processing' ? 'Processing…' : `Pay ${amountCents > 0 ? formatCents(calcStripeTotal(amountCents)) : 'Securely'}`}
                </button>
                <p style={{ fontSize: '0.7rem', color: 'var(--slate)', textAlign: 'center', marginTop: 10 }}>🔒 Your card details are encrypted and never stored.</p>
              </form>
            )}

            {/* Affirm */}
            {tab === 'affirm' && (
              <div style={{ padding: '24px 32px' }}>
                <div style={{ background: 'var(--cream)', padding: '16px', marginBottom: 16, borderLeft: '3px solid var(--gold)' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--navy)', marginBottom: 4, fontWeight: 500 }}>Split Your Deposit Over Time</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--slate)', lineHeight: 1.7 }}>Quick application, no hidden fees. Minimum $50.</p>
                </div>
                {amountCents >= 5000 && (
                  <div style={{ background: 'white', border: '1px solid rgba(13,27,42,0.1)', padding: '14px', marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.78rem', color: 'var(--slate)' }}>
                      <span>Deposit Amount</span><span>{formatCents(amountCents)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.78rem', color: 'var(--slate)' }}>
                      <span>Affirm Processing Fee (8.3%)</span><span>{formatCents(calcAffirmFee(amountCents))}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--navy)', borderTop: '1px solid rgba(13,27,42,0.1)', paddingTop: 8, fontSize: '0.78rem' }}>
                      <span>Total Charged</span><span>{formatCents(calcAffirmTotal(amountCents))}</span>
                    </div>
                    <div style={{ marginTop: 10, textAlign: 'center' }}>
                      <span className="font-display" style={{ fontSize: '1.4rem', color: 'var(--navy)', fontWeight: 300 }}>
                        {formatCents(Math.ceil(calcAffirmTotal(amountCents) / 12))}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--slate)' }}>/mo est. over 12 months</span>
                    </div>
                  </div>
                )}
                {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '10px 14px', marginBottom: 14, fontSize: '0.82rem', color: '#dc2626' }}>{error}</div>}
                <button onClick={handleAffirm} disabled={status === 'processing' || amountCents < 5000}
                  style={{ width: '100%', padding: '13px', background: amountCents >= 5000 && status !== 'processing' ? '#0d1b2a' : '#e5e7eb', color: 'white', border: 'none', fontSize: '0.875rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 600, cursor: amountCents >= 5000 ? 'pointer' : 'not-allowed' }}>
                  {status === 'processing' ? 'Opening Affirm…' : `Continue with Affirm${amountCents > 0 ? ` — ${formatCents(calcAffirmTotal(amountCents))}` : ''}`}
                </button>
                {amountCents > 0 && amountCents < 5000 && <p style={{ fontSize: '0.7rem', color: '#dc2626', textAlign: 'center', marginTop: 8 }}>Affirm requires a minimum of $50</p>}
                <p style={{ fontSize: '0.7rem', color: 'var(--slate)', textAlign: 'center', marginTop: 10 }}>Subject to credit approval by Affirm.</p>
              </div>
            )}
          </div>

          {/* Help */}
          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--slate)', lineHeight: 1.7 }}>
              Questions? Call <a href="tel:8885086893" style={{ color: 'var(--navy)', fontWeight: 500, textDecoration: 'none' }}>888.508.6893</a> or email <a href="mailto:info@crestwellgetaways.com" style={{ color: 'var(--navy)', fontWeight: 500, textDecoration: 'none' }}>info@crestwellgetaways.com</a>
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 2fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

declare global {
  interface Window { Stripe: any; affirm: any; _affirm_config: any; }
}
