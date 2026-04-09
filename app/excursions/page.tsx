import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import ViatorSearch from "@/components/ViatorSearch";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shore Excursions & Activities | Crestwell Travel Services",
  description: "Browse and book shore excursions, tours, and activities at cruise ports worldwide. Caribbean, Mediterranean, Alaska and beyond — powered by Viator.",
};

export default function ExcursionsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Shore Excursions" }]} />

      {/* Hero */}
      <section style={{ background: "var(--navy)", padding: "72px 32px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&q=80)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
        <div style={{ position: "relative" }}>
          <div className="overline" style={{ marginBottom: 16 }}>300,000+ Experiences Worldwide</div>
          <h1 className="font-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 300, color: "white", lineHeight: 1.15, marginBottom: 20 }}>
            Shore Excursions<br />
            <em style={{ color: "var(--gold-light)" }}>& Destination Activities</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.75 }}>
            From snorkeling in Cozumel to touring the Colosseum in Rome — book verified excursions at every port, backed by millions of traveler reviews.
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {["Caribbean", "Mediterranean", "Alaska", "Europe"].map(r => (
              <span key={r} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(201,168,76,0.4)", color: "rgba(255,255,255,0.8)", padding: "6px 16px", fontSize: "0.75rem", fontFamily: "var(--font-body)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div style={{ background: "var(--cream)", borderBottom: "1px solid #e8e3da", padding: "14px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
          {["✓ Free cancellation on most tours", "✓ Instant confirmation", "✓ Millions of verified reviews", "✓ Expert local guides"].map(t => (
            <span key={t} style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Search */}
      <section style={{ background: "white", padding: "56px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <ViatorSearch
            defaultDestination="caribbean"
            showDestinationFilter={true}
          />
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--navy)", padding: "56px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="overline" style={{ marginBottom: 16 }}>Need Help Choosing?</div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 300, color: "white", marginBottom: 16 }}>
            Let a Specialist Recommend the Best Excursions for Your Itinerary
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: 32 }}>
            We know which excursions are worth it at every port — and which ones to skip.
          </p>
          <Link href="/request-quote?trip_type=Shore+Excursion" className="btn-primary" style={{ textDecoration: "none" }}>
            Ask a Travel Specialist
          </Link>
        </div>
      </section>
    </>
  );
}
