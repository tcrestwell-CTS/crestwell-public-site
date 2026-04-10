"use client";
import { useState, useEffect, useCallback } from "react";

interface ViatorProduct {
  productCode: string;
  title: string;
  description?: string;
  images?: Array<{ variants: Array<{ url: string; width: number }> }>;
  reviews?: { combinedAverageRating: number; totalReviews: number };
  pricing?: { summary: { fromPrice: number }; currency: string };
  duration?: { fixedDurationInMinutes?: number; variableDurationFromMinutes?: number; variableDurationToMinutes?: number };
  flags?: string[];
  productUrl?: string;
}

// Grouped by region — maps slug to { label, viatorId }
const REGIONS = [
  {
    label: "Caribbean",
    ports: [
      { slug: "caribbean",    label: "All Caribbean" },
      { slug: "nassau",       label: "Nassau, Bahamas" },
      { slug: "cozumel",      label: "Cozumel" },
      { slug: "st-thomas",    label: "St. Thomas" },
      { slug: "st-maarten",   label: "St. Maarten" },
      { slug: "grand-cayman", label: "Grand Cayman" },
      { slug: "roatan",       label: "Roatan" },
      { slug: "belize",       label: "Belize City" },
    ],
  },
  {
    label: "Alaska",
    ports: [
      { slug: "alaska",    label: "All Alaska" },
      { slug: "juneau",    label: "Juneau" },
      { slug: "ketchikan", label: "Ketchikan" },
      { slug: "skagway",   label: "Skagway" },
      { slug: "sitka",     label: "Sitka" },
      { slug: "anchorage", label: "Anchorage" },
    ],
  },
  {
    label: "Mediterranean",
    ports: [
      { slug: "barcelona",    label: "Barcelona" },
      { slug: "rome",         label: "Rome" },
      { slug: "athens",       label: "Athens" },
      { slug: "santorini",    label: "Santorini" },
      { slug: "dubrovnik",    label: "Dubrovnik" },
      { slug: "venice",       label: "Venice" },
      { slug: "lisbon",       label: "Lisbon" },
    ],
  },
];

