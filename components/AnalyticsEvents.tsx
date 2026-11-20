'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { isPaymentPath } from '@/lib/analytics-config';
import { canSendAnalytics } from '@/lib/track-generate-lead';

export default function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    if (!canSendAnalytics() || !isPaymentPath(pathname)) return;
    const pageLocation = window.location.origin + pathname;
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== 'function') {
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      } as Window['gtag'];
    }
    window.gtag('set', { page_path: pathname, page_location: pageLocation });
  }, [pathname]);

  useEffect(() => {
    const handleTelClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="tel:"]') as HTMLAnchorElement | null;
      if (!anchor || !canSendAnalytics()) return;

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
    };

    document.addEventListener('click', handleTelClick);
    return () => document.removeEventListener('click', handleTelClick);
  }, []);

  return null;
}
