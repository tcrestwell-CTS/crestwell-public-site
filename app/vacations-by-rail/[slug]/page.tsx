'use client';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

type TripData = {
  title: string;
  price: number | null;
  days_count: number | null;
  rating: number | null;
  reviews: number | null;
  heroImg: string | null;
  vbrUrl: string;
  overview: string;
  days: { title: string; content: string }[];
  inclusions: Record<string, string[]>;
  error?: string;
};

const INCLUSION_ICONS: Record<string, string> = {
  'Accommodation': '🏨',
  'Transportation': '🚂',
  'Food & Drink': '🍽️',
  'Excursions & Entertainment': '🎟️',
  'Not Included': '✗',
};

export default function RailTripDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [trip, setTrip] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(0);

  // VBR path comes from the query param set by the deal card
  const vbrPath = searchParams.get('vbr') || '';
  const slug = params.slug as string;

  useEffect(() => {
    if (!vbrPath) { setLoading(false); return; }
    fetch(`/api/rail-trip?path=${encodeURIComponent(vbrPath)}`)
      .then(r => r.json())
      .then(data => setTrip(data))
      .catch(() => setTrip(null))
      .finally(() => setLoading(false));
  }, [vbrPath]);

  const quoteUrl = trip
    ? `/request-quote?type=rail-vacation&trip=${encodeURIComponent(trip.title)}&source=rail-detail`
    : '/request-quote?type=rail-vacation';

  if (loading) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ width: 48, height: 48, border: '3px solid #e2e8f0', borderTop: '3px solid #0D1B2A', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <p style={{ color: '#64748b', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>Loading itinerary...</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!trip || trip.error || !vbrPath) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, padding: 32 }}>
      <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--navy)', fontSize: '1.8rem' }}>Trip Not Found</h1>
      <p style={{ color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>We couldn't load this itinerary. Call us and we'll find it for you.</p>
      <a href="tel:8885086893" style={{ background: 'var(--navy)', color: 'white', padding: '12px 32px', textDecoration: 'none', fontWeight: 700, fontFamily: 'var(--font-body)' }}>
        Call 888-508-6893
      </a>
    </div>
  );

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* HERO */}
      <div style={{ position: 'relative', height: 'clamp(300px, 45vw, 480px)', overflow: 'hidden', background: '#0D1B2A' }}>
        {trip.heroImg ? (
          <img src={trip.heroImg} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0D1B2A 0%, #0D3B6B 100%)' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,27,42,0.9) 0%, rgba(13,27,42,0.3) 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(24px,4vw,48px)' }}>
          <Link href="/vacations-by-rail" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', textDecoration: 'none', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ← Vacations by Rail
          </Link>
          <h1 className="font-display" style={{ fontSize: 'clamp(1.6rem,3.5vw,3rem)', fontWeight: 700, color: 'white', marginTop: 12, marginBottom: 16, lineHeight: 1.1 }}>
            {trip.title}
          </h1>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            {trip.days_count && (
              <span style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
                🗓 {trip.days_count} days
              </span>
            )}
            {trip.rating && (
              <span style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}>
                ⭐ {trip.rating} ({trip.reviews?.toLocaleString()} reviews)
              </span>
            )}
            {trip.price && (
              <span style={{ color: '#C9A84C', fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700 }}>
                From ${trip.price.toLocaleString()}/pp
              </span>
            )}
          </div>
        </div>
      </div>

      {/* STICKY BOOKING BAR */}
      <div style={{ background: 'var(--navy)', padding: '14px clamp(16px,5vw,32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
        <div>
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'var(--font-body)' }}>
            Via Vacations By Rail · Book Through Crestwell
          </div>
          {trip.price && (
            <div style={{ color: '#C9A84C', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-body)' }}>
              From ${trip.price.toLocaleString()} per person
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="tel:8885086893" style={{ border: '2px solid rgba(255,255,255,0.3)', color: 'white', padding: '10px 20px', textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem', fontFamily: 'var(--font-body)' }}>
            888-508-6893
          </a>
          <Link href={quoteUrl} style={{ background: '#C9A84C', color: '#0D1B2A', padding: '10px 24px', textDecoration: 'none', fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
            Book with Crestwell →
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(16px,5vw,32px)', display: 'grid', gridTemplateColumns: '1fr clamp(280px,30%,340px)', gap: 40, alignItems: 'start' }}>

        {/* MAIN CONTENT */}
        <div>
          {/* Overview */}
          {trip.overview && (
            <section style={{ marginBottom: 48 }}>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 12, fontFamily: 'var(--font-body)' }}>
                Trip Overview
              </div>
              <p style={{ fontSize: '1.05rem', color: 'var(--navy)', lineHeight: 1.8, fontFamily: 'var(--font-body)', fontStyle: 'italic', borderLeft: '3px solid #C9A84C', paddingLeft: 20 }}>
                {trip.overview}
              </p>
            </section>
          )}

          {/* Day-by-day itinerary */}
          {trip.days.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 20, fontFamily: 'var(--font-body)' }}>
                Day-by-Day Itinerary
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {trip.days.map((day, i) => (
                  <div key={i} style={{ border: '1px solid #e8e6e0', overflow: 'hidden' }}>
                    <button
                      onClick={() => setActiveDay(activeDay === i ? -1 : i)}
                      style={{ width: '100%', textAlign: 'left', padding: '16px 20px', background: activeDay === i ? 'var(--navy)' : 'white', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <span style={{ background: activeDay === i ? '#C9A84C' : '#f0ede6', color: activeDay === i ? '#0D1B2A' : 'var(--navy)', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'var(--font-body)', flexShrink: 0 }}>
                          {i + 1}
                        </span>
                        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: activeDay === i ? 'white' : 'var(--navy)', fontFamily: 'var(--font-body)' }}>
                          {day.title}
                        </span>
                      </div>
                      <span style={{ color: activeDay === i ? 'rgba(255,255,255,0.6)' : 'var(--slate)', fontSize: '1rem', transition: 'transform 0.2s', transform: activeDay === i ? 'rotate(180deg)' : 'none' }}>
                        ↓
                      </span>
                    </button>
                    {activeDay === i && (
                      <div style={{ padding: '20px 24px', background: '#faf9f6', borderTop: '1px solid #e8e6e0' }}>
                        <p style={{ fontSize: '0.9rem', color: 'var(--slate)', lineHeight: 1.8, margin: 0, fontFamily: 'var(--font-body)' }}>
                          {day.content}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Book CTA Card */}
          <div style={{ background: 'var(--navy)', padding: '28px 24px' }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 8, fontFamily: 'var(--font-body)' }}>
              Book Through Crestwell
            </div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)', marginBottom: 16, lineHeight: 1.6 }}>
              Planning is always free. We handle everything — no fees, ever.
            </div>
            {trip.price && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-body)' }}>From</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#C9A84C', fontFamily: 'var(--font-display)' }}>
                  ${trip.price.toLocaleString()}
                  <span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}> /person</span>
                </div>
              </div>
            )}
            <Link href={quoteUrl} style={{ display: 'block', background: '#C9A84C', color: '#0D1B2A', padding: '14px', textAlign: 'center', textDecoration: 'none', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: 12 }}>
              Request My Free Quote
            </Link>
            <a href="tel:8885086893" style={{ display: 'block', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '12px', textAlign: 'center', textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem', fontFamily: 'var(--font-body)' }}>
              Call 888-508-6893
            </a>
          </div>

          {/* What's Included */}
          {Object.keys(trip.inclusions).length > 0 && (
            <div style={{ background: 'white', padding: '24px', boxShadow: '0 2px 12px rgba(13,27,42,0.06)' }}>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 16, fontFamily: 'var(--font-body)' }}>
                What's Included
              </div>
              {Object.entries(trip.inclusions).map(([cat, items]) => (
                <div key={cat} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: '0.9rem' }}>{INCLUSION_ICONS[cat] || '•'}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: cat === 'Not Included' ? '#CC2936' : 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-body)' }}>
                      {cat}
                    </span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 28, listStyle: cat === 'Not Included' ? 'none' : 'disc' }}>
                    {items.map((item, j) => (
                      <li key={j} style={{ fontSize: '0.8rem', color: cat === 'Not Included' ? '#CC2936' : 'var(--slate)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                        {cat === 'Not Included' ? `✗ ${item}` : item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Planning is Free */}
          <div style={{ background: '#FEF3C7', border: '1px solid #C9A84C', padding: '18px 20px' }}>
            <p style={{ margin: 0, fontSize: '0.82rem', color: '#92400e', fontWeight: 600, fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
              🌟 Planning is always FREE at Crestwell Travel Services. We earn our commission from Vacations By Rail — you pay the same price, with expert guidance included.
            </p>
          </div>

        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ background: 'var(--navy)', padding: 'clamp(40px,5vw,56px) clamp(16px,5vw,32px)', textAlign: 'center' }}>
        <h2 className="font-display" style={{ fontSize: 'clamp(1.4rem,2.5vw,2.2rem)', fontWeight: 300, color: 'white', marginBottom: 12 }}>
          Ready to Book This Trip?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', fontFamily: 'var(--font-body)', marginBottom: 32, lineHeight: 1.7 }}>
          Let us handle the details. We'll confirm availability, walk you through options, and get you booked — all at no extra cost.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={quoteUrl} style={{ background: '#C9A84C', color: '#0D1B2A', padding: '15px 40px', textDecoration: 'none', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
            Book with Crestwell
          </Link>
          <a href="tel:8885086893" style={{ border: '2px solid rgba(255,255,255,0.35)', color: 'white', padding: '15px 40px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
            888-508-6893
          </a>
        </div>
      </div>

    </div>
  );
}
