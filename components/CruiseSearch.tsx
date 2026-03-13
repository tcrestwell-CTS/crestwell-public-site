'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

type WidgetyCruise = {
  ref: string;
  name: string;
  cruise_nights: number;
  cruise_type: string[];
  starts_on: string;
  ends_on: string;
  starts_at: string;
  ends_at: string;
  regions: string[];
  operator: string;        // URL e.g. "https://www.widgety.co.uk/api/operators/norwegian-cruise-line.json"
  operator_title: string;
  ship: string;
  ship_title: string;
  rating: string | null;
  description: string;
  vendor_id: string;
};

type WidgetyOperator = {
  id: string;              // slug e.g. "norwegian-cruise-line"
  title: string;
  cover_image_href: string;   // full CDN URL
  profile_image_href: string; // full CDN URL
  href: string;            // API URL
};

type SearchFilters = {
  destination: string;
  operator: string;
  cruiseType: string;
  duration: string;
  month: string;
  year: string;
};

// ─── Region fallback images (Unsplash) ───────────────────────────────────────
// Only used when operator image is unavailable

const DEFAULT_CRUISE_IMAGE = 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80';

// Regions and cruise names vary per card — use these for visual variety.
// Checked top-to-bottom; first match wins.
const REGION_IMAGE_MAP: { keyword: string; url: string }[] = [
  { keyword: 'caribbean',     url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
  { keyword: 'bahamas',       url: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&q=80' },
  { keyword: 'bermuda',       url: 'https://images.unsplash.com/photo-1565073624497-7144969f8561?w=800&q=80' },
  { keyword: 'mediterranean', url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80' },
  { keyword: 'alaska',        url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80' },
  { keyword: 'norway',        url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80' },
  { keyword: 'fjord',         url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80' },
  { keyword: 'hawaii',        url: 'https://images.unsplash.com/photo-1505852679233-d9fd70aff56d?w=800&q=80' },
  { keyword: 'mexico',        url: 'https://images.unsplash.com/photo-1512813498716-3e640fed3f5f?w=800&q=80' },
  { keyword: 'south america', url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80' },
  { keyword: 'south pacific', url: 'https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=800&q=80' },
  { keyword: 'pacific',       url: 'https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=800&q=80' },
  { keyword: 'asia',          url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80' },
  { keyword: 'japan',         url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80' },
  { keyword: 'australia',     url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' },
  { keyword: 'europe',        url: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80' },
  { keyword: 'british isles', url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80' },
  { keyword: 'transatlantic', url: 'https://images.unsplash.com/photo-1473615695634-bfd05d49cb7f?w=800&q=80' },
  { keyword: 'east coast',    url: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80' },
  { keyword: 'mississippi',   url: 'https://images.unsplash.com/photo-1467226632440-65f0b4957563?w=800&q=80' },
  { keyword: 'columbia',      url: 'https://images.unsplash.com/photo-1473615695634-bfd05d49cb7f?w=800&q=80' },
  { keyword: 'river',         url: 'https://images.unsplash.com/photo-1467226632440-65f0b4957563?w=800&q=80' },
  { keyword: 'florida',       url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
  { keyword: 'gulf',          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
  { keyword: 'sea island',    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
  { keyword: 'canada',        url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80' },
  { keyword: 'africa',        url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80' },
  { keyword: 'antarctic',     url: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=800&q=80' },
  { keyword: 'arctic',        url: 'https://images.unsplash.com/photo-1517783999520-f068d7431a60?w=800&q=80' },
  { keyword: 'world',         url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80' },
];

function getImageForCruise(cruise: WidgetyCruise, operatorMap: Map<string, WidgetyOperator>): string {
  // Combine regions + cruise name for keyword matching
  const haystack = [
    ...(cruise.regions || []),
    cruise.name || '',
  ].join(' ').toLowerCase();

  // 1. Region / name keyword match (varies per card)
  for (const { keyword, url } of REGION_IMAGE_MAP) {
    if (haystack.includes(keyword)) return url;
  }

  // 2. River cruise type
  if ((cruise.cruise_type || []).some(t => t.toLowerCase() === 'river')) {
    return 'https://images.unsplash.com/photo-1467226632440-65f0b4957563?w=800&q=80';
  }

  // 3. Operator cover image (same per operator, last resort)
  const slug = cruise.operator?.split('/operators/')[1]?.replace('.json', '');
  const op = slug ? operatorMap.get(slug) : undefined;
  if (op?.cover_image_href) return op.cover_image_href;

  return DEFAULT_CRUISE_IMAGE;
}


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
  { value: '1',  label: 'January' },  { value: '2',  label: 'February' },
  { value: '3',  label: 'March' },    { value: '4',  label: 'April' },
  { value: '5',  label: 'May' },      { value: '6',  label: 'June' },
  { value: '7',  label: 'July' },     { value: '8',  label: 'August' },
  { value: '9',  label: 'September' },{ value: '10', label: 'October' },
  { value: '11', label: 'November' }, { value: '12', label: 'December' },
];

const YEARS = [
  { value: 'any',  label: 'Any Year' },
  { value: '2026', label: '2026' },
  { value: '2027', label: '2027' },
];

const CRUISE_TYPES = [
  { value: 'any',   label: 'Ocean & River' },
  { value: 'ocean', label: 'Ocean Cruises' },
  { value: 'river', label: 'River Cruises' },
];

// Operators available in this Widgety account (confirmed from live data)
// Shown as fallback until API confirms the list
const FALLBACK_OPERATORS = [
  { value: 'any',                   label: 'All Cruise Lines' },
  { value: 'american-cruise-lines', label: 'American Cruise Lines' },
  { value: 'princess-cruises',      label: 'Princess Cruises' },
  { value: 'cunard-line',           label: 'Cunard' },
];

const DEFAULT_FILTERS: SearchFilters = {
  destination: 'any', operator: 'any', cruiseType: 'any',
  duration: 'any', month: 'any', year: 'any',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CruiseSearch() {
  const [filters, setFilters]         = useState<SearchFilters>(DEFAULT_FILTERS);
  const [applied, setApplied]         = useState<SearchFilters>(DEFAULT_FILTERS);
  const [operatorOptions, setOperatorOptions] = useState(FALLBACK_OPERATORS);
  // Map of slug → full operator object (for image lookup)
  const [operatorMap, setOperatorMap] = useState<Map<string, WidgetyOperator>>(new Map());
  const [cruises, setCruises]         = useState<WidgetyCruise[]>([]);
  const [loading, setLoading]         = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError]             = useState('');
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [totalCount, setTotalCount]   = useState(0);

  // Load all operators for dropdown + image map
  useEffect(() => {
    fetch('/api/widgety/operators')
      .then(r => r.json())
      .then(data => {
        const list: WidgetyOperator[] = data.operators || data || [];
        if (list.length > 0) {
          const map = new Map<string, WidgetyOperator>();
          list.forEach(o => map.set(o.id, o));
          setOperatorMap(map);
          setOperatorOptions([
            { value: 'any', label: 'All Cruise Lines' },
            ...list.map(o => ({ value: o.id, label: o.title })),
          ]);
        }
      })
      .catch(() => {}); // fallback list already set
  }, []);

  const fetchCruises = useCallback(async (f: SearchFilters, pg: number) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        destination: f.destination,
        operator:    f.operator,
        cruise_type: f.cruiseType,
        duration:    f.duration,
        month:       f.month,
        year:        f.year,
        page:        String(pg),
      });
      const res = await fetch(`/api/widgety/cruises?${params}`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();

      const list: WidgetyCruise[] = data.cruises || (Array.isArray(data) ? data : []);
      const total = data.total || list.length;

      setCruises(list);
      setTotalPages(Math.ceil(total / 9) || 1);
      setTotalCount(total);
    } catch {
      setError('Unable to load live results right now. Please try again or request a custom quote.');
      setCruises([]);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

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
            <FilterSelect label="Destination" value={filters.destination} onChange={update('destination')} options={DESTINATIONS} />
            <FilterSelect label="Cruise Line"  value={filters.operator}   onChange={update('operator')}    options={operatorOptions} />
            <FilterSelect label="Cruise Type"  value={filters.cruiseType} onChange={update('cruiseType')}  options={CRUISE_TYPES} />
            <FilterSelect label="Duration"     value={filters.duration}   onChange={update('duration')}    options={DURATIONS} />
            <FilterSelect label="Month"        value={filters.month}      onChange={update('month')}       options={MONTHS} />
            <FilterSelect label="Year"         value={filters.year}       onChange={update('year')}        options={YEARS} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                background: loading ? 'rgba(201,168,76,0.5)' : 'var(--gold)',
                color: 'var(--navy)', border: 'none',
                padding: '15px 52px', fontSize: '0.78rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', gap: 10,
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

          {error && (
            <div style={{ background: 'rgba(255,80,80,0.07)', border: '1px solid rgba(255,80,80,0.2)', padding: '28px', textAlign: 'center', marginBottom: 32 }}>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', marginBottom: 16 }}>{error}</p>
              <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Request a Custom Quote</Link>
            </div>
          )}

          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {[...Array(6)].map((_, i) => <CruiseSkeleton key={i} delay={i * 0.1} />)}
            </div>
          )}

          {!loading && !error && cruises.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {cruises.map(c => (
                <CruiseCard key={c.ref} cruise={c} operatorMap={operatorMap} />
              ))}
            </div>
          )}

          {!loading && !error && !initialLoad && cruises.length === 0 && (
            <div style={{ textAlign: 'center', padding: '64px 24px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 16, opacity: 0.4 }}>⚓</div>
              <h3 className="font-display" style={{ color: 'white', fontSize: '1.4rem', fontWeight: 300, marginBottom: 10 }}>No cruises found</h3>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem', marginBottom: 28 }}>Try adjusting your filters, or let us find the perfect cruise for you.</p>
              <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Talk to a Specialist</Link>
            </div>
          )}

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

function CruiseCard({ cruise, operatorMap }: { cruise: WidgetyCruise; operatorMap: Map<string, WidgetyOperator> }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const imageUrl = imgError ? DEFAULT_CRUISE_IMAGE : getImageForCruise(cruise, operatorMap);
  const region = (cruise.regions || [])[0] || '';
  const cruiseType = (cruise.cruise_type || [])[0] || '';

  // Extract operator slug for profile image (small logo overlay)
  const operatorSlug = cruise.operator?.split('/operators/')[1]?.replace('.json', '');
  const operatorData = operatorSlug ? operatorMap.get(operatorSlug) : undefined;

  const quoteParams = new URLSearchParams({
    destination: region,
    line: cruise.operator_title || '',
    duration: `${cruise.cruise_nights} nights`,
    cruise_id: cruise.ref || '',
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
        <div
          style={{
            width: '100%', height: '100%',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        {/* Invisible img tag to catch load errors for background-image */}
        <img
          src={imageUrl}
          alt=""
          onError={() => setImgError(true)}
          style={{ display: 'none' }}
        />

        {/* Operator logo (profile_image_href) — small square top-left */}
        {operatorData?.profile_image_href ? (
          <div style={{ position: 'absolute', top: 10, left: 10, width: 36, height: 36, background: 'rgba(255,255,255,0.92)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 3 }}>
            <img
              src={operatorData.profile_image_href}
              alt={cruise.operator_title}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>
        ) : (
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(13,27,42,0.88)', padding: '4px 10px', backdropFilter: 'blur(6px)' }}>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              {cruise.operator_title || 'Cruise'}
            </span>
          </div>
        )}

        {/* Nights badge */}
        <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'var(--gold)', padding: '4px 10px' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.06em' }}>
            {cruise.cruise_nights}N
          </span>
        </div>

        {/* Ocean / River badge */}
        {cruiseType && (
          <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(13,27,42,0.75)', padding: '4px 8px', backdropFilter: 'blur(4px)' }}>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
              {cruiseType}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 400, color: 'white', lineHeight: 1.35, marginBottom: 4 }}>
          {cruise.name || `${cruise.cruise_nights}-Night ${region || 'Cruise'}`}
        </h3>
        {cruise.ship_title && (
          <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em', marginBottom: 14 }}>
            {cruise.ship_title}
          </p>
        )}

        {/* Meta */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
          {cruise.starts_on && <Meta icon="📅" text={formatDate(cruise.starts_on)} />}
          {cruise.starts_at && <Meta icon="⚓" text={cruise.starts_at} />}
          {region           && <Meta icon="🗺" text={region} />}
          {cruise.rating    && <Meta icon="⭐" text={cruise.rating} />}
        </div>

        {/* Extra region chips when multiple */}
        {cruise.regions?.length > 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
            {cruise.regions.slice(0, 4).map((r, i) => (
              <span key={i} style={{ fontSize: '0.66rem', padding: '3px 8px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>{r}</span>
            ))}
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)', gap: 10, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 2 }}>Pricing</div>
            <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.4)' }}>
              Request a quote
            </div>
          </div>
          <Link
            href={`/request-quote?${quoteParams}`}
            style={{
              background: hovered ? 'var(--gold)' : 'transparent',
              color: hovered ? 'var(--navy)' : 'var(--gold)',
              border: '1px solid var(--gold)',
              padding: '9px 18px', fontSize: '0.68rem', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              textDecoration: 'none', fontFamily: 'var(--font-body)',
              transition: 'all 0.25s', whiteSpace: 'nowrap',
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
