import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Royal Caribbean Special Offer — Legend of the Seas 2026 | Crestwell Travel',
  description: 'Exclusive Caribbean sailings on Royal Caribbean\'s Legend of the Seas. 3 to 8-night itineraries from Fort Lauderdale. Western Caribbean, Southern Caribbean & Perfect Day at CocoCay. Book now — limited time offer.',
  openGraph: {
    title: 'Royal Caribbean Special Offer — Legend of the Seas 2026',
    description: 'Exclusive Caribbean sailings from Fort Lauderdale. Book with Crestwell Travel — planning is always free.',
    url: 'https://crestwellgetaways.com/deals/legend-of-the-seas-2026',
    siteName: 'Crestwell Travel Services',
    type: 'website',
  },
};

const sailings = [
  {
    name: '3-Night Perfect Day Getaway',
    date: 'November 11, 2026',
    nights: 3,
    ports: ['Fort Lauderdale, FL', 'Perfect Day at CocoCay', 'Fort Lauderdale, FL'],
    tag: 'Quick Escape',
    tagColor: '#0D9FD8',
  },
  {
    name: '8-Night Southern Caribbean',
    date: 'November 14, 2026',
    nights: 8,
    ports: ['Fort Lauderdale, FL', 'Willemstad, Curaçao', 'Oranjestad, Aruba', 'Perfect Day at CocoCay', 'Fort Lauderdale, FL'],
    tag: 'Best Value',
    tagColor: '#C9A84C',
  },
  {
    name: '6-Night Western Caribbean & Perfect Day',
    date: 'November 22 & December 6, 2026',
    nights: 6,
    ports: ['Fort Lauderdale, FL', 'Perfect Day at CocoCay', 'Cozumel, Mexico', 'Costa Maya, Mexico', 'Fort Lauderdale, FL'],
    tag: 'Fan Favorite',
    tagColor: '#2E7D5B',
  },
  {
    name: '8-Night Southern Caribbean & Perfect Day',
    date: 'November 28 & December 12, 2026',
    nights: 8,
    ports: ['Fort Lauderdale, FL', 'Willemstad, Curaçao', 'Oranjestad, Aruba', 'Cabo Rojo, Dominican Republic', 'Perfect Day at CocoCay', 'Fort Lauderdale, FL'],
    tag: 'Most Popular',
    tagColor: '#C9A84C',
  },
  {
    name: '6-Night Western Caribbean & Perfect Day Holiday',
    date: 'December 20, 2026',
    nights: 6,
    ports: ['Fort Lauderdale, FL', 'Perfect Day at CocoCay', 'Cozumel, Mexico', 'Costa Maya, Mexico', 'Fort Lauderdale, FL'],
    tag: 'Holiday Sailing',
    tagColor: '#CC2936',
  },
  {
    name: '8-Night Southern Caribbean & Perfect Day Holiday',
    date: 'December 26, 2026',
    nights: 8,
    ports: ['Fort Lauderdale, FL', 'Oranjestad, Aruba (2 days)', 'Cabo Rojo, Dominican Republic', 'Perfect Day at CocoCay', 'Fort Lauderdale, FL'],
    tag: 'New Year Sailing',
    tagColor: '#CC2936',
  },
];

