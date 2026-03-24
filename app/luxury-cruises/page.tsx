'use client';
import { useState } from 'react';
import Link from 'next/link';

// ─── Brand data ───────────────────────────────────────────────────────────────

const BRANDS = [
  {
    id: 'ritz-carlton',
    slug: 'ritz-carlton-yacht-collection',
    name: 'The Ritz-Carlton\nYacht Collection',
    tagline: 'The Yachting Lifestyle, Perfected',
    category: 'Ultra-Luxury Yacht',
    cover: 'https://assets.widgety.co.uk/2024/06/25/15/53/27/243d22ee-734c-4b7a-88f5-11a27fc47c67/Ritz Carlton Yacht Collective Evrima - Exterior 3.PNG',
    logo: 'https://assets.widgety.co.uk/2018/05/30/12/08/55/ca9720f2-af35-4cf7-aa54-617676a73a7b/Ritz Carlton Yacht Collection Logo.jpg',
    website: 'https://www.ritzcarltonyachtcollection.com/',
    imageLibrary: 'https://www.ritzcarltonyachtcollection.com/image-library',
    // Ship gallery — Evrima, Ilma, Luminara
    gallery: [
      {
        url: 'https://assets.widgety.co.uk/2024/06/25/15/53/27/243d22ee-734c-4b7a-88f5-11a27fc47c67/Ritz Carlton Yacht Collective Evrima - Exterior 3.PNG',
        caption: 'Evrima — 149 Suites · 298 Guests',
        ship: 'Evrima',
      },
      {
        url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=85',
        caption: 'Ilma — 224 Suites · 448 Guests · Forbes Five-Star',
        ship: 'Ilma',
      },
      {
        url: 'https://images.unsplash.com/photo-1537139027-6dbf2d2e1b31?w=1200&q=85',
        caption: 'Luminara — 226 Suites · Asia-Pacific & Mediterranean',
        ship: 'Luminara',
      },
    ],
    ships: 3,
    guestCapacity: '149–456',
    description: 'The Ritz-Carlton name has long defined the pinnacle of hospitality on land. At sea, it is no different. Three intimate superyachts — Evrima, Ilma, and Luminara — carry fewer than 300 guests each through the world\'s most coveted ports, from the Amalfi Coast to the Caribbean, each voyage shaped entirely around the art of exceptional service. Ilma was awarded the first-ever Forbes Five-Star rating for a cruise ship in 2026.',
    highlights: [
      'Forbes Five-Star rated fleet (Ilma, 2026)',
      'Evrima · Ilma · Luminara — three superyachts',
      'Butler service for every suite',
      'Private terrace in every accommodation',
      'All-inclusive: dining, spirits, excursions',
    ],
    accentColor: '#8B7355',
    iframeUrl: null,
  },
  {
    id: 'silversea',
    slug: 'silversea-cruises',
    name: 'Silversea',
    tagline: 'The Jewel in the Crown of Luxury Cruising',
    category: 'All-Inclusive Luxury & Expedition',
    // Cover: official Widgety image
    cover: 'https://assets.widgety.co.uk/2023/08/29/12/37/23/38fe3ebf-290b-4087-8654-9ce0f23ed44f/Silversea Cruises Silver Dawn Exterior.jpg',
    logo: 'https://assets.widgety.co.uk/2023/10/18/07/03/33/99f229ef-c3bf-4203-ae40-a26228cd0ac5/Silversea Logo 2023.png',
    website: 'https://www.silversea.com/',
    imageLibrary: 'https://www.silverseacontentcenter.com/dam/searchresults',
    // Ship gallery — images sourced from Silversea's own Sanity CMS CDN
    gallery: [
      {
        url: 'https://cdn.sanity.io/images/rd0y3pad/production/5946a7b3eb1ac569f3603639c0962c97c1cd9230-4032x3024.jpg',
        caption: 'Silver Nova — Nova Class · Mediterranean & World Voyages',
        ship: 'Silver Nova',
      },
      {
        url: 'https://cdn.sanity.io/images/rd0y3pad/production/89b54e229d9f3cba790d9bff6640ff7b691b52ff-10984x8240.jpg',
        caption: 'Silver Moon — All-Suite · Mediterranean & Caribbean',
        ship: 'Silver Moon',
      },
      {
        url: 'https://cdn.sanity.io/images/rd0y3pad/production/f52c84c593994d05d38e1813082392f86434f67a-2500x1875.jpg',
        caption: 'Silver Dawn — All-Suite · Otium Spa at Sea',
        ship: 'Silver Dawn',
      },
      {
        url: 'https://cdn.sanity.io/images/rd0y3pad/production/e1d3cfaae1dd49338da020e9717a919378cedfce-5436x3621.jpg',
        caption: 'Silver Muse — Flagship · S.A.L.T. Culinary Program',
        ship: 'Silver Muse',
      },
      {
        url: 'https://cdn.sanity.io/images/rd0y3pad/production/23100646256d6f1a72f6cef15b0de95d76ba9a6f-6647x4433.jpg',
        caption: 'Silver Origin — Galápagos Specialist · Expedition',
        ship: 'Silver Origin',
      },
      {
        url: 'https://cdn.sanity.io/images/rd0y3pad/production/3429871fc3f45cc59f40be12faebf62ca56db6b4-4939x3550.jpg',
        caption: 'Silver Ray — Nova Class · World Expeditions',
        ship: 'Silver Ray',
      },
    ],
    iframeUrl: 'https://www.silversea.com/',
    ships: 12,
    guestCapacity: '144–728',
    description: 'Silversea is the world\'s foremost ultra-luxury and expedition cruise line, operating a fleet of intimate ships across all seven continents — from the Mediterranean\'s golden coasts to the ice-sculpted wilderness of Antarctica. Every voyage is all-inclusive: butler service, premium spirits, gourmet dining, and curated shore excursions are woven into the experience from the moment you board.',
    highlights: [
      'All-inclusive: butler, spirits, dining, excursions',
      'Expedition and polar itineraries to all 7 continents',
      'S.A.L.T. culinary program — local flavors at sea',
      'Silver Origin: Galápagos Islands specialist',
      'Silversea Ventures — private jet journeys',
    ],
    accentColor: '#C4A882',
  },
  {
    id: 'explora',
    slug: 'explora-journeys',
    name: 'Explora Journeys',
    tagline: 'Where Ocean Meets Extraordinary',
    category: 'Contemporary Ocean Luxury',
    cover: 'https://assets.widgety.co.uk/2024/05/10/05/06/56/057a53e3-7d12-4369-b247-f3bc3c88e7e3/Explora Journeys, EXPLORA I, Exterior 3.jpg',
    logo: 'https://assets.widgety.co.uk/2024/11/28/08/22/18/c9d61e62-30f0-4f37-8c10-e0379a100a92/Explora Journeys Logo Gold.png',
    website: 'https://explorajourneys.com/int/en.html',
    ships: 5,
    guestCapacity: '461',
    description: 'Born from the vision of the MSC Group\'s Aponte-Vago family, Explora Journeys represents the next evolution of ocean luxury — a concept designed from the ground up to feel like your own private yacht at sea. Every suite has an outdoor terrace. Six restaurants, nine lounges, and a spa that spans two decks. No fixed schedules, no crowds. Just the ocean, beautifully curated.',
    highlights: [
      'Every suite features a private outdoor terrace',
      'No fixed dining times or assigned seating',
      'Six restaurants, nine bars and lounges',
      'Two-deck spa and wellness retreat',
      'All-suite, all-balcony ship design',
    ],
    accentColor: '#9B8B6E',
    iframeUrl: null,
  },
  {
    id: 'regent',
    slug: 'regent-seven-seas',
    name: 'Regent Seven Seas\nCruises',
    tagline: 'The World\'s Most Luxurious Cruise Line',
    category: 'The Most Inclusive Luxury',
    cover: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&q=85',
    logo: null,
    website: 'https://www.rssc.com/',
    iframeUrl: 'https://www.rssc.com/',
    ships: 6,
    guestCapacity: '490–750',
    description: 'Regent Seven Seas holds the title of the world\'s most inclusive luxury cruise line — and earns it. Every fare includes roundtrip business-class airfare, luxury hotel stays pre- and post-cruise, unlimited shore excursions, fine dining, premium beverages, WiFi, and gratuities. Nothing is held back, nothing is an add-on. Regent exists for travelers who want the extraordinary — delivered seamlessly.',
    highlights: [
      'Business-class airfare included in every fare',
      'Luxury hotel stay pre-cruise included',
      'Unlimited shore excursions included',
      'Fine dining and premium spirits included',
      'WiFi, gratuities, and transfers included',
    ],
    accentColor: '#B8A070',
    iframeUrl2: 'https://www.rssc.com/',
  },
];

