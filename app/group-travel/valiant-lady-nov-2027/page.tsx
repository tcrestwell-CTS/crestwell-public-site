"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const SAIL_DATE = new Date("2027-11-22T17:00:00-05:00");

const PROMOTIONS = [
  "Buy One, Get One Sailor % Off",
  "Essential Fare",
  "Groups Bar Tab",
  "Groups Discount",
  "Loot Offer",
];

const CATEGORIES = [
  {
    section: "Sea Terraces",
    rows: [
      { code: "TC", name: "Central Sea Terrace", category: "Balcony", maxOccupancy: 3, pricePerRoom: "$2,292", defaultPromo: "Buy One, Get One Sailor % Off" },
      { code: "TR", name: "The Sea Terrace",     category: "Balcony", maxOccupancy: 4, pricePerRoom: "$2,202", defaultPromo: "Buy One, Get One Sailor % Off" },
    ],
  },
];

const th: React.CSSProperties = {
  padding: "11px 16px",
  textAlign: "left",
  fontSize: "0.7rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "white",
  background: "var(--navy)",
  whiteSpace: "nowrap",
  fontFamily: "var(--font-body)",
};

const td: React.CSSProperties = {
  padding: "13px 16px",
  fontSize: "0.875rem",
  color: "#1e293b",
  borderBottom: "1px solid #f1f5f9",
  fontFamily: "var(--font-body)",
};

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = SAIL_DATE.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 10, padding: "28px 32px", marginBottom: 40, textAlign: "center" }}>
      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14 }}>
        Counting Down to Departure
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
        {[
          { label: "Days",    value: timeLeft.days },
          { label: "Hours",   value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map(({ label, value }, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ background: "var(--navy)", borderRadius: 8, padding: "14px 18px", minWidth: 72, textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 400, color: "white", lineHeight: 1 }}>
                {String(value).padStart(2, "0")}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginTop: 5 }}>
                {label}
              </div>
            </div>
            {i < 3 && <span style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--gold)", lineHeight: 1, marginBottom: 16 }}>:</span>}
          </div>
        ))}
      </div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginTop: 14 }}>
        November 22, 2027 · 5:00 PM · Miami, Florida
      </div>
    </div>
  );
}

