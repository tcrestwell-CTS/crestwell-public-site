'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DESTINATIONS = [
  { label: 'All Destinations', href: '/destinations', icon: '' },
  { label: 'Destination Packages', href: '/destination-packages', icon: '' },
  { label: 'Bahamas', href: '/destinations/bahamas', icon: '' },
  { label: 'Caribbean', href: '/destinations/caribbean', icon: '' },
  { label: 'Mexico', href: '/destinations/mexico', icon: '' },
  { label: 'Mediterranean', href: '/destinations/mediterranean', icon: '' },
  { label: 'Alaska', href: '/destinations/alaska', icon: '' },
  { label: 'Europe', href: '/destinations/europe', icon: '' },
];

const CRUISES = [
  { label: 'All Cruises', href: '/cruises' },
  { label: 'Cruise Lines', href: '/cruise-lines' },
  { label: 'Luxury Collection', href: '/luxury-cruises' },
];

// Services grouped under dropdown — reduces top-level nav from 11 to 6 items
const SERVICES = [
  { label: 'All-Inclusive Resorts',  href: '/all-inclusive',      icon: '🌴' },
  { label: 'Group Travel',           href: '/group-travel',        icon: '👥' },
  { label: 'Vacations by Rail',      href: '/vacations-by-rail',   icon: '🚂' },
  { label: 'Domestic Travel',        href: '/domestic-travel',     icon: '🗺️' },
  { label: 'Excursions',             href: '/excursions',          icon: '🤿' },
  { label: 'Solo Travel',            href: '/solo-travel',         icon: '🧳' },
  { label: 'Financing',              href: '/financing',           icon: '💳' },
  { label: 'The Circle',             href: '/the-circle',          icon: '✦' },
];

// Top-level nav — 6 items (was 11)
const navItems = [
  { label: 'Featured Trips', href: '/trips' },
  { label: 'Travel Tips',    href: '/blog' },
  { label: 'About Us',       href: '/about' },
  { label: 'FAQ',            href: '/faq' },
  { label: 'Contact',        href: '/contact' },
];

// ─── Shared dropdown styles ───────────────────────────────────────────────────

const dropdownBox: React.CSSProperties = {
  position: 'absolute', top: 'calc(100% + 14px)',
  left: '50%', transform: 'translateX(-50%)',
  background: 'rgba(10, 20, 34, 0.99)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(201, 168, 76, 0.25)',
  minWidth: 210, zIndex: 200,
  boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
  animation: 'dropdownFade 0.15s ease',
};

