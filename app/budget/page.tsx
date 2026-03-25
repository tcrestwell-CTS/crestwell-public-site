'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── Trip presets ─────────────────────────────────────────────────────────────

const TRIP_PRESETS = [
  { id: 'bahamas-short',    label: 'Bahamas Getaway',           price: 1200,  nights: 4,  type: 'Ocean Cruise',   desc: 'Perfect Day at CocoCay, Nassau' },
  { id: 'caribbean-7',      label: 'Caribbean Cruise',          price: 2200,  nights: 7,  type: 'Ocean Cruise',   desc: 'Jamaica, Cozumel, Grand Cayman' },
  { id: 'all-inclusive',    label: 'All-Inclusive Resort',       price: 3400,  nights: 7,  type: 'All-Inclusive',  desc: 'Sandals / Secrets · Caribbean or Mexico' },
  { id: 'alaska-7',         label: 'Alaska Cruise',             price: 3800,  nights: 7,  type: 'Ocean Cruise',   desc: 'Glaciers, whale watching, Juneau' },
  { id: 'mediterranean-10', label: 'Mediterranean Cruise',      price: 5200,  nights: 10, type: 'Ocean Cruise',   desc: 'Italy, Greece, Spain, Croatia' },
  { id: 'europe-river',     label: 'Europe River Cruise',       price: 7500,  nights: 8,  type: 'River Cruise',   desc: 'Danube, Rhine · AmaWaterways / Avalon' },
  { id: 'luxury-ritz',      label: 'Luxury Yacht Collection',   price: 14000, nights: 7,  type: 'Ultra-Luxury',   desc: 'Ritz-Carlton, Silversea, Regent' },
  { id: 'custom',           label: 'Custom Trip',               price: 0,     nights: 7,  type: '',               desc: 'Enter your own budget' },
];

const PLAN_OPTIONS = [
  { months: 3,  label: '3 months',   apr: 0 },
  { months: 6,  label: '6 months',   apr: 0 },
  { months: 12, label: '12 months',  apr: 0 },
  { months: 18, label: '18 months',  apr: 9.99 },
  { months: 24, label: '24 months',  apr: 12.99 },
];

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function calcMonthly(principal: number, months: number, apr: number): number {
  if (months <= 0 || principal <= 0) return 0;
  if (apr === 0) return Math.ceil(principal / months);
  const r = apr / 100 / 12;
  return Math.ceil(principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));
}

// ─── Animated number ──────────────────────────────────────────────────────────

