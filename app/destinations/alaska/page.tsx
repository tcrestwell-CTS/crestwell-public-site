'use client';
import { useState } from 'react';
import Link from 'next/link';

// ─── Data ─────────────────────────────────────────────────────────────────────

const PORTS = [
  {
    name: 'Juneau',
    tagline: 'The Capital at the Edge of the World',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: 'Alaska\'s capital city is only reachable by sea or air — no roads connect it to the rest of the state. That remoteness makes it feel like a place apart. Walk to the Mendenhall Glacier, watch humpback whales breach in Stephens Passage, or take the Mount Roberts Tramway for panoramic views over the Gastineau Channel.',
    mustDo: ['Mendenhall Glacier Trail', 'Whale watching in Stephens Passage', 'Mount Roberts Tramway', 'Red Dog Saloon', 'Tracy Arm Fjord excursion'],
  },
  {
    name: 'Skagway',
    tagline: 'Gold Rush Gateway & Mountain Drama',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    description: 'Step back into 1898 in this perfectly preserved Gold Rush boomtown. The entire historic district is a national park. Ride the legendary White Pass & Yukon Route Railway through dramatic mountain passes, hike the Chilkoot Trail, or take a helicopter to a glacier for dog sledding on the ice.',
    mustDo: ['White Pass & Yukon Route Railway', 'Chilkoot Trail hike', 'Glacier dog sledding by helicopter', 'Klondike Gold Rush National Historical Park', 'Jewell Gardens'],
  },
  {
    name: 'Ketchikan',
    tagline: 'Salmon Capital of the World & Totem Poles',
    image: 'https://images.unsplash.com/photo-1587162146766-e06b1189b907?w=800&q=80',
    description: 'The first port of call for most Alaska cruises, Ketchikan is famous for its totem poles, rain forest, and salmon runs. Creek Street\'s historic boardwalk hangs over Ketchikan Creek where you can watch salmon leap upstream. Misty Fjords National Monument nearby is one of the most dramatic wilderness areas in North America.',
    mustDo: ['Totem Heritage Center', 'Creek Street boardwalk', 'Misty Fjords floatplane tour', 'Saxman Native Village', 'Rainforest hike at Tongass'],
  },
  {
    name: 'Glacier Bay',
    tagline: 'Where the Ice Meets the Sea',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80',
    description: 'Glacier Bay National Park is a UNESCO World Heritage Site and one of the most awe-inspiring places on earth. Just 250 years ago this entire bay was buried under ice. Today, 16 tidewater glaciers calve directly into the sea — the cracking thunder of ice breaking away echoes across the water as massive blue icebergs float past your ship.',
    mustDo: ['Margerie Glacier viewing deck', 'Kayaking among icebergs', 'Ranger-led naturalist programs onboard', 'Grand Pacific Glacier approach', 'Humpback and orca whale sightings'],
  },
  {
    name: 'Sitka',
    tagline: 'Russian Heritage & Sea Otters',
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=80',
    description: 'Once the capital of Russian America, Sitka has a unique blend of Tlingit culture and Russian history unlike anywhere else in Alaska. The onion-domed St. Michael\'s Cathedral sits in the town square. Just offshore, hundreds of sea otters float on their backs among kelp beds, while bald eagles nest in the spruce trees above.',
    mustDo: ['St. Michael\'s Cathedral', 'Sitka National Historical Park & totem trail', 'Sea otter & whale watching', 'Raptor Center (injured bald eagles)', 'Fortress of the Bears'],
  },
];

