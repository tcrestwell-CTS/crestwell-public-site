"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getFeaturedTrips } from "@/lib/supabase";
import type { FeaturedTrip } from "@/lib/supabase";

export default function FeaturedTrips() {
  const [featuredTrips, setFeaturedTrips] = useState<FeaturedTrip[]>([]);

  useEffect(() => {
    getFeaturedTrips()
      .then(trips => {
        const popular = trips.filter(t => t.popular);
        const shown = popular.length >= 2 ? popular : trips;
        setFeaturedTrips(shown.slice(0, 4));
      })
      .catch(console.error);
  }, []);

  if (!featuredTrips.length) return null;

  return (
    <section className="section-pad" style={{ background: "white" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="overline" style={{ marginBottom: 12 }}>Popular Itineraries</div>
            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "var(--navy)", lineHeight: 1.2 }}>Where Will You Go?</h2>
          </div>
          <Link href="/destinations" className="btn-navy" style={{ textDecoration: "none" }}>View All Destinations</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {featuredTrips.map(trip => (
            <Link
              key={trip.id}
              href={`/request-quote?destination=${encodeURIComponent(trip.destination)}&trip_type=${encodeURIComponent(trip.trip_type || "Cruise Vacation")}&trip_name=${encodeURIComponent(trip.trip_name)}`}
              className="card-hover"
              style={{ overflow: "hidden", background: "var(--navy)", cursor: "pointer", textDecoration: "none", display: "block" }}
            >
              <div style={{ height: 220, backgroundImage: `url(${trip.cover_image_url || "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80"})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative", contentVisibility: "auto" }}>
                {trip.trip_type && (
                  <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(13,27,42,0.8)", padding: "4px 12px", backdropFilter: "blur(4px)" }}>
                    <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>{trip.trip_type}</span>
                  </div>
                )}
                {trip.popular && (
                  <div style={{ position: "absolute", top: 16, right: 16, background: "var(--gold)", padding: "4px 12px" }}>
                    <span style={{ fontSize: "0.6rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--navy)" }}>Popular</span>
                  </div>
                )}
              </div>
              <div style={{ padding: "28px 28px 32px" }}>
                <h3 className="font-display" style={{ fontSize: "1.35rem", fontWeight: 400, color: "white", marginBottom: 10 }}>{trip.trip_name}</h3>
                {trip.description && <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{trip.description}</p>}
                <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--gold)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Request a Quote →</span>
                  {trip.starting_from && <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>From {String(trip.starting_from)}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
