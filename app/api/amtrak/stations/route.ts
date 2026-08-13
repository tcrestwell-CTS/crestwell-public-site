import { NextRequest, NextResponse } from 'next/server';

const PARSE_BASE = 'https://api.parse.bot/scraper/f800c27d-0aaa-4ca0-864e-4dc69e20f764';

export async function GET(req: NextRequest) {
  const term = req.nextUrl.searchParams.get('term');
  if (!term || term.length < 2) {
    return NextResponse.json({ stations: [] });
  }

  const apiKey = process.env.PARSE_AMTRAK_API_KEY;
  if (!apiKey) {
    console.error('[amtrak/stations] PARSE_AMTRAK_API_KEY not configured');
    return NextResponse.json({ error: 'Station search unavailable' }, { status: 500 });
  }

  try {
    const res = await fetch(
      `${PARSE_BASE}/get_station_autocomplete?term=${encodeURIComponent(term)}`,
      { headers: { 'X-API-Key': apiKey }, next: { revalidate: 3600 } },
    );
    if (!res.ok) {
      const body = await res.text();
      console.error('[amtrak/stations] Parse API error:', res.status, body);
      return NextResponse.json({ error: 'Station search failed' }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[amtrak/stations] error:', err);
    return NextResponse.json({ error: 'Station search failed' }, { status: 500 });
  }
}
