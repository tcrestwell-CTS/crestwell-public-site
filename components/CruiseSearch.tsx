'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

type Cruise = {
  id: number;
  name: string;
  operator_name: string;
  ship_name: string;
  nights: number;
  departure_date: string;
  departure_port: string;
  destination_name: string;
  region: string;
  price_from: number | null;
  currency: string;
  itinerary_summary: string;
  image_url: string | null;
  ports: string[];
};

type Operator = { id: number; name: string };

type SearchFilters = {
  destination: string;
  operator: string;
  duration: string;
  month: string;
  year: string;
};

// ─── Static filter data ───────────────────────────────────────────────────────

const DESTINATIONS = [
  { value: 'any', label: 'Any Destination' },
  { value: 'caribbean', label: 'Caribbean' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'alaska', label: 'Alaska' },
  { value: 'bahamas', label: 'The Bahamas' },
  { value: 'bermuda', label: 'Bermuda' },
  { value: 'mexico', label: 'Mexico' },
  { value: 'norway', label: 'Norway & Fjords' },
  { value: 'hawaii', label: 'Hawaii' },
  { value: 'new_england', label: 'New England' },
  { value: 'world', label: 'World Voyage' },
];

const DURATIONS = [
  { value: 'any', label: 'Any Length' },
  { value: 'short', label: '2–4 nights (Weekend)' },
  { value: 'week', label: '5–7 nights (1 week)' },
  { value: 'ten', label: '8–10 nights' },
  { value: 'fortnight', label: '11–14 nights (2 weeks)' },
  { value: 'extended', label: '15+ nights' },
];

const MONTHS = [
  { value: 'any', label: 'Any Month' },
  { value: '1', label: 'January' },  { value: '2', label: 'February' },
  { value: '3', label: 'March' },    { value: '4', label: 'April' },
  { value: '5', label: 'May' },      { value: '6', label: 'June' },
  { value: '7', label: 'July' },     { value: '8', label: 'August' },
  { value: '9', label: 'September' },{ value: '10', label: 'October' },
  { value: '11', label: 'November' },{ value: '12', label: 'December' },
];

const YEARS = [
  { value: 'any', label: 'Any Year' },
  { value: '2026', label: '2026' },
  { value: '2027', label: '2027' },
];

const FALLBACK_OPERATORS = [
  { value: 'any', label: 'Any Cruise Line' },
  { value: 'rc', label: 'Royal Caribbean' },
  { value: 'carnival', label: 'Carnival' },
  { value: 'ncl', label: 'Norwegian' },
  { value: 'msc', label: 'MSC Cruises' },
  { value: 'celebrity', label: 'Celebrity Cruises' },
  { value: 'princess', label: 'Princess Cruises' },
  { value: 'virgin', label: 'Virgin Voyages' },
  { value: 'explora', label: 'Explora Journeys' },
];

