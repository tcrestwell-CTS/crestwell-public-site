'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import CruiseSearch from '@/components/CruiseSearch';

const highlights = [
  { icon: '🌊', title: 'Ocean Cruises', description: 'Caribbean, Mediterranean, Alaska, and beyond — we match you with the right ship and itinerary.' },
  { icon: '🏞️', title: 'River Cruises', description: "Europe's iconic waterways, the Mississippi, and more. Intimate ships, immersive destinations." },
  { icon: '💎', title: 'Luxury Lines', description: 'Silversea, Seabourn, Explora Journeys, Cunard — white-glove service at every port.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Family Cruises', description: 'Disney, Royal Caribbean, and Norwegian — ships packed with activities for every age.' },
  { icon: '🥂', title: 'Adults Only', description: 'Virgin Voyages and boutique lines for couples seeking a more refined onboard experience.' },
  { icon: '🗺️', title: 'World Voyages', description: 'Extended itineraries spanning multiple continents — the ultimate bucket list experience.' },
];

function CruisesContent() {
  const searchParams = useSearchParams();

  // Read any filter params passed from the homepage search
  const initialFilters = {
    destination: searchParams.get('destination') || 'any',
    operator:    searchParams.get('operator')    || 'any',
    cruiseType:  searchParams.get('cruise_type') || 'any',
    duration:    searchParams.get('duration')    || 'any',
    month:       searchParams.get('month')       || 'any',
    year:        searchParams.get('year')        || 'any',
  };

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '80px 32px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', marginBottom: 48, position: 'relative' }} />
        <div style={{ position: 'relative' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Live Availability</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: 20 }}>
            Cruise Vacations
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.75 }}>
            From 3-night getaways to world voyages — real-time pricing and availability from the world's top cruise lines, expertly curated for you.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>Talk to a Specialist</Link>
            <a href="#cruise-search" className="btn-outline" style={{ textDecoration: 'none' }}>Search Cruises</a>
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section style={{ background: 'var(--cream)', padding: '64px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>What We Offer</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>
              Every Type of Cruise, One Expert Team
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {highlights.map((h, i) => (
              <div key={i} style={{ background: 'white', padding: '32px 28px', borderBottom: '3px solid var(--gold)' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: 14 }}>{h.icon}</div>
                <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 10 }}>{h.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cruise Search — pre-populated with any filters from homepage */}
      <div id="cruise-search">
        <CruiseSearch initialFilters={initialFilters} />
      </div>

      {/* CTA */}
      <section style={{ background: 'var(--cream)', padding: '64px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Not Sure Where to Start?</div>
          <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 16 }}>
            Let Us Find the Perfect Cruise for You
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 32 }}>
            Tell us your travel dates, budget, and what matters most — our specialists do the rest.
          </p>
          <Link href="/request-quote?trip_type=Cruise+Vacation" className="btn-navy" style={{ textDecoration: 'none' }}>
            Request a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}

export default function CruisesPage() {
  return (
    <Suspense fallback={<div style={{ background: 'var(--navy)', minHeight: '100vh' }} />}>
      <CruisesContent />
    </Suspense>
  );
}
