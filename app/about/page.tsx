import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Crestwell Travel Services — a Southeast-based travel agency specializing in cruises, all-inclusive resorts, and group vacations.',
};

const accreditations = [
  { name: 'ASTA', full: 'American Society of Travel Advisors' },
  { name: 'CLIA', full: 'Cruise Lines International Association' },
  { name: 'TRUE', full: 'Travel & Retail Unified Exchange' },
  { name: 'ABTP', full: 'Association of Black Travel Professionals' },
  { name: 'Carnival Diamond', full: 'Carnival Cruise Line Diamond Expert' },
  { name: 'Norwegian Masters', full: 'Norwegian Cruise Line Masters Degree' },
];

const values = [
  {
    icon: '🎯',
    title: 'Personalized Service',
    description: 'Every trip is custom-built around you — your preferences, timeline, and budget. No cookie-cutter packages.',
  },
  {
    icon: '🤝',
    title: 'Expert Guidance',
    description: 'Our advisors hold industry certifications from major cruise lines and travel associations. We know travel.',
  },
  {
    icon: '💰',
    title: 'Best Pricing',
    description: 'We have access to exclusive rates and promotions that aren\'t available when booking direct. You pay less.',
  },
  {
    icon: '📞',
    title: 'Concierge Support',
    description: 'From booking to disembarkation, we\'re here if anything comes up. Your peace of mind is our priority.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', paddingTop: 140, paddingBottom: 100, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Our Story</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, maxWidth: 700 }}>
            Travel That's Crafted<br />
            <em style={{ color: 'var(--gold-light)' }}>Around You</em>
          </h1>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 80, alignItems: 'center' }}>
            <div>
              <div className="overline" style={{ marginBottom: 20 }}>Who We Are</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.25, marginBottom: 24 }}>
                Crestwell Travel Services
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem', marginBottom: 20 }}>
                Based in the Southeast, Crestwell Travel Services was built on a simple belief: travel should be extraordinary, and planning it shouldn't be stressful. We serve clients across Georgia, Tennessee, and Alabama with personalized itineraries and expert guidance.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem', marginBottom: 20 }}>
                We specialize in cruises, all-inclusive resorts, family vacations, and group travel — with access to exclusive rates and promotions that save our clients time and money. Whether you're a first-time cruiser or a seasoned traveler, we match your trip to your life.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Our team holds certifications from Royal Caribbean, Carnival, Norwegian, and other major cruise lines — meaning when we make a recommendation, it's backed by real expertise.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{
                height: 460,
                backgroundImage: 'url(https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
              <div style={{
                position: 'absolute',
                bottom: -24,
                left: -24,
                background: 'var(--navy)',
                padding: '24px 28px',
                width: 200,
              }}>
                <div className="font-display" style={{ fontSize: '2.5rem', color: 'var(--gold)', lineHeight: 1 }}>1,670+</div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Cruise vacations available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Why Choose Us</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)' }}>
              The Crestwell Difference
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {values.map((v, i) => (
              <div key={i} style={{ background: 'white', padding: '40px 32px' }}>
                <div style={{ fontSize: '2rem', marginBottom: 20 }}>{v.icon}</div>
                <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="section-pad" style={{ background: 'var(--navy)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Industry Recognition</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'white' }}>
              Accreditations & Certifications
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', maxWidth: 480, margin: '16px auto 0', lineHeight: 1.75 }}>
              Our certifications reflect a commitment to professional excellence and deep product knowledge.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {accreditations.map((a, i) => (
              <div key={i} style={{ border: '1px solid rgba(201, 168, 76, 0.2)', padding: '28px 28px', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, background: 'rgba(201, 168, 76, 0.1)', border: '1px solid rgba(201, 168, 76, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>{a.name.slice(0, 3)}</span>
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.875rem', color: 'white', marginBottom: 4 }}>{a.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{a.full}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--cream)', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 540, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 16 }}>
            Ready to Start Planning?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 36 }}>
            Get a free, no-obligation quote from one of our travel specialists. It only takes a few minutes.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>Request a Quote</Link>
            <Link href="/contact" className="btn-navy" style={{ textDecoration: 'none' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
