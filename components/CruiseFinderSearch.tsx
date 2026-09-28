'use client';
import { useState } from 'react';
import Link from 'next/link';

// ── Types ──────────────────────────────────────────────────────────────────
// Mirrors the shape returned by app/api/triton/route.ts (score already
// stripped server-side, so it isn't part of this type).

type TritonResult = {
  id: string;
  rank: number;
  line: string;
  ship: string;
  embark_date: string;
  embark_port: string;
  nights: number;
  price_from: number | null;
  why_it_fits: string;
  caveats: string | null;
  client_blurb?: string;
};

type TritonApiResponse = {
  agent?: string;
  query?: string;
  criteria?: Record<string, unknown>;
  results: TritonResult[];
  meta?: Record<string, unknown>;
};

type SearchState = 'idle' | 'loading' | 'results' | 'empty' | 'error' | 'rate_limited';

const EXAMPLE_QUERIES = [
  'Adults-only Caribbean cruise for our anniversary in March, balcony cabin',
  '7-night Alaska cruise this summer for a family of 4, need a kids club',
  'Short 3–4 night Bahamas getaway from Florida in the next two months',
];

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function ctaHref(query: string, searchedAt: string, r?: TritonResult): string {
  const params = new URLSearchParams();
  params.set('trip_type', 'Cruise Vacation');
  params.set('triton_query', query);
  params.set('searched_at', searchedAt);
  if (r) {
    if (r.line) params.set('line', r.line);
    if (r.ship) params.set('ship', r.ship);
    if (r.embark_date) params.set('date_from', r.embark_date);
    if (r.embark_port) params.set('destination', r.embark_port);
    if (r.nights != null) params.set('duration', `${r.nights} night${r.nights === 1 ? '' : 's'}`);
    if (r.price_from != null) params.set('price_from', String(r.price_from));
  }
  return `/request-quote?${params.toString()}`;
}

