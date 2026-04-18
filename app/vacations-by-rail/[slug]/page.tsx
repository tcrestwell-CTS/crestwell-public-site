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
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -800px 0; }
          100% { background-position: 800px 0; }
        }
        .sk {
          background: linear-gradient(90deg, #e8e4dc 25%, #f0ede6 50%, #e8e4dc 75%);
          background-size: 800px 100%;
          animation: shimmer 1.6s infinite;
          border-radius: 4px;
        }
        @keyframes trainMove {
          0%   { transform: translateX(-60px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(calc(100vw + 60px)); opacity: 0; }
        }
      `}</style>

      {/* Skeleton hero */}
      <div style={{ height: 'clamp(300px,45vw,480px)', background: '#1a2a3a', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(24px,4vw,48px)' }}>
        {/* Animated train crossing the hero */}
        <div style={{ position: 'absolute', top: '42%', left: 0, right: 0, height: 40, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ animation: 'trainMove 2.8s ease-in-out infinite', display: 'inline-flex', alignItems: 'center', gap: 0, fontSize: '1.6rem', whiteSpace: 'nowrap' }}>
            🚂🚃🚃🚃🚃
          </div>
        </div>
        {/* Skeleton text over dark hero */}
        <div style={{ width: '30%', height: 12, background: 'rgba(201,168,76,0.4)', borderRadius: 4, marginBottom: 16 }} />
        <div style={{ width: '65%', height: 28, background: 'rgba(255,255,255,0.15)', borderRadius: 4, marginBottom: 12 }} />
        <div style={{ width: '45%', height: 20, background: 'rgba(255,255,255,0.1)', borderRadius: 4, marginBottom: 16 }} />
        <div style={{ display: 'flex', gap: 16 }}>
          {[80, 100, 90].map((w, i) => (
            <div key={i} style={{ width: w, height: 14, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }} />
          ))}
        </div>
      </div>

      {/* Skeleton sticky bar */}
      <div style={{ background: '#0D1B2A', padding: '14px clamp(16px,5vw,32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ width: 180, height: 10, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }} />
          <div style={{ width: 120, height: 18, background: 'rgba(201,168,76,0.3)', borderRadius: 3 }} />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ width: 120, height: 38, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 2 }} />
          <div style={{ width: 180, height: 38, background: 'rgba(201,168,76,0.4)', borderRadius: 2 }} />
        </div>
      </div>

      {/* Skeleton content */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(16px,5vw,32px)', display: 'grid', gridTemplateColumns: '1fr clamp(280px,30%,340px)', gap: 40 }}>
        <div>
          {/* Overview skeleton */}
          <div style={{ marginBottom: 48 }}>
            <div className="sk" style={{ width: 100, height: 10, marginBottom: 16 }} />
            <div style={{ borderLeft: '3px solid #C9A84C', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[95, 88, 72].map((w, i) => (
                <div key={i} className="sk" style={{ width: `${w}%`, height: 14 }} />
              ))}
            </div>
          </div>
          {/* Itinerary skeleton */}
          <div>
            <div className="sk" style={{ width: 140, height: 10, marginBottom: 20 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{ border: '1px solid #e8e4dc', padding: '16px 20px', background: 'white', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="sk" style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0 }} />
                  <div className="sk" style={{ width: `${50 + (i * 7) % 30}%`, height: 14 }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar skeleton */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: '#0D1B2A', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ width: 120, height: 10, background: 'rgba(201,168,76,0.3)', borderRadius: 3 }} />
            {[90, 70].map((w, i) => (
              <div key={i} style={{ width: `${w}%`, height: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }} />
            ))}
            <div style={{ width: 80, height: 32, background: 'rgba(201,168,76,0.3)', borderRadius: 3, marginTop: 8 }} />
            <div style={{ width: '100%', height: 44, background: 'rgba(201,168,76,0.4)', borderRadius: 2, marginTop: 4 }} />
            <div style={{ width: '100%', height: 40, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2 }} />
          </div>
          <div style={{ background: 'white', padding: 24, boxShadow: '0 2px 12px rgba(13,27,42,0.06)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="sk" style={{ width: 110, height: 10, marginBottom: 6 }} />
            {[85, 70, 90, 65, 75].map((w, i) => (
              <div key={i} className="sk" style={{ width: `${w}%`, height: 12 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Loading label */}
      <div style={{ textAlign: 'center', paddingBottom: 40, color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'var(--font-body)', letterSpacing: '0.08em' }}>
        Fetching itinerary &amp; rewriting in Crestwell voice...
      </div>
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
          <div style={{ background: 'white', border: '1px solid #e8e4dc', padding: '24px' }}>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 6, fontFamily: 'var(--font-body)' }}>
              Book through Crestwell · Planning is free
            </div>
            {trip.price && (
              <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'var(--font-display)', marginBottom: 16 }}>
                from ${trip.price.toLocaleString()}<span style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>/pp</span>
              </div>
            )}
            <Link href={quoteUrl} style={{ display: 'block', background: '#C9A84C', color: '#0D1B2A', padding: '12px', textAlign: 'center', textDecoration: 'none', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              Request a Free Quote
            </Link>
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



    </div>
  );
}
