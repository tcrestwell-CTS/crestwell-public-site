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
    description: "From Caribbean getaways to world voyages — we match you with the perfect ship, itinerary, and cabin",
    href: "/cruises",
    buttonText: "Explore Cruises",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=85",
    subtitle: "See more, stress less.",
    title: "All-Inclusive Resorts",
    description: "Sandals, Secrets, Beaches, and more — seamless vacations with unlimited dining, drinks, and experiences included",
    href: "/request-quote",
    buttonText: "Plan My Trip",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1400&q=85",
    subtitle: "Travel better, together.",
    title: "Cruises & Group Travel",
    description: "Corporate retreats, reunions, and milestone celebrations — we coordinate groups of any size",
    href: "/request-quote",
    buttonText: "Get a Group Quote",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1400&q=85",
    subtitle: "Adventure meets elegance.",
    title: "Family Vacations",
    description: "Disney, Universal, Aulani — kid-friendly adventures with every detail handled for you",
    href: "/request-quote",
    buttonText: "Plan a Family Trip",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=1400&q=85",
    subtitle: "Your trip, upgraded.",
    title: "Custom Travel Planning",
    description: "Personalized itineraries crafted around your style, budget, and bucket list",
    href: "/request-quote",
    buttonText: "Start Planning",
  },
];

export default function TravelHeroSlider() {
  return (
    <section className="w-full bg-white py-8 md:py-12">
      <div className="mx-auto w-full max-w-[1320px] px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          speed={900}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { spaceBetween: 32 },
            1024: { spaceBetween: 40 },
          }}
          className="cw-hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative overflow-hidden rounded-[28px] md:rounded-[36px]">
                {/* Background image */}
                <div
                  className="min-h-[500px] bg-cover bg-center bg-no-repeat md:min-h-[620px]"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-end">
                  <div className="w-full p-5 md:p-8 lg:p-10">
                    <div className="max-w-[580px] rounded-[24px] bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md md:p-8">

                      {/* Eyebrow */}
                      <div className="mb-4 flex items-center gap-3">
                        <span className="h-px w-10 bg-[#c9a84c]/90" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c9a84c] md:text-xs">
                          {slide.subtitle}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="mb-3 text-3xl font-semibold leading-tight md:text-5xl md:leading-[1.05]">
                        {slide.title}
                      </h2>

                      {/* Description */}
                      <p className="mb-6 max-w-[460px] text-sm text-white/85 md:text-lg">
                        {slide.description}
                      </p>

                      {/* CTA */}
                      <Link
                        href={slide.href}
                        className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#c9a84c] px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#0d1b2a] transition hover:-translate-y-[1px] hover:bg-[#d4b55a]"
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
        /* ── Swiper container ── */
        .cw-hero-swiper {
          padding-bottom: 56px;
        }

        /* ── Nav buttons ── */
        .cw-hero-swiper .swiper-button-prev,
        .cw-hero-swiper .swiper-button-next {
          width: 52px;
          height: 52px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
          color: #0d1b2a;
          transition: background 0.2s, transform 0.2s;
        }

        .cw-hero-swiper .swiper-button-prev:hover,
        .cw-hero-swiper .swiper-button-next:hover {
          background: #c9a84c;
          color: #0d1b2a;
          transform: scale(1.06);
        }

        .cw-hero-swiper .swiper-button-prev::after,
        .cw-hero-swiper .swiper-button-next::after {
          font-size: 15px;
          font-weight: 700;
        }

        .cw-hero-swiper .swiper-button-prev { left: 18px; }
        .cw-hero-swiper .swiper-button-next { right: 18px; }

        /* ── Pagination ── */
        .cw-hero-swiper .swiper-pagination {
          bottom: 0 !important;
        }

        .cw-hero-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          opacity: 1;
          background: rgba(13, 27, 42, 0.2);
          transition: background 0.3s, width 0.3s;
        }

        .cw-hero-swiper .swiper-pagination-bullet-active {
          background: #c9a84c;
          width: 28px;
          border-radius: 5px;
        }

        /* ── Mobile ── */
        @media (max-width: 767px) {
          .cw-hero-swiper .swiper-button-prev,
          .cw-hero-swiper .swiper-button-next {
            width: 40px;
            height: 40px;
          }

          .cw-hero-swiper .swiper-button-prev::after,
          .cw-hero-swiper .swiper-button-next::after {
            font-size: 13px;
          }

          .cw-hero-swiper .swiper-button-prev { left: 10px; }
          .cw-hero-swiper .swiper-button-next { right: 10px; }
        }
      `}</style>
    </section>
  );
}
