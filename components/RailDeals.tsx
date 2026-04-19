'use client';
import { useEffect, useState } from 'react';

type Deal = {
  name: string;
  url: string;
  price: number;
  days: number | null;
  save: string | null;
  img: string | null;
  desc: string | null;
  months: string | null;
  type: string;
};

export default function RailDeals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('');

  useEffect(() => {
    fetch('/api/rail-deals')
      .then(r => r.json())
      .then(data => {
        setDeals(data.deals || []);
        setSource(data.source || '');
      })
      .catch(() => setDeals([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
      {[1,2,3,4,5,6].map(i => (
        <div key={i} style={{ background: 'white', height: 280, borderRadius: 4, opacity: 0.4, animation: 'pulse 1.5s infinite' }} />
      ))}
      <style>{`@keyframes pulse { 0%,100%{opacity:.4} 50%{opacity:.7} }`}</style>
    </div>
  );

  if (!deals.length) return (
    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>
      <p>Unable to load current deals. Please call <a href="tel:8885086893" style={{ color: 'var(--navy)' }}>888-508-6893</a> for latest availability.</p>
    </div>
  );

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 20 }}>
        {deals.map((deal, i) => (
          <a
            key={i}
            href={'/vacations-by-rail/' + (deal.url.match(/\/tours\/([^/]+)/) || ['','unknown'])[1] + '?vbr=' + encodeURIComponent(deal.url.replace('https://www.vacationsbyrail.com', '')) + '&source=rail-deals'}
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', background: 'white', overflow: 'hidden', boxShadow: '0 2px 12px rgba(13,27,42,0.08)', transition: 'transform 0.2s', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {/* Image */}
            <div style={{ position: 'relative', height: 160, overflow: 'hidden', background: '#0D1B2A' }}>
              {deal.img ? (
                <img src={deal.img} alt={deal.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #0D1B2A, #0D3B6B)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '2rem' }}>🚂</span>
                </div>
              )}
              {deal.save && (
                <div style={{ position: 'absolute', top: 12, left: 12, background: '#CC2936', color: 'white', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px', fontFamily: 'var(--font-body)' }}>
                  {deal.save}
                </div>
              )}
              <div style={{ position: 'absolute', top: 12, right: 12, background: deal.type === 'Escorted' ? '#0D1B2A' : '#C9A84C', color: deal.type === 'Escorted' ? 'white' : '#0D1B2A', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px', fontFamily: 'var(--font-body)' }}>
                {deal.type}
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(13,27,42,0.65)', color: 'rgba(255,255,255,0.7)', fontSize: '0.58rem', textAlign: 'center', padding: '4px', fontFamily: 'var(--font-body)', letterSpacing: '0.06em' }}>
                VIA VACATIONS BY RAIL · BOOK THROUGH CRESTWELL
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '16px 18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 8, lineHeight: 1.3, fontFamily: 'var(--font-body)' }}>
                {deal.name}
              </h3>
              {deal.desc && (
                <p style={{ fontSize: '0.78rem', color: 'var(--slate)', lineHeight: 1.6, marginBottom: 12, flex: 1, fontFamily: 'var(--font-body)' }}>
                  {deal.desc.substring(0, 120)}{deal.desc.length > 120 ? '...' : ''}
                </p>
              )}
              {deal.months && (
                <p style={{ fontSize: '0.7rem', color: '#0D9FD8', fontWeight: 600, marginBottom: 12, fontFamily: 'var(--font-body)', letterSpacing: '0.02em' }}>
                  {deal.months}
                </p>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: 12, marginTop: 'auto' }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--slate)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--font-body)' }}>
                    {deal.days ? `${deal.days} days from` : 'From'}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'var(--font-body)' }}>
                    ${deal.price.toLocaleString()}<span style={{ fontSize: '0.7rem', fontWeight: 400 }}> pp</span>
                  </div>
                </div>
                <div style={{ background: '#C9A84C', color: '#0D1B2A', padding: '8px 16px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                  View Itinerary →
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      {source === 'fallback' && (
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.75rem', color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>
          Showing featured trips · <a href="https://www.vacationsbyrail.com/late-availability/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)' }}>View all deals on vacationsbyrail.com</a>
        </p>
      )}
    </div>
  );
}
