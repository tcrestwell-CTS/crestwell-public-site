import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best of USA by Rail 2026 | Crestwell Travel Services',
  description: 'Browse the Vacations By Rail Best of USA 2026 ebrochure. Discover scenic rail vacations across America — book through Crestwell Travel Services, planning is always free.',
};

export default function USARailBrochurePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>

      {/* Header bar */}
      <div style={{ background: 'var(--navy)', padding: '12px clamp(16px,4vw,32px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C', fontFamily: 'var(--font-body)', marginBottom: 3 }}>
            Via Vacations By Rail
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'white', fontFamily: 'var(--font-body)' }}>
            Best of USA by Rail — 2026 Brochure
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
            See something you like?
          </span>
          <a
            href="/request-quote?type=rail-vacation&source=usa-brochure"
            style={{ background: '#C9A84C', color: '#0D1B2A', padding: '9px 22px', textDecoration: 'none', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.04em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}
          >
            Book with Crestwell
          </a>
          <a
            href="tel:8885086893"
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', textDecoration: 'none', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}
          >
            888-508-6893
          </a>
        </div>
      </div>

      {/* Fullscreen brochure iframe */}
      <iframe
        src="https://www.vacationsbyrail.com/ebrochure/vbrusa26/"
        style={{ flex: 1, border: 'none', width: '100%', display: 'block' }}
        title="Best of USA by Rail 2026 — Vacations By Rail"
        loading="lazy"
        allowFullScreen
      />
    </div>
  );
}
