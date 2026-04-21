import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import ViatorSearch from "@/components/ViatorSearch";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shore Excursions & Activities | Crestwell Travel Services",
  description: "Browse and book shore excursions, tours, and activities worldwide through Viator and GetYourGuide — two of the world's largest verified excursion platforms.",
};

const GYG_URL = "https://www.getyourguide.com?partner_id=IOXL78H&cmp=share_to_earn";
const GYG_SEARCH = "https://www.getyourguide.com/s/?partner_id=IOXL78H&cmp=share_to_earn";

export default function ExcursionsPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Shore Excursions" }]} />

      {/* Hero */}
      <section style={{ background: "var(--navy)", padding: "72px 32px 56px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1800&q=80)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
        <div style={{ position: "relative" }}>
          <div className="overline" style={{ marginBottom: 16 }}>500,000+ Experiences Worldwide</div>
          <h1 className="font-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 300, color: "white", lineHeight: 1.15, marginBottom: 20 }}>
            Shore Excursions<br />
            <em style={{ color: "var(--gold-light)" }}>&amp; Destination Activities</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.75 }}>
            From snorkeling in Cozumel to the Colosseum in Rome — browse verified excursions through two of the world&apos;s largest activity platforms, both available through Crestwell.
          </p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {["Caribbean", "Mediterranean", "Alaska", "Europe", "Hawaii", "Mexico"].map(r => (
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

      {/* Provider Explainer */}
      <section style={{ background: "#f8f6f0", padding: "56px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Two Great Platforms</div>
            <h2 className="font-display" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 300, color: "var(--navy)", marginBottom: 12 }}>
              Viator vs. GetYourGuide — What&apos;s the Difference?
            </h2>
            <p style={{ color: "var(--slate)", fontSize: "0.92rem", maxWidth: 600, margin: "0 auto", lineHeight: 1.75, fontFamily: "var(--font-body)" }}>
              Both are world-class excursion platforms with millions of verified reviews. Each has unique strengths — we partner with both so you always get the best selection.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: 24 }}>

            {/* Viator Card */}
            <div style={{ background: "white", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(13,27,42,0.08)", display: "flex", flexDirection: "column" }}>
              <div style={{ background: "#0057b8", padding: "24px 28px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#0057b8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                  </div>
                  <div>
                    <div style={{ color: "white", fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-body)", letterSpacing: "-0.01em" }}>Viator</div>
                    <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>A TripAdvisor Company</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["300,000+ experiences", "190+ countries", "TripAdvisor backed"].map(tag => (
                    <span key={tag} style={{ background: "rgba(255,255,255,0.15)", color: "white", fontSize: "0.68rem", padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-body)" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ padding: "22px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ color: "var(--slate)", fontSize: "0.88rem", lineHeight: 1.75, margin: 0, fontFamily: "var(--font-body)" }}>
                  Viator is the world&apos;s largest online tours and activities marketplace, backed by TripAdvisor. It&apos;s especially strong for cruise port excursions, with deep coverage at every major Caribbean, Mediterranean, and Alaskan port of call.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { icon: "🚢", text: "Best for: Cruise port shore excursions" },
                    { icon: "⭐", text: "TripAdvisor reviews integrated" },
                    { icon: "🔒", text: "Book now, pay later options" },
                    { icon: "🌍", text: "Widest global coverage" },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ fontSize: "0.95rem", marginTop: 1 }}>{icon}</span>
                      <span style={{ fontSize: "0.83rem", color: "var(--slate)", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* GetYourGuide Card */}
            <div style={{ background: "white", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(13,27,42,0.08)", display: "flex", flexDirection: "column" }}>
              <div style={{ background: "#FF5533", padding: "24px 28px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF5533"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                  </div>
                  <div>
                    <div style={{ color: "white", fontSize: "1.2rem", fontWeight: 700, fontFamily: "var(--font-body)", letterSpacing: "-0.01em" }}>GetYourGuide</div>
                    <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Europe&apos;s #1 Activity Platform</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["200,000+ experiences", "Skip-the-line tickets", "Local expert guides"].map(tag => (
                    <span key={tag} style={{ background: "rgba(255,255,255,0.15)", color: "white", fontSize: "0.68rem", padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-body)" }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{ padding: "22px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <p style={{ color: "var(--slate)", fontSize: "0.88rem", lineHeight: 1.75, margin: 0, fontFamily: "var(--font-body)" }}>
                  GetYourGuide is Europe&apos;s leading activity booking platform, renowned for skip-the-line access to top attractions and deeply curated local experiences. It excels in city sightseeing, cultural tours, and landmark access — especially across Europe and the Mediterranean.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { icon: "🏛️", text: "Best for: City tours & landmark access" },
                    { icon: "⚡", text: "Skip-the-line priority entry" },
                    { icon: "🎯", text: "Deeply curated local experiences" },
                    { icon: "🇪🇺", text: "Strongest European coverage" },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ fontSize: "0.95rem", marginTop: 1 }}>{icon}</span>
                      <span style={{ fontSize: "0.83rem", color: "var(--slate)", fontFamily: "var(--font-body)", lineHeight: 1.5 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ padding: "0 28px 22px" }}>
                <a href={GYG_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#FF5533", color: "white", padding: "10px 24px", textDecoration: "none", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-body)", borderRadius: 4 }}>
                  Browse GetYourGuide →
                </a>
              </div>
            </div>
          </div>

          {/* Quick Guide */}
          <div style={{ marginTop: 28, background: "white", border: "1px solid rgba(13,27,42,0.08)", borderRadius: 8, padding: "22px 28px" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--navy)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14, fontFamily: "var(--font-body)" }}>Quick Guide — Which Platform to Use</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {[
                { dest: "Caribbean Cruise Ports", pick: "Viator", color: "#0057b8" },
                { dest: "Mediterranean Ports", pick: "Either — both excel", color: "#2D6A4F" },
                { dest: "Rome, Paris, Barcelona", pick: "GetYourGuide", color: "#FF5533" },
                { dest: "Alaska Shore Excursions", pick: "Viator", color: "#0057b8" },
                { dest: "Landmarks & Museums", pick: "GetYourGuide", color: "#FF5533" },
                { dest: "Beach & Water Activities", pick: "Viator", color: "#0057b8" },
              ].map(({ dest, pick, color }) => (
                <div key={dest} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--slate)", fontFamily: "var(--font-body)" }}>{dest}</div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color, fontFamily: "var(--font-body)" }}>→ {pick}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Viator Search */}
      <section style={{ background: "white", padding: "56px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#0057b8", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
            </div>
            <div>
              <h2 className="font-display" style={{ fontSize: "1.6rem", fontWeight: 300, color: "var(--navy)", margin: 0 }}>Browse Viator Excursions</h2>
              <p style={{ color: "var(--slate)", fontSize: "0.82rem", margin: 0, fontFamily: "var(--font-body)" }}>300,000+ tours & activities — best for cruise port shore excursions</p>
            </div>
          </div>
          <ViatorSearch defaultDestination="caribbean" showDestinationFilter={true} />
        </div>
      </section>

      {/* GetYourGuide Section */}
      <section style={{ background: "#fff8f7", borderTop: "3px solid #FF5533", padding: "56px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#FF5533", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </div>
            <div>
              <h2 className="font-display" style={{ fontSize: "1.6rem", fontWeight: 300, color: "var(--navy)", margin: 0 }}>Browse GetYourGuide Experiences</h2>
              <p style={{ color: "var(--slate)", fontSize: "0.82rem", margin: 0, fontFamily: "var(--font-body)" }}>200,000+ curated experiences — best for city tours, landmarks &amp; skip-the-line access</p>
            </div>
          </div>

          {/* GYG Category Links */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12, marginBottom: 32 }}>
            {[
              { label: "🏛️ Rome Tours", q: "rome" },
              { label: "🗼 Paris Experiences", q: "paris" },
              { label: "🌊 Caribbean Activities", q: "caribbean" },
              { label: "🏔️ Alaska Adventures", q: "alaska" },
              { label: "🌍 Barcelona Tours", q: "barcelona" },
              { label: "⛵ Athens & Greece", q: "athens" },
              { label: "🏖️ Cancun Excursions", q: "cancun" },
              { label: "🚢 Nassau Bahamas", q: "nassau bahamas" },
            ].map(({ label, q }) => (
              <a
                key={q}
                href={`${GYG_SEARCH}&q=${encodeURIComponent(q)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", background: "white", border: "1px solid rgba(255,85,51,0.2)", borderRadius: 6, padding: "12px 16px", textDecoration: "none", color: "var(--navy)", fontSize: "0.82rem", fontFamily: "var(--font-body)", transition: "border-color 0.2s", fontWeight: 500 }}
              >
                {label}
              </a>
            ))}
          </div>

          <div style={{ background: "white", border: "1px solid rgba(255,85,51,0.15)", borderRadius: 8, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--navy)", fontFamily: "var(--font-body)", marginBottom: 6 }}>Explore All GetYourGuide Experiences</div>
              <p style={{ color: "var(--slate)", fontSize: "0.85rem", margin: 0, fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
                Skip-the-line tickets, private tours, cooking classes, day trips and more — curated and reviewed by millions of travelers worldwide.
              </p>
            </div>
            <a href={GYG_URL} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0, display: "inline-block", background: "#FF5533", color: "white", padding: "13px 32px", textDecoration: "none", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-body)", borderRadius: 4, whiteSpace: "nowrap" }}>
              Open GetYourGuide →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--navy)", padding: "56px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div className="overline" style={{ marginBottom: 16 }}>Not Sure Which to Book?</div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 300, color: "white", marginBottom: 16 }}>
            Let a Specialist Recommend the Best Excursions for Your Itinerary
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: 32 }}>
            We know which excursions are worth it at every port — and which ones to skip. Ask us before you book.
          </p>
          <Link href="/request-quote?trip_type=Shore+Excursion" className="btn-primary" style={{ textDecoration: "none" }}>
            Ask a Specialist
          </Link>
        </div>
      </section>
    </>
  );
}
