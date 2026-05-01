"use client";
import { useState } from "react";

export interface CuratedTour {
  id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  duration: string;
  destination: string;
  category: string;
  freeCancellation: boolean;
  url: string;
  badge?: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24"
          fill={i <= Math.round(rating) ? "#f59e0b" : "none"}
          stroke="#f59e0b" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </span>
  );
}

function TourCard({ tour, accentColor, onSelect }: { tour: CuratedTour; accentColor: string; onSelect: (t: CuratedTour) => void }) {
  return (
    <div
      onClick={() => onSelect(tour)}
      style={{ background: "white", border: "1px solid #e2e8f0", overflow: "hidden", cursor: "pointer",
        display: "flex", flexDirection: "column", transition: "box-shadow 0.2s", borderRadius: 4 }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      <div style={{ height: 190, background: "#f1f5f9", position: "relative", flexShrink: 0 }}>
        <img src={tour.image} alt={tour.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {tour.freeCancellation && (
          <div style={{ position: "absolute", top: 10, left: 10, background: "#15803d", color: "white", padding: "3px 8px", fontSize: "0.68rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>
            Free Cancel
          </div>
        )}
        {tour.badge && (
          <div style={{ position: "absolute", top: 10, right: 10, background: accentColor, color: "white", padding: "3px 8px", fontSize: "0.68rem", fontWeight: 700, fontFamily: "var(--font-body)" }}>
            {tour.badge}
          </div>
        )}
      </div>
      <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: "0.7rem", color: accentColor, fontWeight: 600, fontFamily: "var(--font-body)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{tour.destination}</div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 400, color: "var(--navy)", marginBottom: 8, lineHeight: 1.4, flex: 1 }}>
          {tour.title}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>
          <StarRating rating={tour.rating} />
          <span style={{ fontWeight: 600, color: "var(--navy)" }}>{tour.rating.toFixed(1)}</span>
          <span>({tour.reviewCount.toLocaleString()})</span>
          {tour.duration && <span>⏱ {tour.duration}</span>}
        </div>
        <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #f0ece4", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>From</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 400, color: "var(--navy)" }}>${tour.price}</div>
            <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>per person</div>
          </div>
          <div style={{ background: "var(--navy)", color: "var(--gold)", padding: "9px 14px", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", fontFamily: "var(--font-body)" }}>
            View
          </div>
        </div>
      </div>
    </div>
  );
}

function TourModal({ tour, accentColor, onClose }: { tour: CuratedTour; accentColor: string; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", maxWidth: 660, width: "100%", maxHeight: "90vh", overflowY: "auto", borderRadius: 4 }}>
        <img src={tour.image} alt={tour.title} style={{ width: "100%", height: 260, objectFit: "cover" }} />
        <div style={{ padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div>
              <div style={{ fontSize: "0.72rem", color: accentColor, fontWeight: 600, fontFamily: "var(--font-body)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{tour.destination}</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 300, color: "var(--navy)", margin: 0 }}>{tour.title}</h2>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "var(--slate)", padding: 4 }}>✕</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <StarRating rating={tour.rating} />
            <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--navy)" }}>{tour.rating.toFixed(1)}</span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>({tour.reviewCount.toLocaleString()} reviews)</span>
          </div>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 20, fontFamily: "var(--font-body)" }}>{tour.description}</p>
          <div style={{ display: "flex", gap: 20, alignItems: "center", padding: "16px 0", borderTop: "1px solid #f0ece4", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>From</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 300, color: "var(--navy)" }}>${tour.price}</div>
              <div style={{ fontSize: "0.68rem", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>per person</div>
            </div>
            <div>
              <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}>Duration</div>
              <div style={{ fontSize: "1rem", fontWeight: 500, color: "var(--navy)", fontFamily: "var(--font-body)" }}>{tour.duration}</div>
            </div>
            {tour.freeCancellation && (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "8px 14px" }}>
                <span style={{ fontSize: "0.75rem", color: "#15803d", fontWeight: 600, fontFamily: "var(--font-body)" }}>✓ Free Cancellation</span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href={tour.url} target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, background: "var(--navy)", color: "var(--gold)", padding: "13px 20px", textAlign: "center", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Book Now →
            </a>
            <a href={`/request-quote?trip_type=Shore+Excursion&destination=${encodeURIComponent(tour.destination)}`}
              style={{ flex: 1, background: "var(--cream)", color: "var(--navy)", border: "1px solid var(--navy)", padding: "13px 20px", textAlign: "center", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Ask a Specialist
            </a>
          </div>
          <p style={{ fontSize: "0.68rem", color: "var(--text-secondary)", marginTop: 10, textAlign: "center", fontFamily: "var(--font-body)" }}>
            Crestwell earns a commission on bookings at no extra cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}

interface ExcursionSearchProps {
  tours: CuratedTour[];
  accentColor: string;
  searchUrl: (q: string) => string;
  searchPlaceholder: string;
  searchLabel?: string;
  cruisePorts: { label: string; url: string }[];
  categories: { label: string; url: string }[];
  providerName: string;
}

export default function ExcursionSearch({
  tours, accentColor, searchUrl, searchPlaceholder,
  searchLabel = "Search Any Destination", cruisePorts, categories, providerName
}: ExcursionSearchProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<CuratedTour | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const allCategories = ["All", ...Array.from(new Set(tours.map(t => t.category)))];
  const filtered = activeCategory === "All" ? tours : tours.filter(t => t.category === activeCategory);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.open(searchUrl(query.trim()), "_blank");
    }
  };

  return (
    <>
      {selected && <TourModal tour={selected} accentColor={accentColor} onClose={() => setSelected(null)} />}

      {/* City Search */}
      <div style={{ marginBottom: 40, padding: "24px 28px", background: "#f8f6f0", borderRadius: 10, border: `1px solid ${accentColor}22` }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: accentColor, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontFamily: "var(--font-body)" }}>{searchLabel}</div>
        <p style={{ color: "var(--slate)", fontSize: "0.85rem", fontFamily: "var(--font-body)", marginBottom: 14, lineHeight: 1.6 }}>Don&apos;t see your destination below? Search any city worldwide.</p>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            style={{ flex: "1 1 240px", padding: "12px 16px", border: `1px solid ${accentColor}44`, borderRadius: 6, fontSize: "0.9rem", fontFamily: "var(--font-body)", color: "var(--navy)", outline: "none", background: "white" }}
          />
          <button type="submit" style={{ flexShrink: 0, background: accentColor, color: "white", border: "none", padding: "12px 28px", borderRadius: 6, fontSize: "0.85rem", fontWeight: 700, fontFamily: "var(--font-body)", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Search →
          </button>
        </form>
      </div>

      {/* Cruise Ports — dedicated section */}
      <div style={{ marginBottom: 36, background: "var(--navy)", borderRadius: 10, padding: "24px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: "1.2rem" }}>🚢</span>
          <div>
            <div style={{ fontSize: "0.72rem", fontWeight: 700, color: accentColor, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>Cruise Port Excursions</div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-body)", marginTop: 2 }}>Browse shore excursions at your port of call</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {cruisePorts.map(p => (
            <a key={p.label} href={p.url} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: "rgba(255,255,255,0.08)", border: `1px solid ${accentColor}66`, borderRadius: 20, padding: "7px 16px", textDecoration: "none", color: "white", fontSize: "0.8rem", fontFamily: "var(--font-body)", fontWeight: 500, transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = `${accentColor}33`)}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}>
              {p.label}
            </a>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, color: accentColor, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14, fontFamily: "var(--font-body)" }}>Filter by Type</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {allCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ background: activeCategory === cat ? accentColor : "white", color: activeCategory === cat ? "white" : "var(--navy)", border: `1px solid ${activeCategory === cat ? accentColor : "#e2e8f0"}`, borderRadius: 20, padding: "6px 16px", fontSize: "0.8rem", fontFamily: "var(--font-body)", fontWeight: 500, cursor: "pointer" }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Tours Label */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, color: accentColor, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4, fontFamily: "var(--font-body)" }}>Featured Experiences</div>
          <p style={{ color: "var(--slate)", fontSize: "0.85rem", fontFamily: "var(--font-body)", margin: 0 }}>Curated top picks — click any card to see details and book.</p>
        </div>
      </div>

      {/* Tour Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,260px), 1fr))", gap: 20 }}>
        {filtered.map(tour => (
          <TourCard key={tour.id} tour={tour} accentColor={accentColor} onSelect={setSelected} />
        ))}
      </div>

      {/* Search More */}
      <div style={{ marginTop: 40, textAlign: "center", padding: "32px", background: "#f8f6f0", borderRadius: 10 }}>
        <p style={{ color: "var(--slate)", fontSize: "0.9rem", fontFamily: "var(--font-body)", marginBottom: 16 }}>
          These are curated picks. {providerName} has thousands more experiences worldwide.
        </p>
        <button onClick={() => window.open(searchUrl("tours"), "_blank")}
          style={{ background: accentColor, color: "white", border: "none", padding: "12px 32px", fontSize: "0.85rem", fontWeight: 700, fontFamily: "var(--font-body)", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 4 }}>
          Browse All {providerName} Experiences →
        </button>
      </div>
    </>
  );
}
