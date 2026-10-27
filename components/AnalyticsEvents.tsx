'use client';

import { useEffect } from 'react';

export default function AnalyticsEvents() {
  useEffect(() => {
    const handleTelClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'click_to_call',
          phone: anchor.getAttribute('href')?.replace('tel:', '') || '',
        });

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'click_to_call', {
            event_category: 'engagement',
            event_label: 'phone_click',
          });
        }
      }
    };

    document.addEventListener('click', handleTelClick);
    return () => document.removeEventListener('click', handleTelClick);
  }, []);

  return null;
}
