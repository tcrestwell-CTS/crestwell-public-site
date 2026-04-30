"use client";
import { useEffect, useRef } from "react";

export default function TrustpilotWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tryInit = () => {
      if ((window as any).Trustpilot && ref.current) {
        (window as any).Trustpilot.loadFromElement(ref.current, true);
      }
    };
    tryInit();
    const t = setTimeout(tryInit, 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={ref}
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="56278e9abfbbba0bdcd568bc"
      data-businessunit-id="6893e2a02c5573f00e2a1236"
      data-style-height="52px"
      data-style-width="100%"
      data-token="a187f0e6-f601-4fcd-8806-e63040b80bd9"
    >
      <a
        href="https://www.trustpilot.com/review/crestwellgetaways.com"
        target="_blank"
        rel="noopener"
      >
        Trustpilot
      </a>
    </div>
  );
}
