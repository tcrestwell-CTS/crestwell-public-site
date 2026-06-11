import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Shore Excursions & Tours | Crestwell Travel Services",
  description: "Browse shore excursions and destination activities through Viator, GetYourGuide, and Civitatis — three world-class platforms curated by Crestwell Travel.",
  alternates: { canonical: '/excursions' },
  openGraph: {
    title: "Shore Excursions & Tours | Crestwell Travel Services",
    description: "Shore excursions and destination activities through Viator, GetYourGuide, and Civitatis.",
    url: '/excursions',
    images: ['/images/og-default.jpg'],
  },
};

const providers = [
  {
    id: "viator",
    name: "Viator",
    tagline: "World\'s largest tours & activities marketplace",
    badge: "TripAdvisor Company",
    color: "#0057b8",
    lightBg: "#f0f6ff",
    borderColor: "#0057b8",
    href: "/excursions/viator",
    stats: ["300,000+ experiences", "190+ countries", "TripAdvisor reviews"],
    bestFor: [
      { icon: "🚢", label: "Cruise port shore excursions" },
      { icon: "🌊", label: "Caribbean & Alaska tours" },
      { icon: "🔒", label: "Book now, pay later options" },
      { icon: "⭐", label: "Millions of verified reviews" },
    ],
    description: "Viator is the go-to platform for cruise ship shore excursions. With the deepest coverage at every major Caribbean, Mediterranean, and Alaskan port of call, it\'s the best choice when your clients are looking for activities tied directly to their sailing itinerary.",
    cta: "Browse Viator",
  },
  {
    id: "gyg",
    name: "GetYourGuide",
    tagline: "Europe\'s leading activity & experience platform",
    badge: "Skip-the-Line Specialists",
    color: "#C0392B",
    lightBg: "#fff5f4",
    borderColor: "#C0392B",
    href: "/excursions/getyourguide",
    stats: ["200,000+ experiences", "Skip-the-line access", "Local expert guides"],
    bestFor: [
      { icon: "🏛️", label: "City tours & landmark access" },
      { icon: "⚡", label: "Skip-the-line priority entry" },
      { icon: "🇪🇺", label: "Strongest European coverage" },
      { icon: "🎯", label: "Curated local experiences" },
    ],
    description: "GetYourGuide excels in city-based sightseeing, cultural immersion, and landmark access — especially across Europe and the Mediterranean. When your clients are visiting Rome, Paris, Barcelona, or Athens, GetYourGuide typically offers the best skip-the-line options and local guide experiences.",
    cta: "Browse GetYourGuide",
  },
  {
    id: "civitatis",
    name: "Civitatis",
    tagline: "Free cancellation on thousands of tours worldwide",
    badge: "Free Cancellation Leader",
    color: "#1a7f5a",
    lightBg: "#f0faf6",
    borderColor: "#1a7f5a",
    href: "/excursions/civitatis",
    stats: ["70,000+ activities", "160+ countries", "Free cancellation"],
    bestFor: [
      { icon: "🔄", label: "Free cancellation on most tours" },
      { icon: "🌎", label: "Latin America specialist" },
      { icon: "💰", label: "Competitive pricing" },
      { icon: "🗣️", label: "Spanish-language options" },
    ],
    description: "Civitatis stands out for its generous free cancellation policy and strong Latin American and Spanish-speaking destination coverage. It\'s the ideal platform when clients are visiting Mexico, Costa Rica, Peru, Spain, or Portugal — and want peace of mind with flexible booking terms.",
    cta: "Browse Civitatis",
  },
];

const quickGuide = [
  { dest: "Caribbean Cruise Ports", pick: "Viator", color: "#0057b8" },
  { dest: "Mediterranean Ports", pick: "Viator or GetYourGuide", color: "#555" },
  { dest: "Rome, Paris, Barcelona", pick: "GetYourGuide", color: "#C0392B" },
  { dest: "Alaska Shore Excursions", pick: "Viator", color: "#0057b8" },
  { dest: "Mexico & Latin America", pick: "Civitatis", color: "#1a7f5a" },
  { dest: "Spain & Portugal", pick: "Civitatis", color: "#1a7f5a" },
  { dest: "Landmarks & Museums", pick: "GetYourGuide", color: "#C0392B" },
  { dest: "Beach & Water Activities", pick: "Viator", color: "#0057b8" },
];

