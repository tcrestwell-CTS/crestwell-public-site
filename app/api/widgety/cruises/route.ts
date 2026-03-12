import { NextRequest, NextResponse } from 'next/server';

const WIDGETY_BASE = 'https://api.widgety.co.uk/v3';
const APP_ID = process.env.WIDGETY_APP_ID!;
const APP_TOKEN = process.env.WIDGETY_APP_TOKEN!;

const WIDGETY_HEADERS = {
  'Application-Id': APP_ID,
  'Application-Token': APP_TOKEN,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Build Widgety query params from our frontend params
  const widgetyParams = new URLSearchParams();

  const destination = searchParams.get('destination');
  const operator    = searchParams.get('operator');
  const duration    = searchParams.get('duration');
  const month       = searchParams.get('month');
  const year        = searchParams.get('year');
  const page        = searchParams.get('page') || '1';
  const perPage     = searchParams.get('per_page') || '12';

  if (destination && destination !== 'any') widgetyParams.set('region', destination);
  if (operator && operator !== 'any')       widgetyParams.set('operator_id', operator);
  if (month && month !== 'any')             widgetyParams.set('departure_month', month);
  if (year && year !== 'any')               widgetyParams.set('departure_year', year);

  // Duration maps to nights range
  if (duration && duration !== 'any') {
    const durationMap: Record<string, { min: string; max: string }> = {
      'short':    { min: '2',  max: '4'  },
      'week':     { min: '5',  max: '7'  },
      'ten':      { min: '8',  max: '10' },
      'fortnight':{ min: '11', max: '14' },
      'extended': { min: '15', max: '99' },
    };
    const range = durationMap[duration];
    if (range) {
      widgetyParams.set('nights_min', range.min);
      widgetyParams.set('nights_max', range.max);
    }
  }

  widgetyParams.set('page', page);
  widgetyParams.set('per_page', perPage);
  widgetyParams.set('market', 'US');
  widgetyParams.set('currency', 'USD');

  try {
    const url = `${WIDGETY_BASE}/cruises.json?${widgetyParams.toString()}`;
    const res = await fetch(url, { headers: WIDGETY_HEADERS, next: { revalidate: 300 } });

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
