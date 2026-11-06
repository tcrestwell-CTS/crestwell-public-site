import type { Metadata } from 'next';
import { cities } from '@/data/cities';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import LeadMagnetForm from '@/components/LeadMagnetForm';
import Breadcrumb from '@/components/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/jsonld';
import { BUSINESS_NAME, ORGANIZATION_ID, SITE_URL } from '@/lib/site';

export function cityMetadata(slug: string): Metadata {
  const d = cities.find((c) => c.slug === slug);
  if (!d) return {};
  const url = `${SITE_URL}/travel-agent-${d.slug}`;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: d.metaTitle,
      description: d.metaDescription,
      url,
      siteName: BUSINESS_NAME,
      type: 'website',
    },
  };
}

export default function CityLanding({ slug }: { slug: string }) {
  const cityData = cities.find((c) => c.slug === slug);
  if (!cityData) notFound();
  const d = cityData;
  const path = `/travel-agent-${d.slug}`;
  const pageUrl = `${SITE_URL}${path}`;
  const otherCities = cities.filter((c) => c.slug !== d.slug);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: `${d.city} travel agent`, path },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: d.metaTitle,
        description: d.metaDescription,
        about: { '@id': ORGANIZATION_ID },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'Service',
        name: `Travel planning for ${d.cityWithState}`,
        provider: { '@id': ORGANIZATION_ID },
        areaServed: d.neighborhoods.map((name) => ({ '@type': 'Place', name })),
        url: pageUrl,
      },
      breadcrumbJsonLd(crumbs, `${pageUrl}#breadcrumb`),
      faqPageJsonLd(d.faqs.map((f) => ({ question: f.q, answer: f.a }))),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Breadcrumb items={crumbs.map((c) => ({ name: c.name, href: c.path }))} />

      <section className="relative bg-gradient-to-b from-slate-900 to-slate-800 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-amber-300 mb-4">
            {BUSINESS_NAME} · crestwellgetaways.com · ASTA member · CLIA certified
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
            Travel agent for cruises and all-inclusive trips from {d.cityWithState}
          </h1>
          <p className="text-xl text-slate-200 mb-4 max-w-3xl">{d.pageFocus}</p>
          <p className="text-lg text-slate-300 mb-8 max-w-3xl">{d.heroSubhead}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/request-quote?city=${d.slug}`}
              className="bg-amber-400 text-slate-900 px-8 py-4 rounded-md font-semibold hover:bg-amber-300 transition"
            >
              Request a quote
            </Link>
            <a
              href="tel:8885086893"
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-slate-900 transition"
            >
              Call 888.508.6893
            </a>
          </div>
          <p className="mt-8 text-sm text-slate-300">
            Based in Chattanooga, TN. This page is planning guidance for travelers in {d.cityWithState}, not a separate office address.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-slate-900">
            Planning from {d.city}
          </h2>
          {d.localAngle.split('\n\n').map((p) => (
            <p key={p.slice(0, 48)} className="text-lg text-slate-700 leading-relaxed mb-6">
              {p}
            </p>
          ))}
          <p className="text-lg text-slate-700 leading-relaxed mt-6 font-semibold">
            No planning fees. No booking fees. Crestwell is compensated by the cruise lines and resorts, so the planning service is free to you.
          </p>
          <h3 className="text-xl font-semibold mt-10 mb-4 text-slate-900">
            Communities this page covers
          </h3>
          <ul className="flex flex-wrap gap-2">
            {d.neighborhoods.map((name) => (
              <li key={name} className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-slate-900">
            Departure options from {d.city}
          </h2>
          <p className="text-lg text-slate-700 mb-4">
            <strong>{d.majorAirport.code}</strong> — {d.majorAirport.name}. {d.majorAirport.note}
          </p>

          <h3 className="text-2xl font-serif font-semibold mb-6 text-slate-800">
            Closest cruise ports to {d.city}
          </h3>
          <div className="space-y-4 mb-10">
            {d.closestPorts.map((port) => (
              <div key={port.name} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
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
            <h4 className="font-semibold text-lg mb-2 text-slate-900">Flying vs. driving</h4>
            <p className="text-slate-700">{d.drivingVsFlying}</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-slate-900 text-center">
            What we plan for {d.city} travelers
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-slate-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Cruise vacations</h3>
              <p className="text-slate-600">
                Ocean and river cruises. The right line depends on ages, mobility, and whether you want to drive to a port or fly. See the planning guide before you request a quote.
              </p>
            </div>
            <div className="p-6 border border-slate-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">All-inclusive resorts</h3>
              <p className="text-slate-600">
                Sandals and Secrets are adults-only on our resort FAQ. Beaches, Dreams, Hyatt Ziva, and Club Med are the family names that page lists.
              </p>
            </div>
            <div className="p-6 border border-slate-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Group and milestone travel</h3>
              <p className="text-slate-600">
                Reunions, church groups, and other groups. Read what an organizer should gather, then send the quote form.
              </p>
            </div>
          </div>
          <p className="text-center mt-8">
            <Link href="/planning-guide" className="text-slate-900 font-semibold border-b border-amber-400">
              Read the planning guide
            </Link>
          </p>
        </div>
      </section>

      {/*
        TODO(Tim Crestwell): testimonials in data/cities.ts are intentionally
        not rendered. They are not linked to a review source in this repo.
        Confirm each quote before publishing, or replace them with reviews
        you can point to (for example the Trustpilot profile already linked
        on the homepage). Do not add invented local client stories.
      */}

      <section className="py-20 px-6 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-slate-900">
            Free download: The Southeast Cruiser&apos;s Port Guide
          </h2>
          <p className="text-lg text-slate-700 mb-6">
            One regional guide from {BUSINESS_NAME} — drive times, cruise lines, parking, and pre-cruise hotels for major ports within reach of Georgia, Tennessee, Alabama, and Florida, including the options closest to {d.city}. It is not a separate {d.city}-only booklet.
          </p>
          <LeadMagnetForm city={d.slug} cityName={d.city} />
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-slate-900 text-center">
            How a quote works
          </h2>
          <div className="space-y-6">
            {[
              { n: 1, t: 'Tell us about the trip.', d: 'Use the quote form or call 888.508.6893. Home city, rough dates, who is traveling, and a budget range are enough to start.' },
              { n: 2, t: 'We reply with options.', d: 'The quote page says a specialist will be in touch within 24 hours. The FAQ describes follow-up within one business day.' },
              { n: 3, t: 'Book when you are ready.', d: 'Deposits and final-payment dates come from the cruise line or resort. Those terms are on the FAQ.' },
              { n: 4, t: 'We stay available on the trip.', d: 'The FAQ says you can reach us by phone and email if a connection, cabin, or excursion needs help. We are not describing a 24-hour call center.' },
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

      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-slate-900 text-center">
            Questions from {d.city}
          </h2>
          <div className="space-y-4">
            {d.faqs.map((f) => (
              <details key={f.q} className="bg-white rounded-lg shadow-sm p-6 group">
                <summary className="font-semibold text-lg text-slate-900 cursor-pointer">
                  {f.q}
                </summary>
                <p className="mt-4 text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-6 text-slate-900">
            Other cities we plan for
          </h2>
          <ul className="flex flex-wrap gap-3">
            {otherCities.map((c) => (
              <li key={c.slug}>
                <Link href={`/travel-agent-${c.slug}`} className="text-slate-800 border-b border-amber-400">
                  {c.cityWithState}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Request a quote from {d.city}
          </h2>
          <p className="text-xl text-slate-200 mb-8">
            Tell us the trip you have in mind. There is no planning fee.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`/request-quote?city=${d.slug}`}
              className="bg-amber-400 text-slate-900 px-8 py-4 rounded-md font-semibold hover:bg-amber-300 transition"
            >
              Request a quote
            </Link>
            <Link
              href="/planning-guide"
              className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-slate-900 transition"
            >
              Read the planning guide
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-400">
            {BUSINESS_NAME} · ASTA member · CLIA certified · Carnival Diamond · NCL Master&apos;s Degree · Florida Seller of Travel ST46414
          </p>
        </div>
      </section>
    </>
  );
}
