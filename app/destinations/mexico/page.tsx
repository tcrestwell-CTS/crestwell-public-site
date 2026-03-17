'use client';
import { useState } from 'react';
import Link from 'next/link';

const PORTS = [
  { name: 'Cozumel', tagline: 'World\'s Second-Largest Coral Reef System', image: 'https://images.unsplash.com/photo-1512813498716-3e640fed3f5f?w=800&q=85', description: 'Cozumel is one of the most visited cruise ports in the world — and justifiably so. The Mesoamerican Barrier Reef surrounds the island with extraordinary diving and snorkeling. Visibility regularly exceeds 100 feet. The island\'s interior holds Mayan ruins, jungle, and cenotes. El Centro, the walkable downtown, has excellent tequila bars and local restaurants.', mustDo: ['Snorkeling at Palancar Reef & Columbia Wall', 'Mayan ruins at San Gervasio', 'Cenote diving or swimming', 'El Centro tequila tasting', 'Jeep or ATV island tour', 'Chankanaab Adventure Beach Park'] },
  { name: 'Cabo San Lucas', tagline: 'Land\'s End, Pacific Glamour & Desert Drama', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85', description: 'Where the Pacific Ocean meets the Sea of Cortez, Cabo San Lucas delivers some of Mexico\'s most dramatic scenery. El Arco — the famous natural arch at Land\'s End — is one of Mexico\'s most iconic images. The Marina is lined with upscale restaurants and yacht charters. The snorkeling at Lover\'s Beach is superb.', mustDo: ['El Arco & Lover\'s Beach by water taxi', 'Whale watching (December–April)', 'Glass-bottom boat to Sea Lion colony', 'Cabo Wabo & The Office on the Beach', 'ATV desert tour', 'Sunset cruise on the Pacific'] },
  { name: 'Puerto Vallarta', tagline: 'Old Town Cobblestones & Jungle Canopy', image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=85', description: 'Puerto Vallarta has managed to remain charming despite its popularity. The Old Town (Zona Romántica) has cobblestone streets, art galleries, and excellent restaurants. The Sierra Madre mountains rise directly behind the city, offering world-class zip-lining and canopy tours. Banderas Bay is one of Mexico\'s largest — whale-watching season is spectacular.', mustDo: ['Zona Romántica exploration & Malecón boardwalk', 'Canopy River zip-line adventure', 'Humpback whale watching (Dec–Mar)', 'Yelapa waterfall boat trip', 'Los Muertos Beach', 'Huichol indigenous art galleries'] },
  { name: 'Progreso (Mérida/Chichén Itzá)', tagline: 'Gateway to the Mayan World', image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=85', description: 'Progreso is the port for one of Mexico\'s most culturally rich regions. Just 35 minutes away, Mérida is one of Mexico\'s most beautiful colonial cities — white limestone buildings, vibrant markets, and excellent regional cuisine. Chichén Itzá, one of the New Seven Wonders of the World, is 2 hours away by road.', mustDo: ['Chichén Itzá (UNESCO & New Seven Wonders)', 'Mérida colonial city walk & Gran Mercado', 'Dzibilchaltún Mayan ruins & cenote swim', 'Uxmal Mayan Pyramid complex', 'Flamingo tour at Celestún Biosphere', 'Hacienda Sotuta de Peón henequen tour'] },
  { name: 'Mazatlán', tagline: 'Mexico\'s Malecón & Pacific Sunsets', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=85', description: 'Mazatlán is one of Mexico\'s most authentic Pacific port cities — not overrun with resorts, but genuinely lived-in and full of character. The Malecón is one of the longest seafront promenades in the world. The historic Centro Histórico has a magnificent 19th-century theater and excellent seafood restaurants within walking distance.', mustDo: ['Centro Histórico walking tour', 'Angela Peralta Theater', 'Stone Island beach day', 'Deer Island snorkeling', 'Pulmonía (open-air taxi) ride on the Malecón', 'Mazatlán Carnaval (if February)'] },
];

