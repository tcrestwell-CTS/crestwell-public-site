'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'white' }}>
      {/* Top accent line */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 500, color: 'white', letterSpacing: '0.02em', lineHeight: 1 }}>
                Crestwell
              </div>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginTop: 4 }}>
                Travel Services
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 260 }}>
              See the World One Port at a Time. Personalized travel experiences for families, couples, and groups across the Southeast.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="overline" style={{ marginBottom: 20 }}>Navigate</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Home', href: '/' },
                { label: 'Destinations', href: '/destinations' },
                { label: 'Request a Quote', href: '/request-quote' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.02em' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <div className="overline" style={{ marginBottom: 20 }}>Specialties</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Cruises', 'All-Inclusive Resorts', 'Family Vacations', 'Group Trips', 'Luxury Travel', 'Disney Vacations'].map(s => (
                <li key={s} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="overline" style={{ marginBottom: 20 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate-light)', marginBottom: 4 }}>Phone</div>
                <a href="tel:8885086893" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', textDecoration: 'none' }}>
                  888.508.6893
                </a>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate-light)', marginBottom: 4 }}>Email</div>
                <a href="mailto:info@crestwellgetaways.com" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', textDecoration: 'none' }}>
                  info@crestwellgetaways.com
                </a>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--slate-light)', marginBottom: 4 }}>Service Area</div>
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' }}>Georgia · Tennessee · Alabama</div>
              </div>
              <Link href="/request-quote" className="btn-primary" style={{ display: 'inline-block', marginTop: 8, textDecoration: 'none', textAlign: 'center' }}>
                Get a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Accreditations */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 32, marginBottom: 32 }}>
          <div className="overline" style={{ marginBottom: 16, textAlign: 'center' }}>Accreditations & Certifications</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', alignItems: 'center' }}>
            {['ASTA', 'CLIA', 'TRUE', 'ABTP', 'Carnival Diamond Expert', 'Norwegian Masters'].map(badge => (
              <div key={badge} style={{
                padding: '8px 20px',
                border: '1px solid rgba(201, 168, 76, 0.25)',
                borderRadius: 2,
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                fontFamily: 'var(--font-body)',
              }}>
                {badge}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
            © {new Date().getFullYear()} Crestwell Travel Services. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Terms & Conditions', 'Privacy Policy'].map(item => (
              <Link key={item} href="#" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
