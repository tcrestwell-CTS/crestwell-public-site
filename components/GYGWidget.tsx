'use client';
import { useEffect } from 'react';

interface GYGWidgetProps {
  query: string;
  title?: string;
}

const PARTNER_ID = 'IOXL78H';

export default function GYGWidget({ query, title = 'Tours & Experiences' }: GYGWidgetProps) {
  useEffect(() => {
    // Load GYG script once
    if (document.querySelector('script[src*="getyourguide"]')) return;
    const script = document.createElement('script');
    script.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-gyg-partner-id', PARTNER_ID);
    document.head.appendChild(script);
  }, []);

  return (
    <section style={{ background: '#f8f6f0', padding: 'clamp(48px,6vw,64px) clamp(16px,5vw,32px)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: 10, fontFamily: 'var(--font-body)' }}>
            Powered by GetYourGuide
          </div>
          <h2 style={{ fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 300, color: 'var(--navy)', fontFamily: 'var(--font-display)', marginBottom: 8 }}>
            {title}
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--slate)', fontFamily: 'var(--font-body)' }}>
            Book tours, experiences & excursions directly through Crestwell Travel
          </p>
        </div>
        <div
          data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
          data-gyg-locale-code="en-US"
          data-gyg-widget="activities"
          data-gyg-number-of-items="3"
          data-gyg-partner-id={PARTNER_ID}
          data-gyg-q={query}
          data-gyg-cmp="share_to_earn"
        />
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a
            href={`https://www.getyourguide.com/s/?q=${encodeURIComponent(query)}&partner_id=${PARTNER_ID}&cmp=share_to_earn`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.82rem', color: 'var(--navy)', fontFamily: 'var(--font-body)', textDecoration: 'underline', letterSpacing: '0.02em' }}
          >
            See all {query} experiences on GetYourGuide →
          </a>
        </div>
      </div>
    </section>
  );
}
