'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function WinPage() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    city: '', partySize: '', destination: '', timeline: '', budget: '',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/win-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || 'Something went wrong');
      }
      setStatus('success');
    } catch (err: any) {
      setError(err.message);
      setStatus('error');
    }
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', fontSize: '1rem',
    border: '1px solid #d1d5db', borderRadius: 6, outline: 'none',
    fontFamily: 'system-ui, sans-serif', boxSizing: 'border-box' as const,
  };
  const labelStyle = { fontSize: '0.8rem', fontWeight: 600, color: '#374151', letterSpacing: '0.04em', textTransform: 'uppercase' as const, display: 'block', marginBottom: 6 };
  const groupStyle = { display: 'flex', flexDirection: 'column' as const, gap: 6 };

  if (status === 'success') return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: 'white', borderRadius: 16, padding: '48px 40px', maxWidth: 520, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#0D1B2A', marginBottom: 12 }}>You're Entered!</h1>
        <p style={{ color: '#6b7280', lineHeight: 1.7, marginBottom: 24 }}>
          Thanks for entering our <strong>Dinner for Two Gift Card</strong> giveaway. We'll be in touch — and our travel team may reach out about your dream vacation!
        </p>

        {/* Facebook follow CTA */}
        <div style={{ background: '#1877F2', borderRadius: 10, padding: '20px 24px', marginBottom: 20, textAlign: 'center' }}>
          <p style={{ margin: '0 0 14px', fontSize: '1rem', fontWeight: 700, color: 'white' }}>
            📣 Follow us on Facebook for deals & travel inspiration!
          </p>
          <a
            href="https://www.facebook.com/crestwellgetaways"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'white', color: '#1877F2', padding: '10px 24px',
              borderRadius: 6, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Follow Crestwell Travel
          </a>
        </div>

        <div style={{ background: '#FEF3C7', border: '1px solid #C9A84C', borderRadius: 8, padding: '14px 20px', marginBottom: 20 }}>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#92400e', fontWeight: 600 }}>Planning is always FREE at Crestwell Travel Services</p>
        </div>

        <Link href="/" style={{ display: 'inline-block', background: '#0D1B2A', color: 'white', padding: '12px 32px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
          Visit crestwellgetaways.com
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0D1B2A', padding: 'clamp(24px,4vw,48px) clamp(16px,4vw,24px)' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '2rem', fontWeight: 500, color: 'white', lineHeight: 1 }}>Crestwell</div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84C', marginTop: 6, fontFamily: 'system-ui' }}>Travel Services</div>
        </div>

        {/* Prize card */}
        <div style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #e8c86a 50%, #C9A84C 100%)', borderRadius: 12, padding: '24px 28px', marginBottom: 28, textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>🍽️</div>
          <h1 style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 800, color: '#0D1B2A', margin: '0 0 8px', lineHeight: 1.2 }}>
            Win a Dinner for Two Gift Card!
          </h1>
          <p style={{ margin: 0, color: '#3d2a00', fontSize: '0.9rem', fontWeight: 500 }}>
            Enter below for a chance to win. No purchase necessary.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: 12, padding: 'clamp(24px,4vw,36px)', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.6 }}>
            Tell us a little about your dream vacation — our travel team will use this to follow up with personalized options. <strong>Planning is always free.</strong>
          </p>

          {/* Name */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={groupStyle}>
              <label style={labelStyle}>First Name *</label>
              <input required style={inputStyle} value={form.firstName} onChange={set('firstName')} placeholder="Jane" />
            </div>
            <div style={groupStyle}>
              <label style={labelStyle}>Last Name *</label>
              <input required style={inputStyle} value={form.lastName} onChange={set('lastName')} placeholder="Smith" />
            </div>
          </div>

          {/* Contact */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={groupStyle}>
              <label style={labelStyle}>Email *</label>
              <input required type="email" style={inputStyle} value={form.email} onChange={set('email')} placeholder="jane@example.com" />
            </div>
            <div style={groupStyle}>
              <label style={labelStyle}>Phone</label>
              <input type="tel" style={inputStyle} value={form.phone} onChange={set('phone')} placeholder="(555) 000-0000" />
            </div>
          </div>

          {/* City */}
          <div style={groupStyle}>
            <label style={labelStyle}>Your City / Metro Area *</label>
            <select required style={inputStyle} value={form.city} onChange={set('city')}>
              <option value="">Select your city...</option>
              <option>Atlanta, GA</option>
              <option>Nashville, TN</option>
              <option>Birmingham, AL</option>
              <option>Chattanooga, TN</option>
              <option>Huntsville, AL</option>
              <option>Knoxville, TN</option>
              <option>Memphis, TN</option>
              <option>Savannah, GA</option>
              <option>Other</option>
            </select>
          </div>

          {/* Trip details */}
          <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0D1B2A', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 16px' }}>About Your Dream Vacation</p>
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Dream Destination *</label>
            <select required style={inputStyle} value={form.destination} onChange={set('destination')}>
              <option value="">Where do you want to go?</option>
              <option>Caribbean Cruise</option>
              <option>Mediterranean Cruise</option>
              <option>Alaska Cruise</option>
              <option>European River Cruise</option>
              <option>All-Inclusive Resort (Mexico / Caribbean)</option>
              <option>Hawaii</option>
              <option>Not sure — open to suggestions</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={groupStyle}>
              <label style={labelStyle}>Party Size *</label>
              <select required style={inputStyle} value={form.partySize} onChange={set('partySize')}>
                <option value="">Select...</option>
                <option>Just me</option>
                <option>2 (couple)</option>
                <option>3–4 (small family)</option>
                <option>5–8 (family / friends)</option>
                <option>9+ (group)</option>
              </select>
            </div>
            <div style={groupStyle}>
              <label style={labelStyle}>Travel Timeline *</label>
              <select required style={inputStyle} value={form.timeline} onChange={set('timeline')}>
                <option value="">Select...</option>
                <option>Within 3 months</option>
                <option>3–6 months</option>
                <option>6–12 months</option>
                <option>1–2 years out</option>
                <option>Just exploring</option>
              </select>
            </div>
          </div>

          <div style={groupStyle}>
            <label style={labelStyle}>Approximate Budget (per person)</label>
            <select style={inputStyle} value={form.budget} onChange={set('budget')}>
              <option value="">Prefer not to say</option>
              <option>Under $1,000</option>
              <option>$1,000–$2,500</option>
              <option>$2,500–$5,000</option>
              <option>$5,000–$10,000</option>
              <option>$10,000+</option>
            </select>
          </div>

          {status === 'error' && (
            <p style={{ color: '#dc2626', fontSize: '0.85rem', margin: 0 }}>{error}</p>
          )}

          <button type="submit" disabled={status === 'loading'} style={{
            background: status === 'loading' ? '#9ca3af' : '#0D1B2A',
            color: 'white', padding: '14px', fontSize: '0.95rem', fontWeight: 700,
            border: 'none', borderRadius: 8, cursor: 'pointer', letterSpacing: '0.04em',
          }}>
            {status === 'loading' ? 'Submitting...' : '🎉 Enter to Win'}
          </button>

          <p style={{ margin: 0, fontSize: '0.72rem', color: '#9ca3af', textAlign: 'center', lineHeight: 1.6 }}>
            No purchase necessary. By entering you agree to be contacted by Crestwell Travel Services about travel planning. We never sell your information.
          </p>
        </form>

        <div style={{ textAlign: 'center', marginTop: 20, color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
          crestwellgetaways.com · 888-508-6893
        </div>
      </div>
    </div>
  );
}