function AnimatedNum({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const start = display;
    const end = value;
    if (start === end) return;
    const duration = 400;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <>{prefix}{fmt(display)}</>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BudgetCalculatorPage() {
  const [selectedPreset, setSelectedPreset] = useState('caribbean-7');
  const [customPrice, setCustomPrice] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [deposit, setDeposit] = useState(500);
  const [planMonths, setPlanMonths] = useState(12);
  const [travelDate, setTravelDate] = useState('');
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const preset = TRIP_PRESETS.find(p => p.id === selectedPreset)!;
  const basePrice = selectedPreset === 'custom'
    ? parseFloat(customPrice.replace(/[^0-9.]/g, '')) || 0
    : preset.price;
  const totalTrip = basePrice * travelers;
  const remaining = Math.max(0, totalTrip - deposit);
  const planOption = PLAN_OPTIONS.find(p => p.months === planMonths)!;
  const monthly = calcMonthly(remaining, planMonths, planOption.apr);
  const totalPaid = deposit + monthly * planMonths;
  const interest = Math.max(0, totalPaid - totalTrip);

  // Days until travel
  const daysUntil = travelDate
    ? Math.max(0, Math.round((new Date(travelDate).getTime() - Date.now()) / 86400000))
    : null;

  const quoteParams = new URLSearchParams({
    trip_type: preset.type || 'Cruise Vacation',
    destination: preset.label !== 'Custom Trip' ? preset.label : '',
    ...(totalTrip > 0 ? { budget: `${fmt(totalTrip)} total` } : {}),
  });

  const inputCls: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    border: '2px solid rgba(13,27,42,0.15)',
    fontSize: '0.9rem', fontFamily: 'var(--font-body)',
    color: 'var(--navy)', background: 'white',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };
  const labelCls: React.CSSProperties = {
    display: 'block', fontSize: '0.65rem',
    letterSpacing: '0.14em', textTransform: 'uppercase',
    color: 'var(--slate)', marginBottom: 8,
    fontFamily: 'var(--font-body)',
  };

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        background: 'var(--navy)', position: 'relative', overflow: 'hidden',
        paddingTop: 'clamp(96px, 12vw, 140px)',
        paddingBottom: 'clamp(48px, 6vw, 72px)',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', position: 'absolute', top: 72, left: 0, right: 0 }} />
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', padding: '0 clamp(18px, 5vw, 32px)', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Travel Budget Calculator</div>
          <h1 className="font-display" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 16,
          }}>
            See What You Can Afford<br />
            <em style={{ color: 'var(--gold-light)' }}>in 60 Seconds</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.88rem, 2vw, 1rem)', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
            Pick your dream trip, set a deposit, and see your monthly payment instantly.
            No credit check. No commitment. Just clarity.
          </p>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 5vw, 32px)', overflowX: 'clip' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 'clamp(24px, 4vw, 40px)', alignItems: 'start' }} className="calc-grid">

          {/* ── Left — inputs ── */}
          <div>

            {/* Step 1 — Trip */}
            <div style={{ background: 'white', marginBottom: 16 }}>
              <button
                onClick={() => setStep(step === 1 ? 2 : 1)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: step === 1 ? '2px solid var(--gold)' : '1px solid transparent' }}
              >
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: step === 1 ? 'var(--navy)' : 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: step === 1 ? 'var(--gold)' : 'var(--slate)', fontFamily: 'var(--font-body)' }}>1</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--navy)', fontFamily: 'var(--font-body)' }}>Choose Your Trip</div>
                  {step !== 1 && <div style={{ fontSize: '0.75rem', color: 'var(--gold)', marginTop: 2 }}>{preset.label} · {travelers} traveler{travelers !== 1 ? 's' : ''} · {fmt(totalTrip)}</div>}
                </div>
                <span style={{ color: 'var(--slate)', transform: step === 1 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </button>

              {step === 1 && (
                <div style={{ padding: '24px' }}>
                  {/* Preset grid */}
                  <label style={labelCls}>Select a Trip Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 8, marginBottom: 24 }}>
                    {TRIP_PRESETS.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPreset(p.id)}
                        style={{
                          padding: '12px 14px', textAlign: 'left',
                          border: '2px solid',
                          borderColor: selectedPreset === p.id ? 'var(--navy)' : 'rgba(13,27,42,0.12)',
                          background: selectedPreset === p.id ? 'var(--navy)' : 'white',
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                      >
                        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: selectedPreset === p.id ? 'white' : 'var(--navy)', fontFamily: 'var(--font-body)', marginBottom: 3 }}>
                          {p.label}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: selectedPreset === p.id ? 'rgba(255,255,255,0.6)' : 'var(--slate)', lineHeight: 1.4 }}>
                          {p.id === 'custom' ? 'Enter your own amount' : `~${fmt(p.price)}/person · ${p.nights}N`}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Custom price input */}
                  {selectedPreset === 'custom' && (
                    <div style={{ marginBottom: 20 }}>
                      <label style={labelCls}>Trip Cost Per Person ($)</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--slate)', fontSize: '1rem' }}>$</span>
                        <input
                          type="number" min="0" placeholder="0"
                          value={customPrice}
                          onChange={e => setCustomPrice(e.target.value)}
                          style={{ ...inputCls, paddingLeft: 32 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Travelers */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={labelCls}>Number of Travelers</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {[1,2,3,4,5,6].map(n => (
                        <button
                          key={n}
                          onClick={() => setTravelers(n)}
                          style={{
                            width: 44, height: 44, border: '2px solid',
                            borderColor: travelers === n ? 'var(--navy)' : 'rgba(13,27,42,0.15)',
                            background: travelers === n ? 'var(--navy)' : 'white',
                            color: travelers === n ? 'white' : 'var(--navy)',
                            fontSize: '0.9rem', fontWeight: 600,
                            cursor: 'pointer', transition: 'all 0.15s',
                            fontFamily: 'var(--font-body)',
                          }}
                        >{n}</button>
                      ))}
                    </div>
                  </div>

                  {/* Travel date */}
                  <div style={{ marginBottom: 8 }}>
                    <label style={labelCls}>Approximate Travel Date <span style={{ color: 'var(--slate)', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                    <input
                      type="date"
                      value={travelDate}
                      min={new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]}
                      onChange={e => setTravelDate(e.target.value)}
                      style={inputCls}
                    />
                    {daysUntil !== null && daysUntil > 0 && (
                      <p style={{ fontSize: '0.72rem', color: 'var(--gold)', marginTop: 6, fontFamily: 'var(--font-body)' }}>
                        {daysUntil} days away · {Math.floor(daysUntil / 30)} months to save
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={totalTrip === 0}
                    style={{
                      marginTop: 20, width: '100%', padding: '13px', background: totalTrip > 0 ? 'var(--navy)' : 'rgba(13,27,42,0.2)',
                      color: 'white', border: 'none', cursor: totalTrip > 0 ? 'pointer' : 'not-allowed',
                      fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                      fontFamily: 'var(--font-body)', fontWeight: 600, transition: 'all 0.2s',
                    }}
                  >
                    Next: Set Your Deposit →
                  </button>
                </div>
              )}
            </div>

            {/* Step 2 — Deposit & Plan */}
            <div style={{ background: 'white', marginBottom: 16, opacity: totalTrip === 0 ? 0.4 : 1, transition: 'opacity 0.2s' }}>
              <button
                onClick={() => totalTrip > 0 && setStep(step === 2 ? 1 : 2)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', background: 'none', border: 'none', cursor: totalTrip > 0 ? 'pointer' : 'default', textAlign: 'left', borderBottom: step === 2 ? '2px solid var(--gold)' : '1px solid transparent' }}
              >
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: step === 2 ? 'var(--navy)' : 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: step === 2 ? 'var(--gold)' : 'var(--slate)', fontFamily: 'var(--font-body)' }}>2</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--navy)', fontFamily: 'var(--font-body)' }}>Set Deposit & Payment Plan</div>
                  {step !== 2 && remaining > 0 && <div style={{ fontSize: '0.75rem', color: 'var(--gold)', marginTop: 2 }}>{planMonths} months · {fmt(monthly)}/mo</div>}
                </div>
                <span style={{ color: 'var(--slate)', transform: step === 2 ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
              </button>

              {step === 2 && totalTrip > 0 && (
                <div style={{ padding: '24px' }}>
                  {/* Deposit slider */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                      <label style={labelCls}>Initial Deposit</label>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>{fmt(deposit)}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={Math.min(totalTrip, totalTrip)}
                      step={50}
                      value={deposit}
                      onChange={e => setDeposit(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--navy)', height: 4 }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                      <span style={{ fontSize: '0.65rem', color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>$0</span>
                      <span style={{ fontSize: '0.65rem', color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>{fmt(totalTrip)} (full)</span>
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {[250, 500, 1000].map(d => (
                        <button key={d} onClick={() => setDeposit(Math.min(d, totalTrip))}
                          style={{ padding: '5px 12px', fontSize: '0.7rem', border: '1px solid rgba(13,27,42,0.2)', background: deposit === d ? 'var(--navy)' : 'white', color: deposit === d ? 'white' : 'var(--slate)', cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
                          {fmt(d)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Plan length */}
                  {remaining > 0 && (
                    <div style={{ marginBottom: 8 }}>
                      <label style={labelCls}>Pay Remaining {fmt(remaining)} Over</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {PLAN_OPTIONS.map(opt => (
                          <button
                            key={opt.months}
                            onClick={() => setPlanMonths(opt.months)}
                            style={{
                              padding: '10px 16px', border: '2px solid',
                              borderColor: planMonths === opt.months ? 'var(--navy)' : 'rgba(13,27,42,0.12)',
                              background: planMonths === opt.months ? 'var(--navy)' : 'white',
                              cursor: 'pointer', transition: 'all 0.15s',
                              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                            }}
                          >
                            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: planMonths === opt.months ? 'white' : 'var(--navy)', fontFamily: 'var(--font-body)' }}>{opt.label}</span>
                            {opt.apr > 0 && <span style={{ fontSize: '0.6rem', color: planMonths === opt.months ? 'rgba(255,255,255,0.6)' : 'var(--slate)', fontFamily: 'var(--font-body)' }}>{opt.apr}% APR</span>}
                            {opt.apr === 0 && <span style={{ fontSize: '0.6rem', color: planMonths === opt.months ? 'var(--gold)' : '#22c55e', fontFamily: 'var(--font-body)', fontWeight: 600 }}>0% APR</span>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setStep(3)}
                    style={{
                      marginTop: 24, width: '100%', padding: '13px', background: 'var(--gold)',
                      color: 'var(--navy)', border: 'none', cursor: 'pointer',
                      fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                      fontFamily: 'var(--font-body)', fontWeight: 700,
                    }}
                  >
                    See My Full Plan →
                  </button>
                </div>
              )}
            </div>

            {/* Step 3 — Full breakdown */}
            {step === 3 && totalTrip > 0 && (
              <div style={{ background: 'var(--navy)', padding: '28px 24px', marginBottom: 16 }}>
                <div style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16, fontFamily: 'var(--font-body)' }}>
                  Your Payment Plan Breakdown
                </div>

                {/* Big monthly number */}
                <div style={{ textAlign: 'center', padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 20 }}>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 6 }}>Monthly Payment</div>
                  <div className="font-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', color: 'var(--gold)', fontWeight: 200, lineHeight: 1 }}>
                    <AnimatedNum value={monthly} />
                    <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.4)' }}>/mo</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: 8, fontFamily: 'var(--font-body)' }}>
                    for {planMonths} months · {planOption.apr === 0 ? '0% APR — no interest' : `${planOption.apr}% APR`}
                  </div>
                </div>

                {/* Line items */}
                {[
                  { label: 'Trip Cost', value: fmt(totalTrip), sub: `${travelers} traveler${travelers !== 1 ? 's' : ''} × ${fmt(basePrice)}` },
                  { label: 'Deposit Today', value: `-${fmt(deposit)}`, sub: 'Locks in your reservation', color: '#86efac' },
                  { label: 'Remaining Balance', value: fmt(remaining), sub: `Split over ${planMonths} months` },
                  ...(interest > 0 ? [{ label: 'Total Interest', value: fmt(interest), sub: `${planOption.apr}% APR`, color: 'rgba(255,255,255,0.5)' }] : []),
                  { label: 'Total You Pay', value: fmt(totalPaid), sub: 'Deposit + all monthly payments', bold: true },
                ].map((item: any, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', gap: 12 }}>
                    <div>
                      <div style={{ fontSize: '0.82rem', color: item.bold ? 'white' : 'rgba(255,255,255,0.7)', fontWeight: item.bold ? 700 : 400, fontFamily: 'var(--font-body)' }}>{item.label}</div>
                      {item.sub && <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: 2, fontFamily: 'var(--font-body)' }}>{item.sub}</div>}
                    </div>
                    <div style={{ fontSize: item.bold ? '1rem' : '0.88rem', fontWeight: item.bold ? 700 : 500, color: item.color || (item.bold ? 'var(--gold)' : 'white'), whiteSpace: 'nowrap', fontFamily: 'var(--font-body)' }}>
                      {item.value}
                    </div>
                  </div>
                ))}

                {/* Savings tip */}
                {daysUntil && daysUntil > 0 && (
                  <div style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>
                      💡 Saving {fmt(Math.ceil(totalTrip / Math.max(1, Math.floor(daysUntil / 30))))} per month between now and {new Date(travelDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} would cover this trip in full.
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                  <button
                    onClick={() => setStep(2)}
                    style={{ flex: 1, padding: '12px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', cursor: 'pointer' }}
                  >
                    ← Adjust
                  </button>
                  <Link
                    href={`/request-quote?${quoteParams}`}
                    style={{
                      flex: 2, padding: '12px', background: 'var(--gold)', color: 'var(--navy)',
                      textAlign: 'center', textDecoration: 'none',
                      fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                      fontFamily: 'var(--font-body)', fontWeight: 700, display: 'block',
                    }}
                  >
                    Get a Free Quote →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ── Right — live summary card ── */}
          <aside style={{ alignSelf: 'start' }}>
            <div style={{ background: 'white', border: '1px solid rgba(13,27,42,0.1)', position: 'sticky', top: 88 }}>
              {/* Header */}
              <div style={{ background: 'var(--navy)', padding: '20px 22px' }}>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6, fontFamily: 'var(--font-body)' }}>
                  Live Estimate
                </div>
                <div className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: totalTrip > 0 ? 'var(--gold)' : 'rgba(255,255,255,0.2)', fontWeight: 200, lineHeight: 1 }}>
                  {totalTrip > 0 ? <AnimatedNum value={monthly > 0 ? monthly : totalTrip} /> : '$—'}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', marginTop: 6, fontFamily: 'var(--font-body)' }}>
                  {monthly > 0 ? `per month for ${planMonths} months` : totalTrip > 0 ? 'total trip cost' : 'select a trip to begin'}
                </div>
              </div>

              {/* Summary rows */}
              <div style={{ padding: '18px 22px' }}>
                {[
                  { label: 'Trip', value: preset.label, show: true },
                  { label: 'Per Person', value: basePrice > 0 ? fmt(basePrice) : '—', show: true },
                  { label: 'Travelers', value: travelers.toString(), show: true },
                  { label: 'Total Cost', value: totalTrip > 0 ? fmt(totalTrip) : '—', show: true, bold: true },
                  { label: 'Deposit', value: deposit > 0 ? fmt(deposit) : '—', show: deposit > 0 },
                  { label: 'Remaining', value: remaining > 0 ? fmt(remaining) : '—', show: remaining > 0 },
                  { label: 'Plan Length', value: `${planMonths} months`, show: remaining > 0 },
                  { label: 'APR', value: planOption.apr === 0 ? '0% (no interest)' : `${planOption.apr}%`, show: remaining > 0 },
                ].filter(r => r.show).map((row: any, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(13,27,42,0.06)' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>{row.label}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--navy)', fontWeight: row.bold ? 700 : 500, fontFamily: 'var(--font-body)', textAlign: 'right', maxWidth: '55%' }}>{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Trip description */}
              {preset.desc && selectedPreset !== 'custom' && (
                <div style={{ padding: '0 22px 18px' }}>
                  <div style={{ padding: '10px 14px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
                    <div style={{ fontSize: '0.68rem', color: 'var(--slate)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
                      <strong style={{ color: 'var(--navy)', display: 'block', marginBottom: 2 }}>{preset.type}</strong>
                      {preset.desc}
                      {preset.nights > 0 && ` · ${preset.nights} nights`}
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div style={{ padding: '0 22px 22px' }}>
                <Link
                  href={`/request-quote?${quoteParams}`}
                  className="btn-primary"
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginBottom: 10 }}
                >
                  Request Free Quote
                </Link>
                <Link
                  href="/payment"
                  style={{
                    display: 'block', textAlign: 'center', textDecoration: 'none',
                    padding: '11px', fontSize: '0.68rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', fontFamily: 'var(--font-body)',
                    border: '1px solid rgba(13,27,42,0.2)', color: 'var(--slate)',
                    transition: 'all 0.2s',
                  }}
                >
                  Make a Payment
                </Link>
              </div>
            </div>

            {/* Trust badges */}
            <div style={{ marginTop: 16, padding: '16px 20px', background: 'white', border: '1px solid rgba(13,27,42,0.08)' }}>
              {[
                { icon: '🔒', text: 'No credit check required' },
                { icon: '✅', text: '0% APR plans available' },
                { icon: '📞', text: 'Specialist guidance included' },
                { icon: '💯', text: 'No booking fees — ever' },
              ].map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '7px 0', borderBottom: i < 3 ? '1px solid rgba(13,27,42,0.05)' : 'none' }}>
                  <span style={{ fontSize: '0.9rem' }}>{b.icon}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--navy)', fontFamily: 'var(--font-body)' }}>{b.text}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ── FAQ strip ── */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(48px, 6vw, 72px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="overline" style={{ marginBottom: 12 }}>How It Works</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 300, color: 'white' }}>
              Common Questions
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 20 }}>
            {[
              {
                q: 'Is this a credit application?',
                a: 'No. This calculator is just an estimate tool. No personal information is collected and there is no credit check.',
              },
              {
                q: 'What does 0% APR mean?',
                a: 'Plans of 3–12 months carry no interest — you pay exactly the trip cost split evenly. Longer plans (18–24 months) have a low APR applied.',
              },
              {
                q: 'How do I set up a plan?',
                a: 'Request a quote and your specialist will build a custom payment plan for your exact trip, dates, and budget.',
              },
              {
                q: 'Are these prices accurate?',
                a: 'Presets are representative starting prices. Actual cost depends on cabin/room category, dates, and current promotions. Your quote will have exact pricing.',
              },
            ].map((faq, i) => (
              <div key={i} style={{ padding: '24px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--gold)', marginBottom: 10, fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>{faq.q}</div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, fontFamily: 'var(--font-body)' }}>{faq.a}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none', marginRight: 12 }}>
              Get a Free Quote
            </Link>
            <Link href="/faq" style={{
              padding: '13px 28px', border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
              fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: 'var(--font-body)', display: 'inline-block',
            }}>
              Read the FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive grid fix */}
      <style>{`
        @media (max-width: 700px) {
          .calc-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .calc-grid aside {
            order: -1;
          }
          .calc-grid aside > div,
          .calc-grid aside > div > div {
            position: static !important;
          }
        }
        /* Prevent the range input track from causing layout jump */
        input[type=range] {
          display: block;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
