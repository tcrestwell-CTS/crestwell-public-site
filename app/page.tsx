'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'Request Quote', href: '/request-quote' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
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
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, color: 'white', letterSpacing: '0.02em' }}>
              Crestwell
            </span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 400, marginTop: 2 }}>
              Travel Services
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }} className="desktop-nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
            <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>
              Get a Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ padding: '16px 0 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }} className="mobile-menu">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                style={{ display: 'block', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/request-quote" className="btn-primary" style={{ display: 'inline-block', marginTop: 16, textDecoration: 'none' }}>
              Get a Quote
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
import type { Metadata } from 'next';
import Link from 'next/link';
import CruiseSearch from '@/components/CruiseSearch';

export const metadata: Metadata = {
  title: 'Crestwell Travel Services — See the World One Port at a Time',
};

const partners = [
  { name: 'Royal Caribbean', tagline: 'Adventure of the Seas' },
  { name: 'Carnival', tagline: 'Choose Fun' },
  { name: 'Norwegian', tagline: 'Feel Free' },
  { name: 'MSC Cruises', tagline: 'For All the Senses' },
  { name: 'Virgin Voyages', tagline: 'Brilliant at Sea' },
  { name: 'Explora Journeys', tagline: 'Ocean State of Mind' },
];

const destinations = [
  {
    name: 'The Bahamas',
    region: 'Caribbean',
    description: 'Crystal-clear waters, powder-white beaches, and vibrant island culture just a short sail away.',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
  },
  {
    name: 'Western Caribbean',
    region: 'Caribbean',
    description: 'Ancient Mayan ruins, jungle adventures, and turquoise seas across Cozumel, Belize, and beyond.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  },
  {
    name: 'Mediterranean',
    region: 'Europe',
    description: 'Iconic ports from Barcelona to Santorini — explore history, cuisine, and breathtaking coastlines.',
    image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80',
  },
  {
    name: 'Alaska',
    region: 'North America',
    description: 'Glaciers, wildlife, and dramatic wilderness scenery unlike anywhere else on earth.',
    image: 'https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800&q=80',
  },
];

const services = [
  {
    icon: '⚓',
    title: 'Cruise Vacations',
    description: 'From 3-night getaways to world voyages — we match you with the perfect ship, itinerary, and cabin.',
  },
  {
    icon: '🌴',
    title: 'All-Inclusive Resorts',
    description: 'Sandals, Secrets, Beaches, and more. Unlimited dining, drinks, and experiences included.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Vacations',
    description: 'Disney, Universal, Aulani — kid-friendly adventures with seamless logistics handled for you.',
  },
  {
    icon: '🥂',
    title: 'Group Travel',
    description: 'Corporate retreats, reunions, and milestone celebrations — we coordinate groups of any size.',
  },
];

const testimonials = [
  {
    quote: 'Crestwell made our anniversary cruise completely effortless. Every detail was handled perfectly.',
    name: 'Sarah & Marcus T.',
    location: 'Atlanta, GA',
  },
  {
    quote: 'Our family trip to the Bahamas was the best vacation we\'ve ever taken. They knew exactly what we needed.',
    name: 'The Johnson Family',
    location: 'Chattanooga, TN',
  },
  {
    quote: 'I\'ve booked three cruises through Crestwell now. I won\'t use anyone else — the service is unmatched.',
    name: 'Diane P.',
    location: 'Birmingham, AL',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'var(--navy)',
        }}
      >
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1800&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.35,
        }} />
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.6) 60%, rgba(13,27,42,0.95) 100%)',
        }} />

        {/* Hero content */}
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px', maxWidth: 860, zIndex: 1 }}>
          <div className="overline animate-fade-up" style={{ marginBottom: 24 }}>
            Georgia · Tennessee · Alabama
          </div>
          <h1
            className="font-display animate-fade-up delay-100"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, color: 'white', lineHeight: 1.08, letterSpacing: '-0.01em', marginBottom: 28 }}
          >
            See the World<br />
            <em style={{ color: 'var(--gold-light)' }}>One Port at a Time</em>
          </h1>
          <p className="animate-fade-up delay-200" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: 48, maxWidth: 560, margin: '0 auto 48px' }}>
            Personalized travel experiences for families, couples, and groups. Cruises, all-inclusive resorts, and beyond — all expertly curated for you.
          </p>
          <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>
              Request a Free Quote
            </Link>
            <Link href="/destinations" className="btn-outline" style={{ textDecoration: 'none' }}>
              Explore Destinations
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.5 }}>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(180deg, transparent, var(--gold))' }} />
        </div>
      </section>

      {/* ── PARTNER LOGOS STRIP ── */}
      <section style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '32px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <span className="overline" style={{ color: 'rgba(255,255,255,0.3)' }}>Preferred Partners</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, justifyContent: 'center' }}>
            {partners.map((p, i) => (
              <div key={i} style={{
                padding: '12px 32px',
                borderRight: i < partners.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 400, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em' }}>{p.name}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{p.tagline}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRUISE SEARCH ── */}
      <CruiseSearch />

      {/* ── SERVICES ── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="overline" style={{ marginBottom: 16 }}>What We Do</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2 }}>
              Every Journey, Expertly Crafted
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
            {services.map((s, i) => (
              <div key={i} className="card-hover" style={{
                background: 'white',
                padding: '48px 36px',
                borderBottom: '3px solid transparent',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'var(--gold)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = 'transparent'; }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 20 }}>{s.icon}</div>
                <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DESTINATIONS ── */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="overline" style={{ marginBottom: 12 }}>Popular Itineraries</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2 }}>
                Where Will You Go?
              </h2>
            </div>
            <Link href="/destinations" className="btn-navy" style={{ textDecoration: 'none' }}>
              View All Destinations
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {destinations.map((d, i) => (
              <div key={i} className="card-hover" style={{ overflow: 'hidden', background: 'var(--navy)', cursor: 'pointer' }}>
                <div style={{
                  height: 220,
                  backgroundImage: `url(${d.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}>
                  <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(13,27,42,0.8)', padding: '4px 12px', backdropFilter: 'blur(4px)' }}>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>{d.region}</span>
                  </div>
                </div>
                <div style={{ padding: '28px 28px 32px' }}>
                  <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 400, color: 'white', marginBottom: 10 }}>{d.name}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{d.description}</p>
                  <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Explore →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{
        background: 'var(--navy)',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 32px',
        textAlign: 'center',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          <div className="gold-divider overline" style={{ marginBottom: 28, justifyContent: 'center' }}>
            Current Deals
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: 20 }}>
            Explore 1,670+<br />
            <em style={{ color: 'var(--gold-light)' }}>Cruise Vacations</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 40 }}>
            From weekend getaways to extended voyages — our team finds the right cruise at the best price, every time. Let us do the searching for you.
          </p>
          <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>
            Start Planning Today
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Traveler Stories</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)' }}>
              What Our Clients Say
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'white', padding: '40px 36px', borderTop: '3px solid var(--gold)' }}>
                <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: 16, fontFamily: 'Georgia', lineHeight: 1 }}>"</div>
                <p className="font-display" style={{ fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--navy)', lineHeight: 1.7, marginBottom: 24 }}>
                  {t.quote}
                </p>
                <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                  <div style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--navy)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate)', marginTop: 2 }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ background: 'var(--navy-mid)', padding: '64px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Stay in the Loop</div>
          <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 300, color: 'white', marginBottom: 12 }}>
            Deals & Inspiration, Delivered
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: 32 }}>
            Get exclusive cruise deals, travel tips, and destination guides straight to your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

function NewsletterForm() {
  return (
    <form action="/api/newsletter" method="POST" style={{ display: 'flex', gap: 0, maxWidth: 440, margin: '0 auto' }}>
      <input
        type="email"
        name="email"
        placeholder="Your email address"
        required
        style={{
          flex: 1,
          padding: '14px 20px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRight: 'none',
          color: 'white',
          fontSize: '0.875rem',
          fontFamily: 'var(--font-body)',
          outline: 'none',
        }}
      />
      <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
        Subscribe
      </button>
    </form>
  );
}
