'use client';
import { useState } from 'react';
import Link from 'next/link';

// ─── Brand data ───────────────────────────────────────────────────────────────
// Images: best available ship exterior per line
// Descriptions/details: sourced from Widgety operator data

const BRANDS = [
  {
    id: 'ritz-carlton',
    slug: 'ritz-carlton-yacht-collection',
    name: 'The Ritz-Carlton\nYacht Collection',
    tagline: 'The Yachting Lifestyle, Perfected',
    category: 'Ultra-Luxury Yacht',
    // Widgety official cover image — Evrima exterior
    image: 'https://assets.widgety.co.uk/2024/06/25/15/53/27/243d22ee-734c-4b7a-88f5-11a27fc47c67/Ritz%20Carlton%20Yacht%20Collective%20Evrima%20-%20Exterior%203.PNG',
    logo: 'https://assets.widgety.co.uk/2018/05/30/12/08/55/ca9720f2-af35-4cf7-aa54-617676a73a7b/Ritz%20Carlton%20Yacht%20Collection%20Logo.jpg',
    website: 'https://www.ritzcarltonyachtcollection.com/',
    ships: 3,
    shipNames: 'Evrima · Ilma · Luminara',
    guestCapacity: '149–456',
    // From Widgety operator description
    description: 'The Ritz-Carlton name has long defined the pinnacle of hospitality on land. At sea, it is no different. Three intimate superyachts — Evrima, Ilma, and Luminara — deliver the legendary Ritz-Carlton standard of service across the world\'s most coveted yachting destinations. Ilma was awarded the first Forbes Five-Star rating ever given to a cruise ship.',
    highlights: [
      'First Forbes Five-Star rated cruise ship (Ilma, 2026)',
      'Three superyachts — under 460 guests each',
      'Butler service for every suite',
      'Private outdoor terrace on every accommodation',
      'All-inclusive: dining, premium spirits, excursions',
    ],
  },
  {
    id: 'silversea',
    slug: 'silversea-cruises',
    name: 'Silversea',
    tagline: 'All-Inclusive Luxury on All Seven Continents',
    category: 'All-Inclusive Luxury & Expedition',
    // Silversea Sanity CDN — Silver Nova exterior (official press image)
    image: 'https://cdn.sanity.io/images/rd0y3pad/production/5946a7b3eb1ac569f3603639c0962c97c1cd9230-4032x3024.jpg',
    logo: 'https://assets.widgety.co.uk/2023/10/18/07/03/33/99f229ef-c3bf-4203-ae40-a26228cd0ac5/Silversea%20Logo%202023.png',
    website: 'https://www.silversea.com/',
    ships: 12,
    shipNames: 'Silver Nova · Silver Moon · Silver Dawn · Silver Muse · Silver Ray + 7 more',
    guestCapacity: '144–728',
    // From Widgety: "leading luxury and expedition cruise line"
    description: 'Silversea is the world\'s foremost ultra-luxury and expedition cruise line — acclaimed for its all-inclusive lifestyle and unrivalled access to the world\'s most extraordinary destinations. From the sun-drenched Mediterranean to the frozen wilderness of Antarctica, Silversea operates across all seven continents with a fleet of twelve intimate ships, each voyage fully all-inclusive.',
    highlights: [
      'All-inclusive: butler, premium spirits, dining, excursions',
      'S.A.L.T. program — Sea and Land Taste culinary immersion',
      'Expedition voyages to Antarctica, the Arctic, Galápagos',
      'Silver Origin — the only ship purpose-built for the Galápagos',
      'Silversea Ventures — private jet world journey programs',
    ],
  },
  {
    id: 'explora',
    slug: 'explora-journeys',
    name: 'Explora Journeys',
    tagline: 'Where Ocean Meets Extraordinary',
    category: 'Contemporary Ocean Luxury',
    // Widgety official cover — EXPLORA I exterior
    image: 'https://assets.widgety.co.uk/2024/05/10/05/06/56/cd0a2664-e1b6-4224-be61-cdb7e99444fa/Explora%20Journeys,%20EXPLORA%20I,%20Exterior%202.jpg',
    logo: 'https://assets.widgety.co.uk/2024/11/28/08/22/18/c9d61e62-30f0-4f37-8c10-e0379a100a92/Explora%20Journeys%20Logo%20Gold.png',
    website: 'https://explorajourneys.com/int/en.html',
    ships: 5,
    shipNames: 'EXPLORA I · EXPLORA II · EXPLORA III · EXPLORA IV · EXPLORA V',
    guestCapacity: '461',
    // From Widgety: "MSC Group and the Aponte-Vago family"
    description: 'Born from the dream of the MSC Group\'s Aponte-Vago family, Explora Journeys is designed from the ground up to feel like your own private yacht at sea. Every suite has a private outdoor living space. Six restaurants, nine lounges, and a two-deck spa create an environment of effortless, unhurried luxury — with no fixed dining times and no sense of routine.',
    highlights: [
      'Every suite features a private outdoor living space',
      'No fixed dining times — six restaurants, nine bars',
      'Two-deck spa and wellness retreat',
      'All-suite, all-balcony design throughout',
      'Designed to feel like a private superyacht',
    ],
  },
  {
    id: 'regent',
    slug: 'regent-seven-seas',
    name: 'Regent Seven Seas\nCruises',
    tagline: 'The World\'s Most Inclusive Luxury Experience',
    category: 'The Most Inclusive Luxury',
    // Unsplash luxury cruise exterior — best available for Regent
    image: 'https://images.unsplash.com/photo-1580541631950-7282082b53ce?w=1600&q=90',
    logo: null,
    website: 'https://www.rssc.com/',
    ships: 6,
    shipNames: 'Seven Seas Explorer · Seven Seas Splendor · Seven Seas Grandeur · Seven Seas Voyager + 2 more',
    guestCapacity: '490–750',
    description: 'Regent Seven Seas holds the title of the world\'s most inclusive luxury cruise line — and earns it every voyage. Every fare includes roundtrip business-class airfare, luxury hotel stays, unlimited shore excursions at every port, fine dining, premium beverages, WiFi, and gratuities. Nothing is extra. Nothing is held back. Regent exists for the traveler who wants the extraordinary, delivered without a single second thought.',
    highlights: [
      'Business-class airfare included in every fare',
      'Luxury hotel stay pre-cruise included',
      'Unlimited shore excursions at every port — included',
      'Fine dining, premium spirits, WiFi, gratuities — included',
      'The only line where truly everything is included',
    ],
  },
];

