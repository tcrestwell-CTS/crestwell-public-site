'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DESTINATIONS = [
  { label: 'All Destinations', href: '/destinations', icon: '🗺️' },
  { label: 'Featured Trips', href: '/trips', icon: '⭐' },
  { label: 'Bahamas', href: '/destinations/bahamas', icon: '🏝️' },
  { label: 'Caribbean', href: '/destinations/caribbean', icon: '🌊' },
  { label: 'Mexico', href: '/destinations/mexico', icon: '🌵' },
  { label: 'Mediterranean', href: '/destinations/mediterranean', icon: '🏛️' },
  { label: 'Alaska', href: '/destinations/alaska', icon: '🏔️' },
  { label: 'Europe', href: '/destinations/europe', icon: '🏰' },
];

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Cruises', href: '/cruises' },
  { label: 'Cruise Lines', href: '/cruise-lines' },
    { label: 'Luxury Collection', href: '/luxury-cruises' },
  { label: 'All-Inclusive', href: '/all-inclusive' },
  { label: 'Travel Tips', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);
  const destRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setDestOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    setDestOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const isDestActive = pathname?.startsWith('/destinations') || pathname?.startsWith('/trips');

  return (
    <nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(13, 27, 42, 0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201, 168, 76, 0.15)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, color: 'white', letterSpacing: '0.02em' }}>Crestwell</span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 400, marginTop: 2 }}>Travel Services</span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="desktop-nav">

            {/* Items before Destinations */}
            {navItems.slice(0, 3).map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>
            ))}

            {/* Destinations dropdown */}
            <div ref={destRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setDestOpen(!destOpen)}
                onMouseEnter={() => setDestOpen(true)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)', fontWeight: 400,
                  color: isDestActive ? 'var(--gold)' : 'rgba(255,255,255,0.75)',
                  transition: 'color 0.2s',
                }}
              >
                Destinations
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none" style={{ transition: 'transform 0.2s', transform: destOpen ? 'rotate(180deg)' : 'none', opacity: 0.7 }}>
                  <path d="M1 1.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {destOpen && (
                <div
                  onMouseLeave={() => setDestOpen(false)}
                  style={{
                    position: 'absolute', top: 'calc(100% + 14px)',
                    left: '50%', transform: 'translateX(-50%)',
                    background: 'rgba(10, 20, 34, 0.99)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(201, 168, 76, 0.25)',
                    minWidth: 230, zIndex: 200,
                    boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
                    animation: 'dropdownFade 0.15s ease',
                  }}
                >
                  {/* Pointer arrow */}
                  <div style={{
                    position: 'absolute', top: -6, left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                    width: 10, height: 10,
                    background: 'rgba(10, 20, 34, 0.99)',
                    border: '1px solid rgba(201, 168, 76, 0.25)',
                    borderRight: 'none', borderBottom: 'none',
                  }} />

                  {/* Header */}
                  <div style={{ padding: '12px 20px 8px', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
                      Explore by Destination
                    </span>
                  </div>

                  {/* Destination links */}
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
                        <div>
                          <span style={{
                            fontSize: i === 0 ? '0.7rem' : '0.82rem',
                            letterSpacing: i === 0 ? '0.1em' : '0.03em',
                            textTransform: i === 0 ? 'uppercase' : 'none',
                            color: pathname === dest.href ? 'var(--gold)' : i === 0 ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.85)',
                            fontFamily: 'var(--font-body)',
                            fontWeight: i === 0 ? 500 : 400,
                          }}>
                            {dest.label}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Items after Destinations */}
            {navItems.slice(3).map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>
            ))}

            <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>Get a Quote</Link>
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

              {navItems.slice(0, 3).map((item) => (
                <Link key={item.href} href={item.href} className="nav-link"
                  style={{ display: 'block', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '1rem', letterSpacing: '0.05em' }}
                  onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}

              {/* Destinations accordion for mobile */}
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

              {navItems.slice(3).map((item) => (
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
