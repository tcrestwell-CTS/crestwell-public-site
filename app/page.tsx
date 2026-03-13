'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CruiseSearch from '@/components/CruiseSearch';
import { getFeaturedTrips } from '@/lib/supabase';
import type { FeaturedTrip } from '@/lib/supabase';

const partners = [
  { name: 'Royal Caribbean', tagline: 'Adventure of the Seas' },
  { name: 'Carnival', tagline: 'Choose Fun' },
  { name: 'Norwegian', tagline: 'Feel Free' },
  { name: 'MSC Cruises', tagline: 'For All the Senses' },
  { name: 'Virgin Voyages', tagline: 'Brilliant at Sea' },
  { name: 'Explora Journeys', tagline: 'Ocean State of Mind' },
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
    quote: "Our family trip to the Bahamas was the best vacation we've ever taken. They knew exactly what we needed.",
    name: 'The Johnson Family',
    location: 'Chattanooga, TN',
  },
  {
    quote: "I've booked three cruises through Crestwell now. I won't use anyone else — the service is unmatched.",
    name: 'Diane P.',
    location: 'Birmingham, AL',
  },
];

export default function HomePage() {
  const [featuredTrips, setFeaturedTrips] = useState<FeaturedTrip[]>([]);

  useEffect(() => {
    getFeaturedTrips()
      .then(trips => {
        // Show popular trips first, fall back to any published trips, max 4
        const popular = trips.filter(t => t.popular);
        const shown = popular.length >= 2 ? popular : trips;
        setFeaturedTrips(shown.slice(0, 4));
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--navy)',
      }}>
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
              <div key={i} style={{ padding: '12px 32px', borderRight: i < partners.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', textAlign: 'center' }}>
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
              <div key={i} className="card-hover service-card" style={{ background: 'white', padding: '48px 36px', borderBottom: '3px solid transparent', transition: 'border-bottom-color 0.3s ease', cursor: 'default' }}>
                <div style={{ fontSize: '2rem', marginBottom: 20 }}>{s.icon}</div>
                <h3 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{s.description}</p>
              </div>
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
                <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2 }}>
                  Where Will You Go?
                </h2>
              </div>
              <Link href="/destinations" className="btn-navy" style={{ textDecoration: 'none' }}>View All Destinations</Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
              {featuredTrips.map(trip => (
                <Link
                  key={trip.id}
                  href={`/request-quote?destination=${encodeURIComponent(trip.destination)}&trip_type=${encodeURIComponent(trip.trip_type || 'Cruise Vacation')}&trip_name=${encodeURIComponent(trip.trip_name)}`}
                  className="card-hover"
                  style={{ overflow: 'hidden', background: 'var(--navy)', cursor: 'pointer', textDecoration: 'none', display: 'block' }}
                >
                  <div style={{
                    height: 220,
                    backgroundImage: `url(${trip.cover_image_url || 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}>
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
                    {trip.description && (
                      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{trip.description}</p>
                    )}
                    <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Request a Quote →</span>
                      {trip.starting_from && (
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>From {trip.starting_from}</span>
                      )}
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
            Explore 1,670+<br />
            <em style={{ color: 'var(--gold-light)' }}>Cruise Vacations</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 40 }}>
            From weekend getaways to extended voyages — our team finds the right cruise at the best price, every time. Let us do the searching for you.
          </p>
          <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>Start Planning Today</Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Traveler Stories</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)' }}>What Our Clients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'white', padding: '40px 36px', borderTop: '3px solid var(--gold)' }}>
                <div style={{ fontSize: '2rem', color: 'var(--gold)', marginBottom: 16, fontFamily: 'Georgia', lineHeight: 1 }}>"</div>
                <p className="font-display" style={{ fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--navy)', lineHeight: 1.7, marginBottom: 24 }}>{t.quote}</p>
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
          <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 300, color: 'white', marginBottom: 12 }}>Deals & Inspiration, Delivered</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: 32 }}>
            Get exclusive cruise deals, travel tips, and destination guides straight to your inbox.
          </p>
          <form action="/api/newsletter" method="POST" style={{ display: 'flex', gap: 0, maxWidth: 440, margin: '0 auto' }}>
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              style={{ flex: 1, padding: '14px 20px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRight: 'none', color: 'white', fontSize: '0.875rem', fontFamily: 'var(--font-body)', outline: 'none' }}
            />
            <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
