'use client';
import { useState } from 'react';
import Link from 'next/link';
import FeaturedTrips from '@/components/FeaturedTrips';
import TrustpilotWidget from '@/components/TrustpilotWidget';
import NewsletterSection from '@/components/NewsletterSection';
import PartnerLogos from '@/components/PartnerLogos';
import TravelHeroSlider from '@/components/TravelHeroSlider';

const services = [
  { icon: '⚓', title: 'Cruise Vacations', description: 'From 3-night getaways to world voyages — we match you with the perfect ship, itinerary, and cabin.' },
  { icon: '🌴', title: 'All-Inclusive Resorts', description: 'Sandals, Secrets, Beaches, and more. Unlimited dining, drinks, and experiences included.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Family Vacations', description: 'Disney, Universal, Aulani — kid-friendly adventures with seamless logistics handled for you.' },
  { icon: '🥂', title: 'Group Travel', description: 'Corporate retreats, reunions, and milestone celebrations — we coordinate groups of any size.' },
];

const CITY_SLUGS: Record<string, string> = {
  'Atlanta, GA': 'atlanta',
  'Nashville, TN': 'nashville',
  'Birmingham, AL': 'birmingham',
  'Chattanooga, TN': 'chattanooga',
  'Huntsville, AL': 'huntsville',
  'Knoxville, TN': 'knoxville',
  'Memphis, TN': 'memphis',
  'Savannah, GA': 'savannah',
};

