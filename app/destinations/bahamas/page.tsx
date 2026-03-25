'use client';
import { useState } from 'react';
import Link from 'next/link';

const ISLANDS = [
  {
    name: 'Nassau & Paradise Island',
    tagline: 'The Capital City with a Resort Next Door',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&q=85',
    description: 'Nassau is the beating heart of the Bahamas — a colorful colonial city with pastel-painted buildings, straw markets, and an extraordinary resort complex just across the bridge on Paradise Island. Atlantis Resort alone could fill three days, but Nassau\'s history, food, and harbor are equally compelling.',
    mustDo: ['Atlantis Aquaventure Waterpark', 'Blue Lagoon Island dolphin encounter', 'Fort Charlotte historic site', 'Nassau Straw Market', 'Graycliff Restaurant & Cigar Lounge', 'Junkanoo Beach'],
  },
  {
    name: 'CocoCay (Perfect Day)',
    tagline: 'Royal Caribbean\'s Private Island Paradise',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85',
    description: 'Royal Caribbean transformed this small island into one of the Caribbean\'s best beach experiences. Thrill Waterpark has the tallest waterslide in the Bahamas. Chill Island offers calm, shallow water. Up, Up & Away balloon ride gives a bird\'s-eye view. Oasis Lagoon is the largest freshwater pool in the Caribbean.',
    mustDo: ['Thrill Waterpark (tallest slide in Bahamas)', 'Up, Up & Away Helium Balloon', 'Oasis Lagoon freshwater pool', 'Snorkel Experience', 'Cabana rentals on Chill Island', 'Floating bar at Oasis Lagoon'],
  },
  {
    name: 'Exuma Cays',
    tagline: 'Swimming Pigs & Turquoise Sandbars',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=85',
    description: 'The Exumas are 365 islands and cays — one for every day of the year. The famous swimming pigs of Big Major Cay are a bucket-list encounter. Compass Cay has nurse sharks you can hand-feed. The sandbars shift with the tides, creating ever-changing beaches of impossible turquoise.',
    mustDo: ['Swimming pigs at Big Major Cay', 'Nurse shark feeding at Compass Cay', 'Thunderball Grotto snorkeling (James Bond film site)', 'Staniel Cay Yacht Club lunch', 'Iguana feeding at Allen\'s Cay', 'Sandbar picnic by boat'],
  },
  {
    name: 'Harbour Island',
    tagline: 'Pink Sand Beach & Barefoot Luxury',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=85',
    description: 'Harbour Island is one of the Caribbean\'s most exclusive and beloved retreats. The 3-mile Pink Sand Beach gets its color from crushed coral and pink foraminifera. Golf carts are the primary mode of transportation. The tiny settlement of Dunmore Town has New England-style clapboard houses and excellent restaurants.',
    mustDo: ['Pink Sand Beach stroll (sunrise is magical)', 'Golf cart tour of Dunmore Town', 'Rock House & The Landing restaurants', 'Snorkeling the protected reef', 'Ferry crossing from North Eleuthera', 'Juice Bar at Pink Sands Resort'],
  },
  {
    name: 'Freeport & Grand Bahama',
    tagline: 'Diving, Dolphins & Duty-Free Shopping',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=85',
    description: 'Grand Bahama\'s second city offers a different pace — the famous UNEXSO dive operation, wild dolphin interactions, and lush Lucayan National Park. The Grand Bahama Island\'s protected waters make for some of the best diving and snorkeling in the Bahamas, with clear visibility up to 100 feet.',
    mustDo: ['UNEXSO Dolphin Experience (swim with wild dolphins)', 'Ben\'s Cave at Lucayan National Park', 'Gold Rock Beach', 'Port Lucaya Marketplace & Marina', 'Shark and stingray dive', 'Glass-bottom boat tour'],
  },
];

