'use client';
import { Suspense, useRef, useEffect } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import TokenGate, { type TokenData } from '@/components/TokenGate';

// ─── Constants ───────────────────────────────────────────────────────────────
const STRIPE_PK = 'pk_live_51RrgVIPJljF0WNcYMZK3XH5QGmffC4LsV0e8EdSglGdrD8SlY9akQwJhBO8N2d87i574E3ONKvbsabfgKc3SDSq500gJ96MghZ';

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 5 | 6;

type FormData = {
  // Personal
  first_name: string;
  last_name: string;
  date_of_birth: string;
  ssn_last_four: string;
  email: string;
  phone: string;
  alt_phone: string;
  // Address
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  zip_code: string;
  years_at_address: string;
  housing_status: string;
  // Employment
  employment_status: string;
  employer_name: string;
  job_title: string;
  years_employed: string;
  monthly_income: string;
  other_income: string;
  other_income_source: string;
  // Loan
  loan_amount_requested: string;
  loan_purpose: string;
  trip_description: string;
  travel_date: string;
  down_payment: string;
  preferred_term_months: string;
  // Financial
  monthly_rent_mortgage: string;
  monthly_car_payment: string;
  monthly_other_debt: string;
  checking_account: boolean;
  savings_account: boolean;
  bankruptcy_history: boolean;
  bankruptcy_details: string;
  // References
  reference1_name: string;
  reference1_phone: string;
  reference1_relation: string;
  reference2_name: string;
  reference2_phone: string;
  reference2_relation: string;
  // Consent
  consent_credit_check: boolean;
  consent_terms: boolean;
  esignature: string;
  // Auto-payment (Step 6)
  autopay_method: string;
  consent_autopay: boolean;
  autopay_esignature: string;
  stripe_payment_method_id: string;
};

const initialForm: FormData = {
  first_name: '', last_name: '', date_of_birth: '', ssn_last_four: '',
  email: '', phone: '', alt_phone: '',
  address_line1: '', address_line2: '', city: '', state: '', zip_code: '',
  years_at_address: '', housing_status: '',
  employment_status: '', employer_name: '', job_title: '', years_employed: '',
  monthly_income: '', other_income: '', other_income_source: '',
  loan_amount_requested: '', loan_purpose: '', trip_description: '',
  travel_date: '', down_payment: '', preferred_term_months: '',
  monthly_rent_mortgage: '', monthly_car_payment: '', monthly_other_debt: '',
  checking_account: false, savings_account: false,
  bankruptcy_history: false, bankruptcy_details: '',
  reference1_name: '', reference1_phone: '', reference1_relation: '',
  reference2_name: '', reference2_phone: '', reference2_relation: '',
  consent_credit_check: false, consent_terms: false, esignature: '',
  autopay_method: 'card', consent_autopay: false,
  autopay_esignature: '', stripe_payment_method_id: '',
};

const US_STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