// ─── Brand Card ───────────────────────────────────────────────────────────────

function BrandCard({ brand }: { brand: typeof BRANDS[0] }) {
  const [hovered, setHovered] = useState(false);

  const quoteParams = new URLSearchParams({
    trip_type: 'Luxury Cruise',
    line: brand.name.replace('\n', ' '),
    cruise_id: brand.slug,
  });

  return (
    <div
      id={brand.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--navy)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.07)'}`,
        transition: 'all 0.35s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 24px 60px rgba(0,0,0,0.5)' : 'none',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Ship image with Ken Burns */}
      <div style={{ height: 'clamp(200px, 30vw, 280px)', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${brand.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 7s ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }} />
        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,10,20,0.08) 0%, rgba(5,10,20,0.65) 100%)',
        }} />
        {/* Category badge */}
        <div style={{
          position: 'absolute', top: 20, left: 20,
          padding: '5px 14px',
          background: 'rgba(201,168,76,0.12)',
          border: '1px solid rgba(201,168,76,0.35)',
          backdropFilter: 'blur(8px)',
        }}>
          <span style={{
            fontSize: '0.6rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--gold)',
            fontFamily: 'var(--font-body)', fontWeight: 500,
          }}>
            {brand.category}
          </span>
        </div>
        {/* Logo */}
        {brand.logo && (
          <div style={{
            position: 'absolute', bottom: 20, left: 20,
            height: 40, background: 'rgba(255,255,255,0.9)',
            padding: '5px 10px', display: 'flex', alignItems: 'center',
          }}>
            <img
              src={brand.logo}
              alt={brand.name.replace('\n', ' ')}
              style={{ height: '100%', maxWidth: 130, objectFit: 'contain' }}
            />
          </div>
        )}
        {/* Ship info badge */}
        <div style={{
          position: 'absolute', bottom: 20, right: 20,
          background: 'rgba(5,10,20,0.75)', padding: '5px 14px',
          backdropFilter: 'blur(6px)',
        }}>
          <span style={{
            fontSize: '0.62rem', color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.08em', fontFamily: 'var(--font-body)',
          }}>
            {brand.ships} Ships · Up to {brand.guestCapacity} Guests
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 'clamp(20px, 4vw, 32px)', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Name */}
        <h2 className="font-display" style={{
          fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)',
          fontWeight: 300, color: 'white', lineHeight: 1.2,
          marginBottom: 6, whiteSpace: 'pre-line',
        }}>
          {brand.name}
        </h2>
        {/* Tagline */}
        <p style={{
          fontSize: '0.7rem', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--gold)',
          fontFamily: 'var(--font-body)', marginBottom: 16,
        }}>
          {brand.tagline}
        </p>
        {/* Ship names */}
        <p style={{
          fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)',
          fontFamily: 'var(--font-body)', marginBottom: 18,
          letterSpacing: '0.03em', lineHeight: 1.6,
        }}>
          {brand.shipNames}
        </p>
        {/* Gold rule */}
        <div style={{ width: 36, height: 1, background: 'var(--gold)', opacity: 0.45, marginBottom: 18 }} />
        {/* Description */}
        <p style={{
          fontSize: '0.875rem', color: 'rgba(255,255,255,0.52)',
          lineHeight: 1.85, marginBottom: 22,
        }}>
          {brand.description}
        </p>
        {/* Highlights */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {brand.highlights.map((h, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{
                flexShrink: 0, marginTop: 7,
                width: 4, height: 4, borderRadius: '50%',
                background: 'var(--gold)', display: 'inline-block', opacity: 0.7,
              }} />
              <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.65 }}>{h}</span>
            </li>
          ))}
        </ul>

        <div style={{ flex: 1 }} />

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: 10, paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}>

          <Link
            href={`/request-quote?${quoteParams.toString()}`}
            style={{
              flex: 1, textAlign: 'center', padding: '11px 12px',
              background: hovered ? 'var(--gold)' : 'transparent',
              color: hovered ? 'var(--navy)' : 'var(--gold)',
              border: '1px solid var(--gold)',
              fontSize: '0.67rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              textDecoration: 'none', fontFamily: 'var(--font-body)',
              transition: 'all 0.2s', display: 'block',
            }}
          >
            Request Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LuxuryCruisesPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all',         label: 'All Four Lines' },
    { id: 'ritz-carlton',label: 'Ritz-Carlton' },
    { id: 'silversea',   label: 'Silversea' },
    { id: 'explora',     label: 'Explora Journeys' },
    { id: 'regent',      label: 'Regent Seven Seas' },
  ];

  const displayed = activeFilter === 'all'
    ? BRANDS
    : BRANDS.filter(b => b.id === activeFilter);

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        background: '#05080f',
        paddingTop: 'clamp(100px, 15vw, 160px)', paddingBottom: 'clamp(60px, 8vw, 100px)',
        position: 'relative', overflow: 'hidden',
        minHeight: '60vh', display: 'flex', alignItems: 'center',
      }}>
        {/* Hero background — Ritz-Carlton Evrima with Ken Burns */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://assets.widgety.co.uk/2024/06/25/15/53/27/243d22ee-734c-4b7a-88f5-11a27fc47c67/Ritz%20Carlton%20Yacht%20Collective%20Evrima%20-%20Exterior%203.PNG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          opacity: 0.22,
          animation: 'heroKenBurns 20s ease-in-out infinite alternate',
        }} />
        {/* Dark vignette over image */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(5,8,15,0.92) 0%, rgba(5,8,15,0.5) 50%, rgba(5,8,15,0.85) 100%)',
        }} />
        {/* Gold top rule */}
        <div style={{
          position: 'absolute', top: 72, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)',
        }} />
        {/* Gold bottom rule */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
        }} />

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(18px, 5vw, 32px)', width: '100%' }}>
          {/* Overline with rules */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ width: 24, height: 1, background: 'var(--gold)', opacity: 0.7 }} />
            <span style={{
              fontSize: '0.62rem', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: 'var(--gold)',
              fontFamily: 'var(--font-body)', fontWeight: 500,
            }}>
              Crestwell Luxury Collection
            </span>
            <div style={{ width: 24, height: 1, background: 'var(--gold)', opacity: 0.7 }} />
          </div>

          <h1 className="font-display" style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 200, color: 'white',
            lineHeight: 1.08, marginBottom: 24,
            maxWidth: 800, letterSpacing: '-0.02em',
          }}>
            The Art of<br />
            <em style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Extraordinary</em><br />
            Travel
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            maxWidth: 520, lineHeight: 1.85, marginBottom: 52,
          }}>
            Four of the world's most distinguished cruise lines — chosen for their
            uncompromising commitment to craft, service, and the belief that the
            journey itself is the destination.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 'clamp(20px, 6vw, 48px)', flexWrap: 'wrap' }}>
            {[
              { num: '4',   label: 'Prestige Lines' },
              { num: '26+', label: 'Ships in Fleet' },
              { num: '900+',label: 'Destinations' },
              { num: '7',   label: 'Continents' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display" style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  color: 'var(--gold)', fontWeight: 200, lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontSize: '0.62rem', letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                  marginTop: 6, fontFamily: 'var(--font-body)',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes heroKenBurns {
            from { transform: scale(1) translate(0, 0); }
            to   { transform: scale(1.08) translate(-1%, -1%); }
          }
        `}</style>
      </section>

      {/* ── Why Luxury ── */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 2,
          }}>
            {[
              {
                title: 'All-Inclusive by Design',
                body: 'On these ships, nothing meaningful is extra. Airfare, excursions, premium spirits, fine dining, butler service — all woven into the fare from day one.',
                dark: true,
              },
              {
                title: 'Intimacy at Sea',
                body: 'Fewer than 750 guests on most sailings. You will know your crew, your fellow travelers, and every corner of the ship within hours of boarding.',
                dark: false,
              },
              {
                title: 'Destination Intelligence',
                body: 'Smaller ships dock where larger vessels cannot — medieval town centers, hidden anchorages, private beaches. The itinerary is the product.',
                dark: true,
              },
              {
                title: 'Service Without Precedent',
                body: 'Nearly one staff member per guest. Every preference noted. Every request anticipated. These are the ships where the word "no" is rarely spoken.',
                dark: false,
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: item.dark ? 'var(--navy)' : 'white',
                padding: 'clamp(28px, 4vw, 44px) clamp(20px, 4vw, 36px)',
              }}>
                <div style={{
                  width: 32, height: 2, background: 'var(--gold)',
                  marginBottom: 20, opacity: 0.7,
                }} />
                <h3 className="font-display" style={{
                  fontSize: '1.15rem', fontWeight: 400,
                  color: item.dark ? 'white' : 'var(--navy)',
                  marginBottom: 14,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem', lineHeight: 1.85,
                  color: item.dark ? 'rgba(255,255,255,0.48)' : 'var(--slate)',
                }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Grid ── */}
      <section style={{ background: '#05080f', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 32px) clamp(48px, 8vw, 96px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Header + filter */}
          <div style={{
            marginBottom: 'clamp(28px, 4vw, 48px)',
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
          }}>
            <div>
              <div style={{
                fontSize: '0.62rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--gold)',
                marginBottom: 12, fontFamily: 'var(--font-body)',
              }}>
                Our Luxury Portfolio
              </div>
              <h2 className="font-display" style={{
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 200, color: 'white', margin: 0,
              }}>
                Four Lines. One Standard.
              </h2>
            </div>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  style={{
                    padding: '7px 16px', fontSize: '0.68rem', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', letterSpacing: '0.08em',
                    border: '1px solid',
                    borderColor: activeFilter === f.id ? 'var(--gold)' : 'rgba(255,255,255,0.12)',
                    background: activeFilter === f.id ? 'rgba(201,168,76,0.1)' : 'transparent',
                    color: activeFilter === f.id ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.2s',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: displayed.length === 1
              ? 'minmax(0, 760px)'
              : 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
            gap: 28,
            justifyContent: displayed.length === 1 ? 'center' : undefined,
          }}>
            {displayed.map(brand => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Crestwell Advantage ── */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 16, justifyContent: 'center' }}>
            Why Book Through Crestwell
          </div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 300, color: 'var(--navy)', marginBottom: 20,
          }}>
            Expert Guidance for the World's Finest Sailings
          </h2>
          <p style={{
            fontSize: '0.95rem', color: 'var(--slate)',
            lineHeight: 1.85, maxWidth: 680, margin: '0 auto 40px',
          }}>
            Booking an ultra-luxury cruise is a significant investment — and the details
            matter enormously. Suite categories, dining reservations, pre-cruise hotel
            programs, shore excursion priorities, and embarkation logistics all shape the
            experience. Our specialists know these ships at a product level and are here
            to ensure every detail is right before you board.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/plan?trip_type=Luxury+Cruise" className="btn-primary" style={{ textDecoration: 'none' }}>
              Plan a Luxury Voyage
            </Link>
            <Link href="/contact" className="btn-navy" style={{ textDecoration: 'none' }}>
              Speak With a Specialist
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