const SEASONS = [
  {
    name: 'Spring',
    months: 'April – May',
    icon: '🌿',
    temp: '40–55°F',
    crowd: 'Low',
    highlight: 'Wildflowers & migrating birds',
    color: '#4ade80',
    description: 'The shoulder season is Alaska\'s best-kept secret. Wildflowers carpet the hillsides, the crowds haven\'t arrived, and prices are lower. Migrating shorebirds stop in massive numbers. Brown bears emerge from hibernation with cubs.',
    events: [
      { name: 'Copper River Delta Shorebird Festival', location: 'Cordova', when: 'Early May' },
      { name: 'Brown Bears Emerging', location: 'Katmai & Pack Creek', when: 'April–May' },
      { name: 'Wildflower Season Begins', location: 'Statewide', when: 'May' },
      { name: 'Alaska Folk Festival', location: 'Juneau', when: 'Mid-April' },
    ],
    activities: ['Bear viewing at Pack Creek', 'Birding at Copper River Delta', 'Uncrowded glacier hiking', 'Fishing season opens'],
  },
  {
    name: 'Summer',
    months: 'June – August',
    icon: '☀️',
    temp: '55–70°F',
    crowd: 'Peak',
    highlight: 'Midnight sun & peak wildlife',
    color: '#fbbf24',
    description: 'Peak Alaska cruise season — and for good reason. Up to 20 hours of daylight, whales everywhere, salmon running in every river, and glaciers calving in Glacier Bay. The weather is as good as it gets. Book early — ships fill up fast.',
    events: [
      { name: 'Midnight Sun Festival', location: 'Fairbanks', when: 'June 21' },
      { name: 'Mount Marathon Race', location: 'Seward', when: 'July 4' },
      { name: 'Alaska State Fair', location: 'Palmer', when: 'Late August' },
      { name: 'Salmon runs peak', location: 'Statewide rivers', when: 'July–August' },
      { name: 'Southeast Alaska State Fair', location: 'Haines', when: 'August' },
    ],
    activities: ['Whale watching (humpback, orca)', 'Bear viewing at Brooks Falls', 'Salmon fishing', 'Glacier Bay cruising', 'Dog sledding on glaciers', 'Sea kayaking', 'Flightseeing over Denali'],
  },
  {
    name: 'Fall',
    months: 'September – October',
    icon: '🍂',
    temp: '35–50°F',
    crowd: 'Low–Medium',
    highlight: 'Northern lights begin & brown bears',
    color: '#f97316',
    description: 'September is one of Alaska\'s most dramatic months. The tundra turns gold and crimson, brown bears are actively feeding for winter at rivers still full of salmon, and the northern lights begin to appear on clear nights. Fewer crowds, lower prices, and the wildlife activity is extraordinary.',
    events: [
      { name: 'Kodiak Crab Festival', location: 'Kodiak', when: 'Late September' },
      { name: 'Northern Lights Season Begins', location: 'Interior & Southeast', when: 'September' },
      { name: 'Bears Feeding for Winter', location: 'Katmai National Park', when: 'September–October' },
      { name: 'Fall Foliage Peak', location: 'Denali & Interior', when: 'Mid-September' },
    ],
    activities: ['Northern lights viewing', 'Bear viewing (last chance before hibernation)', 'Fall foliage photography', 'Moose rut viewing', 'Salmon fishing (late run)'],
  },
  {
    name: 'Winter',
    months: 'November – March',
    icon: '❄️',
    temp: '15–35°F',
    crowd: 'Minimal',
    highlight: 'Aurora borealis & dogsled racing',
    color: '#93c5fd',
    description: 'Winter in Alaska is for the adventurous. Iditarod dog sled race, world-class aurora borealis viewing, ice fishing on frozen lakes, and backcountry skiing. The northern lights are most active near the equinoxes — late February and March offer spectacular displays combined with reasonable temperatures.',
    events: [
      { name: 'Iditarod Trail Sled Dog Race', location: 'Anchorage to Nome', when: 'Early March' },
      { name: 'Fur Rendezvous Festival', location: 'Anchorage', when: 'February' },
      { name: 'Northern Lights Peak Season', location: 'Fairbanks & Juneau', when: 'Feb–March' },
      { name: 'Yukon Quest Sled Dog Race', location: 'Fairbanks', when: 'February' },
      { name: 'Ice Art Championships', location: 'Fairbanks', when: 'March' },
    ],
    activities: ['Aurora borealis photography', 'Iditarod spectating', 'Dogsledding tours', 'Ice fishing', 'Cross-country skiing', 'Hot springs soaking'],
  },
];

