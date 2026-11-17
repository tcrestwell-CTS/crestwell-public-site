'use client';

import { useEffect, useRef, useState } from 'react';

const TRIP_URL = 'https://app.crestwelltravels.com/group/a0740186471284758657708e';
const SHOW_DELAY_MS = 4000;

function track(event: string) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, trip: 'obama-presidential-center-2027' });
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, { trip: 'obama-presidential-center-2027' });
  }
}

export default function TripPopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const show = () => {
      setOpen(true);
      track('trip_popup_view');
    };
    let id = 0;
    const onClosed = () => {
      window.removeEventListener('cts:priority-popup-closed', onClosed);
      id = window.setTimeout(show, 600);
    };
    id = window.setTimeout(() => {
      // If a priority popup (e.g. Black Friday) is up, wait until it is closed.
      if ((window as unknown as { __ctsPriorityPopup?: boolean }).__ctsPriorityPopup) {
        window.addEventListener('cts:priority-popup-closed', onClosed);
      } else {
        show();
      }
    }, SHOW_DELAY_MS);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('cts:priority-popup-closed', onClosed);
    };
  }, []);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div className="trip-popup-backdrop" onClick={close}>
      <div
        className="trip-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="trip-popup-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="trip-popup-close" onClick={close} aria-label="Close">
          ×
        </button>
        <div className="trip-popup-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/obama-center.jpg"
            alt="The museum tower of the Obama Presidential Center in Jackson Park, Chicago"
            width={800}
            height={1200}
          />
          <span className="trip-popup-credit">Photo: AlphaBeta135, CC0, via Wikimedia Commons</span>
        </div>
        <div className="trip-popup-body">
          <div className="trip-popup-eyebrow">Group Trip · May 20–23, 2027</div>
          <h2 id="trip-popup-title" className="font-display">
            Chicago and the Obama Presidential Center
          </h2>
          <p>
            Spend four days in Chicago with a visit to the Obama Presidential Center in Jackson Park as the focus
            of your stay. Set on the South Side, the center connects you to Barack Obama&apos;s Chicago roots and
            presidential legacy.
          </p>
          <p>
            Beyond Jackson Park, explore a city whose history is written into its neighborhoods, lakefront and
            architecture: the Chicago River, the Loop&apos;s landmark buildings, and its cultural institutions.
          </p>
          <p className="trip-popup-note">
            Center visiting arrangements depend on confirmed opening schedules and admission details for your dates.
          </p>
          <a
            className="trip-popup-cta"
            href={TRIP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('trip_popup_click')}
          >
            View trip details
          </a>
          <button type="button" className="trip-popup-later" onClick={close}>
            Maybe later
          </button>
        </div>
      </div>
      <style>{`
        .trip-popup-backdrop{position:fixed;inset:0;z-index:2000;background:rgba(13,27,42,.72);display:flex;align-items:center;justify-content:center;padding:16px;animation:tpFade .25s ease}
        .trip-popup{position:relative;display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);width:100%;max-width:860px;max-height:calc(100dvh - 32px);background:var(--warm-white,#fffef9);color:var(--text-primary,#0d1b2a);border-radius:4px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.45)}
        .trip-popup-photo{position:relative;min-height:100%;background:var(--navy,#0d1b2a)}
        .trip-popup-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 20%}
        .trip-popup-credit{position:absolute;left:8px;bottom:6px;right:8px;font-size:10px;color:rgba(255,255,255,.85);text-shadow:0 1px 2px rgba(0,0,0,.7)}
        .trip-popup-body{padding:32px 32px 28px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;min-width:0}
        .trip-popup-eyebrow{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8a6d1f;font-weight:600}
        .trip-popup-body h2{font-size:clamp(1.7rem,3.4vw,2.2rem);line-height:1.1;font-weight:500;margin:0;color:var(--navy,#0d1b2a)}
        .trip-popup-body p{margin:0;font-size:15px;line-height:1.6;color:var(--text-secondary,#4a5568)}
        .trip-popup-note{font-size:13px!important;color:var(--slate,#6b7a8d)!important}
        .trip-popup-cta{margin-top:6px;align-self:flex-start;background:var(--navy,#0d1b2a);color:#fff;text-decoration:none;padding:13px 26px;font-weight:600;font-size:14px;letter-spacing:.06em;text-transform:uppercase;border:1px solid var(--gold,#c9a84c)}
        .trip-popup-cta:hover{background:var(--gold,#c9a84c);color:var(--navy,#0d1b2a)}
        .trip-popup-later{align-self:flex-start;background:none;border:0;padding:4px 0;color:var(--slate,#6b7a8d);font:inherit;font-size:13px;cursor:pointer;text-decoration:underline}
        .trip-popup-close{position:absolute;top:8px;right:10px;z-index:2;width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.92);color:#0d1b2a;font-size:24px;line-height:1;cursor:pointer}
        .trip-popup-close:focus-visible,.trip-popup-cta:focus-visible,.trip-popup-later:focus-visible{outline:2px solid var(--gold,#c9a84c);outline-offset:2px}
        @media (max-width:640px){
          .trip-popup{grid-template-columns:1fr;grid-template-rows:170px auto;overflow-y:auto}
          .trip-popup-photo{min-height:170px}
          .trip-popup-photo img{object-position:50% 25%}
          .trip-popup-body{padding:22px 20px 22px;overflow:visible}
        }
        @keyframes tpFade{from{opacity:0}to{opacity:1}}
        @media (prefers-reduced-motion:reduce){.trip-popup-backdrop{animation:none}}
      `}</style>
    </div>
  );
}
