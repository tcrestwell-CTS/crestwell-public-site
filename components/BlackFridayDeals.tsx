'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Offer = { headline: string; detail?: string; ends?: string; endsText?: string };
type Deal = { slug: string; line: string; tagline: string; accent: string; offers: Offer[]; fine: string };

// Verified against each cruise line's own travel-advisor promotions on Nov 17, 2026. Update when offers change.
const DEALS: Deal[] = [
  {
    slug: 'royal-caribbean', line: 'Royal Caribbean', tagline: 'Caribbean, Bahamas, Alaska and more', accent: '#0D9FD8',
    offers: [
      { headline: 'Up to $900 instant savings per stateroom', detail: 'Black Friday Preview Sale. Book Nov 17 to 19 on select sailings departing Nov 18, 2026 to Nov 18, 2027.', ends: '2026-11-19' },
      { headline: 'Cruises from $299 + 3rd & 4th guests sail free', detail: 'Black Friday Mega Deals on select sailings.', ends: '2026-11-18' },
      { headline: '60% off your second guest + 3rd & 4th guests sail free', detail: 'November offer on select 3-night and longer sailings. Some holiday dates are excluded.', ends: '2026-12-07' },
      { headline: 'Up to $100 onboard credit per stateroom', detail: 'Cyber Bonus for new bookings made through Nov 25.', ends: '2026-11-25' },
      { headline: 'Next wave: Black Friday Preview Sale, Nov 20 to 23', detail: 'Ask us and we will price it for you the moment it opens.' },
    ],
    fine: 'Savings are per stateroom and vary by stateroom category and sailing length. Taxes, fees and port expenses are additional.',
  },
  {
    slug: 'celebrity-cruises', line: 'Celebrity Cruises', tagline: 'Modern luxury, Alaska to the Mediterranean', accent: '#1E3A8A',
    offers: [
      { headline: '75% off your 2nd guest + up to $900 savings per stateroom', detail: 'Black Friday Kickoff Preview. Book Nov 17 to 18. The largest amounts apply to Suites on 6-night and longer sailings; verandas, Concierge and AquaClass save up to $400 and inside and ocean view up to $200.', ends: '2026-11-18' },
      { headline: 'Extra $100 savings on select Alaska sailings', detail: 'Added to the Kickoff Preview for new bookings Nov 17 to 18.', ends: '2026-11-18' },
    ],
    fine: 'Applies to select 3-night and longer sailings. Excludes Celebrity River Cruises and Galapagos. Savings vary by stateroom category and length of voyage.',
  },
  {
    slug: 'norwegian-cruise-line', line: 'Norwegian Cruise Line', tagline: 'Freestyle cruising with Free at Sea perks', accent: '#0A5C99',
    offers: [
      { headline: 'Up to $1,000 off select staterooms', detail: 'Black Friday Preview Sale on select sailings.', endsText: 'Limited time. Ask us for the exact end date.' },
      { headline: 'Free 2nd guest + free unlimited open bar', detail: 'Free at Sea perks on select sailings. The free 2nd guest is applied as 50% off the cruise fare for both guests in the stateroom.' },
      { headline: 'Kids sail free', detail: 'Kids sail free as 3rd and 4th guests, including Great Stirrup Cay sailings with the Great Tides Waterpark.' },
    ],
    fine: 'Additional charges apply to beverage, specialty dining, Wi-Fi and excursion credits. Studio and Solo categories are not eligible. Some exclusions and restrictions apply.',
  },
  {
    slug: 'virgin-voyages-alaska', line: 'Virgin Voyages', tagline: 'Adults-only luxury, now sailing Alaska', accent: '#CC2936',
    offers: [
      { headline: 'Up to $300 onboard credit + up to $600 in free drinks', detail: 'Book an eligible Alaska voyage, including new Summer 2028 itineraries.', ends: '2026-11-19' },
      { headline: '80% off your Second Sailor', detail: 'Included with the Alaska offer on eligible sailings.', ends: '2026-11-19' },
    ],
    fine: 'Amounts vary by cabin category and sailing length. Eligible sailings and cabin types only.',
  },
  {
    slug: 'cunard', line: 'Cunard', tagline: 'Transatlantic crossings and world voyages', accent: '#8A1C2B',
    offers: [
      { headline: 'Up to 40% off, fares from $999', detail: 'Black Friday Event with a 10% refundable deposit and onboard credit to spend during your voyage. Grill Suites include the Hotel Charge.', ends: '2026-12-07' },
      { headline: 'Up to 35% off + 3rd & 4th guests sail free', detail: 'Savings Event on select sailings with a reduced refundable deposit.', ends: '2026-12-07' },
    ],
    fine: 'Fares are per person, based on double occupancy, on select voyages. A valid passport is required for every Cunard sailing, including domestic ones.',
  },
  {
    slug: 'msc-cruises', line: 'MSC Cruises', tagline: 'Caribbean, Europe, Alaska and beyond', accent: '#1F4E8C',
    offers: [
      { headline: 'Up to 40% off cruises', detail: 'Their Black Friday Sale, billed as MSC\'s best deal ever.', endsText: 'Ends soon. Ask us for the exact date.' },
      { headline: 'Up to $1,000 onboard credit + free balcony upgrade', detail: 'Plus kids sail free. Taxes and government fees are additional for each child.' },
    ],
    fine: 'Rates are per person, based on double occupancy. Offers vary by sailing and are subject to availability.',
  },
  {
    slug: 'azamara', line: 'Azamara', tagline: 'Destination-immersive small-ship cruising', accent: '#4A6A5C',
    offers: [
      { headline: 'Up to $6,000 off + up to $750 onboard credit', detail: 'Black Friday Sale for new bookings Nov 17 to Dec 4 on sailings from Jan 4, 2027 to Apr 2, 2028. Savings vary by stateroom category.', ends: '2026-12-04' },
    ],
    fine: 'Up to $6,000 off the cruise fare for the first and second guest sharing an eligible stateroom. Group bookings are not eligible.',
  },
];

