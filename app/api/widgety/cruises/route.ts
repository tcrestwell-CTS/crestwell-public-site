import { NextRequest, NextResponse } from 'next/server';

const WIDGETY_BASE = 'https://www.widgety.co.uk/api/cruises.json';
const TOKEN    = process.env.WIDGETY_APP_TOKEN!;
const APP_ID   = process.env.WIDGETY_APP_ID!;
const PER_PAGE = 9;

// Operators confirmed to have cruise inventory in this Widgety account
const ACTIVE_OPERATORS = [
  'american-cruise-lines',
  'princess-cruises',
  'cunard-line',
];

const DURATION_RANGES: Record<string, [number, number]> = {
  short:     [2,  4],
  week:      [5,  7],
  ten:       [8,  10],
  fortnight: [11, 14],
  extended:  [15, 999],
};

const REGION_MAP: Record<string, string> = {
  caribbean:     'Caribbean',
  mediterranean: 'Mediterranean',
  alaska:        'Alaska',
  bahamas:       'Bahamas',
  bermuda:       'Bermuda',
  mexico:        'Mexico',
  norway:        'Norway',
  hawaii:        'Hawaii',
  new_england:   'New England',
  world:         'World',
};

function shuffle(arr: any[]): any[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildParams(overrides: Record<string, string>): URLSearchParams {
  return new URLSearchParams({
    token:  TOKEN,
    app_id: APP_ID,
    limit:  '9',
    page:   '1',
    s:      'starts_on_asc',
    ...overrides,
  });
}

async function fetchForOperator(operator: string, extra: Record<string, string>): Promise<any[]> {
  const params = buildParams({ operator, ...extra });
  const res = await fetch(`${WIDGETY_BASE}?${params}`, {
    headers: { Accept: 'application/json;api_version=2' },
    cache: 'no-store',
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.cruises || [];
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;

  const destination = sp.get('destination') || 'any';
  const operator    = sp.get('operator')    || 'any';
  const cruiseType  = sp.get('cruise_type') || 'any';
  const duration    = sp.get('duration')    || 'any';
  const month       = sp.get('month')       || 'any';
  const year        = sp.get('year')        || 'any';
  const page        = parseInt(sp.get('page') || '1', 10);

  // Build shared filter params (date, region, cruise type)
  const extra: Record<string, string> = {};

  if (destination !== 'any' && REGION_MAP[destination]) {
    extra['region'] = REGION_MAP[destination];
  }

  if (month !== 'any') {
    const y = year !== 'any' ? parseInt(year) : new Date().getFullYear();
    const m = parseInt(month);
    const lastDay = new Date(y, m, 0).getDate();
    extra['start_date_range_beginning'] = `${y}-${String(m).padStart(2, '0')}-01`;
    extra['start_date_range_end']       = `${y}-${String(m).padStart(2, '0')}-${lastDay}`;
  } else if (year !== 'any') {
    extra['start_date_range_beginning'] = `${year}-01-01`;
    extra['start_date_range_end']       = `${year}-12-31`;
  }

  if (cruiseType !== 'any') {
    extra['cruise_type'] = cruiseType;
  }

  // ── Single operator selected ─────────────────────────────────────────────
  if (operator !== 'any') {
    const params = buildParams({ operator, limit: String(PER_PAGE), page: String(page), ...extra });
    try {
      const res = await fetch(`${WIDGETY_BASE}?${params}`, {
        headers: { Accept: 'application/json;api_version=2' },
        cache: 'no-store',
      });
      if (!res.ok) return NextResponse.json({ cruises: [], total: 0 });
      const data = await res.json();
      let cruises = data.cruises || [];

      if (duration !== 'any' && DURATION_RANGES[duration]) {
        const [min, max] = DURATION_RANGES[duration];
        cruises = cruises.filter((c: any) => c.cruise_nights >= min && c.cruise_nights <= max);
      }

      return NextResponse.json({ cruises, total: data.total || cruises.length, page, per_page: PER_PAGE });
    } catch {
      return NextResponse.json({ cruises: [], total: 0 });
    }
  }

  // ── No operator selected: fetch 3 from each operator in parallel ─────────
  // This guarantees diverse cruise lines on every page regardless of sort order
  try {
    // Fetch 9 from each operator so we have plenty to shuffle from
    // Filters (region, date, cruise_type) are passed through to each
    const extraWithLimit = { ...extra, limit: '9' };

    const results = await Promise.all(
      ACTIVE_OPERATORS.map(op => fetchForOperator(op, extraWithLimit))
    );

    // Only include operators that returned results (some may have no
    // matching cruises for the selected filters)
    const nonEmpty = results.filter(r => r.length > 0);

    // Round-robin merge: 1 from each operator at a time for even distribution
    const merged: any[] = [];
    const maxLen = Math.max(...nonEmpty.map(r => r.length), 0);
    for (let i = 0; i < maxLen; i++) {
      for (const opCruises of nonEmpty) {
        if (opCruises[i]) merged.push(opCruises[i]);
      }
    }

    // Apply duration filter if set
    let cruises = merged;
    if (duration !== 'any' && DURATION_RANGES[duration]) {
      const [min, max] = DURATION_RANGES[duration];
      cruises = cruises.filter(c => c.cruise_nights >= min && c.cruise_nights <= max);
    }

    // Shuffle so card order varies on each load, then take a page of 9
    cruises = shuffle(cruises).slice(0, PER_PAGE);

    // Estimate total from operator results
    const total = nonEmpty.length * 50; // conservative estimate

    return NextResponse.json({ cruises, total, page, per_page: PER_PAGE });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
