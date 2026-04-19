import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import RailDeals from '@/components/RailDeals';

export const metadata: Metadata = {
  title: 'Vacations by Rail | Scenic Train Packages | Crestwell Travel Services',
  description: `Explore the world by train with Crestwell Travel. We partner with Vacations By Rail to book scenic rail vacations across the USA, Canada, Europe, and beyond. Independent journeys, escorted tours, and rail & cruise combos. Planning is always free.`,
  openGraph: {
    title: 'Vacations by Rail — Crestwell Travel Services',
    description: `Scenic train vacations across the USA, Canada, Europe, and beyond. Independent rail journeys and escorted tours booked through Vacations By Rail. Planning is always free.`,
    url: 'https://crestwellgetaways.com/vacations-by-rail',
    siteName: 'Crestwell Travel Services',
    type: 'website',
  },
};

const experiences = [
  {
    name: 'USA by Rail',
    img: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80',
    tagline: `America's most iconic rail journeys`,
    description: `Ride the California Zephyr across the Rockies, the Empire Builder through the Northern Prairies, or the Southwest Chief through canyon country. With 500+ Amtrak stations, your journey starts close to home.`,
    highlights: ['Grand Canyon', 'Glacier National Park', 'New England Fall Foliage', 'Pacific Coast', 'Route 66 by Rail', 'National Parks Loop', 'Chicago to New Orleans', 'Rocky Mountains'],
    color: '#0D9FD8',
    brochurePdf: 'https://www.vacationsbyrail.com/ebrochure/vbrusa26/inc/pdf/VBR_Best_of_USA_2026.pdf',
  },
  {
    name: 'Canada by Rail',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    tagline: 'Canadian Rockies & beyond',
    description: `Board the legendary Rocky Mountaineer for a daylight journey through British Columbia and Alberta, or ride VIA Rail across the country. Jasper, Banff, Lake Louise, and Vancouver make Canada a world-class rail destination.`,
    highlights: ['Rocky Mountaineer', 'Jasper National Park', 'Banff & Lake Louise', 'Vancouver', 'Canadian Rockies', 'VIA Rail Canadian', 'Quebec City'],
    color: '#CC2936',
    brochurePdf: 'https://www.vacationsbyrail.com/ebrochure/vbrcanada26/inc/pdf/VBR_Best_of_Canada_2026.pdf',
  },
  {
    name: 'Europe by Rail',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    tagline: 'Iconic trains across the continent',
    description: `Ride the Glacier Express through the Swiss Alps, the Jacobite Steam Train across the Scottish Highlands, or explore Ireland, France, Italy, and Spain at your own pace. Europe by rail is the classic independent travel experience.`,
    highlights: ['Glacier Express', 'Swiss Alps', 'Scottish Highlands & Jacobite', 'Ireland & Britain', 'Italy Rail Journey', 'France & Paris', 'Spain & Portugal', 'Scandinavia'],
    color: '#C9A84C',
    brochurePdf: 'https://www.vacationsbyrail.com/ebrochure/vbreurope26/inc/pdf/VBR_Best_of_Europe_2026.pdf',
  },
  {
    name: 'Scenic Rail Adventures',
    img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    tagline: 'Historic & legendary train routes',
    description: `Some trains are the destination themselves. Ride the Durango & Silverton Narrow Gauge through Colorado, the Grand Canyon Railway, the Georgetown Loop, or Africa on Rovos Rail. These bucket-list journeys belong on every traveler's list.`,
    highlights: ['Durango & Silverton', 'Grand Canyon Railway', 'Georgetown Loop', 'Rovos Rail (Africa)', 'Rocky Mountain Explorer', 'Denali Star (Alaska)', 'Colorado Rockies Loop'],
    color: '#2E7D5B',
  },
  {
    name: 'European River Cruises',
    img: 'https://images.unsplash.com/photo-1467189386127-c4e5e31ee213?w=800&q=80',
    tagline: "Sail Europe's legendary waterways",
    description: "Combine the romance of rail with a luxury river cruise through Europe's most storied destinations. Float along the Rhine, Danube, and Moselle past castles, vineyards, and medieval towns — then step ashore to explore at your own pace.",
    highlights: ['Rhine River', 'Danube River', 'Moselle Valley', 'Amsterdam', 'Budapest', 'Vienna', 'Prague', 'Christmas Markets'],
    color: '#0D9FD8',
    brochurePdf: 'https://www.vacationsbyrail.com/ebrochure/vbrcruise26/inc/pdf/VBR_Best_of_River_Cruise_2026.pdf',
  },
  {
    name: 'Scandinavia by Rail',
    img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80',
    tagline: "Fjords, northern lights & Arctic wonder",
    description: "Journey through Norway's dramatic fjords, Sweden's vast forests, and Finland's Arctic landscapes. Experience the iconic Bergen Railway, sail with Hurtigruten, and chase the Northern Lights on one of Europe's most breathtaking rail adventures.",
    highlights: ['Bergen Railway', 'Norway Fjords', 'Northern Lights', 'Hurtigruten Cruise', 'Stockholm', 'Copenhagen', 'Helsinki', 'Arctic Circle'],
    color: '#534AB7',
    brochurePdf: 'https://www.vacationsbyrail.com/ebrochure/vbrscan26/inc/pdf/VBR_Scandinavia_2026.pdf',
  },
];

