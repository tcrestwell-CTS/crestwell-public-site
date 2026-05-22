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
    first_name: tokenData.client_name?.split(' ')[0] || '',
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
      }ient';
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
    first_name: tokenData.client_name?.split(' ')[0] || '',
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
      setSubmitted(true);

      // Trigger Equifax pre-qual in background — non-blocking
      if (result.id || result.application_id) {
        fetch('/api/equifax-prequal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ application_id: result.id || result.application_id }),
        }).catch(console.error);
      }
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 72 }}>
        <div style={{ maxWidth: 600, margin: '60px auto 80px', background: 'white', boxShadow: '0 4px 40px rgba(13,27,42,0.08)', border: '1px solid rgba(201,168,76,0.15)', padding: '48px 40px', textAlign: 'center' }}>
          {/* Decision result */}
          {efxLoading ? (
            <div style={{ marginBottom: 32 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '1.5rem' }}>⏳</div>
              <h2 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--navy)', marginBottom: 8 }}>Checking your credit profile...</h2>
              <p style={{ color: 'var(--slate)', fontSize: '0.875rem' }}>This takes just a few seconds.</p>
            </div>
          ) : efxResult ? (
            <div style={{ marginBottom: 32 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%',
                background: efxResult.decision === 'approved' ? 'linear-gradient(135deg, #10b981, #059669)' :
                            efxResult.decision === 'review'   ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                                                                'linear-gradient(135deg, #ef4444, #dc2626)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px', fontSize: '2rem', color: 'white' }}>
                {efxResult.decision === 'approved' ? '✓' : efxResult.decision === 'review' ? '◷' : '✕'}
              </div>
              <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 12 }}>
                {efxResult.decision === 'approved' ? 'Pre-Qualified!' :
                 efxResult.decision === 'review'   ? 'Under Review' : 'Application Received'}
              </h2>
              {efxResult.environment === 'sandbox' && (
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '2px 8px', borderRadius: 20, background: '#fef9c3', color: '#854d0e',
                  border: '1px solid #fde68a', display: 'inline-block', marginBottom: 12 }}>
                  Sandbox Mode
                </span>
              )}
              <p style={{ color: 'var(--slate)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 0 }}>
                {efxResult.client_message}
              </p>
            </div>
          ) : (
            <div style={{ marginBottom: 32 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem', color: 'white' }}>✓</div>
              <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 8 }}>Application Submitted</h2>
              <p style={{ color: 'var(--slate)', fontSize: '0.9rem', marginBottom: 0, lineHeight: 1.7 }}>
                Thank you, {form.first_name}. We've received your pre-qualification request and will be in touch within 1–2 business days.
              </p>
          <div style={{ background: 'var(--cream)', padding: '20px', marginBottom: 32, textAlign: 'left' }}>
            {[
              { label: 'Pre-Qualification #', value: applicationNumber },
              { label: 'Consumer', value: `${form.first_name} ${form.last_name}` },
              { label: 'Amount Requested', value: `$${parseFloat(form.loan_amount_requested).toLocaleString()}` },
              { label: 'Status', value: 'Pre-Qualification Under Review' },
              { label: 'Next Step', value: 'A specialist will contact you within 1–2 business days' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px solid rgba(13,27,42,0.06)' : 'none', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--slate)' }}>{item.label}</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--navy)', fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-navy" style={{ textDecoration: 'none' }}>Back to Home</Link>
            <Link href="/contact" style={{ padding: '12px 24px', border: '1px solid var(--navy)', color: 'var(--navy)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Contact Us</Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Step progress bar ─────────────────────────────────────────────────────

  const StepBar = () => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, overflowX: 'auto', paddingBottom: 4 }}>
      {STEPS.map((s, i) => (
        <div key={s.num} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600,
              background: step > s.num ? '#10b981' : step === s.num ? 'var(--navy)' : 'rgba(13,27,42,0.08)',
              color: step >= s.num ? 'white' : 'var(--slate)',
              border: step === s.num ? '2px solid var(--gold)' : 'none',
              transition: 'all 0.3s',
            }}>
              {step > s.num ? '✓' : s.num}
            </div>
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: step === s.num ? 'var(--navy)' : 'var(--slate)', whiteSpace: 'nowrap', fontFamily: 'var(--font-body)' }}>{s.label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ flex: 1, height: 2, background: step > s.num ? '#10b981' : 'rgba(13,27,42,0.1)', margin: '0 8px', marginBottom: 20, transition: 'background 0.3s' }} />
          )}
        </div>
      ))}
    </div>
  );

  const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 };
  const grid3 = { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 };

  return (
    <>
      <Script id="stripe-js" src="https://js.stripe.com/v3/" strategy="afterInteractive" onLoad={() => { if (step === 6 && !stripeRef.current) { stripeRef.current = window.Stripe(STRIPE_PK); } }} />

      {/* Hero */}
      <section style={{ background: 'var(--navy)', paddingTop: 100, paddingBottom: 48, position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', position: 'absolute', top: 72, left: 0, right: 0 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Travel Financing Pre-Qualification</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>Travel Financing Pre-Qualification</h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', maxWidth: 520, margin: '0 auto 24px', lineHeight: 1.75 }}>
            Request pre-qualification for in-house travel financing through Crestwell Travel Services. Quick review, flexible terms, no dealer markups.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            {['🔒 Secure & Encrypted', '⚡ 1–2 Day Review', '💰 Flexible Terms', '✈️ Travel Now, Pay Over Time'].map((b, i) => (
              <span key={i} style={{ fontSize: '0.68rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ background: 'var(--cream)', padding: '48px 32px 80px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ background: 'white', boxShadow: '0 4px 40px rgba(13,27,42,0.08)', border: '1px solid rgba(201,168,76,0.15)', padding: '40px' }}>
            <StepBar />

            {/* ── Step 1: Personal Info ── */}
            {step === 1 && (
              <div>
                <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 24 }}>Consumer Personal Information</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={grid2}>
                    {field('First Name', 'first_name', 'text', true)}
                    {field('Last Name', 'last_name', 'text', true)}
                  </div>
                  <div style={grid2}>
                    {field('Date of Birth', 'date_of_birth', 'date', true)}
                    {field('Last 4 of SSN', 'ssn_last_four', 'text', false, 'XXXX')}
                  </div>
                  <div style={grid2}>
                    {field('Email Address', 'email', 'email', true)}
                    {field('Phone Number', 'phone', 'tel', true, '(555) 000-0000')}
                  </div>
                  {field('Alternate Phone', 'alt_phone', 'tel', false)}
                  <div style={{ borderTop: '1px solid rgba(13,27,42,0.06)', paddingTop: 16 }}>
                    <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 12 }}>Current Address</div>
                    {field('Street Address', 'address_line1', 'text', true)}
                    {field('Apt / Suite / Unit', 'address_line2')}
                    <div style={{ ...grid3, marginTop: 16 }}>
                      {field('City', 'city', 'text', true)}
                      <div>
                        <label style={labelStyle}>State <span style={{ color: '#dc2626' }}>*</span></label>
                        <select value={form.state} onChange={e => set('state', e.target.value)} style={selectStyle} required>
                          <option value="">State</option>
                          {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      {field('ZIP Code', 'zip_code', 'text', true, '37401')}
                    </div>
                    <div style={{ ...grid2, marginTop: 16 }}>
                      {select('Time at Address', 'years_at_address', [
                        { value: '<1', label: 'Less than 1 year' },
                        { value: '1-2', label: '1–2 years' },
                        { value: '3-5', label: '3–5 years' },
                        { value: '5+', label: '5+ years' },
                      ])}
                      {select('Housing Status', 'housing_status', [
                        { value: 'own', label: 'Own' },
                        { value: 'rent', label: 'Rent' },
                        { value: 'other', label: 'Other (living with family, etc.)' },
                      ])}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Employment ── */}
            {step === 2 && (
              <div>
                <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 24 }}>Employment & Income</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {select('Employment Status', 'employment_status', [
                    { value: 'employed', label: 'Employed Full-Time' },
                    { value: 'part_time', label: 'Employed Part-Time' },
                    { value: 'self_employed', label: 'Self-Employed' },
                    { value: 'retired', label: 'Retired' },
                    { value: 'unemployed', label: 'Unemployed' },
                    { value: 'other', label: 'Other' },
                  ], true)}
                  {['employed', 'part_time', 'self_employed'].includes(form.employment_status) && (
                    <>
                      <div style={grid2}>
                        {field('Employer Name', 'employer_name', 'text', false)}
                        {field('Job Title', 'job_title', 'text', false)}
                      </div>
                      {select('Time with Employer', 'years_employed', [
                        { value: '<1', label: 'Less than 1 year' },
                        { value: '1-2', label: '1–2 years' },
                        { value: '3-5', label: '3–5 years' },
                        { value: '5-10', label: '5–10 years' },
                        { value: '10+', label: '10+ years' },
                      ])}
                    </>
                  )}
                  <div style={grid2}>
                    <div>
                      <label style={labelStyle}>Gross Monthly Income <span style={{ color: '#dc2626' }}>*</span></label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>$</span>
                        <input type="number" min="0" value={form.monthly_income} onChange={e => set('monthly_income', e.target.value)} placeholder="0.00" style={{ ...inputStyle, paddingLeft: 24 }} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Other Monthly Income</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>$</span>
                        <input type="number" min="0" value={form.other_income} onChange={e => set('other_income', e.target.value)} placeholder="0.00" style={{ ...inputStyle, paddingLeft: 24 }} />
                      </div>
                    </div>
                  </div>
                  {form.other_income && parseFloat(form.other_income) > 0 && (
                    field('Other Income Source', 'other_income_source', 'text', false, 'e.g. Social Security, rental income')
                  )}
                </div>
              </div>
            )}

            {/* ── Step 3: Loan Details ── */}
            {step === 3 && (
              <div>
                <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 24 }}>Financing Request Details</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Loan Amount Requested <span style={{ color: '#dc2626' }}>*</span></label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280', fontSize: '1rem' }}>$</span>
                      <input type="number" min="500" max="25000" value={form.loan_amount_requested} onChange={e => set('loan_amount_requested', e.target.value)} placeholder="0.00" style={{ ...inputStyle, paddingLeft: 24, fontSize: '1.1rem' }} required />
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--slate)', marginTop: 4 }}>Minimum $500 · Maximum $25,000</p>
                  </div>
                  <div style={grid2}>
                    {select('Loan Purpose', 'loan_purpose', [
                      { value: 'cruise', label: 'Cruise Vacation' },
                      { value: 'all_inclusive', label: 'All-Inclusive Resort' },
                      { value: 'group_trip', label: 'Group Trip' },
                      { value: 'river_cruise', label: 'River Cruise' },
                      { value: 'international', label: 'International Travel' },
                      { value: 'other', label: 'Other' },
                    ], true)}
                    {select('Preferred Repayment Term', 'preferred_term_months', [
                      { value: '12', label: '12 months' },
                      { value: '24', label: '24 months' },
                      { value: '36', label: '36 months' },
                      { value: '48', label: '48 months' },
                      { value: '60', label: '60 months' },
                    ], true)}
                  </div>
                  <div style={grid2}>
                    <div>
                      <label style={labelStyle}>Down Payment (if any)</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>$</span>
                        <input type="number" min="0" value={form.down_payment} onChange={e => set('down_payment', e.target.value)} placeholder="0.00" style={{ ...inputStyle, paddingLeft: 24 }} />
                      </div>
                    </div>
                    {field('Estimated Travel Date', 'travel_date', 'date')}
                  </div>
                  <div>
                    <label style={labelStyle}>Trip Description</label>
                    <textarea value={form.trip_description} onChange={e => set('trip_description', e.target.value)} placeholder="Describe the trip you're planning (cruise line, destination, number of travelers, etc.)" rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>

                  {/* Estimated payment preview */}
                  {form.loan_amount_requested && form.preferred_term_months && parseFloat(form.loan_amount_requested) > 0 && (
                    <div style={{ background: 'var(--cream)', padding: '20px', borderLeft: '3px solid var(--gold)' }}>
                      <div style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 8 }}>Estimated Monthly Payment</div>
                      <div className="font-display" style={{ fontSize: '1.75rem', color: 'var(--navy)', fontWeight: 300 }}>
                        ${Math.ceil(parseFloat(form.loan_amount_requested) / parseInt(form.preferred_term_months)).toLocaleString()}
                        <span style={{ fontSize: '0.9rem', color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>/mo</span>
                      </div>
                      <p style={{ fontSize: '0.72rem', color: 'var(--slate)', marginTop: 4 }}>Estimate only — actual rate and terms set upon approval</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── Step 4: Financial & References ── */}
            {step === 4 && (
              <div>
                <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 24 }}>Financial Information & References</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)' }}>Monthly Obligations</div>
                  <div style={grid3}>
                    {['monthly_rent_mortgage', 'monthly_car_payment', 'monthly_other_debt'].map((key, i) => (
                      <div key={key}>
                        <label style={labelStyle}>{['Rent/Mortgage', 'Car Payment', 'Other Debt'][i]}</label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>$</span>
                          <input type="number" min="0" value={form[key as keyof FormData] as string} onChange={e => set(key as keyof FormData, e.target.value)} placeholder="0" style={{ ...inputStyle, paddingLeft: 24 }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px', background: 'var(--cream)' }}>
                    {checkbox('I have a checking account', 'checking_account')}
                    {checkbox('I have a savings account', 'savings_account')}
                    {checkbox('I have filed for bankruptcy in the past 7 years', 'bankruptcy_history')}
                  </div>
                  {form.bankruptcy_history && (
                    <div>
                      <label style={labelStyle}>Bankruptcy Details</label>
                      <textarea value={form.bankruptcy_details} onChange={e => set('bankruptcy_details', e.target.value)} placeholder="Year filed, chapter, discharge date..." rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
                    </div>
                  )}

                  {/* References */}
                  <div style={{ borderTop: '1px solid rgba(13,27,42,0.06)', paddingTop: 16 }}>
                    <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 12 }}>Personal References</div>
                    {[1, 2].map(n => (
                      <div key={n} style={{ marginBottom: 16, padding: '16px', background: 'var(--cream)' }}>
                        <div style={{ fontSize: '0.72rem', color: 'var(--slate)', marginBottom: 10 }}>Reference {n}</div>
                        <div style={grid3}>
                          {field(`Full Name`, `reference${n}_name` as keyof FormData)}
                          {field(`Phone`, `reference${n}_phone` as keyof FormData, 'tel')}
                          {select(`Relationship`, `reference${n}_relation` as keyof FormData, [
                            { value: 'family', label: 'Family' },
                            { value: 'friend', label: 'Friend' },
                            { value: 'coworker', label: 'Coworker' },
                            { value: 'other', label: 'Other' },
                          ])}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}


            {/* ── Step 6: Auto-Payment Setup ── */}
            {step === 6 && (
              <div>
                <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 8 }}>
                  Auto-Payment Authorization
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate)', lineHeight: 1.7, marginBottom: 24 }}>
                  To complete your pre-qualification request, please provide a payment method for automatic monthly installments. <strong style={{ color: 'var(--navy)' }}>This will only be activated upon approval of your loan.</strong> No charges will occur until you receive and accept your loan offer.
                </p>

                {/* Important notice */}
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '16px 20px', marginBottom: 24 }}>
                  <p style={{ fontSize: '0.82rem', color: '#92400e', lineHeight: 1.7, margin: 0 }}>
                    <strong>⚠️ Important:</strong> Your payment method will be securely stored by Stripe and will <strong>not</strong> be charged today. Monthly installment payments will begin only after your pre-qualification is reviewed, a formal financing offer is extended, and you have accepted the offer in writing.
                  </p>
                </div>

                {/* Payment method type */}
                <div style={{ marginBottom: 20 }}>
                  <div style={labelStyle}>Payment Method Type</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[{ id: 'card', label: '💳 Debit Card' }, { id: 'bank', label: '🏦 Bank Account (ACH)' }].map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => set('autopay_method', m.id)}
                        style={{
                          flex: 1, padding: '12px', border: '1px solid', cursor: 'pointer',
                          fontFamily: 'var(--font-body)', fontSize: '0.82rem', transition: 'all 0.2s',
                          borderColor: form.autopay_method === m.id ? 'var(--navy)' : 'rgba(13,27,42,0.2)',
                          background: form.autopay_method === m.id ? 'var(--navy)' : 'white',
                          color: form.autopay_method === m.id ? 'white' : 'var(--slate)',
                        }}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stripe Elements mount point */}
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>
                    {form.autopay_method === 'card' ? 'Debit Card Details' : 'Bank Account Details'}
                  </label>
                  <div id="autopay-stripe-element" style={{ padding: '14px 16px', border: '1px solid rgba(13,27,42,0.35)', background: 'white', minHeight: 50 }} />
                  <p style={{ fontSize: '0.7rem', color: 'var(--slate)', marginTop: 6 }}>
                    🔒 Your payment details are encrypted by Stripe and never stored on our servers.
                    {form.autopay_method === 'bank' && ' ACH debit authorization will be confirmed after approval.'}
                  </p>
                </div>

                {/* ACH Authorization text */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '16px', marginBottom: 20, maxHeight: 160, overflowY: 'auto', fontSize: '0.75rem', color: '#374151', lineHeight: 1.7 }}>
                  <strong>AUTO-PAYMENT AUTHORIZATION AGREEMENT</strong><br /><br />
                  By signing below, I, <strong>{form.first_name} {form.last_name}</strong>, hereby authorize Crestwell Travel Services to initiate recurring electronic debit entries to the {form.autopay_method === 'bank' ? 'bank account' : 'debit card'} provided above for my approved travel financing installment payments.<br /><br />
                  I understand that:<br />
                  • This authorization takes effect ONLY upon my acceptance of a formal written financing offer following successful pre-qualification.<br />
                  • No charges will be made to this payment method until my loan is approved and I have accepted the final loan agreement.<br />
                  • Monthly installment amounts and start date will be disclosed in my approval letter.<br />
                  • I may cancel this auto-payment authorization by providing written notice to Crestwell Travel Services at least 3 business days before the next scheduled payment.<br />
                  • I am responsible for ensuring sufficient funds are available on each payment date.<br />
                  • Returned or failed payments may result in additional fees per my loan agreement.<br /><br />
                  This authorization remains in effect until my loan is paid in full or I provide written cancellation notice.
                </div>

                {/* Autopay consent checkbox */}
                <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer', marginBottom: 20 }}>
                  <input
                    type="checkbox"
                    checked={form.consent_autopay}
                    onChange={e => set('consent_autopay', e.target.checked)}
                    style={{ marginTop: 3, width: 16, height: 16, flexShrink: 0, cursor: 'pointer' }}
                  />
                  <div>
                    <span style={{ fontSize: '0.875rem', color: '#0d1b2a', fontWeight: 500 }}>
                      I authorize Crestwell Travel Services to debit my {form.autopay_method === 'bank' ? 'bank account' : 'debit card'} for approved monthly installment payments
                    </span>
                    <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: 3, lineHeight: 1.6 }}>
                      This authorization is conditional upon loan approval and acceptance of final loan terms. No charges today.
                    </p>
                  </div>
                </label>

                {/* Auto-payment e-signature */}
                <div style={{ border: '1px solid rgba(201,168,76,0.3)', padding: '20px', background: 'white' }}>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 8 }}>
                    Auto-Payment Authorization Signature
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#374151', marginBottom: 12, lineHeight: 1.6 }}>
                    Type your full legal name (<strong>{form.first_name} {form.last_name}</strong>) to authorize the auto-payment agreement above.
                  </p>
                  <input
                    type="text"
                    value={form.autopay_esignature}
                    onChange={e => set('autopay_esignature', e.target.value)}
                    placeholder={`${form.first_name} ${form.last_name}`}
                    style={{ ...inputStyle, fontFamily: 'Georgia, serif', fontSize: '1.1rem', borderColor: 'rgba(201,168,76,0.4)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--slate)' }}>🔒 Electronically signed — conditional upon loan approval</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--slate)' }}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                {error && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', marginTop: 16, fontSize: '0.82rem', color: '#dc2626' }}>
                    {error}
                  </div>
                )}
              </div>
            )}

                        {/* ── Step 5: Review & Sign ── */}
            {step === 5 && (
              <div>
                <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 24 }}>Review & Authorize Pre-Qualification</h2>

                {/* Summary */}
                <div style={{ background: 'var(--cream)', padding: '20px', marginBottom: 24 }}>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 12 }}>Pre-Qualification Summary</div>
                  {[
                    { label: 'Consumer', value: `${form.first_name} ${form.last_name}` },
                    { label: 'Email', value: form.email },
                    { label: 'Phone', value: form.phone },
                    { label: 'Address', value: `${form.address_line1}, ${form.city}, ${form.state} ${form.zip_code}` },
                    { label: 'Employment', value: form.employment_status },
                    { label: 'Monthly Income', value: form.monthly_income ? `$${parseFloat(form.monthly_income).toLocaleString()}` : 'Not provided' },
                    { label: 'Loan Amount', value: form.loan_amount_requested ? `$${parseFloat(form.loan_amount_requested).toLocaleString()}` : '—' },
                    { label: 'Loan Purpose', value: form.loan_purpose || '—' },
                    { label: 'Preferred Term', value: form.preferred_term_months ? `${form.preferred_term_months} months` : '—' },
                  ].map((item, i, arr) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(13,27,42,0.06)' : 'none', flexWrap: 'wrap', gap: 8 }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--slate)' }}>{item.label}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--navy)', fontWeight: 500 }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Disclosures */}
                <div style={{ background: '#fafafa', border: '1px solid #e5e7eb', padding: '16px', marginBottom: 20, fontSize: '0.78rem', color: '#374151', lineHeight: 1.7, maxHeight: 140, overflowY: 'auto' }}>
                  <strong>Credit Report Authorization & Disclosure:</strong> By submitting this pre-qualification request, I authorize <strong>Crestwell Travel Services</strong> to access and review my consumer credit information. I understand that: (a) <strong>my credit will be accessed and reviewed</strong> for the purpose of this pre-qualification only; (b) this credit access is being conducted <strong>for the purpose of determining pre-qualification eligibility</strong> for in-house travel financing; (c) my credit information will be obtained from <strong>Equifax and/or one or more Consumer Reporting Agencies</strong> as defined under the Fair Credit Reporting Act (FCRA); (d) this review constitutes a <strong>soft inquiry and will not negatively impact my credit score</strong>; and (e) a separate hard inquiry authorization will be required if I proceed to a formal financing arrangement. <strong>This is a pre-qualification request only — not a credit application or loan agreement.</strong> Pre-qualification does not guarantee financing. Crestwell Travel Services reserves the right to deny pre-qualification at its sole discretion.
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                  {checkbox('I authorize Crestwell Travel Services to review my credit information', 'consent_credit_check',
                    'I understand this may include a soft credit inquiry during review.')}
                  {checkbox('I agree to the Terms & Conditions and Privacy Policy for this Pre-Qualification Request', 'consent_terms',
                    'I confirm all information provided is accurate and complete to the best of my knowledge.')}
                </div>

                {/* E-signature */}
                <div style={{ border: '1px solid rgba(201,168,76,0.3)', padding: '20px', background: 'white' }}>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 8 }}>Electronic Signature</div>
                  <p style={{ fontSize: '0.8rem', color: '#374151', marginBottom: 12, lineHeight: 1.6 }}>
                    Type your full legal name exactly as it appears above (<strong>{form.first_name} {form.last_name}</strong>) to serve as your electronic signature.
                  </p>
                  <input
                    type="text"
                    value={form.esignature}
                    onChange={e => set('esignature', e.target.value)}
                    placeholder={`${form.first_name} ${form.last_name}`}
                    style={{ ...inputStyle, fontFamily: 'Georgia, serif', fontSize: '1.1rem', letterSpacing: '0.02em', borderColor: 'rgba(201,168,76,0.4)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--slate)' }}>🔒 Electronically signed</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--slate)' }}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                {error && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', marginTop: 16, fontSize: '0.82rem', color: '#dc2626' }}>
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(13,27,42,0.08)' }}>
              <button
                onClick={() => { setError(''); setStep(prev => (prev > 1 ? (prev - 1) as Step : prev)); }}
                disabled={step === 1}
                style={{ padding: '11px 24px', border: '1px solid rgba(13,27,42,0.2)', background: 'white', color: step === 1 ? '#d1d5db' : 'var(--navy)', fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', cursor: step === 1 ? 'not-allowed' : 'pointer' }}
              >
                ← Back
              </button>

              <span style={{ fontSize: '0.72rem', color: 'var(--slate)' }}>Step {step} of {STEPS.length}</span>

              {step < 6 ? (
                <button
                  onClick={() => setStep(prev => (prev < 6 ? (prev + 1) as Step : prev))}
                  className="btn-primary"
                  style={{ border: 'none', cursor: 'pointer', padding: '11px 28px', fontSize: '0.78rem' }}
                >
                  Continue →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn-primary"
                  style={{ border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1, padding: '11px 28px', fontSize: '0.78rem' }}
                >
                  {submitting ? 'Submitting...' : 'Submit Pre-Qualification Request'}
                </button>
              )}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--slate)', lineHeight: 1.7 }}>
              Questions? Call <a href="tel:8885086893" style={{ color: 'var(--navy)', fontWeight: 500, textDecoration: 'none' }}>888.508.6893</a> or email <a href="mailto:info@crestwellgetaways.com" style={{ color: 'var(--navy)', fontWeight: 500, textDecoration: 'none' }}>info@crestwellgetaways.com</a>
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 600px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}


function FinancingPageWithGate() {
  return (
    <TokenGate linkType="financing">
      {(tokenData, token) => <FinancingApplicationInner tokenData={tokenData} token={token} />}
    </TokenGate>
  );
}

export default function FinancingApplicationPage() {
  return (
    <Suspense fallback={<div style={{ background: 'var(--navy)', minHeight: '100vh' }} />}>
      <FinancingPageWithGate />
    </Suspense>
  );
}
