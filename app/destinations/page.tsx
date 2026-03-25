'use client';
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { TripCard } from '@/components/TripCard';
import { useEffect, useState } from 'react';
import { getFeaturedTrips } from '@/lib/supabase';
import type { FeaturedTrip } from '@/lib/supabase';

// ─── Destination data ─────────────────────────────────────────────────────────

const DESTINATIONS: Record<string, {
  name: string;
  tagline: string;
  heroImage: string;
  description: string;
  highlights: string[];
  bestTime: string;
  flightTime: string;
  currency: string;
  language: string;
  climate: string;
  tripType: string; // matches featured_trips.trip_type for filtering
  facts: { label: string; value: string }[];
}> = {
  caribbean: {
    name: 'Caribbean',
    tagline: 'Crystal waters, white sand beaches, and endless sunshine',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80',
    description: 'The Caribbean is the world\'s most popular cruise destination — and for good reason. From the powdery white beaches of the Bahamas to the lush rainforests of St. Lucia, every island offers something different. Whether you\'re after beach clubs, snorkeling, historic forts, or duty-free shopping, the Caribbean delivers.',
    highlights: ['Bahamas & Perfect Day at CocoCay', 'St. Lucia & Piton Mountains', 'Aruba & Eagle Beach', 'Curaçao & Willemstad', 'Grand Cayman & Stingray City', 'Jamaica & Dunn\'s River Falls'],
    bestTime: 'December – April (dry season)',
    flightTime: '2–4 hours from Southeast US',
    currency: 'USD widely accepted',
    language: 'English, Spanish, French, Dutch',
    climate: 'Tropical, 75–85°F year-round',
    tripType: 'Caribbean',
    facts: [
      { label: 'Popular Ports', value: 'Nassau, Cozumel, St. Thomas, Barbados' },
      { label: 'Cruise Length', value: '3–14 nights' },
      { label: 'Best For', value: 'Families, First-timers, Beach lovers' },
      { label: 'Top Lines', value: 'Royal Caribbean, Carnival, Norwegian' },
    ],
  },
  mediterranean: {
    name: 'Mediterranean',
    tagline: 'Ancient history, vibrant culture, and world-class cuisine',
    heroImage: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1800&q=80',
    description: 'A Mediterranean cruise is a floating history lesson. Sail between ancient ruins in Rome and Athens, wander the colorful villages of the Amalfi Coast, sip wine in Santorini, and explore the walled city of Dubrovnik. The Eastern Med covers Greece and Turkey; the Western Med spans Italy, France, and Spain.',
    highlights: ['Santorini & Oia Village', 'Rome & the Colosseum', 'Barcelona & Sagrada Família', 'Dubrovnik Old City', 'Mykonos & the Windmills', 'Amalfi Coast & Positano'],
    bestTime: 'May–June or September–October',
    flightTime: '9–11 hours from Southeast US',
    currency: 'Euro',
    language: 'Italian, Greek, Spanish, French, Croatian',
    climate: 'Warm & sunny, 65–85°F',
    tripType: 'Mediterranean',
    facts: [
      { label: 'Popular Ports', value: 'Barcelona, Rome (Civitavecchia), Athens (Piraeus)' },
      { label: 'Cruise Length', value: '7–14 nights' },
      { label: 'Best For', value: 'Couples, Culture lovers, Foodies' },
      { label: 'Top Lines', value: 'Celebrity, Princess, MSC, Cunard' },
    ],
  },
  alaska: {
    name: 'Alaska',
    tagline: 'Glaciers, wildlife, and untamed wilderness',
    heroImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1800&q=80',
    description: 'Alaska cruises are unlike anything else. Sail past calving glaciers, spot humpback whales breaching, and watch brown bears fish for salmon in crystal rivers. Ports like Juneau, Skagway, and Ketchikan offer gold rush history, totem poles, and some of the most dramatic scenery on earth.',
    highlights: ['Glacier Bay National Park', 'Juneau & the Mendenhall Glacier', 'Skagway & the White Pass Railway', 'Ketchikan & Misty Fjords', 'Whale watching in Frederick Sound', 'Bear viewing at Pack Creek'],
    bestTime: 'May – September',
    flightTime: '6–8 hours from Southeast US',
    currency: 'USD',
    language: 'English',
    climate: 'Cool, 45–65°F in summer',
    tripType: 'Alaska',
    facts: [
      { label: 'Popular Ports', value: 'Juneau, Skagway, Ketchikan, Sitka' },
      { label: 'Cruise Length', value: '7–14 nights' },
      { label: 'Best For', value: 'Nature lovers, Wildlife enthusiasts, Adventurers' },
      { label: 'Top Lines', value: 'Princess, Holland America, Norwegian' },
    ],
  },
  bahamas: {
    name: 'The Bahamas',
    tagline: 'Perfect Day awaits just off the Florida coast',
    heroImage: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&q=80',
    description: 'The Bahamas is the ultimate short cruise destination — just hours from Florida ports, yet a world away. Nassau offers colonial charm and Atlantis Resort; the Out Islands are pristine and uncrowded. Royal Caribbean\'s Perfect Day at CocoCay has raised the bar for private island experiences.',
    highlights: ['Perfect Day at CocoCay', 'Nassau & Atlantis', 'Blue Lagoon Island', 'Exuma Cays & Iguanas', 'Harbour Island & Pink Sand Beach', 'Swimming pigs at Big Major Cay'],
    bestTime: 'December – April',
    flightTime: '1–2 hours from Southeast US',
    currency: 'BSD (USD accepted everywhere)',
    language: 'English',
    climate: 'Tropical, 70–85°F',
    tripType: 'Caribbean',
    facts: [
      { label: 'Popular Ports', value: 'Nassau, CocoCay, Freeport' },
      { label: 'Cruise Length', value: '3–7 nights' },
      { label: 'Best For', value: 'First-timers, Families, Weekend getaways' },
      { label: 'Top Lines', value: 'Royal Caribbean, Carnival, Norwegian' },
    ],
  },
  europe: {
    name: 'Europe',
    tagline: 'River cruises and coastal wonders across the continent',
    heroImage: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1800&q=80',
    description: 'Beyond the Mediterranean, Europe offers incredible river cruising along the Rhine, Danube, and Douro — gliding through vineyards, medieval castles, and UNESCO World Heritage cities. Northern Europe cruises visit Norwegian fjords, the Baltic capitals, and the British Isles.',
    highlights: ['Danube River & Vienna', 'Rhine Valley & Castle Road', 'Norwegian Fjords', 'Baltic Capitals (Stockholm, Helsinki, Tallinn)', 'British Isles & Scottish Highlands', 'Douro Valley & Porto'],
    bestTime: 'April – October',
    flightTime: '9–12 hours from Southeast US',
    currency: 'Euro, GBP, NOK (varies)',
    language: 'German, French, English, Norwegian (varies)',
    climate: 'Temperate, 50–75°F',
    tripType: 'Europe',
    facts: [
      { label: 'Popular Rivers', value: 'Danube, Rhine, Douro, Seine' },
      { label: 'Cruise Length', value: '7–14 nights' },
      { label: 'Best For', value: 'History lovers, Wine enthusiasts, Couples' },
      { label: 'Top Lines', value: 'AmaWaterways, Avalon, Uniworld, Viking' },
    ],
  },
  mexico: {
    name: 'Mexico',
    tagline: 'Ancient ruins, Pacific beaches, and vibrant culture',
    heroImage: 'https://images.unsplash.com/photo-1512813498716-3e640fed3f5f?w=1800&q=80',
    description: 'Mexico cruises offer two very different experiences. The Mexican Riviera sails from California to Cabo San Lucas, Puerto Vallarta, and Mazatlán — golden beaches and mariachi music. The Yucatán combines Cozumel\'s world-class diving with Mayan ruins at Chichén Itzá and the colonial charm of Mérida.',
    highlights: ['Cozumel & Mesoamerican Reef', 'Cabo San Lucas & Land\'s End', 'Chichén Itzá Mayan Ruins', 'Puerto Vallarta & Old Town', 'Tulum Ruins & Cenotes', 'Mazatlán & the Malecón'],
    bestTime: 'October – April',
    flightTime: '3–5 hours from Southeast US',
    currency: 'Mexican Peso (USD widely accepted)',
    language: 'Spanish',
    climate: 'Warm & sunny, 75–90°F',
    tripType: 'Mexico',
    facts: [
      { label: 'Popular Ports', value: 'Cozumel, Cabo San Lucas, Puerto Vallarta' },
      { label: 'Cruise Length', value: '5–14 nights' },
      { label: 'Best For', value: 'Divers, History buffs, Beach lovers' },
      { label: 'Top Lines', value: 'Carnival, Royal Caribbean, Princess' },
    ],
  },
};

