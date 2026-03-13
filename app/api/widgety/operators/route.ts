import { NextResponse } from 'next/server';

const WIDGETY_BASE = 'https://www.widgety.co.uk/api';
const WIDGETY_HEADERS = {
  'Application-Id': process.env.WIDGETY_APP_ID!,
  'Application-Token': process.env.WIDGETY_APP_TOKEN!,
  'Accept': 'application/json;api_version=2',
};

export async function GET() {
  try {
    const res = await fetch(`${WIDGETY_BASE}/operators.json?market=US&cruise_type=ocean`, {
      headers: WIDGETY_HEADERS,
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch operators' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Widgety operators error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