const dayEnd = (d: string) => new Date(`${d}T23:59:59-05:00`).getTime();
const fmt = (d: string) => new Date(`${d}T12:00:00-05:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'America/New_York' });

function track(event: string, line: string) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, promo: 'black-friday-cruise-2026', cruise_line: line });
  if (typeof window.gtag === 'function') window.gtag('event', event, { promo: 'black-friday-cruise-2026', cruise_line: line });
}

export default function BlackFridayDeals() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); }, []);

  const status = (o: Offer): { text: string; tone: 'urgent' | 'ok' | 'ended' | 'plain' } => {
    if (!o.ends) return { text: o.endsText || '', tone: 'plain' };
    if (now === null) return { text: `Ends ${fmt(o.ends)}`, tone: 'ok' };
    const left = dayEnd(o.ends) - now;
    if (left < 0) return { text: 'This offer has ended. Ask us about similar savings.', tone: 'ended' };
    if (left < 36 * 3600_000) return { text: left < 24 * 3600_000 ? `Ends tonight, ${fmt(o.ends)}` : `Ends ${fmt(o.ends)}`, tone: 'urgent' };
    return { text: `Through ${fmt(o.ends)}`, tone: 'ok' };
  };
  const color = { urgent: '#CC2936', ok: '#2E7D5B', ended: '#8a94a3', plain: '#8a6d1f' } as const;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 24 }}>
      {DEALS.map((d) => (
        <article key={d.slug} id={d.slug} style={{ background: 'white', boxShadow: '0 2px 12px rgba(13,27,42,0.08)', display: 'flex', flexDirection: 'column', borderTop: `4px solid ${d.accent}` }}>
          <div style={{ padding: '24px 26px 8px' }}>
            <h3 className="font-display" style={{ fontSize: '1.55rem', fontWeight: 500, color: 'var(--navy)', margin: 0 }}>{d.line}</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>{d.tagline}</p>
          </div>
          <div style={{ padding: '8px 26px 0', flex: 1 }}>
            {d.offers.map((o, i) => {
              const s = status(o);
              const ended = s.tone === 'ended';
              return (
                <div key={i} style={{ padding: '16px 0', borderTop: i ? '1px solid #eef0f3' : 'none', opacity: ended ? 0.55 : 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '1.02rem', lineHeight: 1.35, fontFamily: 'var(--font-body)' }}>{o.headline}</div>
                  {o.detail && <p style={{ margin: '6px 0 0', fontSize: '0.84rem', color: 'var(--slate)', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>{o.detail}</p>}
                  {s.text && <div style={{ marginTop: 8, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: color[s.tone], fontFamily: 'var(--font-body)' }}>{s.text}</div>}
                </div>
              );
            })}
          </div>
          <div style={{ padding: '0 26px 24px' }}>
            <p style={{ fontSize: '0.7rem', color: '#8a94a3', lineHeight: 1.55, margin: '4px 0 16px', fontFamily: 'var(--font-body)' }}>{d.fine}</p>
            <Link
              href={`/request-quote?cruise=${d.slug}&source=black-friday-2026&utm_source=black_friday_page&utm_medium=web&utm_campaign=black_friday_2026`}
              onClick={() => track('bf_deal_click', d.line)}
              style={{ display: 'block', textAlign: 'center', background: 'var(--navy)', color: 'white', padding: '13px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', border: '1px solid #C9A84C' }}
            >
              Get my free {d.line} quote →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
