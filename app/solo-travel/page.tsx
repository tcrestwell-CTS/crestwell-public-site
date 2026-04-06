import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Solo & Women\'s Travel | Crestwell Travel Services',
  description: 'Safe, empowering solo travel and women\'s group vacations. Norwegian Studio Cabins, Virgin Voyages adults-only cruises, and solo-friendly all-inclusive resorts — expertly planned by Crestwell.',
};

const cruises = [
  {
    line: 'Norwegian Cruise Line',
    logo: 'https://assets.widgety.co.uk/2026/01/16/13/24/48/adbe3d4c-b28f-47cb-8831-34e55810af30/NCL Its Different Out Here Logo 2026.png',
    badge: 'No Single Supplement',
    badgeColor: '#22c55e',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=900&q=80',
    headline: 'Solo Studios & Exclusive Lounges',
    highlights: [
      'Solo Studio cabins priced for one — no double occupancy fee',
      'Exclusive Studio Lounge access with complimentary coffee, snacks & daily mixers',
      'Solo Balcony, Oceanview & Inside staterooms available fleetwide',
      'Hosted daily solo meetups — built-in community at sea',
      'Caribbean, Mediterranean, Alaska & more',
    ],
    cta: 'Request an NCL Solo Quote',
    href: '/request-quote?trip_type=Cruise+Vacation&destination=Caribbean&message=Interested+in+Norwegian+solo+studio+cabin',
  },
  {
    line: 'Virgin Voyages',
    logo: 'https://assets.widgety.co.uk/2025/02/27/11/23/24/db38cdcc-3552-47ad-bea7-ddb1931f8985/Virgin Voyages Logo 2025.png',
    badge: 'Adults Only',
    badgeColor: '#c9a84c',
    image: 'https://images.unsplash.com/photo-1502920514313-52581002a659?w=900&q=80',
    headline: 'Adults-Only Luxury, Solo-Friendly Pricing',
    highlights: [
      'Strictly adults-only — sophisticated, social atmosphere',
      'Reduced single supplement on select Sea Terrace sailings',
      '20+ unique eateries with communal seating & flexible dining',
      'Solo gatherings, mixology workshops & group fitness included',
      'Caribbean & Mediterranean itineraries from Miami & San Juan',
    ],
    cta: 'Request a Virgin Voyages Quote',
    href: '/request-quote?trip_type=Cruise+Vacation&destination=Caribbean&message=Interested+in+Virgin+Voyages+solo+sailing',
  },
];

const resorts = [
  {
    name: 'Secrets Resorts & Spas',
    tagline: 'Adults-Only · Mexico & Caribbean',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=900&q=80',
    why: 'Adults-only but not couples-exclusive — perfect for solo women and friend groups. Multiple restaurants, spa, flexible dining, and a relaxed upscale vibe without the honeymoon pressure.',
    highlights: ['No couples-only policy', 'World of Hyatt points eligible', 'Flexible solo & group rates', 'Dinner outings to sister resorts'],
    badge: 'Best for Solo Women',
  },
  {
    name: 'Excellence Resorts',
    tagline: 'Adults-Only · Mexico & Jamaica',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80',
    why: 'Boutique adults-only properties with solo-friendly single rates (often 30% less than double). Serene atmosphere, swim-up suites, and gourmet dining across Mexico and Jamaica.',
    highlights: ['Solo single rates available', 'Swim-up suites', 'No-reservation dining', 'Quiet, boutique atmosphere'],
    badge: 'Best Value Solo Rate',
  },
  {
    name: 'Barceló Resorts',
    tagline: 'All Ages · Dominican Republic & Mexico',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=80',
    why: 'Lively, social atmosphere with solo-friendly communal dining and an active beach scene. Great for women traveling solo who want to meet people and stay active.',
    highlights: ['Lively social scene', 'Scuba intro lessons included', 'Bavaro Beach — top 10 world', 'Strong solo traveler community'],
    badge: 'Best Social Scene',
  },
];

const whyUs = [
  { icon: '🛡️', title: 'Safety First', body: 'We only recommend vetted, women-traveler-approved properties with strong solo safety records and responsive staff.' },
  { icon: '💰', title: 'No Hidden Fees', body: 'We negotiate solo-friendly rates and know which lines waive single supplements — so you never pay double for one.' },
  { icon: '👯', title: "Women's Groups", body: "Planning a girls' trip, birthday group, or women's retreat? We coordinate groups of 4–40 with private spaces and group perks." },
  { icon: '🤝', title: 'Personal Planning', body: 'Tim personally reviews every solo booking to ensure the ship, cabin, and itinerary match your comfort level and travel goals.' },
];

