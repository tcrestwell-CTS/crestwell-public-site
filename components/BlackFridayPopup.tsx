'use client';

import { useEffect, useRef, useState } from 'react';

const QUOTE_URL = '/request-quote?utm_source=site_popup&utm_medium=popup&utm_campaign=black_friday_2026';
const SHOW_DELAY_MS = 3000;
export const POPUP_CLOSED_EVENT = 'cts:priority-popup-closed';

function track(event: string) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, promo: 'black-friday-cruise-2026' });
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, { promo: 'black-friday-cruise-2026' });
  }
}

export default function BlackFridayPopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Tell other popups to wait for this one.
    (window as unknown as { __ctsPriorityPopup?: boolean }).__ctsPriorityPopup = true;
    const id = window.setTimeout(() => {
      setOpen(true);
      track('promo_popup_view');
    }, SHOW_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  const close = () => {
    setOpen(false);
    (window as unknown as { __ctsPriorityPopup?: boolean }).__ctsPriorityPopup = false;
    window.dispatchEvent(new Event(POPUP_CLOSED_EVENT));
  };

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
    <div className="bf-popup-backdrop" onClick={close}>
      <div
        className="bf-popup"
        role="dialog"
        aria-modal="true"
        aria-label="Black Friday cruise deals"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="bf-popup-close" onClick={close} aria-label="Close">
          ×
        </button>
        <a href={QUOTE_URL} onClick={() => track('promo_popup_click')} className="bf-popup-link">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/black-friday-cruise.jpg"
            alt="Black Friday cruise deals from Crestwell: Royal Caribbean, Celebrity, Norwegian, Virgin Voyages and Cunard. Request your free quote."
            width={1080}
            height={1350}
          />
        </a>
        <a href={QUOTE_URL} onClick={() => track('promo_popup_click')} className="bf-popup-cta">
          Request your free quote
        </a>
      </div>
      <style>{`
        .bf-popup-backdrop{position:fixed;inset:0;z-index:2100;background:rgba(13,27,42,.72);display:flex;align-items:center;justify-content:center;padding:16px;animation:bfFade .25s ease}
        .bf-popup{position:relative;display:flex;flex-direction:column;align-items:center;gap:10px;max-height:calc(100dvh - 32px)}
        .bf-popup-link{display:block;min-height:0;line-height:0}
        .bf-popup-link img{display:block;width:auto;height:auto;max-width:min(92vw,520px);max-height:calc(100dvh - 100px);border-radius:4px;box-shadow:0 24px 60px rgba(0,0,0,.45)}
        .bf-popup-cta{background:var(--gold,#c9a84c);color:var(--navy,#0d1b2a);text-decoration:none;padding:12px 28px;font-weight:600;font-size:14px;letter-spacing:.06em;text-transform:uppercase}
        .bf-popup-close{position:absolute;top:-10px;right:-10px;z-index:2;width:36px;height:36px;border-radius:50%;border:0;background:rgba(255,255,255,.95);color:#0d1b2a;font-size:24px;line-height:1;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.4)}
        .bf-popup-close:focus-visible,.bf-popup-cta:focus-visible{outline:2px solid var(--gold,#c9a84c);outline-offset:2px}
        @keyframes bfFade{from{opacity:0}to{opacity:1}}
        @media (prefers-reduced-motion:reduce){.bf-popup-backdrop{animation:none}}
      `}</style>
    </div>
  );
}