const DEFAULT_FILTERS: SearchFilters = {
  destination: 'any', operator: 'any',
  duration: 'any', month: 'any', year: 'any',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number | null, currency = 'USD') {
  if (!price) return 'Call for pricing';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price);
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CruiseSearch() {
  const [filters, setFilters]         = useState<SearchFilters>(DEFAULT_FILTERS);
  const [applied, setApplied]         = useState<SearchFilters>(DEFAULT_FILTERS);
  const [operators, setOperators]     = useState<{ value: string; label: string }[]>(FALLBACK_OPERATORS);
  const [cruises, setCruises]         = useState<Cruise[]>([]);
  const [loading, setLoading]         = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError]             = useState('');
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [totalCount, setTotalCount]   = useState(0);

  // Load operators once on mount
  useEffect(() => {
    fetch('/api/widgety/operators')
      .then(r => r.json())
      .then(data => {
        const list: Operator[] = data.operators || data || [];
        if (list.length > 0) {
          setOperators([
            { value: 'any', label: 'Any Cruise Line' },
            ...list.map(o => ({ value: String(o.id), label: o.name })),
          ]);
        }
      })
      .catch(() => {}); // Fallback already set
  }, []);

  const fetchCruises = useCallback(async (f: SearchFilters, pg: number) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        destination: f.destination, operator: f.operator,
        duration: f.duration, month: f.month,
        year: f.year, page: String(pg), per_page: '9',
      });
      const res = await fetch(`/api/widgety/cruises?${params}`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();

      const list: Cruise[] = data.cruises || data.holidays || (Array.isArray(data) ? data : []);
      const meta = data.meta || data.pagination || {};

      setCruises(list);
      setTotalPages(meta.total_pages || Math.ceil((meta.total_count || list.length) / 9) || 1);
      setTotalCount(meta.total_count || list.length);
    } catch {
      setError('Unable to load live results right now. Please try again or request a custom quote.');
      setCruises([]);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  // Load on mount
  useEffect(() => { fetchCruises(DEFAULT_FILTERS, 1); }, [fetchCruises]);

  const handleSearch = () => {
    setPage(1);
    setApplied({ ...filters });
    fetchCruises(filters, 1);
    document.getElementById('cruise-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePageChange = (pg: number) => {
    setPage(pg);
    fetchCruises(applied, pg);
    document.getElementById('cruise-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const update = (key: keyof SearchFilters) => (v: string) => setFilters(f => ({ ...f, [key]: v }));

  return (
    <section style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center 40%', opacity: 0.07 }} />
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', position: 'relative' }} />

      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '72px 32px 80px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="overline" style={{ marginBottom: 14 }}>Live Availability</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: 14 }}>
            Find Your Perfect Cruise
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
            Real-time pricing and availability from the world's top cruise lines — updated throughout the day.
          </p>
        </div>

        {/* Search bar */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.25)', backdropFilter: 'blur(12px)', padding: '32px 32px 28px', marginBottom: 48 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: 16, marginBottom: 24 }}>
            <FilterSelect label="Destination"  value={filters.destination} onChange={update('destination')} options={DESTINATIONS} />
            <FilterSelect label="Cruise Line"  value={filters.operator}    onChange={update('operator')}    options={operators} />
            <FilterSelect label="Duration"     value={filters.duration}    onChange={update('duration')}    options={DURATIONS} />
            <FilterSelect label="Month"        value={filters.month}       onChange={update('month')}       options={MONTHS} />
            <FilterSelect label="Year"         value={filters.year}        onChange={update('year')}        options={YEARS} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                background: loading ? 'rgba(201,168,76,0.5)' : 'var(--gold)',
                color: 'var(--navy)',
                border: 'none',
                padding: '15px 52px',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { if (!loading) (e.currentTarget.style.background = 'var(--gold-light)'); }}
              onMouseLeave={e => { if (!loading) (e.currentTarget.style.background = 'var(--gold)'); }}
            >
              {loading ? <Spinner /> : <SearchIcon />}
              {loading ? 'Searching…' : 'Search Cruises'}
            </button>
          </div>
        </div>

        {/* Results */}
        <div id="cruise-results">
          {/* Meta bar */}
          {!initialLoad && !error && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 10 }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
                {loading ? 'Loading…' : (
                  <>Showing <span style={{ color: 'var(--gold)' }}>{cruises.length}</span>
                  {totalCount > cruises.length && <> of <span style={{ color: 'var(--gold)' }}>{totalCount.toLocaleString()}</span></>} cruises</>
                )}
              </span>
              {!loading && totalPages > 1 && (
                <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Page {page} of {totalPages}
                </span>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(255,80,80,0.07)', border: '1px solid rgba(255,80,80,0.2)', padding: '28px', textAlign: 'center', marginBottom: 32 }}>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', marginBottom: 16 }}>{error}</p>
              <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Request a Custom Quote</Link>
            </div>
          )}

          {/* Skeleton */}
          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {[...Array(6)].map((_, i) => <CruiseSkeleton key={i} delay={i * 0.1} />)}
            </div>
          )}

          {/* Cards */}
          {!loading && !error && cruises.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {cruises.map(c => <CruiseCard key={c.id} cruise={c} />)}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && !initialLoad && cruises.length === 0 && (
            <div style={{ textAlign: 'center', padding: '64px 24px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16, opacity: 0.4 }}>⚓</div>
              <h3 className="font-display" style={{ color: 'white', fontSize: '1.4rem', fontWeight: 300, marginBottom: 10 }}>No cruises found</h3>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', marginBottom: 28 }}>Try adjusting your filters, or let us find the perfect cruise for you.</p>
              <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Talk to a Specialist</Link>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 48, flexWrap: 'wrap' }}>
              <PagBtn disabled={page <= 1} onClick={() => handlePageChange(page - 1)} label="← Prev" />
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(pg => (
                <PagBtn key={pg} active={pg === page} onClick={() => handlePageChange(pg)} label={String(pg)} />
              ))}
              {totalPages > 7 && <span style={{ padding: '8px 4px', color: 'rgba(255,255,255,0.25)' }}>…</span>}
              <PagBtn disabled={page >= totalPages} onClick={() => handlePageChange(page + 1)} label="Next →" />
            </div>
          )}
        </div>

        {/* Trust strip */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 36, marginTop: 52, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 28, flexWrap: 'wrap' }}>
          {['No booking fees', 'Best price guarantee', '24hr expert response', 'Powered by Widgety'].map((t, i) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>{['🔒','✓','🕐','⚓'][i]}</span>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />
    </section>
  );
}

// ─── Cruise Card ──────────────────────────────────────────────────────────────

