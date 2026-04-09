'use client';
import { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from "@/components/Breadcrumb";
import ViatorSearch from "@/components/ViatorSearch";

const PORTS = [
  { name: 'St. Thomas, USVI', tagline: 'Duty-Free Shopping & World-Class Diving', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=85', description: 'The most visited US Virgin Island offers an extraordinary combination of duty-free shopping in Charlotte Amalie, pristine beaches, and some of the best snorkeling in the Caribbean. Magens Bay is consistently rated one of the world\'s most beautiful beaches. The views from Drake\'s Seat — a hillside overlook — are breathtaking.', mustDo: ['Magens Bay Beach', 'Coral World Ocean Park', 'Trunk Bay snorkeling (St. John, 20min ferry)', 'Charlotte Amalie duty-free shopping', 'Skyride to Paradise Point', 'Hassel Island hiking'] },
  { name: 'Barbados', tagline: 'The Platinum Coast & Rum Punch', image: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&q=85', description: 'Barbados is different from every other Caribbean island — more prosperous, more manicured, with a distinctive Bajan culture that blends British heritage with vibrant Caribbean spirit. The Platinum Coast (west side) has calm, clear water. The south coast has the nightlife. The east coast has dramatic Atlantic surf.', mustDo: ['Harrison\'s Cave stalactite system', 'Animal Flower Cave sea cave', 'Oistins Fish Fry (Friday nights)', 'Bridgetown rum distillery tour', 'Carlisle Bay snorkeling', 'Crop Over Festival (if visiting July–August)'] },
  { name: 'Aruba', tagline: 'One Happy Island Beyond the Hurricane Belt', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=85', description: 'Aruba sits outside the hurricane belt and gets 360 days of sunshine a year. Eagle Beach is one of the Caribbean\'s finest — wide, white, uncrowded. The island\'s Dutch heritage shows in the colorful architecture of Oranjestad. Constant trade winds make Aruba a world-class destination for kiteboarding and windsurfing.', mustDo: ['Eagle Beach (consistently top-ranked Caribbean beach)', 'Natural Pool jeep tour', 'Arikok National Park off-road', 'California Lighthouse sunset', 'Renaissance Island private beach', 'Casibari rock formations'] },
  { name: 'St. Lucia', tagline: 'The Pitons & Rainforest Adventure', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=85', description: 'St. Lucia is the most dramatically beautiful island in the Caribbean. The twin volcanic Pitons — UNESCO World Heritage Sites — rise 2,600 feet from the sea. A drive-in volcano lets you get within meters of bubbling sulfur pools. The rainforest interior is lush and largely unexplored, with waterfalls, zip lines, and rare parrots.', mustDo: ['Piton Mountains hiking or boat tour', 'Sulphur Springs drive-in volcano', 'Anse Chastanet reef snorkeling', 'Jungle zip-lining at Treetop Adventure', 'Marigot Bay (a film location for Doctor Doolittle)', 'Diamond Botanical Gardens & waterfall'] },
  { name: 'Curaçao', tagline: 'Dutch Colonial Charm & Vibrant Reefs', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=85', description: 'Willemstad, Curaçao\'s capital, is a UNESCO World Heritage Site — a rainbow of Dutch colonial architecture lining the harbor in one of the most photogenic streetscapes in the Caribbean. The island sits outside the hurricane belt and has exceptional shore diving right from the beach at dozens of sites.', mustDo: ['Willemstad Handelskade waterfront walk', 'Queen Emma Pontoon Bridge crossing', 'Hato Caves & flamingo colony', 'Klein Curaçao snorkeling day trip', 'Shete Boka National Park blowhole', 'Curaçao Liqueur Distillery tour'] },
];

const SEASONS = [
  { name: 'Winter', months: 'Dec – Feb', icon: '🌴', temp: '75–82°F', crowd: 'Peak', color: '#60a5fa', highlight: 'Best weather, peak season', description: 'Prime time for the Caribbean. Dry, sunny, and breezy. Hurricane season is over and the trade winds keep everything comfortable. Book 4–6 months in advance for the best cabins and pricing.', events: [{ name: 'St. Kitts Music Festival', location: 'St. Kitts', when: 'Late June' }, { name: 'Barbados Jazz Festival', location: 'Bridgetown', when: 'January' }, { name: 'St. Barts New Year\'s Regatta', location: 'Gustavia', when: 'January 1' }], activities: ['Beach & watersports in ideal conditions', 'Whale watching season begins', 'Sailing & yacht charters', 'All inclusive resort stays', 'New Year cruises'] },
  { name: 'Spring', months: 'Mar – May', icon: '🌺', temp: '78–84°F', crowd: 'High', color: '#4ade80', highlight: 'Spring break & warm seas', description: 'Water temperature peaks in spring. Spring break brings energy and crowds in March–April. May is an excellent value month — schools return and prices drop before hurricane season.', events: [{ name: 'Antigua Sailing Week', location: 'Antigua', when: 'Late April' }, { name: 'Reggae Sumfest', location: 'Montego Bay, Jamaica', when: 'July (bookings start)' }, { name: 'St. Lucia Jazz Festival', location: 'Castries', when: 'May' }], activities: ['Spring break celebrations', 'Diving (visibility excellent)', 'Carnival season (various islands)', 'May deals on 7-night sailings', 'Turtle nesting season begins'] },
  { name: 'Summer', months: 'Jun – Aug', icon: '☀️', temp: '82–88°F', crowd: 'Medium', color: '#fbbf24', highlight: 'Family season & best deals', description: 'Hurricane season technically runs June–November, but the early months are usually fine. Summer brings family cruise deals and the Caribbean\'s famous carnival celebrations.', events: [{ name: 'Crop Over Festival', location: 'Barbados', when: 'July–August' }, { name: 'Carnival', location: 'Trinidad & Grenada', when: 'August' }, { name: 'Emancipation Day Celebrations', location: 'Various islands', when: 'August 1' }], activities: ['Family cruise deals', 'Carnival festivities', 'Water sports peak season', 'Sea turtle hatching', 'Festival season across islands'] },
  { name: 'Fall', months: 'Sep – Nov', icon: '🌊', temp: '80–86°F', crowd: 'Low', color: '#f97316', highlight: 'Best prices, shoulder season', description: 'Hurricane risk is highest September–October, but many cruises still sail with itinerary flexibility. November is excellent — hurricane season ends, prices drop, and the islands are quiet and gorgeous.', events: [{ name: 'Pirates Week Festival', location: 'Cayman Islands', when: 'October' }, { name: 'St. Martin Heineken Regatta', location: 'St. Martin', when: 'March (book now)' }, { name: 'Divali Celebrations', location: 'Trinidad & Tobago', when: 'October–November' }], activities: ['Best annual pricing', 'Uncrowded beaches', 'Fishing tournaments', 'Kiteboarding season (wind picks up)', 'Pre-holiday cruise deals'] },
];

const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85', caption: 'Caribbean Beach', aspect: 'wide' },
  { url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=85', caption: 'St. Thomas, USVI', aspect: 'tall' },
  { url: 'https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&q=85', caption: 'Barbados Coastline', aspect: 'square' },
  { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=85', caption: 'St. Lucia Pitons', aspect: 'square' },
  { url: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=85', caption: 'Curaçao Harbour', aspect: 'tall' },
  { url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85', caption: 'Caribbean Waters', aspect: 'wide' },
];

export default function CaribbeanDestinationPage() {
  const [activeSeason, setActiveSeason] = useState(0);
  const [activePort, setActivePort] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);
  const season = SEASONS[activeSeason];
  const port = PORTS[activePort];

  return (
    <>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Destinations', href: '/destinations' }, { name: 'Caribbean' }]} />
      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(360px, 70vh, 640px)', minHeight: 360, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.15) 0%, rgba(13,27,42,0.75) 100%)' }} />
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: 'clamp(80px, 10vw, 92px)', left: 'clamp(16px, 5vw, 32px)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', textDecoration: 'none', letterSpacing: '0.08em' }}>Destinations</Link>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>›</span>
          <span style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>Caribbean</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 clamp(16px, 5vw, 32px) clamp(32px, 5vw, 64px)', maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, alignItems: 'flex-start' }}>
            <div>
              <div className="overline" style={{ color: 'var(--gold)', marginBottom: 16 }}>Destination Guide</div>
              <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, color: 'white', lineHeight: 1, marginBottom: 16, letterSpacing: '-0.02em' }}>Caribbean</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
                The world's most beloved cruise destination. 7,000 islands spread across turquoise water from the Florida Keys to the coast of Venezuela — each with its own culture, cuisine, and coastline.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/request-quote?destination=Caribbean&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none' }}>Plan My Caribbean Trip</Link>
                <Link href="/cruises?destination=Caribbean" style={{ padding: '12px 24px', border: '1px solid rgba(255,255,255,0.3)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>View Cruises</Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }}>
              {[{ label: 'Best Season', value: 'Dec – April' }, { label: 'Cruise Length', value: '3–14 nights' }, { label: 'From Southeast US', value: '2–4 hour flight' }, { label: 'Water Temp', value: '78–84°F year-round' }].map((f, i) => (
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
            <div className="overline" style={{ marginBottom: 16 }}>Why the Caribbean</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2, marginBottom: 24 }}>The World's Most Popular Cruise Region — For Good Reason</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 20 }}>
              The Caribbean offers more variety than any other cruise destination. Beach lovers find powder-white sand and warm, calm water. History buffs explore sugar plantation ruins and colonial fortresses. Divers access some of the world's richest coral reef systems. Foodies indulge in some of the most distinctive cuisines in the world.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: 32 }}>
              The Western Caribbean (Cozumel, Roatán, Belize) offers Mayan ruins and world-class diving. The Eastern Caribbean (St. Thomas, Barbados, St. Lucia) is upscale, lush, and culturally rich. The Southern Caribbean ventures into the most authentic, least-touristy islands.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 16 }}>
              {[{ num: '7,000+', label: 'Islands in the Caribbean' }, { num: '40+', label: 'Port Cities on Most Itineraries' }, { num: '82°F', label: 'Average Water Temperature' }, { num: '#1', label: 'World\'s Most Cruised Destination' }].map((s, i) => (
                <div key={i} style={{ padding: '20px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
                  <div className="font-display" style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 300, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--slate)', letterSpacing: '0.06em', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', height: 500 }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '80%', height: '65%', backgroundImage: 'url(https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '65%', height: '50%', backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center', border: '6px solid white' }} />
            <div style={{ position: 'absolute', bottom: 60, right: -10, background: 'var(--navy)', padding: '12px 18px', zIndex: 2 }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>34 Million</div>
              <div style={{ fontSize: '0.82rem', color: 'white', marginTop: 2 }}>Cruise passengers annually</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ background: 'var(--navy)', padding: '64px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 5vw, 32px)', marginBottom: 36 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Gallery</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'white' }}>Caribbean Islands in Living Color</h2>
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

      {/* Port Guide */}
      <section style={{ background: 'white', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Shore Excursions</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>Top Caribbean Ports of Call</h2>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, overflowX: 'auto', paddingBottom: 4 }}>
            {PORTS.map((p, i) => (
              <button key={i} onClick={() => setActivePort(i)} style={{ padding: '10px 16px', border: '1px solid', whiteSpace: 'nowrap', borderColor: activePort === i ? 'var(--navy)' : 'rgba(13,27,42,0.15)', background: activePort === i ? 'var(--navy)' : 'white', color: activePort === i ? 'white' : 'var(--slate)', fontSize: '0.75rem', letterSpacing: '0.06em', fontFamily: 'var(--font-body)', cursor: 'pointer', transition: 'all 0.2s' }}>{p.name.split(',')[0]}</button>
            ))}
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
              {port.mustDo.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 16px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)', marginBottom: 8 }}>
                  <span style={{ color: 'var(--gold)', fontSize: '0.75rem', fontWeight: 600 }}>0{i + 1}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--navy)' }}>{item}</span>
                </div>
              ))}
              <Link href={`/request-quote?destination=Caribbean+${port.name.split(',')[0]}&trip_type=Cruise+Vacation`} className="btn-navy" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 8 }}>Plan This Port Visit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Guide */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>When to Go</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>Caribbean by Season</h2>
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
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 16 }}>December through April is peak Caribbean season. Book 4–6 months early for the best cabin selection and pricing on 7-night sailings.</p>
                <Link href="/request-quote?destination=Caribbean&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '0.75rem', padding: '10px 20px' }}>Plan {season.name} Caribbean Trip</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(48px, 7vw, 80px) clamp(16px, 5vw, 32px)', background: 'var(--navy)', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Ready for the Caribbean?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>Your Perfect Caribbean Cruise Awaits</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 36 }}>From first-timers to Caribbean veterans, we know how to match you with the perfect ship, itinerary, and cabin. No booking fees. Just expertise.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?destination=Caribbean&trip_type=Cruise+Vacation" className="btn-primary" style={{ textDecoration: 'none' }}>Request a Free Quote</Link>
            <Link href="/destinations" style={{ padding: '12px 28px', border: '1px solid rgba(255,255,255,0.25)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>All Destinations</Link>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 900px) { section div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>

      {/* ── SHORE EXCURSIONS ── */}
      <section style={{ background: "var(--cream)", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ViatorSearch
            defaultDestination="caribbean"
            title="Caribbean Shore Excursions"
            subtitle="Book tours and activities at every Caribbean port — snorkeling, city tours, beach breaks, and more"
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
