import Link from 'next/link';

export const metadata = {
  title: 'Press Release: Crestwell Travel Services Adds TxtCha Cross-Channel Messaging | Crestwell Travel',
  description: 'Crestwell Travel Services introduces TxtCha, a cross-channel platform that unifies SMS, email, Telegram, and in-app chat into a single shared conversation for client travel accounts.',
  openGraph: {
    title: 'Crestwell Travel Services Adds TxtCha Cross-Channel Messaging for Client Travel Accounts',
    description: 'New group communication option keeps families and travel companions connected across SMS, email, Telegram, and in-app chat — all in one conversation.',
  },
};

export default function TxtChaPressRelease() {
  return (
    <main style={{ background: 'var(--warm-white)', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        background: 'var(--navy)',
        paddingTop: 120,
        paddingBottom: 64,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative gold lines */}
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)' }} />

        <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <span style={{
              fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500,
              background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)',
              padding: '4px 12px',
            }}>
              For Immediate Release
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontFamily: 'var(--font-body)' }}>
              May 19, 2026
            </span>
          </div>

          <h1 className="font-display" style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)',
            fontWeight: 400,
            color: 'white',
            lineHeight: 1.25,
            marginBottom: 20,
          }}>
            Crestwell Travel Services Adds TxtCha<br />
            <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Cross-Channel Messaging</span> for Client Travel Accounts
          </h1>

          <p style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.75,
            fontFamily: 'var(--font-body)',
            maxWidth: 640,
            fontStyle: 'italic',
          }}>
            New group communication option keeps families and travel companions connected across SMS, email, Telegram, and in-app chat — all in one conversation
          </p>
        </div>
      </section>

      {/* Body */}
      <section style={{ maxWidth: 780, margin: '0 auto', padding: '64px 32px 80px' }}>

        {/* Dateline */}
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--slate)',
          fontFamily: 'var(--font-body)',
          marginBottom: 32,
          paddingBottom: 24,
          borderBottom: '1px solid rgba(13,27,42,0.1)',
        }}>
          <strong style={{ color: 'var(--navy)' }}>CHATTANOOGA, TN</strong> — May 19, 2026 —
        </p>

        {/* Article body */}
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          lineHeight: 1.85,
          color: 'var(--text-secondary)',
        }}>

          <p style={{ marginBottom: 22 }}>
            Crestwell Travel Services today introduced an exclusive communication offering for client travel accounts: <strong style={{ color: 'var(--navy)' }}>TxtCha</strong>, a cross-channel platform that unifies multiple messaging services into a single shared conversation.
          </p>

          <p style={{ marginBottom: 22 }}>
            The offering lets clients keep family members, group leaders, and fellow travelers connected before, during, and after a trip — no matter which app each person prefers. TxtCha brings SMS, email, Telegram, and in-app chat together in one thread, so every traveler can take part from the channel they already use.
          </p>

          {/* Pull quote */}
          <blockquote style={{
            margin: '40px 0',
            padding: '28px 36px',
            background: 'var(--cream)',
            borderLeft: '4px solid var(--gold)',
            position: 'relative',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--navy)',
              lineHeight: 1.55,
              marginBottom: 16,
            }}>
              "Travel should bring people together, not make communication harder. TxtCha gives travelers a simpler way to stay informed and coordinate plans — without forcing everyone onto the same app."
            </div>
            <cite style={{
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontStyle: 'normal',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
            }}>
              — T. Crestwell, Owner &amp; Founder, Crestwell Travel Services
            </cite>
          </blockquote>

          <p style={{ marginBottom: 22 }}>
            The offering is especially useful for family vacations, destination weddings, group cruises, retreats, multi-city itineraries, and hosted travel experiences, where participants often arrive with different devices and communication habits. Rather than chasing scattered texts, emails, and app notifications, the whole group stays in one connected conversation.
          </p>

          <p style={{ marginBottom: 22 }}>
            The addition reflects Crestwell Travel Services' ongoing effort to extend client support beyond booking and itinerary planning toward smoother, more inclusive travel coordination.
          </p>

          {/* Second quote */}
          <blockquote style={{
            margin: '40px 0',
            padding: '24px 32px',
            background: 'linear-gradient(135deg, rgba(13,27,42,0.03), rgba(201,168,76,0.05))',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 2,
          }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--navy)',
              lineHeight: 1.6,
              marginBottom: 14,
            }}>
              "Whether someone prefers text, email, Telegram, or an app-based chat, the group still communicates together. For families and groups where not everyone uses the same platform, that flexibility makes a real difference."
            </div>
            <cite style={{
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--slate)',
              fontStyle: 'normal',
              fontFamily: 'var(--font-body)',
            }}>
              — T. Crestwell
            </cite>
          </blockquote>

          <p style={{ marginBottom: 40 }}>
            Clients with Crestwell Travel Services accounts can ask about adding TxtCha access to an upcoming trip by contacting the company directly.
          </p>

          {/* Divider */}
          <div style={{ height: 1, background: 'linear-gradient(90deg, var(--gold), transparent)', marginBottom: 40 }} />

          {/* About sections */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48 }}>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontWeight: 600,
                marginBottom: 12,
              }}>
                About Crestwell Travel Services
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
                Crestwell Travel Services provides travel planning, booking, and client support for individuals, families, groups, and organizations, with a focus on personalized service, modern tools, and traveler-first support.{' '}
                <a href="https://crestwellgetaways.com" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500 }}>
                  crestwellgetaways.com
                </a>
              </p>
            </div>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                fontWeight: 600,
                marginBottom: 12,
              }}>
                About TxtCha
              </h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}>
                TxtCha is a cross-channel group communication platform that unifies SMS, email, Telegram, and in-app chat into a single conversation thread, helping groups stay connected across their preferred channels.{' '}
                <a href="https://txtcha.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 500 }}>
                  txtcha.com
                </a>
              </p>
            </div>
          </div>

          {/* Media contact */}
          <div style={{
            background: 'var(--navy)',
            padding: '28px 32px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), var(--gold-light), var(--gold))' }} />
            <h3 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              fontWeight: 600,
              marginBottom: 16,
            }}>
              Media Contact
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                ['Company',  'Crestwell Travel Services'],
                ['Contact',  'T. Crestwell, Owner &amp; Founder'],
                ['Email',    '<a href="mailto:info@crestwellgetaways.com" style="color:var(--gold);text-decoration:none;">info@crestwellgetaways.com</a>'],
                ['Phone',    '<a href="tel:8885086893" style="color:var(--gold);text-decoration:none;">888-508-6893</a>'],
                ['Website',  '<a href="https://crestwellgetaways.com" style="color:var(--gold);text-decoration:none;">crestwellgetaways.com</a>'],
              ].map(([label, value]) => (
                <div key={label}>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 4, fontFamily: 'var(--font-body)' }}>
                    {label}
                  </div>
                  <div
                    style={{ fontSize: '0.875rem', color: 'white', fontFamily: 'var(--font-body)' }}
                    dangerouslySetInnerHTML={{ __html: value }}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
              <span style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '1em' }}># # #</span>
            </div>
          </div>

          {/* Back to news link */}
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Link href="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--navy)', textDecoration: 'none', fontFamily: 'var(--font-body)',
              fontWeight: 600, borderBottom: '1px solid rgba(13,27,42,0.2)', paddingBottom: 2,
            }}>
              ← Back to Home
            </Link>
          </div>

        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
