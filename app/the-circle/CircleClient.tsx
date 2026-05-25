'use client';
import { useState } from 'react';
import Link from 'next/link';
import { EmailField, useEmailValidation } from '@/components/EmailField';

const BENEFITS = [
  { icon: '🚢', title: 'First Access', desc: 'Every Crestwell-hosted group trip before public release. Always.' },
  { icon: '💰', title: 'Member Pricing', desc: 'Founding members get $100+ savings on every hosted trip — permanently.' },
  { icon: '📬', title: 'Port Intel Briefing', desc: 'Monthly note from Tim. What to book, what to skip, where to actually eat.' },
  { icon: '⚡', title: 'Priority Response', desc: '24-hour turnaround on every quote you send. No exceptions.' },
  { icon: '🎁', title: 'Onboard Perks', desc: 'Birthday or anniversary surprise on every Circle booking.' },
  { icon: '🥂', title: 'Bon Voyage Gathering', desc: 'Annual member meetup in Chattanooga. You and one guest.' },
];

const STEPS = [
  { n: '01', title: 'Join in 30 seconds', desc: 'Enter your name and email below. No credit card, no catch, no commitment.' },
  { n: '02', title: 'Get your welcome kit', desc: 'Your welcome PDF lands in your inbox within the hour with everything you need to know.' },
  { n: '03', title: 'Watch for the first briefing', desc: 'Your first Port Intel Briefing arrives the first Tuesday of next month. Then every month after.' },
];