export default function ExcursionsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Excursions" }]} />

      {/* Hero */}
      <section style={{ background: "var(--navy)", padding: "72px 32px 60px", textAlign: "center" }}>
        <div className="overline" style={{ marginBottom: 16 }}>500,000+ Experiences Worldwide</div>
        <h1 className="font-display" style={{ fontSize: "clamp(2rem,5vw,3.4rem)", fontWeight: 300, color: "white", lineHeight: 1.2, marginBottom: 20 }}>
          Shore Excursions<br />
          <em style={{ color: "var(--gold-light)" }}>&amp; Destination Activities</em>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.8, fontFamily: "var(--font-body)" }}>
          We partner with three world-class excursion platforms so your clients always get the best selection, pricing, and flexibility — wherever they travel.
        </p>
        {/* Provider quick-nav */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          {providers.map(p => (
            <Link key={p.id} href={p.href} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: `1px solid ${p.color}`, color: "white", padding: "10px 24px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 600, borderRadius: 4, transition: "background 0.2s" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
              {p.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Provider Cards */}
      <section style={{ background: "#f8f6f0", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Three Great Platforms</div>
            <h2 className="font-display" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 300, color: "var(--navy)", marginBottom: 12 }}>
              Find the Perfect Experience for Your Next Adventure
            </h2>
            <p style={{ color: "var(--slate)", fontSize: "0.92rem", maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontFamily: "var(--font-body)" }}>
              Each platform has distinct strengths. Choose a provider below to explore their full catalog with search and filters.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {providers.map((p, idx) => (
              <div key={p.id} style={{ background: "white", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(13,27,42,0.08)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))" }}>
                {/* Left — info */}
                <div style={{ padding: "40px 40px 40px", borderRight: "1px solid rgba(13,27,42,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: "white", fontSize: "1.1rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>{p.name[0]}</span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: 600, color: "var(--navy)", margin: "0 0 4px", fontFamily: "var(--font-body)" }}>{p.name}</h3>
                      <span style={{ fontSize: "0.72rem", background: p.color, color: "white", padding: "2px 10px", borderRadius: 20, fontFamily: "var(--font-body)", fontWeight: 600, letterSpacing: "0.04em" }}>{p.badge}</span>
                    </div>
                  </div>
                  <p style={{ color: "var(--slate)", fontSize: "0.88rem", lineHeight: 1.8, margin: "0 0 24px", fontFamily: "var(--font-body)" }}>{p.description}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                    {p.stats.map(s => (
                      <span key={s} style={{ fontSize: "0.75rem", background: p.lightBg, border: `1px solid ${p.borderColor}22`, color: p.color, padding: "4px 12px", borderRadius: 20, fontFamily: "var(--font-body)", fontWeight: 600 }}>{s}</span>
                    ))}
                  </div>
                  <Link href={p.href} style={{ display: "inline-block", background: p.color, color: "white", padding: "12px 28px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 4 }}>
                    {p.cta} →
                  </Link>
                </div>
                {/* Right — best for */}
                <div style={{ padding: "40px 40px", background: p.lightBg }}>
                  <div style={{ fontSize: "0.7rem", fontWeight: 700, color: p.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20, fontFamily: "var(--font-body)" }}>Best For</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {p.bestFor.map(b => (
                      <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{b.icon}</span>
                        <span style={{ fontSize: "0.88rem", color: "var(--navy)", fontFamily: "var(--font-body)", fontWeight: 500 }}>{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Guide */}
      <section style={{ background: "white", padding: "64px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Quick Reference</div>
            <h2 className="font-display" style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 300, color: "var(--navy)" }}>
              Which Platform by Destination
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {quickGuide.map(q => (
              <div key={q.dest} style={{ background: "#f8f6f0", borderRadius: 8, padding: "18px 20px", borderLeft: `3px solid ${q.color}` }}>
                <div style={{ fontSize: "0.8rem", color: "var(--slate)", fontFamily: "var(--font-body)", marginBottom: 6 }}>{q.dest}</div>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: q.color, fontFamily: "var(--font-body)" }}>→ {q.pick}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not sure CTA */}
      <section style={{ background: "var(--navy)", padding: "56px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div className="overline" style={{ marginBottom: 16 }}>Not Sure Where to Start?</div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 300, color: "white", marginBottom: 16 }}>
            Let Us Recommend the Best Excursions for Your Itinerary
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: 32, fontFamily: "var(--font-body)" }}>
            We know which excursions are worth booking at every port — and which ones to skip. Ask before you book.
          </p>
          <Link href="/request-quote?trip_type=Shore+Excursion" className="btn-primary" style={{ textDecoration: "none" }}>
            Ask a Specialist
          </Link>
        </div>
      </section>
    </>
  );
}
