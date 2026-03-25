'use client';
import { useState } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

type Form = {
  // Contact
  full_name: string;
  email: string;
  phone: string;
  // Trip
  destination: string;
  open_to_suggestions: string;
  departure_city: string;
  date_type: string;
  date_from: string;
  date_to: string;
  trip_types: string[];
  trip_type_other: string;
  // Travelers
  adults: number;
  children: number;
  children_ages: string;
  ready_to_book: string;
  // Budget
  budget_range: string;
  payment_method: string;
  // Financing
  wants_financing: string;
  financing_consent: boolean;
  // Preferences
  hotel_level: string;
  room_type: string;
  must_haves: string[];
  // Additional
  booked_before: string;
  specific_trips: string;
  notes: string;
};

const INITIAL: Form = {
  full_name: '', email: '', phone: '',
  destination: '', open_to_suggestions: '', departure_city: '',
  date_type: '', date_from: '', date_to: '',
  trip_types: [], trip_type_other: '',
  adults: 2, children: 0, children_ages: '', ready_to_book: '',
  budget_range: '', payment_method: '',
  wants_financing: '', financing_consent: false,
  hotel_level: '', room_type: '', must_haves: [],
  booked_before: '', specific_trips: '', notes: '',
};

const STEPS = [
  { num: 1, label: 'Contact' },
  { num: 2, label: 'Trip Details' },
  { num: 3, label: 'Travelers' },
  { num: 4, label: 'Budget' },
  { num: 5, label: 'Preferences' },
  { num: 6, label: 'Finish' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
}

function CheckButton({ label, checked, onClick }: { label: string; checked: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '10px 16px', textAlign: 'left',
        border: '2px solid',
        borderColor: checked ? 'var(--navy)' : 'rgba(13,27,42,0.15)',
        background: checked ? 'var(--navy)' : 'white',
        color: checked ? 'white' : 'var(--navy)',
        fontSize: '0.82rem', fontFamily: 'var(--font-body)',
        cursor: 'pointer', transition: 'all 0.15s',
        display: 'flex', alignItems: 'center', gap: 8,
      }}
    >
      <span style={{
        width: 18, height: 18, borderRadius: 3, flexShrink: 0,
        border: checked ? 'none' : '2px solid rgba(13,27,42,0.25)',
        background: checked ? 'var(--gold)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.65rem', color: 'var(--navy)',
      }}>
        {checked ? '✓' : ''}
      </span>
      {label}
    </button>
  );
}

function RadioGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          style={{
            padding: '10px 20px',
            border: '2px solid',
            borderColor: value === opt ? 'var(--navy)' : 'rgba(13,27,42,0.15)',
            background: value === opt ? 'var(--navy)' : 'white',
            color: value === opt ? 'white' : 'var(--navy)',
            fontSize: '0.82rem', fontFamily: 'var(--font-body)',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlanPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<Form>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const set = (field: keyof Form, value: any) =>
    setForm(f => ({ ...f, [field]: value }));

  const input: React.CSSProperties = {
    width: '100%', padding: '13px 16px',
    border: '2px solid rgba(13,27,42,0.15)',
    fontSize: '0.88rem', fontFamily: 'var(--font-body)',
    color: 'var(--navy)', background: 'white',
    outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };
  const label: React.CSSProperties = {
    display: 'block', fontSize: '0.65rem',
    letterSpacing: '0.14em', textTransform: 'uppercase',
    color: 'var(--slate)', marginBottom: 8,
    fontFamily: 'var(--font-body)',
  };
  const field: React.CSSProperties = { marginBottom: 20 };

  // Validation per step
  const canAdvance = () => {
    if (step === 1) return form.full_name && form.email && form.phone;
    if (step === 2) return form.destination && form.departure_city && form.trip_types.length > 0;
    if (step === 3) return form.adults >= 1 && form.ready_to_book;
    if (step === 4) return form.budget_range && form.payment_method;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        ...form,
        trip_types: form.trip_types.join(', '),
        must_haves: form.must_haves.join(', '),
        source: 'plan-page',
      };
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.full_name.split(' ')[0] || form.full_name,
          last_name: form.full_name.split(' ').slice(1).join(' ') || '',
          email: form.email,
          phone: form.phone,
          trip_type: form.trip_types[0] || 'Cruise Vacation',
          destination: form.destination,
          departure_date: form.date_from,
          travelers_adults: form.adults,
          travelers_children: form.children,
          budget: form.budget_range,
          flexibility: form.date_type === 'Flexible' ? 'flexible' : 'exact',
          message: [
            form.destination && `Destination: ${form.destination}`,
            form.open_to_suggestions && `Open to suggestions: ${form.open_to_suggestions}`,
            form.departure_city && `Departing from: ${form.departure_city}`,
            form.trip_types.length && `Trip types: ${form.trip_types.join(', ')}`,
            form.children > 0 && `Children: ${form.children}${form.children_ages ? ` (ages: ${form.children_ages})` : ''}`,
            form.ready_to_book && `Ready to book: ${form.ready_to_book}`,
            form.payment_method && `Payment: ${form.payment_method}`,
            form.wants_financing === 'Yes' && `Interested in financing`,
            form.hotel_level && `Hotel level: ${form.hotel_level}`,
            form.room_type && `Room type: ${form.room_type}`,
            form.must_haves.length && `Must-haves: ${form.must_haves.join(', ')}`,
            form.booked_before && `Booked before: ${form.booked_before}`,
            form.specific_trips && `Specific trips in mind: ${form.specific_trips}`,
            form.notes && `Additional notes: ${form.notes}`,
          ].filter(Boolean).join('\n'),
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (e: any) {
      setError('Something went wrong. Please try again or call us at 888.508.6893.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success ──
  if (submitted) {
    const goToFinancing = form.wants_financing === 'Yes' || form.payment_method === 'Monthly payments';
    return (
      <div style={{ background: 'var(--cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(40px, 6vw, 80px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 560, width: '100%', textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '1.8rem' }}>✓</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 12 }}>
            Your Plan Is On Its Way
          </h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 32 }}>
            Thank you, {form.full_name.split(' ')[0]}! We've received your travel details and a specialist will reach out within one business day with personalized options.
          </p>
          {goToFinancing && (
            <div style={{ background: 'var(--navy)', padding: '20px 24px', marginBottom: 24, textAlign: 'left', borderLeft: '3px solid var(--gold)' }}>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8, fontFamily: 'var(--font-body)' }}>Next Step</div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 12 }}>
                You expressed interest in flexible payment options. Use our calculator to see what your monthly payment would look like.
              </p>
              <Link href="/budget" style={{ color: 'var(--gold)', fontSize: '0.78rem', fontFamily: 'var(--font-body)', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)', paddingBottom: 1 }}>
                See What You Can Afford →
              </Link>
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-navy" style={{ textDecoration: 'none' }}>Back to Home</Link>
            <Link href="/cruises" className="btn-primary" style={{ textDecoration: 'none' }}>Browse Cruises</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        background: 'var(--navy)',
        paddingTop: 'clamp(96px, 12vw, 130px)',
        paddingBottom: 'clamp(32px, 5vw, 48px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', position: 'absolute', top: 72, left: 0, right: 0 }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto', padding: '0 clamp(18px, 5vw, 32px)', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 14 }}>Free Consultation</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: 12 }}>
            Start Planning Your Trip
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', lineHeight: 1.8, maxWidth: 500, margin: '0 auto' }}>
            Tell us a little about your travel plans and we'll create a personalized experience tailored just for you.
          </p>
        </div>
      </section>

      {/* ── Progress bar ── */}
      <div style={{ background: 'white', borderBottom: '1px solid rgba(13,27,42,0.08)', position: 'sticky', top: 72, zIndex: 40 }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          {/* Bar */}
          <div style={{ height: 3, background: 'rgba(13,27,42,0.08)', marginBottom: 0 }}>
            <div style={{ height: '100%', background: 'var(--gold)', width: `${((step - 1) / (STEPS.length - 1)) * 100}%`, transition: 'width 0.35s ease' }} />
          </div>
          {/* Steps */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
            {STEPS.map(s => (
              <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: step > s.num ? 'var(--gold)' : step === s.num ? 'var(--navy)' : 'rgba(13,27,42,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6rem', fontWeight: 700, fontFamily: 'var(--font-body)',
                  color: step > s.num ? 'var(--navy)' : step === s.num ? 'var(--gold)' : 'var(--slate)',
                  transition: 'all 0.25s',
                }}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <span style={{ fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: step === s.num ? 'var(--navy)' : 'var(--slate)', fontFamily: 'var(--font-body)', display: 'none' }} className="step-label">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form ── */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(32px, 5vw, 56px) clamp(16px, 5vw, 32px) clamp(48px, 7vw, 80px)' }}>
        <div style={{ maxWidth: 620, margin: '0 auto' }}>
          <div style={{ background: 'white', padding: 'clamp(24px, 4vw, 40px)', boxShadow: '0 2px 24px rgba(13,27,42,0.07)' }}>

            {/* ─ Step 1: Contact ─ */}
            {step === 1 && (
              <div>
                <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 6 }}>Contact Information</h2>
                <p style={{ color: 'var(--slate)', fontSize: '0.8rem', marginBottom: 28, lineHeight: 1.6 }}>We'll use this to send your personalized travel plan.</p>

                <div style={field}>
                  <label style={label}>Full Name <span style={{ color: '#dc2626' }}>*</span></label>
                  <input style={input} placeholder="Jane Smith" value={form.full_name} onChange={e => set('full_name', e.target.value)} />
                </div>
                <div style={field}>
                  <label style={label}>Email Address <span style={{ color: '#dc2626' }}>*</span></label>
                  <input style={input} type="email" placeholder="jane@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div style={field}>
                  <label style={label}>Phone Number <span style={{ color: '#dc2626' }}>*</span></label>
                  <input style={input} type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
            )}

            {/* ─ Step 2: Trip Details ─ */}
            {step === 2 && (
              <div>
                <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 6 }}>Trip Details</h2>
                <p style={{ color: 'var(--slate)', fontSize: '0.8rem', marginBottom: 28, lineHeight: 1.6 }}>Tell us about where you want to go and when.</p>

                <div style={field}>
                  <label style={label}>Where would you like to travel? <span style={{ color: '#dc2626' }}>*</span></label>
                  <input style={input} placeholder="e.g. Caribbean, Mediterranean, Mexico..." value={form.destination} onChange={e => set('destination', e.target.value)} />
                </div>
                <div style={field}>
                  <label style={label}>Open to suggestions?</label>
                  <RadioGroup options={['Yes', 'No']} value={form.open_to_suggestions} onChange={v => set('open_to_suggestions', v)} />
                </div>
                <div style={field}>
                  <label style={label}>Departure City <span style={{ color: '#dc2626' }}>*</span></label>
                  <input style={input} placeholder="e.g. Atlanta, Nashville, Birmingham..." value={form.departure_city} onChange={e => set('departure_city', e.target.value)} />
                </div>
                <div style={field}>
                  <label style={label}>Travel Dates</label>
                  <RadioGroup options={['Exact Dates', 'Flexible']} value={form.date_type} onChange={v => set('date_type', v)} />
                  {form.date_type === 'Exact Dates' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
                      <div>
                        <label style={{ ...label, marginBottom: 4 }}>From</label>
                        <input style={input} type="date" value={form.date_from} onChange={e => set('date_from', e.target.value)} />
                      </div>
                      <div>
                        <label style={{ ...label, marginBottom: 4 }}>To</label>
                        <input style={input} type="date" value={form.date_to} onChange={e => set('date_to', e.target.value)} />
                      </div>
                    </div>
                  )}
                  {form.date_type === 'Flexible' && (
                    <input style={{ ...input, marginTop: 10 }} placeholder="e.g. Spring 2026, anytime after June..." value={form.date_from} onChange={e => set('date_from', e.target.value)} />
                  )}
                </div>
                <div style={field}>
                  <label style={label}>Trip Type (select all that apply) <span style={{ color: '#dc2626' }}>*</span></label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: 8 }}>
                    {['Cruise', 'All-Inclusive Resort', 'Family Vacation', 'Group Travel', 'Honeymoon / Romantic', 'Other'].map(t => (
                      <CheckButton key={t} label={t} checked={form.trip_types.includes(t)} onClick={() => set('trip_types', toggle(form.trip_types, t))} />
                    ))}
                  </div>
                  {form.trip_types.includes('Other') && (
                    <input style={{ ...input, marginTop: 10 }} placeholder="Please describe..." value={form.trip_type_other} onChange={e => set('trip_type_other', e.target.value)} />
                  )}
                </div>
              </div>
            )}

            {/* ─ Step 3: Travelers ─ */}
            {step === 3 && (
              <div>
                <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 6 }}>Travelers</h2>
                <p style={{ color: 'var(--slate)', fontSize: '0.8rem', marginBottom: 28, lineHeight: 1.6 }}>Who's coming with you?</p>

                <div style={field}>
                  <label style={label}>Adults (18+) <span style={{ color: '#dc2626' }}>*</span></label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <button key={n} type="button" onClick={() => set('adults', n)} style={{ width: 44, height: 44, border: '2px solid', borderColor: form.adults === n ? 'var(--navy)' : 'rgba(13,27,42,0.15)', background: form.adults === n ? 'var(--navy)' : 'white', color: form.adults === n ? 'white' : 'var(--navy)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)' }}>{n}</button>
                    ))}
                    <button type="button" onClick={() => set('adults', 9)} style={{ padding: '0 16px', height: 44, border: '2px solid', borderColor: form.adults >= 9 ? 'var(--navy)' : 'rgba(13,27,42,0.15)', background: form.adults >= 9 ? 'var(--navy)' : 'white', color: form.adults >= 9 ? 'white' : 'var(--navy)', fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)' }}>9+</button>
                  </div>
                </div>
                <div style={field}>
                  <label style={label}>Children (under 18)</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {[0,1,2,3,4,5,6].map(n => (
                      <button key={n} type="button" onClick={() => set('children', n)} style={{ width: 44, height: 44, border: '2px solid', borderColor: form.children === n ? 'var(--navy)' : 'rgba(13,27,42,0.15)', background: form.children === n ? 'var(--navy)' : 'white', color: form.children === n ? 'white' : 'var(--navy)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)' }}>{n}</button>
                    ))}
                  </div>
                  {form.children > 0 && (
                    <input style={{ ...input, marginTop: 10 }} placeholder="Ages (e.g. 4, 8, 12)" value={form.children_ages} onChange={e => set('children_ages', e.target.value)} />
                  )}
                </div>
                <div style={field}>
                  <label style={label}>Are all travelers ready to book?</label>
                  <RadioGroup options={['Yes', 'No — just exploring']} value={form.ready_to_book} onChange={v => set('ready_to_book', v)} />
                </div>
              </div>
            )}

            {/* ─ Step 4: Budget & Financing ─ */}
            {step === 4 && (
              <div>
                <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 6 }}>Budget & Payment</h2>
                <p style={{ color: 'var(--slate)', fontSize: '0.8rem', marginBottom: 28, lineHeight: 1.6 }}>Help us find options that match your budget.</p>

                <div style={field}>
                  <label style={label}>Estimated Total Budget <span style={{ color: '#dc2626' }}>*</span></label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {['$1,000–$3,000', '$3,000–$5,000', '$5,000–$10,000', '$10,000+'].map(b => (
                      <button key={b} type="button" onClick={() => set('budget_range', b)} style={{ padding: '12px 16px', border: '2px solid', borderColor: form.budget_range === b ? 'var(--navy)' : 'rgba(13,27,42,0.15)', background: form.budget_range === b ? 'var(--navy)' : 'white', color: form.budget_range === b ? 'white' : 'var(--navy)', fontSize: '0.82rem', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.15s' }}>{b}</button>
                    ))}
                  </div>
                </div>

                <div style={field}>
                  <label style={label}>How do you plan to pay? <span style={{ color: '#dc2626' }}>*</span></label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {['Pay in full', 'Monthly payments', 'Not sure yet'].map(p => (
                      <button key={p} type="button" onClick={() => set('payment_method', p)} style={{ padding: '12px 16px', textAlign: 'left', border: '2px solid', borderColor: form.payment_method === p ? 'var(--navy)' : 'rgba(13,27,42,0.15)', background: form.payment_method === p ? 'var(--navy)' : 'white', color: form.payment_method === p ? 'white' : 'var(--navy)', fontSize: '0.82rem', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.15s' }}>{p}</button>
                    ))}
                  </div>
                </div>

                {/* Financing section */}
                <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.3)', padding: '20px 22px', marginBottom: 20 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--navy)', marginBottom: 8, fontFamily: 'var(--font-body)' }}>
                    💳 Want to see what you qualify for?
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--slate)', lineHeight: 1.7, marginBottom: 14 }}>
                    We offer 0% APR payment plans and flexible financing options for qualifying trips.
                  </p>
                  <div style={field}>
                    <label style={{ ...label, marginBottom: 8 }}>Would you like to explore flexible payment options?</label>
                    <RadioGroup options={['Yes', 'No']} value={form.wants_financing} onChange={v => set('wants_financing', v)} />
                  </div>
                  {form.wants_financing === 'Yes' && (
                    <div style={{ marginTop: 4, padding: '14px 16px', background: 'white', border: '1px solid rgba(13,27,42,0.1)' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--slate)', lineHeight: 1.7, marginBottom: 12 }}>
                        We can check your eligibility using a <strong style={{ color: 'var(--navy)' }}>soft credit check</strong> — no impact to your score.
                      </p>
                      <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.financing_consent} onChange={e => set('financing_consent', e.target.checked)} style={{ marginTop: 2, width: 16, height: 16, flexShrink: 0, cursor: 'pointer', accentColor: 'var(--navy)' }} />
                        <span style={{ fontSize: '0.78rem', color: 'var(--navy)', lineHeight: 1.6 }}>
                          I agree to be contacted about travel financing options
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─ Step 5: Preferences & Additional ─ */}
            {step === 5 && (
              <div>
                <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 6 }}>Preferences</h2>
                <p style={{ color: 'var(--slate)', fontSize: '0.8rem', marginBottom: 28, lineHeight: 1.6 }}>Help us personalize your experience.</p>

                <div style={field}>
                  <label style={label}>Preferred Hotel / Resort Level</label>
                  <RadioGroup options={['3-Star', '4-Star', '5-Star / Luxury']} value={form.hotel_level} onChange={v => set('hotel_level', v)} />
                </div>
                <div style={field}>
                  <label style={label}>Room / Cabin Type</label>
                  <RadioGroup options={['Standard', 'Ocean View', 'Suite']} value={form.room_type} onChange={v => set('room_type', v)} />
                </div>
                <div style={field}>
                  <label style={label}>Must-Haves (select any)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))', gap: 8 }}>
                    {['Beachfront', 'Adults Only', 'Kid-Friendly', 'Excursions', 'Dining Included', 'Spa / Wellness'].map(m => (
                      <CheckButton key={m} label={m} checked={form.must_haves.includes(m)} onClick={() => set('must_haves', toggle(form.must_haves, m))} />
                    ))}
                  </div>
                </div>
                <div style={field}>
                  <label style={label}>Have you booked travel with us before?</label>
                  <RadioGroup options={['Yes', 'No']} value={form.booked_before} onChange={v => set('booked_before', v)} />
                </div>
                <div style={field}>
                  <label style={label}>Any specific destinations, resorts, or cruises in mind?</label>
                  <textarea style={{ ...input, resize: 'vertical' }} rows={3} placeholder="e.g. Sandals Royal Caribbean, Norwegian Escape, Cancún..." value={form.specific_trips} onChange={e => set('specific_trips', e.target.value)} />
                </div>
                <div style={field}>
                  <label style={label}>Anything else we should know?</label>
                  <textarea style={{ ...input, resize: 'vertical' }} rows={3} placeholder="Special occasions, accessibility needs, dietary preferences..." value={form.notes} onChange={e => set('notes', e.target.value)} />
                </div>
              </div>
            )}

            {/* ─ Step 6: Review & Submit ─ */}
            {step === 6 && (
              <div>
                <h2 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 6 }}>Almost There!</h2>
                <p style={{ color: 'var(--slate)', fontSize: '0.8rem', marginBottom: 24, lineHeight: 1.6 }}>Review your details and submit — we'll take it from here.</p>

                {/* Summary */}
                <div style={{ background: 'var(--cream)', padding: '20px', marginBottom: 24 }}>
                  {[
                    { label: 'Name', value: form.full_name },
                    { label: 'Email', value: form.email },
                    { label: 'Phone', value: form.phone },
                    { label: 'Destination', value: form.destination },
                    { label: 'Departing', value: form.departure_city },
                    { label: 'Dates', value: form.date_type === 'Exact Dates' ? `${form.date_from} → ${form.date_to}` : form.date_from || form.date_type },
                    { label: 'Trip Type', value: form.trip_types.join(', ') },
                    { label: 'Travelers', value: `${form.adults} adult${form.adults !== 1 ? 's' : ''}${form.children > 0 ? `, ${form.children} child${form.children !== 1 ? 'ren' : ''}` : ''}` },
                    { label: 'Budget', value: form.budget_range },
                    { label: 'Payment', value: form.payment_method },
                    { label: 'Financing', value: form.wants_financing || 'Not specified' },
                    { label: 'Hotel Level', value: form.hotel_level || 'Not specified' },
                  ].filter(r => r.value).map((row, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(13,27,42,0.07)', gap: 12, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--slate)', fontFamily: 'var(--font-body)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{row.label}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--navy)', fontFamily: 'var(--font-body)', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                {error && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', marginBottom: 16, fontSize: '0.82rem', color: '#dc2626', borderRadius: 2 }}>
                    {error}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary"
                  style={{ width: '100%', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', fontSize: '0.88rem', padding: '15px', opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? 'Sending Your Plan…' : 'Get My Travel Plan ✈'}
                </button>
                <p style={{ fontSize: '0.72rem', color: 'var(--slate)', textAlign: 'center', marginTop: 10, lineHeight: 1.6 }}>
                  We'll review your details and reach out with personalized options within one business day.
                </p>
              </div>
            )}

            {/* ─ Navigation ─ */}
            <div style={{ display: 'flex', gap: 10, marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(13,27,42,0.08)' }}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(s => (s - 1) as any)}
                  style={{ flex: 1, padding: '13px', border: '2px solid rgba(13,27,42,0.15)', background: 'white', color: 'var(--navy)', fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', cursor: 'pointer' }}
                >
                  ← Back
                </button>
              )}
              {step < 6 && (
                <button
                  type="button"
                  onClick={() => setStep(s => (s + 1) as any)}
                  disabled={!canAdvance()}
                  style={{
                    flex: step > 1 ? 2 : 1,
                    padding: '13px', border: 'none',
                    background: canAdvance() ? 'var(--navy)' : 'rgba(13,27,42,0.2)',
                    color: 'white',
                    fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontFamily: 'var(--font-body)', cursor: canAdvance() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                  }}
                >
                  {step === 5 ? 'Review My Plan →' : 'Continue →'}
                </button>
              )}
            </div>

            {/* Step counter */}
            <p style={{ textAlign: 'center', marginTop: 14, fontSize: '0.7rem', color: 'rgba(13,27,42,0.3)', fontFamily: 'var(--font-body)' }}>
              Step {step} of {STEPS.length}
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 500px) {
          .step-label { display: block !important; }
        }
      `}</style>
    </>
  );
}
