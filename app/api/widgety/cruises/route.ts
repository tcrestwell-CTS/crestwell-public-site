// app/api/widgety/cruises/route.ts
//
// KEY FIX: Removing "api_version=2" from Accept header unlocks all 20 operators.
// Accept: "application/json;api_version=2" → 404 on /holidays.json (3 operators only via V2)
// Accept: "application/json"               → 27,000+ holidays, all 20 operators, itineraries
//
// The Lovable agent dashboard works for this exact reason — it sends no version header.

import { NextRequest, NextResponse } from 'next/server';

const BASE     = 'https://www.widgety.co.uk/api';
const PER_PAGE = 9;
const HEADERS    = { Accept: 'application/json' } as const;   // NO api_version — V3
const V2_HEADERS = { Accept: 'application/json;api_version=2' } as const; // V2 fallback

// These operators only have inventory in V2 /cruises.json, not V3 /holidays.json
const V2_ONLY_OPERATORS = new Set([
  'american-cruise-lines',
  'cunard-line',
  'princess-cruises',
]);

// Cruise type operator routing — holiday_type is NOT a valid API param (causes 400)
// Route by operator set instead
const RIVER_OPERATOR_SET = new Set([
  'amawaterways', 'avalon-waterways', 'american-cruise-lines',
  'uniworld-boutique-river-cruises', 'tauck', 'celebrity-river-cruises',
]);

function auth() {
  return {
    app_id: process.env.WIDGETY_APP_ID!,
    token:  process.env.WIDGETY_APP_TOKEN || process.env.WIDGETY_TOKEN!,
  };
}

