"use client";
import Link from "next/link";

const partners = [
  { name: "Royal Caribbean", logo: "https://assets.widgety.co.uk/2024/09/16/07/48/49/8a9d77f2-b9e4-474b-90fc-615c2e048e6a/RCI Logo 2024 1.png" },
  { name: "Carnival", logo: "https://assets.widgety.co.uk/2024/03/15/10/29/55/843a8d60-ffae-44f2-be74-a58a31e496a7/Carnival Cruise Line Logo 2024 1.png" },
  { name: "Norwegian", logo: "https://assets.widgety.co.uk/2026/01/16/13/24/48/adbe3d4c-b28f-47cb-8831-34e55810af30/NCL Its Different Out Here Logo 2026.png" },
  { name: "MSC Cruises", logo: "https://assets.widgety.co.uk/2025/10/16/08/27/24/633fbc1c-30ae-429c-bcb1-69ebbabde3a7/MSC Cruises Logo 2025.png" },
  { name: "Virgin Voyages", logo: "https://assets.widgety.co.uk/2025/02/27/11/23/24/db38cdcc-3552-47ad-bea7-ddb1931f8985/Virgin Voyages Logo 2025.png" },
  { name: "Disney Cruise Line", logo: "https://assets.widgety.co.uk/2026/03/09/09/34/38/05c8d46a-6866-484e-a374-8da1135c9ddb/DCL Logo 2026 MGKIT © 2026 Disney. All Rights Reserved. Ships Registry The Bahamas.png" },
  { name: "Celebrity Cruises", logo: "https://assets.widgety.co.uk/2021/12/10/08/11/21/543fe4de-46b9-4e56-adba-bc77fa6b6122/Celebrity Cruises Logo Dec 2021 0.png" },
  { name: "Princess Cruises", logo: "https://assets.widgety.co.uk/2020/12/17/12/13/56/263baa16-5658-4a54-9783-0522d0c34daa/Princess Logo.jpg" },
];

export default function PartnerLogos() {
  return (
    <section style={{ background: "var(--navy)", borderBottom: "1px solid rgba(201,168,76,0.15)", padding: "32px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span className="overline" style={{ color: "rgba(255,255,255,0.3)" }}>Preferred Partners</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", alignItems: "center" }}>
          {partners.map((p, i) => (
            <Link key={i} href="/cruise-lines" style={{ textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{
                background: "rgba(255,255,255,0.1)",
                borderRadius: 4,
                padding: "10px 16px",
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
                minWidth: 100,
              }}>
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  width={110}
                  height={32}
                  style={{ maxHeight: 32, maxWidth: 110, objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.7 }}
                  onError={e => {
                    const wrapper = (e.currentTarget.parentElement?.parentElement) as HTMLElement | null;
                    if (wrapper) wrapper.style.display = "none";
                  }}
                />
              </div>
            </Link>
          ))}
          <Link href="/cruise-lines" style={{ textDecoration: "none" }}>
            <div style={{ padding: "10px 20px", border: "1px solid rgba(201,168,76,0.3)", height: 52, display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", whiteSpace: "nowrap" }}>+12 More →</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
