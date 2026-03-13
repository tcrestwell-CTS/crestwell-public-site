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
              {trip.notes && (
                <div style={{ marginBottom: 48 }}>
                  <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 20 }}>About This Trip</h2>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{trip.notes}</p>
                </div>
              )}

              {/* Itinerary */}
              {trip.itineraries?.itinerary_items && (trip.itineraries.itinerary_items?.length ?? 0) > 0 && (
                <div>
                  <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0c4a6e', fontFamily: 'Playfair Display, serif', marginBottom: '24px' }}>
                    Day-by-Day Itinerary
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[...(trip.itineraries?.itinerary_items ?? [])]
                      .sort((a: { day_number: number }, b: { day_number: number }) => a.day_number - b.day_number)
                      .map((item: { id: string; day_number: number; title: string; description?: string }) => (
                        <div key={item.id} style={{ display: 'flex', gap: '16px' }}>
                          <div style={{ width: 48, height: 48, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--navy)' }}>Day {item.day_number}</span>
                          </div>
                          <div style={{ flex: 1, paddingTop: 8 }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--navy)', marginBottom: 4 }}>{item.title}</h3>
                            {item.description && (
                              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{item.description}</p>
                            )}
                          </div>
                        </div>
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
                  {trip.depart_date && (
                    <div>
                      <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 4 }}>Departure Date</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 500 }}>
                        {new Date(trip.depart_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  )}
                  {trip.return_date && (
                    <div>
                      <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 4 }}>Return Date</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 500 }}>
                        {new Date(trip.return_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  )}
                  {trip.budget_range && (
                    <div>
                      <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 4 }}>Starting From</div>
                      <div style={{ fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 600 }}>{trip.budget_range}</div>
                    </div>
                  )}
                  {trip.deposit_amount && (
                    <div>
                      <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 4 }}>Deposit</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 500 }}>${trip.deposit_amount.toLocaleString()}</div>
                    </div>
                  )}
                  {trip.tags && trip.tags.length > 0 && (
                    <div>
                      <div style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 8 }}>Tags</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {trip.tags.map(tag => (
                          <span key={tag} style={{ padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', background: '#e0f2fe', color: '#0369a1' }}>{tag}</span>
                        ))}
                      </div>
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