const types = [
  {
    icon: '🧭',
    title: 'Independent Rail Journeys',
    text: `Travel on your own schedule with a fully planned itinerary — hotels, rail tickets, and transfers all arranged. You go where you want, when you want.`,
  },
  {
    icon: '🎒',
    title: 'Escorted Group Tours',
    text: `Travel with a small group and expert Tour Manager who handles all the logistics. Ideal for first-time rail travelers or anyone who wants a fully guided experience.`,
  },
  {
    icon: '🚢',
    title: 'Rail & Cruise Combos',
    text: `Combine a scenic rail journey with a cruise sailing. Take the train to your departure port, or extend your cruise with a rail adventure on either end.`,
  },
  {
    icon: '🌙',
    title: 'Overnight Sleeper Trains',
    text: `Wake up in a new city without losing a day to travel. Private roomettes and sleeper cars on Amtrak and international routes offer a uniquely romantic way to travel.`,
  },
  {
    icon: '🏔️',
    title: 'Scenic Train Rides',
    text: `Some rail journeys exist purely for the view — through mountain passes, along coastal cliffs, and across open prairies. These are experiences, not just transportation.`,
  },
  {
    icon: '🌍',
    title: 'International Rail Vacations',
    text: `From the Trans-Siberian to Japan's Shinkansen, from the Indian Pacific to Rovos Rail across Africa — Vacations By Rail opens up the world by train.`,
  },
];

