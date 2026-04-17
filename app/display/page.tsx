import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crestwell Travel Services',
  robots: { index: false },
};

const slides = [
  { bg: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=90', headline: 'Caribbean Cruises', sub: 'Bahamas · Cozumel · Aruba · Grand Cayman', cta: 'Planning is always FREE', isGiveaway: false, duration: 10 },
  { bg: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=1920&q=90', headline: 'Mediterranean Getaways', sub: 'Santorini · Rome · Barcelona · Venice', cta: 'Planning is always FREE', isGiveaway: false, duration: 10 },
  { bg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90', headline: 'Win a Dinner for Two!', sub: 'Scan the QR code to enter — and tell us about your dream vacation', cta: 'No purchase necessary', isGiveaway: true, duration: 20 },
  { bg: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1920&q=90', headline: 'Alaska Adventures', sub: 'Glaciers · Wildlife · Fjords · Wilderness', cta: 'Planning is always FREE', isGiveaway: false, duration: 10 },
  { bg: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=90', headline: 'All-Inclusive Resorts', sub: 'Cancún · Punta Cana · Jamaica · St. Lucia', cta: 'Planning is always FREE', isGiveaway: false, duration: 10 },
  { bg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90', headline: 'Win a Dinner for Two!', sub: 'Scan the QR code to enter — and tell us about your dream vacation', cta: 'No purchase necessary', isGiveaway: true, duration: 20 },
  { bg: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1920&q=90', headline: 'Holland America Line', sub: 'Alaska · Europe · Caribbean · World Voyages', cta: 'Planning is always FREE', isGiveaway: false, duration: 10 },
  { bg: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1920&q=90', headline: 'Princess Cruises', sub: 'Caribbean · Alaska · Mediterranean · South Pacific', cta: 'Planning is always FREE', isGiveaway: false, duration: 10 },
  { bg: 'https://images.unsplash.com/photo-1467189386127-c4e5e31ee213?w=1920&q=90', headline: 'River Cruises', sub: 'Danube · Rhine · Seine · Douro · Mekong · Amazon', cta: 'Planning is always FREE', isGiveaway: false, duration: 10 },
  { bg: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920&q=90', headline: 'Vacations by Rail', sub: 'National · International · Scenic Routes · Amtrak Vacations', cta: 'Planning is always FREE', isGiveaway: false, duration: 10 },
  { bg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90', headline: 'Win a Dinner for Two!', sub: 'Scan the QR code to enter — and tell us about your dream vacation', cta: 'No purchase necessary', isGiveaway: true, duration: 20 },
  { bg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90', headline: 'Win a Dinner for Two!', sub: 'Scan the QR code to enter — and tell us about your dream vacation', cta: 'No purchase necessary', isGiveaway: true, duration: 20 },
  { bg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90', headline: 'Win a Dinner for Two!', sub: 'Scan the QR code to enter — and tell us about your dream vacation', cta: 'No purchase necessary', isGiveaway: true, duration: 20 },
];

// Compute cumulative delays — each slide starts after all previous slides finish
const DELAYS = slides.reduce<number[]>((acc, s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + slides[i - 1].duration);
  return acc;
}, []);
const TOTAL = slides.reduce((sum, s) => sum + s.duration, 0);

export default function DisplayPage() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; overflow: hidden; background: #0D1B2A; }
        @keyframes fadeSlide {
          0%    { opacity: 0; transform: scale(1.04); }
          5%    { opacity: 1; transform: scale(1); }
          90%   { opacity: 1; transform: scale(1.01); }
          100%  { opacity: 0; transform: scale(1.04); }
        }
        @keyframes ticker {
          0%   { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .slide { animation: fadeSlide var(--dur, 10s) ease-in-out var(--delay, 0s) infinite; }
        .ticker-track { animation: ticker 30s linear infinite; white-space: nowrap; }
      `}</style>

      <div style={{ position: 'fixed', inset: 0, fontFamily: 'Georgia, serif' }}>

        {/* SLIDES */}
        {slides.map((s, i) => (
          <div key={i} className="slide" style={{
            ['--dur' as string]: `${TOTAL}s`,
            ['--delay' as string]: `${DELAYS[i]}s`,
            position: 'absolute', inset: 0, opacity: 0,
            backgroundImage: `url(${s.bg})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}>
            {/* Dark overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,27,42,0.9) 0%, rgba(13,27,42,0.4) 60%, rgba(13,27,42,0.3) 100%)' }} />

            {/* Content */}
            {s.isGiveaway ? (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8vh 6vw' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5vw', maxWidth: 1200, width: '100%' }}>
                  {/* Left: text */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1vw', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '2vh', fontFamily: 'Arial, sans-serif' }}>
                      Crestwell Travel Services
                    </div>
                    <div style={{ display: 'inline-block', background: '#CC2936', color: 'white', fontSize: 'clamp(0.7rem,1.1vw,1.2rem)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 20px', marginBottom: '2vh', fontFamily: 'Arial, sans-serif' }}>
                      🎁 Free Giveaway
                    </div>
                    <h1 style={{ fontSize: 'clamp(2.5rem,5vw,6rem)', fontWeight: 800, color: 'white', lineHeight: 1.05, marginBottom: '2vh', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
                      Win a Dinner<br />for Two!
                    </h1>
                    <p style={{ fontSize: 'clamp(1rem,1.8vw,2rem)', color: 'rgba(255,255,255,0.8)', marginBottom: '3vh', fontFamily: 'Arial, sans-serif', lineHeight: 1.4 }}>
                      Scan the QR code, enter your info,<br />and tell us about your dream vacation.
                    </p>
                    <div style={{ fontSize: 'clamp(0.8rem,1.2vw,1.3rem)', color: 'rgba(255,255,255,0.45)', fontFamily: 'Arial, sans-serif' }}>
                      No purchase necessary · Planning is always FREE
                    </div>
                  </div>
                  {/* Right: QR code */}
                  <div style={{ flexShrink: 0, textAlign: 'center' }}>
                    <div style={{ background: 'white', padding: '20px', borderRadius: 16, display: 'inline-block', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=https%3A%2F%2Fcrestwellgetaways.com%2Fwin&qzone=1&color=0D1B2A"
                        alt="QR code to enter giveaway"
                        width="280"
                        height="280"
                        style={{ display: 'block', borderRadius: 8 }}
                      />
                    </div>
                    <div style={{ marginTop: '1.5vh', fontSize: 'clamp(0.8rem,1.2vw,1.3rem)', color: 'rgba(255,255,255,0.7)', fontFamily: 'Arial, sans-serif', letterSpacing: '0.04em' }}>
                      crestwellgetaways.com/win
                    </div>
                  </div>
                </div>
              </div>
            ) : (
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
            )}
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
