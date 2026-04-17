import Link from 'next/link';
import Image from 'next/image';
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
    img: 'https://images.unsplash.com/photo-1590523278191-995cbcda646b?w=600&q=80',
  },
  {
    name: '8-Night Southern Caribbean',
    date: 'November 14, 2026',
    nights: 8,
    ports: ['Fort Lauderdale, FL', 'Willemstad, Curaçao', 'Oranjestad, Aruba', 'Perfect Day at CocoCay', 'Fort Lauderdale, FL'],
    tag: 'Best Value',
    tagColor: '#C9A84C',
    img: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80',
  },
  {
    name: '6-Night Western Caribbean & Perfect Day',
    date: 'November 22 & December 6, 2026',
    nights: 6,
    ports: ['Fort Lauderdale, FL', 'Perfect Day at CocoCay', 'Cozumel, Mexico', 'Costa Maya, Mexico', 'Fort Lauderdale, FL'],
    tag: 'Fan Favorite',
    tagColor: '#2E7D5B',
    img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80',
  },
  {
    name: '8-Night Southern Caribbean & Perfect Day',
    date: 'November 28 & December 12, 2026',
    nights: 8,
    ports: ['Fort Lauderdale, FL', 'Willemstad, Curaçao', 'Oranjestad, Aruba', 'Cabo Rojo, Dominican Republic', 'Perfect Day at CocoCay', 'Fort Lauderdale, FL'],
    tag: 'Most Popular',
    tagColor: '#C9A84C',
    img: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&q=80',
  },
  {
    name: '6-Night Western Caribbean & Perfect Day Holiday',
    date: 'December 20, 2026',
    nights: 6,
    ports: ['Fort Lauderdale, FL', 'Perfect Day at CocoCay', 'Cozumel, Mexico', 'Costa Maya, Mexico', 'Fort Lauderdale, FL'],
    tag: 'Holiday Sailing',
    tagColor: '#CC2936',
    img: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=600&q=80',
  },
  {
    name: '8-Night Southern Caribbean & Perfect Day Holiday',
    date: 'December 26, 2026',
    nights: 8,
    ports: ['Fort Lauderdale, FL', 'Oranjestad, Aruba (2 days)', 'Cabo Rojo, Dominican Republic', 'Perfect Day at CocoCay', 'Fort Lauderdale, FL'],
    tag: 'New Year Sailing',
    tagColor: '#CC2936',
    img: 'https://images.unsplash.com/photo-1467189386127-c4e5e31ee213?w=600&q=80',
  },
];