export default function VoyagePage() {
  return (
    <>
      {/* ── COUNTDOWN BANNER ── */}
      <div style={{ background: "var(--navy)", borderBottom: "2px solid var(--gold)", padding: "10px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "1rem" }}>🚢</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "white", fontWeight: 600 }}>
              Valiant Lady sets sail <span style={{ color: "var(--gold-light)" }}>November 22, 2027</span> from Miami
            </span>
          </div>
          <Link
            href="/request-quote?trip_type=Group+Cruise&ship=Valiant+Lady&voyage=VL2711225NGCB"
            style={{ display: "inline-block", background: "var(--gold)", color: "var(--navy)", padding: "7px 20px", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 4, whiteSpace: "nowrap" }}>
            Sign Up Now →
          </Link>
        </div>
      </div>

      {/* ── NAV STRIP ── */}
      <div style={{ background: "#0a1520", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", gap: 32, overflowX: "auto" }}>
          {[
            { label: "Home",          href: "/" },
            { label: "Group Travel",  href: "/group-travel" },
            { label: "Pricing",       href: "#pricing" },
            { label: "Sign Up",       href: "/request-quote?trip_type=Group+Cruise&ship=Valiant+Lady&voyage=VL2711225NGCB" },
            { label: "Contact",       href: "/contact" },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{ display: "inline-block", padding: "13px 0", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", textDecoration: "none", whiteSpace: "nowrap", fontFamily: "var(--font-body)" }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ background: "linear-gradient(160deg,#0d1b2a 0%,#162033 50%,#0d1b2a 100%)", padding: "80px 32px 72px", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-block", border: "1px solid rgba(201,168,76,0.35)", color: "var(--gold-light)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", padding: "5px 18px", borderRadius: 20, marginBottom: 24, fontFamily: "var(--font-body)" }}>
            Virgin Voyages · Exclusive Group Sailing
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,6vw,4rem)", fontWeight: 300, color: "white", lineHeight: 1.1, margin: "0 0 12px" }}>
            Valiant Lady
          </h1>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem,2.5vw,1.6rem)", fontWeight: 300, color: "var(--gold-light)", fontStyle: "italic", margin: "0 0 40px" }}>
            Pricing &amp; Cabins · Nov 22–27, 2027
          </p>

          {/* voyage info strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 1, background: "rgba(201,168,76,0.15)", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(201,168,76,0.2)", marginBottom: 40 }}>
            {[
              { label: "Voyage #",  value: "VL2711225NGCB" },
              { label: "Ship",      value: "Valiant Lady" },
              { label: "Departs",   value: "Nov 22, 2027 · 5:00 PM" },
              { label: "Returns",   value: "Nov 27, 2027 · 6:30 AM" },
              { label: "Port",      value: "Miami, Florida" },
              { label: "Group",     value: "20 Cabins · 40 Sailors" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(13,27,42,0.6)", padding: "16px 20px" }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 5 }}>{s.label}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "white", lineHeight: 1.4 }}>{s.value}</div>
              </div>
            ))}
          </div>

          <Link
            href="/request-quote?trip_type=Group+Cruise&ship=Valiant+Lady&voyage=VL2711225NGCB"
            className="btn-primary" style={{ textDecoration: "none", marginRight: 12 }}>
            Sign Me Up →
          </Link>
          <a href="tel:8885086893" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.75)", padding: "13px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>
            Call 888.508.6893
          </a>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: "var(--cream)", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Countdown clock */}
          <Countdown />

          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>Cabin Pricing</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 300, color: "var(--navy)", margin: "0 0 12px" }}>Pricing &amp; Packages</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "#64748b", maxWidth: 480, margin: "0 auto" }}>All prices per room. Promotions applied at booking.</p>
          </div>

          {CATEGORIES.map(section => (
            <div key={section.section} style={{ marginBottom: 48 }}>
              <div style={{ background: "var(--gold)", padding: "12px 20px", borderRadius: "6px 6px 0 0", display: "inline-block" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--navy)" }}>{section.section}</span>
              </div>
              <div style={{ background: "white", borderRadius: "0 6px 6px 6px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={th}>Code</th>
                        <th style={th}>Name</th>
                        <th style={th}>Category</th>
                        <th style={{ ...th, textAlign: "center" }}>Max Occupancy</th>
                        <th style={{ ...th, textAlign: "center", borderLeft: "1px solid rgba(201,168,76,0.3)" }}>Price Per Room</th>
                        <th style={{ ...th, borderLeft: "1px solid rgba(201,168,76,0.3)" }}>Default Promotion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.rows.map((row, idx) => (
                        <tr key={row.code} style={{ background: idx % 2 === 0 ? "white" : "#fafbfd" }}>
                          <td style={{ ...td, fontWeight: 700, color: "var(--navy)" }}>{row.code}</td>
                          <td style={{ ...td, fontWeight: 500 }}>{row.name}</td>
                          <td style={td}>{row.category}</td>
                          <td style={{ ...td, textAlign: "center" }}>{row.maxOccupancy}</td>
                          <td style={{ ...td, textAlign: "center", fontWeight: 700, color: "var(--navy)", borderLeft: "1px solid #f1f5f9", fontSize: "1rem" }}>
                            USD {row.pricePerRoom}
                          </td>
                          <td style={{ ...td, borderLeft: "1px solid #f1f5f9", fontSize: "0.8rem", color: "#475569" }}>
                            {row.defaultPromo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}

          {/* Promotions */}
          <div style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 8, padding: "24px 28px", marginBottom: 32 }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14 }}>Available Promotions</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {PROMOTIONS.map(p => (
                <span key={p} style={{ display: "inline-block", background: "#f0f6ff", border: "1px solid #bfdbfe", color: "#1e40af", fontSize: "0.78rem", fontWeight: 500, padding: "5px 14px", borderRadius: 20, fontFamily: "var(--font-body)" }}>{p}</span>
              ))}
            </div>
          </div>

          {/* Bookings table */}
          <div style={{ background: "white", borderRadius: 8, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ background: "var(--navy)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 300, color: "white", margin: 0 }}>Group Bookings</h3>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--gold-light)", background: "rgba(201,168,76,0.15)", padding: "4px 14px", borderRadius: 20, border: "1px solid rgba(201,168,76,0.25)" }}>0 of 20 booked</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Booking #", "Status", "Code", "Cabins", "Upgraded", "Reserve Type", "Full Name"].map(h => (
                      <th key={h} style={{ ...th, background: "#f8f6f0", color: "var(--navy)", borderBottom: "2px solid #e2e8f0" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={7} style={{ padding: "48px 20px", textAlign: "center", color: "#94a3b8", fontFamily: "var(--font-body)", fontSize: "0.88rem", fontStyle: "italic" }}>
                      No data available in table
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--navy)", padding: "72px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 18 }}>Limited Cabins Available</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "white", lineHeight: 1.15, margin: "0 0 16px" }}>
            Ready to Set Sail?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "0 0 36px", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            Contact Tim at Crestwell Travel Services to reserve your cabin. Prices are per room. Deposits secure your spot.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/request-quote?trip_type=Group+Cruise&ship=Valiant+Lady&voyage=VL2711225NGCB"
              className="btn-primary" style={{ textDecoration: "none" }}>
              Sign Me Up →
            </Link>
            <a href="tel:8885086893"
              style={{ display: "inline-block", border: "2px solid rgba(201,168,76,0.4)", color: "var(--gold-light)", padding: "13px 28px", fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>
              Call 888.508.6893
            </a>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", marginTop: 28, lineHeight: 1.6 }}>
            All itineraries, dates, times, vessel and ports are subject to change without notice.<br />
            Voyage VL2711225NGCB · Valiant Lady · Virgin Voyages
          </p>
        </div>
      </section>
    </>
  );
}
