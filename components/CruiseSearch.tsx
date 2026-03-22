'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

type WidgetyCruise = {
  ref: string;
  holiday_ref: string;          // V3 ref
  name: string;
  cruise_nights: number;
  duration_days?: number;
  cruise_type: string[];
  holiday_type?: string[];
  starts_on: string;
  ends_on: string;
  date_from?: string;
  date_to?: string;
  starts_at: any;               // {name, country} or string
  ends_at: any;
  regions: string[];
  operator: string;
  operator_title: string;
  ship: string;
  ship_title: string;
  rating: string | null;
  description: string;
  vendor_id: string;
  image_url?: string | null;
  operating_seasons?: any[];    // contains dates[] with date_ref
};

type ItineraryDay = {
  day_number: number;
  title: string;
  description: string;
  category: string;
  location: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  arrival: string | null;
  departure: string | null;
  meals: string[] | null;
  port_images?: { href: string; credit: string }[];
  port_description?: string;
};

type ItineraryData = {
  items: ItineraryDay[];
  holiday_name: string;
  ship_title: string;
  operator_title: string;
  date_from: string;
  date_to: string;
  starts_at: any;
  ends_at: any;
  regions: string[];
  countries: string[];
  description: string | null;
  duration_days: number;
  cruise_nights: number;
  available_dates?: { date_ref: string; date_from: string; date_to: string; ship_title: string; availability: string }[];
};