export default function LegendOfTheSeasPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>

      {/* HERO — full bleed Caribbean photography */}
      <section style={{ position: 'relative', minHeight: 560, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&q=85"
          alt="Royal Caribbean cruise ship in the Caribbean"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          priority
        />
        {/* Navy overlay — keeps Crestwell branding, lets photo breathe */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.72) 0%, rgba(13,27,42,0.85) 100%)' }} />

        <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto', padding: 'clamp(80px,12vw,120px) clamp(16px,5vw,32px)', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block', background: '#CC2936', color: 'white',
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', padding: '6px 20px', marginBottom: 28,
            fontFamily: 'var(--font-body)',
          }}>
            Limited Time Special Offer · Starts April 18, 2026
          </div>
          <div style={{ fontSize: '0.75rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 14, fontFamily: 'var(--font-body)' }}>
            Royal Caribbean International
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.4rem,6vw,4.2rem)', fontWeight: 700, color: 'white', marginBottom: 18, lineHeight: 1.05, letterSpacing: '-0.01em' }}>
            Legend of the Seas<sup style={{ fontSize: '0.4em', verticalAlign: 'super', fontWeight: 400 }}>℠</sup>
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'rgba(255,255,255,0.82)', marginBottom: 6, fontFamily: 'var(--font-body)', letterSpacing: '0.01em' }}>
            2026 Caribbean Sailings · Fort Lauderdale, Florida
          </p>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.52)', marginBottom: 44, fontFamily: 'var(--font-body)' }}>
            3-night to 8-night itineraries · Western & Southern Caribbean · Perfect Day at CocoCay
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?cruise=legend-of-the-seas-2026&source=special-offer"
              style={{ background: '#C9A84C', color: '#0D1B2A', padding: '15px 40px', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', display: 'inline-block' }}>
              Request My Free Quote
            </Link>
            <a href="tel:8885086893"
              style={{ border: '2px solid rgba(255,255,255,0.5)', color: 'white', padding: '15px 40px', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.04em', fontFamily: 'var(--font-body)', display: 'inline-block' }}>
              888-508-6893
            </a>
          </div>
          <p style={{ marginTop: 22, fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
            Planning is always free · No booking fees, ever
          </p>
        </div>
      </section>

      {/* GOLD OFFER BANNER */}
      <section style={{ background: '#C9A84C', padding: '14px 32px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: '#0D1B2A', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
          🚢 Special offer starts April 18, 2026 — Call or request a quote to lock in your rate
        </p>
      </section>

      {/* SAILINGS GRID */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: 'clamp(56px,7vw,80px) clamp(16px,5vw,32px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Available Itineraries</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.7rem,3vw,2.4rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 14 }}>
            Choose Your Caribbean Adventure
          </h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.92rem', maxWidth: 580, margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
            All sailings depart from Port Everglades, Fort Lauderdale — direct flights from Atlanta, Nashville, Birmingham, and Chattanooga.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: 24 }}>
          {sailings.map((s, i) => (
            <div key={i} style={{ background: 'white', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 12px rgba(13,27,42,0.08)' }}>
              {/* Card photo */}
              <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                <Image
                  src={s.img}
                  alt={s.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                {/* Overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,27,42,0.6) 0%, transparent 60%)' }} />
                {/* Tag pill */}
                <div style={{ position: 'absolute', top: 14, left: 14, background: s.tagColor, color: 'white', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 12px', fontFamily: 'var(--font-body)' }}>
                  {s.tag}
                </div>
                {/* Nights badge */}
                <div style={{ position: 'absolute', top: 14, right: 14, background: 'var(--navy)', color: 'white', width: 50, height: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '2px solid #C9A84C' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1, fontFamily: 'var(--font-body)' }}>{s.nights}</span>
                  <span style={{ fontSize: '0.48rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: 'var(--font-body)' }}>nights</span>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '22px 24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '0.97rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 6, lineHeight: 1.3, fontFamily: 'var(--font-body)', WebkitFontSmoothing: 'antialiased' }}>{s.name}</h3>
                <p style={{ fontSize: '0.78rem', color: '#C9A84C', fontWeight: 700, marginBottom: 16, fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }}>📅 {s.date}</p>

                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 14, marginBottom: 20, flex: 1 }}>
                  <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 10, fontFamily: 'var(--font-body)' }}>Ports of Call</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {s.ports.map((port, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.8rem', color: 'var(--navy)', fontFamily: 'var(--font-body)', WebkitFontSmoothing: 'antialiased' }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: j === 0 || j === s.ports.length - 1 ? '#0D1B2A' : s.tagColor, flexShrink: 0, border: j === 0 || j === s.ports.length - 1 ? 'none' : '1.5px solid ' + s.tagColor }} />
                        <span style={{ color: port.includes('CocoCay') || port.includes('Perfect Day') ? s.tagColor : 'inherit', fontWeight: port.includes('CocoCay') || port.includes('Perfect Day') ? 600 : 400 }}>{port}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link href={`/request-quote?cruise=legend-of-the-seas&itinerary=${encodeURIComponent(s.name)}&date=${encodeURIComponent(s.date)}`}
                  style={{ display: 'block', textAlign: 'center', background: 'var(--navy)', color: 'white', padding: '12px', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
                  Get My Free Quote →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY BOOK WITH CRESTWELL — with festive Caribbean beach background */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <Image
          src="https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=1600&q=80"
          alt="Tropical beach at sunset"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,27,42,0.88)' }} />
        <div style={{ position: 'relative', maxWidth: 960, margin: '0 auto', padding: 'clamp(56px,7vw,80px) clamp(16px,5vw,32px)', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 12 }}>Why Book With Crestwell</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem,2.5vw,2.2rem)', fontWeight: 300, color: 'white', marginBottom: 48 }}>
            The Same Cruise — Better Price, Better Service
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 52 }}>
            {[
              { icon: '🎯', title: 'Best Rate Guaranteed', text: 'Access to promotions and group rates Royal Caribbean\'s website never shows you.' },
              { icon: '💰', title: 'Always Free to Plan', text: 'No fees — ever. We\'re compensated by the cruise line, not by you.' },
              { icon: '⭐', title: 'Onboard Credit Perks', text: 'Advisor amenity points mean extra onboard credit stacked into your cabin.' },
              { icon: '🤝', title: 'One Dedicated Advisor', text: 'Cabins, dining, excursions, insurance — all handled by one person.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '28px 20px', background: 'rgba(255,255,255,0.05)', borderTop: '3px solid #C9A84C' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 14 }}>{item.icon}</div>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white', marginBottom: 10, fontFamily: 'var(--font-body)', letterSpacing: '0.02em', WebkitFontSmoothing: 'antialiased' }}>{item.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0, fontFamily: 'var(--font-body)' }}>{item.text}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.22)', marginBottom: 36, fontFamily: 'var(--font-body)' }}>
            ASTA Member · CLIA Certified · Carnival Diamond Expert · NCL Master's Degree · Florida Seller of Travel ST46414
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?cruise=legend-of-the-seas-2026&source=special-offer"
              style={{ background: '#C9A84C', color: '#0D1B2A', padding: '15px 40px', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              Request My Free Quote
            </Link>
            <a href="tel:8885086893"
              style={{ border: '2px solid rgba(255,255,255,0.4)', color: 'white', padding: '15px 40px', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.04em', fontFamily: 'var(--font-body)' }}>
              888-508-6893
            </a>
          </div>
        </div>
      </section>

      {/* FINE PRINT */}
      <section style={{ padding: '20px 32px', textAlign: 'center', background: 'var(--cream)' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--slate)', maxWidth: 700, margin: '0 auto', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
          Features vary by ship. All itineraries are subject to change without notice. ©2025 Royal Caribbean Cruises Ltd. Ships' registry: The Bahamas. Offer presented by Crestwell Travel Services · crestwellgetaways.com · 888-508-6893
        </p>
      </section>

    </div>
  );
}
