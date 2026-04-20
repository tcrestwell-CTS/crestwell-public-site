import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Domestic Travel Packages | Hotels, Vacation Homes & Packages | Crestwell Travel',
  description: 'Explore domestic travel with Crestwell — luxury vacation homes via Plum Guide, vacation packages via Delta Vacations & American Vacations, and preferred hotel rates at Hilton, Hyatt, Omni, Marriott and more.',
  openGraph: {
    title: 'Domestic Travel | Crestwell Travel Services',
    description: 'Hotels, vacation homes, and packages across the USA — curated and booked by Crestwell Travel.',
    url: 'https://crestwellgetaways.com/domestic-travel',
  },
};

const VACATION_PARTNERS = [
  {
    name: 'Delta Vacations',
    logo: '✈️',
    tagline: 'Fly + Stay packages from Atlanta',
    description: 'As a Delta Vacations partner, Crestwell builds custom flight + hotel packages with Delta Air Lines. Perfect for Southeast travelers flying out of ATL, BNA, or BHM — bundled pricing, flexible dates, and exclusive resort deals.',
    highlights: ['Flight + hotel bundles', 'Delta SkyMiles earnings', 'Flexible cancellation', 'Beach & city packages', 'Family-friendly resorts', 'All-inclusive options'],
    color: '#003DA5',
    link: '/request-quote?type=domestic&partner=delta-vacations',
  },
  {
    name: 'American Vacations',
    logo: '🌎',
    tagline: 'Nationwide packages, unbeatable value',
    description: "Through American Vacations, Crestwell books domestic getaways across the US — from Napa Valley wine country to the Florida Keys. Flexible departure cities, curated properties, and Crestwell's personal touch on every booking.",
    highlights: ['Domestic destinations', 'Flexible departure cities', 'Hotel + air bundles', 'National parks trips', 'City escapes', 'Beach vacations'],
    color: '#8B0000',
    link: '/request-quote?type=domestic&partner=american-vacations',
  },
  {
    name: 'Plum Guide',
    logo: '🏡',
    tagline: "The world's most exceptional vacation homes",
    description: "Plum Guide vets the top 3% of vacation rental homes worldwide — luxury beach houses, mountain retreats, lake cabins, and city penthouses. Every property passes a 150-point inspection. Crestwell books these as curated domestic escapes for couples, families, and groups.",
    highlights: ['Top 3% of homes worldwide', '150-point vetting process', 'Domestic & international', 'Luxury beach houses', 'Mountain & lake retreats', 'City penthouses'],
    color: '#2D6A4F',
    link: '/request-quote?type=domestic&partner=plum-guide',
  },
];

const HOTEL_BRANDS = [
  { name: 'Hilton', code: 'ABCHILTON', perk: 'Preferred rates', url: 'https://www.hilton.com/en/preferred-rates/abc-ccra/' },
  { name: 'Hyatt', code: '18187', perk: 'Corporate rates', url: 'https://www.hyatt.com/' },
  { name: 'Omni Hotels', code: 'ABC Global', perk: '10% off BAR', url: 'https://www.omnihotels.com/exclusive/abc-global-services' },
  { name: 'IHG Hotels', code: '000670065', perk: 'Up to 7% off BAR', url: 'https://www.ihg.com' },
  { name: 'Choice Hotels', code: 'IATA/CLIA', perk: '10% off BAR', url: 'https://www.choicehotels.com/travel-professionals' },
  { name: 'Radisson', code: 'IATA/ARC', perk: 'Up to 10% off BAR', url: 'https://www.radissonhotels.com' },
  { name: 'Wyndham', code: '8000000058', perk: 'Up to 5% off BAR', url: 'https://wyndham.com' },
  { name: 'Melia Hotels', code: '00600123JLN', perk: '10% off + 12–16% commission', url: 'https://www.meliapro.com' },
  { name: 'Virgin Hotels', code: 'CONABC', perk: 'Up to 10% off BAR', url: 'https://www.virginhotels.com' },
  { name: 'Preferred Hotels', code: 'ABCCR21', perk: 'Up to 10% off BAR', url: 'https://preferredhotels.com' },
  { name: 'MGM Resorts', code: 'Agency #', perk: 'Travel Elite Access', url: 'https://www.mgmresorts.com/en/company/travel-elite-access/how-to-book.html' },
  { name: 'Small Luxury Hotels', code: 'IATA/CLIA', perk: 'Standard commission', url: 'https://slh.com/abc_ccra' },
];

