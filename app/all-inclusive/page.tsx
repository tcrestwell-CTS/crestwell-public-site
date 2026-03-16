import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All-Inclusive Resorts',
  description: 'Sandals, Secrets, Beaches, and more. Crestwell Travel Services specializes in all-inclusive resort packages for families, couples, and groups.',
};

const resorts = [
  {
    name: 'Sandals Resorts',
    tag: 'Couples Only',
    description: 'The gold standard in luxury couples-only all-inclusive vacations. 15 resorts across the Caribbean featuring gourmet dining, unlimited premium spirits, and world-class dive programs.',
    destinations: ['Jamaica', 'Barbados', 'St. Lucia', 'Bahamas', 'Grenada', 'Curaçao', 'Antigua'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    name: 'Beaches Resorts',
    tag: 'Family',
    description: 'The family version of Sandals — everything included for the whole family. Waterparks, kids camps, teen activities, and the best beaches in the Caribbean.',
    destinations: ['Turks & Caicos', 'Jamaica'],
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&q=80',
  },
  {
    name: 'Secrets Resorts & Spas',
    tag: 'Adults Only',
    description: 'Sophisticated adults-only escapes with unlimited luxury, gourmet dining, and world-class spas. Perfect for romantic getaways and honeymoons.',
    destinations: ['Mexico', 'Jamaica', 'Dominican Republic', 'Costa Rica', 'Panama'],
    image: 'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2021/10/20/1606/SEMRC-P0001-Aerial-Pools.jpg/SEMRC-P0001-Aerial-Pools.16x9.jpg',
  },
  {
    name: 'Excellence Resorts',
    tag: 'Adults Only',
    description: 'Premium adults-only resorts featuring swim-up suites, gourmet restaurants, and pristine beachfront locations throughout Mexico and the Caribbean.',
    destinations: ['Mexico', 'Dominican Republic', 'Jamaica'],
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
  },
  {
    name: 'Dreams Resorts & Spas',
    tag: 'Family',
    description: 'Unlimited-Luxury® vacations for the whole family. All meals, premium drinks, activities, and entertainment included — nothing extra to pay.',
    destinations: ['Mexico', 'Dominican Republic', 'Panama', 'Costa Rica'],
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
  },
  {
    name: 'Moon Palace Resorts',
    tag: 'Family',
    description: 'One of the largest all-inclusive resorts in Mexico — sprawling pools, multiple beaches, and endless activities for every age and interest.',
    destinations: ['Cancún', 'Jamaica'],
    image: 'https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=800&q=80',
  },
];

const included = [
  { icon: '🍽️', label: 'All Meals & Dining' },
  { icon: '🍹', label: 'Unlimited Drinks' },
  { icon: '🏊', label: 'Pools & Beach Access' },
  { icon: '🎭', label: 'Nightly Entertainment' },
  { icon: '🤿', label: 'Water Sports & Activities' },
  { icon: '💆', label: 'Fitness & Wellness' },
  { icon: '👶', label: 'Kids Clubs (family resorts)' },
  { icon: '🛎️', label: 'Butler Service (select rooms)' },
];

export default function AllInclusivePage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '80px 32px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18 }} />
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', marginBottom: 48, position: 'relative' }} />
        <div style={{ position: 'relative' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Nothing Extra to Pay</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: 20 }}>
            All-Inclusive Resorts
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.75 }}>
            Sandals, Secrets, Beaches, and more. Unlimited dining, premium drinks, activities, and entertainment — all included. We handle every detail.
          </p>
          <Link href="/request-quote?trip_type=All-Inclusive+Resort" className="btn-primary" style={{ textDecoration: 'none' }}>
            Request a Free Quote
          </Link>
        </div>
      </section>

      {/* What's Included */}
      <section style={{ background: 'white', padding: '64px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="overline" style={{ marginBottom: 12 }}>What's Included</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>
              Everything. No Surprises.
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {included.map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '14px 24px',
                background: 'var(--cream)',
                border: '1px solid rgba(201,168,76,0.2)',
              }}>
                <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--navy)', letterSpacing: '0.02em' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resort Cards */}
      <section style={{ background: 'var(--cream)', padding: '64px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Featured Brands</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>
              Top All-Inclusive Collections
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
            {resorts.map((resort, i) => (
              <div key={i} style={{ background: 'white', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  height: 200,
                  backgroundImage: `url(${resort.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}>
                  <div style={{ position: 'absolute', top: 14, left: 14, background: 'var(--gold)', padding: '4px 12px' }}>
                    <span style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)' }}>{resort.tag}</span>
                  </div>
                </div>
                <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 10 }}>{resort.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 16 }}>{resort.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                    {resort.destinations.map(d => (
                      <span key={d} style={{ fontSize: '0.7rem', padding: '3px 10px', background: 'var(--cream)', color: 'var(--navy)', letterSpacing: '0.05em' }}>{d}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <Link
                      href={`/request-quote?trip_type=All-Inclusive+Resort&destination=${encodeURIComponent(resort.name)}`}
                      style={{
                        display: 'inline-block',
                        padding: '10px 24px',
                        background: 'var(--navy)',
                        color: 'white',
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-body)',
                        transition: 'background 0.2s',
                      }}
                    >
                      Get a Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why book with us */}
      <section style={{ background: 'var(--navy)', padding: '64px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Why Book With Us</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
            We're Certified Resort Specialists
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.85, marginBottom: 36 }}>
            As ASTA and CLIA certified agents, we have direct relationships with resort brands — meaning better room categories, perks, and pricing than booking direct. We match you with the right resort for your travel style, handle all the details, and are available before, during, and after your trip.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?trip_type=All-Inclusive+Resort" className="btn-primary" style={{ textDecoration: 'none' }}>Start Planning</Link>
            <Link href="/contact" className="btn-outline" style={{ textDecoration: 'none' }}>Talk to an Agent</Link>
          </div>
        </div>
      </section>
    </>
  );
}
