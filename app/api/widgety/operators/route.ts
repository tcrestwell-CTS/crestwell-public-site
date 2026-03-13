import { NextResponse } from 'next/server';

const WIDGETY_BASE = 'https://www.widgety.co.uk/api';

export async function GET() {
  const widgetyParams = new URLSearchParams();
  widgetyParams.set('token', process.env.WIDGETY_APP_TOKEN!);
  widgetyParams.set('app_id', process.env.WIDGETY_APP_ID!);

  try {
    const url = `${WIDGETY_BASE}/operators.json?${widgetyParams.toString()}`;
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json;api_version=2',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Widgety operators error:', res.status, text);
      return NextResponse.json({ error: 'Failed to fetch operators', status: res.status }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Widgety operators fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