type WidgetyOperator = {
  id: string;               // slug e.g. "norwegian-cruise-line"
  slug?: string;            // same as id — set by operators route
  title: string;
  cover_image_href: string;
  profile_image_href: string;
  href: string;
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
  { value: 'any',           label: 'Any Destination' },
  { value: 'caribbean',     label: 'Caribbean' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'alaska',        label: 'Alaska' },
  { value: 'bahamas',       label: 'The Bahamas' },
  { value: 'bermuda',       label: 'Bermuda' },
  { value: 'hawaii',        label: 'Hawaii' },
  { value: 'europe',        label: 'Europe' },
  { value: 'northern_europe', label: 'Northern Europe & Fjords' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'asia',          label: 'Asia' },
  { value: 'south_america', label: 'South America' },
  { value: 'americas',      label: 'Americas' },
  { value: 'pacific',       label: 'Pacific' },
  { value: 'mississippi',   label: 'Mississippi River' },
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

// River-only operator slugs — used to filter the dropdown by cruise type
// These are the known river cruise lines across all 20 Widgety operators
const RIVER_OPERATOR_SLUGS = new Set([
  'amawaterways',
  'avalon-waterways',
  'uniworld-boutique-river-cruises',
  'tauck',                      // does both but primarily river
  'celebrity-river-cruises',
  'american-cruise-lines',      // does both river and coastal ocean
]);

// Fallback operator list shown before API loads
const FALLBACK_OPERATORS = [
  { value: 'any', label: 'All Cruise Lines' },
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

type CruiseSearchProps = {
  redirectTo?: string;
  initialFilters?: Partial<SearchFilters>;
  searchOnly?: boolean; // hides results, used on homepage
};

export default function CruiseSearch({ redirectTo, initialFilters, searchOnly }: CruiseSearchProps = {}) {
  const router = useRouter();
  const [filters, setFilters]         = useState<SearchFilters>({ ...DEFAULT_FILTERS, ...initialFilters });
  const [applied, setApplied]         = useState<SearchFilters>({ ...DEFAULT_FILTERS, ...initialFilters });
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

  // Store all 20 operators; filter dropdown by selected cruise type
  const [allOperators, setAllOperators] = useState<WidgetyOperator[]>([]);

  useEffect(() => {
    fetch('/api/widgety/operators')
      .then(r => r.json())
      .then(data => {
        const list: WidgetyOperator[] = data.operators || data || [];
        if (list.length > 0) {
          const map = new Map<string, WidgetyOperator>();
          list.forEach(o => { map.set(o.id, o); if (o.slug) map.set(o.slug, o); });
          setOperatorMap(map);
          setAllOperators(list);
          // Show all by default (no cruise type filter selected yet)
          setOperatorOptions([
            { value: 'any', label: 'All Cruise Lines' },
            ...list.map(o => ({ value: o.id, label: o.title })),
          ]);
        }
      })
      .catch(() => {});
  }, []);

  // When cruise type changes, update operator dropdown to match
  useEffect(() => {
    if (allOperators.length === 0) return;
    let filtered = allOperators;
    if (filters.cruiseType === 'ocean') {
      filtered = allOperators.filter(o => !RIVER_OPERATOR_SLUGS.has(o.id));
    } else if (filters.cruiseType === 'river') {
      filtered = allOperators.filter(o => RIVER_OPERATOR_SLUGS.has(o.id));
    }
    setOperatorOptions([
      { value: 'any', label: 'All Cruise Lines' },
      ...filtered.map(o => ({ value: o.id, label: o.title })),
    ]);
    // Reset operator selection if current choice is no longer valid
    setFilters(f => ({
      ...f,
      operator: filtered.some(o => o.id === f.operator) ? f.operator : 'any',
    }));
  }, [filters.cruiseType, allOperators]);

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
      // Remove 'any' values — route ignores them but keep URL clean
      ['destination','operator','cruise_type','duration','month','year'].forEach(k => {
        if (params.get(k) === 'any') params.delete(k);
      });
      const res = await fetch(`/api/widgety/cruises?${params}`);
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();

      const list: WidgetyCruise[] = data.holidays || data.cruises || (Array.isArray(data) ? data : []);
      const total = data.total  ?? list.length;
      const pages = data.pages  ?? Math.ceil(total / 12) ?? 1;

      setCruises(list);
      setTotalPages(pages || 1);
      setTotalCount(total);
    } catch {
      setError('Unable to load live results right now. Please try again or request a custom quote.');
      setCruises([]);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  // Run initial search on mount — skip when searchOnly (homepage just redirects)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (searchOnly) return;
    const startFilters = { ...DEFAULT_FILTERS, ...initialFilters };
    setFilters(startFilters);
    setApplied(startFilters);
    fetchCruises(startFilters, 1);
  }, [fetchCruises]);

  const handleSearch = () => {
    if (redirectTo) {
      // Build query string from current filters and navigate to results page
      const params = new URLSearchParams();
      if (filters.destination !== 'any') params.set('destination', filters.destination);
      if (filters.operator    !== 'any') params.set('operator',    filters.operator);
      if (filters.cruiseType  !== 'any') params.set('cruise_type', filters.cruiseType);
      if (filters.duration    !== 'any') params.set('duration',    filters.duration);
      if (filters.month       !== 'any') params.set('month',       filters.month);
      if (filters.year        !== 'any') params.set('year',        filters.year);
      const qs = params.toString();
      router.push(`${redirectTo}${qs ? '?' + qs : ''}`);
      return;
    }
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

        {/* Results — hidden in searchOnly mode */}
        <div id="cruise-results" style={{ display: searchOnly ? 'none' : 'block' }}>
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


// ─── Itinerary Modal ──────────────────────────────────────────────────────────

function ItineraryModal({ cruise, onClose }: { cruise: WidgetyCruise; onClose: () => void }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<ItineraryData | null>(null);
  const [selectedDateRef, setSelectedDateRef] = useState<string>('');
  const [activeDay, setActiveDay] = useState<number>(0);

  // Extract available dates from operating_seasons
  const availableDates = (cruise.operating_seasons || []).flatMap((s: any) =>
    (s.dates || []).map((d: any) => ({
      date_ref: d.date_ref, date_from: d.date_from, date_to: d.date_to,
      ship_title: d.ship_title, availability: d.availability_string,
    }))
  ).filter((d: any) => d.date_ref);

  // Pick first available date_ref on mount
  useEffect(() => {
    const ref = availableDates[0]?.date_ref;
    if (ref) setSelectedDateRef(ref);
  }, []);

  // Fetch itinerary when date_ref changes
  useEffect(() => {
    if (!selectedDateRef) { setLoading(false); return; }
    setLoading(true); setError(''); setActiveDay(0);
    fetch('/api/widgety/cruises', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'itinerary', date_ref: selectedDateRef }),
    })
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error);
        // Enrich items with port images from raw data
        setData({ ...d, available_dates: availableDates });
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [selectedDateRef]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const formatDateTime = (iso: string) => {
    if (!iso) return '';
    try { return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }); }
    catch { return iso.slice(0, 10); }
  };

  const nights = cruise.cruise_nights || data?.cruise_nights || 0;
  const region = (cruise.regions || [])[0] || '';

  const activeItem = data?.items?.[activeDay];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(7,14,24,0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--navy)',
          border: '1px solid rgba(201,168,76,0.25)',
          width: '100%', maxWidth: 900,
          maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          animation: 'slideUp 0.25s ease',
        }}
      >
        {/* Header */}
        <div style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '20px 28px', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>
                {cruise.operator_title} · {nights} Night{nights !== 1 ? 's' : ''} · {region}
              </div>
              <h2 className="font-display" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 300, color: 'white', lineHeight: 1.2, margin: 0 }}>
                {cruise.name}
              </h2>
              {cruise.ship_title && (
                <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                  Aboard {cruise.ship_title}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', width: 36, height: 36, cursor: 'pointer', fontSize: '1.1rem', flexShrink: 0, marginLeft: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ×
            </button>
          </div>

          {/* Date selector */}
          {availableDates.length > 0 && (
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>Sailing Date:</span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {availableDates.slice(0, 8).map((d: any) => (
                  <button
                    key={d.date_ref}
                    onClick={() => setSelectedDateRef(d.date_ref)}
                    style={{
                      padding: '5px 12px', fontSize: '0.7rem', cursor: 'pointer',
                      border: '1px solid',
                      borderColor: selectedDateRef === d.date_ref ? 'var(--gold)' : 'rgba(255,255,255,0.15)',
                      background: selectedDateRef === d.date_ref ? 'rgba(201,168,76,0.15)' : 'transparent',
                      color: selectedDateRef === d.date_ref ? 'var(--gold)' : 'rgba(255,255,255,0.45)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {formatDateTime(d.date_from)}
                  </button>
                ))}
                {availableDates.length > 8 && (
                  <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', padding: '5px 8px' }}>+{availableDates.length - 8} more</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', minHeight: 0 }}>
          {loading ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
              <div style={{ width: 40, height: 40, border: '2px solid rgba(201,168,76,0.3)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.3)' }}>Loading itinerary…</p>
            </div>
          ) : error ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginBottom: 8 }}>Itinerary unavailable</p>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem' }}>{error}</p>
              </div>
            </div>
          ) : !data?.items?.length ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>No itinerary data available for this sailing.</p>
            </div>
          ) : (
            <>
              {/* Day list sidebar */}
              <div style={{ width: 220, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.07)', overflowY: 'auto', background: 'rgba(0,0,0,0.2)' }}>
                {/* Trip summary */}
                {data.date_from && (
                  <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>Departure</div>
                    <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>{formatDateTime(data.date_from)}</div>
                    {data.date_to && <>
                      <div style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginTop: 8, marginBottom: 4 }}>Return</div>
                      <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>{formatDateTime(data.date_to)}</div>
                    </>}
                    {data.countries?.length > 0 && (
                      <>
                        <div style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginTop: 8, marginBottom: 4 }}>Countries</div>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>{data.countries.join(', ')}</div>
                      </>
                    )}
                  </div>
                )}
                {data.items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    style={{
                      width: '100%', textAlign: 'left', background: 'none',
                      border: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)',
                      borderLeft: activeDay === i ? '3px solid var(--gold)' : '3px solid transparent',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      background: activeDay === i ? 'rgba(201,168,76,0.07)' : 'transparent',
                      transition: 'all 0.15s',
                    } as any}
                  >
                    <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: activeDay === i ? 'var(--gold)' : 'rgba(255,255,255,0.25)', marginBottom: 3 }}>
                      Day {item.day_number}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: activeDay === i ? 'white' : 'rgba(255,255,255,0.55)', lineHeight: 1.3, fontWeight: activeDay === i ? 500 : 400 }}>
                      {item.location || 'At Sea'}
                    </div>
                    {item.country && (
                      <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{item.country}</div>
                    )}
                    {(item.arrival || item.departure) && (
                      <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', marginTop: 3 }}>
                        {item.arrival && `Arr ${item.arrival}`}{item.arrival && item.departure && ' · '}{item.departure && `Dep ${item.departure}`}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Day detail panel */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', minWidth: 0 }}>
                {activeItem && (
                  <>
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>
                        Day {activeItem.day_number} of {data.items.length}
                        {activeItem.category && ` · ${activeItem.category.replace('_',' ')}`}
                      </div>
                      <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 300, color: 'white', marginBottom: 4 }}>
                        {activeItem.location || 'At Sea'}
                      </h3>
                      {activeItem.country && (
                        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>{activeItem.country}</p>
                      )}
                      {/* Times */}
                      {(activeItem.arrival || activeItem.departure) && (
                        <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                          {activeItem.arrival && (
                            <div>
                              <div style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 2 }}>Arrival</div>
                              <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-display)' }}>{activeItem.arrival}</div>
                            </div>
                          )}
                          {activeItem.departure && (
                            <div>
                              <div style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 2 }}>Departure</div>
                              <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-display)' }}>{activeItem.departure}</div>
                            </div>
                          )}
                        </div>
                      )}
                      {/* Meals */}
                      {activeItem.meals?.length && (
                        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                          {activeItem.meals.map((m, i) => (
                            <span key={i} style={{ fontSize: '0.62rem', padding: '3px 10px', border: '1px solid rgba(201,168,76,0.25)', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>{m}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Port description */}
                    {activeItem.description && activeItem.description !== `Day ${activeItem.day_number}` && (
                      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 20 }}>
                        {activeItem.description}
                      </p>
                    )}

                    {/* Port photos */}
                    {activeItem.port_images && activeItem.port_images.length > 0 && (
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>Port Photos</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                          {activeItem.port_images.map((img: any, i: number) => (
                            <div key={i} style={{ position: 'relative', paddingBottom: '66%', overflow: 'hidden', background: 'rgba(255,255,255,0.05)' }}>
                              <img
                                src={img.href}
                                alt={activeItem.location}
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={e => { (e.target as HTMLElement).parentElement!.style.display = 'none'; }}
                              />
                              {img.credit && (
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3px 6px', background: 'rgba(0,0,0,0.5)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {img.credit}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Navigation */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                      {activeDay > 0 && (
                        <button onClick={() => setActiveDay(activeDay - 1)} style={{ padding: '8px 16px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', cursor: 'pointer', letterSpacing: '0.08em' }}>
                          ← Prev
                        </button>
                      )}
                      {activeDay < data.items.length - 1 && (
                        <button onClick={() => setActiveDay(activeDay + 1)} style={{ padding: '8px 16px', background: 'rgba(201,168,76,0.1)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '0.72rem', cursor: 'pointer', letterSpacing: '0.08em' }}>
                          Next →
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '14px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0, background: 'rgba(0,0,0,0.2)', flexWrap: 'wrap', gap: 10 }}>
          <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' }}>
            Itinerary subject to change. Contact Crestwell for latest availability.
          </p>
          <Link
            href={`/request-quote?cruise_name=${encodeURIComponent(cruise.name || '')}&line=${encodeURIComponent(cruise.operator_title || '')}`}
            onClick={onClose}
            style={{ padding: '9px 20px', background: 'var(--gold)', color: 'var(--navy)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}
          >
            Get Quote
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
    </div>
  );
}

function CruiseCard({ cruise, operatorMap }: { cruise: WidgetyCruise; operatorMap: Map<string, WidgetyOperator> }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);

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
        <div style={{ paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <button
              onClick={() => setShowItinerary(true)}
              style={{
                flex: 1, padding: '9px 12px', fontSize: '0.65rem', fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                fontFamily: 'var(--font-body)', cursor: 'pointer',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.55)',
                transition: 'all 0.25s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'; (e.target as HTMLElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'; (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
            >
              📋 View Itinerary
            </button>
            <Link
              href={`/request-quote?${quoteParams}`}
              style={{
                flex: 1, textAlign: 'center',
                background: hovered ? 'var(--gold)' : 'transparent',
                color: hovered ? 'var(--navy)' : 'var(--gold)',
                border: '1px solid var(--gold)',
                padding: '9px 12px', fontSize: '0.65rem', fontWeight: 500,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                textDecoration: 'none', fontFamily: 'var(--font-body)',
                transition: 'all 0.25s', whiteSpace: 'nowrap',
                display: 'block',
              }}
            >
              Get Quote
            </Link>
          </div>
          <div style={{ fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
            Pricing available on request
          </div>
        </div>
      </div>
      {showItinerary && (
        <ItineraryModal cruise={cruise} onClose={() => setShowItinerary(false)} />
      )}
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
