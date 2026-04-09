'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CruiseSearch from '@/components/CruiseSearch';
import TravelHeroSlider from '@/components/TravelHeroSlider';
import { getFeaturedTrips } from '@/lib/supabase';
import type { FeaturedTrip } from '@/lib/supabase';

const partners = [
  { name: 'Royal Caribbean', logo: 'https://assets.widgety.co.uk/2024/09/16/07/48/49/8a9d77f2-b9e4-474b-90fc-615c2e048e6a/RCI Logo 2024 1.png', id: 'royal-caribbean-international' },
  { name: 'Carnival', logo: 'https://assets.widgety.co.uk/2024/03/15/10/29/55/843a8d60-ffae-44f2-be74-a58a31e496a7/Carnival Cruise Line Logo 2024 1.png', id: 'carnival-cruise-lines-operator' },
  { name: 'Norwegian', logo: 'https://assets.widgety.co.uk/2026/01/16/13/24/48/adbe3d4c-b28f-47cb-8831-34e55810af30/NCL Its Different Out Here Logo 2026.png', id: 'norwegian-cruise-line' },
  { name: 'MSC Cruises', logo: 'https://assets.widgety.co.uk/2025/10/16/08/27/24/633fbc1c-30ae-429c-bcb1-69ebbabde3a7/MSC Cruises Logo 2025.png', id: 'msc-cruises' },
  { name: 'Virgin Voyages', logo: 'https://assets.widgety.co.uk/2025/02/27/11/23/24/db38cdcc-3552-47ad-bea7-ddb1931f8985/Virgin Voyages Logo 2025.png', id: 'virgin-voyages' },
  { name: 'Disney Cruise Line', logo: 'https://assets.widgety.co.uk/2026/03/09/09/34/38/05c8d46a-6866-484e-a374-8da1135c9ddb/DCL Logo 2026 MGKIT © 2026 Disney. All Rights Reserved. Ships Registry The Bahamas.png', id: 'disney-cruise-line' },
  { name: 'Celebrity Cruises', logo: 'https://assets.widgety.co.uk/2021/12/10/08/11/21/543fe4de-46b9-4e56-adba-bc77fa6b6122/Celebrity Cruises Logo Dec 2021 0.png', id: 'celebrity-cruises' },
  { name: 'Princess Cruises', logo: 'https://assets.widgety.co.uk/2020/12/17/12/13/56/263baa16-5658-4a54-9783-0522d0c34daa/Princess Logo.jpg', id: 'princess-cruises' },
];

const services = [
  { icon: '⚓', title: 'Cruise Vacations', description: 'From 3-night getaways to world voyages — we match you with the perfect ship, itinerary, and cabin.' },
  { icon: '🌴', title: 'All-Inclusive Resorts', description: 'Sandals, Secrets, Beaches, and more. Unlimited dining, drinks, and experiences included.' },
  { icon: '👨‍👩‍👧‍👦', title: 'Family Vacations', description: 'Disney, Universal, Aulani — kid-friendly adventures with seamless logistics handled for you.' },
  { icon: '🥂', title: 'Group Travel', description: 'Corporate retreats, reunions, and milestone celebrations — we coordinate groups of any size.' },
];

const testimonials = [
  { quote: 'Crestwell made our anniversary cruise completely effortless. Every detail was handled perfectly.', name: 'Sarah & Marcus T.', location: 'Atlanta, GA' },
  { quote: "Our family trip to the Bahamas was the best vacation we've ever taken. They knew exactly what we needed.", name: 'The Johnson Family', location: 'Chattanooga, TN' },
  { quote: "I've booked three cruises through Crestwell now. I won't use anyone else — the service is unmatched.", name: 'Diane P.', location: 'Birmingham, AL' },
];

