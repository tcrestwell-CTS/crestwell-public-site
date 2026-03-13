import { getFeaturedTrip } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = await getFeaturedTrip(id).catch(() => null);

  if (!trip) notFound();

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: trip.cover_image_url
            ? `url(${trip.cover_image_url})`
            : 'url(https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          {trip.trip_type && (
            <div className="overline animate-fade-up" style={{ marginBottom: 16 }}>{trip.trip_type}</div>
          )}
          <h1 className="font-display animate-fade-up delay-100" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 16 }}>
            {trip.trip_name}
          </h1>
          <p className="animate-fade-up delay-200" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', marginBottom: 32 }}>
            {trip.destination}
          </p>
          <Link
            href={`/request-quote?destination=${encodeURIComponent(trip.destination)}&trip_type=${encodeURIComponent(trip.trip_type || 'Cruise Vacation')}&trip_name=${encodeURIComponent(trip.trip_name)}`}
            className="btn-primary animate-fade-up delay-300"
            style={{ textDecoration: 'none' }}
          >
            Request a Quote
          </Link>
        </div>
      </section>

      {/* Trip Details */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'start' }}>

            {/* Main content */}
            <div>
              {trip.description && (
                <div style={{ marginBottom: 48 }}>
                  <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 20 }}>About This Trip</h2>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{trip.description}</p>
                </div>
              )}

              {/* Highlights */}
              {trip.highlights && trip.highlights.length > 0 && (
                <div style={{ marginBottom: 48 }}>
                  <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 20 }}>Port Highlights</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {trip.highlights.map(h => (
                      <span key={h} style={{ fontSize: '0.85rem', padding: '8px 16px', background: 'white', color: 'var(--navy)', border: '1px solid #e2e8f0', letterSpacing: '0.05em' }}>{h}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div style={{ position: 'sticky', top: 100 }}>
              <div style={{ background: 'white', padding: '32px', boxShadow: '0 4px 40px rgba(13,27,42,0.06)' }}>
                <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 24 }}>Trip Summary</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
                  {trip.destination && (
                    <div>
                      <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 4 }}>Destination</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 500 }}>{trip.destination}</div>
                    </div>
                  )}
                  {trip.duration && (
                    <div>
                      <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 4 }}>Duration</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 500 }}>{trip.duration}</div>
                    </div>
                  )}
                  {trip.starting_from && (
                    <div>
                      <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 4 }}>Starting From</div>
                      <div style={{ fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 600 }}>{trip.starting_from} / person</div>
                    </div>
                  )}
                  {trip.popular && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ background: 'var(--gold)', padding: '4px 12px', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)' }}>Popular Trip</span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/request-quote?destination=${encodeURIComponent(trip.destination)}&trip_type=${encodeURIComponent(trip.trip_type || 'Cruise Vacation')}&trip_name=${encodeURIComponent(trip.trip_name)}`}
                  className="btn-primary"
                  style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}
                >
                  Request a Quote
                </Link>

                <p style={{ fontSize: '0.75rem', color: 'var(--slate)', textAlign: 'center', marginTop: 12, lineHeight: 1.6 }}>
                  Free consultation · No booking fees · 24hr response
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <section style={{ background: 'white', padding: '32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Link href="/trips" style={{ color: 'var(--slate)', fontSize: '0.85rem', textDecoration: 'none', letterSpacing: '0.05em' }}>
            ← Back to All Trips
          </Link>
        </div>
      </section>
    </>
  );
}
