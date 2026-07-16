// app/api/triton/route.ts
//
// Public-facing proxy in front of the Triton cruise-search Supabase edge function
// (`triton-cruise-search`, project zbtnulzvwreqzbmxulpv). Keeps AGENT_SECRET
// server-side only, enforces a hard cap of 3 results for public traffic, rate
// limits by IP, and strips advisor-internal fields before the response reaches
// the browser.
//
// TRITON_URL and AGENT_SECRET are read from process.env — server-only, never
// exposed via NEXT_PUBLIC_*, never sent to the client.

import { NextRequest, NextResponse } from 'next/server';
import { getRealIp } from '@/lib/logPaymentIp';

const MAX_RESULTS = 3;
const QUERY_MIN_LEN = 10;
const QUERY_MAX_LEN = 500;
const UPSTREAM_TIMEOUT_MS = 15_000;

// ── Rate limiting (v1) ──────────────────────────────────────────────────────
// Simple per-IP sliding window: 5 searches / hour, in-memory Map.
// This resets whenever the serverless instance recycles — acceptable for v1
// given Triton search traffic is low-volume and low-stakes.
// TODO(v2): swap for Cloudflare Turnstile (bot-gate the form) or Vercel KV
// (durable, cross-instance counting) once traffic/abuse patterns are known.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitMap.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

// ── Query validation ────────────────────────────────────────────────────────

function sanitizeQuery(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  // Strip control characters (including tabs/newlines beyond plain whitespace collapse risk)
  const stripped = raw.replace(/[\x00-\x1F\x7F]/g, '').trim();
  if (stripped.length < QUERY_MIN_LEN || stripped.length > QUERY_MAX_LEN) return null;
  return stripped;
}

// ── Response scrubbing ──────────────────────────────────────────────────────
// Strip advisor-internal fields before anything reaches the browser.
// KEEP why_it_fits and caveats — showing the honest caveat is a deliberate
// brand behavior, not an internal detail.

function scrubUpstreamResponse(data: any) {
  const { meta, criteria, results, ...rest } = data ?? {};

  const scrubbedMeta = meta && typeof meta === 'object'
    ? Object.fromEntries(Object.entries(meta).filter(([k]) => k !== 'duration_ms'))
    : meta;

  const scrubbedCriteria = criteria && typeof criteria === 'object'
    ? Object.fromEntries(Object.entries(criteria).filter(([k]) => k !== 'notes'))
    : criteria;

  const scrubbedResults = Array.isArray(results)
    ? results.map(({ score, ...r }: any) => r)
    : results;

  return { ...rest, criteria: scrubbedCriteria, results: scrubbedResults, meta: scrubbedMeta };
}

export async function POST(req: NextRequest) {
  const TRITON_URL = process.env.TRITON_URL;
  const AGENT_SECRET = process.env.AGENT_SECRET;

  if (!TRITON_URL || !AGENT_SECRET) {
    console.error('triton route: missing TRITON_URL or AGENT_SECRET env var');
    return NextResponse.json({ error: 'search unavailable' }, { status: 502 });
  }

  // ── Rate limit ──────────────────────────────────────────────────────────
  const ip = getRealIp(req) || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "You've reached the search limit for now — please try again in a bit, or request a quote directly and a human will help." },
      { status: 429 }
    );
  }

  // ── Parse + validate body ──────────────────────────────────────────────
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const query = sanitizeQuery(body?.query);
  if (!query) {
    return NextResponse.json(
      { error: `query must be a string between ${QUERY_MIN_LEN} and ${QUERY_MAX_LEN} characters` },
      { status: 400 }
    );
  }

  // ── Call upstream edge function (forced max_results: 3 for all public traffic) ──
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(TRITON_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-agent-secret': AGENT_SECRET,
      },
      body: JSON.stringify({ query, max_results: MAX_RESULTS }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeout);
    console.error('triton route: upstream fetch failed:', err);
    return NextResponse.json({ error: 'search unavailable' }, { status: 502 });
  }
  clearTimeout(timeout);

  if (!upstreamRes.ok) {
    // Never leak the upstream error body to the client.
    console.error(`triton route: upstream returned ${upstreamRes.status}`);
    return NextResponse.json({ error: 'search unavailable' }, { status: 502 });
  }

  let data: any;
  try {
    data = await upstreamRes.json();
  } catch (err) {
    console.error('triton route: failed to parse upstream JSON:', err);
    return NextResponse.json({ error: 'search unavailable' }, { status: 502 });
  }

  return NextResponse.json(scrubUpstreamResponse(data));
}