export default function SoloWomensTravelPage() {
  return (
    <main style={{ background: 'var(--warm-white)', color: 'var(--navy)' }}>

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', minHeight: '70vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--navy)', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1800&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center 30%', opacity: 0.3,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.75) 100%)' }} />
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px', maxWidth: 760, zIndex: 1 }}>
          <div className="overline" style={{ marginBottom: 20, color: 'var(--gold)' }}>
            Solo Travel &amp; Women&apos;s Groups
          </div>
          <h1 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300,
            color: 'white', lineHeight: 1.1, marginBottom: 24,
          }}>
            Travel on Your Terms.<br />
            <em style={{ color: 'var(--gold-light)' }}>Every Step of the Way.</em>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 40, maxWidth: 580, margin: '0 auto 40px' }}>
            Safe, empowering journeys for solo women and women&apos;s groups. From Norwegian Studio Cabins to adults-only resorts — we handle every detail so you can focus on the adventure.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?trip_type=Solo+%26+Women%27s+Travel" className="btn-primary" style={{ textDecoration: 'none' }}>
              Plan My Solo Trip
            </Link>
            <Link href="#cruises" className="btn-outline" style={{ textDecoration: 'none' }}>
              See Cruise Options
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CRESTWELL ── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="overline" style={{ marginBottom: 14 }}>Why Book With Us</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: 'var(--navy)' }}>
              Solo Travel Done Right
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
            {whyUs.map((item, i) => (
              <div key={i} style={{ background: 'white', padding: '40px 32px' }}>
                <div style={{ fontSize: '2rem', marginBottom: 16 }}>{item.icon}</div>
                <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRUISES ── */}
      <section id="cruises" className="section-pad" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="overline" style={{ marginBottom: 14 }}>Adults-Only Cruising</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: 'var(--navy)' }}>
              The Best Cruise Lines for Solo Travelers
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: 16, maxWidth: 560, margin: '16px auto 0' }}>
              No single supplements. No awkward table assignments. Just the freedom to explore on your schedule.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 32 }}>
            {cruises.map((cruise, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                gap: 0, background: 'var(--navy)', overflow: 'hidden',
              }}
              className="solo-cruise-card">
                {/* Image */}
                <div style={{
                  order: i % 2 === 0 ? 0 : 1,
                  minHeight: 360,
                  backgroundImage: `url(${cruise.image})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  position: 'relative',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,27,42,0.15)' }} />
                </div>

                {/* Content */}
                <div style={{ order: i % 2 === 0 ? 1 : 0, padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {/* Logo + Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                    <img src={cruise.logo} alt={cruise.line} style={{ height: 28, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                    <span style={{
                      padding: '3px 10px', fontSize: '0.62rem', fontWeight: 700,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      background: cruise.badgeColor + '22', border: `1px solid ${cruise.badgeColor}`,
                      color: cruise.badgeColor,
                    }}>
                      {cruise.badge}
                    </span>
                  </div>

                  <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 300, color: 'white', marginBottom: 20, lineHeight: 1.2 }}>
                    {cruise.headline}
                  </h3>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {cruise.highlights.map((h, j) => (
                      <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }}>✦</span>
                        <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={cruise.href} className="btn-primary" style={{ textDecoration: 'none', alignSelf: 'flex-start' }}>
                    {cruise.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESORTS ── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="overline" style={{ marginBottom: 14 }}>All-Inclusive Resorts</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 300, color: 'var(--navy)' }}>
              Solo-Friendly Resorts We Recommend
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: 16, maxWidth: 560, margin: '16px auto 0' }}>
              Adults-only properties where solo women feel welcome, safe, and genuinely at ease — not like a third wheel.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {resorts.map((resort, i) => (
              <div key={i} style={{ background: 'white', overflow: 'hidden' }}>
                {/* Image */}
                <div style={{ position: 'relative', height: 220 }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${resort.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                  }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,27,42,0.25)' }} />
                  <div style={{
                    position: 'absolute', top: 16, left: 16,
                    background: 'var(--gold)', padding: '4px 12px',
                  }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)' }}>
                      {resort.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '28px 28px 32px' }}>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                      {resort.tagline}
                    </span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 12 }}>
                    {resort.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 18 }}>
                    {resort.why}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                    {resort.highlights.map((h, j) => (
                      <span key={j} style={{
                        padding: '4px 10px', fontSize: '0.65rem', fontWeight: 500,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        background: 'var(--cream)', color: 'var(--navy)',
                        border: '1px solid rgba(13,27,42,0.1)',
                      }}>
                        {h}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/request-quote?trip_type=All-Inclusive+Resort&message=Interested+in+${encodeURIComponent(resort.name)}+for+solo+travel`}
                    style={{
                      display: 'inline-flex', alignItems: 'center',
                      fontSize: '0.72rem', fontWeight: 600,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: 'var(--navy)', textDecoration: 'none',
                      borderBottom: '1px solid var(--gold)', paddingBottom: 2,
                    }}
                  >
                    Request a Quote →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 20, color: 'var(--gold)' }}>Ready to Go?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'white', marginBottom: 20, lineHeight: 1.2 }}>
            Your Solo Adventure Starts Here
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 40 }}>
            Tell us where you want to go and how you like to travel. Tim will personally put together options that fit your style, safety preferences, and budget — no single supplement surprises.
          </p>
          <Link href="/request-quote?trip_type=Solo+%26+Women%27s+Travel" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.8rem' }}>
            Get My Free Solo Travel Plan
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .solo-cruise-card {
            grid-template-columns: 1fr !important;
          }
          .solo-cruise-card > div {
            order: unset !important;
          }
        }
      `}</style>
    </main>
  );
}