export default function CruiseFinderSearch() {
  const [query, setQuery] = useState('');
  const [state, setState] = useState<SearchState>('idle');
  const [results, setResults] = useState<TritonResult[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchedAt, setSearchedAt] = useState('');
  const [lastQuery, setLastQuery] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim().length < 10) {
      setState('error');
      setErrorMessage('Tell us a little more — at least a few words about who’s going and when.');
      return;
    }

    setState('loading');
    setErrorMessage('');
    const now = new Date().toISOString();

    try {
      const res = await fetch('/api/triton', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 429) {
        setState('rate_limited');
        setErrorMessage(data.error || "You've reached the search limit for now — please try again in a bit.");
        return;
      }

      if (!res.ok) {
        setState('error');
        setErrorMessage('Something went wrong on our end. Please try again, or request a quote directly.');
        return;
      }

      const payload = data as TritonApiResponse;
      const finalResults = Array.isArray(payload.results) ? payload.results : [];
      setResults(finalResults);
      setSearchedAt(now);
      setLastQuery(query.trim());
      setState(finalResults.length > 0 ? 'results' : 'empty');
    } catch {
      setState('error');
      setErrorMessage('Something went wrong on our end. Please try again, or request a quote directly.');
    }
  }

  return (
    <>
      {/* ── HERO / SEARCH ── */}
      <section style={{
        position: 'relative', minHeight: '60vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--navy)', overflow: 'hidden', padding: '80px 24px',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1800&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.8) 100%)' }} />
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 720, zIndex: 1, width: '100%' }}>
          <div className="overline" style={{ marginBottom: 18 }}>Cruise Finder</div>
          <h1 className="font-display" style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)', fontWeight: 300,
            color: 'white', lineHeight: 1.15, marginBottom: 20,
          }}>
            Three hand-picked cruises.<br />
            <em style={{ color: 'var(--gold-light)' }}>One quick question.</em>
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>
            Tell us who&apos;s going and when — your advisor&apos;s shortlist, free, in about a minute.
          </p>

          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <textarea
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Kid and teen friendly cruises leaving Florida the week of Christmas…"
              rows={3}
              maxLength={500}
              style={{
                width: '100%', padding: '18px 20px', fontSize: '1rem',
                fontFamily: 'var(--font-body)', color: 'var(--navy)',
                background: 'white', border: '2px solid transparent',
                outline: 'none', resize: 'vertical', minHeight: 84,
                boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'transparent'; }}
            />

            {/* Example chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
              {EXAMPLE_QUERIES.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setQuery(ex)}
                  style={{
                    padding: '7px 14px', fontSize: '0.72rem',
                    fontFamily: 'var(--font-body)', letterSpacing: '0.02em',
                    color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(201,168,76,0.35)', cursor: 'pointer',
                    transition: 'all 0.2s', textAlign: 'left',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.15)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
                >
                  {ex}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <button
                type="submit"
                className="btn-primary"
                disabled={state === 'loading'}
                style={{ minWidth: 220, opacity: state === 'loading' ? 0.7 : 1, cursor: state === 'loading' ? 'not-allowed' : 'pointer' }}
              >
                {state === 'loading' ? 'Searching…' : 'Find My Cruises'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── LOADING ── */}
      {state === 'loading' && (
        <section style={{ background: 'var(--cream)', padding: '80px 32px', textAlign: 'center' }}>
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <div className="cw-spinner" style={{ margin: '0 auto 24px' }} />
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Checking sailings across Royal Caribbean, Carnival, NCL, Disney, MSC and more…
            </p>
          </div>
        </section>
      )}

      {/* ── ERROR / RATE LIMITED ── */}
      {(state === 'error' || state === 'rate_limited') && (
        <section style={{ background: 'var(--cream)', padding: '64px 32px', textAlign: 'center' }}>
          <div style={{ maxWidth: 520, margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 24 }}>
              {errorMessage || 'Something went wrong. Please try again.'}
            </p>
            <Link href={ctaHref(query.trim() || 'General cruise inquiry', new Date().toISOString())} className="btn-primary" style={{ textDecoration: 'none' }}>
              Get exact pricing from your advisor
            </Link>
          </div>
        </section>
      )}

      {/* ── EMPTY RESULTS ── */}
      {state === 'empty' && (
        <section style={{ background: 'var(--cream)', padding: '80px 32px', textAlign: 'center' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div className="overline" style={{ marginBottom: 16 }}>No Exact Matches</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 16 }}>
              We didn&apos;t find a clean match — but that doesn&apos;t mean one doesn&apos;t exist.
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 32 }}>
              Sailings shift constantly and some of the best fits never show up in an automated search. Tell your advisor what you told us here, and a real person will dig deeper.
            </p>
            <Link href={ctaHref(lastQuery, searchedAt)} className="btn-primary" style={{ textDecoration: 'none' }}>
              Get exact pricing from your advisor
            </Link>
          </div>
        </section>
      )}

      {/* ── RESULTS ── */}
      {state === 'results' && (
        <section style={{ background: 'var(--cream)', padding: '80px 32px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="overline" style={{ marginBottom: 12 }}>Your Advisor&apos;s Shortlist</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 300, color: 'var(--navy)' }}>
                {results.length} Cruise{results.length === 1 ? '' : 's'} Worth a Look
              </h2>
            </div>

            <div className="cw-finder-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {results.map((r) => (
                <div key={r.id} style={{ background: 'white', padding: '32px 28px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 30px rgba(13,27,42,0.06)' }}>
                  <div style={{ marginBottom: 4 }}>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                      {r.line}
                    </span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 14 }}>
                    {r.ship}
                  </h3>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
                    {r.embark_port && (
                      <span style={{ padding: '4px 10px', fontSize: '0.72rem', background: 'var(--cream)', color: 'var(--navy)', border: '1px solid rgba(13,27,42,0.1)' }}>
                        📍 {r.embark_port}
                      </span>
                    )}
                    {r.embark_date && (
                      <span style={{ padding: '4px 10px', fontSize: '0.72rem', background: 'var(--cream)', color: 'var(--navy)', border: '1px solid rgba(13,27,42,0.1)' }}>
                        📅 {formatDate(r.embark_date)}
                      </span>
                    )}
                    {r.nights != null && (
                      <span style={{ padding: '4px 10px', fontSize: '0.72rem', background: 'var(--cream)', color: 'var(--navy)', border: '1px solid rgba(13,27,42,0.1)' }}>
                        ⏱ {r.nights} night{r.nights === 1 ? '' : 's'}
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--navy)', marginBottom: 16, fontFamily: 'var(--font-body)' }}>
                    {r.price_from != null ? `From $${r.price_from.toLocaleString()} per person` : 'Pricing on request'}
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: r.caveats ? 14 : 24, flexGrow: 1 }}>
                    {r.why_it_fits}
                  </p>

                  {r.caveats && (
                    <div style={{ background: 'var(--cream)', borderLeft: '3px solid var(--gold)', padding: '10px 14px', marginBottom: 24, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <strong style={{ color: 'var(--navy)' }}>Good to know:</strong> {r.caveats}
                    </div>
                  )}

                  <Link href={ctaHref(lastQuery, searchedAt, r)} className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center' }}>
                    Get exact pricing from your advisor
                  </Link>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link
                href={ctaHref(lastQuery, searchedAt)}
                style={{
                  fontSize: '0.8rem', color: 'var(--navy)', textDecoration: 'none',
                  borderBottom: '1px solid var(--gold)', paddingBottom: 2,
                  fontFamily: 'var(--font-body)',
                }}
              >
                None of these fit? Tell us more and we'll dig deeper →
              </Link>
            </div>
          </div>
        </section>
      )}

      <style>{`
        .cw-spinner {
          width: 40px; height: 40px;
          border: 3px solid rgba(13,27,42,0.12);
          border-top-color: var(--gold);
          border-radius: 50%;
          animation: cwSpin 0.8s linear infinite;
        }
        @keyframes cwSpin { to { transform: rotate(360deg); } }

        @media (max-width: 640px) {
          .cw-finder-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
