'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFeaturedTrips } from '@/lib/supabase';
import type { FeaturedTrip } from '@/lib/supabase';
import { TripCard } from '@/components/TripCard';

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

export default function DestinationsPage() {
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
      <section style={{
        background: 'var(--navy)',
        paddingTop: 'clamp(96px, 12vw, 140px)',
        paddingBottom: 'clamp(40px, 6vw, 80px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(18px, 5vw, 32px)' }}>
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
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(8px, 3vw, 32px)', display: 'flex', gap: 0, overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as any}>
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setActiveCategory(c.value)}
              style={{
                padding: 'clamp(12px, 2vw, 16px) clamp(12px, 2.5vw, 24px)',
                background: 'transparent',
                border: 'none',
                borderBottom: activeCategory === c.value ? '2px solid var(--gold)' : '2px solid transparent',
                color: activeCategory === c.value ? 'var(--navy)' : 'var(--slate)',
                fontSize: 'clamp(0.68rem, 2vw, 0.75rem)',
                fontFamily: 'var(--font-body)',
                fontWeight: activeCategory === c.value ? 500 : 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} style={{ background: 'white', height: 480, opacity: 0.4 }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: 'var(--slate)', fontSize: '1rem', marginBottom: 24 }}>No destinations found in this category.</p>
              <button onClick={() => setActiveCategory('all')} className="btn-primary">View All Destinations</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
              {filtered.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(48px, 7vw, 80px) clamp(18px, 5vw, 32px)', textAlign: 'center' }}>
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