export default function VacationsByRailPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', WebkitFontSmoothing: 'antialiased' }}>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: 540, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Image
          src="https://images.unsplash.com/photo-1501554728187-ce583db33af7?w=1600&q=85"
          alt="Scenic train journey through the mountains"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 55%' }}
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.55) 0%, rgba(13,27,42,0.80) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto', padding: 'clamp(80px,12vw,120px) clamp(16px,5vw,32px)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 16, fontFamily: 'var(--font-body)' }}>
            In Partnership with Vacations By Rail
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 700, color: 'white', marginBottom: 20, lineHeight: 1.1 }}>
            See the World by Train
          </h1>
          <p style={{ fontSize: 'clamp(1rem,1.8vw,1.2rem)', color: 'rgba(255,255,255,0.78)', marginBottom: 12, fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
            USA · Canada · Europe · Africa · Asia · Scenic Rail Adventures
          </p>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: 44, fontFamily: 'var(--font-body)' }}>
            Independent journeys, escorted tours, rail & cruise combos, and overnight sleeper trains.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?type=rail-vacation"
              style={{ background: '#C9A84C', color: '#0D1B2A', padding: '14px 36px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              Plan My Rail Vacation
            </Link>
            <a href="tel:8885086893"
              style={{ border: '2px solid rgba(255,255,255,0.45)', color: 'white', padding: '14px 36px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
              Call 888-508-6893
            </a>
          </div>
          <p style={{ marginTop: 20, fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
            Planning is always free — no booking fees, ever
          </p>
        </div>
      </section>

      {/* ANNOUNCEMENT BAR — after hero, no nav conflict */}
      <div style={{ background: '#CC2936', padding: '14px 24px', textAlign: 'center' }}>
        <a href="#deals" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ background: 'white', color: '#CC2936', fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 12px', fontFamily: 'var(--font-body)', borderRadius: 2 }}>
            Save 10%
          </span>
          <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }}>
            Last-minute rail deals departing in the next 90 days — limited spaces available
          </span>
          <span style={{ color: 'white', fontSize: '0.85rem', fontFamily: 'var(--font-body)', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.6)', paddingBottom: 1 }}>
            View Deals ↓
          </span>
        </a>
      </div>

      {/* TYPES OF RAIL VACATIONS */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(48px,6vw,64px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Types of Rail Vacations</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 300, color: 'white', marginBottom: 12 }}>
              Your Journey, Your Way
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.92rem', maxWidth: 540, margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
              Vacations By Rail offers nearly 200 itineraries worldwide — from quick weekend rail getaways to epic cross-continental adventures.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {types.map((t, i) => (
              <div key={i} style={{ padding: '24px 20px', background: 'rgba(255,255,255,0.04)', borderTop: '2px solid #C9A84C' }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 12 }}>{t.icon}</div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white', marginBottom: 8, fontFamily: 'var(--font-body)' }}>{t.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0, fontFamily: 'var(--font-body)' }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section style={{ maxWidth: 1140, margin: '0 auto', padding: 'clamp(56px,7vw,80px) clamp(16px,5vw,32px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Where the Tracks Lead</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 12 }}>
            Rail Destinations We Book
          </h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.92rem', maxWidth: 560, margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
            Every itinerary is customizable — mix rail routes, add hotel nights, include excursions, or combine with a cruise.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {experiences.map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr', gap: 0, background: 'white', overflow: 'hidden', boxShadow: '0 2px 16px rgba(13,27,42,0.08)', minHeight: 280 }}>
              <div style={{ position: 'relative', order: i % 2 === 0 ? 0 : 1, minHeight: 280 }}>
                <Image src={e.img} alt={e.name} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 'clamp(28px,4vw,48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: i % 2 === 0 ? 1 : 0 }}>
                <div style={{ display: 'inline-block', background: e.color, color: 'white', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 14px', marginBottom: 16, fontFamily: 'var(--font-body)' }}>
                  {e.name}
                </div>
                <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 400, color: 'var(--navy)', marginBottom: 10, lineHeight: 1.2 }}>
                  {e.tagline}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--slate)', lineHeight: 1.75, marginBottom: 20, fontFamily: 'var(--font-body)' }}>
                  {e.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
                  {e.highlights.map((h, j) => (
                    <span key={j} style={{ fontSize: '0.72rem', background: 'var(--cream)', color: 'var(--navy)', padding: '4px 10px', fontFamily: 'var(--font-body)', letterSpacing: '0.03em' }}>
                      {h}
                    </span>
                  ))}
                </div>
                {(e as any).brochurePdf ? (
                  <a
                    href={(e as any).brochurePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-block', background: '#C9A84C', color: '#0D1B2A', padding: '11px 28px', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', alignSelf: 'flex-start' }}>
                    Download 2026 Brochure (PDF) ↓
                  </a>
                ) : (
                  <Link href={'/request-quote?type=rail-vacation&region=' + encodeURIComponent(e.name)}
                    style={{ display: 'inline-block', background: 'var(--navy)', color: 'white', padding: '11px 28px', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', alignSelf: 'flex-start' }}>
                    Plan My {e.name} Trip →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY RAIL */}
      <section style={{ background: '#f8f6f0', padding: 'clamp(48px,6vw,64px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 12 }}>Why Travel by Train</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 40 }}>
            Skip the Airport. Enjoy the Journey.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 48, textAlign: 'left' }}>
            {[
              { icon: '🪟', title: 'The View is the Destination', text: `Valleys, mountains, coastlines, and cities pass outside your window at a pace that lets you actually see them.` },
              { icon: '🛋️', title: 'Arrive Rested', text: `Overnight sleeper trains let you wake up in a new city. No early alarms, no airport security, no lost luggage.` },
              { icon: '🏙️', title: 'City Center to City Center', text: `Rail stations are downtown. No 45-minute airport transfers — step off the train and you are already there.` },
              { icon: '🌱', title: 'Lower Environmental Impact', text: `Rail travel produces significantly lower emissions than flying — a meaningful choice for environmentally conscious travelers.` },
            ].map((item, i) => (
              <div key={i} style={{ padding: '20px', background: 'white', borderTop: '2px solid #C9A84C' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: 10 }}>{item.icon}</div>
                <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 8, fontFamily: 'var(--font-body)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--slate)', lineHeight: 1.7, margin: 0, fontFamily: 'var(--font-body)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* LATE AVAILABILITY DEALS */}
      <section id="deals" style={{ maxWidth: 1140, margin: '0 auto', padding: 'clamp(48px,6vw,72px) clamp(16px,5vw,32px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#CC2936', color: 'white', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '5px 16px', marginBottom: 16, fontFamily: 'var(--font-body)' }}>
            Limited Availability · Next 90 Days
          </div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 12 }}>
            Last-Minute Rail Deals
          </h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.92rem', maxWidth: 560, margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
            Departing within the next 90 days — spaces are limited. Call us today to lock in your spot.
          </p>
        </div>
        <RailDeals />
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--slate)', fontFamily: 'var(--font-body)', marginBottom: 16 }}>
            See all 157 last-minute departures or call to ask about availability on any itinerary.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?type=rail-vacation&deal=late-availability"
              style={{ background: 'var(--navy)', color: 'white', padding: '12px 32px', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              Request a Quote
            </Link>
            <a href="tel:8885086893"
              style={{ border: '2px solid var(--navy)', color: 'var(--navy)', padding: '12px 32px', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>
              Call 888-508-6893
            </a>
          </div>
        </div>
      </section>
      {/* FINAL CTA */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(56px,7vw,80px) clamp(16px,5vw,32px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.6rem,3vw,2.6rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
            Ready to Book Your Rail Adventure?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: 40, fontFamily: 'var(--font-body)' }}>
            Tell us where you want to go and we will build the perfect rail itinerary — rail passes, hotels, excursions, and transfers all in one package. There is never a planning fee.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?type=rail-vacation"
              style={{ background: '#C9A84C', color: '#0D1B2A', padding: '15px 40px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              Request My Free Quote
            </Link>
            <a href="tel:8885086893"
              style={{ border: '2px solid rgba(255,255,255,0.35)', color: 'white', padding: '15px 40px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
              888-508-6893
            </a>
          </div>
          <p style={{ marginTop: 24, fontSize: '0.72rem', color: 'rgba(255,255,255,0.22)', fontFamily: 'var(--font-body)' }}>
            ASTA Member · CLIA Certified · Vacations By Rail Partner · Florida Seller of Travel ST46414
          </p>
        </div>
      </section>

    </div>
  );
}
