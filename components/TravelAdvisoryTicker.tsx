'use client';
import { useEffect, useState, useRef } from 'react';

type Advisory = {
  title: string;
  country: string;
  level: string;
  link: string;
  pubDate: string;
  color: string;
  bg: string;
  short: string;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ENDPOINT = `${SUPABASE_URL}/functions/v1/travel-advisories`;

const LEVEL_LABEL: Record<string, string> = {
  '1': 'Normal Precautions',
  '2': 'Exercise Caution',
  '3': 'Reconsider Travel',
  '4': 'Do Not Travel',
};

export default function TravelAdvisoryTicker() {
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [paused, setPaused]         = useState(false);
  const [loading, setLoading]       = useState(true);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(ENDPOINT)
      .then(r => r.json())
      .then(d => {
        if (d.advisories) setAdvisories(d.advisories);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || advisories.length === 0) return null;

  // Duplicate list so scroll loops seamlessly
  const items = [...advisories, ...advisories];

  return (
    <div style={{
      background: 'rgba(13,27,42,0.95)',
      borderTop:    '1px solid rgba(201,168,76,0.2)',
      borderBottom: '1px solid rgba(201,168,76,0.2)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Label */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 10,
        display: 'flex', alignItems: 'center',
        background: 'linear-gradient(90deg, var(--navy) 75%, transparent)',
        paddingRight: 32, paddingLeft: 'clamp(16px, 4vw, 24px)',
        gap: 8, flexShrink: 0,
        pointerEvents: 'none',
      }}>
        <span style={{
          fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          🛡 U.S. Travel Advisories
        </span>
      </div>

      {/* Fade right edge */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 10,
        width: 48,
        background: 'linear-gradient(270deg, var(--navy) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Scrolling track */}
      <div
        ref={tickerRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 0,
          paddingLeft: 200, // space for the label
          animation: `advisoryScroll ${advisories.length * 4}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
          whiteSpace: 'nowrap',
        }}
      >
        {items.map((a, i) => (
          <a
            key={`${a.country}-${i}`}
            href={a.link}
            target="_blank"
            rel="noopener noreferrer"
            title={`${a.title} — click to read full advisory`}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '9px 20px',
              textDecoration: 'none',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              transition: 'background 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {/* Level pill */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 26, height: 18,
              background: a.bg,
              border: `1px solid ${a.color}40`,
              borderRadius: 2,
              fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.06em',
              color: a.color, fontFamily: 'var(--font-body)',
              flexShrink: 0,
            }}>
              {a.short}
            </span>

            {/* Country */}
            <span style={{
              fontSize: '0.75rem', color: 'rgba(255,255,255,0.75)',
              fontFamily: 'var(--font-body)',
            }}>
              {a.country}
            </span>

            {/* Level label — only for L3/L4 */}
            {parseInt(a.level) >= 3 && (
              <span style={{
                fontSize: '0.62rem', color: a.color,
                fontFamily: 'var(--font-body)', letterSpacing: '0.04em',
              }}>
                {LEVEL_LABEL[a.level]}
              </span>
            )}

            <span style={{ color: 'rgba(255,255,255,0.1)', marginLeft: 4 }}>·</span>
          </a>
        ))}
      </div>

      <style>{`
        @keyframes advisoryScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
