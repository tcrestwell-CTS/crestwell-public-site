import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import GYGWidget from '@/components/GYGWidget';

export const metadata: Metadata = {
  title: 'Destination Packages | Customized Vacations | Crestwell Travel Services',
  description: 'Explore the world with Crestwell Travel. We partner with Avanti Destinations to create fully customized vacation packages to Europe, Asia, Latin America, the Middle East, Africa, and the South Pacific. Planning is always free.',
  openGraph: {
    title: 'Destination Packages — Crestwell Travel Services',
    description: 'Fully customized international vacation packages. Europe, Asia, Latin America, Middle East, Africa & South Pacific. No cookie-cutter tours — every trip is built for you.',
    url: 'https://crestwellgetaways.com/destination-packages',
    siteName: 'Crestwell Travel Services',
    type: 'website',
  },
};

const regions = [
  {
    name: 'Europe',
    img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
    tagline: 'From the Eiffel Tower to the Amalfi Coast',
    description: 'Explore centuries of history, world-class cuisine, and stunning landscapes. Whether you want a self-drive through Tuscany, a rail journey across Scandinavia, or a castle stay in Ireland — we build it around you.',
    highlights: ['France', 'Italy', 'Spain', 'Greece', 'Portugal', 'Ireland', 'Germany', 'Croatia', 'Iceland', 'Switzerland', 'Austria', 'Czech Republic', 'Norway', 'Scotland', 'Netherlands'],
    color: '#0D9FD8',
  },
  {
    name: 'Asia',
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    tagline: 'Ancient traditions meet modern wonder',
    description: 'Cherry blossoms in Japan, floating markets in Thailand, temples in Cambodia, or the skyline of Singapore. Asia rewards the curious traveler with experiences unlike anywhere else on earth.',
    highlights: ['Japan', 'Thailand', 'Vietnam', 'Indonesia / Bali', 'Cambodia', 'Singapore', 'South Korea', 'Philippines', 'Taiwan', 'China', 'Laos', 'Malaysia'],
    color: '#C9A84C',
  },
  {
    name: 'Latin America',
    img: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80',
    tagline: 'Adventure, culture & natural wonders',
    description: `Explore Machu Picchu, the Amazon rainforest, Patagonia’s glaciers, or the beaches of Costa Rica. Latin America is one of the world’s most diverse travel regions — and one of the most underrated.`,
    highlights: ['Costa Rica', 'Peru', 'Colombia', 'Ecuador / Galápagos', 'Argentina', 'Chile / Patagonia', 'Brazil', 'Mexico', 'Guatemala', 'Panama', 'Belize', 'Bolivia'],
    color: '#2E7D5B',
  },
  {
    name: 'Middle East & Africa',
    img: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&q=80',
    tagline: 'Ancient civilizations & breathtaking landscapes',
    description: 'Walk among the pyramids of Egypt, float in the Dead Sea in Jordan, explore the souks of Morocco, or witness the Great Migration in Kenya. These destinations deliver once-in-a-lifetime experiences.',
    highlights: ['Egypt', 'Jordan', 'Morocco', 'Israel', 'United Arab Emirates', 'Kenya', 'Tanzania', 'South Africa', 'Ethiopia'],
    color: '#CC2936',
  },
  {
    name: 'South Pacific',
    img: 'https://images.unsplash.com/photo-1476158085676-e67f57ed9ed7?w=800&q=80',
    tagline: 'Australia, New Zealand & Fiji',
    description: 'From the Great Barrier Reef to the fjords of New Zealand to the crystal waters of Fiji — the South Pacific is the ultimate long-haul destination for travelers ready for something extraordinary.',
    highlights: ['Australia', 'New Zealand', 'Fiji'],
    color: '#0D9FD8',
  },
];

const whyCustom = [
  { icon: '🎯', title: 'Built Around You', text: 'No fixed group tours. Your departure dates, your pace, your interests — we design every detail.' },
  { icon: '🏨', title: 'Hand-Picked Hotels', text: 'Boutique properties, castle stays, eco-resorts, and luxury hotels selected for character and location.' },
  { icon: '✈️', title: 'Air + Land Packages', text: 'We bundle flights, hotels, rail, transfers, and experiences into one seamless package.' },
  { icon: '🚂', title: 'Rail & Self-Drive', text: 'Explore Europe by train or take a self-drive journey through Italy, France, Ireland, or Costa Rica.' },
  { icon: '💰', title: 'Always Free to Plan', text: `Our planning services are complimentary. We're compensated by our supplier partners — never by you.` },
  { icon: '🤝', title: 'Avanti Partnership', text: `We work directly with Avanti Destinations — the travel advisor's travel advisor since 1981.` },
];

