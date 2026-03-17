'use client';
import { useState } from 'react';
import Link from 'next/link';

const RIVERS = [
  { name: 'Danube', tagline: 'Imperial Cities & Castle-Lined Shores', image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=85', description: 'The Danube is Europe\'s most popular river cruise route — and the most spectacular. The classic itinerary runs from Amsterdam or Nuremberg through Austria and into Hungary, visiting some of Europe\'s great imperial cities along the way. Vienna\'s coffee houses, Budapest\'s thermal baths, and the Wachau Valley vineyards are river cruise essentials. The stretch through the Wachau — a UNESCO World Heritage valley — is among the most beautiful in all of Europe.', mustDo: ['Vienna: Schönbrunn Palace & Naschmarkt', 'Wachau Valley: Dürnstein Abbey & vineyards', 'Budapest: Buda Castle & thermal baths', 'Bratislava: Old Town & Bratislava Castle', 'Melk Abbey (Baroque masterpiece)', 'Budapest\'s ruin bars (evening)'] },
  { name: 'Rhine', tagline: 'Medieval Castles & Rhine Valley Wine', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=85', description: 'The Rhine Valley between Cologne and Mainz is one of the most castle-dense landscapes in the world — over 40 fortresses line the river\'s banks over just 65 miles. The Loreley Rock, the Marksburg Castle (the only one never destroyed), and the vine-covered hillsides of the Rheingau wine region are unforgettable. Dutch tulip fields are an added bonus on extended itineraries starting in Amsterdam.', mustDo: ['Marksburg Castle (only intact Rhine castle)', 'Loreley Rock viewpoint', 'Cologne Cathedral (UNESCO, 500 years to build)', 'Rheingau wine tasting in Rüdesheim', 'Amsterdam tulip gardens (spring)', 'Heidelberg Old Town & castle'] },
  { name: 'Douro', tagline: 'Portugal\'s Wine Country & Quintas', image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=85', description: 'Portugal\'s Douro Valley is Europe\'s most underrated river cruise destination. The steep, terraced vineyards produce port wine — the valley is considered the oldest demarcated wine region in the world. Elegant quintas (wine estates) welcome visitors. The river itself is narrow and winding, passing through dramatic gorges that larger ships can never access. Porto, at the mouth of the Douro, is one of Europe\'s most beautiful cities.', mustDo: ['Porto: Livraria Lello bookshop & Ribeira', 'Quinta do Crasto port wine tasting', 'Salamanca, Spain day trip (Spanish Baroque)', 'Régua Wine Museum', 'Pinhão village station azulejo tiles', 'Barca d\'Alva at the Spanish border'] },
  { name: 'Seine', tagline: 'Paris & Normandy\'s WWII Heritage', image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=85', description: 'A Seine river cruise combines the romance of Paris with the solemn historical weight of the D-Day beaches in Normandy. Ships typically embark in Paris and sail to Rouen (Claude Monet\'s Giverny is nearby) and then to the Normandy coast. The American Cemetery at Colleville-sur-Mer overlooking Omaha Beach is one of the most moving sites in Europe.', mustDo: ['Paris: Eiffel Tower, Louvre, Montmartre', 'Giverny: Monet\'s Gardens', 'Rouen: Gothic Cathedral (Monet painted it 30 times)', 'Normandy D-Day beaches & American Cemetery', 'Château Gaillard clifftop ruins', 'Épernay Champagne country tasting'] },
  { name: 'Norwegian Fjords', tagline: 'The World\'s Most Dramatic Coastal Scenery', image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=85', description: 'The Norwegian fjords are a different type of European cruise — ocean-going ships navigate the finger-shaped inlets carved by ancient glaciers. Walls of rock rise thousands of feet directly from the water. The Geirangerfjord and Nærøyfjord are UNESCO World Heritage Sites. Bergen, gateway to the fjords, is a colorful Hanseatic city with one of Norway\'s best food markets. Summer offers the midnight sun; winter offers the northern lights.', mustDo: ['Geirangerfjord (UNESCO, Seven Sisters waterfall)', 'Flåm Railway (world\'s most scenic train)', 'Bergen: Bryggen Wharf & Fløibanen funicular', 'Nærøyfjord kayaking', 'Midnight sun viewing (June–July)', 'Northern Lights (November–February)'] },
];

const SEASONS = [
  { name: 'Spring', months: 'Apr – May', icon: '🌷', temp: '48–65°F', crowd: 'Low–Medium', color: '#4ade80', highlight: 'Tulips & cherry blossoms', description: 'Spring is magical on Europe\'s rivers. Dutch tulip fields are at their peak in April. Cherry blossoms line the Rhine and Danube. Easter markets fill town squares. April–May offers excellent value with gradually building warmth — and it\'s when the rivers run full and navigable.', events: [{ name: 'Tulip Season', location: 'Netherlands (Keukenhof)', when: 'Mid-March to Mid-May' }, { name: 'Easter Markets', location: 'Vienna & Prague', when: 'March–April' }, { name: 'Almond Blossom Festival', location: 'Douro Valley, Portugal', when: 'February–March' }], activities: ['Tulip fields by bike in Holland', 'Easter celebrations in Vienna', 'Spring wildflowers in the Douro', 'Uncrowded museums & cathedrals', 'Cherry blossom photography along rivers'] },
  { name: 'Summer', months: 'Jun – Aug', icon: '☀️', temp: '65–82°F', crowd: 'Peak', color: '#fbbf24', highlight: 'Long days & festivals', description: 'Summer is prime European river cruise season. Long days mean more time in port. Outdoor festivals, beer gardens, and evening markets are in full swing. The Danube and Rhine are at their most navigable. Book well in advance — premium cabins and top ships sell out 12–18 months ahead for summer departures.', events: [{ name: 'Bastille Day', location: 'Paris & French ports', when: 'July 14' }, { name: 'Edinburgh Fringe Festival', location: 'Edinburgh (add-on)', when: 'August' }, { name: 'Salzburg Music Festival', location: 'Salzburg, Austria', when: 'July–August' }], activities: ['Evening concerts in Vienna & Budapest', 'Outdoor café culture everywhere', 'Rhine Valley wine festivals', 'Midnight sun in Norwegian fjords', 'Bastille Day celebrations'] },
  { name: 'Fall', months: 'Sep – Oct', icon: '🍇', temp: '50–68°F', crowd: 'Medium', color: '#f97316', highlight: 'Harvest season & wine festivals', description: 'Autumn is our top recommendation for Danube and Rhine river cruises. Harvest season brings wine festivals to the Rhine and Douro valleys. The fall foliage transforms the landscapes dramatically. Crowds are manageable, prices are lower than summer, and the light for photography is exceptional.', events: [{ name: 'Oktoberfest', location: 'Munich (day trip from Danube)', when: 'Late September–October' }, { name: 'Grape Harvest Festival (Weinfest)', location: 'Rhine Valley', when: 'September–October' }, { name: 'Douro Harvest (Vindima)', location: 'Douro Valley, Portugal', when: 'September–October' }], activities: ['Grape harvest participation (Douro)', 'Oktoberfest from Danube cruise', 'Wine festivals along the Rhine', 'Fall foliage photography', 'Truffle season in France & Italy'] },
  { name: 'Winter', months: 'Nov – Jan', icon: '🎄', temp: '28–45°F', crowd: 'Low', color: '#93c5fd', highlight: 'Christmas markets — unmissable', description: 'European Christmas market cruises are among the most magical travel experiences available. Nuremberg, Cologne, Vienna, and Budapest\'s markets are world-famous. Ships dock right in city centers, often within walking distance of the markets. This is a premium product — book 12+ months in advance for December departures.', events: [{ name: 'Nuremberg Christmas Market (Christkindlesmarkt)', location: 'Nuremberg, Germany', when: 'Late Nov–Dec 24' }, { name: 'Vienna Christmas Markets', location: 'Vienna, Austria', when: 'November–December' }, { name: 'Budapest Christmas Market', location: 'Budapest, Hungary', when: 'November–January' }], activities: ['Christmas market shopping & mulled wine', 'Vienna State Opera winter season', 'New Year\'s in Budapest or Vienna', 'Northern Lights in Norway', 'Cozy riverside cities with fewer tourists'] },
];

const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=85', caption: 'Rhine Valley, Germany', aspect: 'wide' },
  { url: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=85', caption: 'Budapest at Night', aspect: 'tall' },
  { url: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=85', caption: 'Douro Valley, Portugal', aspect: 'square' },
  { url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=85', caption: 'Paris & the Seine', aspect: 'square' },
  { url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=85', caption: 'Norwegian Fjords', aspect: 'tall' },
  { url: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=85', caption: 'European River at Dusk', aspect: 'wide' },
];

export default function EuropeDestinationPage() {
  const [activeSeason, setActiveSeason] = useState(1);
  const [activeRiver, setActiveRiver] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const season = SEASONS[activeSeason];
  const river = RIVERS[activeRiver];

  return (
    <>
      <section style={{ position: 'relative', height: '90vh', minHeight: 560, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.15) 0%, rgba(13,27,42,0.75) 100%)' }} />
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: 92, left: 32, display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', textDecoration: 'none', letterSpacing: '0.08em' }}>Destinations</Link>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>›</span>
          <span style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>Europe</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 32px 64px', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'flex-end' }}>
            <div>
              <div className="overline" style={{ color: 'var(--gold)', marginBottom: 16 }}>Destination Guide</div>
              <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, color: 'white', lineHeight: 1, marginBottom: 16, letterSpacing: '-0.02em' }}>Europe</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>Castles on the Rhine. Thermal baths in Budapest. Tulip fields in Holland. Christmas markets glowing through the December snow. European river cruises deliver the continent at the perfect pace — a different city every morning, no airports, no luggage hauling.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/request-quote?destination=Europe&trip_type=River+Cruise" className="btn-primary" style={{ textDecoration: 'none' }}>Plan My Europe Trip</Link>
                <Link href="/cruises?destination=Europe" style={{ padding: '12px 24px', border: '1px solid rgba(255,255,255,0.3)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>View Cruises</Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }}>
              {[{ label: 'Best Season', value: 'Apr–Jun & Sep–Oct' }, { label: 'Cruise Type', value: 'River & Ocean cruises' }, { label: 'From Southeast US', value: '9–12 hour flight' }, { label: 'Currency', value: 'Euro, GBP, NOK (varies)' }].map((f, i) => (
                <div key={i} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: 12 }}>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: '0.82rem', color: 'white' }}>{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'white', padding: '72px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="overline" style={{ marginBottom: 16 }}>Why River Cruising</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2, marginBottom: 24 }}>Europe at its Most Immersive Pace</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 20 }}>River cruising is fundamentally different from ocean cruising. Ships are smaller — typically 100–200 passengers — which means you dock right in the heart of each city, walk off the gangplank, and explore. No tender boats, no shuttle buses, no wasted time. You wake up in a new city every morning.</p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 32 }}>The pace is slower and the focus is on discovery. Excursions are included in most river cruise packages. The guest-to-crew ratio is high. The cuisine is excellent. And the scenery — castles, vineyards, medieval villages, cathedrals — is constantly changing outside your window.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[{ num: '5', label: 'Major River Cruise Routes' }, { num: '100–200', label: 'Passengers (intimate ships)' }, { num: '15+', label: 'Cities on a 14-Night Danube Cruise' }, { num: '40+', label: 'Castles Along the Rhine Valley' }].map((s, i) => (
                <div key={i} style={{ padding: '20px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
                  <div className="font-display" style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--slate)', letterSpacing: '0.06em', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', height: 500 }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '80%', height: '65%', backgroundImage: 'url(https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '65%', height: '50%', backgroundImage: 'url(https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', border: '6px solid white' }} />
            <div style={{ position: 'absolute', bottom: 60, right: -10, background: 'var(--navy)', padding: '12px 18px', zIndex: 2 }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Dock in City Centers</div>
              <div style={{ fontSize: '0.82rem', color: 'white', marginTop: 2 }}>Walk off the ship & explore</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '64px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', marginBottom: 36 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Gallery</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'white' }}>Europe's Rivers & Landscapes</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, padding: '0 4px' }}>
          {GALLERY.map((img, i) => (<div key={i} onClick={() => setGalleryOpen(i)} style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative', gridColumn: img.aspect === 'wide' ? 'span 2' : 'span 1', height: img.aspect === 'tall' ? 400 : 280 }}><img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} /><div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(13,27,42,0.7))', padding: '24px 16px 12px' }}><span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em' }}>{img.caption}</span></div></div>))}
        </div>
        {galleryOpen !== null && (<div onClick={() => setGalleryOpen(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, cursor: 'pointer' }}><img src={GALLERY[galleryOpen].url.replace('w=800', 'w=1400').replace('w=1200', 'w=1800')} alt={GALLERY[galleryOpen].caption} style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} /><div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{GALLERY[galleryOpen].caption} · Click to close</div></div>)}
      </section>

      <section style={{ background: 'white', padding: '72px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}><div className="overline" style={{ marginBottom: 12 }}>River Routes</div><h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>Europe's Great River Cruise Routes</h2></div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, overflowX: 'auto', paddingBottom: 4 }}>
            {RIVERS.map((r, i) => (<button key={i} onClick={() => setActiveRiver(i)} style={{ padding: '10px 16px', border: '1px solid', whiteSpace: 'nowrap', borderColor: activeRiver === i ? 'var(--navy)' : 'rgba(13,27,42,0.15)', background: activeRiver === i ? 'var(--navy)' : 'white', color: activeRiver === i ? 'white' : 'var(--slate)', fontSize: '0.75rem', letterSpacing: '0.06em', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s' }}>{r.name}</button>))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            <div style={{ position: 'relative', height: 440, overflow: 'hidden' }}>
              <img src={river.image} alt={river.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(13,27,42,0.8))', padding: '32px 24px 20px' }}>
                <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'white', marginBottom: 4 }}>{river.name} River</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--gold)', letterSpacing: '0.06em' }}>{river.tagline}</p>
              </div>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.92rem', marginBottom: 28 }}>{river.description}</p>
              <div className="overline" style={{ marginBottom: 14, fontSize: '0.6rem' }}>Must-Do Along the {river.name}</div>
              {river.mustDo.map((item, i) => (<div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)', marginBottom: 8 }}><span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600 }}>0{i + 1}</span><span style={{ fontSize: '0.875rem', color: 'var(--navy)' }}>{item}</span></div>))}
              <Link href={`/request-quote?destination=Europe+${river.name}+River&trip_type=River+Cruise`} className="btn-navy" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 8 }}>Plan {river.name} River Cruise</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '72px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}><div className="overline" style={{ marginBottom: 12 }}>When to Go</div><h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>Europe by Season</h2></div>
          <div style={{ display: 'flex', gap: 0, marginBottom: 40, borderBottom: '1px solid rgba(13,27,42,0.1)', overflowX: 'auto' }}>
            {SEASONS.map((s, i) => (<button key={i} onClick={() => setActiveSeason(i)} style={{ flex: 1, minWidth: 100, padding: '16px 20px', background: 'none', border: 'none', borderBottom: activeSeason === i ? `3px solid ${s.color}` : '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}><div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{s.icon}</div><div style={{ fontSize: '0.78rem', fontWeight: activeSeason === i ? 600 : 400, color: activeSeason === i ? 'var(--navy)' : 'var(--slate)', letterSpacing: '0.06em', fontFamily: 'var(--font-body)' }}>{s.name}</div><div style={{ fontSize: '0.65rem', color: 'var(--slate)' }}>{s.months}</div></button>))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: '2.5rem' }}>{season.icon}</div>
                <div><h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 4 }}>{season.name}</h3><div style={{ display: 'flex', gap: 12 }}><span style={{ fontSize: '0.7rem', padding: '3px 10px', background: 'white', color: 'var(--slate)', border: '1px solid rgba(13,27,42,0.1)' }}>🌡 {season.temp}</span><span style={{ fontSize: '0.7rem', padding: '3px 10px', background: 'white', color: 'var(--slate)', border: '1px solid rgba(13,27,42,0.1)' }}>👥 {season.crowd}</span></div></div>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.9rem', marginBottom: 24 }}>{season.description}</p>
              <div className="overline" style={{ marginBottom: 12, fontSize: '0.6rem' }}>Top Activities</div>
              {season.activities.map((a, i) => (<div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 14px', background: 'white', borderLeft: `3px solid ${season.color}`, marginBottom: 8 }}><div style={{ width: 5, height: 5, borderRadius: '50%', background: season.color, flexShrink: 0 }} /><span style={{ fontSize: '0.85rem', color: 'var(--navy)' }}>{a}</span></div>))}
            </div>
            <div>
              <div className="overline" style={{ marginBottom: 20, fontSize: '0.6rem' }}>Events & Festivals</div>
              {season.events.map((ev, i) => (<div key={i} style={{ background: 'white', padding: '18px 20px', borderTop: `3px solid ${season.color}`, marginBottom: 12 }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4, flexWrap: 'wrap', gap: 8 }}><span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>{ev.name}</span><span style={{ fontSize: '0.68rem', background: season.color + '33', color: 'var(--navy)', padding: '3px 8px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{ev.when}</span></div><div style={{ fontSize: '0.75rem', color: 'var(--slate)' }}>📍 {ev.location}</div></div>))}
              <div style={{ background: 'var(--navy)', padding: '20px', marginTop: 8 }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Crestwell Recommends</div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>Christmas market cruises in December are bucket-list experiences — book 12–18 months in advance. For general river cruising, September is our top pick for weather, harvest season, and value.</p>
                <Link href="/request-quote?destination=Europe&trip_type=River+Cruise" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '0.75rem', padding: '10px 20px' }}>Plan {season.name} Europe Trip</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 32px', background: 'var(--navy)', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Ready for Europe?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>Castles, Cathedrals & Christmas Markets</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 36 }}>European river cruises require early booking — especially for Christmas market season and spring tulip cruises. Our specialists work with AmaWaterways, Avalon, and Uniworld to find the perfect ship and itinerary for you.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?destination=Europe&trip_type=River+Cruise" className="btn-primary" style={{ textDecoration: 'none' }}>Request a Free Quote</Link>
            <Link href="/cruise-lines" style={{ padding: '12px 28px', border: '1px solid rgba(255,255,255,0.25)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>View River Cruise Lines</Link>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 900px) { section div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
