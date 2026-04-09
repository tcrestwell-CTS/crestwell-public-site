'use client';
import { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from "@/components/Breadcrumb";
import ViatorSearch from "@/components/ViatorSearch";

const PORTS = [
  { name: 'Santorini, Greece', tagline: 'Caldera Views & Volcanic Beauty', image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=85', description: 'Santorini is one of the most photographed places on earth — and the reality exceeds every photo. The island sits inside the caldera of an ancient volcanic explosion, with whitewashed villages clinging to cliffs 1,000 feet above the Aegean. Oia\'s blue-domed churches at sunset are the image the Mediterranean was made for. Arrive by tender and take the cable car up to Fira.', mustDo: ['Oia village sunset (arrive by 5pm)', 'Caldera rim walk from Fira to Oia (9km)', 'Red Beach & White Beach', 'Akrotiri Minoan ruins (a "Bronze Age Pompeii")', 'Volcanic hot springs swim by boat', 'Santo Wines winery & caldera view'] },
  { name: 'Rome (Civitavecchia)', tagline: 'The Eternal City in a Day', image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=85', description: 'Most ships port at Civitavecchia, about 90 minutes from Rome. The sheer density of history in Rome is staggering — the Colosseum, the Roman Forum, the Pantheon, the Vatican, the Sistine Chapel, the Trevi Fountain, and the Spanish Steps are all within walking distance or a short taxi ride of each other. Book Vatican tickets months in advance.', mustDo: ['Colosseum & Roman Forum (book skip-the-line)', 'Vatican Museums & Sistine Chapel', 'Trevi Fountain at dawn (before crowds)', 'Pantheon interior (free entry)', 'Trastevere neighborhood lunch', 'Gelato at Giolitti (since 1900)'] },
  { name: 'Barcelona, Spain', tagline: 'Gaudí, Tapas & the Gothic Quarter', image: 'https://images.unsplash.com/photo-1464790719320-516ecd75af6c?w=800&q=85', description: 'Barcelona is one of Europe\'s great cities and a major cruise embarkation point. Gaudí\'s Sagrada Família is still under construction after 140 years and is one of the most remarkable buildings on earth. La Barceloneta beach is walkable from the port. The Gothic Quarter is a medieval labyrinth of narrow streets and hidden plazas.', mustDo: ['Sagrada Família (book tickets in advance)', 'Park Güell (Gaudí\'s mosaic garden)', 'La Boqueria Market on Las Ramblas', 'Gothic Quarter walking tour', 'Barceloneta beach afternoon', 'El Born neighborhood tapas dinner'] },
  { name: 'Dubrovnik, Croatia', tagline: 'The Pearl of the Adriatic', image: 'https://images.unsplash.com/photo-1555990793-da11153b4879?w=800&q=85', description: 'Dubrovnik\'s perfectly preserved medieval walled city is one of the most beautiful urban streetscapes in Europe. Walk the 2km city wall for panoramic views of the Adriatic and orange-roofed Old Town. The city is famously the filming location for King\'s Landing in Game of Thrones — guided tours are available. Take a ferry to the Elaphiti Islands for swimming and lunch.', mustDo: ['City Walls walk (go early morning)', 'Stradun main boulevard', 'Cable car to Mount Srđ', 'Kayaking around the city walls', 'Elaphiti Islands day trip', 'Game of Thrones filming location tour'] },
  { name: 'Athens (Piraeus), Greece', tagline: 'The Acropolis & Ancient Democracy', image: 'https://images.unsplash.com/photo-1555990793-da11153b4879?w=800&q=85', description: 'Athens is one of the world\'s oldest cities and the birthplace of democracy, philosophy, and the Olympic Games. The Acropolis — rising above the modern city with the Parthenon on its summit — is one of the most significant archaeological sites in the world. The Acropolis Museum below has extraordinary artifacts. The Monastiraki flea market and Plaka neighborhood are endlessly browsable.', mustDo: ['Acropolis & Parthenon (go at opening)', 'Acropolis Museum (world-class)', 'Plaka neighborhood & Monastiraki flea market', 'Cape Sounion & Temple of Poseidon', 'Central Market (Varvakios Agora)', 'Syntagma Square Changing of the Guard'] },
];

const SEASONS = [
  { name: 'Spring', months: 'Apr – Jun', icon: '🌸', temp: '62–78°F', crowd: 'Medium', color: '#4ade80', highlight: 'Best balance of weather & crowds', description: 'The Mediterranean\'s sweet spot. Wildflowers cover the Greek hillsides, the air is crystal clear, and sites like the Acropolis and Colosseum are manageable. May and early June are peak value — warm enough for swimming, not yet at summer intensity.', events: [{ name: 'Athens Festival of Ancient Drama', location: 'Athens & Epidaurus', when: 'May–October' }, { name: 'Easter in Greece (Pascha)', location: 'All Greek islands', when: 'April (variable)' }, { name: 'Cannes Film Festival', location: 'Cannes, France', when: 'May' }], activities: ['Acropolis & ruins without peak crowds', 'Wildflower season in Greece & Croatia', 'Sailing & island hopping', 'Best photography light', 'Easter celebrations on Greek islands'] },
  { name: 'Summer', months: 'Jul – Aug', icon: '☀️', temp: '80–95°F', crowd: 'Peak', color: '#fbbf24', highlight: 'Peak season, hot & vibrant', description: 'July and August are the most popular and most expensive months. The Mediterranean is at its most vibrant — beach clubs, festivals, and nightlife are all in full swing. Book 6–12 months in advance. Temperatures in Greek islands and inland cities can be intense (95°F+), so pace shore days accordingly.', events: [{ name: 'Notting Hill Carnival (via cruise)', location: 'London (pre/post)', when: 'August' }, { name: 'Dubrovnik Summer Festival', location: 'Dubrovnik', when: 'July–August' }, { name: 'Ferragosto (Italy shuts down)', location: 'Italy', when: 'August 15' }], activities: ['Beach clubs on Mykonos & Ibiza', 'Sunset sailing in Santorini', 'Nightlife on Greek islands', 'Outdoor festivals', 'Water sports at every port'] },
  { name: 'Fall', months: 'Sep – Oct', icon: '🍇', temp: '68–82°F', crowd: 'Medium–Low', color: '#f97316', highlight: 'Harvest season & wine tourism', description: 'September is our top recommendation for Mediterranean cruises. School has returned, crowds thin dramatically, prices drop, and the weather remains excellent — often 80°F and sunny. Harvest season brings food festivals and vineyards to life across Italy, Greece, and Spain.', events: [{ name: 'Venice Film Festival', location: 'Venice, Italy', when: 'Late August–September' }, { name: 'Grape Harvest Festivals', location: 'Italy, Spain, Greece', when: 'September–October' }, { name: 'Oktoberfest (if stopping Germany)', location: 'Munich', when: 'September–October' }], activities: ['Wine harvest tours & tastings', 'Uncrowded Acropolis & Colosseum', 'Venice without peak crowds', 'Truffle season in Italy (Oct)', 'Best pricing on 7-night itineraries'] },
  { name: 'Winter', months: 'Nov – Mar', icon: '🏛️', temp: '48–60°F', crowd: 'Low', color: '#93c5fd', highlight: 'Cultural immersion, no crowds', description: 'Winter cruises are rare but deeply rewarding for the culturally minded traveler. Museums without queues, restaurants without reservations, and cities that feel like real places rather than tourist attractions. Some smaller ports don\'t receive ships, but the major ones — Rome, Barcelona, Athens — are wonderful in winter.', events: [{ name: 'Carnival in Venice', location: 'Venice, Italy', when: 'February (before Lent)' }, { name: 'Christmas Markets', location: 'Barcelona, Rome, French Riviera', when: 'December' }, { name: 'Athens International Film Festival', location: 'Athens', when: 'November' }], activities: ['Vatican Museums without queues', 'Venice Carnival (February)', 'Christmas markets in Barcelona', 'Museum-focused shore days', 'Mediterranean cuisine in cooler weather'] },
];

const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1200&q=85', caption: 'Santorini, Greece', aspect: 'wide' },
  { url: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=85', caption: 'Rome, Italy', aspect: 'tall' },
  { url: 'https://images.unsplash.com/photo-1464790719320-516ecd75af6c?w=800&q=85', caption: 'Barcelona, Spain', aspect: 'square' },
  { url: 'https://images.unsplash.com/photo-1555990793-da11153b4879?w=800&q=85', caption: 'Dubrovnik, Croatia', aspect: 'square' },
  { url: 'https://images.unsplash.com/photo-1473615695634-bfd05d49cb7f?w=800&q=85', caption: 'Greek Island Coast', aspect: 'tall' },
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', caption: 'Mediterranean Sea', aspect: 'wide' },
];

export default function MediterraneanDestinationPage() {
  const [activeSeason, setActiveSeason] = useState(0);
  const [activePort, setActivePort] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const season = SEASONS[activeSeason];
  const port = PORTS[activePort];

  return (
    <>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Destinations', href: '/destinations' }, { name: 'Mediterranean' }]} />
      <section style={{ position: 'relative', height: 'clamp(360px, 70vh, 640px)', minHeight: 360, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.15) 0%, rgba(13,27,42,0.75) 100%)' }} />
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: 'clamp(80px, 10vw, 92px)', left: 'clamp(16px, 5vw, 32px)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', textDecoration: 'none', letterSpacing: '0.08em' }}>Destinations</Link>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>›</span>
          <span style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>Mediterranean</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 clamp(16px, 5vw, 32px) clamp(32px, 5vw, 64px)', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, alignItems: 'flex-start' }}>
            <div>
              <div className="overline" style={{ color: 'var(--gold)', marginBottom: 16 }}>Destination Guide</div>
              <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, color: 'white', lineHeight: 1, marginBottom: 16, letterSpacing: '-0.02em' }}>Mediterranean</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>Ancient ruins, blue-domed churches, pasta on a Roman terrace, and Adriatic sunsets. A Mediterranean cruise is a floating history lesson through 3,000 years of civilization — with extraordinary food at every port.</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/request-quote?destination=Mediterranean&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none' }}>Plan My Mediterranean Trip</Link>
                <Link href="/cruises?destination=Mediterranean" style={{ padding: '12px 24px', border: '1px solid rgba(255,255,255,0.3)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>View Cruises</Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }}>
              {[{ label: 'Best Season', value: 'May–Jun & Sep' }, { label: 'Cruise Length', value: '7–14 nights' }, { label: 'From Southeast US', value: '9–11 hour flight' }, { label: 'Currency', value: 'Euro (most countries)' }].map((f, i) => (
                <div key={i} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: 12 }}>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: '0.82rem', color: 'white' }}>{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'white', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'center' }}>
          <div>
            <div className="overline" style={{ marginBottom: 16 }}>Why the Mediterranean</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2, marginBottom: 24 }}>Three Thousand Years of Civilization, One Incredible Voyage</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 20 }}>The Mediterranean Sea has been the center of Western civilization for three millennia. A single 10-night cruise can visit the ruins of Rome, the temples of Athens, the mosques of Istanbul, and the Baroque architecture of Malta — covering more human history than most people see in a lifetime. And then there\'s the food.</p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 32 }}>The Eastern Mediterranean covers Greece, Turkey, and the Adriatic. The Western Med spans Italy, France, Spain, and Gibraltar. Most 7-night sailings focus on one region; 10–14 night voyages can connect them. We recommend at least 10 nights to do the region justice.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 16 }}>
              {[{ num: '21', label: 'Countries on the Med Coast' }, { num: '46,000', label: 'Miles of Coastline' }, { num: '3,000+', label: 'Years of Recorded History' }, { num: '5', label: 'UNESCO Sites per Average Cruise' }].map((s, i) => (
                <div key={i} style={{ padding: '20px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
                  <div className="font-display" style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--slate)', letterSpacing: '0.06em', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', height: 500 }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '80%', height: '65%', backgroundImage: 'url(https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '65%', height: '50%', backgroundImage: 'url(https://images.unsplash.com/photo-1555990793-da11153b4879?w=800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', border: '6px solid white' }} />
            <div style={{ position: 'absolute', bottom: 60, right: -10, background: 'var(--navy)', padding: '12px 18px', zIndex: 2 }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>UNESCO World Heritage</div>
              <div style={{ fontSize: '0.82rem', color: 'white', marginTop: 2 }}>5+ Sites per Average Cruise</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '64px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 5vw, 32px)', marginBottom: 36 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Gallery</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'white' }}>The Mediterranean in Every Light</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 180px), 1fr))', gap: 4, padding: '0 4px' }}>
          {GALLERY.map((img, i) => (<div key={i} onClick={() => setGalleryOpen(i)} style={{ cursor: 'pointer', overflow: 'hidden', position: 'relative', gridColumn: img.aspect === 'wide' ? 'span 2' : 'span 1', height: img.aspect === 'tall' ? 400 : 280 }}><img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')} onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} /><div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(13,27,42,0.7))', padding: '24px 16px 12px' }}><span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em' }}>{img.caption}</span></div></div>))}
        </div>
        {galleryOpen !== null && (<div onClick={() => setGalleryOpen(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, cursor: 'pointer' }}><img src={GALLERY[galleryOpen].url.replace('w=800', 'w=1400').replace('w=1200', 'w=1800')} alt={GALLERY[galleryOpen].caption} style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} /><div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{GALLERY[galleryOpen].caption} · Click to close</div></div>)}
      </section>

      <section style={{ background: 'white', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}><div className="overline" style={{ marginBottom: 12 }}>Shore Excursions</div><h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>Top Mediterranean Ports of Call</h2></div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, overflowX: 'auto', paddingBottom: 4 }}>
            {PORTS.map((p, i) => (<button key={i} onClick={() => setActivePort(i)} style={{ padding: '10px 16px', border: '1px solid', whiteSpace: 'nowrap', borderColor: activePort === i ? 'var(--navy)' : 'rgba(13,27,42,0.15)', background: activePort === i ? 'var(--navy)' : 'white', color: activePort === i ? 'white' : 'var(--slate)', fontSize: '0.75rem', letterSpacing: '0.06em', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s' }}>{p.name.split(',')[0]}</button>))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'start' }}>
            <div style={{ position: 'relative', height: 440, overflow: 'hidden' }}>
              <img src={port.image} alt={port.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(13,27,42,0.8))', padding: '32px 24px 20px' }}>
                <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'white', marginBottom: 4 }}>{port.name}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--gold)', letterSpacing: '0.06em' }}>{port.tagline}</p>
              </div>
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.92rem', marginBottom: 28 }}>{port.description}</p>
              <div className="overline" style={{ marginBottom: 14, fontSize: '0.6rem' }}>Must-Do in {port.name.split(',')[0]}</div>
              {port.mustDo.map((item, i) => (<div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)', marginBottom: 8 }}><span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600 }}>0{i + 1}</span><span style={{ fontSize: '0.875rem', color: 'var(--navy)' }}>{item}</span></div>))}
              <Link href={`/request-quote?destination=Mediterranean+${port.name.split(',')[0]}&trip_type=Cruise+Vacation`} className="btn-navy" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 8 }}>Plan This Port Visit</Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--cream)', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}><div className="overline" style={{ marginBottom: 12 }}>When to Go</div><h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>Mediterranean by Season</h2></div>
          <div style={{ display: 'flex', gap: 0, marginBottom: 40, borderBottom: '1px solid rgba(13,27,42,0.1)', overflowX: 'auto' }}>
            {SEASONS.map((s, i) => (<button key={i} onClick={() => setActiveSeason(i)} style={{ flex: 1, minWidth: 100, padding: '16px 20px', background: 'none', border: 'none', borderBottom: activeSeason === i ? `3px solid ${s.color}` : '3px solid transparent', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' }}><div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{s.icon}</div><div style={{ fontSize: '0.78rem', fontWeight: activeSeason === i ? 600 : 400, color: activeSeason === i ? 'var(--navy)' : 'var(--slate)', letterSpacing: '0.06em', fontFamily: 'var(--font-body)' }}>{s.name}</div><div style={{ fontSize: '0.65rem', color: 'var(--slate)' }}>{s.months}</div></button>))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 4vw, 48px)' }}>
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
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>September is our top pick for the Mediterranean — perfect weather, manageable crowds, and the harvest season adds outstanding food and wine experiences to every port.</p>
                <Link href="/request-quote?destination=Mediterranean&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '0.75rem', padding: '10px 20px' }}>Plan {season.name} Mediterranean Trip</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(48px, 7vw, 80px) clamp(16px, 5vw, 32px)', background: 'var(--navy)', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Ready for the Mediterranean?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>History, Culture & Cuisine Await</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 36 }}>The Mediterranean requires planning — popular sites sell out months in advance. Our specialists know exactly how to maximize your time in port. No booking fees. Expert guidance from specialists who have been there.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?destination=Mediterranean&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none' }}>Request a Free Quote</Link>
            <Link href="/destinations" style={{ padding: '12px 28px', border: '1px solid rgba(255,255,255,0.25)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>All Destinations</Link>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 900px) { section div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>

      {/* ── SHORE EXCURSIONS ── */}
      <section style={{ background: "var(--cream)", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ViatorSearch
            defaultDestination="mediterranean"
            title="Mediterranean Shore Excursions"
            subtitle="Book tours and activities at every Mediterranean port — snorkeling, city tours, beach breaks, and more"
            showDestinationFilter={false}
          />
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <a href="/excursions" style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--gold)", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>Browse All Destinations →</a>
          </div>
        </div>
      </section>

    </>
  );
}
