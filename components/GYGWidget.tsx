"use client";
import Script from "next/script";

export default function GYGWidget() {
  return (
    <>
      <Script
        src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
        data-gyg-partner-id="IOXL78H"
        strategy="afterInteractive"
      />
      <div
        data-gyg-widget="auto"
        data-gyg-partner-id="IOXL78H"
        style={{ minHeight: 400 }}
      />
    </>
  );
}