export default function DestinationPackagesPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Image
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=85"
          alt="World travel destination packages"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.65) 0%, rgba(13,27,42,0.82) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', padding: 'clamp(80px,12vw,120px) clamp(16px,5vw,32px)', textAlign: 'center', WebkitFontSmoothing: 'antialiased' }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 16, fontFamily: 'var(--font-body)' }}>
            In Partnership with Avanti Destinations
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 700, color: 'white', marginBottom: 20, lineHeight: 1.1 }}>
            Customized Vacation Packages<br />for Independent Travelers
          </h1>
          <p style={{ fontSize: 'clamp(1rem,1.8vw,1.2rem)', color: 'rgba(255,255,255,0.78)', marginBottom: 12, fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
            Europe · Asia · Latin America · Middle East · Africa · South Pacific
          </p>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: 44, fontFamily: 'var(--font-body)' }}>
            No group tours. No fixed itineraries. Your trip — built around you.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?type=destination-package"
              style={{ background: '#C9A84C', color: '#0D1B2A', padding: '14px 36px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              Start Planning My Trip
            </Link>
            <a href="tel:8885086893"
              style={{ border: '2px solid rgba(255,255,255,0.45)', color: 'white', padding: '14px 36px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
              Call 888-508-6893
            </a>
          </div>
          <p style={{ marginTop: 20, fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
            Planning is always free — no booking fees, ever
          </p>
        </div>
      </section>

      {/* WHY CUSTOM */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(48px,6vw,64px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Why a Custom Package</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 300, color: 'white', marginBottom: 12 }}>
              Your Trip. Your Way.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.92rem', maxWidth: 540, margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
              We work with Avanti Destinations — the leader in independent travel since 1981 — to build packages that go where group tours don't.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {whyCustom.map((item, i) => (
              <div key={i} style={{ padding: '24px 20px', background: 'rgba(255,255,255,0.04)', borderTop: '2px solid #C9A84C' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white', marginBottom: 8, fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }}>{item.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0, fontFamily: 'var(--font-body)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGIONS */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: 'clamp(56px,7vw,80px) clamp(16px,5vw,32px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Where Do You Want to Go?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 12 }}>
            Destinations We Cover
          </h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.92rem', maxWidth: 560, margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
            Every package is custom-built — flights, hotels, rail, transfers, and experiences bundled into one seamless itinerary.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {regions.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr', gap: 0, background: 'white', overflow: 'hidden', boxShadow: '0 2px 16px rgba(13,27,42,0.08)', minHeight: 280 }}>

              {/* Image */}
              <div style={{ position: 'relative', order: i % 2 === 0 ? 0 : 1, minHeight: 280 }}>
                <Image src={r.img} alt={r.name} fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent, rgba(13,27,42,0.15))` }} />
              </div>

              {/* Content */}
              <div style={{ padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: i % 2 === 0 ? 1 : 0 }}>
                <div style={{ display: 'inline-block', background: r.color, color: 'white', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 14px', marginBottom: 16, fontFamily: 'var(--font-body)' }}>
                  {r.name}
                </div>
                <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 400, color: 'var(--navy)', marginBottom: 10, lineHeight: 1.2 }}>
                  {r.tagline}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--slate)', lineHeight: 1.75, marginBottom: 20, fontFamily: 'var(--font-body)' }}>
                  {r.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                  {r.highlights.map((h, j) => (
                    <span key={j} style={{ fontSize: '0.72rem', background: 'var(--cream)', color: 'var(--navy)', padding: '4px 10px', fontFamily: 'var(--font-body)', letterSpacing: '0.03em' }}>
                      {h}
                    </span>
                  ))}
                </div>
                <Link href={`/request-quote?type=destination-package&region=${encodeURIComponent(r.name)}`}
                  style={{ display: 'inline-block', background: 'var(--navy)', color: 'white', padding: '11px 28px', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', alignSelf: 'flex-start' }}>
                  Plan My {r.name} Trip →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRE/POST CRUISE */}
      <section style={{ background: '#f8f6f0', padding: 'clamp(48px,6vw,64px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 12 }}>Cruise + Land Combo</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 16 }}>
            Pre & Post-Cruise Packages
          </h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.92rem', lineHeight: 1.8, maxWidth: 680, margin: '0 auto 32px', fontFamily: 'var(--font-body)' }}>
            Already booking a cruise? Let us build a custom land package around it. Arrive a few days early to explore Rome before your Mediterranean sailing, or extend your Alaska cruise with a Denali wilderness package. Avanti handles the hotels, transfers, and experiences — we handle everything else.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?type=pre-post-cruise"
              style={{ background: 'var(--navy)', color: 'white', padding: '13px 32px', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.04em', fontFamily: 'var(--font-body)' }}>
              Ask About Pre/Post Cruise Packages
            </Link>
          </div>
        </div>
      </section>

      <GYGWidget query="international tours experiences" title="Tours & Experiences" />

      {/* FINAL CTA */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(56px,7vw,80px) clamp(16px,5vw,32px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem,3vw,2.6rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
            Ready to Start Planning?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 40, fontFamily: 'var(--font-body)' }}>
            Tell us where you want to go, when, and how many people. We'll come back with a fully custom itinerary — flights, hotels, rail, transfers, and experiences — all in one package. There's never a planning fee.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?type=destination-package"
              style={{ background: '#C9A84C', color: '#0D1B2A', padding: '15px 40px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              Request My Free Quote
            </Link>
            <a href="tel:8885086893"
              style={{ border: '2px solid rgba(255,255,255,0.35)', color: 'white', padding: '15px 40px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
              888-508-6893
            </a>
          </div>
          <p style={{ marginTop: 24, fontSize: '0.72rem', color: 'rgba(255,255,255,0.22)', fontFamily: 'var(--font-body)' }}>
            ASTA Member · CLIA Certified · Avanti Destinations Partner · Florida Seller of Travel ST46414
          </p>
        </div>
      </section>

    </div>
  );
}