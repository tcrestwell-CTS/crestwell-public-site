'use client';
import { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from "@/components/Breadcrumb";

const ISLANDS = [
  {
    name: 'Nassau & Paradise Island',
    tagline: 'The Capital City with a Resort Next Door',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&q=85',
    description: "Nassau is the beating heart of the Bahamas — a colorful colonial city with pastel-painted buildings, straw markets, and an extraordinary resort complex just across the bridge on Paradise Island. Atlantis Resort alone could fill three days, but Nassau's history, food, and harbor are equally compelling.",
    mustDo: ['Atlantis Aquaventure Waterpark', 'Blue Lagoon Island dolphin encounter', 'Fort Charlotte historic site', 'Nassau Straw Market', 'Graycliff Restaurant', 'Junkanoo Beach'],
  },
  {
    name: 'CocoCay (Perfect Day)',
    tagline: "Royal Caribbean's Private Island Paradise",
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85',
    description: "Royal Caribbean transformed this small island into one of the Caribbean's best beach experiences. Thrill Waterpark has the tallest waterslide in the Bahamas. Chill Island offers calm, shallow water perfect for families.",
    mustDo: ['Thrill Waterpark', 'Up, Up & Away Helium Balloon', 'Oasis Lagoon freshwater pool', 'Snorkel Experience', 'Cabana rentals on Chill Island', 'Floating bar'],
  },
  {
    name: 'Exuma Cays',
    tagline: 'Swimming Pigs & Turquoise Sandbars',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=85',
    description: 'The Exumas are 365 islands and cays — one for every day of the year. The famous swimming pigs of Big Major Cay are a bucket-list encounter. Compass Cay has nurse sharks you can hand-feed.',
    mustDo: ['Swimming pigs at Big Major Cay', 'Nurse shark feeding at Compass Cay', 'Thunderball Grotto snorkeling', 'Staniel Cay Yacht Club lunch', 'Iguana feeding at Allens Cay', 'Sandbar picnic by boat'],
  },
  {
    name: 'Harbour Island',
    tagline: 'Pink Sand Beach & Barefoot Luxury',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=85',
    description: "Harbour Island is one of the Caribbean's most exclusive retreats. The 3-mile Pink Sand Beach gets its color from crushed coral. Golf carts are the primary mode of transportation in the tiny settlement of Dunmore Town.",
    mustDo: ['Pink Sand Beach stroll at sunrise', 'Golf cart tour of Dunmore Town', 'Rock House dining', 'Sip Sip lunch', 'Snorkel the reef', 'Sugar Mill ruins'],
  },
  {
    name: 'Freeport & Grand Bahama',
    tagline: 'Diving, Dolphins & Duty-Free Shopping',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=85',
    description: "Grand Bahama offers a different pace — the famous UNEXSO dive operation, wild dolphin interactions, and lush Lucayan National Park. Protected waters make for some of the best diving in the Bahamas.",
    mustDo: ['UNEXSO Dolphin Experience', 'Lucayan National Park caves', 'Gold Rock Beach', 'Port Lucaya Marketplace', 'Shark and stingray dive', 'Glass-bottom boat tour'],
  },
];

const SEASONS = [
  {
    name: 'Winter',
    months: 'Dec \u2013 Feb',
    icon: '\ud83c\udf1e',
    temp: '70\u201378\u00b0F',
    crowd: 'Peak',
    color: '#60a5fa',
    highlight: 'Perfect weather, peak season',
    description: "The Bahamas' busiest and most expensive season — and the best weather. Dry, sunny, and breezy. Escape the cold from Georgia, Tennessee, and Alabama in just 2 hours by air or overnight by cruise ship.",
    activities: ['Beach & water sports', 'CocoCay visits', 'Whale watching', 'Snorkeling in clear calm water', 'Nassau nightlife & dining'],
  },
  {
    name: 'Spring',
    months: 'Mar \u2013 May',
    icon: '\ud83c\udf3a',
    temp: '75\u201382\u00b0F',
    crowd: 'High',
    color: '#4ade80',
    highlight: 'Spring break season, warm water',
    description: 'March and April bring spring break crowds and lively energy. May is a sweet spot — warm water, lower prices than peak season, and fewer crowds as families return to school.',
    activities: ['Spring break energy at Atlantis', 'Exuma day trips', 'Fishing (mahi mahi season)', 'Island hopping by ferry', 'Golf on Grand Bahama'],
  },
  {
    name: 'Summer',
    months: 'Jun \u2013 Aug',
    icon: '\u2600\ufe0f',
    temp: '82\u201388\u00b0F',
    crowd: 'Medium',
    color: '#fbbf24',
    highlight: 'Warmest water, family deals',
    description: 'Hot and humid, but the water is warmest and cruise deals are often excellent. Hurricane season begins in June but the Bahamas is less affected than other Caribbean islands.',
    activities: ['Water sports', 'Diving (best visibility)', 'Family cruise deals', 'Swimming pig day trips', 'Tennis & resort activities'],
  },
  {
    name: 'Fall',
    months: 'Sep \u2013 Nov',
    icon: '\ud83c\udf0a',
    temp: '78\u201384\u00b0F',
    crowd: 'Low',
    color: '#f97316',
    highlight: 'Best prices of the year',
    description: 'Hurricane season peaks in September\u2013October. Prices hit their annual low and the islands are at their least crowded. November is particularly pleasant.',
    activities: ['Best pricing for cruises', 'Uncrowded beaches', 'Kiteboarding', 'Fishing (kingfish wahoo)', 'Lighthouse exploration'],
  },
];

const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=1200&q=85', caption: 'Nassau Harbour' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85', caption: 'Bahamian Beach' },
  { url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=85', caption: 'Exuma Cays' },
  { url: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=85', caption: 'Pink Sand Beach' },
  { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=85', caption: 'Grand Bahama Reef' },
  { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85', caption: 'Turquoise Waters' },
];

export default function BahamasDestinationPage() {
  const [activeSeason, setActiveSeason] = useState(0);
  const [activeIsland, setActiveIsland] = useState(0);
  const season = SEASONS[activeSeason];
  const island = ISLANDS[activeIsland];

  return (
    <>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Destinations', href: '/destinations' }, { name: 'Bahamas' }]} />

      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(360px, 70vh, 640px)', minHeight: 360, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center 50%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.15) 0%, rgba(13,27,42,0.75) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 clamp(16px,5vw,32px) clamp(32px,5vw,64px)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr minmax(280px,320px)', gap: 32, alignItems: 'flex-end' }}>
            <div>
              <div className="overline" style={{ color: 'var(--gold)', marginBottom: 16 }}>Destination Guide</div>
              <h1 className="font-display" style={{ fontSize: 'clamp(3rem,7vw,6rem)', fontWeight: 300, color: 'white', lineHeight: 1, marginBottom: 16, letterSpacing: '-0.02em' }}>The Bahamas</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
                700 islands. One ocean. Endless shades of blue. Just two hours from Florida and a world apart.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/request-quote?destination=Bahamas&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none' }}>Plan My Bahamas Trip</Link>
                <Link href="/cruises?destination=Bahamas" style={{ padding: '12px 24px', border: '1px solid rgba(255,255,255,0.3)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>View Cruises</Link>
                <Link href="/destination-packages?region=Latin%20America" style={{ padding: '12px 24px', border: '1px solid var(--gold)', color: 'var(--gold)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Land Packages</Link>
              </div>
            </div>

            {/* GYG Excursions Panel */}
            <a href="https://www.getyourguide.com/nassau-l326/?partner_id=IOXL78H&cmp=share_to_earn" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginBottom: 8, display: 'block' }}>
              <div style={{ background: 'rgba(13,27,42,0.88)', backdropFilter: 'blur(14px)', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 8, padding: '22px 24px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#FF5533', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 2 }}>GetYourGuide</div>
                    <div style={{ fontSize: '0.92rem', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 500 }}>Bahamas Tours &amp; Excursions</div>
                  </div>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', lineHeight: 1.6, margin: '0 0 14px' }}>
                  Swimming pigs, snorkeling, island tours &amp; more — book directly through Crestwell.
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                  {['Swimming Pigs', 'Snorkeling', 'Atlantis', 'Island Tours'].map(tag => (
                    <span key={tag} style={{ fontSize: '0.65rem', padding: '3px 8px', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', borderRadius: 4, fontFamily: 'var(--font-body)' }}>{tag}</span>
                  ))}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'white', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>Browse Experiences &rarr;</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Island by Island */}
      <section style={{ background: 'white', padding: 'clamp(48px,6vw,80px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Island by Island</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 300, color: 'var(--navy)' }}>Top Bahamas Destinations</h2>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 32 }}>
            {ISLANDS.map((isl, i) => (
              <button key={i} onClick={() => setActiveIsland(i)} style={{ padding: '10px 20px', border: '1px solid', borderColor: activeIsland === i ? 'var(--navy)' : 'rgba(13,27,42,0.15)', background: activeIsland === i ? 'var(--navy)' : 'white', color: activeIsland === i ? 'white' : 'var(--slate)', fontSize: '0.8rem', fontFamily: 'var(--font-body)', cursor: 'pointer', borderRadius: 4 }}>{isl.name.split(' ')[0]}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap: 32, alignItems: 'start' }}>
            <div style={{ borderRadius: 8, overflow: 'hidden' }}>
              <img src={island.image} alt={island.name} style={{ width: '100%', height: 300, objectFit: 'cover' }} />
            </div>
            <div>
              <div className="overline" style={{ marginBottom: 12 }}>{island.tagline}</div>
              <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 16 }}>{island.name}</h3>
              <p style={{ color: 'var(--slate)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: 24 }}>{island.description}</p>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', fontWeight: 600, marginBottom: 12, fontFamily: 'var(--font-body)' }}>Must Do</div>
                {island.mustDo.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                    <span style={{ color: 'var(--gold)', fontWeight: 700, marginTop: 1 }}>0{i + 1}</span>
                    <span style={{ color: 'var(--slate)', fontSize: '0.88rem', fontFamily: 'var(--font-body)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link href={"/request-quote?destination=Bahamas+" + encodeURIComponent(island.name.split(' ')[0]) + "&trip_type=Cruise+Vacation"} className="btn-navy" style={{ textDecoration: 'none', display: 'inline-block' }}>Plan This Island Visit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seasons */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(48px,6vw,80px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="overline" style={{ color: 'var(--gold)', marginBottom: 12 }}>When to Go</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 300, color: 'white' }}>Bahamas by Season</h2>
          </div>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 32 }}>
            {SEASONS.map((s, i) => (
              <button key={i} onClick={() => setActiveSeason(i)} style={{ flex: 1, padding: '16px 8px', background: 'none', border: 'none', borderBottom: activeSeason === i ? '3px solid var(--gold)' : '3px solid transparent', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: activeSeason === i ? 600 : 400, color: activeSeason === i ? 'var(--gold)' : 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>{s.name}</div>
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 32 }}>
            <div>
              <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
                {[{ label: 'Temp', value: season.temp }, { label: 'Crowds', value: season.crowd }, { label: 'Months', value: season.months }].map(f => (
                  <div key={f.label} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: 12 }}>
                    <div style={{ fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{f.label}</div>
                    <div style={{ fontSize: '0.85rem', color: 'white', fontFamily: 'var(--font-body)' }}>{f.value}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontSize: '0.92rem', fontFamily: 'var(--font-body)', marginBottom: 20 }}>{season.description}</p>
              <Link href="/request-quote?destination=Bahamas&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '0.75rem', padding: '10px 20px' }}>Plan {season.name} Bahamas Trip</Link>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 12, fontFamily: 'var(--font-body)' }}>Top Activities</div>
              {season.activities.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', fontFamily: 'var(--font-body)' }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ background: '#f8f6f0', padding: 'clamp(48px,6vw,80px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Gallery</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 300, color: 'var(--navy)' }}>The Bahamas in Every Shade of Blue</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {GALLERY.map((g, i) => (
              <div key={i} style={{ borderRadius: 6, overflow: 'hidden', aspectRatio: '4/3' }}>
                <img src={g.url} alt={g.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(48px,6vw,72px) clamp(16px,5vw,32px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="overline" style={{ color: 'var(--gold)', marginBottom: 16 }}>Ready for the Bahamas?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>Your Paradise is Just a Cruise Away</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: 28 }}>The Bahamas is the perfect first cruise or weekend escape. No booking fees. Expert guidance. Best available prices.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?destination=Bahamas&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none' }}>Request a Free Quote</Link>
            <Link href="/destinations" style={{ padding: '12px 28px', border: '1px solid rgba(255,255,255,0.25)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>All Destinations</Link>
          </div>
        </div>
      </section>
    </>
  );
}
