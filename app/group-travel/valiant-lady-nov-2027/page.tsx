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
    priceFrom: "$2,202",
    rows: [
      { code: "TC", name: "Central Sea Terrace", category: "Balcony", maxOccupancy: 3, pricePerRoom: "$2,292", defaultPromo: "Buy One, Get One Sailor % Off" },
      { code: "TR", name: "The Sea Terrace",     category: "Balcony", maxOccupancy: 4, pricePerRoom: "$2,202", defaultPromo: "Buy One, Get One Sailor % Off" },
    ],
  },
  {
    section: "Insider",
    priceFrom: "$1,290",
    rows: [
      {
        code: "IN", name: "The Insider", category: "Interior", maxOccupancy: 3, defaultPromo: "Base Fare, Buy One Get One Sailor % Off",
        multiPrice: [
          { label: "Base Fare",        price: "$1,542" },
          { label: "Essential Fare",   price: "$1,600" },
          { label: "Premium Fare",     price: "$2,050" },
        ],
      },
      {
        code: "IZ", name: "Insider Lock It In Rate", category: "Interior", maxOccupancy: 2, defaultPromo: "Buy One, Get One Sailor % Off",
        multiPrice: [
          { label: "Buy One, Get One Sailor % Off", price: "$1,290" },
        ],
      },
    ],
  },
  {
    section: "Sea View",
    priceFrom: "$1,590",
    rows: [
      {
        code: "VW", name: "The Sea View", category: "Sea View", maxOccupancy: 3, defaultPromo: "Base Fare, Buy One Get One Sailor % Off",
        multiPrice: [
          { label: "Base Fare",        price: "$2,066" },
          { label: "Essential Fare",   price: "$2,150" },
          { label: "Premium Fare",     price: "$2,600" },
        ],
      },
      {
        code: "VZ", name: "Sea View Lock It In Rate", category: "Sea View", maxOccupancy: 2, defaultPromo: "Buy One, Get One Sailor % Off",
        multiPrice: [
          { label: "Buy One, Get One Sailor % Off", price: "$1,590" },
        ],
      },
    ],
  },
  {
    section: "RockStar Quarters",
    priceFrom: "$6,000",
    rows: [
      { code: "SB",  name: "Brilliant Suite",                        category: "Suite", maxOccupancy: 4, pricePerRoom: "$6,200", defaultPromo: "Loot Offer" },
      { code: "SCB", name: "Cheeky Corner Suite - Biggest Terrace",  category: "Suite", maxOccupancy: 2, pricePerRoom: "$6,750", defaultPromo: "Loot Offer" },
      { code: "SCE", name: "Cheeky Corner Suite - Even Bigger Terrace", category: "Suite", maxOccupancy: 2, pricePerRoom: "$6,600", defaultPromo: "Loot Offer" },
      { code: "SCP", name: "Cheeky Corner Suite - Pretty Big Terrace",  category: "Suite", maxOccupancy: 2, pricePerRoom: "$6,550", defaultPromo: "Loot Offer" },
      { code: "SS",  name: "Seriously Suite",                        category: "Suite", maxOccupancy: 2, pricePerRoom: "$6,000", defaultPromo: "Loot Offer" },
      { code: "SAB", name: "Sweet Aft Suite - Biggest Terrace",      category: "Suite", maxOccupancy: 2, pricePerRoom: "$6,500", defaultPromo: "Loot Offer" },
      { code: "SAE", name: "Sweet Aft Suite - Even Bigger Terrace",  category: "Suite", maxOccupancy: 2, pricePerRoom: "$6,450", defaultPromo: "Loot Offer" },
      { code: "SAP", name: "Sweet Aft Suite - Pretty Big Terrace",   category: "Suite", maxOccupancy: 2, pricePerRoom: "$6,400", defaultPromo: "Loot Offer" },
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
      {/* ── STUFFED & SAILING HERO HEADER ── */}
      <div style={{
        background: "linear-gradient(135deg, #0a1520 0%, #0d1b2a 40%, #1a2d1a 100%)",
        borderBottom: "3px solid var(--gold)",
        padding: "48px 32px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* wave decoration */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(201,168,76,1) 40px, rgba(201,168,76,1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(201,168,76,1) 40px, rgba(201,168,76,1) 41px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
          {/* emoji row */}
          <div style={{ fontSize: "2rem", letterSpacing: "0.4em", marginBottom: 16 }}>🍽️ 🚢 🌊</div>

          {/* main title */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3rem, 9vw, 7rem)",
            fontWeight: 400,
            lineHeight: 0.9,
            margin: "0 0 8px",
            letterSpacing: "-0.01em",
          }}>
            <span style={{ color: "var(--gold-light)", display: "block" }}>STUFFED</span>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.4em", letterSpacing: "0.3em", display: "block", margin: "8px 0", fontFamily: "var(--font-body)", fontWeight: 300 }}>&amp;</span>
            <span style={{ color: "white", display: "block" }}>SAILING</span>
          </h1>

          {/* underline accent */}
          <div style={{ width: 120, height: 3, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", margin: "20px auto 20px" }} />

          {/* tagline */}
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.85rem,2vw,1rem)", color: "rgba(255,255,255,0.55)", letterSpacing: "0.25em", textTransform: "uppercase", margin: "0 0 8px" }}>
            A Crestwell Group Sailing Experience
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.95rem,2vw,1.2rem)", fontWeight: 300, color: "var(--gold-light)", fontStyle: "italic", margin: "0 0 32px" }}>
            Valiant Lady · Miami · November 22–27, 2027
          </p>

          {/* CTA row */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/request-quote?trip_type=Group+Cruise&ship=Valiant+Lady&voyage=VL2711225NGCB"
              style={{ display: "inline-block", background: "var(--gold)", color: "var(--navy)", padding: "13px 32px", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderRadius: 4 }}>
              Sign Up Now →
            </Link>
            <a href="tel:8885086893"
              style={{ display: "inline-block", border: "1px solid rgba(201,168,76,0.4)", color: "var(--gold-light)", padding: "13px 28px", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: 4 }}>
              Call 888.508.6893
            </a>
          </div>
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 0 }}>
                <div style={{ background: "var(--gold)", padding: "12px 20px", borderRadius: "6px 6px 0 0", display: "inline-block" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--navy)" }}>{section.section}</span>
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "#64748b", paddingBottom: 4 }}>
                  Price From: <strong style={{ color: "var(--navy)" }}>USD {(section as any).priceFrom}</strong>
                </div>
              </div>
              <div style={{ background: "white", borderRadius: "0 6px 6px 6px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={th}>Code</th>
                        <th style={th}>Name</th>
                        <th style={th}>Category</th>
                        <th style={{ ...th, textAlign: "center" }}>Max Occ.</th>
                        <th style={{ ...th, borderLeft: "1px solid rgba(201,168,76,0.3)" }}>Default Promotions</th>
                        <th style={{ ...th, textAlign: "right", borderLeft: "1px solid rgba(201,168,76,0.3)" }}>Price Per Room</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.rows.map((row: any, idx: number) => (
                        row.multiPrice ? (
                          <tr key={row.code} style={{ background: idx % 2 === 0 ? "white" : "#fafbfd" }}>
                            <td style={{ ...td, fontWeight: 700, color: "var(--navy)" }}>{row.code}</td>
                            <td style={{ ...td, fontWeight: 500 }}>{row.name}</td>
                            <td style={td}>{row.category}</td>
                            <td style={{ ...td, textAlign: "center" }}>{row.maxOccupancy}</td>
                            <td style={{ ...td, borderLeft: "1px solid #f1f5f9", fontSize: "0.8rem", color: "#475569" }}>{row.defaultPromo}</td>
                            <td style={{ ...td, borderLeft: "1px solid #f1f5f9", padding: "8px 16px" }}>
                              {row.multiPrice.map((mp: any) => (
                                <div key={mp.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0", borderBottom: "1px solid #f8f9fa", gap: 16 }}>
                                  <span style={{ fontSize: "0.78rem", color: "#0057b8", fontFamily: "var(--font-body)" }}>{mp.label}</span>
                                  <span style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.88rem", whiteSpace: "nowrap", fontFamily: "var(--font-body)" }}>USD {mp.price}</span>
                                </div>
                              ))}
                            </td>
                          </tr>
                        ) : (
                          <tr key={row.code} style={{ background: idx % 2 === 0 ? "white" : "#fafbfd" }}>
                            <td style={{ ...td, fontWeight: 700, color: "var(--navy)" }}>{row.code}</td>
                            <td style={{ ...td, fontWeight: 500 }}>{row.name}</td>
                            <td style={td}>{row.category}</td>
                            <td style={{ ...td, textAlign: "center" }}>{row.maxOccupancy}</td>
                            <td style={{ ...td, borderLeft: "1px solid #f1f5f9", fontSize: "0.8rem", color: "#475569" }}>{row.defaultPromo}</td>
                            <td style={{ ...td, textAlign: "right", fontWeight: 700, color: "var(--navy)", borderLeft: "1px solid #f1f5f9", fontSize: "1rem" }}>
                              USD {row.pricePerRoom}
                            </td>
                          </tr>
                        )
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
