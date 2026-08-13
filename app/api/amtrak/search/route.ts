import { NextRequest, NextResponse } from 'next/server';

const PARSE_BASE = 'https://api.parse.bot/scraper/f800c27d-0aaa-4ca0-864e-4dc69e20f764';

export async function POST(req: NextRequest) {
  const apiKey = process.env.PARSE_AMTRAK_API_KEY;
  if (!apiKey) {
    console.error('[amtrak/search] PARSE_AMTRAK_API_KEY not configured');
    return NextResponse.json({ error: 'Schedule search unavailable' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { origin, destination, departureDate, returnDate, numAdults } = body;

    if (!origin || !destination || !departureDate) {
      return NextResponse.json({ error: 'origin, destination, and departureDate required' }, { status: 400 });
    }

    const res = await fetch(`${PARSE_BASE}/search_trains`, {
      method: 'POST',
      headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origin,
        destination,
        departure_date: departureDate,
        return_date: returnDate || undefined,
        num_adults: numAdults || 1,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error('[amtrak/search] Parse API error:', res.status, errBody);
      return NextResponse.json({ error: 'No results found for this search — try a different date or route.' }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[amtrak/search] error:', err);
    return NextResponse.json({ error: 'Schedule search failed' }, { status: 500 });
  }
}