const dropdownArrow: React.CSSProperties = {
  position: 'absolute', top: -6, left: '50%',
  transform: 'translateX(-50%) rotate(45deg)',
  width: 10, height: 10,
  background: 'rgba(10, 20, 34, 0.99)',
  border: '1px solid rgba(201, 168, 76, 0.25)',
  borderRight: 'none', borderBottom: 'none',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [cruiseOpen, setCruiseOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const [mobileCruiseOpen, setMobileCruiseOpen] = useState(false);
  const destRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const cruiseRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) setDestOpen(false);
      if (cruiseRef.current && !cruiseRef.current.contains(e.target as Node)) setCruiseOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setDestOpen(false);
    setCruiseOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const isDestActive = pathname?.startsWith('/destinations') || pathname?.startsWith('/trips');
  const isCruiseActive = pathname?.startsWith('/cruises') || pathname?.startsWith('/cruise-lines') || pathname?.startsWith('/luxury-cruises');

  const dropdownTrigger = (label: string, isActive: boolean, isOpen: boolean, onClick: () => void, onHover: () => void) => (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      style={{
        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        display: 'flex', alignItems: 'center', gap: 4,
        fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
        fontFamily: 'var(--font-body)', fontWeight: 400,
        color: isActive ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
        transition: 'color 0.2s',
      }}
    >
      {label}
      <svg width="10" height="7" viewBox="0 0 10 7" fill="none"
        style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none', opacity: 0.7 }}>
        <path d="M1 1.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(13, 27, 42, 0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201, 168, 76, 0.15)' : 'none',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, color: 'white', letterSpacing: '0.02em' }}>Crestwell</span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 400, marginTop: 2 }}>Travel Services</span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }} className="desktop-nav">

            {/* ── Cruises dropdown ── */}
            <div ref={cruiseRef} style={{ position: 'relative' }}>
              {dropdownTrigger('Cruises', isCruiseActive, cruiseOpen, () => setCruiseOpen(o => !o), () => setCruiseOpen(true))}

              {cruiseOpen && (
                <div onMouseLeave={() => setCruiseOpen(false)} style={dropdownBox}>
                  <div style={dropdownArrow} />
                  <div style={{ padding: '10px 0 8px', borderBottom: '1px solid rgba(201,168,76,0.12)', marginBottom: 4 }}>
                    <span style={{ padding: '0 20px', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
                      Cruise Vacations
                    </span>
                  </div>
                  {CRUISES.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setCruiseOpen(false)}
                      style={{
                        display: 'block', padding: '11px 20px', textDecoration: 'none',
                        borderLeft: pathname === item.href ? '2px solid var(--gold)' : '2px solid transparent',
                        background: pathname === item.href ? 'rgba(201,168,76,0.08)' : 'transparent',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={e => { if (pathname !== item.href) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = pathname === item.href ? 'rgba(201,168,76,0.08)' : 'transparent'; }}
                    >
                      <span style={{
                        fontSize: '0.84rem', letterSpacing: '0.03em',
                        color: pathname === item.href ? 'var(--gold)' : 'rgba(255,255,255,0.85)',
                        fontFamily: 'var(--font-body)',
                      }}>
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ── Featured Trips ── */}
            <Link href="/trips" className="nav-link" style={{ color: pathname === '/trips' ? 'var(--gold)' : undefined }}>Featured Trips</Link>

            {/* ── Destinations dropdown ── */}
            <div ref={destRef} style={{ position: 'relative' }}>
              {dropdownTrigger('Destinations', isDestActive, destOpen, () => setDestOpen(o => !o), () => setDestOpen(true))}

              {destOpen && (
                <div onMouseLeave={() => setDestOpen(false)} style={{ ...dropdownBox, minWidth: 230 }}>
                  <div style={dropdownArrow} />
                  <div style={{ padding: '10px 20px 8px', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
                    <span style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
                      Explore by Destination
                    </span>
                  </div>
                  <div style={{ padding: '6px 0 8px' }}>
                    {DESTINATIONS.map((dest, i) => (
                      <Link
                        key={dest.href}
                        href={dest.href}
                        onClick={() => setDestOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '10px 20px', textDecoration: 'none',
                          borderLeft: pathname === dest.href ? '2px solid var(--gold)' : '2px solid transparent',
                          background: pathname === dest.href ? 'rgba(201,168,76,0.08)' : 'transparent',
                          transition: 'background 0.15s, border-color 0.15s',
                          marginBottom: i === 0 ? 4 : 0,
                        }}
                        onMouseEnter={e => { if (pathname !== dest.href) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = pathname === dest.href ? 'rgba(201,168,76,0.08)' : 'transparent'; }}
                      >
                        <span style={{ fontSize: '1rem', lineHeight: 1, flexShrink: 0 }}>{dest.icon}</span>
                        <span style={{
                          fontSize: i === 0 ? '0.7rem' : '0.84rem',
                          letterSpacing: i === 0 ? '0.1em' : '0.03em',
                          textTransform: i === 0 ? 'uppercase' : 'none',
                          color: pathname === dest.href ? 'var(--gold)' : i === 0 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.85)',
                          fontFamily: 'var(--font-body)',
                          fontWeight: i === 0 ? 500 : 400,
                        }}>
                          {dest.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Services dropdown ── */}
            <div ref={servicesRef} style={{ position: 'relative' }}>
              {dropdownTrigger('Services', ['/all-inclusive','/group-travel','/vacations-by-rail','/domestic-travel','/excursions','/solo-travel','/financing'].some(h => pathname.startsWith(h)), servicesOpen, () => setServicesOpen(o => !o), () => setServicesOpen(true))}
              {servicesOpen && (
                <div onMouseLeave={() => setServicesOpen(false)} style={{ ...dropdownBox, minWidth: 240 }}>
                  <div style={dropdownArrow} />
                  <div style={{ padding: '10px 20px 8px', borderBottom: '1px solid rgba(201,168,76,0.12)' }}>
                    <span style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
                      Travel Services
                    </span>
                  </div>
                  <div style={{ padding: '6px 0 8px' }}>
                    {SERVICES.map((svc) => (
                      <Link
                        key={svc.href}
                        href={svc.href}
                        onClick={() => setServicesOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '10px 20px', textDecoration: 'none',
                          borderLeft: pathname === svc.href ? '2px solid var(--gold)' : '2px solid transparent',
                          background: pathname === svc.href ? 'rgba(201,168,76,0.08)' : 'transparent',
                          transition: 'background 0.15s, border-color 0.15s',
                        }}
                        onMouseEnter={e => { if (pathname !== svc.href) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = pathname === svc.href ? 'rgba(201,168,76,0.08)' : 'transparent'; }}
                      >
                        <span style={{ fontSize: '1rem', flexShrink: 0 }}>{svc.icon}</span>
                        <span style={{ fontSize: '0.84rem', letterSpacing: '0.03em', color: pathname === svc.href ? 'var(--gold)' : 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-body)' }}>
                          {svc.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Remaining nav items */}
            {navItems.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>
            ))}

          </div>

          {/* Phone + CTA — desktop only */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="desktop-nav">
            <a
              href="tel:8885086893"
              style={{
                fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em',
                color: 'var(--gold)', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'var(--font-body)',
              }}
            >
              📞 888.508.6893
            </a>
            <Link
              href="/request-quote"
              className="btn-primary"
              style={{ fontSize: '0.72rem', padding: '8px 18px', textDecoration: 'none', letterSpacing: '0.08em' }}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            <div style={{ width: 24, height: 2, background: 'white', marginBottom: 5, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <div style={{ width: 24, height: 2, background: 'white', marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
            <div style={{ width: 24, height: 2, background: 'white', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            position: 'fixed', top: 72, left: 0, right: 0, bottom: 0,
            background: 'rgba(13, 27, 42, 0.98)', backdropFilter: 'blur(12px)',
            zIndex: 99, overflowY: 'auto',
            borderTop: '1px solid rgba(201, 168, 76, 0.2)',
          }}>
            <div style={{ padding: '24px 32px 40px' }}>

              <Link href="/" className="nav-link"
                style={{ display: 'block', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '1rem', letterSpacing: '0.05em' }}
                onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              {/* Cruises accordion */}
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => setMobileCruiseOpen(!mobileCruiseOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '16px 0', background: 'none', border: 'none',
                    cursor: 'pointer', fontSize: '1rem', letterSpacing: '0.05em',
                    fontFamily: 'var(--font-body)',
                    color: isCruiseActive ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
                  }}
                >
                  Cruises
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ transition: 'transform 0.25s', transform: mobileCruiseOpen ? 'rotate(180deg)' : 'none', opacity: 0.6 }}>
                    <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {mobileCruiseOpen && (
                  <div style={{ paddingBottom: 12, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    {CRUISES.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        style={{
                          display: 'block', padding: '13px 16px', textDecoration: 'none',
                          borderLeft: pathname === item.href ? '2px solid var(--gold)' : '2px solid transparent',
                          color: pathname === item.href ? 'var(--gold)' : 'rgba(255,255,255,0.7)',
                          fontSize: '0.92rem', fontFamily: 'var(--font-body)',
                        }}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Destinations accordion */}
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => setMobileDestOpen(!mobileDestOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '16px 0', background: 'none', border: 'none',
                    cursor: 'pointer', fontSize: '1rem', letterSpacing: '0.05em',
                    fontFamily: 'var(--font-body)',
                    color: isDestActive ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
                  }}
                >
                  Destinations
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" style={{ transition: 'transform 0.25s', transform: mobileDestOpen ? 'rotate(180deg)' : 'none', opacity: 0.6 }}>
                    <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {mobileDestOpen && (
                  <div style={{ paddingBottom: 12, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    {DESTINATIONS.map((dest) => (
                      <Link
                        key={dest.href}
                        href={dest.href}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '13px 16px', textDecoration: 'none',
                          borderLeft: pathname === dest.href ? '2px solid var(--gold)' : '2px solid transparent',
                        }}
                        onClick={() => setMenuOpen(false)}
                      >
                        <span style={{ fontSize: '1rem' }}>{dest.icon}</span>
                        <span style={{
                          fontSize: '0.92rem',
                          color: pathname === dest.href ? 'var(--gold)' : 'rgba(255,255,255,0.7)',
                          fontFamily: 'var(--font-body)',
                        }}>
                          {dest.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Remaining items */}
              {navItems.slice(1).map((item) => (
                <Link key={item.href} href={item.href} className="nav-link"
                  style={{ display: 'block', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '1rem', letterSpacing: '0.05em' }}
                  onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}

              <div style={{ marginTop: 28 }}>
                <Link href="/request-quote" className="btn-primary"
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                  onClick={() => setMenuOpen(false)}>
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @keyframes dropdownFade {
          from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </nav>
  );
}
