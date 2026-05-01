"use client";
import Script from "next/script";

interface GYGWidgetProps {
  query?: string;
  title?: string;
}

export default function GYGWidget({ query, title }: GYGWidgetProps) {
  return (
    <>
      <Script
        src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
        data-gyg-partner-id="IOXL78H"
        strategy="afterInteractive"
      />
      {title && (
        <h2
          style={{
            fontFamily: "var(--font-heading, serif)",
            color: "var(--navy, #1a2e4a)",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          {title}
        </h2>
      )}
      <div
        data-gyg-widget="auto"
        data-gyg-partner-id="IOXL78H"
        data-gyg-q={query || undefined}
        style={{ minHeight: 400 }}
      />
    </>
  );
}
