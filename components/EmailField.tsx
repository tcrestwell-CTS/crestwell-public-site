'use client';
import { useState, useCallback, useRef } from 'react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export type EmailValidationState = 'idle' | 'checking' | 'valid' | 'invalid';

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useEmailValidation() {
  const [state, setState] = useState<EmailValidationState>('idle');
  const [message, setMessage] = useState('');
  const [isRole, setIsRole] = useState(false);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastChecked = useRef('');

  const validate = useCallback(async (email: string) => {
    if (debounce.current) clearTimeout(debounce.current);

    if (!email || email.length < 5) {
      setState('idle'); setMessage(''); return;
    }

    // Instant format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState('invalid'); setMessage('Please enter a valid email address.'); return;
    }

    setState('checking');
    debounce.current = setTimeout(async () => {
      if (lastChecked.current === email) return;
      lastChecked.current = email;
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/validate-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (data.valid) {
          setState('valid');
          setIsRole(!!data.is_role);
          setMessage(data.is_role ? 'Note: role-based addresses (info@, admin@) may have delays.' : '');
        } else {
          setState('invalid');
          setMessage(data.reason || 'This email address could not be verified.');
        }
      } catch {
        setState('valid'); setMessage('');
      }
    }, 800);
  }, []);

  const reset = useCallback(() => {
    if (debounce.current) clearTimeout(debounce.current);
    setState('idle'); setMessage(''); setIsRole(false);
    lastChecked.current = '';
  }, []);

  return { state, message, isRole, validate, reset };
}

// ── EmailField component ──────────────────────────────────────────────────────

type Props = {
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
  label?: string;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
};

export function EmailField({
  value, onChange,
  required = false,
  placeholder = 'your@email.com',
  label = 'Email Address',
  inputClassName = '',
  inputStyle = {},
  labelStyle = {},
}: Props) {
  const { state, message, validate } = useEmailValidation();

  const borderColor = {
    idle: 'rgba(13,27,42,0.25)',
    checking: 'rgba(13,27,42,0.25)',
    valid: '#10b981',
    invalid: '#ef4444',
  }[state];

  return (
    <div>
      {label && (
        <label style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#374151', marginBottom: 5, fontFamily: 'var(--font-body)', ...labelStyle }}>
          {label}{required && <span style={{ color: '#dc2626' }}> *</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          type="email"
          value={value}
          required={required}
          placeholder={placeholder}
          className={inputClassName}
          onChange={e => { onChange(e.target.value); validate(e.target.value); }}
          style={{
            width: '100%', padding: '11px 40px 11px 14px',
            border: `1px solid ${borderColor}`,
            fontSize: '0.875rem', fontFamily: 'var(--font-body)',
            color: '#0d1b2a', background: 'white',
            outline: 'none', boxSizing: 'border-box',
            transition: 'border-color 0.2s',
            ...inputStyle,
          }}
        />
        {/* Status indicator */}
        <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '0.85rem', lineHeight: 1 }}>
          {state === 'checking' && (
            <span style={{ display: 'inline-block', width: 13, height: 13, border: '2px solid #e5e7eb', borderTopColor: '#94a3b8', borderRadius: '50%', animation: 'emailSpin 0.7s linear infinite' }} />
          )}
          {state === 'valid' && <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>}
          {state === 'invalid' && <span style={{ color: '#ef4444', fontWeight: 700 }}>✗</span>}
        </div>
      </div>
      {/* Status message */}
      {state === 'checking' && (
        <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 4 }}>Verifying email address...</p>
      )}
      {message && (
        <p style={{ fontSize: '0.7rem', color: state === 'invalid' ? '#ef4444' : '#6b7280', marginTop: 4, lineHeight: 1.5 }}>
          {message}
        </p>
      )}
      <style>{`@keyframes emailSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Honeypot field ────────────────────────────────────────────────────────────
// Invisible to humans, bots fill it in → reject submission

export function HoneypotField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, pointerEvents: 'none', tabIndex: -1, ariaHidden: true } as React.CSSProperties}>
      <label htmlFor="website_url">Website (leave blank)</label>
      <input
        id="website_url"
        name="website_url"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
