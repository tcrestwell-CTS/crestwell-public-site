import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crestwell Travel Services',
  robots: { index: false },
};

const slides = [
  {
    bg: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=90',
    headline: 'Caribbean Cruises',
    sub: 'Bahamas · Cozumel · Aruba · Grand Cayman',
    cta: 'Planning is always FREE',
  },
  {
    bg: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=1920&q=90',
    headline: 'Mediterranean Getaways',
    sub: 'Santorini · Rome · Barcelona · Venice',
    cta: 'Planning is always FREE',
  },
  {
    bg: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&q=90',
    headline: 'Alaska Adventures',
    sub: 'Glaciers · Wildlife · Fjords · Wilderness',
    cta: 'Planning is always FREE',
  },
  {
    bg: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=90',
    headline: 'All-Inclusive Resorts',
    sub: 'Cancún · Punta Cana · Jamaica · St. Lucia',
    cta: 'Planning is always FREE',
  },
];

export default function DisplayPage() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; overflow: hidden; background: #0D1B2A; }
        @keyframes fadeSlide {
          0%   { opacity: 0; transform: scale(1.04); }
          8%   { opacity: 1; transform: scale(1); }
          88%  { opacity: 1; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(1.04); }
        }
        @keyframes ticker {
          0%   { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .slide { animation: fadeSlide 10s ease-in-out infinite; }
        .slide:nth-child(1) { animation-delay: 0s; }
        .slide:nth-child(2) { animation-delay: 10s; }
        .slide:nth-child(3) { animation-delay: 20s; }
        .slide:nth-child(4) { animation-delay: 30s; }
        .ticker-track { animation: ticker 30s linear infinite; white-space: nowrap; }
      `}</style>

      <div style={{ position: 'fixed', inset: 0, fontFamily: 'Georgia, serif' }}>

        {/* SLIDES */}
        {slides.map((s, i) => (
          <div key={i} className="slide" style={{
            position: 'absolute', inset: 0, opacity: 0,
            backgroundImage: `url(${s.bg})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}>
            {/* Dark overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,27,42,0.9) 0%, rgba(13,27,42,0.4) 60%, rgba(13,27,42,0.3) 100%)' }} />

            {/* Content */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '8vh 8vw 14vh' }}>
              <div style={{ fontSize: '1.2vw', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '1.5vh', fontFamily: 'Arial, sans-serif', fontWeight: 400 }}>
                Crestwell Travel Services
              </div>
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 7rem)', fontWeight: 700, color: 'white', lineHeight: 1.05, marginBottom: '2vh', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
                {s.headline}
              </h1>
              <p style={{ fontSize: 'clamp(1.2rem, 2.2vw, 2.5rem)', color: 'rgba(255,255,255,0.75)', marginBottom: '3vh', fontFamily: 'Arial, sans-serif', letterSpacing: '0.04em' }}>
                {s.sub}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2vw' }}>
                <span style={{ background: '#C9A84C', color: '#0D1B2A', padding: '1.2vh 3vw', fontSize: 'clamp(1rem, 1.6vw, 1.8rem)', fontWeight: 700, fontFamily: 'Arial, sans-serif', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {s.cta}
                </span>
                <span style={{ fontSize: 'clamp(1.2rem, 2vw, 2.2rem)', color: 'white', fontFamily: 'Arial, sans-serif', fontWeight: 300, letterSpacing: '0.02em' }}>
                  888-508-6893
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* LOGO BAR — top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3vh 5vw', background: 'linear-gradient(to bottom, rgba(13,27,42,0.8), transparent)', zIndex: 10 }}>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.5rem, 2.5vw, 3rem)', fontWeight: 500, color: 'white', lineHeight: 1 }}>Crestwell</div>
            <div style={{ fontSize: 'clamp(0.5rem, 0.8vw, 1rem)', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: 'Arial, sans-serif', marginTop: '0.4vh' }}>Travel Services</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'clamp(1rem, 1.8vw, 2rem)', color: 'white', fontFamily: 'Arial, sans-serif', fontWeight: 300 }}>crestwellgetaways.com</div>
            <div style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.8rem)', color: '#C9A84C', fontFamily: 'Arial, sans-serif', fontWeight: 700, marginTop: '0.5vh' }}>ASTA Member · CLIA Certified</div>
          </div>
        </div>

        {/* TICKER — bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '7vh', background: 'rgba(13,27,42,0.92)', borderTop: '2px solid #C9A84C', display: 'flex', alignItems: 'center', overflow: 'hidden', zIndex: 10 }}>
          <div className="ticker-track" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.6rem)', color: 'rgba(255,255,255,0.85)', fontFamily: 'Arial, sans-serif', letterSpacing: '0.04em' }}>
            🚢 Caribbean Cruises &nbsp;·&nbsp; 🌍 European River Cruises &nbsp;·&nbsp; 🏖 All-Inclusive Resorts &nbsp;·&nbsp; 🏔 Alaska Expeditions &nbsp;·&nbsp; 🌊 Mediterranean Sailings &nbsp;·&nbsp; ✈️ Group Travel Specialists &nbsp;·&nbsp; 📞 Call 888-508-6893 &nbsp;·&nbsp; 🌐 crestwellgetaways.com &nbsp;·&nbsp; ⭐ Planning is ALWAYS FREE &nbsp;·&nbsp; 🚢 Caribbean Cruises &nbsp;·&nbsp; 🌍 European River Cruises &nbsp;·&nbsp; 🏖 All-Inclusive Resorts
          </div>
        </div>

      </div>
    </>
  );
}