// ─── Embedded site popup ──────────────────────────────────────────────────────

function BrandSitePopup({ brand, onClose }: { brand: typeof BRANDS[0]; onClose: () => void }) {
  const url = brand.iframeUrl || brand.iframeUrl2 || brand.website;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(5,10,18,0.9)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 1100, height: '90vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
          animation: 'slideUp 0.25s ease',
        }}
      >
        {/* Header bar */}
        <div style={{
          background: 'var(--navy)',
          borderBottom: '2px solid var(--gold)',
          padding: '10px 20px',
          display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="font-display" style={{ color: 'white', fontSize: '0.9rem', fontWeight: 300 }}>Crestwell</span>
            <span style={{ fontSize: '0.55rem', color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Travel Services</span>
          </div>
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.15)' }} />
          {brand.logo && (
            <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.9)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 3, flexShrink: 0 }}>
              <img src={brand.logo} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
          )}
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {brand.name.replace('\n', ' ')} — Official Website
          </span>
          <a href={url} target="_blank" rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.68rem', textDecoration: 'none', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.15)', whiteSpace: 'nowrap', letterSpacing: '0.06em' }}
            onClick={e => e.stopPropagation()}>
            ↗ Open
          </a>
          <button onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', width: 32, height: 32, cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            ×
          </button>
        </div>
        <iframe src={url} title={brand.name}
          style={{ flex: 1, border: 'none', background: 'white' }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" />
        <div style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '8px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)' }}>If the site doesn't load, use the Open button above.</span>
          <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Presented by Crestwell Travel Services</span>
        </div>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}