const testimonials = [
  {
    quote: 'Crestwell made our anniversary cruise completely effortless. Every detail was handled perfectly.',
    name: 'Sarah & Marcus T.', location: 'Atlanta, GA',
    stars: 5, date: 'March 2026', source: 'Google',
  },
  {
    quote: "Our family trip to the Bahamas was the best vacation we've ever taken. They knew exactly what we needed.",
    name: 'The Johnson Family', location: 'Chattanooga, TN',
    stars: 5, date: 'January 2026', source: 'Google',
  },
  {
    quote: "I've booked three cruises through Crestwell now. I won't use anyone else — the service is unmatched.",
    name: 'Diane P.', location: 'Birmingham, AL',
    stars: 5, date: 'February 2026', source: 'Google',
  },
];

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--navy)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35 }} aria-hidden="true" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.6) 60%, rgba(13,27,42,0.95) 100%)' }} />
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px', maxWidth: 860, zIndex: 1 }}>
          <div className="overline animate-fade-up" style={{ marginBottom: 24 }}>Georgia · Tennessee · Alabama · Florida</div>
          <h1 className="font-display animate-fade-up delay-100" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, color: 'white', lineHeight: 1.08, letterSpacing: '-0.01em', marginBottom: 28 }}>
            See the World<br />
            <em style={{ color: 'var(--gold-light)' }}>One Port at a Time</em>
          </h1>
          <p className="animate-fade-up delay-200" style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: 48, maxWidth: 560, margin: '0 auto 48px' }}>
            Personalized travel experiences for families, couples, and groups. Cruises, all-inclusive resorts, and beyond — all expertly curated for you.
          </p>
          <div className="animate-fade-up delay-300" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>Request a Free Quote</Link>
            <Link href="/destinations" className="btn-outline" style={{ textDecoration: 'none' }}>Explore Destinations</Link>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', opacity: 0.5 }}>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(180deg, transparent, var(--gold))' }} />
        </div>
      </section>

      {/* ── HERO SLIDER ── */}
      <TravelHeroSlider />


      {/* ── LOCAL SEO: VALUE PROP + SERVICE REGIONS ── */}
      <section style={{ background: 'white', padding: '64px 32px', borderBottom: '1px solid #f0ece4' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
            <div>
              <div className="overline" style={{ marginBottom: 16 }}>Why Crestwell</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 16, lineHeight: 1.25 }}>
                Your Personal Travel Advisor — Not an Algorithm
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 16 }}>
                Unlike online booking engines, Crestwell Travel Services assigns you a dedicated advisor who learns your preferences, tracks price drops, and handles every detail — from cabin selection to shore excursion timing. No hold music. No bots.
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                As an ASTA member and CLIA-certified agency, we have access to exclusive rates, group blocks, and amenities that aren&apos;t available when booking direct.
              </p>
            </div>
            <div>
              <div className="overline" style={{ marginBottom: 16 }}>Serving the Southeast</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>
                Based in Chattanooga, TN, we&apos;re the go-to travel agency for families and couples across the region — with clients from Atlanta to Huntsville, Nashville to Birmingham.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { region: 'Georgia', services: <><a href="/travel-agent-atlanta" style={{color:'inherit',borderBottom:'1px dotted var(--gold)',textDecoration:'none'}}>Atlanta</a>, <a href="/travel-agent-savannah" style={{color:'inherit',borderBottom:'1px dotted var(--gold)',textDecoration:'none'}}>Savannah</a> &amp; Augusta</> },
                  { region: 'Tennessee', services: <><a href="/travel-agent-nashville" style={{color:'inherit',borderBottom:'1px dotted var(--gold)',textDecoration:'none'}}>Nashville</a>, <a href="/travel-agent-knoxville" style={{color:'inherit',borderBottom:'1px dotted var(--gold)',textDecoration:'none'}}>Knoxville</a> &amp; <a href="/travel-agent-memphis" style={{color:'inherit',borderBottom:'1px dotted var(--gold)',textDecoration:'none'}}>Memphis</a></> },
                  { region: 'Alabama', services: <><a href="/travel-agent-birmingham" style={{color:'inherit',borderBottom:'1px dotted var(--gold)',textDecoration:'none'}}>Birmingham</a> &amp; <a href="/travel-agent-huntsville" style={{color:'inherit',borderBottom:'1px dotted var(--gold)',textDecoration:'none'}}>Huntsville</a></> },
                  { region: 'Florida', services: <>Group &amp; cruise travel from Jacksonville to Pensacola</> },
                ].map((r, i) => (
                  <div key={i} style={{ padding: '16px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 4, letterSpacing: '0.05em' }}>{r.region}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r.services}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS STRIP ── */}
      <PartnerLogos />


      {/* ── SERVICES ── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="overline" style={{ marginBottom: 16 }}>What We Do</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2 }}>Every Journey, Expertly Crafted</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
            {[
              { icon: '⚓', title: 'Cruise Vacations', description: 'From 3-night getaways to world voyages — we match you with the perfect ship, itinerary, and cabin.', href: '/cruises', cta: 'Browse Cruise Vacations' },
              { icon: '🌴', title: 'All-Inclusive Resorts', description: 'Sandals, Secrets, Beaches, and more. Unlimited dining, drinks, and experiences included.', href: '/all-inclusive', cta: 'Plan an All-Inclusive Vacation' },
              { icon: '👨‍👩‍👧‍👦', title: 'Family Vacations', description: 'Disney, Universal, Aulani — kid-friendly adventures with seamless logistics handled for you.', href: '/request-quote?trip_type=Family+Vacation', cta: 'Plan a Family Trip' },
              { icon: '🥂', title: 'Group Travel', description: 'Corporate retreats, reunions, and milestone celebrations — we coordinate groups of any size.', href: '/group-travel', cta: 'Get a Group Quote' },
            ].map((s, i) => (
              <Link key={i} href={s.href} className="card-hover service-card" style={{ background: 'white', padding: '48px 36px', borderBottom: '3px solid transparent', transition: 'border-bottom-color 0.3s ease', textDecoration: 'none', display: 'block' }}>
                <div style={{ fontSize: '2rem', marginBottom: 20 }}>{s.icon}</div>
                <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 20 }}>{s.description}</p>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)' }}>{s.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED DESTINATIONS — client island ── */}
      <FeaturedTrips />

      {/* ── CTA BANNER ── */}
      <section style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden', padding: '80px 32px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12 }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto' }}>
          <div className="gold-divider overline" style={{ marginBottom: 28, justifyContent: 'center' }}>Current Deals</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: 20 }}>
            Explore 1,670+<br /><em style={{ color: 'var(--gold-light)' }}>Cruise Vacations</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 40 }}>
            From weekend getaways to extended voyages — our team finds the right cruise at the best price, every time. Let us do the searching for you.
          </p>
          <Link href="/plan" className="btn-primary" style={{ textDecoration: 'none' }}>Start Planning Today</Link>
        </div>
      </section>

      {/* ── ADVISOR BIO ── */}
      <section style={{ background: 'var(--navy)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 200, height: 200, borderRadius: '50%',
              border: '3px solid var(--gold)',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(13,27,42,0.9))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            }}>
              👤
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'white', fontWeight: 400 }}>T. Crestwell</p>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginTop: 4 }}>
                Owner & Travel Advisor
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12, flexWrap: 'wrap' }}>
                {['ASTA Member', 'CLIA Certified', 'Cruise Specialist'].map(badge => (
                  <span key={badge} style={{
                    fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '3px 10px', borderRadius: 20,
                    background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)',
                    color: 'var(--gold)', fontFamily: 'var(--font-body)',
                  }}>{badge}</span>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>
              Your Advisor
            </p>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 400, color: 'white', marginBottom: 20, lineHeight: 1.3 }}>
              Travel advice you can actually trust
            </h2>
            <div style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)' }}>
              <p style={{ marginBottom: 14 }}>
                I started Crestwell Travel Services because I was tired of seeing families overpay for travel that didn't live up to the brochure. Every recommendation I make is based on firsthand experience — I've sailed the ships, stayed at the resorts, and walked the ports.
              </p>
              <p style={{ marginBottom: 14 }}>
                Based in Chattanooga, I serve clients across Georgia, Tennessee, and Alabama who want someone in their corner — not a booking engine. When something goes wrong on your trip, you have a real person to call.
              </p>
              <p>Whether you're planning your first cruise or your fourteenth, I'll tell you exactly what I would book — and what I'd avoid.</p>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 28, flexWrap: 'wrap' }}>
              <a href="/about" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px',
                background: 'var(--gold)', color: 'var(--navy)', textDecoration: 'none',
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', fontFamily: 'var(--font-body)',
              }}>Full Bio →</a>
              <a href="tel:8885086893" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px',
                border: '1px solid rgba(201,168,76,0.4)', color: 'var(--gold)',
                textDecoration: 'none', fontSize: '0.72rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)',
              }}>📞 888.508.6893</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Traveler Stories</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)' }}>What Our Clients Say</h2>
          </div>
          {/* Review schema for Google */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TravelAgency',
            name: 'Crestwell Travel Services',
            review: testimonials.map(t => ({
              '@type': 'Review',
              reviewBody: t.quote,
              author: { '@type': 'Person', name: t.name },
              reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            })),
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              reviewCount: testimonials.length.toString(),
              bestRating: '5',
            },
          }) }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} itemScope itemType="https://schema.org/Review" style={{ background: 'white', padding: '40px 36px', borderTop: '3px solid var(--gold)' }}>
                <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: 16, fontFamily: 'Georgia', lineHeight: 1 }}>"</div>
                <p className="font-display" itemProp="reviewBody" style={{ fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--navy)', lineHeight: 1.7, marginBottom: 24 }}>{t.quote}</p>
                <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                  <div itemProp="author" itemScope itemType="https://schema.org/Person" style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--navy)' }}>
                    <span itemProp="name">{t.name}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate)', marginTop: 2 }}>
                    {CITY_SLUGS[t.location]
                      ? <a href={`/travel-agent-${CITY_SLUGS[t.location]}`} style={{ color: 'var(--slate)', textDecoration: 'none', borderBottom: '1px dotted var(--gold)' }}>{t.location}</a>
                      : t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── FINANCING STRIP ── */}
      <section style={{ background: 'var(--navy)', borderTop: '1px solid rgba(201,168,76,0.2)', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: 'clamp(32px, 5vw, 48px) clamp(18px, 5vw, 32px)', contentVisibility: 'auto', containIntrinsicSize: '0 300px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10, fontFamily: 'var(--font-body)' }}>
              Flexible Payment Options
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 300, color: 'white', margin: 0 }}>
              Your Dream Trip Is More Affordable Than You Think
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 12 }}>
            {[
              { label: 'Get Pre-Qualified for Travel Financing', icon: '✅', desc: 'No hard credit pull · Fast approval', href: '/request-quote?trip_type=Financing+Inquiry' },
              { label: 'See What You Can Afford in 60 Seconds', icon: '⏱', desc: 'Monthly payment calculator for your trip', href: '/budget' },
            ].map((item, i) => (
              <Link
                key={i}
                href={(item as any).href || '/budget'}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '18px 22px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,168,76,0.25)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.5)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)';
                }}
              >
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white', letterSpacing: '0.02em', marginBottom: 3, fontFamily: 'var(--font-body)' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>
                    {item.desc}
                  </div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--gold)', fontSize: '0.9rem', flexShrink: 0 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* ── SOUTHEAST CITIES ── */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(48px,6vw,72px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 12 }}>Serving the Southeast</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 8 }}>
            Your Local Travel Advisor
          </h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.95rem', maxWidth: 560, margin: '0 auto 40px' }}>
            Based in Chattanooga — serving families and groups across Georgia, Tennessee, Alabama, and beyond.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {[
              { city: 'Atlanta', slug: 'atlanta', state: 'GA' },
              { city: 'Nashville', slug: 'nashville', state: 'TN' },
              { city: 'Birmingham', slug: 'birmingham', state: 'AL' },
              { city: 'Chattanooga', slug: 'chattanooga', state: 'TN' },
              { city: 'Huntsville', slug: 'huntsville', state: 'AL' },
              { city: 'Knoxville', slug: 'knoxville', state: 'TN' },
              { city: 'Memphis', slug: 'memphis', state: 'TN' },
              { city: 'Savannah', slug: 'savannah', state: 'GA' },
            ].map(({ city, slug, state }) => (
              <a
                key={slug}
                href={`/travel-agent-${slug}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '10px 20px', border: '1px solid rgba(13,27,42,0.15)',
                  background: 'white', color: 'var(--navy)', textDecoration: 'none',
                  fontSize: '0.85rem', letterSpacing: '0.03em', transition: 'all 0.2s',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--gold)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(13,27,42,0.15)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--navy)'; }}
              >
                {city}, {state}
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* ── FAQ SECTION (matches FAQPage schema in layout) ── */}
      <section style={{ background: 'var(--cream)', padding: '72px 32px', borderTop: '1px solid #e8e3da' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Common Questions</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 300, color: 'var(--navy)' }}>Travel Planning FAQ</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { q: 'Does Crestwell charge a planning fee?', a: 'No — our travel planning services are complimentary. We are compensated by cruise lines and resorts, so there is no extra cost to you.' },
              { q: 'What areas do you serve?', a: 'We primarily serve clients in Georgia, Tennessee, Alabama, and Florida, but we plan vacations for travelers across the entire United States.' },
              { q: 'Can you coordinate group and corporate travel?', a: 'Yes — we specialize in group travel including corporate retreats, family reunions, church groups, and milestone celebrations of any size.' },
              { q: 'How quickly can I get a cruise quote?', a: 'Most quote requests are responded to within one business day. Fill out our quote form and a dedicated advisor will reach out to discuss your options.' },
            ].map((item, i) => (
              <details key={i} style={{ borderBottom: '1px solid #ddd6c8', padding: '20px 0' }}>
                <summary style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 400, color: 'var(--navy)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {item.q}
                  <span style={{ color: 'var(--gold)', fontSize: '1.2rem', marginLeft: 16 }}>+</span>
                </summary>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: 12, paddingRight: 32 }}>{item.a}</p>
              </details>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/request-quote" className="btn-navy" style={{ textDecoration: 'none' }}>Request a Free Quote</Link>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      {/* ── Lead Magnet ──────────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>
            Free Download
          </p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, color: 'var(--navy)', marginBottom: 12 }}>
            Southeast Cruiser's Port Guide
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 32, fontFamily: 'var(--font-body)' }}>
            Tim's honest take on every major port — what to book, what to skip, and the excursions actually worth your time. Used by 1,200+ travelers.
          </p>
          <LeadMagnetForm city="general" cityName="Southeast" />
          <p style={{ fontSize: '0.75rem', color: 'var(--slate)', marginTop: 16, fontFamily: 'var(--font-body)' }}>
            Free. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <NewsletterSection />

      {/* ── STAY CONNECTED ── */}
      <section style={{
        background: 'var(--navy)',
        padding: '72px 32px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* Subtle background texture */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 640, margin: '0 auto' }}>
          {/* Label */}
          <div className="overline" style={{ marginBottom: 16, justifyContent: 'center' }}>Stay Connected</div>

          {/* Headline */}
          <h2 className="font-display" style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 300, color: 'white', lineHeight: 1.2, marginBottom: 14,
          }}>
            Follow Us for Daily Inspiration,<br />
            <em style={{ color: 'var(--gold-light)' }}>Travel Tips &amp; New Journeys</em>
          </h2>
          <p style={{
            fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.75, marginBottom: 44,
          }}>
            Join our community across social media — deals, destination guides,<br />
            client trips, and travel inspiration posted daily.
          </p>

          {/* Social icons row */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            alignItems: 'center', gap: 20, flexWrap: 'wrap',
          }}>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61572819131364"
              target="_blank" rel="noopener noreferrer"
              aria-label="Facebook"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                transition: 'color 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              <div style={{
                width: 52, height: 52,
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.25s, background 0.25s',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Facebook</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/crestwelltravel"
              target="_blank" rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                transition: 'color 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              <div style={{
                width: 52, height: 52,
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.25s',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>Instagram</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/crestwell-travel-services"
              target="_blank" rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                transition: 'color 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              <div style={{
                width: 52, height: 52,
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.25s',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>LinkedIn</span>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@crestwelltravel"
              target="_blank" rel="noopener noreferrer"
              aria-label="TikTok"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                transition: 'color 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--gold)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              <div style={{
                width: 52, height: 52,
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'border-color 0.25s',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </div>
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>TikTok</span>
            </a>
          </div>

          {/* Gold divider line */}
          <div style={{
            width: 48, height: 1,
            background: 'var(--gold)', opacity: 0.4,
            margin: '44px auto 0',
          }} />
        </div>
      </section>

    </>
  );
}
