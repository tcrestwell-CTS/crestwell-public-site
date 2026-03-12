import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Destinations',
  description: 'Explore cruise destinations and vacation packages — Caribbean, Mediterranean, Alaska, and more.',
};

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Caribbean', value: 'caribbean' },
  { label: 'Mediterranean', value: 'mediterranean' },
  { label: 'Alaska', value: 'alaska' },
  { label: 'All-Inclusive', value: 'all-inclusive' },
  { label: 'Family', value: 'family' },
];

const destinations = [
  {
    name: 'The Bahamas',
    region: 'Caribbean',
    tag: 'caribbean',
    duration: '3–7 nights',
    startingFrom: '$499',
    highlights: ['Nassau', 'Blue Lagoon Island', 'Grand Bahama'],
    description: 'Crystal-clear waters and vibrant island culture just a short sail from Florida. Perfect for first-time cruisers.',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=700&q=80',
    popular: true,
  },
  {
    name: 'Western Caribbean',
    region: 'Caribbean',
    tag: 'caribbean',
    duration: '7–10 nights',
    startingFrom: '$699',
    highlights: ['Cozumel', 'Belize City', 'Roatan'],
    description: 'Ancient ruins, jungle adventures, and turquoise seas across some of the most exciting ports in the Caribbean.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=80',
    popular: true,
  },
  {
    name: 'Eastern Caribbean',
    region: 'Caribbean',
    tag: 'caribbean',
    duration: '7 nights',
    startingFrom: '$749',
    highlights: ['St. Maarten', 'St. Thomas', 'Puerto Rico'],
    description: 'Dutch colonial towns, duty-free shopping, and pristine beaches across the best of the Eastern Caribbean.',
    image: 'https://images.unsplash.com/photo-1520454974749-a436670d3e35?w=700&q=80',
    popular: false,
  },
  {
    name: 'Mediterranean',
    region: 'Europe',
    tag: 'mediterranean',
    duration: '10–14 nights',
    startingFrom: '$1,299',
    highlights: ['Barcelona', 'Santorini', 'Rome'],
    description: 'Explore iconic ports from Barcelona to Athens — breathtaking coastlines, ancient history, and world-class cuisine.',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=700&q=80',
    popular: true,
  },
  {
    name: 'Alaska',
    region: 'North America',
    tag: 'alaska',
    duration: '7 nights',
    startingFrom: '$899',
    highlights: ['Glacier Bay', 'Juneau', 'Ketchikan'],
    description: 'Glaciers, wildlife, and wilderness unlike anywhere on earth. An awe-inspiring experience for every traveler.',
    image: 'https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=700&q=80',
    popular: false,
  },
  {
    name: 'Cancún & Riviera Maya',
    region: 'Mexico',
    tag: 'all-inclusive',
    duration: '5–7 nights',
    startingFrom: '$899',
    highlights: ['Sandos', 'Excellence', 'Secrets'],
    description: 'World-class all-inclusive resorts with pristine beaches, gourmet dining, and unlimited amenities.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=700&q=80',
    popular: true,
  },
  {
    name: 'Disney Vacations',
    region: 'Florida',
    tag: 'family',
    duration: '4–7 nights',
    startingFrom: '$1,199',
    highlights: ['Magic Kingdom', 'EPCOT', 'Disney Cruise Line'],
    description: 'The most magical vacation on earth — theme parks, Disney cruises, and Aulani resort in Hawaii.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700&q=80',
    popular: false,
  },
  {
    name: 'Norwegian Fjords',
    region: 'Europe',
    tag: 'mediterranean',
    duration: '10–12 nights',
    startingFrom: '$1,499',
    highlights: ['Bergen', 'Geiranger', 'Flåm'],
    description: 'Dramatic cliffs, cascading waterfalls, and serene Nordic villages on one of the world\'s most scenic routes.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=700&q=80',
    popular: false,
  },
];

export default function DestinationsPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'var(--navy)',
        paddingTop: 140,
        paddingBottom: 80,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="overline animate-fade-up" style={{ marginBottom: 16 }}>Explore the World</div>
          <h1 className="font-display animate-fade-up delay-100" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
            Destinations
          </h1>
          <p className="animate-fade-up delay-200" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: 500, lineHeight: 1.75 }}>
            From Caribbean escapes to European adventures — we'll find the perfect itinerary for your travel style and budget.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{ background: 'white', borderBottom: '1px solid #eee', position: 'sticky', top: 72, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {categories.map((c) => (
            <button key={c.value} style={{
              padding: '16px 24px',
              background: c.value === 'all' ? 'transparent' : 'transparent',
              border: 'none',
              borderBottom: c.value === 'all' ? '2px solid var(--gold)' : '2px solid transparent',
              color: c.value === 'all' ? 'var(--navy)' : 'var(--slate)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-body)',
              fontWeight: c.value === 'all' ? 500 : 400,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}>
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
            {destinations.map((d, i) => (
              <article key={i} className="card-hover" style={{ background: 'white', overflow: 'hidden' }}>
                {/* Image */}
                <div style={{ position: 'relative', height: 240 }}>
                  <div style={{ width: '100%', height: '100%', backgroundImage: `url(${d.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  {d.popular && (
                    <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--gold)', padding: '4px 12px' }}>
                      <span style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)' }}>Popular</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(13,27,42,0.85)', padding: '6px 14px', backdropFilter: 'blur(4px)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'white', letterSpacing: '0.08em' }}>From <strong style={{ color: 'var(--gold)' }}>{d.startingFrom}</strong> / person</span>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--navy)' }}>{d.name}</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--slate)', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', paddingLeft: 8 }}>{d.duration}</span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{d.description}</p>

                  {/* Port highlights */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                    {d.highlights.map(h => (
                      <span key={h} style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'var(--cream)', color: 'var(--slate)', letterSpacing: '0.05em' }}>{h}</span>
                    ))}
                  </div>

                  <Link href="/request-quote" className="btn-navy" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                    Request This Trip
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: 'var(--navy)', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Don't See What You're Looking For?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
            We Can Take You Anywhere
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 36 }}>
            Our travel specialists have access to thousands of itineraries and deals. Tell us your dream destination and we'll make it happen.
          </p>
          <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>
            Talk to a Specialist
          </Link>
        </div>
      </section>
    </>
  );
}
