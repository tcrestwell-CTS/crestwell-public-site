import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import BlackFridayDeals from '@/components/BlackFridayDeals';

export const metadata: Metadata = {
  title: 'Black Friday Cruise Deals 2026 | Crestwell Travel Services',
  description: 'Current Black Friday cruise offers from Royal Caribbean, Celebrity, Norwegian, Virgin Voyages, Cunard, MSC and Azamara, with end dates. Request a free quote from Crestwell Travel Services.',
  alternates: { canonical: 'https://crestwellgetaways.com/black-friday-cruise-deals' },
  openGraph: {
    title: 'Black Friday Cruise Deals 2026 | Crestwell Travel Services',
    description: 'Seven cruise lines, current offers and end dates in one place. Planning is always free.',
    url: 'https://crestwellgetaways.com/black-friday-cruise-deals',
    siteName: 'Crestwell Travel Services',
    type: 'website',
  },
};

const PHONE = '888-508-6893';

export default function BlackFridayCruiseDealsPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', WebkitFontSmoothing: 'antialiased' }}>
      <section style={{ position: 'relative', minHeight: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <Image
          src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1600&q=85"
          alt="Cruise ship sailing in the Caribbean"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,27,42,0.74) 0%, rgba(13,27,42,0.88) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 780, margin: '0 auto', padding: 'clamp(72px,10vw,104px) clamp(16px,5vw,32px)', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: '#CC2936', color: 'white', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '6px 20px', marginBottom: 24, fontFamily: 'var(--font-body)' }}>
            Black Friday 2026 · Updated Nov 17
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.3rem,6vw,4rem)', fontWeight: 600, color: 'white', margin: '0 0 16px', lineHeight: 1.06 }}>
            Black Friday Cruise Deals
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.18rem)', color: 'rgba(255,255,255,0.85)', margin: '0 auto 30px', maxWidth: 620, fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
            Every current offer from seven cruise lines in one place, with the dates they end. Tell us where you want to sail and we will find the best one for your trip.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote?source=black-friday-2026&utm_source=black_friday_page&utm_medium=web&utm_campaign=black_friday_2026"
              style={{ background: '#C9A84C', color: '#0D1B2A', padding: '15px 36px', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              Request my free quote
            </Link>
            <a href={`tel:${PHONE.replace(/-/g, '')}`}
              style={{ border: '2px solid rgba(255,255,255,0.5)', color: 'white', padding: '15px 36px', textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem', fontFamily: 'var(--font-body)' }}>
              {PHONE}
            </a>
          </div>
          <p style={{ marginTop: 20, fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>Planning is always free · No booking fees</p>
        </div>
      </section>

      <section style={{ background: '#C9A84C', padding: '13px 20px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: '#0D1B2A', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
          Several offers end Nov 18 to 19. Request a quote today to lock your price.
        </p>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: 'clamp(48px,7vw,80px) clamp(16px,5vw,32px)' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Current Offers</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.7rem,3vw,2.4rem)', fontWeight: 300, color: 'var(--navy)', margin: '0 0 12px' }}>
            Choose Your Cruise Line
          </h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.92rem', maxWidth: 600, margin: '0 auto', fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
            The best offer depends on your dates, destination and stateroom. We compare them for you and book the one that saves you the most.
          </p>
        </div>
        <BlackFridayDeals />
        <p style={{ textAlign: 'center', color: 'var(--slate)', fontSize: '0.88rem', margin: '36px auto 0', maxWidth: 620, fontFamily: 'var(--font-body)', lineHeight: 1.7 }}>
          Other cruise lines are running Black Friday offers too. Ask us about any ship or destination, even if you do not see it listed here.
        </p>
      </section>

      <section style={{ background: 'var(--navy)', padding: 'clamp(48px,6vw,72px) clamp(16px,5vw,32px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 12 }}>Why Book With Crestwell</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem,2.5vw,2.1rem)', fontWeight: 300, color: 'white', margin: '0 0 36px' }}>One advisor. Every offer compared.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 18, marginBottom: 40 }}>
            {[
              { title: 'Always free to plan', text: 'No planning fees. We are compensated by the cruise line, not by you.' },
              { title: 'We compare for you', text: 'Offers stack and exclude each other in different ways. We check the terms so you do not have to.' },
              { title: 'Personal service', text: 'Staterooms, dining, excursions and insurance handled by one dedicated advisor.' },
            ].map((x) => (
              <div key={x.title} style={{ padding: '24px 20px', background: 'rgba(255,255,255,0.05)', borderTop: '3px solid #C9A84C', textAlign: 'left' }}>
                <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'white', margin: '0 0 8px', fontFamily: 'var(--font-body)' }}>{x.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0, fontFamily: 'var(--font-body)' }}>{x.text}</p>
              </div>
            ))}
          </div>
          <Link href="/request-quote?source=black-friday-2026&utm_source=black_friday_page&utm_medium=web&utm_campaign=black_friday_2026"
            style={{ background: '#C9A84C', color: '#0D1B2A', padding: '15px 40px', textDecoration: 'none', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', display: 'inline-block' }}>
            Request my free quote
          </Link>
        </div>
      </section>

      <section style={{ padding: '22px clamp(16px,5vw,32px) 36px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--slate)', maxWidth: 780, margin: '0 auto', lineHeight: 1.65, fontFamily: 'var(--font-body)' }}>
          Offers shown were current on November 17, 2026 and are provided by each cruise line. All offers are limited time, subject to availability, and can change or end without notice. &quot;Up to&quot; amounts apply to select sailings and stateroom categories and vary by sailing length. Taxes, fees and port expenses are additional unless stated. Some offers cannot be combined and have blackout dates or other restrictions. Please ask us for the full terms of any offer. Presented by Crestwell Travel Services.
        </p>
      </section>
    </div>
  );
}