export default function LegendOfTheSeasPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(160deg, #0D1B2A 60%, #0D3B6B)',
        padding: 'clamp(64px,10vw,96px) clamp(16px,5vw,32px) clamp(48px,8vw,72px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle wave bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 50% 120%, rgba(13,159,216,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
          <div style={{ display: 'inline-block', background: '#CC2936', color: 'white', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 18px', marginBottom: 24 }}>
            Limited Time Special Offer
          </div>
          <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12, fontFamily: 'var(--font-body)' }}>
            Royal Caribbean International
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem,6vw,4rem)', fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.1 }}>
            Legend of the Seas℠
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.25rem)', color: 'rgba(255,255,255,0.75)', marginBottom: 8 }}>
            2026 Caribbean Sailings from Fort Lauderdale, Florida
          </p>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>
            3-night to 8-night itineraries · Western & Southern Caribbean · Perfect Day at CocoCay
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?cruise=legend-of-the-seas-2026&source=special-offer"
              style={{ background: '#C9A84C', color: '#0D1B2A', padding: '14px 36px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.03em', display: 'inline-block' }}>
              Request My Free Quote
            </Link>
            <a href="tel:8885086893"
              style={{ border: '2px solid rgba(255,255,255,0.4)', color: 'white', padding: '14px 36px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', display: 'inline-block' }}>
              Call 888-508-6893
            </a>
          </div>
          <p style={{ marginTop: 20, fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
            Planning is always free — no booking fees, ever.
          </p>
        </div>
      </section>

      {/* OFFER BANNER */}
      <section style={{ background: '#C9A84C', padding: '16px 32px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#0D1B2A', letterSpacing: '0.03em' }}>
          🚢 Special offer starts April 18, 2026 · Call or submit a quote request to lock in your rate
        </p>
      </section>

      {/* SAILINGS GRID */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(48px,6vw,72px) clamp(16px,5vw,32px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Available Itineraries</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 12 }}>
            Choose Your Caribbean Adventure
          </h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.95rem', maxWidth: 560, margin: '0 auto' }}>
            All sailings depart from Port Everglades, Fort Lauderdale — direct flights available from Atlanta, Nashville, Birmingham, and Chattanooga.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {sailings.map((s, i) => (
            <div key={i} style={{ background: 'white', borderTop: `4px solid ${s.tagColor}`, padding: '28px 28px 24px', position: 'relative' }}>
              {/* Tag */}
              <div style={{ display: 'inline-block', background: s.tagColor, color: 'white', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', marginBottom: 16 }}>
                {s.tag}
              </div>

              {/* Nights badge */}
              <div style={{ position: 'absolute', top: 24, right: 24, background: 'var(--navy)', color: 'white', width: 52, height: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1 }}>{s.nights}</span>
                <span style={{ fontSize: '0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C' }}>nights</span>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 8, paddingRight: 60 }}>{s.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#C9A84C', fontWeight: 600, marginBottom: 16 }}>📅 {s.date}</p>

              {/* Ports */}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 10 }}>Ports of Call</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {s.ports.map((port, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--navy)' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: j === 0 || j === s.ports.length - 1 ? 'var(--navy)' : s.tagColor, flexShrink: 0 }} />
                      {port}
                    </div>
                  ))}
                </div>
              </div>

              <Link href={`/request-quote?cruise=legend-of-the-seas&itinerary=${encodeURIComponent(s.name)}&date=${encodeURIComponent(s.date)}`}
                style={{ display: 'block', textAlign: 'center', marginTop: 20, background: 'var(--navy)', color: 'white', padding: '11px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.05em' }}>
                Get My Free Quote →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* WHY BOOK WITH CRESTWELL */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(48px,6vw,64px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 12 }}>Why Book With Crestwell</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 300, color: 'white', marginBottom: 40 }}>
            The Same Cruise — Better Price, Better Service
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 48 }}>
            {[
              { icon: '🎯', title: 'Best Rate Guaranteed', text: 'We have access to promotions and group rates Royal Caribbean\'s website never shows you.' },
              { icon: '💰', title: 'Always Free to Plan', text: 'No booking fees, no planning fees. We\'re compensated by the cruise line — not you.' },
              { icon: '⭐', title: 'Onboard Credit Perks', text: 'Group amenity points and advisor perks mean extra onboard credit for your cabin.' },
              { icon: '🤝', title: 'Dedicated Advisor', text: 'One person handles everything — cabins, dining, shore excursions, travel insurance.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '24px 20px', background: 'rgba(255,255,255,0.05)', borderTop: '2px solid #C9A84C' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', marginBottom: 32 }}>
            ASTA Member · CLIA Certified · Carnival Diamond Expert · NCL Master's Degree · Florida Seller of Travel ST46414
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?cruise=legend-of-the-seas-2026&source=special-offer"
              style={{ background: '#C9A84C', color: '#0D1B2A', padding: '14px 36px', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
              Request My Free Quote
            </Link>
            <a href="tel:8885086893"
              style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', padding: '14px 36px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>
              Call 888-508-6893
            </a>
          </div>
        </div>
      </section>

      {/* FINE PRINT */}
      <section style={{ padding: '24px 32px', textAlign: 'center', background: 'var(--cream)' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--slate)', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
          Features vary by ship. All itineraries are subject to change without notice. ©2025 Royal Caribbean Cruises Ltd. Ships' registry: The Bahamas. Offer presented by Crestwell Travel Services. crestwellgetaways.com · 888-508-6893
        </p>
      </section>

    </div>
  );
}
