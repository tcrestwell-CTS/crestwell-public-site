'use client';
import { useState } from 'react';
import Link from 'next/link';
import { EmailField, useEmailValidation } from '@/components/EmailField';

const PROVIDERS = [
  { id: 'enterprise', name: 'Enterprise',  logo: '🔴', tagline: 'Best loyalty program' },
  { id: 'national',   name: 'National',    logo: '🟢', tagline: 'Emerald Aisle — skip the counter' },
  { id: 'alamo',      name: 'Alamo',       logo: '🔵', tagline: 'Best value for families' },
  { id: 'hertz',      name: 'Hertz',       logo: '⚡', tagline: 'Gold status perks' },
  { id: 'thrifty',    name: 'Thrifty',     logo: '💙', tagline: 'Budget-friendly rates' },
  { id: 'dollar',     name: 'Dollar',      logo: '🟡', tagline: 'Great one-way deals' },
  { id: 'sixt',       name: 'Sixt',        logo: '🟠', tagline: 'Premium & luxury fleet' },
];

const VEHICLE_CLASSES = [
  { id: 'economy',     label: 'Economy',          icon: '🚗', desc: 'Best fuel economy' },
  { id: 'compact',     label: 'Compact',           icon: '🚙', desc: 'City-friendly' },
  { id: 'midsize',     label: 'Mid-size Sedan',    icon: '🚘', desc: 'Comfortable for 4' },
  { id: 'fullsize',    label: 'Full-size Sedan',   icon: '🚖', desc: 'Extra legroom' },
  { id: 'suv-mid',     label: 'Mid-size SUV',      icon: '🚐', desc: 'Popular choice' },
  { id: 'suv-full',    label: 'Full-size SUV',     icon: '🚌', desc: 'Seats up to 7' },
  { id: 'minivan',     label: 'Minivan',           icon: '🚐', desc: 'Seats up to 8' },
  { id: 'luxury',      label: 'Luxury / Premium',  icon: '🏎️', desc: 'Top-tier vehicles' },
  { id: 'truck',       label: 'Pickup Truck',      icon: '🛻', desc: 'Work & adventure' },
  { id: 'convertible', label: 'Convertible',       icon: '🚗', desc: 'Open-top driving' },
];

const POPULAR_LOCATIONS = [
  'Chattanooga, TN (CHA)',
  'Atlanta, GA (ATL)',
  'Nashville, TN (BNA)',
  'Birmingham, AL (BHM)',
  'Knoxville, TN (TYS)',
  'Columbus, OH (CMH)',
  'Charlotte, NC (CLT)',
  'Orlando, FL (MCO)',
  'Miami, FL (MIA)',
  'Dallas, TX (DFW)',
  'Las Vegas, NV (LAS)',
  'Los Angeles, CA (LAX)',
];

const DRIVER_AGE_RANGES = [
  '18–20 (young driver fee may apply)',
  '21–24 (underage fee may apply)',
  '25–64 (standard rate)',
  '65+ (senior rate)',
];

type Step = 1 | 2 | 3 | 4;