const SEASONS = [
  {
    name: 'Winter',
    months: 'Dec – Feb',
    icon: '🌞',
    temp: '70–78°F',
    crowd: 'Peak',
    color: '#60a5fa',
    highlight: 'Perfect weather, peak season',
    description: 'The Bahamas\' busiest and most expensive season — and the best weather. Dry, sunny, and breezy. Escape the cold from Georgia, Tennessee, and Alabama in just 2 hours by air or overnight by cruise ship.',
    events: [
      { name: 'Junkanoo Parade', location: 'Nassau', when: 'Dec 26 & Jan 1' },
      { name: 'New Year\'s Celebrations', location: 'All islands', when: 'December 31' },
      { name: 'Miami-Nassau Race Week', location: 'Nassau Harbour', when: 'February' },
    ],
    activities: ['Beach & water sports', 'CocoCay visits', 'Whale watching (humpbacks pass through)', 'Snorkeling in clear, calm water', 'Nassau nightlife & dining'],
  },
  {
    name: 'Spring',
    months: 'Mar – May',
    icon: '🌺',
    temp: '75–82°F',
    crowd: 'High',
    color: '#4ade80',
    highlight: 'Spring break season, warm water',
    description: 'March and April bring spring break crowds and lively energy. May is a sweet spot — warm water, lower prices than peak season, and fewer crowds as families return to school. Excellent value for cruise departures.',
    events: [
      { name: 'Bahamas Carnival', location: 'Nassau', when: 'May' },
      { name: 'Spring Break Season', location: 'Nassau & Paradise Island', when: 'March–April' },
      { name: 'Discovery Day', location: 'San Salvador', when: 'October (prep starts now)' },
    ],
    activities: ['Spring break energy at Atlantis', 'Exuma day trips', 'Fishing (mahi mahi season)', 'Island hopping by ferry', 'Golf on Grand Bahama'],
  },
  {
    name: 'Summer',
    months: 'Jun – Aug',
    icon: '☀️',
    temp: '82–88°F',
    crowd: 'Medium',
    color: '#fbbf24',
    highlight: 'Warmest water, family deals',
    description: 'Hot and humid, but the water is warmest and cruise deals are often excellent. Hurricane season begins in June but the Bahamas is less affected than other Caribbean islands. Early summer (June) is especially good value.',
    events: [
      { name: 'Goombay Summer Festival', location: 'Nassau', when: 'June–August' },
      { name: 'Independence Day', location: 'Nassau', when: 'July 10' },
      { name: 'Bimini Wahoo Tournament', location: 'Bimini', when: 'June' },
    ],
    activities: ['Water sports (calmest conditions)', 'Diving (best visibility)', 'Family cruise deals', 'Swimming pig day trips', 'Tennis & resort activities'],
  },
  {
    name: 'Fall',
    months: 'Sep – Nov',
    icon: '🌊',
    temp: '78–84°F',
    crowd: 'Low',
    color: '#f97316',
    highlight: 'Best prices of the year',
    description: 'Hurricane season peaks in September–October. While weather can be unpredictable, the Bahamas often emerges unscathed. Prices hit their annual low, and the islands are at their least crowded. November is particularly pleasant.',
    events: [
      { name: 'McLean\'s Town Conch Cracking', location: 'Grand Bahama', when: 'October' },
      { name: 'Annual Cat Island Regatta', location: 'Cat Island', when: 'September' },
      { name: 'Thanksgiving in the Bahamas', location: 'All islands', when: 'November' },
    ],
    activities: ['Best pricing for cruises', 'Uncrowded beaches', 'Kiteboarding (wind picks up)', 'Fishing (kingfish, wahoo)', 'Lighthouse exploration'],
  },
];