// ── Newsletter section as its own client component ────────────────────────────
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStatus('success');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section style={{ background: 'var(--navy-mid)', padding: '64px 32px', textAlign: 'center' }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <div className="overline" style={{ marginBottom: 16 }}>Stay in the Loop</div>
        <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 300, color: 'white', marginBottom: 12 }}>
          Deals & Inspiration, Delivered
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: 32 }}>
          Get exclusive cruise deals, travel tips, and destination guides straight to your inbox.
        </p>

        {status === 'success' ? (
          <div style={{
            background: 'rgba(201,168,76,0.12)',
            border: '1px solid rgba(201,168,76,0.4)',
            padding: '24px 32px',
            maxWidth: 440,
            margin: '0 auto',
          }}>
            <div style={{ color: 'var(--gold)', fontSize: '1.5rem', marginBottom: 8 }}>✓</div>
            <p style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: 500, marginBottom: 4 }}>You're subscribed!</p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem' }}>
              Look out for exclusive deals and travel inspiration in your inbox.
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 0, maxWidth: 440, margin: '0 auto' }}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address for newsletter signup"
                required
                disabled={status === 'loading'}
                style={{
                  flex: 1, padding: '14px 20px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRight: 'none', color: 'white',
                  fontSize: '0.875rem', fontFamily: 'var(--font-body)',
                  outline: 'none',
                  opacity: status === 'loading' ? 0.6 : 1,
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary"
                style={{ whiteSpace: 'nowrap', cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1 }}
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </form>
            {status === 'error' && (
              <p style={{ color: 'rgba(255,100,100,0.85)', fontSize: '0.8rem', marginTop: 12 }}>
                {errorMsg}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [featuredTrips, setFeaturedTrips] = useState<FeaturedTrip[]>([]);

  useEffect(() => {
    getFeaturedTrips()
      .then(trips => {
        const popular = trips.filter(t => t.popular);
        const shown = popular.length >= 2 ? popular : trips;
        setFeaturedTrips(shown.slice(0, 4));
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--navy)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.35 }} />
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
                  { region: 'Georgia', services: 'Cruise advisor in Atlanta, Savannah & Augusta' },
                  { region: 'Tennessee', services: 'Travel planner in Nashville, Knoxville & Memphis' },
                  { region: 'Alabama', services: 'Vacation planner in Birmingham & Huntsville' },
                  { region: 'Florida', services: 'Group & cruise travel from Jacksonville to Pensacola' },
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
      <section style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '32px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <span className="overline" style={{ color: 'rgba(255,255,255,0.3)' }}>Preferred Partners</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', alignItems: 'center' }}>
            {partners.map((p, i) => (
              <Link key={i} href={`/cruise-lines`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  padding: '10px 16px',
                  height: 52,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                  minWidth: 100,
                }}>
                  <img
                    src={p.logo}
                    alt={p.name}
                    style={{ maxHeight: 32, maxWidth: 110, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.7 }}
                    onError={e => {
                      (e.currentTarget.parentElement!.parentElement as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              </Link>
            ))}
            <Link href="/cruise-lines" style={{ textDecoration: 'none' }}>
              <div style={{ padding: '10px 20px', border: '1px solid rgba(201,168,76,0.3)', height: 52, display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', whiteSpace: 'nowrap' }}>+12 More →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CRUISE SEARCH ── */}
      <CruiseSearch redirectTo="/cruises" searchOnly />

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

      {/* ── FEATURED DESTINATIONS ── */}
      {featuredTrips.length > 0 && (
        <section className="section-pad" style={{ background: 'white' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div className="overline" style={{ marginBottom: 12 }}>Popular Itineraries</div>
                <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2 }}>Where Will You Go?</h2>
              </div>
              <Link href="/destinations" className="btn-navy" style={{ textDecoration: 'none' }}>View All Destinations</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
              {featuredTrips.map(trip => (
                <Link key={trip.id} href={`/request-quote?destination=${encodeURIComponent(trip.destination)}&trip_type=${encodeURIComponent(trip.trip_type || 'Cruise Vacation')}&trip_name=${encodeURIComponent(trip.trip_name)}`} className="card-hover" style={{ overflow: 'hidden', background: 'var(--navy)', cursor: 'pointer', textDecoration: 'none', display: 'block' }}>
                  <div style={{ height: 220, backgroundImage: `url(${trip.cover_image_url || 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80'})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', contentVisibility: 'auto' }}>
                    {trip.trip_type && (
                      <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(13,27,42,0.8)', padding: '4px 12px', backdropFilter: 'blur(4px)' }}>
                        <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>{trip.trip_type}</span>
                      </div>
                    )}
                    {trip.popular && (
                      <div style={{ position: 'absolute', top: 16, right: 16, background: 'var(--gold)', padding: '4px 12px' }}>
                        <span style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)' }}>Popular</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '28px 28px 32px' }}>
                    <h3 className="font-display" style={{ fontSize: '1.35rem', fontWeight: 400, color: 'white', marginBottom: 10 }}>{trip.trip_name}</h3>
                    {trip.description && <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{trip.description}</p>}
                    <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Request a Quote →</span>
                      {trip.starting_from && <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>From {typeof trip.starting_from === 'number' ? `$${trip.starting_from.toLocaleString()}` : trip.starting_from}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate)', marginTop: 2 }}>{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── FINANCING STRIP ── */}
      <section style={{ background: 'var(--navy)', borderTop: '1px solid rgba(201,168,76,0.2)', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: 'clamp(32px, 5vw, 48px) clamp(18px, 5vw, 32px)' }}>
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
