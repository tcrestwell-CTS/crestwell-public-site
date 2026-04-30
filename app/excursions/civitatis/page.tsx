import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Civitatis Tours & Activities | Crestwell Travel Services",
  description: "Browse 70,000+ tours and activities through Civitatis — best for Latin America, Spain, Portugal, and destinations with free cancellation options.",
};

const AG_AID = "95950";
const CIVITATIS_BASE = `https://www.civitatis.com/en`;
const afUrl = (path: string) => `${CIVITATIS_BASE}${path}/?ag_aid=${AG_AID}`;
const searchUrl = (q: string) => `${CIVITATIS_BASE}/s/?ag_aid=${AG_AID}&q=${encodeURIComponent(q)}`;

const CRUISE_PORTS = [
  { label: "Nassau, Bahamas", path: "/nassau" },
  { label: "Cozumel, Mexico", path: "/cozumel" },
  { label: "Cartagena, Colombia", path: "/cartagena" },
  { label: "Cancun, Mexico", path: "/cancun" },
  { label: "Costa Maya", path: "/costa-maya" },
  { label: "Roatan, Honduras", path: "/roatan" },
];

const POPULAR_DESTINATIONS = [
  { label: "Madrid, Spain", path: "/madrid", flag: "🇪🇸" },
  { label: "Barcelona, Spain", path: "/barcelona", flag: "🇪🇸" },
  { label: "Lisbon, Portugal", path: "/lisbon", flag: "🇵🇹" },
  { label: "Rome, Italy", path: "/rome", flag: "🇮🇹" },
  { label: "Buenos Aires", path: "/buenos-aires", flag: "🇦🇷" },
  { label: "Mexico City", path: "/mexico-city", flag: "🇲🇽" },
  { label: "Cusco, Peru", path: "/cusco", flag: "🇵🇪" },
  { label: "Rio de Janeiro", path: "/rio-de-janeiro", flag: "🇧🇷" },
  { label: "Marrakech", path: "/marrakech", flag: "🇲🇦" },
  { label: "Cape Town", path: "/cape-town", flag: "🇿🇦" },
  { label: "Dubai", path: "/dubai", flag: "🇦🇪" },
  { label: "Tokyo", path: "/tokyo", flag: "🇯🇵" },
];

const CATEGORIES = [
  { label: "Free Tours", q: "free tour" },
  { label: "Food Tours", q: "food tour" },
  { label: "Day Trips", q: "day trip" },
  { label: "Private Tours", q: "private tour" },
  { label: "Flamenco Shows", q: "flamenco" },
  { label: "Wine Tasting", q: "wine tasting" },
  { label: "Cooking Classes", q: "cooking class" },
  { label: "Boat Tours", q: "boat tour" },
  { label: "Historical Tours", q: "historical tour" },
  { label: "Night Tours", q: "night tour" },
];

export default function CivitatisPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Excursions", href: "/excursions" }, { name: "Civitatis" }]} />

      {/* Hero */}
      <section style={{ background: "var(--navy)", padding: "48px 32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#1a7f5a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>C</span>
              </div>
              <div>
                <h1 className="font-display" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 300, color: "white", margin: 0 }}>Civitatis Tours &amp; Activities</h1>
                <span style={{ fontSize: "0.72rem", color: "#1a7f5a", background: "rgba(26,127,90,0.2)", border: "1px solid rgba(26,127,90,0.4)", padding: "2px 10px", borderRadius: 20, fontFamily: "var(--font-body)", fontWeight: 600 }}>Free Cancellation Leader</span>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", maxWidth: 520, lineHeight: 1.75, margin: 0, fontFamily: "var(--font-body)" }}>
              70,000+ activities across 160+ countries. The top choice for Latin America, Spain, and Portugal — with free cancellation on thousands of tours and competitive pricing.
            </p>
          </div>
          <Link href="/excursions" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "8px 18px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", borderRadius: 4 }}>← All Platforms</Link>
        </div>
      </section>

      {/* Main Search Section */}
      <section style={{ background: "white", padding: "48px 32px 64px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Open Search CTA */}
          <div style={{ marginBottom: 48, padding: "28px 32px", background: "#f0faf6", borderRadius: 12, border: "1px solid rgba(26,127,90,0.15)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--navy)", fontFamily: "var(--font-body)", marginBottom: 4 }}>Search All Civitatis Destinations</div>
              <div style={{ fontSize: "0.85rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>70,000+ activities with free cancellation available</div>
            </div>
            <a href={afUrl("")} target="_blank" rel="noopener noreferrer"
              style={{ flexShrink: 0, display: "inline-block", background: "#1a7f5a", color: "white", padding: "13px 28px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 6 }}>
              Open Civitatis →
            </a>
          </div>

          {/* Cruise Ports */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1a7f5a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-body)" }}>Cruise Ports</div>
            <p style={{ color: "var(--slate)", fontSize: "0.85rem", fontFamily: "var(--font-body)", marginBottom: 16, lineHeight: 1.6 }}>Perfect for Caribbean cruise port excursions with flexible booking terms.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 10 }}>
              {CRUISE_PORTS.map(p => (
                <a key={p.path} href={afUrl(p.path)} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", background: "#f0faf6", border: "1px solid rgba(26,127,90,0.2)", borderRadius: 8, padding: "14px 18px", textDecoration: "none", color: "var(--navy)", fontSize: "0.85rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                  🚢 {p.label}
                </a>
              ))}
            </div>
          </div>

          {/* Popular Destinations */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1a7f5a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-body)" }}>Popular Destinations</div>
            <p style={{ color: "var(--slate)", fontSize: "0.85rem", fontFamily: "var(--font-body)", marginBottom: 16, lineHeight: 1.6 }}>Civitatis has exceptional coverage across Latin America, Spain, and beyond.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10 }}>
              {POPULAR_DESTINATIONS.map(d => (
                <a key={d.path} href={afUrl(d.path)} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", background: "#f0faf6", border: "1px solid rgba(26,127,90,0.2)", borderRadius: 8, padding: "14px 18px", textDecoration: "none", color: "var(--navy)", fontSize: "0.85rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                  {d.flag} {d.label}
                </a>
              ))}
            </div>
          </div>

          {/* Tour Types */}
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1a7f5a", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, fontFamily: "var(--font-body)" }}>Browse by Type</div>
            <p style={{ color: "var(--slate)", fontSize: "0.85rem", fontFamily: "var(--font-body)", marginBottom: 16, lineHeight: 1.6 }}>Search by experience type across all Civitatis destinations.</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {CATEGORIES.map(cat => (
                <a key={cat.q} href={searchUrl(cat.q)} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-block", background: "#1a7f5a", color: "white", padding: "9px 18px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, borderRadius: 20 }}>
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Civitatis */}
      <section style={{ background: "#f0faf6", borderTop: "3px solid #1a7f5a", padding: "48px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24 }}>
          {[
            { icon: "🔄", title: "Free Cancellation", desc: "Thousands of tours with free cancellation for peace of mind" },
            { icon: "🌎", title: "Latin America Leader", desc: "Unmatched coverage across Mexico, Central & South America" },
            { icon: "💰", title: "Competitive Pricing", desc: "Often the lowest prices on popular city tours" },
            { icon: "🗣️", title: "Multilingual", desc: "Spanish, English, Portuguese tours available" },
          ].map(f => (
            <div key={f.title} style={{ textAlign: "center", padding: "20px 16px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1a7f5a", marginBottom: 6, fontFamily: "var(--font-body)" }}>{f.title}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--slate)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