function formatDuration(d: ViatorProduct["duration"]): string {
  if (!d) return "";
  if (d.fixedDurationInMinutes) {
    const h = Math.floor(d.fixedDurationInMinutes / 60);
    const m = d.fixedDurationInMinutes % 60;
    return h > 0 ? (m > 0 ? `${h}h ${m}m` : `${h}h`) : `${m}m`;
  }
  if (d.variableDurationFromMinutes && d.variableDurationToMinutes) {
    return `${Math.floor(d.variableDurationFromMinutes / 60)}–${Math.floor(d.variableDurationToMinutes / 60)}h`;
  }
  return "";
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

function ViatorCard({ product, onSelect }: { product: ViatorProduct; onSelect: (p: ViatorProduct) => void }) {
  const img = product.images?.[0]?.variants?.find(v => v.width >= 400)?.url
    || product.images?.[0]?.variants?.[0]?.url;
  const price = product.pricing?.summary?.fromPrice;
  const rating = product.reviews?.combinedAverageRating;
  const reviewCount = product.reviews?.totalReviews;
  const duration = formatDuration(product.duration);
  const freeCancellation = product.flags?.includes("FREE_CANCELLATION");

  return (
    <div
      onClick={() => onSelect(product)}
      style={{ background: "white", border: "1px solid #e2e8f0", overflow: "hidden", cursor: "pointer",
        display: "flex", flexDirection: "column", transition: "box-shadow 0.2s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
    >
      <div style={{ height: 190, background: "#f1f5f9", position: "relative", flexShrink: 0 }}>
        {img
          ? <img src={img} alt={product.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#0d1b2a,#1a3a5c)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "2.5rem", opacity: 0.3 }}>🌊</span></div>
        }
        {freeCancellation && (
          <div style={{ position: "absolute", top: 10, left: 10, background: "#15803d", color: "white", padding: "3px 8px", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Free Cancel
          </div>
        )}
      </div>
      <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 400, color: "var(--navy)", marginBottom: 8, lineHeight: 1.4 }}>
          {product.title}
        </h3>
        {(rating || duration) && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            {rating && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><StarRating rating={rating} /><strong style={{ color: "var(--navy)" }}>{rating.toFixed(1)}</strong>{reviewCount ? <span>({reviewCount.toLocaleString()})</span> : null}</span>}
            {duration && <span>⏱ {duration}</span>}
          </div>
        )}
        <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #f0ece4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)" }}>From</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 400, color: "var(--navy)" }}>${price != null ? price.toFixed(2) : "—"}</div>
            <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>per person</div>
          </div>
          <div style={{ background: "var(--navy)", color: "var(--gold)", padding: "9px 14px", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            View
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, onClose }: { product: ViatorProduct; onClose: () => void }) {
  const img = product.images?.[0]?.variants?.find(v => v.width >= 600)?.url || product.images?.[0]?.variants?.[0]?.url;
  const price = product.pricing?.summary?.fromPrice;
  const rating = product.reviews?.combinedAverageRating;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "white", maxWidth: 660, width: "100%", maxHeight: "90vh", overflow: "auto" }}>
        {img && <img src={img} alt={product.title} style={{ width: "100%", height: 260, objectFit: "cover" }} />}
        <div style={{ padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 300, color: "var(--navy)", flex: 1, marginRight: 16 }}>{product.title}</h2>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: "#94a3b8" }}>×</button>
          </div>
          {rating && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <StarRating rating={rating} />
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--navy)" }}>{rating.toFixed(1)}</span>
              {product.reviews?.totalReviews && <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>({product.reviews.totalReviews.toLocaleString()} reviews)</span>}
            </div>
          )}
          {product.description && (
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 22 }}>
              {product.description.replace(/<[^>]*>/g, "").slice(0, 450)}…
            </p>
          )}
          <div style={{ display: "flex", gap: 20, alignItems: "center", padding: "16px 0", borderTop: "1px solid #f0ece4", borderBottom: "1px solid #f0ece4", marginBottom: 20, flexWrap: "wrap" }}>
            {price != null && (
              <div>
                <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", marginBottom: 4 }}>From</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 300, color: "var(--navy)" }}>${price.toFixed(2)}</div>
                <div style={{ fontSize: "0.68rem", color: "var(--text-secondary)" }}>per person</div>
              </div>
            )}
            {formatDuration(product.duration) && (
              <div>
                <div style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", marginBottom: 4 }}>Duration</div>
                <div style={{ fontSize: "1rem", fontWeight: 500, color: "var(--navy)" }}>{formatDuration(product.duration)}</div>
              </div>
            )}
            {product.flags?.includes("FREE_CANCELLATION") && (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "8px 14px" }}>
                <span style={{ fontSize: "0.75rem", color: "#15803d", fontWeight: 600 }}>✓ Free Cancellation</span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href={product.productUrl} target="_blank" rel="noopener noreferrer"
              style={{ flex: 1, background: "var(--navy)", color: "var(--gold)", padding: "13px 20px", textAlign: "center", textDecoration: "none", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block" }}>
              Book on Viator →
            </a>
            <a href={`/request-quote?trip_type=Shore+Excursion&destination=${encodeURIComponent(product.title)}`}
              style={{ flex: 1, background: "var(--cream)", color: "var(--navy)", border: "1px solid var(--navy)", padding: "13px 20px", textAlign: "center", textDecoration: "none", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body)", display: "block" }}>
              Ask a Specialist
            </a>
          </div>
          <p style={{ fontSize: "0.68rem", color: "var(--text-secondary)", marginTop: 10, textAlign: "center" }}>Fulfilled by Viator · Millions of verified reviews</p>
        </div>
      </div>
    </div>
  );
}

interface ViatorSearchProps {
  defaultDestination?: string;
  title?: string;
  subtitle?: string;
  showDestinationFilter?: boolean;
  compact?: boolean;
}

export default function ViatorSearch({
  defaultDestination = "caribbean",
  title = "Shore Excursions & Activities",
  subtitle = "Book tours and experiences at every port — real pricing, verified reviews",
  showDestinationFilter = true,
  compact = false,
}: ViatorSearchProps) {
  const [activeRegion, setActiveRegion] = useState(() => {
    for (const r of REGIONS) {
      if (r.ports.some(p => p.slug === defaultDestination)) return r.label;
    }
    return REGIONS[0].label;
  });
  const [destination, setDestination] = useState(defaultDestination);
  const [products, setProducts] = useState<ViatorProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selected, setSelected] = useState<ViatorProduct | null>(null);
  const PAGE_SIZE = compact ? 6 : 12;

  const search = useCallback(async (dest: string, pg: number) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/viator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "search", destination: dest, page: pg, count: PAGE_SIZE }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || JSON.stringify(data.error) || "Search failed");
      setProducts(data.products || []);
      setTotalCount(data.totalCount || 0);
    } catch (e: any) {
      setError(e.message || "Failed to load activities");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [PAGE_SIZE]);

  useEffect(() => {
    setPage(1);
    search(destination, 1);
  }, [destination, search]);

  const currentRegion = REGIONS.find(r => r.label === activeRegion) || REGIONS[0];
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const portLabel = REGIONS.flatMap(r => r.ports).find(p => p.slug === destination)?.label || destination;

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Header */}
      {!compact && (
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Powered by Viator</div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 300, color: "var(--navy)", marginBottom: 10 }}>{title}</h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", maxWidth: 540, margin: "0 auto" }}>{subtitle}</p>
        </div>
      )}

      {showDestinationFilter && (
        <div style={{ marginBottom: 28 }}>
          {/* Region tabs */}
          <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: "2px solid #e2e8f0" }}>
            {REGIONS.map(r => (
              <button key={r.label} onClick={() => { setActiveRegion(r.label); setDestination(r.ports[0].slug); }}
                style={{ padding: "10px 24px", background: "none", border: "none",
                  borderBottom: activeRegion === r.label ? "2px solid var(--navy)" : "2px solid transparent",
                  marginBottom: -2,
                  color: activeRegion === r.label ? "var(--navy)" : "var(--text-secondary)",
                  fontFamily: "var(--font-body)", fontSize: "0.82rem", fontWeight: activeRegion === r.label ? 700 : 400,
                  letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
                {r.label}
              </button>
            ))}
          </div>

          {/* Port buttons within active region */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {currentRegion.ports.map(p => (
              <button key={p.slug} onClick={() => setDestination(p.slug)}
                style={{ padding: "7px 14px",
                  background: destination === p.slug ? "var(--navy)" : "white",
                  color: destination === p.slug ? "var(--gold)" : "var(--text-secondary)",
                  border: `1px solid ${destination === p.slug ? "var(--navy)" : "#e2e8f0"}`,
                  fontFamily: "var(--font-body)", fontSize: "0.72rem",
                  fontWeight: destination === p.slug ? 700 : 400,
                  letterSpacing: "0.05em", cursor: "pointer", transition: "all 0.15s" }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      {!loading && totalCount > 0 && (
        <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: 20 }}>
          {totalCount.toLocaleString()} activities in <strong>{portLabel}</strong>
        </p>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "56px 0", color: "var(--text-secondary)" }}>
          <div style={{ fontSize: "2rem", marginBottom: 14, opacity: 0.4 }}>🌊</div>
          <p style={{ fontSize: "0.88rem" }}>Loading activities…</p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div style={{ textAlign: "center", padding: "32px 0", color: "#dc2626", fontSize: "0.88rem" }}>
          <p>{error}</p>
          <button onClick={() => search(destination, page)} style={{ marginTop: 12, padding: "8px 20px", background: "var(--navy)", color: "white", border: "none", cursor: "pointer", fontSize: "0.78rem" }}>
            Try Again
          </button>
        </div>
      )}

      {/* Grid */}
      {!loading && !error && products.length > 0 && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${compact ? "230px" : "270px"}, 1fr))`, gap: 20 }}>
            {products.map(p => <ViatorCard key={p.productCode} product={p} onSelect={setSelected} />)}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 36 }}>
              {Array.from({ length: Math.min(totalPages, 8) }, (_, i) => i + 1).map(pg => (
                <button key={pg} onClick={() => { setPage(pg); search(destination, pg); }}
                  style={{ width: 34, height: 34, background: pg === page ? "var(--navy)" : "white",
                    color: pg === page ? "var(--gold)" : "var(--navy)",
                    border: "1px solid #e2e8f0", fontSize: "0.8rem", cursor: "pointer" }}>
                  {pg}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!loading && !error && products.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-secondary)" }}>
          <p style={{ fontSize: "0.88rem" }}>No activities found for this destination.</p>
        </div>
      )}

      {/* Modal */}
      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
