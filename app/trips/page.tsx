'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFeaturedTrips } from '@/lib/supabase';
import type { FeaturedTrip } from '@/lib/supabase';

export default function TripsPage() {
  const [trips, setTrips] = useState<FeaturedTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getFeaturedTrips()
      .then(data => {
        setTrips(data);
        const unique = Array.from(new Set(data.map((t: FeaturedTrip) => t.destination))).sort() as string[];
        setDestinations(unique);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = trips.filter(t => {
    const matchDest = selectedDestination === 'all' || t.destination === selectedDestination;
    const matchSearch = !search || t.trip_name.toLowerCase().includes(search.toLowerCase()) || t.destination.toLowerCase().includes(search.toLowerCase());
    return matchDest && matchSearch;
  });

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

      {/* Filters */}
      <section style={{ background: 'white', borderBottom: '1px solid #eee', padding: '16px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search trips..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '10px 16px', border: '1px solid #e2e8f0', fontSize: '0.875rem', fontFamily: 'var(--font-body)', outline: 'none', minWidth: 220 }}
          />
          <select
            value={selectedDestination}
            onChange={e => setSelectedDestination(e.target.value)}
            style={{ padding: '10px 16px', border: '1px solid #e2e8f0', fontSize: '0.875rem', fontFamily: 'var(--font-body)', outline: 'none', background: 'white' }}
          >
            <option value="all">All Destinations</option>
            {destinations.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          {(search || selectedDestination !== 'all') && (
            <button
              onClick={() => { setSearch(''); setSelectedDestination('all'); }}
              style={{ padding: '10px 16px', background: 'none', border: '1px solid #e2e8f0', fontSize: '0.875rem', fontFamily: 'var(--font-body)', cursor: 'pointer', color: 'var(--slate)' }}
            >
              Clear Filters
            </button>
          )}
        </div>
      </section>

      {/* Trips Grid */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} style={{ background: 'white', height: 420, animation: 'pulse 1.5s infinite' }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: 'var(--slate)', fontSize: '1rem' }}>No trips found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 28 }}>
              {filtered.map(trip => (
                <article key={trip.id} className="card-hover" style={{ background: 'white', overflow: 'hidden' }}>
                  {/* Cover Image */}
                  <div style={{ position: 'relative', height: 240 }}>
                    <div style={{
                      width: '100%', height: '100%',
                      backgroundImage: trip.cover_image_url ? `url(${trip.cover_image_url})` : 'url(https://images.unsplash.com/photo-1548574505-5e239809ee19?w=700&q=80)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                    {trip.budget_range && (
                      <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(13,27,42,0.85)', padding: '6px 14px', backdropFilter: 'blur(4px)' }}>
                        <span style={{ fontSize: '0.7rem', color: 'white', letterSpacing: '0.08em' }}>
                          <strong style={{ color: 'var(--gold)' }}>{trip.budget_range}</strong>
                        </span>
                      </div>
                    )}
                    {trip.trip_type && (
                      <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--gold)', padding: '4px 12px' }}>
                        <span style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)' }}>{trip.trip_type}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--navy)' }}>{trip.trip_name}</h3>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--slate)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 }}>{trip.destination}</p>

                    {trip.depart_date && (
                      <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                        Departs: <strong>{new Date(trip.depart_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>
                      </p>
                    )}

                    {trip.tags && trip.tags.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                        {trip.tags.slice(0, 3).map(tag => (
                          <span key={tag} style={{ padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', background: '#e0f2fe', color: '#0369a1' }}>{tag}</span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 10 }}>
                      <Link
                        href={`/trips/${trip.id}`}
                        className="btn-navy"
                        style={{ textDecoration: 'none', flex: 1, textAlign: 'center', fontSize: '0.8rem' }}
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/request-quote?destination=${encodeURIComponent(trip.destination)}&trip_type=${encodeURIComponent(trip.trip_type || 'Cruise Vacation')}&trip_name=${encodeURIComponent(trip.trip_name)}`}
                        className="btn-primary"
                        style={{ textDecoration: 'none', flex: 1, textAlign: 'center', fontSize: '0.8rem' }}
                      >
                        Request Quote
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Don't See What You're Looking For?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
            We Can Plan Anything
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 36 }}>
            Our specialists have access to thousands of itineraries. Tell us your dream trip and we'll make it happen.
          </p>
          <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>
            Request a Custom Quote
          </Link>
        </div>
      </section>
    </>
  );
}
