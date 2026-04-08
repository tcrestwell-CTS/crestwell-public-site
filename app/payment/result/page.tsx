'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type ResultState = 'loading' | 'success' | 'denied' | 'cancelled' | 'error';

export default function AffirmResultPage() {
  const [state, setState] = useState<ResultState>('loading');
  const [ref, setRef] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('affirm_success') === '1') {
      setState('success');
      setRef(params.get('ref') ?? '');
      setAmount(params.get('amount') ?? '');
      setName(params.get('name') ?? '');
    } else if (params.get('affirm_denied') === '1') {
      setState('denied');
    } else if (params.get('affirm_cancelled') === '1') {
      setState('cancelled');
    } else if (params.get('affirm_error')) {
      setState('error');
    } else {
      setState('cancelled');
    }
  }, []);

  const configs: Record<ResultState, {
    icon: string; iconBg: string; iconColor: string;
    title: string; subtitle: string; body: string;
    badge: string; badgeColor: string;
  }> = {
    loading: {
      icon: '⏳', iconBg: '#f8fafc', iconColor: '#64748b',
      title: 'Loading...', subtitle: '', body: '', badge: '', badgeColor: '',
    },
    success: {
      icon: '✓', iconBg: 'linear-gradient(135deg, #10b981, #059669)', iconColor: 'white',
      title: 'Payment Approved!',
      subtitle: 'Your Affirm financing has been approved and payment captured.',
      body: "You'll receive your repayment schedule directly from Affirm via email or the Affirm app. Your travel specialist will be in touch shortly to confirm your booking details.",
      badge: 'APPROVED', badgeColor: '#16a34a',
    },
    denied: {
      icon: '✕', iconBg: 'linear-gradient(135deg, #ef4444, #dc2626)', iconColor: 'white',
      title: 'Financing Not Approved',
      subtitle: 'Affirm was unable to approve your financing application at this time.',
      body: "This doesn't affect your ability to book — you can still pay by credit or debit card, or ask us about our internal payment plan options. Contact your travel specialist for alternatives.",
      badge: 'NOT APPROVED', badgeColor: '#dc2626',
    },
    cancelled: {
      icon: '↩', iconBg: '#f1f5f9', iconColor: '#475569',
      title: 'Checkout Cancelled',
      subtitle: "You've returned from Affirm without completing the application.",
      body: 'No charges have been made. You can try again or choose a different payment method.',
      badge: 'CANCELLED', badgeColor: '#64748b',
    },
    error: {
      icon: '!', iconBg: 'linear-gradient(135deg, #f59e0b, #d97706)', iconColor: 'white',
      title: 'Something Went Wrong',
      subtitle: 'We encountered an issue processing your Affirm payment.',
      body: 'Your financing may still be approved — please contact your travel specialist before trying again so we can check the status and avoid a duplicate charge.',
      badge: 'ERROR', badgeColor: '#d97706',
    },
  };

  const c = configs[state];

  const detailRows = [
    name ? ['Name', name] : null,
    ref ? ['Booking Ref', ref] : null,
    amount ? ['Amount', amount] : null,
    ['Next Step', 'Confirmation email on its way'],
  ].filter(Boolean) as [string, string][];

  return (
    <main style={{
      minHeight: '100vh', background: 'var(--cream, #faf8f3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 20px',
    }}>
      <div style={{
        maxWidth: 520, width: '100%', background: 'white',
        boxShadow: '0 4px 40px rgba(13,27,42,0.08)',
        border: '1px solid rgba(13,27,42,0.08)',
      }}>

        {/* Header */}
        <div style={{
          background: 'var(--navy, #0d1b2a)', padding: '20px 32px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            color: 'var(--gold, #c9a84c)', fontSize: '1rem', fontWeight: 300,
          }}>
            Crestwell Travel Services
          </span>
          {c.badge && (
            <span style={{
              padding: '3px 10px', fontSize: '0.6rem', fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              background: `${c.badgeColor}22`, border: `1px solid ${c.badgeColor}`,
              color: c.badgeColor, fontFamily: 'var(--font-body, sans-serif)',
            }}>
              {c.badge}
            </span>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '48px 40px 40px', textAlign: 'center' }}>

          {/* Icon */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%', background: c.iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', fontSize: '1.75rem', color: c.iconColor, fontWeight: 700,
          }}>
            {c.icon}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: 'var(--font-display, Georgia, serif)',
            fontSize: '1.6rem', fontWeight: 300,
            color: 'var(--navy, #0d1b2a)', margin: '0 0 10px',
          }}>
            {c.title}
          </h1>

          {/* Subtitle */}
          {c.subtitle && (
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: '0 0 24px',
            }}>
              {c.subtitle}
            </p>
          )}

          {/* Success detail box */}
          {state === 'success' && detailRows.length > 0 && (
            <div style={{
              background: '#f0fdf4', border: '1px solid #bbf7d0',
              padding: '16px 20px', marginBottom: 24, textAlign: 'left',
            }}>
              {detailRows.map(([label, value]) => (
                <div key={label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '5px 0', fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.82rem',
                }}>
                  <span style={{ color: '#64748b' }}>{label}</span>
                  <span style={{
                    color: label === 'Amount' ? '#16a34a' : '#0d1b2a',
                    fontWeight: label === 'Amount' ? 700 : 400,
                  }}>{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Body text */}
          {c.body && (
            <p style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.85rem', color: '#64748b', lineHeight: 1.75,
              margin: '0 0 32px', textAlign: 'left',
            }}>
              {c.body}
            </p>
          )}

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {state === 'success' ? (
              <Link href="/" style={{
                display: 'inline-flex', alignItems: 'center', height: 48, padding: '0 28px',
                background: 'var(--navy, #0d1b2a)', color: 'white',
                fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.72rem',
                fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}>
                Back to Home
              </Link>
            ) : (
              <>
                <button
                  onClick={() => window.history.back()}
                  style={{
                    display: 'inline-flex', alignItems: 'center', height: 48, padding: '0 24px',
                    background: 'var(--navy, #0d1b2a)', color: 'white',
                    fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.72rem',
                    fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                    border: 'none', cursor: 'pointer',
                  }}
                >
                  Try Again
                </button>
                <a href="tel:8885086893" style={{
                  display: 'inline-flex', alignItems: 'center', height: 48, padding: '0 24px',
                  border: '1px solid var(--navy, #0d1b2a)', color: 'var(--navy, #0d1b2a)',
                  fontFamily: 'var(--font-body, sans-serif)', fontSize: '0.72rem',
                  fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                  textDecoration: 'none',
                }}>
                  Call Us
                </a>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          background: 'var(--cream, #faf8f3)', padding: '16px 40px',
          textAlign: 'center', borderTop: '1px solid rgba(13,27,42,0.06)',
        }}>
          <p style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.72rem', color: '#94a3b8', margin: 0,
          }}>
            Questions? Email{' '}
            <a href="mailto:info@crestwellgetaways.com" style={{ color: 'var(--gold, #c9a84c)', textDecoration: 'none' }}>
              info@crestwellgetaways.com
            </a>
            {' '}or call 888.508.6893
          </p>
        </div>

      </div>
    </main>
  );
}