const SEASONS = [
  { name: 'Winter', months: 'Nov – Feb', icon: '🌵', temp: '72–82°F', crowd: 'Peak', color: '#fbbf24', highlight: 'Best weather, whale season', description: 'Perfect weather up and down the Mexican coasts. December–April is whale watching season in Cabo — humpbacks and gray whales migrate through Banderas Bay and the Sea of Cortez. Dry, warm, sunny.', events: [{ name: 'Whale Watching Season Opens', location: 'Cabo & Puerto Vallarta', when: 'December' }, { name: 'Day of the Virgin of Guadalupe', location: 'Mexico-wide', when: 'December 12' }, { name: 'Posadas Festivals', location: 'All cities', when: 'Dec 16–24' }], activities: ['Whale watching (prime season)', 'Beach hopping in Cabo', 'Cenote diving in Yucatán', 'Chichén Itzá excursions', 'Pacific sailing & fishing'] },
  { name: 'Spring', months: 'Mar – May', icon: '🌺', temp: '78–88°F', crowd: 'High', color: '#4ade80', highlight: 'Spring break & Semana Santa', description: 'Spring break fills Mexican resort towns in March. Semana Santa (Holy Week) before Easter is a major Mexican holiday with colorful processions. May offers great value as crowds thin and heat builds.', events: [{ name: 'Semana Santa (Holy Week)', location: 'All Mexico', when: 'Week before Easter' }, { name: 'Día de la Constitución', location: 'Mexico-wide', when: 'February 5' }, { name: 'Spring Equinox at Chichén Itzá', location: 'Yucatán', when: 'March 21' }], activities: ['Equinox light show at Chichén Itzá', 'Spring break energy', 'Semana Santa processions', 'Cenote tours before heat peaks', 'Diving in Cozumel'] },
  { name: 'Summer', months: 'Jun – Sep', icon: '☀️', temp: '86–94°F', crowd: 'Medium', color: '#f97316', highlight: 'Rainy season, lush & green', description: 'Hot, humid, and occasionally rainy — but the Mexican interior turns spectacularly green. Fewer tourists and better deals. The Pacific coast (Cabo, PV) is less affected by rain than the Yucatán. Diving is excellent year-round.', events: [{ name: 'Guelaguetza Festival', location: 'Oaxaca', when: 'July' }, { name: 'Independence Day', location: 'Mexico-wide', when: 'September 16' }, { name: 'Mazatlán Pre-Carnaval Season', location: 'Mazatlán', when: 'September prep' }], activities: ['Best deals on Mexico cruises', 'Jungle tours (lush season)', 'Turtle nesting viewing', 'Fishing tournament season', 'City exploration (cooler mornings)'] },
  { name: 'Fall', months: 'Oct – Nov', icon: '🌊', temp: '78–86°F', crowd: 'Low', color: '#a78bfa', highlight: 'Día de los Muertos & best value', description: 'October–November is one of the most culturally rich times to visit Mexico. Día de los Muertos (Nov 1–2) is a deeply moving, colorful celebration. Hurricane season ends in November, and the weather becomes ideal again.', events: [{ name: 'Día de los Muertos', location: 'Mexico-wide (esp. Oaxaca & Pátzcuaro)', when: 'Nov 1–2' }, { name: 'Mazatlán Carnaval Prep', location: 'Mazatlán', when: 'October' }, { name: 'Monarch Butterfly Migration', location: 'Michoacán', when: 'October–March' }], activities: ['Día de los Muertos celebrations', 'Monarch butterfly viewing', 'Best prices of the year', 'Uncrowded ruins & beaches', 'Mayan archaeological sites in comfort'] },
];