const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=1200&q=85', caption: 'Nassau Harbour', aspect: 'wide' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85', caption: 'Bahamian Beach', aspect: 'tall' },
  { url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=85', caption: 'Exuma Cays', aspect: 'square' },
  { url: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=85', caption: 'Pink Sand Beach', aspect: 'square' },
  { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=85', caption: 'Grand Bahama Reef', aspect: 'tall' },
  { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85', caption: 'Turquoise Bahamas Waters', aspect: 'wide' },
];

export default function BahamasDestinationPage() {
  const [activeSeason, setActiveSeason] = useState(0);
  const [activeIsland, setActiveIsland] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const season = SEASONS[activeSeason];
  const island = ISLANDS[activeIsland];

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(360px, 70vh, 640px)', minHeight: 360, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=1800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center 50%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.15) 0%, rgba(13,27,42,0.75) 100%)' }} />
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: 'clamp(80px, 10vw, 92px)', left: 'clamp(16px, 5vw, 32px)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', textDecoration: 'none', letterSpacing: '0.08em' }}>Destinations</Link>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>›</span>
          <span style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>Bahamas</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 clamp(16px, 5vw, 32px) clamp(32px, 5vw, 64px)', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, alignItems: 'flex-start' }}>
            <div>
              <div className="overline" style={{ color: 'var(--gold)', marginBottom: 16 }}>Destination Guide</div>
              <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, color: 'white', lineHeight: 1, marginBottom: 16, letterSpacing: '-0.02em' }}>The Bahamas</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
                700 islands. One ocean. Endless shades of blue. Just two hours from Florida — and a world apart. The Bahamas is the Caribbean's most accessible paradise, combining world-class resorts with wild, untouched cays.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/request-quote?destination=Bahamas&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none' }}>Plan My Bahamas Trip</Link>
                <Link href="/cruises?destination=Bahamas" style={{ padding: '12px 24px', border: '1px solid rgba(255,255,255,0.3)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>View Cruises</Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }}>
              {[{ label: 'Best Season', value: 'Dec – April' }, { label: 'Cruise Length', value: '3–7 nights' }, { label: 'From Southeast US', value: '2 hour flight' }, { label: 'Water Temp', value: '77–84°F year-round' }].map((f, i) => (
                <div key={i} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: 12 }}>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: '0.82rem', color: 'white' }}>{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section style={{ background: 'white', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'center' }}>
          <div>
            <div className="overline" style={{ marginBottom: 16 }}>Why the Bahamas</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2, marginBottom: 24 }}>The Perfect Short Cruise from the Southeast</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 20 }}>
              For travelers in Georgia, Tennessee, and Alabama, the Bahamas is the sweet spot — far enough to feel like a real escape, close enough to reach in a weekend. A 3-night cruise from Miami or Port Canaveral puts you in Nassau by morning and on CocoCay's pink sand by afternoon.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 32 }}>
              Beyond the resort beaches, the Out Islands reveal a different Bahamas — quiet, wild, and spectacularly beautiful. The Exumas, Eleuthera, and Abaco are among the most beautiful island landscapes in the Atlantic.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 16 }}>
              {[{ num: '700+', label: 'Islands & Cays' }, { num: '2,500', label: 'Square Miles of Turquoise Water' }, { num: '3hrs', label: 'From Miami by Ship' }, { num: '#1', label: 'Most Visited Caribbean Nation' }].map((s, i) => (
                <div key={i} style={{ padding: '20px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
                  <div className="font-display" style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--slate)', letterSpacing: '0.06em', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', height: 500 }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '80%', height: '65%', backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '65%', height: '50%', backgroundImage: 'url(https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', border: '6px solid white' }} />
            <div style={{ position: 'absolute', bottom: 60, right: -10, background: 'var(--navy)', padding: '12px 18px', zIndex: 2 }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Only 2 Hours Away</div>
              <div style={{ fontSize: '0.82rem', color: 'white', marginTop: 2 }}>From Atlanta, Nashville & Birmingham</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ background: 'var(--navy)', padding: '64px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 5vw, 32px)', marginBottom: 36 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Gallery</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'white' }}>The Bahamas in Every Shade of Blue</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))', gap: 4, padding: '0 4px' }}>
          {GALLERY.map((img, i) => (
            <div key={i} onClick={() => setGalleryOpen(i)} style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative', gridColumn: img.aspect === 'wide' ? 'span 2' : 'span 1', height: img.aspect === 'tall' ? 400 : 280 }}>
              <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(13,27,42,0.7))', padding: '24px 16px 12px' }}>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em' }}>{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
        {galleryOpen !== null && (
          <div onClick={() => setGalleryOpen(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, cursor: 'pointer' }}>
            <img src={GALLERY[galleryOpen].url.replace('w=800', 'w=1400').replace('w=1200', 'w=1800')} alt={GALLERY[galleryOpen].caption} style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} />
            <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{GALLERY[galleryOpen].caption} · Click to close</div>
          </div>
        )}
      </section>

      {/* Island Guide */}
      <section style={{ background: 'white', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Island by Island</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>Top Bahamas Destinations</h2>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, overflowX: 'auto', paddingBottom: 4 }}>
            {ISLANDS.map((p, i) => (
              <button key={i} onClick={() => setActiveIsland(i)} style={{ padding: '10px 16px', border: '1px solid', whiteSpace: 'nowrap', borderColor: activeIsland === i ? 'var(--navy)' : 'rgba(13,27,42,0.15)', background: activeIsland === i ? 'var(--navy)' : 'white', color: activeIsland === i ? 'white' : 'var(--slate)', fontSize: '0.75rem', letterSpacing: '0.06em', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s' }}>{p.name.split('&')[0].split('(')[0].trim()}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'start' }}>
            <div style={{ position: 'relative', height: 440, overflow: 'hidden' }}>
              <img src={island.image} alt={island.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(13,27,42,0.8))', padding: '32px 24px 20px' }}>
                <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'white', marginBottom: 4 }}>{island.name}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--gold)', letterSpacing: '0.06em' }}>{island.tagline}</p>
              </div>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.92rem', marginBottom: 28 }}>{island.description}</p>
              <div className="overline" style={{ marginBottom: 14, fontSize: '0.6rem' }}>Must-Do</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
                {island.mustDo.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600 }}>0{i + 1}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--navy)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link href={`/request-quote?destination=Bahamas+${island.name.split('&')[0].trim()}&trip_type=Cruise+Vacation`} className="btn-navy" style={{ textDecoration: 'none', display: 'inline-block' }}>Plan This Island Visit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Guide */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>When to Go</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>Bahamas by Season</h2>
          </div>
          <div style={{ display: 'flex', gap: 0, marginBottom: 40, borderBottom: '1px solid rgba(13,27,42,0.1)', overflowX: 'auto' }}>
            {SEASONS.map((s, i) => (
              <button key={i} onClick={() => setActiveSeason(i)} style={{ flex: 1, minWidth: 100, padding: '16px 20px', background: 'none', border: 'none', borderBottom: activeSeason === i ? `3px solid ${s.color}` : '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: activeSeason === i ? 600 : 400, color: activeSeason === i ? 'var(--navy)' : 'var(--slate)', letterSpacing: '0.06em', fontFamily: 'var(--font-body)' }}>{s.name}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--slate)' }}>{s.months}</div>
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 4vw, 48px)' }}>
            <div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: '2.5rem' }}>{season.icon}</div>
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 4 }}>{season.name}</h3>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span style={{ fontSize: '0.7rem', padding: '3px 10px', background: 'white', color: 'var(--slate)', border: '1px solid rgba(13,27,42,0.1)' }}>🌡 {season.temp}</span>
                    <span style={{ fontSize: '0.7rem', padding: '3px 10px', background: 'white', color: 'var(--slate)', border: '1px solid rgba(13,27,42,0.1)' }}>👥 {season.crowd}</span>
                  </div>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.9rem', marginBottom: 24 }}>{season.description}</p>
              <div className="overline" style={{ marginBottom: 12, fontSize: '0.6rem' }}>Top Activities</div>
              {season.activities.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 14px', background: 'white', borderLeft: `3px solid ${season.color}`, marginBottom: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: season.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--navy)' }}>{a}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="overline" style={{ marginBottom: 20, fontSize: '0.6rem' }}>Events & Festivals</div>
              {season.events.map((ev, i) => (
                <div key={i} style={{ background: 'white', padding: '18px 20px', borderTop: `3px solid ${season.color}`, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>{ev.name}</span>
                    <span style={{ fontSize: '0.68rem', background: season.color + '33', color: 'var(--navy)', padding: '3px 8px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{ev.when}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate)' }}>📍 {ev.location}</div>
                </div>
              ))}
              <div style={{ background: 'var(--navy)', padding: '20px', marginTop: 8 }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Crestwell Recommends</div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>December through April is prime Bahamas season. Book at least 3–4 months ahead for the best cabin selection on popular 3–4 night sailings.</p>
                <Link href="/request-quote?destination=Bahamas&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '0.75rem', padding: '10px 20px' }}>Plan {season.name} Bahamas Trip</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(48px, 7vw, 80px) clamp(16px, 5vw, 32px)', background: 'var(--navy)', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Ready for the Bahamas?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>Your Paradise is Just a Cruise Away</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 36 }}>The Bahamas is the perfect first cruise or weekend escape. No booking fees. Expert guidance. Best available prices.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?destination=Bahamas&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none' }}>Request a Free Quote</Link>
            <Link href="/destinations" style={{ padding: '12px 28px', border: '1px solid rgba(255,255,255,0.25)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>All Destinations</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section div[style*="grid-template-columns: '1fr 1fr'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