// ─── V2 cruise search (for operators not on V3) ───────────────────────────────
async function searchCruisesV2(params: Record<string, string>) {
  try {
    const res = await fetch(
      `${BASE}/cruises.json?${new URLSearchParams({ ...auth(), ...params })}`,
      { headers: V2_HEADERS, next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const d = await res.json();
    // Normalise V2 cruise shape to match V3 holiday shape
    const holidays = (d.cruises || []).map((c: any) => ({
      holiday_ref:    c.ref,
      name:           c.name,
      operator:       c.operator,
      operator_title: c.operator_title,
      cruise_nights:  c.cruise_nights ? parseInt(c.cruise_nights) : null,
      duration_days:  c.cruise_nights ? parseInt(c.cruise_nights) + 1 : null,
      starts_at:      { name: c.starts_at },
      ends_at:        { name: c.ends_at },
      date_from:      c.starts_on,
      date_to:        c.ends_on,
      regions:        Array.isArray(c.regions) ? c.regions : [],
      holiday_type:   Array.isArray(c.cruise_type) ? c.cruise_type.map((t: string) => t.toLowerCase() === 'river' ? 'river_cruise' : 'ocean_cruise') : ['ocean_cruise'],
      rating:         c.rating,
      description:    c.description !== 'None' ? c.description : null,
      ship_title:     c.ship_title,
      image_url:      null, // enriched later
    }));
    return { holidays, total: d.total || 0 };
  } catch { return null; }
}

const ACTIVE_OPERATORS = [
  'american-cruise-lines','princess-cruises','cunard-line',
  'norwegian-cruise-line','royal-caribbean-international','carnival-cruise-lines-operator',
  'disney-cruise-line','celebrity-cruises','holland-america-line','msc-cruises',
  'virgin-voyages','amawaterways','avalon-waterways','silversea-cruises',
  'seabourn-cruise-line','tauck','uniworld-boutique-river-cruises',
  'explora-journeys','ritz-carlton-yacht-collection','celebrity-river-cruises',
];

// REGION_MAP: component value → Widgety API slug (must be lowercase)
// All slugs verified valid against live API
const REGION_MAP: Record<string, string> = {
  caribbean:       'caribbean',       // 8,628 results
  mediterranean:   'mediterranean',   // 5,740 results
  alaska:          'alaska',          // 2,633 results
  bahamas:         'bahamas',         // 1,022 results
  bermuda:         'bermuda',         //    82 results
  hawaii:          'hawaii',          //    28 results
  europe:          'europe',          // 10,534 results
  northern_europe: 'northern-europe', //  1,302 results
  southern_europe: 'southern-europe', //  6,295 results
  scandinavia:     'scandinavia',     //    59 results
  asia:            'asia',            //   944 results
  pacific:         'pacific',         //  1,088 results
  south_america:   'south-america',   //  8,173 results
  north_america:   'north-america',   //  3,495 results
  central_america: 'central-america', //   453 results
  americas:        'americas',        // 12,769 results
  middle_east:     'middle-east',     //   161 results
  indian_ocean:    'indian-ocean',    //    16 results
  mississippi:     'mississippi',     //     1 result
  amazon:          'amazon',          //    36 results
  atlantic:        'atlantic',        //   163 results
  // REMOVED — invalid slugs (cause 400 error): mexico, norway, australia, world
};

const DURATION_RANGES: Record<string, [number, number]> = {
  short:[2,4], week:[5,7], ten:[8,10], fortnight:[11,14], extended:[15,999],
};

// ─── Operator image cache ─────────────────────────────────────────────────────
let _imgCache: Map<string, string> | null = null;
let _imgTime = 0;

async function getOperatorImages(): Promise<Map<string, string>> {
  if (_imgCache && Date.now() - _imgTime < 3_600_000) return _imgCache;
  try {
    const res = await fetch(`${BASE}/operators.json?${new URLSearchParams(auth())}`, {
      headers: HEADERS, next: { revalidate: 3600 },
    });
    if (!res.ok) return new Map();
    const data = await res.json();
    const map = new Map<string, string>();
    for (const op of data.operators || []) {
      const slug = (op.href || '').split('/operators/')[1]?.replace('.json', '');
      if (slug && op.cover_image_href) map.set(slug, op.cover_image_href);
      if (op.title && op.cover_image_href) map.set(op.title, op.cover_image_href);
    }
    _imgCache = map; _imgTime = Date.now();
    return map;
  } catch { return new Map(); }
}

function enrich(h: any, imgMap: Map<string, string>) {
  if (h.image_url) return h;
  const slug = (h.operator || '').match(/operators\/([^.]+)\.json/)?.[1];
  return { ...h, image_url: (slug && imgMap.get(slug)) || imgMap.get(h.operator_title) || null };
}

async function searchHolidays(params: Record<string, string>) {
  try {
    const res = await fetch(
      `${BASE}/holidays.json?${new URLSearchParams({ ...auth(), market: 'us', ...params })}`,
      { headers: HEADERS, next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const d = await res.json();
    return { holidays: d.holidays ?? [], total: d.total || 0 };
  } catch { return null; }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── GET — cruise search page ─────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const sp          = req.nextUrl.searchParams;
  const destination = sp.get('destination') || 'any';
  const operator    = sp.get('operator')    || 'any';
  const cruiseType  = sp.get('cruise_type') || 'any';
  const duration    = sp.get('duration')    || 'any';
  const month       = sp.get('month')       || 'any';
  const year        = sp.get('year')        || 'any';
  const page        = parseInt(sp.get('page') || '1', 10);

  const imgMap = await getOperatorImages();
  const params: Record<string, string> = { limit: String(PER_PAGE), page: String(page) };

  if (destination !== 'any' && REGION_MAP[destination]) params.regions    = REGION_MAP[destination];
  if (operator    !== 'any')                             params.operators  = operator;
  // holiday_type not supported by API — filtered client-side below

  let hasDateFilter = false;
  if (month !== 'any') {
    const y = year !== 'any' ? parseInt(year) : new Date().getFullYear();
    const m = parseInt(month);
    params.date_from = `${y}-${String(m).padStart(2,'0')}-01`;
    params.date_to   = `${y}-${String(m).padStart(2,'0')}-${new Date(y,m,0).getDate()}`;
    hasDateFilter = true;
  } else if (year !== 'any') {
    params.date_from = `${year}-01-01`; params.date_to = `${year}-12-31`;
    hasDateFilter = true;
  }

  let holidays: any[] = []; let total = 0;

  const r1 = await searchHolidays(params);
  if (r1?.holidays.length) { holidays = r1.holidays.map((h: any) => enrich(h, imgMap)); total = r1.total; }

  if (!holidays.length && hasDateFilter) {
    const { date_from, date_to, ...nd } = params;
    const r2 = await searchHolidays(nd);
    if (r2?.holidays.length) { holidays = r2.holidays.map((h: any) => enrich(h, imgMap)); total = r2.total; }
  }

  if (!holidays.length && operator === 'any') {
    const results = await Promise.all(
      shuffle(ACTIVE_OPERATORS).slice(0, 5).map((op: any) => searchHolidays({ ...params, operators: op }))
    );
    const merged = results.flatMap((r: any) => r?.holidays || []);
    holidays = shuffle(merged).slice(0, PER_PAGE).map((h: any) => enrich(h, imgMap));
    total = results.reduce((s, r) => s + (r?.total || 0), 0);
  }

  if (duration !== 'any') {
    const [min, max] = DURATION_RANGES[duration] || [0, 999];
    holidays = holidays.filter((h: any) => { const n = h.cruise_nights ?? h.duration_days ?? 0; return n >= min && n <= max; });
  }
  if (operator === 'any') holidays = shuffle(holidays).slice(0, PER_PAGE);

  return NextResponse.json({ holidays, cruises: holidays, total, page, per_page: PER_PAGE });
}

// ─── POST — action-based (agent dashboard + detail pages) ────────────────────
export async function POST(req: NextRequest) {
  try {
    const { action, ...params } = await req.json();

    if (action === 'search') {
      const sp: Record<string, string> = { market: params.market || 'us', limit: String(params.limit || 25) };
      if (params.operators) sp.operators = params.operators;
      if (params.date_from) sp.date_from = params.date_from;
      if (params.date_to)   sp.date_to   = params.date_to;
      if (params.locations) sp.locations = params.locations;
      if (params.regions)   sp.regions   = params.regions;
      if (params.page)      sp.page      = String(params.page);

      const imgMap = await getOperatorImages();
      const res = await fetch(`${BASE}/holidays.json?${new URLSearchParams({ ...auth(), ...sp })}`, { headers: HEADERS });
      if (!res.ok) throw new Error(`Widgety error: ${res.status}`);
      const data = await res.json();
      if (data.holidays) data.holidays = data.holidays.map((h: any) => enrich(h, imgMap));
      if (data.total > 0) return NextResponse.json(data);

      // Retry without dates
      if (params.date_from || params.date_to) {
        const { date_from, date_to, ...nd } = sp;
        const r2 = await fetch(`${BASE}/holidays.json?${new URLSearchParams({ ...auth(), ...nd })}`, { headers: HEADERS });
        if (r2.ok) {
          const d2 = await r2.json();
          if (d2.holidays) d2.holidays = d2.holidays.map((h: any) => enrich(h, imgMap));
          if (d2.total > 0) { d2._date_filter_removed = true; return NextResponse.json(d2); }
        }
      }
      return NextResponse.json(data);
    }

    if (action === 'operators') {
      const res = await fetch(`${BASE}/operators.json?${new URLSearchParams(auth())}`, { headers: HEADERS });
      if (!res.ok) throw new Error(`Widgety error: ${res.status}`);
      return NextResponse.json(await res.json());
    }

    if (action === 'ships') {
      const sp = new URLSearchParams(auth());
      if (params.operators) sp.set('operators', params.operators);
      const res = await fetch(`${BASE}/ships.json?${sp}`, { headers: HEADERS });
      if (!res.ok) throw new Error(`Widgety error: ${res.status}`);
      return NextResponse.json(await res.json());
    }

    if (action === 'holiday') {
      if (!params.holiday_ref) throw new Error('holiday_ref is required');
      const sp = new URLSearchParams({ ...auth(), market: params.market || 'us' });
      if (params.date_from) sp.set('date_from', params.date_from);
      if (params.date_to)   sp.set('date_to',   params.date_to);
      const res = await fetch(`${BASE}/holidays/${encodeURIComponent(params.holiday_ref)}.json?${sp}`, { headers: HEADERS });
      if (!res.ok) throw new Error(`Widgety error: ${res.status}`);
      const data = await res.json();
      // Flatten dates from operating_seasons for easy consumption
      data.all_dates = (data.operating_seasons || []).flatMap((s: any) =>
        (s.dates || []).map((d: any) => ({
          date_ref: d.date_ref, date_from: d.date_from, date_to: d.date_to,
          ship_title: d.ship_title, starts_at: d.starts_at, ends_at: d.ends_at,
          availability: d.availability_string, season: s.operating_season,
        }))
      );
      return NextResponse.json(data);
    }

    if (action === 'itinerary') {
      if (!params.date_ref) throw new Error('date_ref is required');
      const sp = new URLSearchParams({ ...auth(), market: params.market || 'us' });
      const res = await fetch(`${BASE}/holidays/dates/${encodeURIComponent(params.date_ref)}.json?${sp}`, { headers: HEADERS });
      if (!res.ok) throw new Error(`Widgety error: ${res.status}`);
      const data = await res.json();
      const items = (data.itinerary?.days || []).map((day: any) => {
        const loc = day.locations?.[0];
        const meals: string[] = [];
        if (day.breakfast_included) meals.push('Breakfast');
        if (day.lunch_included)     meals.push('Lunch');
        if (day.dinner_included)    meals.push('Dinner');
        // Port images and description from Widgety's destination database
        const portImages = (loc?.widgety_data?.images || []).slice(0, 3).map((img: any) => ({
          href: img.href, credit: img.credit || '',
        }));
        const portDesc = loc?.widgety_data?.description
          ? loc.widgety_data.description.replace(/<[^>]*>/g, '').trim()
          : '';
        const programme = (day.programme || '').replace(/<[^>]*>/g, '').trim();

        return {
          day_number:       day.day,
          title:            `${loc?.name || day.day_name || ''}${loc?.country ? `, ${loc.country}` : ''}`,
          description:      programme || portDesc || `Day ${day.day}`,
          category:         (day.day_type?.[0] || 'cruise').toLowerCase(),
          location:         loc?.name || day.day_name || '',
          country:          loc?.country || '',
          latitude:         loc?.latitude  ? parseFloat(loc.latitude)  : null,
          longitude:        loc?.longitude ? parseFloat(loc.longitude) : null,
          arrival:          loc?.arrival_time   || null,
          departure:        loc?.departure_time || null,
          meals:            meals.length ? meals : null,
          port_images:      portImages,
          port_description: portDesc,
        };
      });
      return NextResponse.json({
        items, holiday_ref: data.holiday_ref, date_ref: data.date_ref,
        holiday_name: data.name || '', ship_title: data.ship_title || '',
        operator_title: data.operator_title || '', date_from: data.date_from,
        date_to: data.date_to, starts_at: data.starts_at, ends_at: data.ends_at,
        regions: data.regions || [], countries: data.countries || [],
        description: data.description || null,
        duration_days: data.duration_days, cruise_nights: data.cruise_nights,
      });
    }

    return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  } catch (e: any) {
    console.error('widgety-cruise error:', e);
    return NextResponse.json({ error: e.message || 'Unknown error' }, { status: 500 });
  }
}
