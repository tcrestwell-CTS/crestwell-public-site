import { NextRequest, NextResponse } from 'next/server';

const WIDGETY_BASE = 'https://www.widgety.co.uk/api/cruises.json';
const TOKEN    = process.env.WIDGETY_APP_TOKEN!;
const APP_ID   = process.env.WIDGETY_APP_ID!;
const PER_PAGE = 9;

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

// Fisher-Yates shuffle
function shuffle(arr: any[]): any[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Interleave by operator then shuffle within each page-sized window
// so every page load shows a different mix of cruise lines
function diversifyAndShuffle(cruises: any[], pageStart: number): any[] {
  const groups: Record<string, any[]> = {};
  for (const c of cruises) {
    const slug = c.operator?.split('/operators/')[1]?.replace('.json', '') || 'other';
    if (!groups[slug]) groups[slug] = [];
    groups[slug].push(c);
  }
  // Shuffle within each operator group first
  const buckets = Object.values(groups).map(b => shuffle(b));
  // Round-robin interleave across operators
  const interleaved: any[] = [];
  const maxLen = Math.max(...buckets.map(b => b.length));
  for (let i = 0; i < maxLen; i++) {
    for (const bucket of buckets) {
      if (bucket[i]) interleaved.push(bucket[i]);
    }
  }
  // Slice the page window then shuffle just those 9 cards
  const page = interleaved.slice(pageStart, pageStart + PER_PAGE);
  return shuffle(page);
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

  const needsDurationFilter = duration !== 'any';
  // Fetch larger batch when no operator selected so we can interleave
  const needsShuffle = operator === 'any' && !needsDurationFilter;
  const fetchLimit   = needsDurationFilter ? 100 : needsShuffle ? 50 : PER_PAGE;
  const fetchPage    = needsDurationFilter || needsShuffle ? 1 : page;

  const params = new URLSearchParams({
    token:  TOKEN,
    app_id: APP_ID,
    limit:  String(fetchLimit),
    page:   String(fetchPage),
    s:      'starts_on_asc',
  });

  if (operator !== 'any') params.set('operator', operator);

  if (destination !== 'any' && REGION_MAP[destination]) {
    params.set('region', REGION_MAP[destination]);
  }

  if (month !== 'any') {
    const y = year !== 'any' ? parseInt(year) : new Date().getFullYear();
    const m = parseInt(month);
    const lastDay = new Date(y, m, 0).getDate();
    params.set('start_date_range_beginning', `${y}-${String(m).padStart(2, '0')}-01`);
    params.set('start_date_range_end',       `${y}-${String(m).padStart(2, '0')}-${lastDay}`);
  } else if (year !== 'any') {
    params.set('start_date_range_beginning', `${year}-01-01`);
    params.set('start_date_range_end',       `${year}-12-31`);
  }

  if (cruiseType !== 'any') params.set('cruise_type', cruiseType);

  try {
    const res = await fetch(`${WIDGETY_BASE}?${params}`, {
      headers: { Accept: 'application/json;api_version=2' },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ error: await res.text() }, { status: res.status });
    }

    const data = await res.json();
    let cruises: any[] = data.cruises || [];
    const total: number = data.total || cruises.length;

    if (needsDurationFilter && DURATION_RANGES[duration]) {
      const [min, max] = DURATION_RANGES[duration];
      cruises = cruises.filter(c => c.cruise_nights >= min && c.cruise_nights <= max);
      const start = (page - 1) * PER_PAGE;
      cruises = cruises.slice(start, start + PER_PAGE);
      return NextResponse.json({ cruises, total: cruises.length, page, per_page: PER_PAGE });
    }

    if (needsShuffle && cruises.length > PER_PAGE) {
      const start = (page - 1) * PER_PAGE;
      cruises = diversifyAndShuffle(cruises, start);
    }

    return NextResponse.json({ cruises, total, page, per_page: PER_PAGE });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
