import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Make a Payment',
  description: 'Securely make a payment for your Crestwell Travel Services booking.',
};

export default function PaymentPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', paddingTop: 120, paddingBottom: 40, position: 'relative', overflow: 'hidden' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', position: 'absolute', top: 72, left: 0, right: 0 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Secure Checkout</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: 16 }}>
            Make a Payment
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', maxWidth: 480, margin: '0 auto', lineHeight: 1.75 }}>
            Securely pay your deposit or balance for your upcoming trip. All payments are encrypted and processed safely.
          </p>
          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginTop: 28, flexWrap: 'wrap' }}>
            {['🔒 SSL Encrypted', '✓ PCI Compliant', '💳 All Major Cards'].map((badge, i) => (
              <span key={i} style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Payment iframe */}
      <section style={{ background: 'var(--cream)', padding: '40px 32px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            background: 'white',
            boxShadow: '0 4px 40px rgba(13,27,42,0.08)',
            border: '1px solid rgba(201,168,76,0.15)',
            overflow: 'hidden',
            minHeight: 700,
          }}>
            <iframe
              src="https://payments.crestwelltravels.com"
              title="Crestwell Travel Services — Secure Payment"
              width="100%"
              height="800"
              style={{
                border: 'none',
                display: 'block',
                minHeight: 700,
              }}
              allow="payment"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-top-navigation"
            />
          </div>

          {/* Help text */}
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--slate)', lineHeight: 1.7 }}>
              Having trouble? Call us at{' '}
              <a href="tel:8885086893" style={{ color: 'var(--navy)', fontWeight: 500, textDecoration: 'none' }}>
                888.508.6893
              </a>
              {' '}or email{' '}
              <a href="mailto:info@crestwellgetaways.com" style={{ color: 'var(--navy)', fontWeight: 500, textDecoration: 'none' }}>
                info@crestwellgetaways.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
