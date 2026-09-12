"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";

const VOYAGE = {
  number: "VL2711225NGCB",
  ship: "Valiant Lady",
  line: "Virgin Voyages",
  departs: "Mon, Nov 22, 2027 · 5:00 PM",
  returns: "Sat, Nov 27, 2027 · 6:30 AM",
  port: "Miami, Florida",
  nights: 5,
};

const CABIN_SECTIONS = [
  {
    section: "Insider",
    category: "Interior",
    priceFrom: 1290,
    description: "Cozy interior cabins with thoughtful design. Perfect for sailors who plan to spend most of their time exploring the ship and ports.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    cabins: [
      { code: "IZ", name: "Insider Lock It In Rate", maxOcc: 2, pricePerRoom: 1290, promo: "Buy One, Get One Sailor % Off", available: true },
      { code: "IN", name: "The Insider", maxOcc: 3, fares: [
        { label: "Base Fare", price: 1542 },
        { label: "Essential Fare", price: 1600 },
        { label: "Premium Fare", price: 2050 },
      ], promo: "Base Fare, Buy One Get One Sailor % Off", available: true },
    ],
  },
  {
    section: "Sea View",
    category: "Sea View",
    priceFrom: 1590,
    description: "Wake up to stunning ocean views from your window. All the comforts of a well-appointed cabin with the added bonus of natural light.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    cabins: [
      { code: "VZ", name: "Sea View Lock It In Rate", maxOcc: 2, pricePerRoom: 1590, promo: "Buy One, Get One Sailor % Off", available: true },
      { code: "VW", name: "The Sea View", maxOcc: 3, fares: [
        { label: "Base Fare", price: 2066 },
        { label: "Essential Fare", price: 2150 },
        { label: "Premium Fare", price: 2600 },
      ], promo: "Base Fare, Buy One Get One Sailor % Off", available: true },
    ],
  },
  {
    section: "Sea Terraces",
    category: "Balcony",
    priceFrom: 2202,
    description: "Private outdoor terrace with hammock and sea views. The quintessential Virgin Voyages experience — dine, relax, and sail in style.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    cabins: [
      { code: "TR", name: "The Sea Terrace", maxOcc: 4, pricePerRoom: 2202, promo: "Buy One, Get One Sailor % Off", available: true },
      { code: "TC", name: "Central Sea Terrace", maxOcc: 3, pricePerRoom: 2292, promo: "Buy One, Get One Sailor % Off", available: true },
    ],
  },
  {
    section: "RockStar Quarters",
    category: "Suite",
    priceFrom: 6000,
    description: "The ultimate Virgin Voyages experience. Massive suites with private terraces, priority everything, and exclusive perks throughout the voyage.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80",
    cabins: [
      { code: "SS",  name: "Seriously Suite",                          maxOcc: 2, pricePerRoom: 6000, promo: "Loot Offer", available: true },
      { code: "SAP", name: "Sweet Aft Suite - Pretty Big Terrace",     maxOcc: 2, pricePerRoom: 6400, promo: "Loot Offer", available: true },
      { code: "SAE", name: "Sweet Aft Suite - Even Bigger Terrace",    maxOcc: 2, pricePerRoom: 6450, promo: "Loot Offer", available: true },
      { code: "SAB", name: "Sweet Aft Suite - Biggest Terrace",        maxOcc: 2, pricePerRoom: 6500, promo: "Loot Offer", available: true },
      { code: "SCP", name: "Cheeky Corner Suite - Pretty Big Terrace", maxOcc: 2, pricePerRoom: 6550, promo: "Loot Offer", available: true },
      { code: "SCE", name: "Cheeky Corner Suite - Even Bigger Terrace",maxOcc: 2, pricePerRoom: 6600, promo: "Loot Offer", available: true },
      { code: "SB",  name: "Brilliant Suite",                          maxOcc: 4, pricePerRoom: 6200, promo: "Loot Offer", available: true },
      { code: "SCB", name: "Cheeky Corner Suite - Biggest Terrace",    maxOcc: 2, pricePerRoom: 6750, promo: "Loot Offer", available: true },
    ],
  },
];

function CabinSelectionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const guests = parseInt(searchParams.get("guests") ?? "2");
  const [selected, setSelected] = useState<{ code: string; name: string; fare?: string; price: number } | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>("Sea Terraces");

  const deposit = guests * 250;

  const handleSelect = (cabin: any, fareLabel?: string, farePrice?: number) => {
    const price = farePrice ?? cabin.pricePerRoom;
    setSelected({ code: cabin.code, name: cabin.name, fare: fareLabel, price });
  };

  const handleContinue = () => {
    if (!selected) return;
    // Build trip description for pay page
    const tripDesc = `Stuffed & Sailing — Valiant Lady Nov 2027 | Cabin ${selected.code}: ${selected.name}${selected.fare ? " (" + selected.fare + ")" : ""} | ${guests} Guest${guests > 1 ? "s" : ""}`;
    const params = new URLSearchParams({
      trip_id:    "stuffed-sailing",
      trip_name:  tripDesc,
      amount:     String(deposit * 100),   // cents
      guests:     String(guests),
      cabin_code: selected.code,
      cabin_name: selected.name,
      fare:       selected.fare ?? "Standard",
      room_price: String(selected.price),
      voyage:     VOYAGE.number,
    });
    router.push("/pay?" + params.toString());
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f6f0", fontFamily: "var(--font-body)" }}>

      {/* ── TOP BAR ── */}
      <div style={{ background: "var(--navy)", borderBottom: "2px solid var(--gold)", padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <Link href="/group-travel/valiant-lady-nov-2027" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--gold-light)", textDecoration: "none" }}>
            ← Stuffed &amp; Sailing
          </Link>
          <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Valiant Lady · Nov 22–27, 2027
          </span>
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", height: 52 }}>
          {["Select Guests", "Select Cabin", "Pay Deposit"].map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 16px" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: i === 0 ? "#dcfce7" : i === 1 ? "var(--navy)" : "#f1f5f9",
                  border: i === 1 ? "2px solid var(--navy)" : "2px solid " + (i === 0 ? "#16a34a" : "#e2e8f0"),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.72rem", fontWeight: 700,
                  color: i === 0 ? "#16a34a" : i === 1 ? "white" : "#94a3b8",
                }}>
                  {i === 0 ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: "0.78rem", fontWeight: i === 1 ? 700 : 400, color: i === 1 ? "var(--navy)" : i === 0 ? "#16a34a" : "#94a3b8" }}>{step}</span>
              </div>
              {i < 2 && <span style={{ color: "#e2e8f0", fontSize: "1rem" }}>›</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28, alignItems: "start" }}>

          {/* ── LEFT: Cabin List ── */}
          <div>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 300, color: "var(--navy)", margin: "0 0 6px" }}>Select Your Cabin</h1>
              <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0 }}>
                Booking for <strong style={{ color: "var(--navy)" }}>{guests} {guests === 1 ? "Guest" : "Guests"}</strong> · $250/person deposit required · Total deposit: <strong style={{ color: "var(--navy)" }}>${deposit.toLocaleString()}</strong>
              </p>
            </div>

            {CABIN_SECTIONS.map(section => (
              <div key={section.section} style={{ background: "white", borderRadius: 10, border: "1px solid #e2e8f0", marginBottom: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>

                {/* Section header — clickable to expand/collapse */}
                <button
                  onClick={() => setExpandedSection(expandedSection === section.section ? null : section.section)}
                  style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                    <img src={section.image} alt={section.section} style={{ width: 140, height: 100, objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ padding: "16px 20px", flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                        <div>
                          <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>{section.category}</div>
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 400, color: "var(--navy)", marginBottom: 4 }}>{section.section}</div>
                          <div style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.5, maxWidth: 340 }}>{section.description}</div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontSize: "0.62rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>From</div>
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", color: "var(--navy)", fontWeight: 400 }}>${section.priceFrom.toLocaleString()}</div>
                          <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>per room</div>
                          <div style={{ marginTop: 8, fontSize: "0.72rem", color: expandedSection === section.section ? "#dc2626" : "var(--gold)", fontWeight: 600 }}>
                            {expandedSection === section.section ? "▲ Hide" : "▼ Show"} Cabins
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Cabin rows — shown when expanded */}
                {expandedSection === section.section && (
                  <div style={{ borderTop: "1px solid #f1f5f9" }}>
                    {section.cabins.map((cabin: any, idx: number) => {
                      const isSelected = selected?.code === cabin.code && !cabin.fares;
                      return (
                        <div key={cabin.code} style={{ borderBottom: idx < section.cabins.length - 1 ? "1px solid #f8f6f0" : "none", background: isSelected ? "#fef9ec" : idx % 2 === 0 ? "white" : "#fafbfd" }}>

                          {cabin.fares ? (
                            // Multi-fare cabin
                            <div style={{ padding: "16px 20px" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                                <div style={{ background: "var(--gold)", color: "var(--navy)", fontSize: "0.65rem", fontWeight: 700, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.06em" }}>{cabin.code}</div>
                                <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--navy)" }}>{cabin.name}</div>
                                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>· Max {cabin.maxOcc} guests</div>
                                {guests > cabin.maxOcc && <span style={{ fontSize: "0.72rem", background: "#fee2e2", color: "#dc2626", padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>Exceeds max occupancy</span>}
                              </div>
                              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                {cabin.fares.map((fare: any) => {
                                  const isSel = selected?.code === cabin.code && selected?.fare === fare.label;
                                  const blocked = guests > cabin.maxOcc;
                                  return (
                                    <button
                                      key={fare.label}
                                      disabled={blocked}
                                      onClick={() => handleSelect(cabin, fare.label, fare.price)}
                                      style={{
                                        border: isSel ? "2px solid var(--navy)" : "1px solid #e2e8f0",
                                        background: isSel ? "var(--navy)" : "white",
                                        color: isSel ? "white" : "var(--navy)",
                                        borderRadius: 8,
                                        padding: "10px 16px",
                                        cursor: blocked ? "not-allowed" : "pointer",
                                        opacity: blocked ? 0.4 : 1,
                                        textAlign: "left",
                                        minWidth: 140,
                                      }}>
                                      <div style={{ fontSize: "0.72rem", color: isSel ? "var(--gold-light)" : "#0057b8", fontWeight: 600, marginBottom: 3 }}>{fare.label}</div>
                                      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 400 }}>USD ${fare.price.toLocaleString()}</div>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            // Single-price cabin
                            <div style={{ display: "flex", alignItems: "center", padding: "14px 20px", gap: 12 }}>
                              <div style={{ background: "var(--gold)", color: "var(--navy)", fontSize: "0.65rem", fontWeight: 700, padding: "3px 8px", borderRadius: 4, letterSpacing: "0.06em", flexShrink: 0 }}>{cabin.code}</div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--navy)", marginBottom: 2 }}>{cabin.name}</div>
                                <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Max {cabin.maxOcc} guests · {cabin.promo}</div>
                                {guests > cabin.maxOcc && <div style={{ fontSize: "0.72rem", color: "#dc2626", fontWeight: 600, marginTop: 2 }}>⚠ Exceeds max occupancy for {guests} guests</div>}
                              </div>
                              <div style={{ textAlign: "right", flexShrink: 0, marginRight: 12 }}>
                                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--navy)" }}>USD ${cabin.pricePerRoom.toLocaleString()}</div>
                                <div style={{ fontSize: "0.68rem", color: "#94a3b8" }}>per room</div>
                              </div>
                              <button
                                disabled={guests > cabin.maxOcc}
                                onClick={() => handleSelect(cabin)}
                                style={{
                                  background: isSelected ? "var(--navy)" : "var(--gold)",
                                  color: isSelected ? "white" : "var(--navy)",
                                  border: "none",
                                  borderRadius: 6,
                                  padding: "9px 18px",
                                  fontSize: "0.78rem",
                                  fontWeight: 700,
                                  cursor: guests > cabin.maxOcc ? "not-allowed" : "pointer",
                                  opacity: guests > cabin.maxOcc ? 0.4 : 1,
                                  whiteSpace: "nowrap",
                                  fontFamily: "var(--font-body)",
                                }}>
                                {isSelected ? "✓ Selected" : "Select"}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── RIGHT: Booking Summary ── */}
          <div style={{ position: "sticky", top: 24 }}>
            <div style={{ background: "white", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ background: "var(--navy)", padding: "18px 22px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "white", marginBottom: 2 }}>Booking Summary</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Voyage VL2711225NGCB</div>
              </div>
              <div style={{ padding: "20px 22px" }}>
                {/* Voyage details */}
                {[
                  { label: "Ship",     value: "Valiant Lady" },
                  { label: "Line",     value: "Virgin Voyages" },
                  { label: "Departs",  value: "Nov 22, 2027" },
                  { label: "Returns",  value: "Nov 27, 2027" },
                  { label: "Port",     value: "Miami, FL" },
                  { label: "Guests",   value: `${guests} ${guests === 1 ? "Guest" : "Guests"}` },
                ].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f8f6f0", fontSize: "0.82rem" }}>
                    <span style={{ color: "#64748b" }}>{r.label}</span>
                    <span style={{ fontWeight: 600, color: "var(--navy)" }}>{r.value}</span>
                  </div>
                ))}

                {/* Selected cabin */}
                <div style={{ margin: "16px 0", padding: "14px", background: selected ? "#fef9ec" : "#f8f6f0", border: `1px solid ${selected ? "var(--gold)" : "#e2e8f0"}`, borderRadius: 8 }}>
                  {selected ? (
                    <>
                      <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>Selected Cabin</div>
                      <div style={{ fontWeight: 600, color: "var(--navy)", fontSize: "0.9rem", marginBottom: 2 }}>{selected.code} — {selected.name}</div>
                      {selected.fare && <div style={{ fontSize: "0.78rem", color: "#0057b8", marginBottom: 6 }}>{selected.fare}</div>}
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTop: "1px solid #fde68a" }}>
                        <span style={{ fontSize: "0.8rem", color: "#92400e" }}>Room price</span>
                        <span style={{ fontWeight: 700, color: "var(--navy)" }}>USD ${selected.price.toLocaleString()}</span>
                      </div>
                    </>
                  ) : (
                    <div style={{ textAlign: "center", color: "#94a3b8", fontSize: "0.85rem", padding: "8px 0" }}>No cabin selected yet</div>
                  )}
                </div>

                {/* Deposit */}
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "12px 14px", marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.08em" }}>Deposit Due Today</div>
                      <div style={{ fontSize: "0.72rem", color: "#7f1d1d", marginTop: 2 }}>Non-refundable · $250 × {guests} guests</div>
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "#dc2626", fontWeight: 400 }}>${deposit.toLocaleString()}</div>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  disabled={!selected}
                  style={{
                    width: "100%",
                    background: selected ? "var(--navy)" : "#e2e8f0",
                    color: selected ? "var(--gold)" : "#94a3b8",
                    border: "none",
                    borderRadius: 8,
                    padding: "14px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: selected ? "pointer" : "not-allowed",
                    fontFamily: "var(--font-body)",
                    transition: "background 0.2s",
                  }}>
                  {selected ? "Continue to Payment →" : "Select a Cabin to Continue"}
                </button>

                <p style={{ fontSize: "0.7rem", color: "#94a3b8", textAlign: "center", marginTop: 12, lineHeight: 1.6 }}>
                  By continuing you agree to pay a non-refundable deposit of ${deposit.toLocaleString()}. Full balance due prior to sailing.
                </p>

                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #f1f5f9", textAlign: "center" }}>
                  <a href="tel:4702329288" style={{ fontSize: "0.8rem", color: "var(--navy)", fontWeight: 600, textDecoration: "none" }}>
                    📞 Need help? Call 470-232-9288
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectCabinPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: "center", color: "#64748b" }}>Loading cabin options...</div>}>
      <CabinSelectionContent />
    </Suspense>
  );
}
