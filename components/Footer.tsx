'use client';
import Link from 'next/link';
import Image from 'next/image';

const GYG_LINK = 'https://www.getyourguide.com?partner_id=IOXL78H&cmp=share_to_earn';

const ACCREDITATIONS = [
  {
    src: '/images/ASTAHorizontalCMYK0247817c-a713-4d83-9e60-913564067b77.png',
    alt: 'ASTA — American Society of Travel Advisors',
    width: 140,
    height: 60,
  },
  {
    src: '/images/CLIA-Cruise-Lines-International-Association-Logo.jpg',
    alt: 'CLIA — Cruise Lines International Association',
    width: 80,
    height: 60,
  },
  {
    src: '/images/TRUE-Image.jpg',
    alt: 'TRUE Certification',
    width: 100,
    height: 60,
  },
  {
    src: '/images/Carnival-Expert-Diamond-Level-Graduate_logo.jpg',
    alt: 'Carnival Expert — Diamond Level Graduate',
    width: 160,
    height: 60,
  },
  {
    src: '/images/c7e7a302-e75d-491e-9dd2-b7990834a0a0.jpg',
    alt: "Norwegian Cruise Line — Master's Degree",
    width: 70,
    height: 60,
  },
];

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
                { label: 'Featured Trips', href: '/trips' },
                { label: 'Vacations by Rail', href: '/vacations-by-rail' },
                { label: 'Destinations', href: '/destinations' },
                { label: 'Request a Quote', href: '/request-quote' },
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.02em' }}
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


          {/* Cities */}
          <div>
            <div className="overline" style={{ marginBottom: 20 }}>Serving</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Atlanta, GA', href: '/travel-agent-atlanta' },
                { label: 'Nashville, TN', href: '/travel-agent-nashville' },
                { label: 'Birmingham, AL', href: '/travel-agent-birmingham' },
                { label: 'Chattanooga, TN', href: '/travel-agent-chattanooga' },
                { label: 'Huntsville, AL', href: '/travel-agent-huntsville' },
                { label: 'Knoxville, TN', href: '/travel-agent-knoxville' },
                { label: 'Memphis, TN', href: '/travel-agent-memphis' },
                { label: 'Savannah, GA', href: '/travel-agent-savannah' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.02em' }}
                  >
                    {item.label}
                  </Link>
                </li>
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
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem' }}>Georgia · Tennessee · Alabama · Florida</div>
              </div>
              <Link href="/request-quote" className="btn-primary" style={{ display: 'inline-block', marginTop: 8, textDecoration: 'none', textAlign: 'center' }}>
                Get a Quote
              </Link>
            </div>
          </div>
        </div>

        {/* Accreditations */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 32, marginBottom: 32 }}>
          <div className="overline" style={{ marginBottom: 24, textAlign: 'center' }}>Accreditations & Certifications</div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 32,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {ACCREDITATIONS.map(({ src, alt, width, height }) => (
              <div
                key={src}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.92)',
                  borderRadius: 4,
                  minWidth: 80,
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  style={{ objectFit: 'contain', height: 48, width: 'auto' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* NAP Trust Block — local SEO signals */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '28px 32px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8, fontFamily: 'var(--font-body)' }}>Contact</div>
            <address style={{ fontStyle: 'normal', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
              <div>Chattanooga, TN</div>
              <a href="tel:+18885086893" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>888.508.6893</a><br />
              <a href="mailto:info@crestwellgetaways.com" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>info@crestwellgetaways.com</a>
            </address>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8, fontFamily: 'var(--font-body)' }}>Service Areas</div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>
              Georgia · Tennessee · Alabama · Florida<br />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>Serving clients nationwide</span>
            </p>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8, fontFamily: 'var(--font-body)' }}>Accreditations</div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>
              ASTA Member · CLIA Certified<br />
              Carnival Diamond · NCL Master&apos;s Degree
            </p>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8, fontFamily: 'var(--font-body)' }}>Legal</div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7, margin: 0 }}>
              Seller of Travel laws may apply for bookings to CA, FL, HI & WA. Prices subject to availability.
            </p>
          </div>
        </div>
      </div>

      {/* GetYourGuide Partner Banner */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
            Tours &amp; Experiences powered by
          </span>
          <a
            href={GYG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '8px 18px', borderRadius: 6 }}
          >
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#FF5533"/>
              <path d="M16 8C11.6 8 8 11.6 8 16s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" fill="white"/>
              <circle cx="16" cy="16" r="2.5" fill="white"/>
            </svg>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white', fontFamily: 'var(--font-body)', letterSpacing: '0.04em' }}>
              GetYourGuide
            </span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
            © {new Date().getFullYear()} Crestwell Travel Services. All rights reserved.
            {' · '}Fla. Seller of Travel Ref. No. ST46414
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { label: 'Terms & Conditions', href: '/terms' },
              { label: 'Privacy Policy', href: '/privacy' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