// ─── Page component ───────────────────────────────────────────────────────────

function DestinationContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const dest = DESTINATIONS[slug];

  const [trips, setTrips] = useState<FeaturedTrip[]>([]);

  useEffect(() => {
    if (!dest) return;
    getFeaturedTrips({ trip_type: dest.tripType })
      .then(setTrips)
      .catch(console.error);
  }, [dest]);

  if (!dest) {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, paddingTop: 120 }}>
        <div style={{ fontSize: '2rem', opacity: 0.3 }}>🗺️</div>
        <h2 className="font-display" style={{ color: 'var(--navy)', fontWeight: 300 }}>Destination Not Found</h2>
        <Link href="/destinations" className="btn-navy" style={{ textDecoration: 'none' }}>Browse All Destinations</Link>
      </div>
    );
  }

  const quoteParams = new URLSearchParams({ destination: dest.name, trip_type: dest.tripType });

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(360px, 65vh, 640px)', minHeight: 360, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${dest.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.8) 100%)' }} />
        {/* Breadcrumb */}
        <div style={{ position: 'absolute', top: 'clamp(80px, 10vw, 100px)', left: 'clamp(16px, 5vw, 32px)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', textDecoration: 'none' }}>Destinations</Link>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
          <span style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>{dest.name}</span>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(24px, 5vw, 48px) clamp(16px, 5vw, 32px)', maxWidth: 1280, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 12 }}>Destination Guide</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 10 }}>
            {dest.name}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: 500 }}>{dest.tagline}</p>
        </div>
      </section>

      {/* Quick facts bar */}
      <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)', display: 'flex', flexWrap: 'wrap' }}>
          {dest.facts.map((f, i) => (
            <div key={i} style={{
              padding: 'clamp(14px, 2vw, 18px) clamp(12px, 2vw, 28px)',
              flex: '1 1 160px',
              borderRight: i < dest.facts.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{f.label}</div>
              <div style={{ fontSize: '0.82rem', color: 'white' }}>{f.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <section style={{ background: 'white', padding: 'clamp(40px, 6vw, 64px) clamp(16px, 5vw, 32px)' }}>
        <div className="dest-content-grid" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 'clamp(32px, 5vw, 56px)', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <div className="overline" style={{ marginBottom: 12 }}>Overview</div>
            <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 20 }}>About {dest.name}</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontSize: '0.9rem', marginBottom: 40 }}>{dest.description}</p>

            <div className="overline" style={{ marginBottom: 16 }}>Top Experiences</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
              {dest.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 16px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
                  <div style={{ width: 6, height: 6, background: 'var(--gold)', borderRadius: '50%', marginTop: 5, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--navy)', lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — sidebar */}
          <aside>
            <div style={{ position: 'sticky', top: 100 }}>
              {/* Travel info */}
              <div style={{ background: 'var(--cream)', padding: '28px', marginBottom: 16 }}>
                <div className="overline" style={{ marginBottom: 16 }}>Travel Info</div>
                {[
                  { label: 'Best Time to Visit', value: dest.bestTime },
                  { label: 'Flight Time', value: dest.flightTime },
                  { label: 'Currency', value: dest.currency },
                  { label: 'Language', value: dest.language },
                  { label: 'Climate', value: dest.climate },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(13,27,42,0.08)', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--slate)', letterSpacing: '0.05em', flexShrink: 0 }}>{item.label}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--navy)', textAlign: 'right' }}>{item.value}</span>
                  </div>
                ))}
              </div>
              {/* CTA */}
              <div style={{ background: 'var(--navy)', padding: '28px' }}>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: 20 }}>
                  Ready to explore {dest.name}? Our specialists will find the perfect cruise or package for you.
                </p>
                <Link href={`/request-quote?${quoteParams}`} className="btn-primary"
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginBottom: 10 }}>
                  Get a Free Quote
                </Link>
                <Link href="/contact" style={{
                  display: 'block', textAlign: 'center', textDecoration: 'none',
                  padding: '11px', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'var(--font-body)',
                }}>
                  Talk to a Specialist
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Featured trips for this destination */}
      {trips.length > 0 && (
        <section style={{ background: 'var(--cream)', padding: 'clamp(40px, 6vw, 64px) clamp(16px, 5vw, 32px)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="overline" style={{ marginBottom: 12 }}>Featured Itineraries</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'var(--navy)' }}>
                {dest.name} Trips
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
              {trips.map(trip => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(48px, 7vw, 64px) clamp(16px, 5vw, 32px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${dest.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Ready to Go?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
            Plan Your {dest.name} Vacation
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: 32 }}>
            No booking fees. Expert guidance. The best prices available. Let us handle the details.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/request-quote?${quoteParams}`} className="btn-primary" style={{ textDecoration: 'none' }}>Request a Quote</Link>
            <Link href="/destinations" className="btn-outline" style={{ textDecoration: 'none' }}>All Destinations</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .dest-content-grid {
            grid-template-columns: 1fr !important;
          }
          .dest-content-grid aside {
            position: static !important;
          }
          .dest-content-grid aside > div {
            position: static !important;
          }
        }
        @media (max-width: 480px) {
          .dest-content-grid {
            gap: 28px !important;
          }
        }
      `}</style>
    </>
  );
}

export default function DestinationPage() {
  return (
    <Suspense fallback={<div style={{ background: 'var(--navy)', minHeight: '100vh' }} />}>
      <DestinationContent />
    </Suspense>
  );
}
