'use client';

import { useEffect, useRef } from 'react';

// Revelex cruise search widget — replaces the previous Widgety-based
// CruiseSearch component (moved away from Widgety due to cost).
// The widget is a self-contained third-party bundle: it renders itself
// into the div below once app.bundle.js loads and finds the
// data-rvlx-widget attribute. Assets are hosted locally under
// public/revelex/ rather than fetched from Revelex's own CDN.
export default function RevelexCruiseSearch() {
  const widgetRef = useRef<HTMLDivElement>(null);

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

    // Per Revelex's own dev-mode docs: const widgetInstance =
    // document.querySelectorAll("[data-rvlx-widget]")[0] -- events are
    // documented as being accessed via this specific element, not
    // globally on document. Using the ref directly here is the React
    // equivalent of that same querySelectorAll call. Also listening on
    // document as a fallback in case the widget actually bubbles/dispatches
    // there instead, since the doc doesn't show the exact attachment syntax.
    const loadedEvents = [
      'rvlxWidget.cruise_only.loaded',
      'rvlxWidget.river_only.loaded',
      'rvlxWidget.cruise_tours.loaded',
      'rvlxWidget.river_tours.loaded',
    ];
    const onLoaded = (e: Event) => {
      // eslint-disable-next-line no-console
      console.log('[Revelex widget] initialized:', e.type);
    };
    const widgetEl = widgetRef.current;
    loadedEvents.forEach((evt) => {
      widgetEl?.addEventListener(evt, onLoaded);
      document.addEventListener(evt, onLoaded);
    });

    return () => {
      loadedEvents.forEach((evt) => {
        widgetEl?.removeEventListener(evt, onLoaded);
        document.removeEventListener(evt, onLoaded);
      });
    };
  }, []);

  return (
    // The widget's own CSS has no max-width/centering built in -- it
    // stretches full browser width by default. Wrapped to match this
    // page's established 1280px content container convention.
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', minHeight: 400 }}>
      <div
        ref={widgetRef}
        className="rvlx-widget-viewport"
        data-rvlx-widget
        data-rvlx-endpoint="https://b2cdemo.revelex.com/"
      />
    </div>
  );
}
