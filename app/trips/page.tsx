'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFeaturedTrips } from '@/lib/supabase';
import type { FeaturedTrip } from '@/lib/supabase';

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Caribbean', value: 'Caribbean' },
  { label: 'Mediterranean', value: 'Mediterranean' },
  { label: 'Alaska', value: 'Alaska' },
  { label: 'All-Inclusive', value: 'All-Inclusive' },
  { label: 'Family', value: 'Family' },
  { label: 'Europe', value: 'Europe' },
  { label: 'Mexico', value: 'Mexico' },
];

export default function TripsPage() {
  const [trips, setTrips] = useState<FeaturedTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    getFeaturedTrips()
      .then(setTrips)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'all'
    ? trips
    : trips.filter(t => t.trip_type === activeCategory);

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="overline animate-fade-up" style={{ marginBottom: 16 }}>Featured Vacations</div>
          <h1 className="font-display animate-fade-up delay-100" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
            Curated Trips
          </h1>
          <p className="animate-fade-up delay-200" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: 500, lineHeight: 1.75 }}>
            Hand-picked vacations curated by our travel specialists — ready for you to book.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{ background: 'white', borderBottom: '1px solid #eee', position: 'sticky', top: 72, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setActiveCategory(c.value)}
              style={{
                padding: '16px 24px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeCategory === c.value ? '2px solid var(--gold)' : '2px solid transparent',
                color: activeCategory === c.value ? 'var(--navy)' : 'var(--slate)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-body)',
                fontWeight: activeCategory === c.value ? 500 : 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Trips Grid */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ background: 'white', height: 480, opacity: 0.5 }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: 'var(--slate)', fontSize: '1rem', marginBottom: 24 }}>No trips found in this category.</p>
              <button onClick={() => setActiveCategory('all')} className="btn-primary">View All Trips</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
              {filtered.map(trip => (
                <article key={trip.id} className="card-hover" style={{ background: 'white', overflow: 'hidden' }}>
                  {/* Image */}
                  <div style={{ position: 'relative', height: 240 }}>
                    <div style={{
                      width: '100%', height: '100%',
                      backgroundImage: `url(${trip.cover_image_url || 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=700&q=80'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                    {trip.popular && (
                      <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--gold)', padding: '4px 12px' }}>
                        <span style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)' }}>Popular</span>
                      </div>
                    )}
                    {trip.starting_from && (
                      <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(13,27,42,0.85)', padding: '6px 14px', backdropFilter: 'blur(4px)' }}>
                        <span style={{ fontSize: '0.7rem', color: 'white', letterSpacing: '0.08em' }}>From <strong style={{ color: 'var(--gold)' }}>{trip.starting_from}</strong> / person</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--navy)' }}>{trip.trip_name}</h3>
                      {trip.duration && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--slate)', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', paddingLeft: 8 }}>{trip.duration}</span>
                      )}
                    </div>

                    {trip.description && (
                      <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{trip.description}</p>
                    )}

                    {/* Highlights */}
                    {trip.highlights && trip.highlights.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                        {trip.highlights.map(h => (
                          <span key={h} style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'var(--cream)', color: 'var(--slate)', letterSpacing: '0.05em' }}>{h}</span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/request-quote?destination=${encodeURIComponent(trip.destination)}&trip_type=${encodeURIComponent(trip.trip_type || 'Cruise Vacation')}&trip_name=${encodeURIComponent(trip.trip_name)}`}
                      className="btn-navy"
                      style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}
                    >
                      Request This Trip
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
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
