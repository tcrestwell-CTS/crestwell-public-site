import { NextRequest, NextResponse } from 'next/server';

const SUPABASE_URL  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const AGENT_SECRET  = process.env.CW_AGENT_SECRET!;

export async function POST(req: NextRequest) {
  const { application_id } = await req.json().catch(() => ({}));
  if (!application_id) {
    return NextResponse.json({ error: 'application_id required' }, { status: 400 });
  }

  // Call the Supabase edge function
  const res = await fetch(`${SUPABASE_URL}/functions/v1/equifax-prequal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON}`,
      'apikey': SUPABASE_ANON,
      'x-agent-secret': AGENT_SECRET,
    },
    body: JSON.stringify({ application_id }),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.ok ? 200 : 500 });
}