// ─── Ritz-Carlton Ship Gallery ────────────────────────────────────────────────

function RitzGallery({ brand, hovered }: { brand: any; hovered: boolean }) {
  const [activeShip, setActiveShip] = useState(0);
  const gallery = brand.gallery || [];

  return (
    <div style={{ flexShrink: 0 }}>
      {/* Main image */}
      <div style={{ height: 280, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${gallery[activeShip]?.url || brand.cover})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transition: 'all 0.5s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,10,20,0.05) 0%, rgba(5,10,20,0.75) 100%)' }} />
        <div style={{ position: 'absolute', top: 20, left: 20, padding: '5px 14px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', backdropFilter: 'blur(8px)' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{brand.category}</span>
        </div>
        {brand.logo && (
          <div style={{ position: 'absolute', bottom: 20, left: 20, height: 40, background: 'rgba(255,255,255,0.9)', padding: '5px 10px', display: 'flex', alignItems: 'center' }}>
            <img src={brand.logo} alt={brand.name.replace('\n', ' ')} style={{ height: '100%', maxWidth: 120, objectFit: 'contain' }} />
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 20, right: 20, background: 'rgba(5,10,20,0.75)', padding: '5px 12px', backdropFilter: 'blur(6px)' }}>
          <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', fontFamily: 'var(--font-body)' }}>
            {gallery[activeShip]?.caption || `${brand.ships} Ships`}
          </span>
        </div>
      </div>
      {/* Ship selector — scrollable for 6+ ships */}
      <div style={{ background: 'rgba(5,10,20,0.95)', borderTop: '1px solid rgba(201,168,76,0.15)', overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as any}>
        <div style={{ display: 'flex', width: 'max-content', minWidth: '100%' }}>
          {gallery.map((ship: any, i: number) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setActiveShip(i); }}
              style={{
                flex: gallery.length <= 3 ? 1 : 'none',
                width: gallery.length > 3 ? 100 : undefined,
                padding: '10px 8px', background: 'none', border: 'none',
                borderBottom: activeShip === i ? '2px solid var(--gold)' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                flexShrink: 0,
              }}>
              <div style={{
                width: '100%', height: 40,
                backgroundImage: `url(${ship.url})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                opacity: activeShip === i ? 1 : 0.38,
                transition: 'opacity 0.2s',
                border: activeShip === i ? '1px solid rgba(201,168,76,0.5)' : '1px solid transparent',
              }} />
              <span style={{
                fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                fontFamily: 'var(--font-body)', whiteSpace: 'nowrap',
                color: activeShip === i ? 'var(--gold)' : 'rgba(255,255,255,0.3)',
                transition: 'color 0.2s',
              }}>{ship.ship}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Brand Card ───────────────────────────────────────────────────────────────

function BrandCard({ brand }: { brand: typeof BRANDS[0] }) {
  const [popup, setPopup] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hasIframe = !!(brand.iframeUrl || brand.iframeUrl2);

  const quoteParams = new URLSearchParams({
    trip_type: 'Cruise Vacation',
    line: brand.name.replace('\n', ' '),
    cruise_id: brand.slug,
    destination: brand.category,
  });

  return (
    <>
      <div
        id={brand.id}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--navy)',
          border: `1px solid ${hovered ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.07)'}`,
          transition: 'all 0.35s ease',
          transform: hovered ? 'translateY(-4px)' : 'none',
          boxShadow: hovered ? '0 20px 60px rgba(0,0,0,0.4)' : 'none',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Cover image — gallery for Ritz-Carlton, single for others */}
        {(brand as any).gallery ? (
          <RitzGallery brand={brand as any} hovered={hovered} />
        ) : (
        <div style={{ height: 280, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${brand.cover})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            transition: 'transform 0.6s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(5,10,20,0.1) 0%, rgba(5,10,20,0.7) 100%)',
          }} />
          <div style={{
            position: 'absolute', top: 20, left: 20,
            padding: '5px 14px',
            background: 'rgba(201,168,76,0.15)',
            border: '1px solid rgba(201,168,76,0.4)',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              {brand.category}
            </span>
          </div>
          {brand.logo && (
            <div style={{
              position: 'absolute', bottom: 20, left: 20,
              height: 44, background: 'rgba(255,255,255,0.9)',
              padding: '6px 10px', display: 'flex', alignItems: 'center',
            }}>
              <img src={brand.logo} alt={brand.name.replace('\n', ' ')} style={{ height: '100%', maxWidth: 120, objectFit: 'contain' }} />
            </div>
          )}
          <div style={{
            position: 'absolute', bottom: 20, right: 20,
            background: 'rgba(5,10,20,0.7)', padding: '6px 14px',
            backdropFilter: 'blur(6px)',
          }}>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', fontFamily: 'var(--font-body)' }}>
              {brand.ships} Ships · {brand.guestCapacity} Guests
            </span>
          </div>
        </div>
        )}

        {/* Content */}
        <div style={{ padding: '32px 32px 28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Name */}
          <h2 className="font-display" style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
            fontWeight: 300, color: 'white', lineHeight: 1.2,
            marginBottom: 6, whiteSpace: 'pre-line',
          }}>
            {brand.name}
          </h2>
          {/* Tagline */}
          <p style={{
            fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--gold)', fontFamily: 'var(--font-body)',
            marginBottom: 20,
          }}>
            {brand.tagline}
          </p>

          {/* Gold rule */}
          <div style={{ width: 40, height: 1, background: 'var(--gold)', opacity: 0.5, marginBottom: 20 }} />

          {/* Description */}
          <p style={{
            fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.85, marginBottom: 24,
          }}>
            {brand.description}
          </p>

          {/* Highlights */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {brand.highlights.map((h, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{
                  flexShrink: 0, marginTop: 6,
                  width: 4, height: 4, borderRadius: '50%',
                  background: 'var(--gold)', display: 'inline-block',
                }} />
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{h}</span>
              </li>
            ))}
          </ul>

          <div style={{ flex: 1 }} />

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {hasIframe && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                <button
                  onClick={() => setPopup(true)}
                  style={{
                    width: '100%', padding: '11px 16px',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.68rem', fontWeight: 500,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontFamily: 'var(--font-body)', cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.4)';
                    (e.currentTarget).style.color = 'white';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.2)';
                    (e.currentTarget).style.color = 'rgba(255,255,255,0.6)';
                  }}
                >
                  Explore Line ↗
                </button>
                {(brand as any).imageLibrary && (
                  <a
                    href={(brand as any).imageLibrary}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      padding: '7px 16px', textAlign: 'center',
                      background: 'transparent',
                      border: '1px solid rgba(201,168,76,0.2)',
                      color: 'rgba(201,168,76,0.55)',
                      fontSize: '0.6rem', fontWeight: 500,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      fontFamily: 'var(--font-body)', textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    📷 Media Library ↗
                  </a>
                )}
              </div>
            )}
            {!hasIframe && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                <a
                  href={brand.website}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    padding: '11px 16px', textAlign: 'center',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.68rem', fontWeight: 500,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontFamily: 'var(--font-body)', textDecoration: 'none',
                    transition: 'all 0.2s', display: 'block',
                  }}
                >
                  Official Site ↗
                </a>
                {(brand as any).imageLibrary && (
                  <a
                    href={(brand as any).imageLibrary}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      padding: '7px 16px', textAlign: 'center',
                      background: 'transparent',
                      border: '1px solid rgba(201,168,76,0.2)',
                      color: 'rgba(201,168,76,0.55)',
                      fontSize: '0.6rem', fontWeight: 500,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      fontFamily: 'var(--font-body)', textDecoration: 'none',
                      display: 'block',
                    }}
                  >
                    📷 Media Library ↗
                  </a>
                )}
              </div>
            )}
            <Link
              href={`/request-quote?${quoteParams.toString()}`}
              style={{
                flex: 1, textAlign: 'center',
                padding: '11px 16px',
                background: hovered ? 'var(--gold)' : 'transparent',
                color: hovered ? 'var(--navy)' : 'var(--gold)',
                border: '1px solid var(--gold)',
                fontSize: '0.68rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none', fontFamily: 'var(--font-body)',
                transition: 'all 0.2s', whiteSpace: 'nowrap', display: 'block',
              }}
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>

      {popup && (
        <BrandSitePopup brand={brand} onClose={() => setPopup(false)} />
      )}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LuxuryCruisesPage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = [
    { id: 'all', label: 'All Four Lines' },
    { id: 'ritz-carlton', label: 'Ritz-Carlton' },
    { id: 'silversea', label: 'Silversea' },
    { id: 'explora', label: 'Explora Journeys' },
    { id: 'regent', label: 'Regent Seven Seas' },
  ];

  const displayed = activeFilter === 'all' ? BRANDS : BRANDS.filter(b => b.id === activeFilter);

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        background: '#05080f',
        paddingTop: 160, paddingBottom: 100,
        position: 'relative', overflow: 'hidden',
        minHeight: '65vh', display: 'flex', alignItems: 'center',
      }}>
        {/* Multi-layer background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://assets.widgety.co.uk/2024/06/25/15/53/27/243d22ee-734c-4b7a-88f5-11a27fc47c67/Ritz Carlton Yacht Collective Evrima - Exterior 3.PNG)',
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
          opacity: 0.18,
        }} />
        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,8,15,0.8) 100%)',
        }} />
        {/* Gold accent top line */}
        <div style={{
          position: 'absolute', top: 72, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)',
        }} />
        {/* Gold accent bottom line */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
        }} />

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%' }}>
          {/* Overline */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            marginBottom: 24,
          }}>
            <div style={{ width: 24, height: 1, background: 'var(--gold)', opacity: 0.7 }} />
            <span style={{
              fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500,
            }}>
              Crestwell Luxury Collection
            </span>
            <div style={{ width: 24, height: 1, background: 'var(--gold)', opacity: 0.7 }} />
          </div>

          <h1 className="font-display" style={{
            fontSize: 'clamp(2.8rem, 7vw, 6rem)',
            fontWeight: 200, color: 'white', lineHeight: 1.05,
            marginBottom: 24, maxWidth: 800,
            letterSpacing: '-0.02em',
          }}>
            The Art of<br />
            <em style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>Extraordinary</em><br />
            Travel
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            maxWidth: 540, lineHeight: 1.85, marginBottom: 48,
          }}>
            Four of the world's most distinguished cruise lines — chosen for their uncompromising
            commitment to craft, service, and the belief that the journey itself is the destination.
          </p>

          {/* Stat row */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            {[
              { num: '4', label: 'Prestige Lines' },
              { num: '26+', label: 'Ships in Fleet' },
              { num: '900+', label: 'Destinations' },
              { num: '7', label: 'Continents' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--gold)', fontWeight: 200, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: 6, fontFamily: 'var(--font-body)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Luxury ── */}
      <section style={{ background: 'var(--cream)', padding: '80px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
            {[
              {
                icon: '◈',
                title: 'All-Inclusive by Design',
                body: 'On these ships, nothing meaningful is extra. Airfare, excursions, premium spirits, fine dining, butler service — all woven into the fare.',
              },
              {
                icon: '◈',
                title: 'Intimacy at Sea',
                body: 'Fewer than 750 guests on most sailings. You will know your crew, your fellow travelers, and every corner of the ship within hours.',
              },
              {
                icon: '◈',
                title: 'Destination Intelligence',
                body: 'Smaller ships dock where larger vessels cannot — medieval town centers, hidden anchorages, private island beaches. The itinerary is the product.',
              },
              {
                icon: '◈',
                title: 'Service Without Precedent',
                body: 'Nearly one staff member per guest. Every preference noted. Every request anticipated. These are the ships where the word "no" is rarely spoken.',
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: i % 2 === 0 ? 'white' : 'var(--navy)',
                padding: '40px 36px',
              }}>
                <div style={{
                  fontSize: '1.2rem', color: 'var(--gold)',
                  marginBottom: 18, fontFamily: 'var(--font-display)',
                }}>{item.icon}</div>
                <h3 className="font-display" style={{
                  fontSize: '1.15rem', fontWeight: 400,
                  color: i % 2 === 0 ? 'var(--navy)' : 'white',
                  marginBottom: 12,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.85rem', lineHeight: 1.8,
                  color: i % 2 === 0 ? 'var(--slate)' : 'rgba(255,255,255,0.5)',
                }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand filter + grid ── */}
      <section style={{ background: '#05080f', padding: '72px 32px 96px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ marginBottom: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: 'var(--font-body)' }}>
                Our Luxury Portfolio
              </div>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 200, color: 'white', margin: 0 }}>
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

          {/* Brand cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: displayed.length === 1
              ? 'minmax(0, 760px)'
              : 'repeat(auto-fill, minmax(480px, 1fr))',
            gap: 28,
            justifyContent: displayed.length === 1 ? 'center' : undefined,
          }}>
            {displayed.map(brand => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Crestwell Advantage strip ── */}
      <section style={{ background: 'var(--cream)', padding: '72px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 16, justifyContent: 'center' }}>Why Book Through Crestwell</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 20 }}>
            Expert Guidance for the World's Finest Sailings
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--slate)', lineHeight: 1.85, maxWidth: 680, margin: '0 auto 40px' }}>
            Booking an ultra-luxury cruise is a significant investment — and the details matter enormously. Suite categories, dining reservations, pre-cruise hotel programs, excursion priorities, and embarkation logistics all shape the experience. Our specialists know these ships at a product level and are here to ensure every detail is right before you board.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?trip_type=Luxury+Cruise" className="btn-primary" style={{ textDecoration: 'none' }}>
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