function CruiseCard({ cruise }: { cruise: Cruise }) {
  const [hovered, setHovered] = useState(false);

  const quoteParams = new URLSearchParams({
    destination: cruise.region || cruise.destination_name || '',
    line: cruise.operator_name || '',
    duration: `${cruise.nights} nights`,
    cruise_id: String(cruise.id),
    cruise_name: cruise.name || '',
  });

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
        border: hovered ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-3px)' : 'none',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ height: 190, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {cruise.image_url ? (
          <div style={{ width: '100%', height: '100%', backgroundImage: `url(${cruise.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1e2d42 0%, #162033 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', opacity: 0.25 }}>🚢</div>
        )}
        {/* Operator tag */}
        <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(13,27,42,0.88)', padding: '4px 10px', backdropFilter: 'blur(6px)' }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)' }}>{cruise.operator_name || 'Cruise'}</span>
        </div>
        {/* Nights badge */}
        <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'var(--gold)', padding: '4px 10px' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.06em' }}>{cruise.nights}N</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 400, color: 'white', lineHeight: 1.35, marginBottom: 4 }}>
          {cruise.name || `${cruise.nights}-Night ${cruise.destination_name || cruise.region || 'Cruise'}`}
        </h3>
        {cruise.ship_name && (
          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em', marginBottom: 14 }}>{cruise.ship_name}</p>
        )}

        {/* Meta */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
          {cruise.departure_date && <Meta icon="📅" text={formatDate(cruise.departure_date)} />}
          {cruise.departure_port && <Meta icon="⚓" text={cruise.departure_port} />}
          {(cruise.destination_name || cruise.region) && <Meta icon="🗺" text={cruise.destination_name || cruise.region} />}
        </div>

        {/* Port chips */}
        {cruise.ports?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
            {cruise.ports.slice(0, 4).map((p, i) => (
              <span key={i} style={{ fontSize: '0.66rem', padding: '3px 8px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>{p}</span>
            ))}
            {cruise.ports.length > 4 && (
              <span style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.2)', padding: '3px 0' }}>+{cruise.ports.length - 4} more</span>
            )}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)', gap: 10, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 2 }}>From</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 400, fontFamily: 'var(--font-display)', color: cruise.price_from ? 'var(--gold)' : 'rgba(255,255,255,0.35)' }}>
              {formatPrice(cruise.price_from, cruise.currency)}
            </div>
            {cruise.price_from && <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)' }}>per person</div>}
          </div>
          <Link
            href={`/request-quote?${quoteParams}`}
            style={{
              background: hovered ? 'var(--gold)' : 'transparent',
              color: hovered ? 'var(--navy)' : 'var(--gold)',
              border: '1px solid var(--gold)',
              padding: '9px 18px',
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.25s',
              whiteSpace: 'nowrap',
            }}
          >
            Get Quote
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── Small components ─────────────────────────────────────────────────────────

function Meta({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <span style={{ fontSize: '0.68rem' }}>{icon}</span>
      <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>{text}</span>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }: {
  label: string; value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500, marginBottom: 7 }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: '100%', padding: '12px 30px 12px 13px',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.14)',
            color: value === 'any' ? 'rgba(255,255,255,0.38)' : 'white',
            fontSize: '0.84rem', fontFamily: 'var(--font-body)',
            cursor: 'pointer', appearance: 'none', outline: 'none',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.background = 'rgba(255,255,255,0.1)'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.14)'; e.target.style.background = 'rgba(255,255,255,0.07)'; }}
        >
          {options.map(o => (
            <option key={o.value} value={o.value} style={{ background: '#162033', color: 'white' }}>{o.label}</option>
          ))}
        </select>
        <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '0.5rem' }}>▼</div>
      </div>
    </div>
  );
}

function PagBtn({ onClick, label, active, disabled }: { onClick: () => void; label: string; active?: boolean; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '8px 13px', minWidth: 36,
      background: active ? 'var(--gold)' : 'transparent',
      color: active ? 'var(--navy)' : disabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.55)',
      border: active ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.14)',
      fontSize: '0.76rem', fontFamily: 'var(--font-body)',
      fontWeight: active ? 600 : 400,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s',
    }}>
      {label}
    </button>
  );
}

function CruiseSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <div style={{ height: 190, background: 'rgba(255,255,255,0.06)', animationDelay: `${delay}s` }} className="skeleton-pulse" />
      <div style={{ padding: '22px' }}>
        {[85, 55, 38].map((w, i) => (
          <div key={i} className="skeleton-pulse" style={{ height: 11, background: 'rgba(255,255,255,0.06)', borderRadius: 2, marginBottom: 10, width: `${w}%`, animationDelay: `${delay + i * 0.1}s` }} />
        ))}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '18px 0 13px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="skeleton-pulse" style={{ height: 20, width: 70, background: 'rgba(255,255,255,0.06)', borderRadius: 2, animationDelay: `${delay}s` }} />
          <div className="skeleton-pulse" style={{ height: 34, width: 76, background: 'rgba(255,255,255,0.06)', borderRadius: 2, animationDelay: `${delay}s` }} />
        </div>
      </div>
      <style>{`.skeleton-pulse { animation: skPulse 1.6s ease-in-out infinite; } @keyframes skPulse { 0%,100%{opacity:.35} 50%{opacity:.7} }`}</style>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: 'spin 0.75s linear infinite' }}>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="22 12" />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </svg>
  );
}
