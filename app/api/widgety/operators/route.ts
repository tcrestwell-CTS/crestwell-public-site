// app/api/widgety/operators/route.ts
import { NextResponse } from 'next/server';

const BASE   = 'https://www.widgety.co.uk/api';
const TOKEN  = process.env.WIDGETY_APP_TOKEN!;
const APP_ID = process.env.WIDGETY_APP_ID!;

export async function GET() {
  try {
    const sp = new URLSearchParams({ token: TOKEN, app_id: APP_ID });
    const res = await fetch(`${BASE}/operators.json?${sp}`, {
      headers: { Accept: 'application/json' },  // NO api_version — critical
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch operators' }, { status: res.status });
    }

    const data = await res.json();

    // Normalise: add slug derived from href for easy lookup
    const operators = (data.operators || []).map((op: any) => {
      const slug = op.href?.split('/operators/')?.[1]?.replace('.json', '') || String(op.id);
      return { ...op, slug, id: slug }; // always use slug as id for API calls
    });

    return NextResponse.json({ operators });
  } catch (err) {
    console.error('Widgety operators error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