export default function CarRentalPage() {
  const emailValidation = useEmailValidation();
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    tripType:              'round-trip',
    pickupLocation:        '',
    pickupLocationCustom:  '',
    dropoffLocation:       '',
    dropoffLocationCustom: '',
    pickupDate:            '',
    pickupTime:            '10:00',
    returnDate:            '',
    returnTime:            '10:00',
    vehicleClass:          '',
    provider:              '',
    driverName:            '',
    driverEmail:           '',
    driverPhone:           '',
    driverAge:             '',
    additionalDrivers:     '0',
    flightNumber:          '',
    notes:                 '',
    loyaltyNumber:         '',
    ccCardholderName:      '',
    ccLastFour:            '',
    ccExpiry:              '',
    ccBillingZip:          '',
  });

  const set = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));
  const isOneWay = form.tripType === 'one-way';

  const pickupDisplay  = form.pickupLocation  === 'other' ? form.pickupLocationCustom  : form.pickupLocation;
  const dropoffDisplay = isOneWay
    ? (form.dropoffLocation === 'other' ? form.dropoffLocationCustom : form.dropoffLocation)
    : pickupDisplay;

  const step1Valid = !!(form.tripType && form.pickupLocation &&
    (form.pickupLocation !== 'other' || form.pickupLocationCustom) &&
    (!isOneWay || (form.dropoffLocation && (form.dropoffLocation !== 'other' || form.dropoffLocationCustom))) &&
    form.pickupDate && form.pickupTime &&
    (isOneWay || (form.returnDate && form.returnTime)));

  const step2Valid = !!(form.vehicleClass && form.provider);

  const step3Valid = !!(form.driverName && form.driverEmail && form.driverAge &&
    emailValidation.state !== 'invalid');

  async function handleSubmit() {
    if (!step3Valid) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/car-rental', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, pickupLocation: pickupDisplay, dropoffLocation: dropoffDisplay }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitted(true);
    } catch (e: any) {
      setError(e.message || 'Submission failed — please try again.');
    }
    setSubmitting(false);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 8,
    border: '1.5px solid rgba(13,27,42,0.15)', fontSize: '0.9rem',
    color: 'var(--navy)', background: '#fff', boxSizing: 'border-box',
    outline: 'none', fontFamily: 'var(--font-body)',
  };
  const selectStyle: React.CSSProperties = { ...inputStyle, cursor: 'pointer' };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.72rem', fontWeight: 700,
    letterSpacing: '0.1em', textTransform: 'uppercase',
    color: 'var(--slate)', marginBottom: 6, fontFamily: 'var(--font-body)',
  };
  const btnPrimary = (enabled: boolean): React.CSSProperties => ({
    padding: '14px 36px', border: 'none', cursor: enabled ? 'pointer' : 'not-allowed',
    background: enabled ? 'var(--navy)' : '#cbd5e1',
    color: enabled ? 'var(--gold)' : '#94a3b8',
    fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em',
    textTransform: 'uppercase', fontFamily: 'var(--font-body)', transition: 'background 0.15s',
  });
  const btnBack: React.CSSProperties = {
    padding: '14px 24px', background: 'transparent',
    border: '1.5px solid rgba(13,27,42,0.2)', cursor: 'pointer',
    fontSize: '0.78rem', fontWeight: 600, color: 'var(--slate)',
    letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)',
  };

  const providerName = PROVIDERS.find(p => p.id === form.provider)?.name ?? '';
  const vehicleLabel = VEHICLE_CLASSES.find(v => v.id === form.vehicleClass)?.label ?? '';
  const firstName = form.driverName.split(' ')[0];

  if (submitted) {
    return (
      <main style={{ background: 'var(--warm-white)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem' }}>✓</div>
          <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 12 }}>Request Received</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 8, fontFamily: 'var(--font-body)' }}>
            Thank you, {firstName}. We will confirm your <strong>{providerName}</strong> reservation within a few hours.
          </p>
          <div style={{ background: '#f1f5f9', borderRadius: 10, padding: '20px 24px', margin: '24px 0', textAlign: 'left' }}>
            <p style={{ margin: '0 0 6px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)' }}>Summary</p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--navy)', lineHeight: 1.8 }}>
              {isOneWay ? 'One-Way' : 'Round Trip'} &middot; {vehicleLabel}<br />
              {pickupDisplay}{isOneWay && dropoffDisplay ? (' \u2192 ' + dropoffDisplay) : ''}<br />
              {form.pickupDate} at {form.pickupTime}
            </p>
          </div>
          <Link href="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'var(--navy)', color: 'var(--gold)', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: 'var(--warm-white)', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ background: 'var(--navy)', paddingTop: 100, paddingBottom: 56, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 64, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>
            Ground Transportation
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, color: 'white', lineHeight: 1.2, marginBottom: 16 }}>
            Car Rental Request
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            We work with all seven major providers. Tell us what you need and we will handle the booking.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
            {PROVIDERS.map(p => (
              <span key={p.id} style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Progress */}
      <div style={{ background: 'var(--cream)', borderBottom: '1px solid rgba(13,27,42,0.08)', padding: '0 24px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', alignItems: 'center' }}>
          {([1, 2, 3, 4] as Step[]).map((s, i) => {
            const labels = ['Trip Details', 'Vehicle & Provider', 'Driver Info', 'Payment Auth'];
            const active = step === s;
            const done = step > s;
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 0', cursor: done ? 'pointer' : 'default' }}
                  onClick={() => { if (done) setStep(s); }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-body)', background: done ? 'var(--gold)' : active ? 'var(--navy)' : 'rgba(13,27,42,0.1)', color: done ? 'var(--navy)' : active ? 'white' : 'var(--slate)' }}>
                    {done ? '✓' : s}
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', color: active ? 'var(--navy)' : done ? 'var(--gold)' : 'var(--slate)' }}>
                    {labels[i]}
                  </span>
                </div>
                {i < 3 && <div style={{ flex: 1, height: 1, background: done ? 'var(--gold)' : 'rgba(13,27,42,0.1)', margin: '0 12px' }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* ── STEP 1 ─────────────────────────────────────────────────── */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 4 }}>Trip Details</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>Tell us where you are going and when.</p>
            </div>

            <div>
              <label style={labelStyle}>Trip Type</label>
              <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: '1.5px solid rgba(13,27,42,0.15)', width: 'fit-content' }}>
                {[{ v: 'round-trip', label: '↔ Round Trip' }, { v: 'one-way', label: '→ One Way' }].map(opt => (
                  <button key={opt.v} onClick={() => set('tripType', opt.v)}
                    style={{ padding: '10px 28px', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.04em', background: form.tripType === opt.v ? 'var(--navy)' : 'white', color: form.tripType === opt.v ? 'var(--gold)' : 'var(--slate)', transition: 'all 0.15s' }}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Pickup Location *</label>
              <select style={selectStyle} value={form.pickupLocation} onChange={e => set('pickupLocation', e.target.value)}>
                <option value="">Select city or airport…</option>
                {POPULAR_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                <option value="other">Other — enter below</option>
              </select>
              {form.pickupLocation === 'other' && (
                <input type="text" placeholder="Enter city, airport, or address" style={{ ...inputStyle, marginTop: 8 }} value={form.pickupLocationCustom} onChange={e => set('pickupLocationCustom', e.target.value)} />
              )}
            </div>

            {isOneWay && (
              <div>
                <label style={labelStyle}>Drop-off Location *</label>
                <select style={selectStyle} value={form.dropoffLocation} onChange={e => set('dropoffLocation', e.target.value)}>
                  <option value="">Select city or airport…</option>
                  {POPULAR_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                  <option value="other">Other — enter below</option>
                </select>
                {form.dropoffLocation === 'other' && (
                  <input type="text" placeholder="Enter city, airport, or address" style={{ ...inputStyle, marginTop: 8 }} value={form.dropoffLocationCustom} onChange={e => set('dropoffLocationCustom', e.target.value)} />
                )}
                <p style={{ fontSize: '0.75rem', color: 'var(--slate)', marginTop: 6, fontFamily: 'var(--font-body)' }}>
                  &#x26A0; One-way drop fees may apply. We will confirm the total before booking.
                </p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Pickup Date *</label>
                <input type="date" style={inputStyle} value={form.pickupDate} min={new Date().toISOString().split('T')[0]} onChange={e => set('pickupDate', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Pickup Time *</label>
                <input type="time" style={inputStyle} value={form.pickupTime} onChange={e => set('pickupTime', e.target.value)} />
              </div>
            </div>

            {!isOneWay && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Return Date *</label>
                  <input type="date" style={inputStyle} value={form.returnDate} min={form.pickupDate || new Date().toISOString().split('T')[0]} onChange={e => set('returnDate', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Return Time *</label>
                  <input type="time" style={inputStyle} value={form.returnTime} onChange={e => set('returnTime', e.target.value)} />
                </div>
              </div>
            )}

            <div>
              <label style={labelStyle}>Flight Number <span style={{ fontWeight: 400, textTransform: 'none', fontSize: '0.7rem' }}>(optional)</span></label>
              <input type="text" placeholder="e.g. DL1423 — for airport pickups" style={inputStyle} value={form.flightNumber} onChange={e => set('flightNumber', e.target.value)} />
            </div>

            <button onClick={() => { if (step1Valid) setStep(2); }} disabled={!step1Valid} style={{ ...btnPrimary(step1Valid), alignSelf: 'flex-start' }}>
              Continue &#x2192;
            </button>
          </div>
        )}

        {/* ── STEP 2 ─────────────────────────────────────────────────── */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 4 }}>Vehicle &amp; Provider</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>Choose your vehicle class and preferred provider.</p>
            </div>

            <div>
              <label style={labelStyle}>Vehicle Class *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 10 }}>
                {VEHICLE_CLASSES.map(v => (
                  <button key={v.id} onClick={() => set('vehicleClass', v.id)}
                    style={{ padding: '14px 12px', borderRadius: 10, border: '1.5px solid', borderColor: form.vehicleClass === v.id ? 'var(--navy)' : 'rgba(13,27,42,0.12)', background: form.vehicleClass === v.id ? 'var(--navy)' : 'white', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{v.icon}</div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: form.vehicleClass === v.id ? 'var(--gold)' : 'var(--navy)' }}>{v.label}</div>
                    <div style={{ fontSize: '0.68rem', color: form.vehicleClass === v.id ? 'rgba(255,255,255,0.6)' : 'var(--slate)', fontFamily: 'var(--font-body)', marginTop: 2 }}>{v.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>Preferred Provider *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))', gap: 10 }}>
                {PROVIDERS.map(p => (
                  <button key={p.id} onClick={() => set('provider', p.id)}
                    style={{ padding: '16px', borderRadius: 10, border: '1.5px solid', borderColor: form.provider === p.id ? 'var(--navy)' : 'rgba(13,27,42,0.12)', background: form.provider === p.id ? 'var(--navy)' : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: 8 }}>{p.logo}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: form.provider === p.id ? 'var(--gold)' : 'var(--navy)', marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontSize: '0.68rem', color: form.provider === p.id ? 'rgba(255,255,255,0.55)' : 'var(--slate)', fontFamily: 'var(--font-body)' }}>{p.tagline}</div>
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate)', marginTop: 10, fontFamily: 'var(--font-body)' }}>
                No preference? Select National — they typically offer the best combination of rate and availability.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(1)} style={btnBack}>&#x2190; Back</button>
              <button onClick={() => { if (step2Valid) setStep(3); }} disabled={!step2Valid} style={btnPrimary(step2Valid)}>Continue &#x2192;</button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ─────────────────────────────────────────────────── */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 4 }}>Driver Information</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>Required by the rental provider to process your reservation.</p>
            </div>

            {/* Booking summary */}
            <div style={{ background: 'var(--navy)', borderRadius: 12, padding: '20px 24px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), rgba(201,168,76,0.6), var(--gold))' }} />
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)', marginBottom: 10 }}>Your Request</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>
                <div><span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>Type</span><br /><span style={{ color: 'white', fontWeight: 600 }}>{isOneWay ? 'One-Way' : 'Round Trip'}</span></div>
                <div><span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>Provider</span><br /><span style={{ color: 'var(--gold)', fontWeight: 700 }}>{providerName}</span></div>
                <div><span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>Vehicle</span><br /><span style={{ color: 'white' }}>{vehicleLabel}</span></div>
                <div><span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>Pickup</span><br /><span style={{ color: 'white' }}>{pickupDisplay}</span></div>
                {isOneWay && <div><span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>Drop-off</span><br /><span style={{ color: 'white' }}>{dropoffDisplay}</span></div>}
                <div><span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>Date</span><br /><span style={{ color: 'white' }}>{form.pickupDate} &middot; {form.pickupTime}</span></div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Full Name *</label>
                <input type="text" placeholder="Primary driver name" style={inputStyle} value={form.driverName} onChange={e => set('driverName', e.target.value)} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Email Address *</label>
                <EmailField value={form.driverEmail} onChange={v => set('driverEmail', v)} required placeholder="your@email.com" inputStyle={{ ...inputStyle, paddingRight: 40 }} labelStyle={{ display: 'none' }} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" placeholder="(555) 000-0000" style={inputStyle} value={form.driverPhone} onChange={e => set('driverPhone', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Driver Age Range *</label>
                <select style={selectStyle} value={form.driverAge} onChange={e => set('driverAge', e.target.value)}>
                  <option value="">Select age range…</option>
                  {DRIVER_AGE_RANGES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Additional Drivers</label>
                <select style={selectStyle} value={form.additionalDrivers} onChange={e => set('additionalDrivers', e.target.value)}>
                  {['0', '1', '2', '3'].map(n => <option key={n} value={n}>{n === '0' ? 'None' : n}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>
                {PROVIDERS.find(p => p.id === form.provider)?.name ?? 'Provider'} Loyalty / Rewards Number
                <span style={{ fontWeight: 400, textTransform: 'none', fontSize: '0.7rem', marginLeft: 6 }}>(optional — for points credit)</span>
              </label>
              <input type="text" placeholder="e.g. EE1234567" style={inputStyle} value={form.loyaltyNumber}
                onChange={e => set('loyaltyNumber', e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>Special Requests <span style={{ fontWeight: 400, textTransform: 'none', fontSize: '0.7rem' }}>(optional)</span></label>
              <textarea placeholder="e.g. GPS unit, child seat, accessibility needs, preferred pickup spot within airport…" style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} value={form.notes} onChange={e => set('notes', e.target.value)} />
            </div>

            {error && (
              <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 8, padding: '12px 16px', fontSize: '0.85rem', color: '#991b1b', fontFamily: 'var(--font-body)' }}>
                {error}
              </div>
            )}

            <p style={{ fontSize: '0.75rem', color: 'var(--slate)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
              By submitting you authorize Crestwell Travel Services to contact you and initiate a reservation with your chosen provider. No charges are processed until you confirm the final quote.
            </p>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(2)} style={btnBack}>&#x2190; Back</button>
              <button onClick={() => { if (step3Valid) setStep(4); }} disabled={!step3Valid}
                style={btnPrimary(step3Valid)}>
                Continue &#x2192;
              </button>
            </div>
          </div>
        )}
      </div>

        {/* ── STEP 4: Payment Authorization ───────────────────────── */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h2 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 4 }}>Payment Authorization</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate)', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
                Optional — securely save a card for your reservation. <strong>Your card will not be charged now.</strong> Rental providers charge at pickup. You can also provide this over the phone.
              </p>
            </div>

            <div style={{ background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 8, padding: '12px 16px', fontSize: '0.82rem', color: '#854d0e', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
              &#x1F512; Card information is transmitted securely. We store only the last 4 digits and expiry — never your full card number.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Cardholder Name</label>
                <input type="text" placeholder="Name as it appears on card" style={inputStyle}
                  value={form.ccCardholderName} onChange={e => set('ccCardholderName', e.target.value)} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Card Number — Last 4 Digits Only</label>
                <input type="text" placeholder="e.g. 4242" maxLength={4} style={inputStyle}
                  value={form.ccLastFour} onChange={e => set('ccLastFour', e.target.value.replace(/\D/g, '').slice(0,4))} />
              </div>
              <div>
                <label style={labelStyle}>Expiration (MM/YY)</label>
                <input type="text" placeholder="MM/YY" maxLength={5} style={inputStyle}
                  value={form.ccExpiry}
                  onChange={e => {
                    let v = e.target.value.replace(/\D/g,'');
                    if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2,4);
                    set('ccExpiry', v);
                  }} />
              </div>
              <div>
                <label style={labelStyle}>Billing ZIP</label>
                <input type="text" placeholder="30301" maxLength={10} style={inputStyle}
                  value={form.ccBillingZip} onChange={e => set('ccBillingZip', e.target.value)} />
              </div>
            </div>

            {error && (
              <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 8, padding: '12px 16px', fontSize: '0.85rem', color: '#991b1b', fontFamily: 'var(--font-body)' }}>
                {error}
              </div>
            )}

            <p style={{ fontSize: '0.75rem', color: 'var(--slate)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
              By submitting you authorize Crestwell Travel Services to share this information with {PROVIDERS.find(p => p.id === form.provider)?.name ?? 'your chosen provider'} to secure your reservation.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => setStep(3)} style={btnBack}>&#x2190; Back</button>
              <button onClick={() => { set('ccCardholderName',''); set('ccLastFour',''); set('ccExpiry',''); set('ccBillingZip',''); handleSubmit(); }}
                style={{ ...btnBack, color: 'var(--slate)' }}>
                Skip — Provide by Phone
              </button>
              <button onClick={handleSubmit} disabled={submitting}
                style={{ ...btnPrimary(!submitting), flex: 1 }}>
                {submitting ? 'Submitting…' : 'Submit Rental Request'}
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