const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1512813498716-3e640fed3f5f?w=1200&q=85', caption: 'Cozumel Crystal Waters', aspect: 'wide' },
  { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85', caption: 'Cabo San Lucas El Arco', aspect: 'tall' },
  { url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=85', caption: 'Chichén Itzá Ruins', aspect: 'square' },
  { url: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=85', caption: 'Puerto Vallarta Bay', aspect: 'square' },
  { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=85', caption: 'Mexican Pacific Coast', aspect: 'tall' },
  { url: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&q=85', caption: 'Mexico Sunset', aspect: 'wide' },
];

export default function MexicoDestinationPage() {
  const [activeSeason, setActiveSeason] = useState(0);
  const [activePort, setActivePort] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const season = SEASONS[activeSeason];
  const port = PORTS[activePort];

  return (
    <>
      <section style={{ position: 'relative', height: '90vh', minHeight: 560, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1512813498716-3e640fed3f5f?w=1800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center 50%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.15) 0%, rgba(13,27,42,0.75) 100%)' }} />
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: 92, left: 32, display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', textDecoration: 'none', letterSpacing: '0.08em' }}>Destinations</Link>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>›</span>
          <span style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>Mexico</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 32px 64px', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'flex-end' }}>
            <div>
              <div className="overline" style={{ color: 'var(--gold)', marginBottom: 16 }}>Destination Guide</div>
              <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, color: 'white', lineHeight: 1, marginBottom: 16, letterSpacing: '-0.02em' }}>Mexico</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>Ancient Mayan pyramids. Luminous coral reefs. Pacific sunsets and cenote swims. Vibrant cities and deserted jungle ruins. Mexico offers more layers of experience than almost any other cruise destination.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/request-quote?destination=Mexico&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none' }}>Plan My Mexico Trip</Link>
                <Link href="/cruises?destination=Mexico" style={{ padding: '12px 24px', border: '1px solid rgba(255,255,255,0.3)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>View Cruises</Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }}>
              {[{ label: 'Best Season', value: 'Nov – April' }, { label: 'Cruise Length', value: '5–14 nights' }, { label: 'From Southeast US', value: '3–5 hour flight' }, { label: 'Currency', value: 'MXN (USD widely accepted)' }].map((f, i) => (
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
            <div className="overline" style={{ marginBottom: 16 }}>Why Mexico</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2, marginBottom: 24 }}>Ancient Wonders, Pacific Beauty & Vibrant Culture</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 20 }}>Mexico cruise itineraries divide into two distinct routes. The Mexican Riviera departs California, sailing down the Pacific coast to Cabo San Lucas, Puerto Vallarta, and Mazatlán — a sun-drenched journey through dramatic desert-meets-ocean scenery. The Yucatán route from Florida visits Cozumel and the ancient Mayan heartland of Progreso.</p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 32 }}>Both offer the same extraordinary thing that makes Mexico cruise-worthy: the combination of world-class beaches and some of the most significant archaeological sites in the Western Hemisphere, accessible on the same trip.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[{ num: '35+', label: 'UNESCO World Heritage Sites' }, { num: '1,600mi', label: 'Mesoamerican Barrier Reef' }, { num: '6,000+', label: 'Archaeological Sites' }, { num: '#1', label: 'Most Visited Destination for US Cruisers' }].map((s, i) => (
                <div key={i} style={{ padding: '20px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
                  <div className="font-display" style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--slate)', letterSpacing: '0.06em', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', height: 500 }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '80%', height: '65%', backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '65%', height: '50%', backgroundImage: 'url(https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', border: '6px solid white' }} />
            <div style={{ position: 'absolute', bottom: 60, right: -10, background: 'var(--navy)', padding: '12px 18px', zIndex: 2 }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>New Seven Wonders</div>
              <div style={{ fontSize: '0.82rem', color: 'white', marginTop: 2 }}>Chichén Itzá, Yucatán</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '64px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', marginBottom: 36 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Gallery</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'white' }}>Mexico's Two Coastlines</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, padding: '0 4px' }}>
          {GALLERY.map((img, i) => (
            <div key={i} onClick={() => setGalleryOpen(i)} style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative', gridColumn: img.aspect === 'wide' ? 'span 2' : 'span 1', height: img.aspect === 'tall' ? 400 : 280 }}>
              <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(13,27,42,0.7))', padding: '24px 16px 12px' }}>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em' }}>{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
        {galleryOpen !== null && (<div onClick={() => setGalleryOpen(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, cursor: 'pointer' }}><img src={GALLERY[galleryOpen].url.replace('w=800', 'w=1400').replace('w=1200', 'w=1800')} alt={GALLERY[galleryOpen].caption} style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} /><div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{GALLERY[galleryOpen].caption} · Click to close</div></div>)}
      </section>

      <section style={{ background: 'white', padding: '72px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Shore Excursions</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>Mexico's Top Ports of Call</h2>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, overflowX: 'auto', paddingBottom: 4 }}>
            {PORTS.map((p, i) => (<button key={i} onClick={() => setActivePort(i)} style={{ padding: '10px 16px', border: '1px solid', whiteSpace: 'nowrap', borderColor: activePort === i ? 'var(--navy)' : 'rgba(13,27,42,0.15)', background: activePort === i ? 'var(--navy)' : 'white', color: activePort === i ? 'white' : 'var(--slate)', fontSize: '0.75rem', letterSpacing: '0.06em', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s' }}>{p.name.split('(')[0].trim()}</button>))}
          </div>
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
              <div className="overline" style={{ marginBottom: 14, fontSize: '0.6rem' }}>Must-Do</div>
              {port.mustDo.map((item, i) => (<div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)', marginBottom: 8 }}><span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600 }}>0{i + 1}</span><span style={{ fontSize: '0.875rem', color: 'var(--navy)' }}>{item}</span></div>))}
              <Link href={`/request-quote?destination=Mexico+${port.name.split('(')[0].trim()}&trip_type=Cruise+Vacation`} className="btn-navy" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 8 }}>Plan This Port Visit</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: '72px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>When to Go</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>Mexico by Season</h2>
          </div>
          <div style={{ display: 'flex', gap: 0, marginBottom: 40, borderBottom: '1px solid rgba(13,27,42,0.1)', overflowX: 'auto' }}>
            {SEASONS.map((s, i) => (<button key={i} onClick={() => setActiveSeason(i)} style={{ flex: 1, minWidth: 100, padding: '16px 20px', background: 'none', border: 'none', borderBottom: activeSeason === i ? `3px solid ${s.color}` : '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}><div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{s.icon}</div><div style={{ fontSize: '0.78rem', fontWeight: activeSeason === i ? 600 : 400, color: activeSeason === i ? 'var(--navy)' : 'var(--slate)', letterSpacing: '0.06em', fontFamily: 'var(--font-body)' }}>{s.name}</div><div style={{ fontSize: '0.65rem', color: 'var(--slate)' }}>{s.months}</div></button>))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: '2.5rem' }}>{season.icon}</div>
                <div>
                  <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 4 }}>{season.name}</h3>
                  <div style={{ display: 'flex', gap: 12 }}><span style={{ fontSize: '0.7rem', padding: '3px 10px', background: 'white', color: 'var(--slate)', border: '1px solid rgba(13,27,42,0.1)' }}>🌡 {season.temp}</span><span style={{ fontSize: '0.7rem', padding: '3px 10px', background: 'white', color: 'var(--slate)', border: '1px solid rgba(13,27,42,0.1)' }}>👥 {season.crowd}</span></div>
                </div>
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
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>November through March is ideal for Mexico cruises. December–March adds whale watching to Cabo itineraries. The spring equinox at Chichén Itzá (March 21) is unforgettable.</p>
                <Link href="/request-quote?destination=Mexico&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '0.75rem', padding: '10px 20px' }}>Plan {season.name} Mexico Trip</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 32px', background: 'var(--navy)', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1512813498716-3e640fed3f5f?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Ready for Mexico?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>Ancient Wonders Await</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 36 }}>From Cozumel's reefs to Chichén Itzá's pyramids, our specialists will build the perfect Mexico itinerary. No booking fees. Just expertise.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?destination=Mexico&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none' }}>Request a Free Quote</Link>
            <Link href="/destinations" style={{ padding: '12px 28px', border: '1px solid rgba(255,255,255,0.25)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>All Destinations</Link>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 900px) { section div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
