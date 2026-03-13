import { NextRequest, NextResponse } from 'next/server';

const WIDGETY_BASE = 'https://www.widgety.co.uk/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const widgetyParams = new URLSearchParams();

  // Credentials as query params
  widgetyParams.set('token', process.env.WIDGETY_APP_TOKEN!);
  widgetyParams.set('app_id', process.env.WIDGETY_APP_ID!);

  const operator = searchParams.get('operator');
  const duration = searchParams.get('duration');
  const month    = searchParams.get('month');
  const year     = searchParams.get('year');
  const page     = searchParams.get('page') || '1';
  const perPage  = searchParams.get('per_page') || '12';

  if (operator && operator !== 'any') widgetyParams.set('operator', operator);
  if (month && month !== 'any')       widgetyParams.set('start_date_range_beginning', `${year || new Date().getFullYear()}-${month.padStart(2, '0')}-01`);

  if (duration && duration !== 'any') {
    const durationMap: Record<string, { min: string; max: string }> = {
      'short':     { min: '2',  max: '4'  },
      'week':      { min: '5',  max: '7'  },
      'ten':       { min: '8',  max: '10' },
      'fortnight': { min: '11', max: '14' },
      'extended':  { min: '15', max: '99' },
    };
    const range = durationMap[duration];
    if (range) {
      widgetyParams.set('nights_min', range.min);
      widgetyParams.set('nights_max', range.max);
    }
  }

  widgetyParams.set('page', page);
  widgetyParams.set('limit', perPage);

  try {
    const url = `${WIDGETY_BASE}/cruises.json?${widgetyParams.toString()}`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json;api_version=2',
      },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Widgety API error:', res.status, text);
      return NextResponse.json({ error: 'Failed to fetch cruises', status: res.status }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Widgety fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
