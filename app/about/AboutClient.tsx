'use client';
import Link from 'next/link';
import Image from 'next/image';

const credentials = [
  {
    src: '/images/ASTAHorizontalCMYK0247817c-a713-4d83-9e60-913564067b77.png',
    alt: 'ASTA — American Society of Travel Advisors Member',
    width: 140, height: 52,
    href: 'https://www.asta.org/',
    label: 'ASTA Member',
  },
  {
    src: '/images/CLIA-Cruise-Lines-International-Association-Logo.jpg',
    alt: 'CLIA — Cruise Lines International Association Certified',
    width: 80, height: 52,
    href: 'https://cruising.org/',
    label: 'CLIA Certified',
  },
  {
    src: '/images/Carnival-Expert-Diamond-Level-Graduate_logo.jpg',
    alt: 'Carnival Expert — Diamond Level Graduate',
    width: 160, height: 52,
    href: 'https://www.carnival.com/',
    label: 'Carnival Diamond',
  },
  {
    src: '/images/c7e7a302-e75d-491e-9dd2-b7990834a0a0.jpg',
    alt: "Norwegian Cruise Line — Master's Degree Graduate",
    width: 70, height: 52,
    href: 'https://www.ncl.com/',
    label: "NCL Master's Graduate",
  },
];

export default function AboutClient() {
  return (
    <main style={{ background: 'var(--warm-white)', minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'var(--navy)',
        paddingTop: 120,
        paddingBottom: 72,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 56, alignItems: 'center' }}>

          {/* Photo */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{
              width: 220, height: 220, borderRadius: '50%',
              border: '3px solid var(--gold)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(13,27,42,0.9))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '6rem',
              boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
              overflow: 'hidden',
            }}>
              {/* Replace emoji with real photo:
                  <Image src="/images/tim-crestwell.jpg" alt="Tim Crestwell, founder of Crestwell Travel Services" width={220} height={220} style={{ objectFit: 'cover', borderRadius: '50%' }} />
              */}
              👤
            </div>
            {/* Verified badge */}
            <div style={{
              position: 'absolute', bottom: 8, right: 8,
              background: 'var(--gold)', borderRadius: '50%',
              width: 40, height: 40, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: '1.1rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}>
              ✓
            </div>
          </div>

          {/* Title block */}
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>
              Founder & Travel Advisor
            </p>
            <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 400, color: 'white', lineHeight: 1.2, marginBottom: 16 }}>
              Meet Tim Crestwell
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)', lineHeight: 1.7, maxWidth: 560 }}>
              Crestwell Travel Services — Chattanooga, TN
            </p>
            {/* Credential badges */}
            <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}>
              {['ASTA Member', 'CLIA Certified', 'Carnival Diamond', "NCL Master's Graduate"].map(b => (
                <span key={b} style={{
                  fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '4px 12px', borderRadius: 20,
                  background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)',
                  color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500,
                }}>
                  {b}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Bio ──────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '72px 32px' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-secondary)' }}>

          <p style={{ marginBottom: 24 }}>
            Travel has always been more than a hobby for me — it's how I make sense of the world. There's something about standing in a new place, hearing a different language at the next table, or watching the sun rise over a port you've only ever seen in pictures that changes you. After years of chasing that feeling on my own trips, I built Crestwell Travel Services so other people could have the same kind of experience — without the stress of figuring it all out themselves.
          </p>

          <p style={{ marginBottom: 24 }}>
            Before travel, I spent my career as a cybersecurity engineer — a field that taught me to sweat the small details, plan for what could go wrong, and protect the people relying on me. Those instincts turned out to be exactly what good travel planning requires. When you book with Crestwell, you're working with someone who actually reads the fine print, double-checks the itinerary, and thinks two steps ahead so your vacation doesn't get derailed by something avoidable.
          </p>

          <p style={{ marginBottom: 24 }}>
            Today, I help families, couples, and groups across Tennessee, Georgia, Alabama, Florida — and honestly, anywhere in the country — plan cruises, all-inclusive escapes, group getaways, and bucket-list trips. I'm an{' '}
            <a href="https://www.asta.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)' }}>ASTA</a>{' '}
            member,{' '}
            <a href="https://cruising.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid rgba(201,168,76,0.4)' }}>CLIA</a>{' '}
            Certified, and a Carnival Diamond Level Graduate, which means I've put in the hours to know cruise lines, ships, ports, and resorts at a level that goes well past what you'd find on a booking site.
          </p>

          <p style={{ marginBottom: 0 }}>
            But credentials are just table stakes. What I really offer is a person on the other end of the phone who knows your name, remembers that your spouse gets seasick, and will text you the night before you sail to make sure you have everything you need.
          </p>

        </div>

        {/* Pull quote */}
        <blockquote style={{
          margin: '48px 0',
          padding: '28px 36px',
          borderLeft: '4px solid var(--gold)',
          background: 'var(--cream)',
        }}>
          <p className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--navy)', lineHeight: 1.6 }}>
            "I'll tell you exactly what I would book — and what I'd avoid."
          </p>
        </blockquote>

        {/* CTA */}
        <div style={{
          background: 'var(--navy)', padding: '40px 36px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))' }} />
          <p className="font-display" style={{ fontSize: '1.5rem', fontWeight: 400, color: 'white', marginBottom: 8 }}>
            Ready to start planning?
          </p>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)', marginBottom: 24, fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
            Request a free quote or call me directly — no booking fees, no pressure.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/request-quote" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', background: 'var(--gold)', color: 'var(--navy)',
              textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)',
            }}>
              Request a Free Quote →
            </Link>
            <a href="tel:8885086893" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', border: '1px solid rgba(201,168,76,0.4)',
              color: 'var(--gold)', textDecoration: 'none',
              fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', fontFamily: 'var(--font-body)',
            }}>
              📞 888.508.6893
            </a>
          </div>
        </div>
      </section>

      {/* ── Credential logos ─────────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)', padding: '56px 32px', borderTop: '1px solid rgba(13,27,42,0.08)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--slate)', fontFamily: 'var(--font-body)', textAlign: 'center', marginBottom: 32 }}>
            Industry Credentials
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {credentials.map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                title={c.alt} style={{ opacity: 0.8, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.8'}
              >
                <Image
                  src={c.src} alt={c.alt}
                  width={c.width} height={c.height}
                  style={{ objectFit: 'contain', height: 52, width: 'auto' }}
                />
              </a>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
