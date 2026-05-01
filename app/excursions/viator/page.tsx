"use client";
import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ViatorSearch from "@/components/ViatorSearch";

const CRUISE_PORTS = [
  // Caribbean
  { label: "Nassau, Bahamas",    slug: "nassau",       region: "Caribbean" },
  { label: "Cozumel, Mexico",    slug: "cozumel",      region: "Caribbean" },
  { label: "St. Thomas, USVI",   slug: "st-thomas",    region: "Caribbean" },
  { label: "Grand Cayman",       slug: "grand-cayman", region: "Caribbean" },
  { label: "St. Maarten",        slug: "st-maarten",   region: "Caribbean" },
  { label: "Roatan, Honduras",   slug: "roatan",       region: "Caribbean" },
  { label: "Belize City",        slug: "belize",       region: "Caribbean" },
  // Alaska
  { label: "Juneau, Alaska",     slug: "juneau",       region: "Alaska" },
  { label: "Ketchikan, Alaska",  slug: "ketchikan",    region: "Alaska" },
  { label: "Skagway, Alaska",    slug: "skagway",      region: "Alaska" },
  { label: "Sitka, Alaska",      slug: "sitka",        region: "Alaska" },
  // Mediterranean
  { label: "Rome (Civitavecchia)", slug: "rome",       region: "Mediterranean" },
  { label: "Barcelona, Spain",   slug: "barcelona",    region: "Mediterranean" },
  { label: "Athens (Piraeus)",   slug: "athens",       region: "Mediterranean" },
  { label: "Santorini, Greece",  slug: "santorini",    region: "Mediterranean" },
  { label: "Dubrovnik, Croatia", slug: "dubrovnik",    region: "Mediterranean" },
  { label: "Venice, Italy",      slug: "venice",       region: "Mediterranean" },
  { label: "Lisbon, Portugal",   slug: "lisbon",       region: "Mediterranean" },
];

export default function ViatorPage() {
  const [activePort, setActivePort] = useState("nassau");
  const [cityQuery, setCityQuery] = useState("");

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (cityQuery.trim()) {
      window.open(`https://www.viator.com/search?text=${encodeURIComponent(cityQuery.trim())}&mcid=42383`, "_blank");
    }
  };

  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Excursions", href: "/excursions" }, { name: "Viator" }]} />

      {/* Hero */}
      <section style={{ background: "var(--navy)", padding: "48px 32px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#0057b8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>V</span>
              </div>
              <div>
                <h1 className="font-display" style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 300, color: "white", margin: 0 }}>Viator Excursions</h1>
                <span style={{ fontSize: "0.72rem", color: "#0057b8", background: "rgba(0,87,184,0.2)", border: "1px solid rgba(0,87,184,0.4)", padding: "2px 10px", borderRadius: 20, fontFamily: "var(--font-body)", fontWeight: 600 }}>A TripAdvisor Company</span>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", maxWidth: 500, lineHeight: 1.75, margin: 0, fontFamily: "var(--font-body)" }}>
              300,000+ tours and activities in 190+ countries. Best for cruise port shore excursions, Caribbean islands, Alaska, and the Mediterranean.
            </p>
          </div>
          <Link href="/excursions" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "8px 18px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", borderRadius: 4 }}>← All Platforms</Link>
        </div>
      </section>

      <section style={{ background: "white", padding: "48px 32px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* City Search */}
          <div style={{ marginBottom: 36, padding: "24px 28px", background: "#f8f6f0", borderRadius: 10, border: "1px solid rgba(0,87,184,0.15)" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0057b8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-body)" }}>Search Any Destination</div>
            <p style={{ color: "var(--slate)", fontSize: "0.85rem", fontFamily: "var(--font-body)", marginBottom: 14, lineHeight: 1.6 }}>
              Don&apos;t see your port below? Search any city or destination worldwide.
            </p>
            <form onSubmit={handleCitySearch} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input
                type="text"
                value={cityQuery}
                onChange={e => setCityQuery(e.target.value)}
                placeholder="e.g. Mykonos, Cabo San Lucas, Bali, Cape Town..."
                style={{ flex: "1 1 240px", padding: "12px 16px", border: "1px solid rgba(0,87,184,0.3)", borderRadius: 6, fontSize: "0.9rem", fontFamily: "var(--font-body)", color: "var(--navy)", outline: "none", background: "white" }}
              />
              <button type="submit" style={{ flexShrink: 0, background: "#0057b8", color: "white", border: "none", padding: "12px 28px", borderRadius: 6, fontSize: "0.85rem", fontWeight: 700, fontFamily: "var(--font-body)", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Search →
              </button>
            </form>
          </div>

          {/* Cruise Ports Band */}
          <div style={{ marginBottom: 36, background: "var(--navy)", borderRadius: 10, padding: "24px 28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: "1.2rem" }}>🚢</span>
              <div>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0057b8", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Cruise Port Excursions</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", marginTop: 2 }}>Select a port to load excursions below</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CRUISE_PORTS.map(p => (
                <button
                  key={p.slug}
                  onClick={() => setActivePort(p.slug)}
                  style={{
                    display: "inline-block",
                    background: activePort === p.slug ? "#0057b8" : "rgba(255,255,255,0.08)",
                    border: `1px solid ${activePort === p.slug ? "#0057b8" : "rgba(0,87,184,0.4)"}`,
                    borderRadius: 20,
                    padding: "7px 16px",
                    color: "white",
                    fontSize: "0.8rem",
                    fontFamily: "var(--font-body)",
                    fontWeight: activePort === p.slug ? 700 : 500,
                    cursor: "pointer",
                  }}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Viator Search — driven by active port selection */}
          <ViatorSearch defaultDestination={activePort} showDestinationFilter={true} />
        </div>
      </section>

      {/* Why Viator */}
      <section style={{ background: "#f0f6ff", borderTop: "3px solid #0057b8", padding: "40px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
          {[
            { icon: "🚢", title: "Cruise Ports", desc: "Deepest coverage at every major cruise port worldwide" },
            { icon: "⭐", title: "TripAdvisor Reviews", desc: "Millions of verified traveler reviews integrated" },
            { icon: "🔒", title: "Flexible Booking", desc: "Book now, pay later options on most tours" },
            { icon: "🌍", title: "Global Reach", desc: "190+ countries, 300,000+ experiences" },
          ].map(f => (
            <div key={f.title} style={{ textAlign: "center", padding: "16px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0057b8", marginBottom: 4, fontFamily: "var(--font-body)" }}>{f.title}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--slate)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
