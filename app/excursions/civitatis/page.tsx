import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CivitatisContent from "@/components/CivitatisContent";

export const metadata: Metadata = {
  title: "Civitatis Tours & Activities | Crestwell Travel Services",
  description: "Browse top-rated tours through Civitatis — best for Latin America, Spain, Portugal, and free cancellation options worldwide.",
  alternates: { canonical: '/excursions/civitatis' },
  openGraph: {
    title: "Civitatis Tours & Activities | Crestwell Travel Services",
    description: "Top-rated tours through Civitatis — Latin America, Spain, Portugal, and free cancellation worldwide.",
    url: '/excursions/civitatis',
  },
};

export default function CivitatisPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Excursions", href: "/excursions" }, { name: "Civitatis" }]} />

      <section style={{ background: "var(--navy)", padding: "48px 32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#1a7f5a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>C</span>
              </div>
              <div>
                <h1 className="font-display" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 300, color: "white", margin: 0 }}>Civitatis Tours & Activities</h1>
                <span style={{ fontSize: "0.72rem", color: "#1a7f5a", background: "rgba(26,127,90,0.2)", border: "1px solid rgba(26,127,90,0.4)", padding: "2px 10px", borderRadius: 20, fontFamily: "var(--font-body)", fontWeight: 600 }}>Free Cancellation Leader</span>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", maxWidth: 500, lineHeight: 1.75, margin: 0, fontFamily: "var(--font-body)" }}>
              70,000+ activities across 160+ countries. The top choice for Latin America, Spain, and Portugal — with free cancellation on thousands of tours.
            </p>
          </div>
          <Link href="/excursions" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "8px 18px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", borderRadius: 4 }}>← All Platforms</Link>
        </div>
      </section>

      <section style={{ background: "white", padding: "48px 32px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <CivitatisContent />
        </div>
      </section>

      <section style={{ background: "#f0faf6", borderTop: "3px solid #1a7f5a", padding: "40px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
          {[
            { icon: "🔄", title: "Free Cancellation", desc: "Thousands of tours with generous free cancellation" },
            { icon: "🌎", title: "Latin America Leader", desc: "Unmatched coverage across Mexico, Central & South America" },
            { icon: "💰", title: "Best Prices", desc: "Competitive pricing including many free walking tours" },
            { icon: "🗣️", title: "Multilingual", desc: "Spanish, English, Portuguese tours available" },
          ].map(f => (
            <div key={f.title} style={{ textAlign: "center", padding: "16px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#1a7f5a", marginBottom: 4, fontFamily: "var(--font-body)" }}>{f.title}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--slate)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
