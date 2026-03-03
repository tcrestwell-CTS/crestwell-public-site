import Link from 'next/link'
import Image from 'next/image'
import { getPublishedTrips } from '@/lib/supabase'
import { TripCard } from '@/components/TripCard'

export const revalidate = 3600 // revalidate every hour

export default async function HomePage() {
  const trips = await getPublishedTrips().catch(() => [])
  const featured = trips.slice(0, 3)

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0c4a6e 0%, #0369a1 45%, #0ea5e9 100%)',
        }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 fade-up"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fde047', backdropFilter: 'blur(8px)' }}
          >
            ✦ Expert Travel Planning Since 2010
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-6 fade-up fade-up-delay-1 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}
          >
            See the World,
            <br />
            <span style={{ color: '#fde047' }}>One Port at a Time</span>
          </h1>

          <p
            className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto fade-up fade-up-delay-2"
            style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 300 }}
          >
            Cruises, all-inclusive resorts, and group getaways — expertly planned for families and travelers who want more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-up fade-up-delay-3">
            <Link href="/trips" className="btn-primary text-lg px-8 py-4" style={{ background: '#fde047', color: '#0c4a6e' }}>
              Explore Trips
            </Link>
            <Link href="/contact" className="btn-outline text-lg px-8 py-4" style={{ borderColor: 'white', color: 'white' }}>
              Talk to an Expert
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto fade-up"
            style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
          >
            {[
              { value: '1,670+', label: 'Cruises Available' },
              { value: '15+', label: 'Years of Experience' },
              { value: '500+', label: 'Happy Families' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>{value}</div>
                <div className="text-blue-200 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* ── FEATURED TRIPS ── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Featured Getaways</h2>
          <p className="section-subtitle">Handpicked experiences for families and groups</p>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((trip, i) => (
              <div key={trip.id} className={`fade-up fade-up-delay-${i + 1}`}>
                <TripCard trip={trip} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400">
            <p className="text-lg">Exciting trips coming soon — check back shortly!</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/trips" className="btn-primary">
            View All Trips →
          </Link>
        </div>
      </section>

      {/* ── WHY CRESTWELL ── */}
      <section
        className="py-20 px-4"
        style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Travel with Crestwell?</h2>
            <p className="section-subtitle">We handle every detail so you can focus on the memories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🚢', title: 'Cruise Specialists', desc: 'Access to 1,670+ cruise options across all major lines, destinations, and price points.' },
              { icon: '👨‍👩‍👧‍👦', title: 'Family & Group Experts', desc: 'We specialize in coordinating large groups and multi-generational family trips seamlessly.' },
              { icon: '💳', title: 'Flexible Financing', desc: 'Book now, pay over time with Affirm financing options tailored to your budget.' },
              { icon: '🌴', title: 'All-Inclusive Pros', desc: 'From Cancun to the Caribbean, we know every resort and get you the best deals.' },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl text-center"
                style={{ background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.06)' }}
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#0c4a6e' }}
                >
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GROUP TRIPS CTA ── */}
      <section
        className="py-20 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)' }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="text-5xl mb-6">🌍</div>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Planning a Group Trip?
          </h2>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Whether it's a family reunion, destination wedding, church group, or corporate retreat — we make group travel effortless.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/trips?type=group"
              className="btn-primary px-8 py-4 text-lg"
              style={{ background: '#fde047', color: '#0c4a6e' }}
            >
              Browse Group Trips
            </Link>
            <Link
              href="/contact"
              className="btn-outline px-8 py-4 text-lg"
              style={{ borderColor: 'rgba(255,255,255,0.6)', color: 'white' }}
            >
              Request a Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">What Our Travelers Say</h2>
          <p className="section-subtitle">Real stories from real families</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Marcus & Family',
              trip: 'Caribbean Cruise',
              rating: 5,
              text: 'Tim was incredibly detailed when planning our shore excursions. Best family vacation we\'ve ever taken — everything went perfectly.',
            },
            {
              name: 'The Johnson Family',
              trip: 'All-Inclusive Cancun',
              rating: 5,
              text: 'Crestwell handled everything for our group of 14. From flights to resort — not a single hiccup. Will definitely use them again!',
            },
            {
              name: 'Sandra R.',
              trip: 'Mediterranean Cruise',
              rating: 5,
              text: 'I\'ve used other travel agencies before but Crestwell is on another level. The financing options made our dream trip possible.',
            },
          ].map(({ name, trip, rating, text }) => (
            <div
              key={name}
              className="p-6 rounded-2xl"
              style={{ background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.07)' }}
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} style={{ color: '#fde047' }}>★</span>
                ))}
              </div>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed italic">"{text}"</p>
              <div>
                <p className="font-semibold text-slate-800">{name}</p>
                <p className="text-sm" style={{ color: '#0369a1' }}>{trip}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINANCING BANNER ── */}
      <section
        className="py-12 px-4 text-center"
        style={{ background: '#fef9c3', borderTop: '1px solid #fde047', borderBottom: '1px solid #fde047' }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xl font-semibold" style={{ color: '#0c4a6e', fontFamily: 'Playfair Display, serif' }}>
            ✦ Book Now, Pay Over Time with Affirm Financing
          </p>
          <p className="text-slate-600 mt-2">
            Get approved in seconds. No hidden fees. Your dream vacation shouldn't wait.
          </p>
          <Link href="/contact" className="btn-primary mt-4 inline-block">
            Check My Rate →
          </Link>
        </div>
      </section>
    </>
  )
}
