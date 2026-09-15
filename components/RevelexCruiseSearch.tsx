'use client';

import Script from 'next/script';
import { useRef } from 'react';

// Revelex cruise search widget — replaces the previous Widgety-based
// CruiseSearch component (moved away from Widgety due to cost).
//
// IMPORTANT: uses next/script with strategy="afterInteractive" rather
// than manual DOM script injection (the prior approach). Revelex's own
// integration guide specifies the script belongs in the page's HEAD,
// loaded during normal page load -- manually injecting it later via a
// useEffect appears to break the widget's own initialization timing,
// since it never successfully bound to the viewport div in testing
// despite the div and data file both being present and correct.
export default function RevelexCruiseSearch() {
  const widgetRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', minHeight: 400 }}>
      <link rel="stylesheet" href="/revelex/app.css" />
      <div
        ref={widgetRef}
        className="rvlx-widget-viewport"
        data-rvlx-widget
        data-rvlx-endpoint="https://vacationresults.us.ensembletravel.com/"
        data-rvlx-id="CTW00048158"
      />
      <Script
        src="/revelex/app.bundle.js"
        strategy="afterInteractive"
        onLoad={() => {
          // eslint-disable-next-line no-console
          console.log('[Revelex widget] script loaded');
        }}
      />
    </div>
  );
}
