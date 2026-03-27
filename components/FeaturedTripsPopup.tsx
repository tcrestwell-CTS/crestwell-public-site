'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFeaturedTrips } from '@/lib/supabase';
import type { FeaturedTrip } from '@/lib/supabase';

const STORAGE_KEY = 'cw_featured_popup_seen';

export default function FeaturedTripsPopup() {
  const [visible, setVisible]     = useState(false);   // controls mount
  const [animIn, setAnimIn]       = useState(false);   // controls enter animation
  const [animOut, setAnimOut]     = useState(false);   // controls exit animation
  const [trips, setTrips]         = useState<FeaturedTrip[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  // ── Mount: check session, delay, then show ──────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;   // already seen this session

    getFeaturedTrips().then(data => setTrips(data.slice(0, 4))).catch(() => {});

    const t = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimIn(true)));
    }, 3000);

    return () => clearTimeout(t);
  }, []);

  // ── Auto-cycle active card every 3.5s ──────────────────────────────────────
  useEffect(() => {
    if (!animIn || trips.length < 2) return;
    const t = setInterval(() => {
      setActiveIdx(i => (i + 1) % trips.length);
    }, 3500);
    return () => clearInterval(t);
  }, [animIn, trips.length]);

  const dismiss = () => {
    setAnimOut(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
    setTimeout(() => { setVisible(false); setAnimOut(false); setAnimIn(false); }, 420);
  };

  if (!visible || trips.length === 0) return null;

  const trip = trips[activeIdx];

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        onClick={dismiss}
        style={{
          position: 'fixed', inset: 0, zIndex: 900,
          background: 'rgba(5, 8, 15, 0.72)',
          backdropFilter: 'blur(4px)',
          opacity: animIn && !animOut ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* ── Panel ── */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        zIndex: 901,
        width: 'clamp(300px, 90vw, 460px)',
        background: 'rgba(10, 20, 34, 0.98)',
        border: '1px solid rgba(201, 168, 76, 0.35)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08)',
        overflow: 'hidden',
        transform: animIn && !animOut
          ? 'translate(-50%, -50%) scale(1)'
          : animOut
            ? 'translate(-50%, -50%) scale(0.95)'
            : 'translate(-50%, -44%) scale(0.96)',
        opacity: animIn && !animOut ? 1 : 0,
        transition: animOut
          ? 'transform 0.38s cubic-bezier(0.4,0,1,1), opacity 0.38s ease'
          : 'transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
      }}>

        {/* Gold top bar — animated progress */}
        <div style={{ height: 3, background: 'rgba(201,168,76,0.15)', position: 'relative', overflow: 'hidden' }}>
          <div key={activeIdx} style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            background: 'linear-gradient(90deg, var(--gold), rgba(201,168,76,0.6))',
            animation: 'popupProgress 3.5s linear forwards',
          }} />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px 10px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              ✦ Featured Trips
            </span>
          </div>
          <button
            onClick={dismiss}
            aria-label="Close"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(255,255,255,0.35)', fontSize: '1.1rem', lineHeight: 1,
              padding: '2px 4px', transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'white')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
          >
            ✕
          </button>
        </div>

        {/* Card image — animated on change */}
        <div style={{ position: 'relative', height: 190, overflow: 'hidden' }}>
          <div
            key={`img-${activeIdx}`}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${trip.cover_image_url || 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=700&q=80'})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              animation: 'popupImageIn 0.55s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(10,20,34,0.85) 0%, rgba(10,20,34,0.1) 50%, transparent 100%)',
          }} />

          {/* Type badge */}
          {trip.trip_type && (
            <div style={{
              position: 'absolute', top: 14, left: 14,
              background: 'rgba(10,20,34,0.8)', backdropFilter: 'blur(8px)',
              padding: '4px 12px', border: '1px solid rgba(201,168,76,0.3)',
            }}>
              <span style={{ fontSize: '0.58rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                {trip.trip_type}
              </span>
            </div>
          )}

          {/* Price badge */}
          {trip.starting_from && (
            <div style={{
              position: 'absolute', bottom: 14, right: 14,
              background: 'rgba(10,20,34,0.85)', backdropFilter: 'blur(8px)',
              padding: '5px 14px',
            }}>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}>
                From <strong style={{ color: 'var(--gold)' }}>{trip.starting_from}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Card body — animated on change */}
        <div
          key={`body-${activeIdx}`}
          style={{
            padding: '16px 18px 18px',
            animation: 'popupBodyIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards',
          }}
        >
          <h3 className="font-display" style={{
            fontSize: '1.15rem', fontWeight: 300, color: 'white',
            marginBottom: 6, lineHeight: 1.3,
          }}>
            {trip.trip_name}
          </h3>

          {trip.description && (
            <p style={{
              fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.7, marginBottom: 16,
              display: '-webkit-box', WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            } as any}>
              {trip.description}
            </p>
          )}

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <Link
              href={`/trips${trip.slug ? `/${trip.slug}` : ''}`}
              onClick={dismiss}
              className="btn-primary"
              style={{ flex: 1, textAlign: 'center', textDecoration: 'none', padding: '10px', fontSize: '0.72rem' }}
            >
              View Trip Details
            </Link>
            <Link
              href="/trips"
              onClick={dismiss}
              style={{
                flex: 1, textAlign: 'center', textDecoration: 'none',
                padding: '10px', fontSize: '0.72rem',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.65)',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)';
                (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)';
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)';
              }}
            >
              All Trips
            </Link>
          </div>
        </div>

        {/* Dot indicators */}
        {trips.length > 1 && (
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 6,
            padding: '0 18px 16px',
          }}>
            {trips.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`View trip ${i + 1}`}
                style={{
                  width: i === activeIdx ? 20 : 6,
                  height: 6, borderRadius: 3,
                  background: i === activeIdx ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                }}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes popupProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes popupImageIn {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes popupBodyIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
