'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';

type PaymentTab = 'stripe' | 'affirm';
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
const SITE_DOMAIN = 'https://crestwell-public-site.vercel.app';

function formatCents(cents: number) {
  return (cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
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
          { label: 'Payment Method', value: method === 'stripe' ? 'Credit / Debit Card' : 'Affirm — Buy Now Pay Later' },
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

export default function PaymentPage() {
  const [tab, setTab] = useState<PaymentTab>('stripe');
  const [paymentType, setPaymentType] = useState<PaymentType>('custom');
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [error, setError] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [tripName, setTripName] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[0].id);
  const [notes, setNotes] = useState('');
  const [stripeReady, setStripeReady] = useState(false);
  const [successData, setSuccessData] = useState<{ amount: number; method: string; name: string; bookingRef: string } | null>(null);

  const stripeRef = useRef<any>(null);
  const cardRef = useRef<any>(null);
  const cardMountRef = useRef<HTMLDivElement>(null);

  const amountCents = paymentType === 'package'
    ? PACKAGES.find(p => p.id === selectedPackage)?.amount ?? 0
    : parseDollarAmount(customAmount);

  const mountStripe = () => {
    if (!window.Stripe || stripeRef.current) return;
    stripeRef.current = window.Stripe(STRIPE_PK);
    const elements = stripeRef.current.elements();
    cardRef.current = elements.create('card', {
      style: {
        base: { fontFamily: 'Georgia, serif', fontSize: '15px', color: '#0d1b2a', '::placeholder': { color: '#94a3b8' } },
      },
    });
    if (cardMountRef.current && !cardMountRef.current.children.length) {
      cardRef.current.mount(cardMountRef.current);
      setStripeReady(true);
    }
  };

  useEffect(() => {
    if (tab === 'stripe') setTimeout(mountStripe, 150);
  }, [tab]);

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
          amount_cents: amountCents, customer_name: customerName, customer_email: customerEmail,
          customer_phone: customerPhone, booking_ref: bookingRef,
          trip_name: paymentType === 'package' ? PACKAGES.find(p => p.id === selectedPackage)?.name : tripName,
          payment_type: paymentType, notes,
        }),
      });
      const { clientSecret, error: fnError } = await res.json();
      if (fnError) throw new Error(fnError);
      const { error: stripeError, paymentIntent } = await stripeRef.current.confirmCardPayment(clientSecret, {
        payment_method: { card: cardRef.current, billing_details: { name: customerName, email: customerEmail } },
      });
      if (stripeError) throw new Error(stripeError.message);
      if (paymentIntent.status === 'succeeded') {
        setSuccessData({ amount: amountCents, method: 'stripe', name: customerName, bookingRef });
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
    if (!window.affirm) { setError('Affirm is loading. Please try again in a moment.'); return; }
    setStatus('processing'); setError('');
    const [firstName, ...rest] = customerName.split(' ');
    window.affirm.checkout({
      merchant: {
        user_cancel_url: `${SITE_DOMAIN}/payment`,
        user_confirmation_url: `${SITE_DOMAIN}/payment`,
        user_confirmation_url_action: 'POST',
        name: 'Crestwell Travel Services',
      },
      billing: { name: { first: firstName, last: rest.join(' ') }, email: customerEmail, phone_number: customerPhone },
      items: [{
        display_name: paymentType === 'package' ? PACKAGES.find(p => p.id === selectedPackage)?.name : (tripName || 'Travel Payment'),
        sku: bookingRef || `CTS-${Date.now()}`,
        unit_price: amountCents, qty: 1,
      }],
      order_id: bookingRef || `CTS-${Date.now()}`,
      currency: 'USD',
      total: amountCents,
    });
    window.affirm.checkout.open({
      onFail: (e: any) => { setError(e?.reason || 'Affirm checkout cancelled.'); setStatus('error'); },
      onSuccess: async ({ checkout_token }: { checkout_token: string }) => {
        try {
          const res = await fetch(`${SUPABASE_URL}/functions/v1/create-affirm-charge`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              checkout_token, amount_cents: amountCents, customer_name: customerName,
              customer_email: customerEmail, booking_ref: bookingRef,
              trip_name: paymentType === 'package' ? PACKAGES.find(p => p.id === selectedPackage)?.name : tripName,
              payment_type: paymentType,
            }),
          });
          const data = await res.json();
          if (data.error) throw new Error(data.error);
          setSuccessData({ amount: amountCents, method: 'affirm', name: customerName, bookingRef });
          setStatus('success');
        } catch (err: any) { setError(err.message || 'Affirm charge failed.'); setStatus('error'); }
      },
    });
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
    width: '100%', padding: '12px 14px', border: '1px solid rgba(13,27,42,0.15)',
    fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: 'var(--navy)',
    background: 'white', outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.68rem', letterSpacing: '0.12em',
    textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 6, fontFamily: 'var(--font-body)',
  };

  return (
    <>
      <Script id="stripe-js" src="https://js.stripe.com/v3/" strategy="afterInteractive" onLoad={mountStripe} />
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
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Notes (optional)</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any additional info..." rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(13,27,42,0.08)' }}>
              {([{ id: 'stripe' as PaymentTab, label: '💳 Credit / Debit Card' }, { id: 'affirm' as PaymentTab, label: '📅 Pay Over Time (Affirm)' }]).map(t => (
                <button key={t.id} onClick={() => { setTab(t.id); setError(''); }} style={{ flex: 1, padding: '16px 20px', background: 'none', border: 'none', borderBottom: tab === t.id ? '2px solid var(--gold)' : '2px solid transparent', color: tab === t.id ? 'var(--navy)' : 'var(--slate)', fontSize: '0.78rem', fontFamily: 'var(--font-body)', fontWeight: tab === t.id ? 600 : 400, letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.2s' }}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Stripe */}
            {tab === 'stripe' && (
              <form onSubmit={handleStripeSubmit} style={{ padding: '28px 32px' }}>
                <label style={labelStyle}>Card Details</label>
                <div ref={cardMountRef} style={{ padding: '14px', border: '1px solid rgba(13,27,42,0.15)', marginBottom: 20, minHeight: 46 }} />
                {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 14px', marginBottom: 16, fontSize: '0.82rem', color: '#dc2626' }}>{error}</div>}
                <button type="submit" disabled={status === 'processing' || !stripeReady || amountCents < 50} className="btn-primary" style={{ width: '100%', border: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: '14px', opacity: status === 'processing' || !stripeReady || amountCents < 50 ? 0.6 : 1 }}>
                  {status === 'processing' ? 'Processing…' : `Pay ${amountCents > 0 ? formatCents(amountCents) : 'Securely'}`}
                </button>
                <p style={{ fontSize: '0.72rem', color: 'var(--slate)', textAlign: 'center', marginTop: 12 }}>🔒 Your card details are encrypted and never stored on our servers.</p>
              </form>
            )}

            {/* Affirm */}
            {tab === 'affirm' && (
              <div style={{ padding: '28px 32px' }}>
                <div style={{ background: 'var(--cream)', padding: '20px', marginBottom: 20, borderLeft: '3px solid var(--gold)' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--navy)', marginBottom: 6, fontWeight: 500 }}>Buy Now, Pay Over Time</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--slate)', lineHeight: 1.7 }}>Split your travel payment into manageable monthly installments. Quick application, no hidden fees. Minimum $50.</p>
                </div>
                {amountCents >= 5000 && (
                  <div style={{ background: 'white', border: '1px solid rgba(13,27,42,0.1)', padding: '16px', marginBottom: 20, textAlign: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--slate)', marginBottom: 4 }}>Estimated monthly payment</p>
                    <p className="font-display" style={{ fontSize: '1.5rem', color: 'var(--navy)', fontWeight: 300 }}>{formatCents(Math.ceil(amountCents / 12))}<span style={{ fontSize: '0.8rem', color: 'var(--slate)' }}>/mo</span></p>
                    <p style={{ fontSize: '0.68rem', color: 'var(--slate)', marginTop: 4 }}>over 12 months · actual terms set by Affirm</p>
                  </div>
                )}
                {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 14px', marginBottom: 16, fontSize: '0.82rem', color: '#dc2626' }}>{error}</div>}
                <button onClick={handleAffirmCheckout} disabled={status === 'processing' || amountCents < 5000} style={{ width: '100%', padding: '14px', background: amountCents >= 5000 && status !== 'processing' ? '#0d1b2a' : '#e5e7eb', color: 'white', border: 'none', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 600, cursor: amountCents >= 5000 ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
                  {status === 'processing' ? 'Opening Affirm…' : `Continue with Affirm${amountCents > 0 ? ` — ${formatCents(amountCents)}` : ''}`}
                </button>
                {amountCents > 0 && amountCents < 5000 && <p style={{ fontSize: '0.72rem', color: '#dc2626', textAlign: 'center', marginTop: 8 }}>Affirm requires a minimum payment of $50</p>}
                <p style={{ fontSize: '0.72rem', color: 'var(--slate)', textAlign: 'center', marginTop: 12 }}>You will be redirected to Affirm to complete your application. Subject to credit approval.</p>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate)', lineHeight: 1.7 }}>
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
  interface Window { Stripe: any; affirm: any; _affirm_config: any; }
}
