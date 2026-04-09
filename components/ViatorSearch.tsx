"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

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
  destinations?: Array<{ ref: string; primary: boolean }>;
}

const PORT_LABELS: Record<string, string> = {
  nassau: "Nassau, Bahamas",
  cozumel: "Cozumel, Mexico",
  "st-thomas": "St. Thomas, USVI",
  "st-maarten": "St. Maarten",
  "grand-cayman": "Grand Cayman",
  "key-west": "Key West",
  caribbean: "Caribbean",
  mediterranean: "Mediterranean",
  barcelona: "Barcelona",
  rome: "Rome",
  athens: "Athens",
  santorini: "Santorini",
  alaska: "Alaska",
  juneau: "Juneau",
  europe: "Europe",
};

function formatDuration(d: ViatorProduct["duration"]): string {
  if (!d) return "";
  if (d.fixedDurationInMinutes) {
    const h = Math.floor(d.fixedDurationInMinutes / 60);
    const m = d.fixedDurationInMinutes % 60;
    return h > 0 ? (m > 0 ? `${h}h ${m}m` : `${h} hour${h > 1 ? "s" : ""}`) : `${m} min`;
  }
  if (d.variableDurationFromMinutes && d.variableDurationToMinutes) {
    const fh = Math.floor(d.variableDurationFromMinutes / 60);
    const th = Math.floor(d.variableDurationToMinutes / 60);
    return `${fh}–${th} hours`;
  }
  return "";
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth="1.5">
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
  const isFreeCancellation = product.flags?.includes("FREE_CANCELLATION");

  return (
    <div
      onClick={() => onSelect(product)}
      style={{
        background: "white",
        border: "1px solid #e2e8f0",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "none";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div style={{ height: 200, position: "relative", overflow: "hidden", background: "#f8fafc", flexShrink: 0 }}>
        {img ? (
          <img src={img} alt={product.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--navy), #1a3a5c)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "3rem", opacity: 0.3 }}>🌊</span>
          </div>
        )}
        {isFreeCancellation && (
          <div style={{ position: "absolute", top: 10, left: 10, background: "#16a34a", color: "white", padding: "3px 8px", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-body)" }}>
            Free Cancellation
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 400, color: "var(--navy)", marginBottom: 8, lineHeight: 1.4 }}>
          {product.title}
        </h3>

        {(rating || duration) && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
            {rating && (
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <StarRating rating={rating} />
                <span style={{ fontWeight: 600, color: "var(--navy)" }}>{rating.toFixed(1)}</span>
                {reviewCount && <span>({reviewCount.toLocaleString()})</span>}
              </span>
            )}
            {duration && <span>⏱ {duration}</span>}
          </div>
        )}

        <div style={{ marginTop: "auto", paddingTop: 12, borderTop: "1px solid #f0ece4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>From</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, color: "var(--navy)" }}>
              ${price?.toFixed(2) ?? "—"}
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.68rem", color: "var(--text-secondary)" }}>per person</div>
          </div>
          <button
            style={{ background: "var(--navy)", color: "var(--gold)", border: "none", padding: "10px 18px", fontFamily: "var(--font-body)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}
          >
            View Details
          </button>
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
  subtitle = "Book tours, excursions, and experiences at every port — powered by Viator",
  showDestinationFilter = true,
  compact = false,
}: ViatorSearchProps) {
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
      if (!res.ok) throw new Error(data.error?.message || "Search failed");
      setProducts(data.products || []);
      setTotalCount(data.totalCount || 0);
    } catch (e: any) {
      setError(e.message || "Failed to load activities");
    } finally {
      setLoading(false);
    }
  }, [PAGE_SIZE]);

  useEffect(() => {
    search(destination, 1);
    setPage(1);
  }, [destination]);

  const destinations = Object.keys(PORT_LABELS);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div style={{ fontFamily: "var(--font-body)" }}>
      {/* Header */}
      {!compact && (
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="overline" style={{ marginBottom: 12 }}>Powered by Viator</div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 300, color: "var(--navy)", marginBottom: 12 }}>
            {title}
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", maxWidth: 560, margin: "0 auto" }}>
            {subtitle}
          </p>
        </div>
      )}

      {/* Destination filter */}
      {showDestinationFilter && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32, justifyContent: compact ? "flex-start" : "center" }}>
          {destinations.map(d => (
            <button
              key={d}
              onClick={() => setDestination(d)}
              style={{
                padding: "8px 16px",
                background: destination === d ? "var(--navy)" : "white",
                color: destination === d ? "var(--gold)" : "var(--text-secondary)",
                border: `1px solid ${destination === d ? "var(--navy)" : "#e2e8f0"}`,
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: destination === d ? 700 : 400,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {PORT_LABELS[d]}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-secondary)" }}>
          <div style={{ fontSize: "2rem", marginBottom: 16, opacity: 0.5 }}>🌊</div>
          <p style={{ fontSize: "0.9rem" }}>Loading activities...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#dc2626" }}>
          <p>{error}</p>
        </div>
      ) : (
        <>
          {totalCount > 0 && (
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: 20 }}>
              {totalCount.toLocaleString()} activities in {PORT_LABELS[destination] || destination}
            </p>
          )}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${compact ? "240px" : "280px"}, 1fr))`, gap: 20 }}>
            {products.map(p => (
              <ViatorCard key={p.productCode} product={p} onSelect={setSelected} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 40 }}>
              {Array.from({ length: Math.min(totalPages, 8) }, (_, i) => i + 1).map(pg => (
                <button
                  key={pg}
                  onClick={() => { setPage(pg); search(destination, pg); }}
                  style={{
                    width: 36, height: 36,
                    background: pg === page ? "var(--navy)" : "white",
                    color: pg === page ? "var(--gold)" : "var(--navy)",
                    border: "1px solid #e2e8f0",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.82rem",
                    cursor: "pointer",
                  }}
                >
                  {pg}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Product Detail Modal */}
      {selected && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{ background: "white", maxWidth: 680, width: "100%", maxHeight: "90vh", overflow: "auto" }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal image */}
            {selected.images?.[0]?.variants?.[0]?.url && (
              <img
                src={selected.images[0].variants.find(v => v.width >= 600)?.url || selected.images[0].variants[0].url}
                alt={selected.title}
                style={{ width: "100%", height: 280, objectFit: "cover" }}
              />
            )}
            <div style={{ padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <h2 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 300, color: "var(--navy)", flex: 1, marginRight: 16 }}>
                  {selected.title}
                </h2>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "var(--text-secondary)", flexShrink: 0 }}>×</button>
              </div>

              {selected.reviews && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <StarRating rating={selected.reviews.combinedAverageRating} />
                  <span style={{ fontSize: "0.85rem", color: "var(--navy)", fontWeight: 600 }}>{selected.reviews.combinedAverageRating.toFixed(1)}</span>
                  <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>({selected.reviews.totalReviews.toLocaleString()} reviews)</span>
                </div>
              )}

              {selected.description && (
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 24 }}>
                  {selected.description.replace(/<[^>]*>/g, "").slice(0, 400)}...
                </p>
              )}

              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", marginBottom: 28, padding: "16px 0", borderTop: "1px solid #f0ece4", borderBottom: "1px solid #f0ece4" }}>
                <div>
                  <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", marginBottom: 4 }}>From</div>
                  <div className="font-display" style={{ fontSize: "1.8rem", fontWeight: 300, color: "var(--navy)" }}>
                    ${selected.pricing?.summary?.fromPrice?.toFixed(2)}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>per person</div>
                </div>
                {formatDuration(selected.duration) && (
                  <div>
                    <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", marginBottom: 4 }}>Duration</div>
                    <div style={{ fontSize: "1rem", color: "var(--navy)", fontWeight: 500 }}>{formatDuration(selected.duration)}</div>
                  </div>
                )}
                {selected.flags?.includes("FREE_CANCELLATION") && (
                  <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "8px 14px" }}>
                    <div style={{ fontSize: "0.75rem", color: "#15803d", fontWeight: 600 }}>✓ Free Cancellation</div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <a
                  href={selected.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ flex: 1, background: "var(--navy)", color: "var(--gold)", padding: "14px 24px", textAlign: "center", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", display: "block" }}
                >
                  Book on Viator →
                </a>
                <a
                  href={`/request-quote?trip_type=Shore+Excursion&destination=${encodeURIComponent(selected.title)}`}
                  style={{ flex: 1, background: "var(--cream)", color: "var(--navy)", padding: "14px 24px", textAlign: "center", textDecoration: "none", fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", border: "1px solid var(--navy)" }}
                >
                  Ask a Specialist
                </a>
              </div>
              <p style={{ fontSize: "0.72rem", color: "var(--text-secondary)", marginTop: 12, textAlign: "center" }}>
                Fulfilled by Viator · Millions of travelers trust Viator
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
