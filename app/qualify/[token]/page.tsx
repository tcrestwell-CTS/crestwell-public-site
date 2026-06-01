'use client';

// app/qualify/[token]/page.tsx
//
// Token-gated client qualification form. Loads the lead's known details by
// proposal_token (get_qualify), lets the client fill in the missing qualifiers,
// and writes them back (submit_qualify) — which clears ai_processed_at so the
// qualify-lead (Tiara) trigger re-runs with the better data.
//
// Setup: npm i @supabase/supabase-js   (already installed on the site)
// Env:   NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY

import { useEffect, useState, use } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Lead = {
  first_name: string | null;
  destination: string | null;
  trip_type: string | null;
  departure_date: string | null;
  proposal_status: string | null;
  submitted: boolean | null;
};

type Phase = 'loading' | 'form' | 'done' | 'locked' | 'notfound' | 'error';

const LOCKED = ['sent', 'viewed', 'approved', 'converted'];

export default function QualifyPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [phase, setPhase] = useState<Phase>('loading');
  const [lead, setLead] = useState<Lead | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [origin, setOrigin] = useState('');
  const [budget, setBudget] = useState('');
  const [vibe, setVibe] = useState('');
  const [flexible, setFlexible] = useState(true);
  const [passportsValid, setPassportsValid] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc('get_qualify', { p_token: token });
      const row: Lead | undefined = data?.[0];
      if (error) return setPhase('error');
      if (!row) return setPhase('notfound');
      setLead(row);
      setPhase(row.submitted || LOCKED.includes(row.proposal_status ?? '') ? 'locked' : 'form');
    })();
  }, [token]);

  async function submit() {
    if (!origin || !budget || !vibe) return;
    setSubmitting(true);
    const { data, error } = await supabase.rpc('submit_qualify', {
      p_token: token,
      p_answers: {
        origin,
        budget,
        vibe,
        flexible,
        passports_valid: passportsValid ? 'yes' : 'no',
        notes,
      },
    });
    setSubmitting(false);
    if (error) return setPhase('error');
    if (data === 'ok') return setPhase('done');
    if (data === 'locked') return setPhase('locked');
    setPhase('error');
  }

  if (phase === 'loading') return <Centered>Loading…</Centered>;
  if (phase === 'notfound')
    return <Centered>This link isn’t valid. Please reach us at 888-508-6893.</Centered>;
  if (phase === 'error')
    return <Centered>Something went wrong — please try again, or call 888-508-6893.</Centered>;
  if (phase === 'locked')
    return (
      <Centered>
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">Thanks{lead?.first_name ? `, ${lead.first_name}` : ''}!</h1>
          <p className="text-gray-600">We have your details and we’re putting your options together. You’ll hear from us shortly.</p>
        </div>
      </Centered>
    );
  if (phase === 'done')
    return (
      <Centered>
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">Got it — thank you! 🌴</h1>
          <p className="text-gray-600">Your travel advisor is preparing personalized options and will follow up soon.</p>
        </div>
      </Centered>
    );

  // form
  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <p className="text-sm uppercase tracking-wide text-gray-500">Crestwell Travel Services</p>
      <h1 className="text-2xl font-medium mt-1 mb-1">
        A few quick details{lead?.first_name ? `, ${lead.first_name}` : ''}
      </h1>
      <p className="text-gray-600 mb-6 text-sm">
        This helps us tailor the right {lead?.trip_type?.toLowerCase() ?? 'trip'} options
        {lead?.departure_date ? ` for ${new Date(lead.departure_date).toLocaleDateString()}` : ''}. Takes about a minute.
      </p>

      <div className="space-y-5">
        <Field label="Which airport will you fly from?">
          <input value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="e.g. Atlanta (ATL)" className={inputCls} />
        </Field>

        <Field label="Roughly what budget are you working with?">
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className={inputCls}>
            <option value="">Select…</option>
            <option>Under $2,000 per person</option>
            <option>$2,000–$3,000 per person</option>
            <option>$3,000–$4,000 per person</option>
            <option>$4,000+ per person</option>
            <option>Not sure yet</option>
          </select>
        </Field>

        <Field label="What kind of atmosphere do you prefer?">
          <select value={vibe} onChange={(e) => setVibe(e.target.value)} className={inputCls}>
            <option value="">Select…</option>
            <option>Adults-only &amp; tranquil</option>
            <option>Lively, with nightlife &amp; lots of dining</option>
            <option>No strong preference</option>
          </select>
        </Field>

        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" checked={flexible} onChange={(e) => setFlexible(e.target.checked)} className="mt-1" />
          <span>My dates are flexible by a few days if it means better pricing.</span>
        </label>

        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" checked={passportsValid} onChange={(e) => setPassportsValid(e.target.checked)} className="mt-1" />
          <span>Both travelers have passports valid through at least the end of 2026.</span>
        </label>

        <Field label="Anything else we should know? (optional)">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className={inputCls} placeholder="Special occasions, must-haves, questions…" />
        </Field>

        <button
          onClick={submit}
          disabled={submitting || !origin || !budget || !vibe}
          className="w-full rounded-xl bg-blue-600 text-white py-3 font-medium disabled:opacity-50"
        >
          {submitting ? 'Sending…' : 'Send my details'}
        </button>
      </div>
    </div>
  );
}

const inputCls =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      {children}
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-gray-700">{children}</div>
    </div>
  );
}
