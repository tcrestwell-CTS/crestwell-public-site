"use client";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type Slide = {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  href: string;
  buttonText: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=1400&q=85",
    subtitle: "Escape the ordinary.",
    title: "Luxury Cruise Vacations",
    description: "From Caribbean getaways to world voyages — we match you with the perfect ship, itinerary, and cabin.",
    href: "/cruises",
    buttonText: "EXPLORE CRUISES",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=85",
    subtitle: "See more, stress less.",
    title: "All-Inclusive Resorts",
    description: "Sandals, Secrets, Beaches, and more — unlimited dining, drinks, and experiences included.",
    href: "/all-inclusive",
    buttonText: "PLAN MY TRIP",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&q=85",
    subtitle: "Travel better, together.",
    title: "Cruises & Group Travel",
    description: "Corporate retreats, reunions, and milestone celebrations — we coordinate groups of any size.",
    href: "/group-travel",
    buttonText: "GET A GROUP QUOTE",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=85",
    subtitle: "Empowering journeys with every step.",
    title: "Solo & Women's Travel",
    description: "Safe, empowering adventures crafted for solo travelers and women's groups — explore the world on your terms.",
    href: "/solo-travel",
    buttonText: "PLAN MY JOURNEY",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=85",
    subtitle: "Adventure meets elegance.",
    title: "Family Vacations",
    description: "Disney, Universal, Aulani — kid-friendly adventures with every detail handled for you.",
    href: "/request-quote",
    buttonText: "PLAN A FAMILY TRIP",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=1400&q=85",
    subtitle: "Your trip, upgraded.",
    title: "Custom Travel Planning",
    description: "Personalized itineraries crafted around your style, budget, and bucket list.",
    href: "/request-quote",
    buttonText: "START PLANNING",
  },
];

export default function TravelHeroSlider() {
  return (
    <section style={{ width: "100%", background: "white", padding: "40px 0" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 16px" }}>
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          loop
          speed={900}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="cw-hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="cw-slide-container" style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
                {/* Left: photo ~65% */}
                <div
                  className="cw-slide-image"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 65vw"
                    style={{ objectFit: "cover", objectPosition: "center center" }}
                    priority={slide.id === 1}
                    loading={slide.id === 1 ? "eager" : "lazy"}
                  />
                </div>

                {/* Right: plain white content panel ~35% */}
                <div className="cw-slide-panel" style={{ background: "white", display: "flex", alignItems: "center" }}>
                  <div style={{ width: "100%", maxWidth: 360 }}>

                    {/* Eyebrow */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 16 }}>
                      <span style={{
                        display: "inline-block",
                        width: 28,
                        height: 1.5,
                        background: "#c9a84c",
                        flexShrink: 0,
                        marginTop: 7,
                      }} />
                      <span style={{
                        fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                        fontSize: "0.62rem",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#0d1b2a",
                        lineHeight: 1.5,
                      }}>
                        {slide.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontFamily: "var(--font-display, 'Cormorant Garamond', Georgia, serif)",
                      fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                      fontWeight: 400,
                      color: "#0d1b2a",
                      lineHeight: 1.2,
                      marginBottom: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                    }}>
                      {slide.title}
                    </h2>

                    {/* Description */}
                    <p style={{
                      fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                      fontSize: "0.85rem",
                      color: "#4a5568",
                      lineHeight: 1.75,
                      marginBottom: 24,
                    }}>
                      {slide.description}
                    </p>

                    {/* CTA */}
                    <Link
                      href={slide.href}
                      className="cw-slide-btn"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 44,
                        padding: "0 24px",
                        background: "#c9a84c",
                        color: "#0d1b2a",
                        fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        transition: "background 0.2s, color 0.2s",
                      }}
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .cw-hero-swiper {
          padding-bottom: 48px;
        }

        /* No navigation arrows */
        .cw-hero-swiper .swiper-button-prev,
        .cw-hero-swiper .swiper-button-next {
          display: none;
        }

        /* Slide container */
        .cw-slide-container {
          display: flex;
          height: 400px;
        }

        /* Image panel */
        .cw-slide-image {
          flex: 0 0 65%;
          min-height: 100%;
          background-size: cover;
          background-position: center center;
        }

        /* Content panel */
        .cw-slide-panel {
          flex: 0 0 35%;
          padding: 40px 36px;
        }

        /* Mobile: stack vertically */
        @media (max-width: 640px) {
          .cw-slide-container {
            flex-direction: column;
            height: auto;
          }
          .cw-slide-image {
            flex: none;
            width: 100%;
            height: 260px;
            background-position: center center;
          }
          .cw-slide-panel {
            flex: none;
            width: 100%;
            padding: 28px 24px;
          }
        }

        /* Pagination dots */
        .cw-hero-swiper .swiper-pagination { bottom: 0 !important; }
        .cw-hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          opacity: 1;
          background: rgba(13, 27, 42, 0.2);
          transition: all 0.3s;
        }
        .cw-hero-swiper .swiper-pagination-bullet-active {
          background: #c9a84c;
          width: 22px;
          border-radius: 4px;
        }

        /* CTA hover */
        .cw-slide-btn:hover {
          background: #0d1b2a !important;
          color: white !important;
        }
      `}</style>
    </section>
  );
}