const STEPS = [
  { num: 1, label: 'Personal Info' },
  { num: 2, label: 'Employment' },
  { num: 3, label: 'Financing Request' },
  { num: 4, label: 'Financial' },
  { num: 5, label: 'Review & Authorize' },
  { num: 6, label: 'Auto-Payment' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getIpAddress(): Promise<string> {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip || 'unknown';
  } catch {
    return 'unknown';
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

function FinancingApplicationInner({ tokenData }: { tokenData: TokenData; token: string }) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>({
    ...initialForm,
    first_name: (() => {
      // Try sessionStorage payload for pre-fill (PII-safe)
      try {
        const s = sessionStorage.getItem('cw_financing_payload');
        if (s) { const d = JSON.parse(s); return d.first_name || tokenData.client_name?.split(' ')[0] || ''; }
      } catch {}
      return tokenData.client_name?.split(' ')[0] || '';
    })(),
    last_name: tokenData.client_name?.split(' ').slice(1).join(' ') || '',
    email: tokenData.client_email || '',
    trip_description: (tokenData as any).trip_name || '',
    loan_amount_requested: (tokenData as any).loan_amount
      ? String((tokenData as any).loan_amount)
      : '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);
  const stripeRef = useRef<any>(null);
  const cardRef = useRef<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');
  const [error, setError] = useState('');
  const [efxResult, setEfxResult] = useState<{
    decision: string;
    client_message: string;
    badge_color: string;
    environment?: string;
  } | null>(null);
  const [efxLoading, setEfxLoading] = useState(false);

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    border: '1px solid rgba(13,27,42,0.25)',
    fontSize: '0.875rem', fontFamily: 'var(--font-body)',
    color: '#0d1b2a', background: 'white',
    outline: 'none', boxSizing: 'border-box' as const,
  };

  const labelStyle = {
    display: 'block', fontSize: '0.68rem',
    letterSpacing: '0.1em', textTransform: 'uppercase' as const,
    color: '#374151', marginBottom: 5,
    fontFamily: 'var(--font-body)',
  };

  const selectStyle = { ...inputStyle, cursor: 'pointer' };

  const field = (label: string, key: keyof FormData, type = 'text', required = false, placeholder = '') => (
    <div>
      <label style={labelStyle}>{label}{required && <span style={{ color: '#dc2626' }}> *</span>}</label>
      <input
        type={type}
        value={form[key] as string}
        onChange={e => set(key, e.target.value)}
        placeholder={placeholder}
        required={required}
        style={inputStyle}
      />
    </div>
  );

  const select = (label: string, key: keyof FormData, options: { value: string; label: string }[], required = false) => (
    <div>
      <label style={labelStyle}>{label}{required && <span style={{ color: '#dc2626' }}> *</span>}</label>
      <select value={form[key] as string} onChange={e => set(key, e.target.value)} style={selectStyle} required={required}>
        <option value="">Select...</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );

  const checkbox = (label: string, key: keyof FormData, description?: string) => (
    <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }}>
      <input
        type="checkbox"
        checked={form[key] as boolean}
        onChange={e => set(key, e.target.checked)}
        style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, cursor: 'pointer' }}
      />
      <div>
        <span style={{ fontSize: '0.875rem', color: '#0d1b2a', fontWeight: 500 }}>{label}</span>
        {description && <p style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: 2, lineHeight: 1.6 }}>{description}</p>}
      </div>
    </label>
  );

  // Mount Stripe element when on step 6
  useEffect(() => {
    if (step !== 6) return;
    if (!window.Stripe) return;
    if (!stripeRef.current) stripeRef.current = window.Stripe(STRIPE_PK);
    if (cardRef.current) return;
    const elements = stripeRef.current.elements();
    const style = { base: { fontFamily: 'Georgia, serif', fontSize: '15px', color: '#0d1b2a', '::placeholder': { color: '#94a3b8' } } };
    cardRef.current = form.autopay_method === 'bank'
      ? elements.create('bankAccount', { style, country: 'US', currency: 'usd', accountHolderType: 'individual', accountHolderName: `${form.first_name} ${form.last_name}` })
      : elements.create('card', { style });
    const el = document.getElementById('autopay-stripe-element');
    if (el && el.children.length === 0) {
      cardRef.current.mount('#autopay-stripe-element');
      setStripeReady(true);
    }
  }, [step, form.autopay_method]);

  const handleSubmit = async () => {
    // Loan application consent (Step 5)
    if (!form.consent_credit_check || !form.consent_terms) {
      setError('You must agree to both consent items to proceed.');
      return;
    }
    if (!form.esignature || form.esignature.trim().toLowerCase() !== `${form.first_name} ${form.last_name}`.toLowerCase()) {
      setError(`Your e-signature must match your full name: ${form.first_name} ${form.last_name}`);
      return;
    }
    // Auto-payment authorization (Step 6)
    if (!form.consent_autopay) {
      setError('You must authorize the auto-payment agreement to complete your pre-qualification request.');
      return;
    }
    if (!form.autopay_esignature || form.autopay_esignature.trim().toLowerCase() !== `${form.first_name} ${form.last_name}`.toLowerCase()) {
      setError(`Auto-payment signature must match your full name: ${form.first_name} ${form.last_name}`);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      // Tokenize payment method via Stripe before submitting
      let paymentMethodId = '';
      if (stripeRef.current && cardRef.current) {
        const { paymentMethod, error: stripeError } = await stripeRef.current.createPaymentMethod({
          type: form.autopay_method === 'bank' ? 'us_bank_account' : 'card',
          [form.autopay_method === 'bank' ? 'us_bank_account' : 'card']: cardRef.current,
          billing_details: { name: `${form.first_name} ${form.last_name}`, email: form.email },
        });
        if (stripeError) throw new Error(stripeError.message);
        paymentMethodId = paymentMethod?.id || '';
      }
      const ip = await getIpAddress();

      // Submit via Edge Function — uses service role key server-side
      // RLS stays ENABLED on loan_applications table
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/submit-loan-application`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            ip_address: ip,
            user_agent: navigator.userAgent,
            stripe_payment_method_id: paymentMethodId,
          }),
        }
      );

      const result = await res.json();
      if (!res.ok || result.error) throw new Error(result.error || 'Submission failed');

      setApplicationNumber(result.application_number || '');
      setSubmitted(true); // Show result screen immediately, then load Equifax

      // Run Equifax pre-qual — await result to show decision immediately
      if (result.id || result.application_id) {
        setEfxLoading(true);
        try {
          const efxRes = await fetch('/api/equifax-prequal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ application_id: result.id || result.application_id }),
          });
          const efxData = await efxRes.json();
          if (efxRes.ok && efxData.decision) {
            setEfxResult(efxData);
          }
        } catch (efxErr) {
          console.error('Equifax call failed:', efxErr);
          // Non-fatal — show generic pending message
        }
        setEfxLoading(false);
      }