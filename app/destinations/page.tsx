'use client';
import { useState } from 'react';
import Link from 'next/link';

const DESTINATIONS = [
  {
    slug: 'caribbean',
    name: 'Caribbean',
    tagline: 'Crystal waters, white sand beaches, endless sunshine',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    badge: 'Most Popular',
    facts: ['3–14 night sailings', '2–4 hrs from Southeast US', 'Year-round'],
    link: '/destinations/caribbean',
  },
  {
    slug: 'mediterranean',
    name: 'Mediterranean',
    tagline: 'Ancient history, vibrant culture, world-class cuisine',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',
    badge: null,
    facts: ['7–14 night sailings', 'Italy, Greece, Spain', 'May–Oct best season'],
    link: '/destinations/mediterranean',
  },
  {
    slug: 'alaska',
    name: 'Alaska',
    tagline: 'Glaciers, wildlife, and untamed wilderness',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    badge: null,
    facts: ['7–14 night sailings', 'May–Sep season', 'Glaciers & wildlife'],
    link: '/destinations/alaska',
  },
  {
    slug: 'bahamas',
    name: 'The Bahamas',
    tagline: 'Perfect Day awaits just off the Florida coast',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&q=80',
    badge: 'Short Getaway',
    facts: ['3–7 night sailings', '1–2 hrs from FL', 'CocoCay & Nassau'],
    link: '/destinations/bahamas',
  },
  {
    slug: 'europe',
    name: 'Europe',
    tagline: 'River cruises and coastal wonders across the continent',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80',
    badge: null,
    facts: ['7–14 night sailings', 'Rhine, Danube, Douro', 'Apr–Oct season'],
    link: '/destinations/europe',
  },
  {
    slug: 'mexico',
    name: 'Mexico',
    tagline: 'Ancient ruins, Pacific beaches, vibrant culture',
    image: 'https://images.unsplash.com/photo-1513553404607-988bf2703777?w=800&q=80',
    badge: null,
    facts: ['5–14 night sailings', 'Cozumel & Cabo', 'Oct–Apr best weather'],
    link: '/destinations/mexico',
  },
  {
    slug: 'all-inclusive',
    name: 'All-Inclusive Resorts',
    tagline: 'Sandals, Secrets, Beaches, Dreams and more',
    image: 'https://images.unsplash.com/photo-1582610116397-edb72e25d960?w=800&q=80',
    badge: 'Resorts',
    facts: ['Caribbean & Mexico', 'Couples, families, groups', 'Everything included'],
    link: '/all-inclusive',
  },
  {
    slug: 'luxury',
    name: 'Luxury Collection',
    tagline: 'Ritz-Carlton, Silversea, Explora, Regent Seven Seas',
    image: 'https://assets.widgety.co.uk/2024/06/25/15/53/27/243d22ee-734c-4b7a-88f5-11a27fc47c67/Ritz%20Carlton%20Yacht%20Collective%20Evrima%20-%20Exterior%203.PNG',
    badge: 'Ultra-Luxury',
    facts: ['4 prestige lines', 'All-inclusive', 'Butler service'],
    link: '/luxury-cruises',
  },
];

const CATEGORIES = [
  { value: 'all',    label: 'All' },
  { value: 'cruise', label: 'Cruises' },
  { value: 'resort', label: 'Resorts' },
  { value: 'luxury', label: 'Luxury' },
];

const CAT_MAP: Record<string, string> = {
  caribbean: 'cruise', mediterranean: 'cruise', alaska: 'cruise',
  bahamas: 'cruise', europe: 'cruise', mexico: 'cruise',
  'all-inclusive': 'resort', luxury: 'luxury',
};

function DestCard({ dest }: { dest: typeof DESTINATIONS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={dest.link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none',
        background: 'white', overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.4)' : 'transparent'}`,
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${dest.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transition: 'transform 6s ease',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.05) 0%, rgba(13,27,42,0.5) 100%)' }} />
        {dest.badge && (
          <div style={{ position: 'absolute', top: 14, left: 14, background: 'var(--gold)', padding: '4px 12px' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--navy)' }}>{dest.badge}</span>
          </div>
        )}
      </div>
      <div style={{ padding: 'clamp(18px, 3vw, 24px)' }}>
        <h3 className="font-display" style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)', fontWeight: 400, color: 'var(--navy)', marginBottom: 6 }}>
          {dest.name}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--slate)', lineHeight: 1.6, marginBottom: 14 }}>
          {dest.tagline}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
          {dest.facts.map((f, i) => (
            <span key={i} style={{ fontSize: '0.68rem', padding: '3px 10px', background: 'var(--cream)', color: 'var(--slate)', letterSpacing: '0.04em' }}>{f}</span>
          ))}
        </div>
        <div style={{
          display: 'inline-block', fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: hovered ? 'var(--gold)' : 'var(--navy)',
          fontFamily: 'var(--font-body)',
          transition: 'color 0.2s',
          borderBottom: `1px solid ${hovered ? 'var(--gold)' : 'var(--navy)'}`,
          paddingBottom: 2,
        }}>
          Explore →
        </div>
      </div>
    </Link>
  );
}

export default function DestinationsPage() {
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => CAT_MAP[d.slug] === active);

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'var(--navy)',
        paddingTop: 'clamp(96px, 12vw, 140px)',
        paddingBottom: 'clamp(40px, 6vw, 80px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(18px, 5vw, 32px)' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Where Would You Like to Go?</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
            Destinations
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.9rem, 2vw, 1rem)', maxWidth: 500, lineHeight: 1.75 }}>
            From Caribbean weekend getaways to European river journeys — explore every destination we specialize in.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section style={{ background: 'white', borderBottom: '1px solid #eee', position: 'sticky', top: 72, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(8px, 3vw, 32px)', display: 'flex', gap: 0, overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as any}>
          {CATEGORIES.map(c => (
            <button key={c.value} onClick={() => setActive(c.value)} style={{
              padding: 'clamp(12px, 2vw, 16px) clamp(16px, 3vw, 24px)',
              background: 'transparent', border: 'none', flexShrink: 0,
              borderBottom: active === c.value ? '2px solid var(--gold)' : '2px solid transparent',
              color: active === c.value ? 'var(--navy)' : 'var(--slate)',
              fontSize: 'clamp(0.68rem, 2vw, 0.75rem)', fontFamily: 'var(--font-body)',
              fontWeight: active === c.value ? 600 : 400,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
            }}>{c.label}</button>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 'clamp(16px, 3vw, 28px)' }}>
            {filtered.map(d => <DestCard key={d.slug} dest={d} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(48px, 7vw, 80px) clamp(18px, 5vw, 32px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 580, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Can't Decide?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
            We Can Take You Anywhere
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 36 }}>
            Our travel specialists have access to thousands of itineraries across every destination. Tell us your dream and we'll make it happen.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/plan" className="btn-primary" style={{ textDecoration: 'none' }}>Start Planning</Link>
            <Link href="/trips" className="btn-navy" style={{ textDecoration: 'none', borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.75)' }}>Browse Featured Trips</Link>
          </div>
        </div>
      </section>
    </>
  );
}
