import { cities, cityPageMetadata } from '@/data/cities';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import type { Metadata } from 'next';

export const metadata: Metadata = cityPageMetadata('chattanooga');

export default function Page() {
  const cityData = cities.find((c) => c.slug === 'chattanooga');
  if (!cityData) notFound();
  const d = cityData!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        name: "Crestwell Travel Services",
        image: "https://crestwellgetaways.com/logo.png",
        url: `https://crestwellgetaways.com/travel-agent-${d.slug}`,
        telephone: "+1-888-508-6893",
        email: "info@crestwellgetaways.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chattanooga",
          addressRegion: "TN",
          addressCountry: "US",
        },
        areaServed: d.neighborhoods.map((n) => ({
          "@type": "City",
          name: n,
        })),
        priceRange: "$$",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "27",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: d.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-amber-300 mb-4">
            Serving Metro {d.city} · ASTA Member · CLIA Certified
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
            {d.city}'s Personal Travel Advisor for Cruises & All-Inclusive Getaways
          </h1>
          <p className="text-xl text-slate-200 mb-8 max-w-3xl">{d.heroSubhead}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/request-quote?city=${d.slug}`}
              className="bg-amber-400 text-slate-900 px-8 py-4 rounded-md font-semibold hover:bg-amber-300 transition"
            >
              Request My Free Quote
            </Link>
            <a
              href="tel:8885086893"
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-slate-900 transition"
            >
              Call 888.508.6893
            </a>
          </div>
          <p className="mt-8 text-sm text-slate-300">
            ⭐⭐⭐⭐⭐ Rated 5.0 by {d.city} travelers · ASTA Member · CLIA Certified · Carnival Diamond Expert
          </p>
        </div>
      </section>

      {/* LOCAL ANGLE */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-slate-900">
            Why {d.city} Families Book With Crestwell
          </h2>
          {d.localAngle.split("\n\n").map((p, i) => (
            <p key={i} className="text-lg text-slate-700 leading-relaxed mb-6">
              {p}
            </p>
          ))}
          <p className="text-lg text-slate-700 leading-relaxed mt-6 font-semibold">
            No planning fees. No booking fees. Ever. We're compensated by the cruise lines and resorts, so our service is completely free to you.
          </p>
        </div>
      </section>

      {/* PORTS */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-slate-900">
            Your Best Cruise & Vacation Departure Options From {d.city}
          </h2>
          <p className="text-lg text-slate-700 mb-10">
            {d.majorAirport.note}
          </p>

          <h3 className="text-2xl font-serif font-semibold mb-6 text-slate-800">
            Closest Cruise Ports to {d.city}
          </h3>
          <div className="space-y-4 mb-10">
            {d.closestPorts.map((port, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <h4 className="text-xl font-semibold text-slate-900">
                    {port.name}, {port.state}
                  </h4>
                  <span className="text-sm bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-medium">
                    {port.driveTime}
                  </span>
                </div>
                <p className="text-slate-600 mb-1">
                  <strong>Cruise lines:</strong> {port.cruiseLines}
                </p>
                <p className="text-slate-600">
                  <strong>Best for:</strong> {port.bestFor}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded">
            <h4 className="font-semibold text-lg mb-2 text-slate-900">Flying vs. Driving</h4>
            <p className="text-slate-700">{d.drivingVsFlying}</p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-slate-900 text-center">
            What We Plan for {d.city} Travelers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-slate-200 rounded-lg">
              <div className="text-3xl mb-3">⚓</div>
              <h3 className="text-xl font-semibold mb-3">Cruise Vacations</h3>
              <p className="text-slate-600">
                From 3-night Bahamas weekends to 14-night Mediterranean voyages — we match you with the right line, ship, and cabin.
              </p>
            </div>
            <div className="p-6 border border-slate-200 rounded-lg">
              <div className="text-3xl mb-3">🌴</div>
              <h3 className="text-xl font-semibold mb-3">All-Inclusive Resorts</h3>
              <p className="text-slate-600">
                Sandals, Beaches, Secrets, Excellence, Riu — we know the resorts, the room categories worth the upgrade, and which weeks to avoid.
              </p>
            </div>
            <div className="p-6 border border-slate-200 rounded-lg">
              <div className="text-3xl mb-3">🥂</div>
              <h3 className="text-xl font-semibold mb-3">Group & Milestone Travel</h3>
              <p className="text-slate-600">
                Corporate retreats, reunions, church groups, destination weddings. Groups of 10–200 with amenity points and group perks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-slate-900 text-center">
            What {d.city} Clients Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {d.testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-slate-700 italic mb-4">"{t.quote}"</p>
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-500">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section className="py-20 px-6 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-slate-900">
            Free Download: The {d.city} Cruiser's Port Guide
          </h2>
          <p className="text-lg text-slate-700 mb-6">
            Our free 12-page guide breaks down every major cruise port within driving distance of {d.city} — drive times, parking costs, hotel recommendations, and which cruise lines sail where. Plus a detailed comparison of flying vs. driving.
          </p>
          <LeadMagnetForm city={d.slug} cityName={d.city} />
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-slate-900 text-center">
            How It Works
          </h2>
          <div className="space-y-6">
            {[
              { n: 1, t: "Tell us about your trip.", d: "Fill out our quote form or call us directly. Takes about 3 minutes." },
              { n: 2, t: "Get three options within 24 hours.", d: "Your dedicated advisor hand-picks three itineraries that match your style, budget, and dates — with transparent pricing." },
              { n: 3, t: "Book when you're ready.", d: "No pressure, no upsells. We hold your cabin or room while you decide." },
              { n: 4, t: "We handle the rest.", d: "Flights, transfers, excursions, dining reservations, travel insurance, price-drop monitoring, 24/7 in-trip support." },
            ].map((s) => (
              <div key={s.n} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center font-bold text-xl">
                  {s.n}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{s.t}</h3>
                  <p className="text-slate-600">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-slate-900 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {d.faqs.map((f, i) => (
              <details key={i} className="bg-white rounded-lg shadow-sm p-6 cursor-pointer group">
                <summary className="font-semibold text-lg text-slate-900 flex justify-between items-center">
                  {f.q}
                  <span className="text-amber-500 group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-4 text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to Start Planning Your {d.city} Getaway?
          </h2>
          <p className="text-xl text-slate-200 mb-8">
            Tell us what you're dreaming about. Three hand-picked options back to you within 24 hours — and there's never a planning fee.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/request-quote?city=${d.slug}`}
              className="bg-amber-400 text-slate-900 px-8 py-4 rounded-md font-semibold hover:bg-amber-300 transition"
            >
              Request My Free Quote
            </Link>
            <a
              href="tel:8885086893"
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-slate-900 transition"
            >
              Call 888.508.6893
            </a>
          </div>
          <p className="mt-8 text-sm text-slate-400">
            ASTA Member · CLIA Certified · Carnival Diamond Expert · NCL Master's Degree · Florida Seller of Travel ST46414
          </p>
        </div>
      </section>
    </>
  );
}