const DESTINATIONS = [
  { name: 'Nashville, TN', img: 'https://images.unsplash.com/photo-1545419913-775e3b49ed7e?w=600&q=80', tags: ['Music City', 'Honky-tonks', 'Culinary scene'] },
  { name: 'Smoky Mountains', img: 'https://images.unsplash.com/photo-1574120809222-ae70b4a5e2f4?w=600&q=80', tags: ['Gatlinburg', 'Pigeon Forge', 'Hiking & cabins'] },
  { name: 'Florida Gulf Coast', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', tags: ['Destin', '30A', 'Clearwater Beach'] },
  { name: 'New Orleans, LA', img: 'https://images.unsplash.com/photo-1568347877321-f8935c7dc5f5?w=600&q=80', tags: ['French Quarter', 'Jazz & cuisine', 'Festivals'] },
  { name: 'Savannah, GA', img: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=600&q=80', tags: ['Historic squares', 'Riverfront', 'Southern charm'] },
  { name: 'Charleston, SC', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', tags: ['Antebellum homes', 'King Street', 'Beaches'] },
];

export default function DomesticTravelPage() {
  return (
    <>
      <Breadcrumb items={[{ name: 'Home', href: '/' }, { name: 'Domestic Travel' }]} />

      {/* Hero */}
      <section style={{ position: 'relative', height: 'clamp(420px, 65vh, 600px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1800&q=85)', backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,27,42,0.2) 0%, rgba(13,27,42,0.8) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: 'clamp(32px,5vw,64px) clamp(16px,5vw,32px)' }}>
          <div style={{ maxWidth: 720 }}>
            <div className="overline" style={{ color: 'var(--gold)', marginBottom: 16 }}>Domestic Travel</div>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 300, color: 'white', lineHeight: 1.05, marginBottom: 20, letterSpacing: '-0.02em' }}>
              Explore America — Your Way
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: 580, lineHeight: 1.7, marginBottom: 28 }}>
              Luxury vacation homes, flight + hotel packages, and preferred rates at the nation's top hotel brands — all curated and booked by Crestwell's advisors. No booking fees. Expert guidance. Always.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/request-quote?type=domestic" className="btn-primary" style={{ textDecoration: 'none' }}>Plan My Domestic Trip</Link>
              <Link href="#hotels" style={{ padding: '12px 24px', border: '1px solid rgba(255,255,255,0.3)', color: 'white', textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>View Hotel Partners</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Highlights */}
      <section style={{ background: 'white', padding: 'clamp(56px,7vw,96px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Our Partners</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 16 }}>Vacation Packages & Stays</h2>
            <p style={{ color: 'var(--slate)', fontSize: '0.95rem', maxWidth: 560, margin: '0 auto', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
              Crestwell partners with industry leaders to bring you the best domestic travel options — from luxury vacation homes to flight-inclusive packages.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px),1fr))', gap: 32 }}>
            {VACATION_PARTNERS.map((p) => (
              <div key={p.name} style={{ border: '1px solid rgba(13,27,42,0.1)', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: p.color, padding: '28px 28px 24px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 10 }}>{p.logo}</div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white', margin: '0 0 6px', fontFamily: 'var(--font-body)' }}>{p.name}</h3>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.9)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>{p.tagline}</div>
                </div>
                <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ color: 'var(--slate)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: 20, fontFamily: 'var(--font-body)' }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                    {p.highlights.map(h => (
                      <span key={h} style={{ fontSize: '0.7rem', padding: '4px 10px', background: '#f4f1eb', color: 'var(--navy)', borderRadius: 4, fontFamily: 'var(--font-body)', letterSpacing: '0.03em' }}>{h}</span>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Domestic Destinations */}
      <section style={{ background: '#f8f6f0', padding: 'clamp(56px,7vw,96px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>From the Southeast</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 12 }}>Popular Domestic Getaways</h2>
            <p style={{ color: 'var(--slate)', fontSize: '0.92rem', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>Perfect for long weekends, anniversary trips, and family reunions.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,280px),1fr))', gap: 20 }}>
            {DESTINATIONS.map((d) => (
              <Link key={d.name} href={'/request-quote?destination=' + encodeURIComponent(d.name) + '&type=domestic'} style={{ textDecoration: 'none', borderRadius: 8, overflow: 'hidden', display: 'block', position: 'relative' }}>
                <div style={{ height: 220, backgroundImage: 'url(' + d.img + ')', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(13,27,42,0.85) 100%)', borderRadius: 8 }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 18px' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white', fontFamily: 'var(--font-body)', marginBottom: 6 }}>{d.name}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {d.tags.map(t => (
                      <span key={t} style={{ fontSize: '0.62rem', padding: '2px 7px', background: 'rgba(201,168,76,0.25)', border: '1px solid rgba(201,168,76,0.4)', color: 'var(--gold)', borderRadius: 3, fontFamily: 'var(--font-body)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Partners */}
      <section id="hotels" style={{ background: 'var(--navy)', padding: 'clamp(56px,7vw,96px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ color: 'var(--gold)', marginBottom: 12 }}>Preferred Hotel Program</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
              Exclusive Hotel Rates
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.92rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
              As an ABC Global Services affiliate, Crestwell accesses negotiated rates at hundreds of hotel brands nationwide — from boutique luxury to major chains. No markup. Just better prices than booking direct.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,240px),1fr))', gap: 16, marginBottom: 48 }}>
            {HOTEL_BRANDS.map((h) => (
              <div key={h.name} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '20px 22px' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'white', marginBottom: 6, fontFamily: 'var(--font-body)' }}>{h.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 8 }}>{h.perk}</div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)' }}>Code: {h.code}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', padding: '32px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8 }}>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.92rem', fontFamily: 'var(--font-body)', lineHeight: 1.7, marginBottom: 20 }}>
              Tell us where you want to stay and we&apos;ll find the best rate — no booking fees, ever.
            </p>
            <Link href="/request-quote?type=hotel" className="btn-primary" style={{ textDecoration: 'none' }}>Get My Hotel Rate →</Link>
          </div>
        </div>
      </section>

      {/* Why Book with Crestwell */}
      <section style={{ background: 'white', padding: 'clamp(56px,7vw,96px) clamp(16px,5vw,32px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div className="overline" style={{ marginBottom: 12 }}>Why Crestwell</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 48 }}>The Crestwell Difference</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 32, textAlign: 'left' }}>
            {[
              { icon: '🏷️', title: 'No Booking Fees', text: 'Planning is always free. You only pay for your trip, never our time.' },
              { icon: '🤝', title: 'Preferred Access', text: 'We access negotiated hotel rates and partner pricing not available to the public.' },
              { icon: '📞', title: 'Personal Service', text: 'Every booking comes with a real advisor based in Chattanooga, TN.' },
              { icon: '🛡️', title: 'ASTA & CLIA Certified', text: "Fully accredited with the industry's top professional organizations." },
            ].map((item) => (
              <div key={item.title}>
                <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 8, fontFamily: 'var(--font-body)' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate)', lineHeight: 1.7, fontFamily: 'var(--font-body)', margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(56px,7vw,80px) clamp(16px,5vw,32px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="overline" style={{ color: 'var(--gold)', marginBottom: 16 }}>Ready to Go?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>Let&apos;s Plan Your Domestic Getaway</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.92rem', lineHeight: 1.7, fontFamily: 'var(--font-body)', marginBottom: 32 }}>
            Tell us where you want to go and we&apos;ll handle the rest — hotels, packages, vacation homes, and everything in between.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?type=domestic" className="btn-primary" style={{ textDecoration: 'none' }}>Request a Free Quote</Link>
            <a href="tel:8885086893" style={{ padding: '13px 28px', border: '1px solid rgba(255,255,255,0.3)', color: 'white', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>888.508.6893</a>
          </div>
        </div>
      </section>
    </>
  );
}
