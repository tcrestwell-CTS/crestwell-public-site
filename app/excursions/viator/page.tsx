import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ViatorSearch from "@/components/ViatorSearch";

export const metadata: Metadata = {
  title: "Viator Excursions | Crestwell Travel Services",
  description: "Browse 300,000+ shore excursions and activities worldwide through Viator — best for cruise port tours, Caribbean, Alaska, and Mediterranean destinations.",
};

export default function ViatorPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Excursions", href: "/excursions" }, { name: "Viator" }]} />

      {/* Provider Hero */}
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
              300,000+ tours and activities in 190+ countries. Best for cruise port shore excursions, Caribbean islands, Alaska, and anywhere TripAdvisor reviews matter.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Back to All Platforms"].map(l => (
              <Link key={l} href="/excursions" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "8px 18px", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", borderRadius: 4 }}>← All Platforms</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Viator Search */}
      <section style={{ background: "white", padding: "48px 32px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* Free-text city search */}
          <div style={{ marginBottom: 40, padding: "24px 28px", background: "#f8f6f0", borderRadius: 10, border: "1px solid rgba(0,87,184,0.15)" }}>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#0057b8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-body)" }}>Search Any Destination</div>
            <p style={{ color: "var(--slate)", fontSize: "0.85rem", fontFamily: "var(--font-body)", marginBottom: 14, lineHeight: 1.6 }}>
              Don&apos;t see your port or city in the selector below? Search any destination worldwide.
            </p>
            <form action="https://www.viator.com/search" method="get" target="_blank" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <input type="hidden" name="mcid" value="42383" />
              <input
                type="text"
                name="text"
                placeholder="e.g. Juneau, Mykonos, Cape Town, Bali..."
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
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", marginTop: 2 }}>Browse shore excursions at your port of call</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { label: "Nassau, Bahamas", url: "https://www.viator.com/Nassau-Bahamas/d628-ttd?mcid=42383" },
                { label: "Cozumel, Mexico", url: "https://www.viator.com/Cozumel/d629-ttd?mcid=42383" },
                { label: "St. Thomas, USVI", url: "https://www.viator.com/St-Thomas/d660-ttd?mcid=42383" },
                { label: "Grand Cayman", url: "https://www.viator.com/Grand-Cayman/d631-ttd?mcid=42383" },
                { label: "St. Maarten", url: "https://www.viator.com/St-Maarten/d665-ttd?mcid=42383" },
                { label: "Juneau, Alaska", url: "https://www.viator.com/Juneau/d913-ttd?mcid=42383" },
                { label: "Skagway, Alaska", url: "https://www.viator.com/Skagway/d4320-ttd?mcid=42383" },
                { label: "Ketchikan, Alaska", url: "https://www.viator.com/Ketchikan/d911-ttd?mcid=42383" },
                { label: "Rome (Civitavecchia)", url: "https://www.viator.com/Rome/d511-ttd?mcid=42383" },
                { label: "Barcelona, Spain", url: "https://www.viator.com/Barcelona/d562-ttd?mcid=42383" },
                { label: "Athens (Piraeus)", url: "https://www.viator.com/Athens/d496-ttd?mcid=42383" },
                { label: "Dubrovnik, Croatia", url: "https://www.viator.com/Dubrovnik/d4366-ttd?mcid=42383" },
              ].map(p => (
                <a key={p.label} href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-block", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(0,87,184,0.5)", borderRadius: 20, padding: "7px 16px", textDecoration: "none", color: "white", fontSize: "0.8rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                  {p.label}
                </a>
              ))}
            </div>
          </div>

          <ViatorSearch defaultDestination="caribbean" showDestinationFilter={true} />
        </div>
      </section>

      {/* Why Viator */}
      <section style={{ background: "#f0f6ff", borderTop: "3px solid #0057b8", padding: "48px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24 }}>
          {[
            { icon: "🚢", title: "Cruise Ports", desc: "Deepest coverage at every major cruise port worldwide" },
            { icon: "⭐", title: "TripAdvisor Reviews", desc: "Millions of verified traveler reviews integrated" },
            { icon: "🔒", title: "Flexible Booking", desc: "Book now, pay later options on most tours" },
            { icon: "🌍", title: "Global Reach", desc: "190+ countries, 300,000+ experiences" },
          ].map(f => (
            <div key={f.title} style={{ textAlign: "center", padding: "20px 16px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0057b8", marginBottom: 6, fontFamily: "var(--font-body)" }}>{f.title}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--slate)", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
