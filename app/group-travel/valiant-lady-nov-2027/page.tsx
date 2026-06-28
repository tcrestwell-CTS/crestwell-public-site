import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Virgin Voyages Group Sailing — Valiant Lady Nov 2027 | Crestwell Travel Services",
  description: "Join our exclusive group sailing aboard Virgin Voyages Valiant Lady, November 22–27, 2027 from Miami. 20 cabins available across Sea Terrace categories.",
};

const VOYAGE = {
  voyageNumber: "VL2711225NGCB",
  ship: "Valiant Lady",
  line: "Virgin Voyages",
  departure: "Monday, November 22, 2027",
  departureTime: "5:00 PM",
  departurePort: "Miami, Florida",
  arrival: "Saturday, November 27, 2027",
  arrivalTime: "6:30 AM",
  arrivalPort: "Miami, Florida",
  nights: 5,
  totalCabins: 20,
  totalSailors: 40,
};

const CATEGORIES = [
  {
    code: "TC",
    name: "Central Sea Terrace",
    occupancy: 2,
    qty: 10,
    available: 10,
    price: null,
    description: "A private terrace in the heart of the ship with stunning sea views. Includes hammock, outdoor seating, and floor-to-ceiling windows.",
  },
  {
    code: "TR",
    name: "The Sea Terrace",
    occupancy: 2,
    qty: 10,
    available: 10,
    price: null,
    description: "Signature Virgin Voyages terrace cabin with a private outdoor space, rainfall shower, and panoramic ocean views.",
  },
];

export default function VoyagePage() {
  const allAvailable = CATEGORIES.reduce((sum, c) => sum + c.available, 0);

  return (
    <>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0d1b2a 0%, #1e2d42 60%, #0d1b2a 100%)",
        padding: "72px 32px 60px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(90deg, rgba(201,168,76,0.04) 0px, transparent 1px, transparent 120px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          {/* breadcrumb */}
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", marginBottom: 24, letterSpacing: "0.04em" }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <Link href="/group-travel" style={{ color: "inherit", textDecoration: "none" }}>Group Travel</Link>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "var(--gold-light)" }}>Valiant Lady Nov 2027</span>
          </div>

          {/* badge */}
          <div style={{ display: "inline-block", background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", color: "var(--gold-light)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 20, marginBottom: 20, fontFamily: "var(--font-body)" }}>
            Virgin Voyages · Exclusive Group Sailing
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300, color: "white", lineHeight: 1.2, margin: "0 0 8px" }}>
            Valiant Lady
          </h1>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontWeight: 300, color: "var(--gold-light)", fontStyle: "italic", margin: "0 0 32px" }}>
            Miami Roundtrip · 5 Nights · November 2027
          </p>

          {/* voyage stats strip */}
          <div style={{ display: "flex", gap: 0, flexWrap: "wrap", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, overflow: "hidden" }}>
            {[
              { label: "Voyage #", value: VOYAGE.voyageNumber },
              { label: "Departure", value: `${VOYAGE.departure} at ${VOYAGE.departureTime}` },
              { label: "Return", value: `${VOYAGE.arrival} at ${VOYAGE.arrivalTime}` },
              { label: "Group Cabins", value: `${VOYAGE.totalCabins} Cabins · ${VOYAGE.totalSailors} Sailors` },
            ].map((item, idx) => (
              <div key={item.label} style={{
                flex: "1 1 200px",
                padding: "20px 24px",
                borderRight: idx < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 6 }}>{item.label}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "white", lineHeight: 1.5 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cabin Categories */}
      <section style={{ background: "var(--cream)", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>Available Cabin Categories</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 300, color: "var(--navy)", margin: 0 }}>
              {allAvailable} Cabins Available
            </h2>
          </div>

          {/* category cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,440px), 1fr))", gap: 24, marginBottom: 40 }}>
            {CATEGORIES.map(cat => (
              <div key={cat.code} style={{ background: "white", borderRadius: 10, border: "1px solid rgba(13,27,42,0.08)", overflow: "hidden" }}>
                {/* category header */}
                <div style={{ background: "var(--navy)", padding: "20px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 4 }}>Category {cat.code}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 300, color: "white" }}>{cat.name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "1.6rem", fontWeight: 700, color: "var(--gold-light)" }}>{cat.available}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Available</div>
                  </div>
                </div>
                {/* category body */}
                <div style={{ padding: "24px 28px" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", color: "#4a5568", lineHeight: 1.75, margin: "0 0 20px" }}>{cat.description}</p>
                  <div style={{ display: "flex", gap: 24 }}>
                    {[
                      { label: "Occupancy", value: `${cat.occupancy} Sailors` },
                      { label: "Total in Group", value: `${cat.qty} Cabins` },
                      { label: "Still Available", value: `${cat.available} Cabins` },
                    ].map(d => (
                      <div key={d.label}>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 3 }}>{d.label}</div>
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.88rem", fontWeight: 600, color: "var(--navy)" }}>{d.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bookings table */}
          <div style={{ background: "white", borderRadius: 10, border: "1px solid rgba(13,27,42,0.08)", overflow: "hidden" }}>
            <div style={{ padding: "20px 28px", borderBottom: "1px solid rgba(13,27,42,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 400, color: "var(--navy)", margin: 0 }}>Group Bookings</h3>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "#94a3b8", background: "#f8f6f0", padding: "4px 12px", borderRadius: 20 }}>0 of {VOYAGE.totalCabins} booked</span>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-body)", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ background: "#f8f6f0" }}>
                    {["Booking #", "Status", "Category", "Cabins", "Full Name"].map(h => (
                      <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontWeight: 600, color: "var(--navy)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} style={{ padding: "40px 20px", textAlign: "center", color: "#94a3b8", fontStyle: "italic" }}>
                      No bookings yet — be the first to reserve your cabin!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--navy)", padding: "64px 32px", textAlign: "center" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>Spots Are Limited</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 300, color: "white", lineHeight: 1.2, margin: "0 0 16px" }}>
            Ready to Join the Group?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "0 0 36px" }}>
            Only {allAvailable} cabins available across both categories. Reserve your spot today before they&apos;re gone. Contact Tim to lock in your cabin and get pricing details.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={`/request-quote?trip_type=Group+Cruise&ship=Valiant+Lady&voyage=${VOYAGE.voyageNumber}`}
              className="btn-primary" style={{ textDecoration: "none" }}>
              Reserve My Cabin
            </Link>
            <a href="tel:8885086893"
              style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)", padding: "13px 28px", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}>
              Call 888.508.6893
            </a>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginTop: 20 }}>
            Voyage {VOYAGE.voyageNumber} · {VOYAGE.ship} · Virgin Voyages
          </p>
        </div>
      </section>
    </>
  );
}
