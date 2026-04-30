"use client";
import { useEffect } from "react";

export default function TrustpilotWidget() {
  useEffect(() => {
    // Re-initialize Trustpilot widgets after React hydration
    if (typeof window !== "undefined" && (window as any).Trustpilot) {
      (window as any).Trustpilot.loadFromElement(
        document.querySelector(".trustpilot-widget")
      );
    }
  }, []);

  return (
    <div
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
