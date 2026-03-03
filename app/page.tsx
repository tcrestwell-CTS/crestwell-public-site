import Link from 'next/link'
import Image from 'next/image'
import { getPublishedTrips } from '@/lib/supabase'
import { TripCard } from '@/components/TripCard'

export const revalidate = 60

export default async function HomePage() {
  const trips = await getPublishedTrips().catch(() => [])
  const featured = trips.slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(160deg, #0c4a6e 0%, #0369a1 45%, #0ea5e9 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1rem', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '9999px', background: 'rgba(255,255,255,0.15)', color: '#fde047', fontSize: '14px', fontWeight: 600, marginBottom: '24px', backdropFilter: 'blur(8px)' }}>
            ✦ Expert Travel Planning Since 2010
          </div>

          <h1 className="fade-up" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 700, color: 'white', marginBottom: '24px', lineHeight: 1.15, fontFamily: 'Playfair Display, serif', textShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
            See the World,<br />
            <span style={{ color: '#fde047' }}>One Port at a Time</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#bae6fd', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px', fontWeight: 300, lineHeight: 1.7 }}>
            Cruises, all-inclusive resorts, and group getaways — expertly planned for families and travelers who want more.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link href="/trips" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 32px', borderRadius: '9999px', fontWeight: 700, fontSize: '16px', background: '#fde047', color: '#0c4a6e', textDecoration: 'none', boxShadow: '0 4px 20px rgba(253,224,71,0.4)' }}>
              Explore Trips →
            </Link>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 32px', borderRadius: '9999px', fontWeight: 600, fontSize: '16px', border: '2px solid rgba(255,255,255,0.6)', color: 'white', textDecoration: 'none' }}>
              Talk to an Expert
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '64px', maxWidth: '500px', margin: '64px auto 0' }}>
            {[
              { value: '1,670+', label: 'Cruises Available' },
              { value: '15+', label: 'Years Experience' },
              { value: '500+', label: 'Happy Families' },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'white', fontFamily: 'Playfair Display, serif' }}>{value}</div>
                <div style={{ fontSize: '13px', color: '#93c5fd', marginTop: '4px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* FEATURED TRIPS */}
      <section style={{ padding: '80px 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0c4a6e', fontFamily: 'Playfair Display, serif', marginBottom: '12px' }}>Featured Getaways</h2>
          <p style={{ color: '#64748b', fontSize: '18px' }}>Handpicked experiences for families and groups</p>
        </div>

        {featured.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {featured.map((trip) => <TripCard key={trip.id} trip={trip} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '64px', color: '#94a3b8' }}>
            <p style={{ fontSize: '18px' }}>Exciting trips coming soon — check back shortly!</p>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/trips" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 32px', borderRadius: '9999px', fontWeight: 700, background: 'linear-gradient(135deg, #0369a1, #0ea5e9)', color: 'white', textDecoration: 'none', boxShadow: '0 4px 15px rgba(3,105,161,0.3)' }}>
            View All Trips →
          </Link>
        </div>
      </section>

      {/* WHY CRESTWELL */}
      <section style={{ padding: '80px 1rem', background: 'linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0c4a6e', fontFamily: 'Playfair Display, serif', marginBottom: '12px' }}>Why Travel with Crestwell?</h2>
            <p style={{ color: '#64748b', fontSize: '18px' }}>We handle every detail so you can focus on the memories</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { icon: '🚢', title: 'Cruise Specialists', desc: 'Access to 1,670+ cruise options across all major lines and destinations.' },
              { icon: '👨‍👩‍👧‍👦', title: 'Family & Group Experts', desc: 'We specialize in multi-generational family trips and large group coordination.' },
              { icon: '💳', title: 'Flexible Financing', desc: 'Book now, pay over time with Affirm financing tailored to your budget.' },
              { icon: '🌴', title: 'All-Inclusive Pros', desc: 'From Cancun to the Caribbean — we know every resort and get you the best deals.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ padding: '28px', borderRadius: '16px', background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0c4a6e', fontFamily: 'Playfair Display, serif', marginBottom: '10px' }}>{title}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROUP TRIPS CTA */}
      <section style={{ padding: '80px 1rem', background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>🌍</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 700, color: 'white', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>Planning a Group Trip?</h2>
          <p style={{ color: '#bae6fd', fontSize: '18px', marginBottom: '32px', lineHeight: 1.7 }}>
            Family reunion, destination wedding, church group, or corporate retreat — we make group travel effortless.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link href="/trips" style={{ padding: '14px 28px', borderRadius: '9999px', fontWeight: 700, background: '#fde047', color: '#0c4a6e', textDecoration: 'none', fontSize: '15px' }}>
              Browse Group Trips
            </Link>
            <Link href="/contact" style={{ padding: '14px 28px', borderRadius: '9999px', fontWeight: 600, border: '2px solid rgba(255,255,255,0.5)', color: 'white', textDecoration: 'none', fontSize: '15px' }}>
              Request a Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 1rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#0c4a6e', fontFamily: 'Playfair Display, serif', marginBottom: '12px' }}>What Our Travelers Say</h2>
          <p style={{ color: '#64748b', fontSize: '18px' }}>Real stories from real families</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {[
            { name: 'Marcus & Family', trip: 'Caribbean Cruise', text: 'Tim was incredibly detail-oriented planning our shore excursions. Best family vacation we\'ve ever taken — everything went perfectly.' },
            { name: 'The Johnson Family', trip: 'All-Inclusive Cancun', text: 'Crestwell handled everything for our group of 14. From flights to resort — not a single hiccup. Will definitely use them again!' },
            { name: 'Sandra R.', trip: 'Mediterranean Cruise', text: 'I\'ve used other travel agencies before but Crestwell is on another level. The financing options made our dream trip possible.' },
          ].map(({ name, trip, text }) => (
            <div key={name} style={{ padding: '28px', borderRadius: '16px', background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                {Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ color: '#fde047', fontSize: '18px' }}>★</span>)}
              </div>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.8, fontStyle: 'italic', marginBottom: '16px' }}>"{text}"</p>
              <div>
                <p style={{ fontWeight: 700, color: '#1e293b' }}>{name}</p>
                <p style={{ fontSize: '13px', color: '#0369a1' }}>{trip}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINANCING BANNER */}
      <section style={{ padding: '48px 1rem', textAlign: 'center', background: '#fef9c3', borderTop: '1px solid #fde047', borderBottom: '1px solid #fde047' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ fontSize: '20px', fontWeight: 700, color: '#0c4a6e', fontFamily: 'Playfair Display, serif' }}>
            ✦ Book Now, Pay Over Time with Affirm Financing
          </p>
          <p style={{ color: '#475569', marginTop: '8px', marginBottom: '20px' }}>
            Get approved in seconds. No hidden fees. Your dream vacation shouldn&apos;t wait.
          </p>
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 28px', borderRadius: '9999px', fontWeight: 700, background: 'linear-gradient(135deg, #0369a1, #0ea5e9)', color: 'white', textDecoration: 'none' }}>
            Check My Rate →
          </Link>
        </div>
      </section>
    </>
  )
}
