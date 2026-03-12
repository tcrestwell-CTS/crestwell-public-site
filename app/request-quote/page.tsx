'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { QuoteRequest } from '@/lib/supabase';

const tripTypes = [
  'Cruise Vacation',
  'All-Inclusive Resort',
  'Family Vacation',
  'Disney / Theme Park',
  'Group Trip',
  'Luxury Travel',
  'Honeymoon',
  'Other',
];

const budgets = [
  'Under $1,000 per person',
  '$1,000 – $2,500 per person',
  '$2,500 – $5,000 per person',
  '$5,000 – $10,000 per person',
  '$10,000+ per person',
  'Flexible / Not sure',
];

const initialForm: Omit<QuoteRequest, 'id' | 'created_at' | 'status'> = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  trip_type: '',
  destination: '',
  departure_date: '',
  travelers_adults: 2,
  travelers_children: 0,
  budget: '',
  flexibility: 'flexible',
  message: '',
};

export default function RequestQuotePage() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState(() => ({
    ...initialForm,
    trip_type: 'Cruise Vacation', // default when coming from cruise search
    destination: searchParams.get('destination') || '',
    travelers_adults: parseInt(searchParams.get('travelers') || '2'),
  }));
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (field: string, value: string | number) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const { error: sbError } = await supabase.from('quote_requests').insert([{ ...form, status: 'new' }]);
      if (sbError) throw sbError;
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again or email us directly.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <section style={{ background: 'var(--navy)', paddingTop: 160, paddingBottom: 80, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        </section>
        <section style={{ background: 'var(--cream)', padding: '96px 32px', textAlign: 'center' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div style={{ width: 72, height: 72, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: '1.8rem' }}>✓</div>
            <h2 className="font-display" style={{ fontSize: '2.5rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 16 }}>
              Request Received!
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: 12 }}>
              Thank you, <strong>{form.first_name}</strong>! We've received your quote request and a travel specialist will be in touch within 24 hours.
            </p>
            <p style={{ color: 'var(--slate)', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: 40 }}>
              In the meantime, feel free to browse our destinations or reach out directly at{' '}
              <a href="mailto:info@crestwellgetaways.com" style={{ color: 'var(--gold)' }}>info@crestwellgetaways.com</a>.
            </p>
            <a href="/" className="btn-primary" style={{ textDecoration: 'none' }}>Back to Home</a>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Free Consultation</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 16 }}>
            Request a Quote
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: 500, lineHeight: 1.75 }}>
            Tell us about your dream vacation and we'll create a personalized itinerary with the best pricing available.
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{ background: 'var(--cream)', padding: '80px 32px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>

          {/* Search summary banner (shown when coming from cruise search) */}
          {(searchParams.get('destination') || searchParams.get('line') || searchParams.get('duration')) && (
            <div style={{
              background: 'var(--navy)',
              padding: '16px 24px',
              marginBottom: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', flexShrink: 0 }}>
                Your Search
              </span>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: 1 }}>
                {[
                  searchParams.get('destination'),
                  searchParams.get('line'),
                  searchParams.get('duration'),
                  searchParams.get('month'),
                  searchParams.get('travelers') ? `${searchParams.get('travelers')} travelers` : null,
                ].filter(Boolean).map((tag, i) => (
                  <span key={i} style={{
                    padding: '4px 12px',
                    background: 'rgba(201,168,76,0.15)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    color: 'rgba(255,255,255,0.8)',
                    fontSize: '0.75rem',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Progress Steps */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 56 }}>
            {[1, 2, 3].map((s) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: s < 3 ? 1 : 'none' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: step >= s ? 'var(--gold)' : 'white',
                  border: step >= s ? '2px solid var(--gold)' : '2px solid #d1d9e0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 500,
                  color: step >= s ? 'var(--navy)' : 'var(--slate)',
                  transition: 'all 0.3s',
                  flexShrink: 0,
                }}>
                  {step > s ? '✓' : s}
                </div>
                <div style={{ marginLeft: 10, marginRight: s < 3 ? 0 : 0 }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: step >= s ? 'var(--navy)' : 'var(--slate)' }}>
                    {s === 1 ? 'Trip Details' : s === 2 ? 'Your Info' : 'Review'}
                  </div>
                </div>
                {s < 3 && <div style={{ flex: 1, height: 1, background: step > s ? 'var(--gold)' : '#d1d9e0', margin: '0 16px', transition: 'background 0.3s' }} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ background: 'white', padding: '48px', boxShadow: '0 4px 40px rgba(13,27,42,0.06)' }}>

              {/* Step 1: Trip Details */}
              {step === 1 && (
                <div>
                  <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 8 }}>Trip Details</h2>
                  <p style={{ color: 'var(--slate)', fontSize: '0.875rem', marginBottom: 36 }}>Tell us what kind of trip you're dreaming about.</p>

                  <div style={{ display: 'grid', gap: 24 }}>
                    <div>
                      <label className="form-label">Type of Trip *</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
                        {tripTypes.map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => update('trip_type', t)}
                            style={{
                              padding: '12px 16px',
                              border: form.trip_type === t ? '2px solid var(--gold)' : '2px solid #e2e8f0',
                              background: form.trip_type === t ? 'var(--gold-pale)' : 'white',
                              color: form.trip_type === t ? 'var(--navy)' : 'var(--text-secondary)',
                              fontSize: '0.8rem',
                              fontFamily: 'var(--font-body)',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.2s',
                              fontWeight: form.trip_type === t ? 500 : 400,
                            }}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Destination / Area of Interest</label>
                      <input className="form-input" type="text" placeholder="e.g. Caribbean, Mediterranean, Not sure yet" value={form.destination} onChange={e => update('destination', e.target.value)} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <div>
                        <label className="form-label">Preferred Departure Date</label>
                        <input className="form-input" type="date" value={form.departure_date} onChange={e => update('departure_date', e.target.value)} />
                      </div>
                      <div>
                        <label className="form-label">Date Flexibility</label>
                        <select className="form-input" value={form.flexibility} onChange={e => update('flexibility', e.target.value)}>
                          <option value="exact">Exact dates only</option>
                          <option value="flexible">Flexible ± 1 week</option>
                          <option value="very-flexible">Very flexible</option>
                          <option value="undecided">Haven't decided</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <div>
                        <label className="form-label">Adult Travelers (18+)</label>
                        <input className="form-input" type="number" min={1} max={50} value={form.travelers_adults} onChange={e => update('travelers_adults', parseInt(e.target.value))} />
                      </div>
                      <div>
                        <label className="form-label">Children Travelers (Under 18)</label>
                        <input className="form-input" type="number" min={0} max={20} value={form.travelers_children} onChange={e => update('travelers_children', parseInt(e.target.value))} />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Approximate Budget</label>
                      <select className="form-input" value={form.budget} onChange={e => update('budget', e.target.value)}>
                        <option value="">Select a budget range</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop: 40, display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => setStep(2)}
                      disabled={!form.trip_type}
                      style={{ opacity: !form.trip_type ? 0.5 : 1, cursor: !form.trip_type ? 'not-allowed' : 'pointer' }}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Info */}
              {step === 2 && (
                <div>
                  <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 8 }}>Your Information</h2>
                  <p style={{ color: 'var(--slate)', fontSize: '0.875rem', marginBottom: 36 }}>How can we reach you with your personalized quote?</p>

                  <div style={{ display: 'grid', gap: 24 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                      <div>
                        <label className="form-label">First Name *</label>
                        <input className="form-input" type="text" required placeholder="Jane" value={form.first_name} onChange={e => update('first_name', e.target.value)} />
                      </div>
                      <div>
                        <label className="form-label">Last Name *</label>
                        <input className="form-input" type="text" required placeholder="Smith" value={form.last_name} onChange={e => update('last_name', e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Email Address *</label>
                      <input className="form-input" type="email" required placeholder="jane@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
                    </div>
                    <div>
                      <label className="form-label">Phone Number</label>
                      <input className="form-input" type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => update('phone', e.target.value)} />
                    </div>
                    <div>
                      <label className="form-label">Anything else we should know?</label>
                      <textarea className="form-input" rows={4} placeholder="Special occasions, accessibility needs, preferences..." value={form.message} onChange={e => update('message', e.target.value)} style={{ resize: 'vertical' }} />
                    </div>
                  </div>

                  <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between' }}>
                    <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: 'var(--slate)', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                      ← Back
                    </button>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => setStep(3)}
                      disabled={!form.first_name || !form.last_name || !form.email}
                      style={{ opacity: (!form.first_name || !form.last_name || !form.email) ? 0.5 : 1, cursor: (!form.first_name || !form.last_name || !form.email) ? 'not-allowed' : 'pointer' }}
                    >
                      Review Request →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div>
                  <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 8 }}>Review & Submit</h2>
                  <p style={{ color: 'var(--slate)', fontSize: '0.875rem', marginBottom: 36 }}>Please confirm your details before we send this to our team.</p>

                  <div style={{ display: 'grid', gap: 24 }}>
                    {/* Summary Cards */}
                    <div style={{ background: 'var(--cream)', padding: '24px', borderLeft: '3px solid var(--gold)' }}>
                      <div className="overline" style={{ marginBottom: 12 }}>Trip Details</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                        {[
                          { label: 'Trip Type', value: form.trip_type || 'Not specified' },
                          { label: 'Destination', value: form.destination || 'Open' },
                          { label: 'Departure', value: form.departure_date || 'Flexible' },
                          { label: 'Travelers', value: `${form.travelers_adults} adult${form.travelers_adults !== 1 ? 's' : ''}${form.travelers_children > 0 ? `, ${form.travelers_children} child${form.travelers_children !== 1 ? 'ren' : ''}` : ''}` },
                          { label: 'Budget', value: form.budget || 'Not specified' },
                        ].map(item => (
                          <div key={item.label}>
                            <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 3 }}>{item.label}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--navy)', fontWeight: 400 }}>{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ background: 'var(--cream)', padding: '24px', borderLeft: '3px solid var(--gold)' }}>
                      <div className="overline" style={{ marginBottom: 12 }}>Contact Information</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                        {[
                          { label: 'Name', value: `${form.first_name} ${form.last_name}` },
                          { label: 'Email', value: form.email },
                          { label: 'Phone', value: form.phone || 'Not provided' },
                        ].map(item => (
                          <div key={item.label}>
                            <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 3 }}>{item.label}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--navy)' }}>{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {form.message && (
                      <div style={{ background: 'var(--cream)', padding: '24px', borderLeft: '3px solid var(--gold)' }}>
                        <div className="overline" style={{ marginBottom: 8 }}>Additional Notes</div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{form.message}</p>
                      </div>
                    )}

                    <p style={{ fontSize: '0.75rem', color: 'var(--slate)', lineHeight: 1.6 }}>
                      By submitting, you agree to be contacted by a Crestwell Travel specialist. We'll never share your information or send spam.
                    </p>
                  </div>

                  {error && (
                    <div style={{ marginTop: 20, padding: '14px 20px', background: '#fff0f0', border: '1px solid #ffcccc', color: '#c0392b', fontSize: '0.85rem' }}>
                      {error}
                    </div>
                  )}

                  <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button type="button" onClick={() => setStep(2)} style={{ background: 'none', border: 'none', color: 'var(--slate)', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                      ← Back
                    </button>
                    <button type="submit" className="btn-primary" disabled={submitting} style={{ opacity: submitting ? 0.6 : 1, minWidth: 160 }}>
                      {submitting ? 'Submitting…' : 'Submit Request'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
            {['No Booking Fees', '24hr Response', 'Expert Advisors', 'Best Price Promise'].map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--slate)', fontSize: '0.75rem', letterSpacing: '0.06em' }}>
                <span style={{ color: 'var(--gold)' }}>✓</span>
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
