'use client';

import { useEffect } from 'react';

// Revelex cruise search widget — replaces the previous Widgety-based
// CruiseSearch component (moved away from Widgety due to cost).
// The widget is a self-contained third-party bundle: it renders itself
// into the div below once app.bundle.js loads and finds the
// data-rvlx-widget attribute. Assets are hosted locally under
// public/revelex/ rather than fetched from Revelex's own CDN.
export default function RevelexCruiseSearch() {
  useEffect(() => {
    // Load the widget's stylesheet once, only on the client.
    const existing = document.querySelector('link[data-revelex-css]');
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/revelex/app.css';
      link.setAttribute('data-revelex-css', 'true');
      document.head.appendChild(link);
    }

    // Load the widget's script once. It self-initializes against any
    // element with [data-rvlx-widget] present in the DOM at load time,
    // so this must run after the div below has mounted.
    const existingScript = document.querySelector('script[data-revelex-js]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = '/revelex/app.bundle.js';
      script.defer = true;
      script.setAttribute('data-revelex-js', 'true');
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div style={{ minHeight: 400 }}>
      <div
        className="rvlx-widget-viewport"
        data-rvlx-widget
        data-rvlx-endpoint="https://b2cdemo.revelex.com/"
      />
    </div>
  );
}
