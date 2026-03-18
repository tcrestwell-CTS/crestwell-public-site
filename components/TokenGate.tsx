'use client';
import { useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export type TokenData = {
  client_name: string;
  client_email: string;
  booking_ref: string | null;
  trip_name: string | null;
  amount: number | null;
  expires_at: string;
};

type Props = {
  linkType: 'payment' | 'financing';
  children: (tokenData: TokenData, token: string) => ReactNode;
};

export default function TokenGate({ linkType, children }: Props) {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('invalid');
      setReason('No access token found in this link.');
      return;
    }

    fetch(`${SUPABASE_URL}/functions/v1/validate-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, link_type: linkType }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.valid) {
          setTokenData({
            client_name: data.client_name,
            client_email: data.client_email,
            booking_ref: data.booking_ref,
            trip_name: data.trip_name,
            amount: data.amount,
            expires_at: data.expires_at,
          });
          setStatus('valid');
        } else {
          setReason(data.reason || 'This link is not valid.');
          setStatus('invalid');
        }
      })
      .catch(() => {
        setReason('Unable to verify your link. Please try again or contact us.');
        setStatus('invalid');
      });
  }, [token, linkType]);

  // Loading
  if (status === 'loading') {
    return (
      <div style={{ background: 'var(--navy)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 72 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '3px solid rgba(201,168,76,0.3)', borderTopColor: 'var(--gold)', borderRadius: '50%', margin: '0 auto 20px', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Verifying your link...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  // Invalid
  if (status === 'invalid') {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 480, width: '100%', margin: '0 40px', background: 'white', boxShadow: '0 4px 40px rgba(13,27,42,0.08)', border: '1px solid rgba(13,27,42,0.1)', padding: '48px 40px', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fef2f2', border: '2px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '1.75rem' }}>🔒</div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 12 }}>
            {linkType === 'payment' ? 'Payment Link' : 'Application Link'} Not Valid
          </h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 32 }}>
            {reason}
          </p>
          <div style={{ background: 'var(--cream)', padding: '16px 20px', marginBottom: 28, textAlign: 'left' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate)', lineHeight: 1.7, margin: 0 }}>
              This could mean:
              <br />• The link has expired (links are valid for 72 hours)
              <br />• The link has already been used
              <br />• The link was copied incorrectly
            </p>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--slate)', marginBottom: 20 }}>
            Please contact your travel specialist for a new link.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:8885086893" className="btn-navy" style={{ textDecoration: 'none' }}>Call 888.508.6893</a>
            <Link href="mailto:info@crestwellgetaways.com" style={{ padding: '12px 20px', border: '1px solid var(--navy)', color: 'var(--navy)', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Email Us</Link>
          </div>
        </div>
      </div>
    );
  }

  // Valid — render the protected page
  return <>{children(tokenData!, token!)}</>;
}
