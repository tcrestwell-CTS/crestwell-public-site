# Triton Cruise Finder — Setup Notes for Tim

This covers everything needed to finish wiring up `/cruise-finder` end to end:
environment variables to set, one piece of SQL to run, and a ready-to-drop-in
Widgety client port for the `triton-cruise-search` edge function.

---

## 1. Vercel environment variables (this repo — crestwell-public-site)

Set these in the Vercel project settings (Production + Preview):

| Variable       | Value                                                                 |
|----------------|------------------------------------------------------------------------|
| `TRITON_URL`   | The full invoke URL for the `triton-cruise-search` edge function, e.g. `https://zbtnulzvwreqzbmxulpv.supabase.co/functions/v1/triton-cruise-search` |
| `AGENT_SECRET` | The shared secret the edge function checks against `x-agent-secret`   |

Both are read server-side only, in `app/api/triton/route.ts`. Neither is ever
exposed to the browser (not a `NEXT_PUBLIC_*` var, never sent in a client
bundle).

Also added blank placeholders for both to `.env.example` for local dev.

---

## 2. Supabase secrets (project `zbtnulzvwreqzbmxulpv` — NOT Vercel)

The `triton-cruise-search` edge function itself needs these set as **Supabase
secrets** on project `zbtnulzvwreqzbmxulpv` (Project Settings → Edge Functions
→ Secrets, or `supabase secrets set`), not in Vercel:

- `WIDGETY_APP_TOKEN`
- `WIDGETY_APP_ID`
- `ANTHROPIC_API_KEY`
- `AGENT_SECRET` — must match the value set in Vercel above; this is what the
  edge function checks incoming `x-agent-secret` headers against.

---

## 3. SQL to run manually (Supabase SQL Editor)

I did **not** run any SQL or migrations — per the spec, schema changes are
left for you to run manually. Here's what's actually needed, based on the
current schema (`lib/schema.sql`):

```sql
-- quote_requests already has a `lead_source` text column (used today for
-- 'google_ads' / utm_source / 'direct'), so lead_source: 'triton' works
-- with zero schema changes.
--
-- agent_context does NOT exist yet. Until this runs, /api/quote/route.ts
-- folds agent_context into the `message` text field so nothing is silently
-- dropped. Run this, then see the "follow-up code change" note below.

alter table quote_requests
  add column if not exists agent_context jsonb;

create index if not exists idx_quote_requests_agent_context
  on quote_requests using gin (agent_context);
```

**Follow-up code change after running this SQL:** in
`app/api/quote/route.ts`, swap the message-folding logic for a real column
write — replace:

```ts
const messageWithAgentContext = agent_context
  ? [message, `[Triton agent_context — move to real column once added]\n${JSON.stringify(agent_context)}`]
      .filter(Boolean)
      .join('\n\n')
  : message;
```

with simply inserting `agent_context: agent_context || null` as its own
column in the `.insert([{ ... }])` call, and pass `message` through
unmodified. I left a comment at that line in the file pointing back here.

---

## 4. Widgety client — Deno port for `searchWidgety`

Task 6 asked me to port the **proven, working** Widgety client — same auth
headers, same search/filter param names, same pagination — into
Deno-compatible TypeScript for you to drop into the `searchWidgety`
placeholder inside `supabase/functions/triton-cruise-search/index.ts` (that
file lives in a different repo/project, so I'm not editing it directly —
this is a snippet for you to paste in).

Ported faithfully from `app/api/widgety/cruises/route.ts` in this repo — same
`BASE` URL, same `Accept: application/json` header (no `api_version` — that's
the load-bearing fix noted at the top of that file: adding `api_version=2`
drops you from 27,000+ V3 holidays down to 3 V2-only operators), same
`auth()` shape, same V2-only-operator fallback set, same region slug map, and
the same two-step search → per-holiday detail-enrichment pagination flow
(list endpoint returns bare `holiday_ref`s; nights/dates/ship come from a
second per-holiday fetch, batched 18 at a time).

**Important caveat I found while porting:** the proven route does **not**
extract or return any price field anywhere — not in the V3 list response,
not in the V2 cruise response, not in the per-holiday detail response. There
is no `price`, `cost`, `from_price`, or similar field in that code, and
nothing in the rest of the app (`components/CruiseSearch.tsx`, `TripCard.tsx`)
surfaces cruise pricing from Widgety either. I did not invent a price
parameter, per the "don't guess Widgety param names" instruction. Practically
this means most/all Triton results will have `price_from: null` until a
verified pricing source is identified — which the public `/cruise-finder`
page already handles gracefully ("Pricing on request"), and fits the
honest-advisor tone the rest of the spec calls for.

