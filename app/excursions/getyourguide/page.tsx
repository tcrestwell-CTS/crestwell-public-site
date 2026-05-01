import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "GetYourGuide Experiences | Crestwell Travel Services",
  description: "Browse 200,000+ curated experiences through GetYourGuide — best for city tours, skip-the-line access, and European destinations.",
};

const GYG_PARTNER = "partner_id=IOXL78H&cmp=share_to_earn";
const GYG_SEARCH = `https://www.getyourguide.com/s/?${GYG_PARTNER}`;
const GYG_HOME = `https://www.getyourguide.com?${GYG_PARTNER}`;

const CRUISE_PORTS = [
  { label: "Nassau, Bahamas", q: "nassau bahamas" },
  { label: "Cozumel, Mexico", q: "cozumel" },
  { label: "St. Thomas", q: "st thomas usvi" },
  { label: "Grand Cayman", q: "grand cayman" },
  { label: "St. Maarten", q: "st maarten" },
  { label: "Belize City", q: "belize city" },
];

const CITY_TOURS = [
  { label: "Rome", q: "rome italy" },
  { label: "Paris", q: "paris france" },
  { label: "Barcelona", q: "barcelona spain" },
  { label: "Athens", q: "athens greece" },
  { label: "Amsterdam", q: "amsterdam" },
  { label: "London", q: "london england" },
  { label: "Florence", q: "florence italy" },
  { label: "Lisbon", q: "lisbon portugal" },
];

const CATEGORIES = [
  { label: "Skip-the-Line", q: "skip the line" },
  { label: "Walking Tours", q: "walking tour" },
  { label: "Food & Wine", q: "food wine tasting" },
  { label: "Museum Entry", q: "museum entry ticket" },
  { label: "Day Trips", q: "day trip" },
  { label: "Private Tours", q: "private tour" },
  { label: "Cooking Classes", q: "cooking class" },
  { label: "Boat Tours", q: "boat tour" },
];

export default function GetYourGuidePage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Excursions", href: "/excursions" }, { name: "GetYourGuide" }]} />

      {/* Hero */}
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
              200,000+ curated experiences in 170+ countries. Europe&apos;s #1 platform for city tours, museum entry, and skip-the-line access to the world&apos;s top landmarks.
            </p>
          </div>
          <Link href="/excursions" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "8px 18px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", borderRadius: 4 }}>← All Platforms</Link>
        </div>
      </section>

      {/* Search Section */}
      <section style={{ background: "white", padding: "48px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* City search bar */}
          <div style={{ marginBottom: 40 }}>
            <h2 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 300, color: "var(--navy)", marginBottom: 16 }}>Search Any Destination</h2>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={GYG_HOME} target="_blank" rel="noopener noreferrer"
                style={{ flex: "1 1 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#C0392B", color: "white", padding: "14px 28px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 6 }}>
                Open GetYourGuide Search →
              </a>
            </div>
          </div>

          {/* Custom City Search */}
          <div style={{ marginBottom: 40, padding: "24px 28px", background: "#fff5f4", borderRadius: 12, border: "1px solid rgba(192,57,43,0.15)" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#C0392B", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12, fontFamily: "var(--font-body)" }}>Search Any City</div>
            <p style={{ color: "var(--slate)", fontSize: "0.85rem", fontFamily: "var(--font-body)", marginBottom: 16, lineHeight: 1.6 }}>Don&apos;t see your destination listed? Type any city name below.</p>
            <form action={GYG_SEARCH} method="get" target="_blank" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input type="hidden" name="partner_id" value="IOXL78H" />
              <input type="hidden" name="cmp" value="share_to_earn" />
              <input
                type="text"
                name="q"
                placeholder="e.g. Santorini, Dubrovnik, Kyoto..."
                style={{ flex: "1 1 240px", padding: "12px 16px", border: "1px solid rgba(192,57,43,0.3)", borderRadius: 6, fontSize: "0.9rem", fontFamily: "var(--font-body)", color: "var(--navy)", outline: "none", background: "white" }}
              />
              <button type="submit" style={{ flexShrink: 0, background: "#C0392B", color: "white", border: "none", padding: "12px 24px", borderRadius: 6, fontSize: "0.85rem", fontWeight: 700, fontFamily: "var(--font-body)", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Search →
              </button>
            </form>
          </div>

          {/* Cruise Ports */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#C0392B", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16, fontFamily: "var(--font-body)" }}>Cruise Ports</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 10 }}>
              {CRUISE_PORTS.map(p => (
                <a key={p.q} href={`${GYG_SEARCH}&q=${encodeURIComponent(p.q)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", background: "#fff5f4", border: "1px solid rgba(192,57,43,0.2)", borderRadius: 8, padding: "14px 16px", textDecoration: "none", color: "var(--navy)", fontSize: "0.85rem", fontFamily: "var(--font-body)", fontWeight: 500, transition: "border-color 0.2s" }}>
                  🚢 {p.label}
                </a>
              ))}
            </div>
          </div>

          {/* Popular Cities */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#C0392B", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16, fontFamily: "var(--font-body)" }}>Popular Cities</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 10 }}>
              {CITY_TOURS.map(c => (
                <a key={c.q} href={`${GYG_SEARCH}&q=${encodeURIComponent(c.q)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "block", background: "#fff5f4", border: "1px solid rgba(192,57,43,0.2)", borderRadius: 8, padding: "14px 16px", textDecoration: "none", color: "var(--navy)", fontSize: "0.85rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                  🏛️ {c.label}
                </a>
              ))}
            </div>
          </div>

          {/* Tour Categories */}
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#C0392B", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16, fontFamily: "var(--font-body)" }}>Browse by Type</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {CATEGORIES.map(cat => (
                <a key={cat.q} href={`${GYG_SEARCH}&q=${encodeURIComponent(cat.q)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-block", background: "#C0392B", color: "white", padding: "8px 18px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, borderRadius: 20 }}>
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why GYG */}
      <section style={{ background: "#fff5f4", borderTop: "3px solid #C0392B", padding: "48px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24 }}>
          {[
            { icon: "⚡", title: "Skip-the-Line", desc: "Priority entry at the world\'s most visited landmarks" },
            { icon: "🎯", title: "Curated Quality", desc: "Deeply vetted local guides and experience operators" },
            { icon: "🇪🇺", title: "Europe\'s Best", desc: "Unmatched coverage across European cities" },
            { icon: "🔄", title: "Easy Cancellation", desc: "Flexible cancellation on most bookings" },
          ].map(f => (
            <div key={f.title} style={{ textAlign: "center", padding: "20px 16px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#C0392B", marginBottom: 6, fontFamily: "var(--font-body)" }}>{f.title}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--slate)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
