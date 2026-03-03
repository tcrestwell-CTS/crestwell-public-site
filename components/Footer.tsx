import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(160deg, #0c4a6e 0%, #075985 100%)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '32px' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '28px' }}>🌊</span>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'white', fontFamily: 'Playfair Display, serif' }}>Crestwell Travel Services</div>
          </div>
          <p style={{ color: '#93c5fd', fontSize: '14px', lineHeight: 1.7, maxWidth: '300px' }}>
            Expert cruise and all-inclusive vacation planning for families and groups. Let us handle every detail of your dream getaway.
          </p>
        </div>

        <div>
          <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '16px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { href: '/trips', label: 'All Trips' },
              { href: '/trips?type=group', label: 'Group Travel' },
              { href: '/trips?type=cruise', label: 'Cruises' },
              { href: '/contact', label: 'Contact Us' },
            ].map(({ href, label }) => (
              <Link key={label} href={href} style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '14px' }}>{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ color: 'white', fontWeight: 600, marginBottom: '16px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="mailto:info@crestwellgetaways.com" style={{ color: '#93c5fd', textDecoration: 'none', fontSize: '14px' }}>info@crestwellgetaways.com</a>
            <span style={{ color: '#93c5fd', fontSize: '14px' }}>Chattanooga, TN</span>
            <Link href="/contact" style={{ display: 'inline-block', marginTop: '8px', padding: '8px 20px', borderRadius: '9999px', fontWeight: 700, background: '#fde047', color: '#0c4a6e', textDecoration: 'none', fontSize: '13px' }}>
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ color: '#64748b', fontSize: '13px' }}>© {new Date().getFullYear()} Crestwell Travel Services. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>Privacy</Link>
          <Link href="/terms" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px' }}>Terms</Link>
        </div>
      </div>
    </footer>
  )
}