`searchWidgety(criteria)` below takes a structured criteria object — I don't
have visibility into what shape the actual `triton-cruise-search/index.ts`
placeholder expects (that file isn't in this repo), so you'll likely need to
adjust the function signature/return shape to match whatever your
query-parsing step upstream produces. The HTTP calls, headers, and param
names inside are the part that must NOT be changed — those are copied
verbatim from the working route.

```ts
// searchWidgety.ts — Deno port of app/api/widgety/cruises/route.ts
// Drop into supabase/functions/triton-cruise-search/index.ts in place of
// the searchWidgety placeholder. Adjust the function signature/return shape
// to match your caller — the fetch calls, headers, and param names below
// are copied verbatim from the proven Next.js route and must not change.

const BASE = 'https://www.widgety.co.uk/api';
const HEADERS = { Accept: 'application/json' } as const;              // NO api_version — V3. Adding api_version=2 drops results to 3 operators.
const V2_HEADERS = { Accept: 'application/json;api_version=2' } as const; // V2 fallback, for V2-only operators

// These operators only have inventory in V2 /cruises.json, not V3 /holidays.json
const V2_ONLY_OPERATORS = new Set([
  'american-cruise-lines',
  'cunard-line',
  'princess-cruises',
]);

const RIVER_OPERATOR_SET = new Set([
  'amawaterways', 'avalon-waterways', 'american-cruise-lines',
  'uniworld-boutique-river-cruises', 'tauck', 'celebrity-river-cruises',
]);

const LUXURY_OPERATOR_SET = new Set([
  'silversea-cruises', 'seabourn-cruise-line', 'explora-journeys',
  'ritz-carlton-yacht-collection',
]);

const OCEAN_OPERATOR_SET = new Set([
  'norwegian-cruise-line', 'royal-caribbean-international', 'carnival-cruise-lines-operator',
  'disney-cruise-line', 'celebrity-cruises', 'holland-america-line', 'msc-cruises',
  'virgin-voyages', 'princess-cruises', 'cunard-line',
]);

const ACTIVE_OPERATORS = [
  'american-cruise-lines', 'princess-cruises', 'cunard-line',
  'norwegian-cruise-line', 'royal-caribbean-international', 'carnival-cruise-lines-operator',
  'disney-cruise-line', 'celebrity-cruises', 'holland-america-line', 'msc-cruises',
  'virgin-voyages', 'amawaterways', 'avalon-waterways', 'silversea-cruises',
  'seabourn-cruise-line', 'tauck', 'uniworld-boutique-river-cruises',
  'explora-journeys', 'ritz-carlton-yacht-collection', 'celebrity-river-cruises',
];

// component value → Widgety API slug (must be lowercase). Verified valid
// against the live API — do not add slugs that aren't in this list without
// re-verifying (mexico/norway/australia/world all 400).
const REGION_MAP: Record<string, string> = {
  caribbean: 'caribbean', mediterranean: 'mediterranean', alaska: 'alaska',
  bahamas: 'bahamas', bermuda: 'bermuda', hawaii: 'hawaii', europe: 'europe',
  northern_europe: 'northern-europe', southern_europe: 'southern-europe',
  scandinavia: 'scandinavia', asia: 'asia', pacific: 'pacific',
  south_america: 'south-america', north_america: 'north-america',
  central_america: 'central-america', americas: 'americas',
  middle_east: 'middle-east', indian_ocean: 'indian-ocean',
  mississippi: 'mississippi', amazon: 'amazon', atlantic: 'atlantic',
};

const DURATION_RANGES: Record<string, [number, number]> = {
  short: [2, 4], week: [5, 7], ten: [8, 10], fortnight: [11, 14], extended: [15, 999],
};

const MAX_CANDIDATES = 150; // Task 6 requirement — original route didn't hard-cap the merged pool

function auth() {
  return {
    app_id: Deno.env.get('WIDGETY_APP_ID')!,
    token: Deno.env.get('WIDGETY_APP_TOKEN')!,
  };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function searchCruisesV2(params: Record<string, string>) {
  try {
    const res = await fetch(
      `${BASE}/cruises.json?${new URLSearchParams({ ...auth(), ...params })}`,
      { headers: V2_HEADERS }
    );
    if (!res.ok) return null;
    const d = await res.json();
    const holidays = (d.cruises || []).map((c: any) => ({
      holiday_ref: c.ref,
      name: c.name,
      operator: c.operator,
      operator_title: c.operator_title,
      cruise_nights: c.cruise_nights ? parseInt(c.cruise_nights) : null,
      duration_days: c.cruise_nights ? parseInt(c.cruise_nights) + 1 : null,
      starts_at: { name: c.starts_at },
      ends_at: { name: c.ends_at },
      date_from: c.starts_on,
      date_to: c.ends_on,
      regions: Array.isArray(c.regions) ? c.regions : [],
      ship_title: c.ship_title,
    }));
    return { holidays, total: d.total || 0 };
  } catch { return null; }
}

async function searchHolidays(params: Record<string, string>) {
  try {
    const res = await fetch(
      `${BASE}/holidays.json?${new URLSearchParams({ ...auth(), market: 'us', ...params })}`,
      { headers: HEADERS }
    );
    if (!res.ok) return null;
    const d = await res.json();
    return { holidays: d.holidays ?? [], total: d.total || 0 };
  } catch { return null; }
}

async function enrichWithDetail(h: any): Promise<any> {
  // V2-normalised results already carry date_from/cruise_nights — skip detail fetch
  if (h.date_from && h.cruise_nights) return h;

  try {
    const detRes = await fetch(
      `${BASE}/holidays/${encodeURIComponent(h.holiday_ref)}.json?${new URLSearchParams({ ...auth(), market: 'us' })}`,
      { headers: HEADERS }
    );
    if (!detRes.ok) return h;
    const det = await detRes.json();

    let date_from: string | null = null;
    let date_to: string | null = null;
    let ship_title: string | null = null;
    for (const s of det.operating_seasons || []) {
      for (const d of s.dates || []) {
        if (d.date_from) {
          date_from = d.date_from;
          date_to = d.date_to || null;
          ship_title = d.ship_title || null;
          break;
        }
      }
      if (date_from) break;
    }

    return {
      ...h,
      cruise_nights: det.cruise_nights || (det.duration_days ? det.duration_days - 1 : null),
      duration_days: det.duration_days || (det.cruise_nights ? det.cruise_nights + 1 : null),
      regions: det.regions || [],
      holiday_type: det.holiday_type || [],
      countries: det.countries || [],
      starts_at: det.starts_at || null,
      ends_at: det.ends_at || null,
      date_from, date_to, ship_title,
      description: det.description || null,
    };
  } catch {
    return h;
  }
}

export type WidgetyCriteria = {
  regions?: string[];       // maps through REGION_MAP — invalid/unmapped values are dropped
  operators?: string[];     // explicit operator slugs, if the caller already resolved them
  cruiseType?: 'ocean' | 'river' | 'luxury' | 'any';
  duration?: keyof typeof DURATION_RANGES | 'any';
  dateFrom?: string;        // YYYY-MM-DD
  dateTo?: string;          // YYYY-MM-DD
};

export async function searchWidgety(criteria: WidgetyCriteria = {}): Promise<any[]> {
  const cruiseType = criteria.cruiseType ?? 'any';
  const duration = criteria.duration ?? 'any';

  // Same operator-pool routing as the proven route — holiday_type is NOT a
  // valid Widgety param (400s), so cruise type is expressed as an operator set.
  let operatorPool: string[] = [];
  if (criteria.operators?.length) {
    operatorPool = criteria.operators;
  } else if (cruiseType === 'river') {
    operatorPool = Array.from(RIVER_OPERATOR_SET);
  } else if (cruiseType === 'luxury') {
    operatorPool = Array.from(LUXURY_OPERATOR_SET);
  } else if (cruiseType === 'ocean') {
    operatorPool = Array.from(OCEAN_OPERATOR_SET);
  } else {
    operatorPool = shuffle(ACTIVE_OPERATORS).slice(0, 8);
  }

  const baseParams: Record<string, string> = { market: 'us', limit: '20' };

  const mappedRegions = (criteria.regions || [])
    .map(r => REGION_MAP[r])
    .filter(Boolean);
  if (mappedRegions.length) baseParams.regions = mappedRegions.join(',');

  if (criteria.dateFrom) baseParams.date_from = criteria.dateFrom;
  if (criteria.dateTo) baseParams.date_to = criteria.dateTo;

  const fetchOp = (op: string) =>
    V2_ONLY_OPERATORS.has(op)
      ? searchCruisesV2({ ...baseParams, operators: op })
      : searchHolidays({ ...baseParams, operators: op });

  const results = await Promise.all(operatorPool.map(fetchOp));
  let merged = results.flatMap(r => r?.holidays || []);
  merged = shuffle(merged).slice(0, MAX_CANDIDATES); // Task 6: cap collected candidates at 150

  // Enrich with per-holiday detail (dates/nights/ship), batched 18 at a time
  // to match the proven route's parallelism.
  const enriched: any[] = [];
  const BATCH = 18;
  for (let i = 0; i < merged.length; i += BATCH) {
    const batch = await Promise.all(merged.slice(i, i + BATCH).map(enrichWithDetail));
    enriched.push(...batch);
  }

  let candidates = enriched;
  if (duration !== 'any') {
    const [min, max] = DURATION_RANGES[duration] || [0, 999];
    candidates = candidates.filter((h: any) => {
      const n = h.cruise_nights ?? h.duration_days ?? 0;
      return n >= min && n <= max;
    });
  }

  return candidates.slice(0, MAX_CANDIDATES);
}
```

---

## 5. Open questions for Tim

See the final report for the full list — the short version:

1. Confirm the `TRITON_URL` value (exact edge function invoke URL) and that
   `AGENT_SECRET` in Vercel matches the Supabase secret of the same name.
2. Run the `alter table quote_requests add column agent_context jsonb;`
   above, then swap the message-folding code in `app/api/quote/route.ts` for
   a real column write (pointer left in that file).
3. `searchWidgety(criteria)`'s signature is a guess at what the edge
   function's query-parsing step will hand it — adjust to match.
4. No verified Widgety price field exists anywhere in the current codebase,
   so `price_from` will mostly be null until a pricing source is found.