const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=85', caption: 'Glacier Bay National Park', aspect: 'wide' },
  { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=85', caption: 'White Pass Railway, Skagway', aspect: 'tall' },
  { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85', caption: 'Mendenhall Glacier, Juneau', aspect: 'square' },
  { url: 'https://images.unsplash.com/photo-1587162146766-e06b1189b907?w=800&q=85', caption: 'Ketchikan Waterfront', aspect: 'square' },
  { url: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=85', caption: 'Sitka Sound Sea Life', aspect: 'tall' },
  { url: 'https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1200&q=85', caption: 'Northern Lights over Alaska', aspect: 'wide' },
];

const WILDLIFE = [
  { name: 'Humpback Whale', icon: '🐋', season: 'May–Oct', where: 'Frederick Sound, Stephens Passage' },
  { name: 'Brown Bear', icon: '🐻', season: 'Apr–Oct', where: 'Katmai, Pack Creek, Brooks Falls' },
  { name: 'Bald Eagle', icon: '🦅', season: 'Year-round', where: 'Sitka, Haines, Ketchikan' },
  { name: 'Orca', icon: '🐳', season: 'May–Sep', where: 'Inside Passage, Frederick Sound' },
  { name: 'Sea Otter', icon: '🦦', season: 'Year-round', where: 'Sitka, Kodiak, Prince William Sound' },
  { name: 'Moose', icon: '🫎', season: 'Year-round', where: 'Anchorage area, Denali, Interior' },
  { name: 'Mountain Goat', icon: '🐐', season: 'Jun–Sep', where: 'Glacier Bay cliffs, White Pass' },
  { name: 'Dall Sheep', icon: '🐏', season: 'Year-round', where: 'Denali, Wrangell-St. Elias' },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function AlaskaDestinationPage() {
  const [activeSeason, setActiveSeason] = useState(1); // Default to Summer
  const [activePort, setActivePort] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);

  const season = SEASONS[activeSeason];
  const port = PORTS[activePort];

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '90vh', minHeight: 560, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1800&q=85)',
          backgroundSize: 'cover', backgroundPosition: 'center 40%',
        }} />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.1) 40%, rgba(13,27,42,0.85) 100%)' }} />
        {/* Top gold line */}
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.5 }} />

        {/* Breadcrumb */}
        <div style={{ position: 'absolute', top: 92, left: 32, display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', textDecoration: 'none', letterSpacing: '0.08em' }}>Destinations</Link>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>›</span>
          <span style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>Alaska</span>
        </div>

        {/* Hero content */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 32px 64px', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'flex-end' }}>
            <div>
              <div className="overline" style={{ color: 'var(--gold)', marginBottom: 16 }}>Destination Guide</div>
              <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, color: 'white', lineHeight: 1, marginBottom: 16, letterSpacing: '-0.02em' }}>
                Alaska
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
                Glaciers calving into steel-blue waters. Brown bears fishing wild rivers. Humpback whales breaching at dawn. The last great wilderness — and one of the world's most spectacular cruise destinations.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/request-quote?destination=Alaska&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none' }}>
                  Plan My Alaska Trip
                </Link>
                <Link href="/cruises?destination=Alaska" style={{
                  padding: '12px 24px', border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white', textDecoration: 'none', fontSize: '0.75rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)',
                  transition: 'all 0.2s',
                }}>
                  View Alaska Cruises
                </Link>
              </div>
            </div>
            {/* Quick facts */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }}>
              {[
                { label: 'Best Season', value: 'May – September' },
                { label: 'Cruise Length', value: '7–14 nights' },
                { label: 'From Southeast US', value: '6–8 hour flight' },
                { label: 'Climate', value: '45–65°F in summer' },
              ].map((f, i) => (
                <div key={i} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: 12 }}>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: '0.82rem', color: 'white' }}>{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ background: 'white', padding: '72px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="overline" style={{ marginBottom: 16 }}>Why Alaska</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2, marginBottom: 24 }}>
              The Last Frontier, Experienced from the Sea
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 20 }}>
              Alaska is one of the few places on earth where the scenery actively competes with the wildlife for your attention. On any given afternoon you might watch a glacier calve an iceberg the size of a building, then spot a pod of orcas cutting through the water alongside your ship, then see a brown bear on the shore as you sail into port.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 32 }}>
              The Inside Passage — the protected waterway running from Washington State through British Columbia and into Southeast Alaska — is one of the most scenic ocean routes in the world. Cruise ships glide between densely forested islands, past waterfalls tumbling directly into the sea, with the snow-capped Coast Mountains as a constant backdrop.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { num: '16', label: 'Tidewater Glaciers in Glacier Bay' },
                { num: '3M+', label: 'Acres of Tongass National Forest' },
                { num: '400+', label: 'Species of Wildlife' },
                { num: '20hrs', label: 'Daylight in Peak Summer' },
              ].map((s, i) => (
                <div key={i} style={{ padding: '20px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
                  <div className="font-display" style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--slate)', letterSpacing: '0.06em', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Stacked images */}
          <div style={{ position: 'relative', height: 500 }}>
            <div style={{
              position: 'absolute', top: 0, right: 0, width: '80%', height: '65%',
              backgroundImage: 'url(https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=85)',
              backgroundSize: 'cover', backgroundPosition: 'center',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, width: '65%', height: '50%',
              backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85)',
              backgroundSize: 'cover', backgroundPosition: 'center',
              border: '6px solid white',
            }} />
            <div style={{ position: 'absolute', bottom: 60, right: -10, background: 'var(--navy)', padding: '12px 18px', zIndex: 2 }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>UNESCO World Heritage</div>
              <div style={{ fontSize: '0.82rem', color: 'white', marginTop: 2 }}>Glacier Bay National Park</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section style={{ background: 'var(--navy)', padding: '64px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', marginBottom: 36 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Gallery</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'white' }}>Alaska Through the Lens</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 4, padding: '0 4px' }}>
          {GALLERY.map((img, i) => (
            <div
              key={i}
              onClick={() => setGalleryOpen(i)}
              style={{
                cursor: 'pointer', overflow: 'hidden', position: 'relative',
                gridColumn: img.aspect === 'wide' ? 'span 2' : 'span 1',
                height: img.aspect === 'tall' ? 400 : 280,
              }}
            >
              <img
                src={img.url}
                alt={img.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(13,27,42,0.7))', padding: '24px 16px 12px' }}>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em' }}>{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Lightbox */}
        {galleryOpen !== null && (
          <div onClick={() => setGalleryOpen(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, cursor: 'pointer' }}>
            <img src={GALLERY[galleryOpen].url.replace('w=800', 'w=1400')} alt={GALLERY[galleryOpen].caption} style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} onClick={e => e.stopPropagation()} />
            <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{GALLERY[galleryOpen].caption} · Click anywhere to close</div>
          </div>
        )}
      </section>

      {/* ── SEASONAL GUIDE ── */}
      <section style={{ background: 'var(--cream)', padding: '72px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Plan Your Visit</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 12 }}>
              Alaska by Season
            </h2>
            <p style={{ color: 'var(--slate)', fontSize: '0.9rem', maxWidth: 500, margin: '0 auto' }}>
              Every season in Alaska offers a completely different experience. Here's what to expect throughout the year.
            </p>
          </div>

          {/* Season tabs */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 40, borderBottom: '1px solid rgba(13,27,42,0.1)', overflowX: 'auto' }}>
            {SEASONS.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSeason(i)}
                style={{
                  flex: 1, minWidth: 120, padding: '16px 20px', background: 'none', border: 'none',
                  borderBottom: activeSeason === i ? `3px solid ${s.color}` : '3px solid transparent',
                  cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: activeSeason === i ? 600 : 400, color: activeSeason === i ? 'var(--navy)' : 'var(--slate)', letterSpacing: '0.06em', fontFamily: 'var(--font-body)' }}>{s.name}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--slate)', letterSpacing: '0.04em' }}>{s.months}</div>
              </button>
            ))}
          </div>

          {/* Season content */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: '2.5rem' }}>{season.icon}</div>
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 4 }}>{season.name} in Alaska</h3>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span style={{ fontSize: '0.7rem', padding: '3px 10px', background: 'white', color: 'var(--slate)', border: '1px solid rgba(13,27,42,0.1)' }}>🌡 {season.temp}</span>
                    <span style={{ fontSize: '0.7rem', padding: '3px 10px', background: 'white', color: 'var(--slate)', border: '1px solid rgba(13,27,42,0.1)' }}>👥 {season.crowd} crowds</span>
                  </div>
                </div>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.9rem', marginBottom: 24 }}>{season.description}</p>
              <div className="overline" style={{ marginBottom: 12, fontSize: '0.6rem' }}>Top Activities</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {season.activities.map((a, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 14px', background: 'white', borderLeft: `3px solid ${season.color}` }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: season.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--navy)' }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <div className="overline" style={{ marginBottom: 20, fontSize: '0.6rem' }}>Seasonal Events & Festivals</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {season.events.map((ev, i) => (
                  <div key={i} style={{ background: 'white', padding: '18px 20px', borderTop: `3px solid ${season.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>{ev.name}</span>
                      <span style={{ fontSize: '0.68rem', background: season.color + '33', color: 'var(--navy)', padding: '3px 8px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{ev.when}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--slate)' }}>📍 {ev.location}</div>
                  </div>
                ))}
              </div>

              {/* Best time callout */}
              <div style={{ background: 'var(--navy)', padding: '20px', marginTop: 20 }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Crestwell Recommends</div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>
                  {activeSeason === 1
                    ? 'June–July is our top pick for Alaska cruises — maximum daylight, peak wildlife activity, and warm enough to enjoy deck time comfortably.'
                    : activeSeason === 0
                    ? 'May cruises offer great value with smaller crowds — wildlife is active and the scenery is just as stunning as summer.'
                    : activeSeason === 2
                    ? 'September is a hidden gem — bears are feeding heavily, fall colors are stunning, and prices drop significantly after Labor Day.'
                    : 'Winter Alaska is for true adventurers. The Iditarod and Northern Lights make for an unforgettable land-based adventure.'}
                </p>
                <Link href={`/request-quote?destination=Alaska&trip_type=Cruise+Vacation`} className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '0.75rem', padding: '10px 20px' }}>
                  Plan {season.name} Alaska Trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORT GUIDE ── */}
      <section style={{ background: 'white', padding: '72px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Shore Excursions</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 12 }}>
              Alaska's Top Ports of Call
            </h2>
            <p style={{ color: 'var(--slate)', fontSize: '0.9rem', maxWidth: 500, margin: '0 auto' }}>
              Each port offers a completely different window into Alaska's character.
            </p>
          </div>

          {/* Port selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, overflowX: 'auto', paddingBottom: 4 }}>
            {PORTS.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePort(i)}
                style={{
                  padding: '10px 20px', border: '1px solid', whiteSpace: 'nowrap',
                  borderColor: activePort === i ? 'var(--navy)' : 'rgba(13,27,42,0.15)',
                  background: activePort === i ? 'var(--navy)' : 'white',
                  color: activePort === i ? 'white' : 'var(--slate)',
                  fontSize: '0.78rem', letterSpacing: '0.06em',
                  fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Port content */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            <div style={{ position: 'relative', height: 440, overflow: 'hidden' }}>
              <img src={port.image} alt={port.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(13,27,42,0.8))', padding: '32px 24px 20px' }}>
                <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'white', marginBottom: 4 }}>{port.name}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--gold)', letterSpacing: '0.06em' }}>{port.tagline}</p>
              </div>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.92rem', marginBottom: 28 }}>{port.description}</p>
              <div className="overline" style={{ marginBottom: 14, fontSize: '0.6rem' }}>Must-Do in {port.name}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
                {port.mustDo.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600 }}>0{i + 1}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--navy)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link href={`/request-quote?destination=Alaska+${port.name}&trip_type=Cruise+Vacation`} className="btn-navy" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Plan Shore Excursions in {port.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WILDLIFE GUIDE ── */}
      <section style={{ background: 'var(--navy)', padding: '72px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div className="overline" style={{ marginBottom: 16 }}>Nature & Wildlife</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'white', marginBottom: 20 }}>
                Alaska's Big 8 Wildlife Encounters
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.85, marginBottom: 32 }}>
                Alaska is home to some of the most incredible wildlife viewing on the planet. Unlike safari destinations where you might see one or two species in a week, an Alaska cruise routinely delivers multiple major sightings in a single day.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderLeft: '3px solid var(--gold)' }}>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', lineHeight: 1.75, marginBottom: 0 }}>
                  <strong style={{ color: 'var(--gold)' }}>Crestwell Tip:</strong> Book a dedicated whale watching or bear viewing excursion through a local guide — they know exactly where the animals are on any given day, and their expertise turns a good sighting into an extraordinary one.
                </p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {WILDLIFE.map((w, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', border: '1px solid rgba(255,255,255,0.08)', transition: 'border-color 0.2s' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: 8 }}>{w.icon}</div>
                  <div style={{ fontSize: '0.88rem', color: 'white', fontWeight: 500, marginBottom: 4 }}>{w.name}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.06em', marginBottom: 4 }}>{w.season}</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>{w.where}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRACTICAL INFO ── */}
      <section style={{ background: 'var(--cream)', padding: '72px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Practical Information</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>
              Everything You Need to Know
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {[
              { title: 'Packing Essentials', icon: '🎒', items: ['Waterproof jacket & pants (non-negotiable)', 'Layers — weather changes fast', 'Waterproof hiking boots', 'Binoculars for wildlife viewing', 'Sunscreen (surprisingly necessary)', 'Insect repellent for land excursions'] },
              { title: 'Getting There', icon: '✈️', items: ['Seattle (SEA) is the main gateway hub', 'Direct flights to Anchorage (ANC) or Juneau (JNU)', '6–8 hours from Atlanta, Nashville, Birmingham', 'Most cruises depart Seattle or Vancouver', 'Fly-cruise packages available — ask us'] },
              { title: 'Embarkation Ports', icon: '⚓', items: ['Seattle, WA — most accessible from Southeast US', 'Vancouver, BC — beautiful city worth 2+ days', 'Whittier, AK — for Gulf of Alaska itineraries', 'Seward, AK — near Kenai Fjords National Park', 'Anchorage is 60mi from Whittier & 125mi from Seward'] },
              { title: 'Money & Tips', icon: '💵', items: ['US Dollars accepted everywhere in Alaska', 'No foreign currency needed', 'Gratuities typically $18–22/person/day on ship', 'Shore excursion budget: $100–300/person/day', 'Travel insurance strongly recommended', 'Book excursions early — popular ones sell out'] },
            ].map((card, i) => (
              <div key={i} style={{ background: 'white', padding: '28px' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: 12 }}>{card.icon}</div>
                <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 16 }}>{card.title}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {card.items.map((item, j) => (
                    <li key={j} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', padding: '6px 0', borderBottom: j < card.items.length - 1 ? '1px solid rgba(13,27,42,0.05)' : 'none', paddingLeft: 14, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--gold)' }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 32px', background: 'var(--navy)', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1546587348-d12660c30c50?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Ready for Alaska?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
            Let's Plan Your Alaska Adventure
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 36 }}>
            Alaska cruises require careful planning to get the most from your time ashore. Our specialists have sailed these waters and know every port, every excursion, and every operator. No booking fees. Just expertise.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?destination=Alaska&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none' }}>
              Request a Free Quote
            </Link>
            <Link href="/cruises?destination=Alaska" style={{
              padding: '12px 28px', border: '1px solid rgba(255,255,255,0.25)',
              color: 'white', textDecoration: 'none', fontSize: '0.75rem',
              letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)',
            }}>
              View Alaska Cruises
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section div[style*="grid-template-columns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="gridTemplateColumns: 'repeat(3, 1fr)'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
