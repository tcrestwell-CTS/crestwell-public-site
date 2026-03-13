'use client';
import { useState } from 'react';

const subjects = [
  'General Inquiry',
  'Request a Quote',
  'Cruise Questions',
  'All-Inclusive Packages',
  'Group Travel',
  'Existing Booking',
  'Other',
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Something went wrong. Please try again.');
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="overline" style={{ marginBottom: 16 }}>We're Here to Help</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 16 }}>
            Contact Us
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: 460, lineHeight: 1.75 }}>
            Have a question about your next trip? Our team is ready to help you plan your perfect vacation.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ background: 'var(--cream)', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64 }}>

          {/* Contact Info */}
          <div>
            <div className="overline" style={{ marginBottom: 20 }}>Get in Touch</div>
            <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 24, lineHeight: 1.2 }}>
              We'd Love to Hear From You
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: 40 }}>
              Whether you're ready to book or just starting to dream, our travel specialists are happy to answer any questions and point you in the right direction.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 44, height: 44, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>📞</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 4 }}>Phone</div>
                  <a href="tel:8885086893" style={{ color: 'var(--navy)', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 400 }}>888.508.6893</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 44, height: 44, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>✉</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 4 }}>Email</div>
                  <a href="mailto:info@crestwellgetaways.com" style={{ color: 'var(--navy)', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 400 }}>info@crestwellgetaways.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 44, height: 44, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>📍</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 4 }}>Service Area</div>
                  <div style={{ color: 'var(--navy)', fontSize: '0.9rem' }}>Georgia · Tennessee · Alabama</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ width: 44, height: 44, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: 'var(--gold)', fontSize: '1rem' }}>🕐</span>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 4 }}>Response Time</div>
                  <div style={{ color: 'var(--navy)', fontSize: '0.9rem' }}>Within 24 hours on business days</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ marginTop: 48, paddingTop: 36, borderTop: '1px solid #e2e8f0' }}>
              <div className="overline" style={{ marginBottom: 16 }}>Follow Along</div>
              <div style={{ display: 'flex', gap: 12 }}>
                {['Facebook', 'Instagram', 'LinkedIn'].map(s => (
                  <a key={s} href="#" style={{
                    padding: '8px 16px',
                    border: '1px solid var(--navy)',
                    color: 'var(--navy)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    fontFamily: 'var(--font-body)',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--navy)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--navy)'; }}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div style={{ background: 'white', padding: '48px', textAlign: 'center', boxShadow: '0 4px 40px rgba(13,27,42,0.06)' }}>
                <div style={{ width: 60, height: 60, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '1.4rem' }}>✓</div>
                <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.75 }}>
                  Thank you, {form.name.split(' ')[0]}! We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: 'white', padding: '48px', boxShadow: '0 4px 40px rgba(13,27,42,0.06)' }}>
                <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 32 }}>Send a Message</h3>

                <div style={{ display: 'grid', gap: 20 }}>
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" type="text" required placeholder="Jane Smith" value={form.name} onChange={e => update('name', e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" required placeholder="jane@email.com" value={form.email} onChange={e => update('email', e.target.value)} />
                    </div>
                    <div>
                      <label className="form-label">Phone</label>
                      <input className="form-input" type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => update('phone', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Subject *</label>
                    <select className="form-input" required value={form.subject} onChange={e => update('subject', e.target.value)}>
                      <option value="">Select a subject</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Message *</label>
                    <textarea className="form-input" required rows={5} placeholder="How can we help you?" value={form.message} onChange={e => update('message', e.target.value)} style={{ resize: 'vertical' }} />
                  </div>
                </div>

                {error && (
                  <div style={{ marginTop: 16, padding: '12px 16px', background: '#fff0f0', border: '1px solid #ffcccc', color: '#c0392b', fontSize: '0.8rem' }}>
                    {error}
                  </div>
                )}

                <button type="submit" className="btn-primary" disabled={submitting} style={{ marginTop: 28, width: '100%', opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>

                <p style={{ fontSize: '0.72rem', color: 'var(--slate-light)', textAlign: 'center', marginTop: 16 }}>
                  We respond within 24 hours on business days.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
