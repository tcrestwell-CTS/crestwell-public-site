'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// ─── Types ────────────────────────────────────────────────────────────────────

type ItineraryDay = {
  day: number;
  title: string;
  location?: string;
  description?: string;
  highlights?: string[];
  accommodation?: string;
  meals?: string[];
};

type FeaturedTripDetail = {
  id: string;
  slug: string;
  trip_name: string;
  destination: string;
  tagline: string | null;
  overview: string | null;
  description: string | null;
  trip_type: string | null;
  duration: string | null;
  starting_from: string | null;
  group_size: string | null;
  difficulty: string | null;
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  cover_image_url: string | null;
  gallery_images: string[];
  rating: number | null;
  review_count: number;
  popular: boolean;
};

// ─── Star rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14"
          fill={i <= Math.round(rating) ? 'var(--gold)' : 'rgba(201,168,76,0.25)'}>
          <path d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885l-3.09 1.624.59-3.44L2 4.632l3.455-.502z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Itinerary accordion ──────────────────────────────────────────────────────

function ItineraryAccordion({ days }: { days: ItineraryDay[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!days || days.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {days.map((day, i) => (
        <div key={i} style={{ border: '1px solid rgba(13,27,42,0.1)', background: open === i ? 'white' : 'var(--cream)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <div style={{
              minWidth: 44, height: 44, flexShrink: 0,
              background: open === i ? 'var(--navy)' : 'rgba(13,27,42,0.07)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}>
              <span style={{ fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: open === i ? 'var(--gold)' : 'var(--slate)', lineHeight: 1 }}>Day</span>
              <span style={{ fontSize: '1rem', fontWeight: 600, color: open === i ? 'white' : 'var(--navy)', lineHeight: 1.2 }}>{day.day}</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--navy)', fontFamily: 'var(--font-display)' }}>{day.title}</div>
              {day.location && <div style={{ fontSize: '0.72rem', color: 'var(--slate)', letterSpacing: '0.05em', marginTop: 2 }}>{day.location}</div>}
            </div>
            {day.meals && day.meals.length > 0 && (
              <div style={{ display: 'flex', gap: 4, marginRight: 12 }}>
                {day.meals.map(m => (
                  <span key={m} title={m} style={{ fontSize: '0.6rem', padding: '2px 6px', background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {m.slice(0, 1)}
                  </span>
                ))}
              </div>
            )}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
              style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open === i ? 'rotate(180deg)' : 'none' }}>
              <path d="M4 6l4 4 4-4" stroke="var(--slate)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {open === i && (
            <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(13,27,42,0.06)' }}>
              {day.description && (
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.8, margin: '16px 0' }}>
                  {day.description}
                </p>
              )}
              {day.highlights && day.highlights.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: day.accommodation ? 16 : 0 }}>
                  {day.highlights.map((h, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 5, height: 5, background: 'var(--gold)', borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.8rem', color: 'var(--navy)' }}>{h}</span>
                    </div>
                  ))}
                </div>
              )}
              {day.accommodation && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, padding: '10px 14px', background: 'rgba(13,27,42,0.04)', borderLeft: '2px solid var(--gold)' }}>
                  <span>🏨</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--navy)', fontWeight: 500 }}>{day.accommodation}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function TripDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [trip, setTrip] = useState<FeaturedTripDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeGallery, setActiveGallery] = useState(0);

  useEffect(() => {
    if (!id) return;
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    supabase
      .from('featured_trips')
      .select('*')
      .eq('slug', id)
      .eq('published', true)
      .single()
      .then(({ data, error }: { data: FeaturedTripDetail | null; error: any }) => {
        if (!error && data) setTrip(data as FeaturedTripDetail);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ background: 'var(--navy)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading…</div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, paddingTop: 120 }}>
        <div style={{ fontSize: '2rem', opacity: 0.3 }}>🗺️</div>
        <h2 className="font-display" style={{ color: 'var(--navy)', fontWeight: 300 }}>Trip Not Found</h2>
        <Link href="/destinations" className="btn-navy" style={{ textDecoration: 'none' }}>Browse Destinations</Link>
      </div>
    );
  }

  const heroImage = trip.cover_image_url || 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1800&q=80';
  const gallery = trip.gallery_images?.length > 0 ? trip.gallery_images : [];

  const quoteParams = new URLSearchParams({
    trip_name: trip.trip_name,
    destination: trip.destination,
    trip_type: trip.trip_type || '',
    duration: trip.duration || '',
  });

  const stats = [
    trip.duration     && { icon: '📅', label: 'Duration',     value: trip.duration },
    trip.group_size   && { icon: '👥', label: 'Group Size',   value: trip.group_size },
    trip.destination  && { icon: '🗺️', label: 'Destination',  value: trip.destination },
    trip.starting_from && { icon: '💰', label: 'Starting From', value: trip.starting_from },
  ].filter(Boolean) as { icon: string; label: string; value: string }[];

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: 'clamp(360px, 65vh, 600px)', minHeight: 360, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.25) 0%, rgba(13,27,42,0.82) 100%)' }} />

        {/* Breadcrumb */}
        <div style={{ position: 'absolute', top: 'clamp(80px, 10vw, 100px)', left: 'clamp(16px, 5vw, 32px)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', textDecoration: 'none' }}>Destinations</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>›</span>
          <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem' }}>{trip.destination}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>›</span>
          <span style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>{trip.trip_name}</span>
        </div>

        {/* Content */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(24px, 4vw, 48px) clamp(16px, 5vw, 32px)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
              {trip.trip_type && (
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', padding: '3px 10px', border: '1px solid rgba(201,168,76,0.5)' }}>
                  {trip.trip_type}
                </span>
              )}
              {trip.difficulty && (
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', padding: '3px 10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                  {trip.difficulty}
                </span>
              )}
              {trip.popular && (
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)', background: 'var(--gold)', padding: '3px 10px' }}>
                  Popular
                </span>
              )}
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 10 }}>
              {trip.trip_name}
            </h1>
            {trip.tagline && (
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginBottom: 16 }}>{trip.tagline}</p>
            )}
            {trip.rating != null && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <StarRating rating={trip.rating} />
                <span style={{ color: 'white', fontSize: '0.875rem', fontWeight: 500 }}>{trip.rating}</span>
                {trip.review_count > 0 && (
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>({trip.review_count} reviews)</span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      {stats.length > 0 && (
        <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)', display: 'flex', flexWrap: 'wrap' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{
                padding: '20px 0', display: 'flex', alignItems: 'center', gap: 12,
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                padding: 'clamp(14px, 2vw, 20px) clamp(12px, 2vw, 32px)',
                flex: '1 1 140px',
              }}>
                <span style={{ fontSize: '1.2rem' }}>{stat.icon}</span>
                <div>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>{stat.label}</div>
                  <div style={{ fontSize: '0.9rem', color: 'white' }}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div className="trip-detail-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) clamp(16px, 5vw, 32px)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 'clamp(28px, 4vw, 56px)', alignItems: 'start' }}>

        {/* LEFT */}
        <div>

          {/* Overview */}
          {(trip.overview || trip.description) && (
            <section style={{ marginBottom: 52 }}>
              <div className="overline" style={{ marginBottom: 12 }}>Overview</div>
              <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 20 }}>About This Trip</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.9rem' }}>
                {trip.overview || trip.description}
              </p>
            </section>
          )}

          {/* Highlights */}
          {trip.highlights && trip.highlights.length > 0 && (
            <section style={{ marginBottom: 52 }}>
              <div className="overline" style={{ marginBottom: 12 }}>Highlights</div>
              <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 24 }}>Trip Highlights</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: 10 }}>
                {trip.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
                    <div style={{ width: 6, height: 6, background: 'var(--gold)', borderRadius: '50%', marginTop: 6, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--navy)', lineHeight: 1.5 }}>{h}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Gallery */}
          {gallery.length > 0 && (
            <section style={{ marginBottom: 52 }}>
              <div className="overline" style={{ marginBottom: 12 }}>Gallery</div>
              <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 24 }}>Photos</h2>
              <div style={{ height: 340, backgroundImage: `url(${gallery[activeGallery]})`, backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: 8 }} />
              {gallery.length > 1 && (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {gallery.map((img, i) => (
                    <button key={i} onClick={() => setActiveGallery(i)} style={{
                      width: 72, height: 52, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
                      border: activeGallery === i ? '2px solid var(--gold)' : '2px solid transparent',
                      cursor: 'pointer', padding: 0, opacity: activeGallery === i ? 1 : 0.6, transition: 'all 0.2s',
                    }} />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Itinerary */}
          {trip.itinerary && trip.itinerary.length > 0 && (
            <section style={{ marginBottom: 52 }}>
              <div className="overline" style={{ marginBottom: 12 }}>Day by Day</div>
              <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 8 }}>Your Itinerary</h2>
              <p style={{ color: 'var(--slate)', fontSize: '0.8rem', marginBottom: 24 }}>
                {['Breakfast', 'Lunch', 'Dinner'].map(m => (
                  <span key={m}>
                    <span style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', padding: '2px 6px', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginRight: 4 }}>{m.slice(0, 1)}</span>
                    <span style={{ marginRight: 12 }}>{m}</span>
                  </span>
                ))}
              </p>
              <ItineraryAccordion days={trip.itinerary} />
            </section>
          )}

          {/* Included / Excluded */}
          {((trip.included?.length > 0) || (trip.excluded?.length > 0)) && (
            <section style={{ marginBottom: 52 }}>
              <div className="overline" style={{ marginBottom: 12 }}>What's Covered</div>
              <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 24 }}>Included & Excluded</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 'clamp(16px, 3vw, 32px)' as any }}>
                {trip.included?.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 20, height: 20, background: '#22c55e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontSize: '0.65rem' }}>✓</span>
                      </div>
                      Included
                    </div>
                    {trip.included.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                        <span style={{ color: '#22c55e', fontSize: '0.75rem', marginTop: 2, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
                {trip.excluded?.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 20, height: 20, background: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'white', fontSize: '0.75rem' }}>✕</span>
                      </div>
                      Not Included
                    </div>
                    {trip.excluded.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                        <span style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: 2, flexShrink: 0 }}>✕</span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

        </div>

        {/* RIGHT — sticky sidebar */}
        <aside>
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ background: 'var(--navy)', padding: '32px 28px', marginBottom: 12 }}>
              {trip.starting_from && (
                <>
                  <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>Starting From</div>
                  <div className="font-display" style={{ fontSize: '2.2rem', color: 'var(--gold)', fontWeight: 300, lineHeight: 1, marginBottom: 4 }}>
                    {trip.starting_from}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: 24 }}>
                    per person · pricing varies by dates & group size
                  </div>
                </>
              )}

              <div style={{ marginBottom: 24 }}>
                {[
                  trip.duration     && { label: 'Duration',    value: trip.duration },
                  trip.group_size   && { label: 'Group Size',  value: trip.group_size },
                  trip.destination  && { label: 'Destination', value: trip.destination },
                  trip.difficulty   && { label: 'Difficulty',  value: trip.difficulty },
                ].filter(Boolean).map((s: any, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{s.label}</span>
                    <span style={{ fontSize: '0.8rem', color: 'white' }}>{s.value}</span>
                  </div>
                ))}
              </div>

              <Link href={`/request-quote?${quoteParams}`} className="btn-primary"
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginBottom: 10 }}>
                Request a Free Quote
              </Link>
              <Link href="/contact" style={{
                display: 'block', textAlign: 'center', textDecoration: 'none',
                padding: '13px', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)',
                fontFamily: 'var(--font-body)',
              }}>
                Talk to a Specialist
              </Link>
            </div>

            {/* Trust signals */}
            <div style={{ background: 'var(--cream)', padding: '20px 24px' }}>
              {[
                { icon: '🔒', text: 'No booking fees — ever' },
                { icon: '✓',  text: 'Best price guarantee' },
                { icon: '📞', text: '24-hour specialist support' },
                { icon: '⭐', text: 'ASTA & CLIA certified agents' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: i < 3 ? '1px solid rgba(13,27,42,0.06)' : 'none' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--navy)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(48px, 6vw, 64px) clamp(16px, 5vw, 32px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Ready to Go?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
            Book Your {trip.destination} Trip
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 32 }}>
            Our specialists handle every detail — flights, transfers, accommodations, and experiences. Get a free, no-obligation quote today.
          </p>
          <Link href={`/request-quote?${quoteParams}`} className="btn-primary" style={{ textDecoration: 'none' }}>
            Get Your Free Quote
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .trip-detail-grid {
            grid-template-columns: 1fr !important;
          }
          .trip-detail-grid aside > div {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
