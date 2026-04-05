"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
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
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1400&q=85",
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
    href: "/request-quote",
    buttonText: "PLAN MY TRIP",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1400&q=85",
    subtitle: "Travel better, together.",
    title: "Cruises & Group Travel",
    description: "Corporate retreats, reunions, and milestone celebrations — we coordinate groups of any size.",
    href: "/request-quote",
    buttonText: "GET A GROUP QUOTE",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1400&q=85",
    subtitle: "Adventure meets elegance.",
    title: "Family Vacations",
    description: "Disney, Universal, Aulani — kid-friendly adventures with every detail handled for you.",
    href: "/request-quote",
    buttonText: "PLAN A FAMILY TRIP",
  },
  {
    id: 5,
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
    <section className="w-full bg-white py-8 md:py-12">
      <div className="mx-auto w-full max-w-[1320px] px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop
          speed={900}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="cw-hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              {/* Split-panel slide */}
              <div
                className="relative overflow-hidden rounded-[28px] md:rounded-[36px]"
                style={{ minHeight: "clamp(420px, 55vw, 600px)" }}
              >
                {/* Full-bleed background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />

                {/* Subtle left-fade so image reads well */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent" />

                {/* Right content panel — overlaps image */}
                <div className="absolute inset-y-0 right-0 flex items-stretch" style={{ width: "clamp(260px, 40%, 500px)" }}>
                  <div
                    className="flex items-center w-full"
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                    }}
                  >
                    <div className="px-8 py-10 md:px-12 md:py-14 w-full">

                      {/* Eyebrow */}
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                        <span style={{ display: "inline-block", width: 32, height: 1.5, background: "#c9a84c", flexShrink: 0 }} />
                        <span style={{
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "#c9a84c",
                        }}>
                          {slide.subtitle}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 style={{
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: "clamp(1.5rem, 2.8vw, 2.5rem)",
                        fontWeight: 400,
                        color: "#0d1b2a",
                        lineHeight: 1.18,
                        marginBottom: "0.9rem",
                        letterSpacing: "-0.01em",
                      }}>
                        {slide.title}
                      </h2>

                      {/* Description */}
                      <p style={{
                        fontSize: "0.875rem",
                        color: "#4a5568",
                        lineHeight: 1.8,
                        marginBottom: "1.75rem",
                        maxWidth: 320,
                      }}>
                        {slide.description}
                      </p>

                      {/* CTA button */}
                      <Link
                        href={slide.href}
                        className="cw-slide-btn"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minHeight: 46,
                          padding: "11px 26px",
                          background: "#0d1b2a",
                          color: "white",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          textDecoration: "none",
                          borderRadius: 9999,
                          transition: "background 0.2s, color 0.2s",
                        }}
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .cw-hero-swiper {
          padding-bottom: 52px;
        }

        /* Nav arrows */
        .cw-hero-swiper .swiper-button-prev,
        .cw-hero-swiper .swiper-button-next {
          width: 46px;
          height: 46px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
          color: #0d1b2a;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .cw-hero-swiper .swiper-button-prev:hover,
        .cw-hero-swiper .swiper-button-next:hover {
          background: #c9a84c;
          color: #0d1b2a;
          transform: scale(1.06);
        }
        .cw-hero-swiper .swiper-button-prev::after,
        .cw-hero-swiper .swiper-button-next::after {
          font-size: 13px;
          font-weight: 800;
        }
        .cw-hero-swiper .swiper-button-prev { left: 16px; }
        .cw-hero-swiper .swiper-button-next {
          /* Keep arrow on image side, not over panel */
          right: calc(clamp(260px, 40%, 500px) + 16px);
        }

        /* Pagination */
        .cw-hero-swiper .swiper-pagination { bottom: 0 !important; }
        .cw-hero-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          opacity: 1;
          background: rgba(13, 27, 42, 0.18);
          transition: all 0.3s;
        }
        .cw-hero-swiper .swiper-pagination-bullet-active {
          background: #c9a84c;
          width: 24px;
          border-radius: 4px;
        }

        /* CTA hover */
        .cw-slide-btn:hover {
          background: #c9a84c !important;
          color: #0d1b2a !important;
        }

        /* Mobile: arrows stay visible */
        @media (max-width: 640px) {
          .cw-hero-swiper .swiper-button-prev,
          .cw-hero-swiper .swiper-button-next {
            width: 36px;
            height: 36px;
          }
          .cw-hero-swiper .swiper-button-prev::after,
          .cw-hero-swiper .swiper-button-next::after { font-size: 11px; }
          .cw-hero-swiper .swiper-button-prev { left: 8px; }
          .cw-hero-swiper .swiper-button-next { right: 8px; }
        }
      `}</style>
    </section>
  );
}
