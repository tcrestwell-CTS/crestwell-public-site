import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import GYGContent from "@/components/GYGContent";

export const metadata: Metadata = {
  title: "GetYourGuide Experiences | Crestwell Travel Services",
  description: "Browse top-rated tours and experiences through GetYourGuide — best for city tours, skip-the-line access, and European destinations.",
  alternates: { canonical: '/excursions/getyourguide' },
  openGraph: {
    title: "GetYourGuide Experiences | Crestwell Travel Services",
    description: "Top-rated tours and experiences through GetYourGuide — city tours, skip-the-line access, and more.",
    url: '/excursions/getyourguide',
    images: ['/images/og-default.jpg'],
  },
};

export default function GetYourGuidePage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Excursions", href: "/excursions" }, { name: "GetYourGuide" }]} />

      <section style={{ background: "var(--navy)", padding: "48px 32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#C0392B", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>G</span>
              </div>
              <div>
                <h1 className="font-display" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 300, color: "white", margin: 0 }}>GetYourGuide Experiences</h1>
                <span style={{ fontSize: "0.72rem", color: "#C0392B", background: "rgba(192,57,43,0.2)", border: "1px solid rgba(192,57,43,0.4)", padding: "2px 10px", borderRadius: 20, fontFamily: "var(--font-body)", fontWeight: 600 }}>Skip-the-Line Specialists</span>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", maxWidth: 500, lineHeight: 1.75, margin: 0, fontFamily: "var(--font-body)" }}>
              200,000+ curated experiences. Europe&apos;s #1 platform for city tours, museum entry, and skip-the-line access to the world&apos;s top landmarks.
            </p>
          </div>
          <Link href="/excursions" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "8px 18px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", borderRadius: 4 }}>← All Platforms</Link>
        </div>
      </section>

      <section style={{ background: "white", padding: "48px 32px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <GYGContent />
        </div>
      </section>

      <section style={{ background: "#fff5f4", borderTop: "3px solid #C0392B", padding: "40px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
          {[
            { icon: "⚡", title: "Skip-the-Line", desc: "Priority entry at the world's most visited landmarks" },
            { icon: "🎯", title: "Curated Quality", desc: "Vetted local guides and top-rated operators" },
            { icon: "🇪🇺", title: "Europe's Best", desc: "Unmatched coverage across European cities" },
            { icon: "🔄", title: "Flexible Booking", desc: "Free cancellation on thousands of experiences" },
          ].map(f => (
            <div key={f.title} style={{ textAlign: "center", padding: "16px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#C0392B", marginBottom: 4, fontFamily: "var(--font-body)" }}>{f.title}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--slate)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
