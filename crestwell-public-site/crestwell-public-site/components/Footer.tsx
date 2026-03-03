import Link from 'next/link'

export function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(160deg, #0c4a6e 0%, #075985 100%)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌊</span>
            <div>
              <div
                className="text-xl font-bold text-white"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Crestwell Travel Services
              </div>
            </div>
          </div>
          <p className="text-blue-200 text-sm leading-relaxed max-w-xs">
            Expert cruise and all-inclusive vacation planning for families and groups. Let us handle every detail of your dream getaway.
          </p>
          <div className="flex gap-3 mt-4">
            {['Facebook', 'Instagram', 'TikTok'].map(s => (
              <a
                key={s}
                href="#"
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:bg-blue-600"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Explore</h4>
          <ul className="space-y-2">
            {[
              { href: '/trips', label: 'All Trips' },
              { href: '/trips?type=group', label: 'Group Travel' },
              { href: '/trips?type=cruise', label: 'Cruises' },
              { href: '/trips?type=all-inclusive', label: 'All-Inclusive' },
              { href: '/about', label: 'About Us' },
            ].map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="text-blue-200 hover:text-white text-sm transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">Contact</h4>
          <ul className="space-y-2 text-blue-200 text-sm">
            <li>
              <a href="mailto:info@crestwellgetaways.com" className="hover:text-white transition-colors">
                info@crestwellgetaways.com
              </a>
            </li>
            <li>Chattanooga, TN</li>
            <li className="pt-2">
              <Link
                href="/contact"
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                style={{ background: '#fde047', color: '#0c4a6e' }}
              >
                Book a Consultation
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-blue-300"
        style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        <span>© {new Date().getFullYear()} Crestwell Travel Services. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