const FAQS = [
  { q: 'What does it cost?', a: 'Nothing. The Crestwell Circle is free to join and will always be free. I want to do more of the work I love with people I already enjoy planning for.' },
  { q: "What's the difference between founding members and future members?", a: 'Founding members get a permanent $100 onboard credit on every Circle-hosted group trip they book, for as long as they're members. Future members won't have this. Founding status closes at the end of launch month.' },
  { q: 'How often will I hear from you?', a: 'Once a month via the Port Intel Briefing. Occasionally when a hosted trip opens. Never just to fill your inbox.' },
  { q: "What's a 'hosted trip'?", a: "A small-group cruise or getaway I personally plan and host each year — usually 20–40 people. Members get first access and member pricing. Details on the first trip come out within the next few weeks." },
  { q: 'Can I invite someone?', a: 'Yes — forward any Circle email to a friend or family member and they can join as a founding member through the end of launch month.' },
  { q: 'How do I book a trip as a Circle member?', a: 'Same as always — reply to any email, call me at 888.508.6893, or request a quote on the site. Just mention you're a Circle member for priority queue.' },
];

export default function CircleClient() {
  const emailValidation = useEmailValidation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  const [err, setErr] = useState('');

  const doJoin = () => {
    if (!name || !email || emailValidation.state === 'invalid') return;
    setSubmitting(true);
    setErr('');
    fetch('/api/circle-join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, source: 'landing_page', founding_member: true }),
    })
      .then(r => r.json().then(d => ({ ok: r.ok, d })))
      .then(({ ok, d }) => {
        if (!ok) throw new Error(d.error || 'Failed');
        setJoined(true);
      })
      .catch((e: Error) => setErr(e.message))
      .finally(() => setSubmitting(false));
  };

  const inputSt: React.CSSProperties = {
    width: '100%', padding: '14px 16px', borderRadius: 8,
    border: '1.5px solid rgba(255,255,255,0.15)', fontSize: '0.9rem',
    color: 'white', background: 'rgba(255,255,255,0.08)', boxSizing: 'border-box',
    outline: 'none', fontFamily: 'var(--font-body)',
  };

  return (
    <main style={{ background: 'var(--navy)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{ paddingTop: 120, paddingBottom: 88, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.06) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent)' }} />
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative' }}>
          <p style={{ fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 16 }}>
            A members-only travel community
          </p>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem,6vw,4rem)', fontWeight: 400, color: 'white', lineHeight: 1.15, marginBottom: 24 }}>
            The Crestwell Circle
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', lineHeight: 1.75, maxWidth: 580, margin: '0 auto 40px' }}>
            First access to hosted trips. Monthly port intel from Tim. A real person on the other end — not a booking engine. Free to join. Always.
          </p>
          <div style={{ display: 'inline-flex', gap: 8, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 24, padding: '6px 16px', marginBottom: 48 }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.08em' }}>
              ✦ Founding Member status open through end of launch month
            </span>
          </div>

          {/* Inline signup */}
          {joined ? (
            <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, padding: '28px 32px', maxWidth: 480, margin: '0 auto' }}>
              <div style={{ fontSize: '2rem', marginBottom: 12 }}>&#10003;</div>
              <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, color: 'white', marginBottom: 8 }}>You're in.</h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
                Welcome to the Circle. Your welcome kit is on its way to {email}. The first Port Intel Briefing lands the first Tuesday of next month.
              </p>
            </div>
          ) : (
            <div style={{ maxWidth: 480, margin: '0 auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input type="text" placeholder="Your first name" style={inputSt} value={name}
                  onChange={e => setName(e.target.value)} />
                <EmailField value={email} onChange={setEmail} required placeholder="Your email address"
                  inputStyle={{ ...inputSt, paddingRight: 44 }} labelStyle={{ display: 'none' }} />
                {err && <p style={{ fontSize: '0.82rem', color: '#fca5a5', fontFamily: 'var(--font-body)' }}>{err}</p>}
                <button onClick={doJoin} disabled={!name || !email || emailValidation.state === 'invalid' || submitting}
                  style={{ padding: '14px', background: !name || !email || submitting ? 'rgba(201,168,76,0.4)' : 'var(--gold)', color: 'var(--navy)', border: 'none', borderRadius: 8, cursor: !name || !email || submitting ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  {submitting ? 'Joining...' : 'Join the Circle →'}
                </button>
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}>
                  Free. No spam. Unsubscribe anytime. Or reply "I'm in" to the invitation email.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Benefits ── */}
      <section style={{ background: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>What you get</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 400, color: 'var(--navy)' }}>
              Member benefits
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 24 }}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 12, padding: '28px 28px', border: '1px solid rgba(13,27,42,0.08)', borderTop: '3px solid var(--gold)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 14 }}>{b.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 8, fontFamily: 'var(--font-body)' }}>{b.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founding member callout ── */}
      <section style={{ background: 'var(--navy)', padding: '72px 24px', borderTop: '1px solid rgba(201,168,76,0.2)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>Founding members only</p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 400, color: 'white', marginBottom: 20 }}>
            One extra perk — yours forever.
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', fontFamily: 'var(--font-body)', lineHeight: 1.8, marginBottom: 8 }}>
            Founding members get a permanent <strong style={{ color: 'var(--gold)' }}>$100 onboard credit</strong> on every Circle-hosted group trip they book — for as long as they're members.
          </p>
          <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>
            Future members won't have this. Founding status closes at the end of launch month.
          </p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ background: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>Simple</p>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 400, color: 'var(--navy)' }}>How it works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 32 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-body)', flexShrink: 0 }}>{s.n}</div>
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 6, fontFamily: 'var(--font-body)' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--slate)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personal note ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 32 }}>
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 20 }}>From Tim</p>
            <blockquote className="font-display" style={{ fontSize: 'clamp(1.1rem,2vw,1.4rem)', fontWeight: 400, fontStyle: 'italic', color: 'white', lineHeight: 1.75, marginBottom: 28 }}>
              "I built this business one trip at a time. The Circle is how I stay connected to the people who made it what it is — and do more of the work I actually love."
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,rgba(201,168,76,0.3),rgba(13,27,42,0.8))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', border: '2px solid var(--gold)' }}>👤</div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.9rem', color: 'white', fontFamily: 'var(--font-body)' }}>Tim Crestwell</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>Founder · Crestwell Travel Services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.4rem)', fontWeight: 400, color: 'var(--navy)' }}>Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FAQS.map((f, i) => (
              <div key={i} style={{ borderBottom: '1px solid rgba(13,27,42,0.1)', padding: '24px 0' }}>
                <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy)', marginBottom: 8, fontFamily: 'var(--font-body)' }}>{f.q}</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate)', lineHeight: 1.75, fontFamily: 'var(--font-body)' }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ background: 'var(--navy)', padding: '96px 24px', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 400, color: 'white', marginBottom: 16 }}>
            Ready to join?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: 36 }}>
            Founding member status is open now. It takes 30 seconds and it will always be free.
          </p>
          {joined ? (
            <p style={{ fontSize: '1rem', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>&#10003; You're in the Circle.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420, margin: '0 auto' }}>
              <input type="text" placeholder="Your first name" style={inputSt} value={name} onChange={e => setName(e.target.value)} />
              <EmailField value={email} onChange={setEmail} required placeholder="Your email address"
                inputStyle={{ ...inputSt, paddingRight: 44 }} labelStyle={{ display: 'none' }} />
              {err && <p style={{ fontSize: '0.82rem', color: '#fca5a5', fontFamily: 'var(--font-body)' }}>{err}</p>}
              <button onClick={doJoin} disabled={!name || !email || emailValidation.state === 'invalid' || submitting}
                style={{ padding: '14px', background: !name || !email || submitting ? 'rgba(201,168,76,0.4)' : 'var(--gold)', color: 'var(--navy)', border: 'none', borderRadius: 8, cursor: !name || !email || submitting ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                {submitting ? 'Joining...' : 'Join the Circle →'}
              </button>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>Free. No spam. Unsubscribe anytime.</p>
            </div>
          )}
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
              Prefer to reply by email? Just reply "I'm in" to your invitation email and Tim will add you personally.<br />
              Questions? <a href="tel:8885086893" style={{ color: 'var(--gold)', textDecoration: 'none' }}>888.508.6893</a> &middot; <a href="mailto:tim@crestwellgetaways.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>tim@crestwellgetaways.com</a>
            </p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', marginTop: 16, fontFamily: 'var(--font-body)' }}>
              Crestwell Travel Services &middot; Chattanooga, TN &middot; Florida Seller of Travel Ref. No. ST46414
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
