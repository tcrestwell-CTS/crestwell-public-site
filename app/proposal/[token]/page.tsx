'use client';

// app/proposal/[token]/page.tsx
//
// Client-facing proposal approval page for Crestwell Travel.
// Reads quote_requests by proposal_token through security-definer RPCs
// (get_proposal / mark_proposal_viewed / approve_proposal). The anon key
// has EXECUTE on those functions only — no direct table access.
//
// Setup:
//   npm i @supabase/supabase-js react-markdown
//   NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY in env
//
// Styling is intentionally plain Tailwind — swap in the Crestwell brand
// (navy/cream, logo, fonts) to match crestwellgetaways.com.

import { useEffect, useState, use } from 'react';
import { createClient } from '@supabase/supabase-js';
import ReactMarkdown from 'react-markdown';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Option = { id: string; title: string; price?: string; description?: string };

type Proposal = {
  first_name: string | null;
  destination: string | null;
  trip_type: string | null;
  departure_date: string | null;
  travelers_adults: number | null;
  travelers_children: number | null;
  proposal_draft: string | null;
  proposal_options: Option[] | null;
  proposal_status: string;
  proposal_expires_at: string | null;
  selected_option: string | null;
};

type Phase = 'loading' | 'active' | 'approved' | 'expired' | 'notfound' | 'error';

export default function ProposalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [phase, setPhase] = useState<Phase>('loading');
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [selected, setSelected] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc('get_proposal', { p_token: token });
      const row: Proposal | undefined = data?.[0];
      if (error) return setPhase('error');
      if (!row) return setPhase('notfound');

      setProposal(row);
      if (row.proposal_status === 'approved' || row.proposal_status === 'converted') {
        setSelected(row.selected_option ?? '');
        setPhase('approved');
        return;
      }
      const expired =
        row.proposal_expires_at && new Date(row.proposal_expires_at) < new Date();
      if (expired || row.proposal_status === 'expired') return setPhase('expired');

      // record the open (fire-and-forget; failure shouldn't block rendering)
      supabase.rpc('mark_proposal_viewed', { p_token: token });
      setSelected(row.proposal_options?.[0]?.id ?? 'default');
      setPhase('active');
    })();
  }, [token]);

  async function approve() {
    if (!selected) return;
    setSubmitting(true);
    const { data, error } = await supabase.rpc('approve_proposal', {
      p_token: token,
      p_option: selected,
    });
    setSubmitting(false);
    if (error) return setPhase('error');
    if (data === 'approved' || data === 'already_approved') return setPhase('approved');
    if (data === 'expired') return setPhase('expired');
    setPhase('error');
  }

  if (phase === 'loading') return <Centered>Loading your proposal…</Centered>;
  if (phase === 'notfound')
    return <Centered>This proposal link isn’t valid. Please contact your travel advisor.</Centered>;
  if (phase === 'expired')
    return (
      <Centered>
        This proposal has expired. Reach out to your advisor and we’ll refresh your pricing right away.
      </Centered>
    );
  if (phase === 'error')
    return <Centered>Something went wrong. Please try again or contact your advisor.</Centered>;

  if (phase === 'approved')
    return (
      <Centered>
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-3">You’re all set{proposal?.first_name ? `, ${proposal.first_name}` : ''}! 🎉</h1>
          <p className="text-gray-600">
            Your selection is locked in. Your advisor will be in touch shortly with deposit and next steps.
          </p>
        </div>
      </Centered>
    );

  // active
  const p = proposal!;
  const options = p.proposal_options ?? [];
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <header className="mb-8">
        <p className="text-sm uppercase tracking-wide text-gray-500">Crestwell Travel Services</p>
        <h1 className="text-3xl font-medium mt-1">
          {p.destination ?? 'Your trip'} proposal
        </h1>
        {p.first_name && <p className="text-gray-600 mt-1">Prepared for {p.first_name}</p>}
        <p className="text-sm text-gray-500 mt-2">
          {[p.trip_type, p.departure_date, travelerLabel(p)].filter(Boolean).join(' · ')}
        </p>
      </header>

      {options.length > 0 ? (
        <section className="space-y-3 mb-8">
          <h2 className="text-lg font-medium">Choose your option</h2>
          {options.map((o) => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              className={`w-full text-left rounded-xl border p-4 transition ${
                selected === o.id ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between gap-4">
                <span className="font-medium">{o.title}</span>
                {o.price && <span className="text-gray-700 whitespace-nowrap">{o.price}</span>}
              </div>
              {o.description && <p className="text-sm text-gray-600 mt-1">{o.description}</p>}
            </button>
          ))}
        </section>
      ) : (
        // Fallback: no structured options yet — render the draft and approve as a whole
        p.proposal_draft && (
          <section className="prose prose-sm max-w-none mb-8">
            <ReactMarkdown>{p.proposal_draft}</ReactMarkdown>
          </section>
        )
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={approve}
          disabled={submitting || !selected}
          className="flex-1 rounded-xl bg-blue-600 text-white py-3 font-medium disabled:opacity-50"
        >
          {submitting ? 'Confirming…' : options.length > 0 ? 'Approve this option' : 'Approve this proposal'}
        </button>
        <a
          href="mailto:advisor@crestwellgetaways.com?subject=Questions about my proposal"
          className="flex-1 rounded-xl border border-gray-300 py-3 font-medium text-center"
        >
          Request changes
        </a>
      </div>

      {p.proposal_expires_at && (
        <p className="text-center text-sm text-gray-500 mt-4">
          Pricing held until {new Date(p.proposal_expires_at).toLocaleDateString()}.
        </p>
      )}
    </div>
  );
}

function travelerLabel(p: Proposal) {
  const a = p.travelers_adults ?? 0;
  const c = p.travelers_children ?? 0;
  if (!a && !c) return '';
  const parts = [`${a} adult${a === 1 ? '' : 's'}`];
  if (c) parts.push(`${c} child${c === 1 ? '' : 'ren'}`);
  return parts.join(', ');
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-gray-700">{children}</div>
    </div>
  );
}
