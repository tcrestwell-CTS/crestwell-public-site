'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import CruiseSearch from '@/components/CruiseSearch';
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
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
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
                <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2 }}>Where Will You Go?</h2>
              </div>
              <Link href="/destinations" className="btn-navy" style={{ textDecoration: 'none' }}>View All Destinations</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
              {featuredTrips.map(trip => (
                <Link key={trip.id} href={`/request-quote?destination=${encodeURIComponent(trip.destination)}&trip_type=${encodeURIComponent(trip.trip_type || 'Cruise Vacation')}&trip_name=${encodeURIComponent(trip.trip_name)}`} className="card-hover" style={{ overflow: 'hidden', background: 'var(--navy)', cursor: 'pointer', textDecoration: 'none', display: 'block' }}>
                  <div style={{ height: 220, backgroundImage: `url(${trip.cover_image_url || 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80'})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
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
                      {trip.starting_from && <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>From {trip.starting_from}</span>}
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
      <NewsletterSection />
    </>
  );
}
