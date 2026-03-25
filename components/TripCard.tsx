'use client'
import Link from 'next/link'
import Image from 'next/image'
import type { FeaturedTrip } from '@/lib/supabase'

export function TripCard({ trip }: { trip: FeaturedTrip }) {
  // Link to detail page if slug exists, otherwise fall back to request-quote
  const href = (trip as any).slug
    ? `/trips/${(trip as any).slug}`
    : `/request-quote?destination=${encodeURIComponent(trip.destination)}&trip_type=${encodeURIComponent(trip.trip_type || 'Cruise Vacation')}&trip_name=${encodeURIComponent(trip.trip_name)}`;

  return (
    <article className="card-hover" style={{ background: 'white', overflow: 'hidden' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: 240 }}>
        {trip.cover_image_url ? (
          <Image src={trip.cover_image_url} alt={trip.trip_name} fill style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, var(--navy), #0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 60, opacity: 0.3 }}>🌊</span>
          </div>
        )}
        {trip.popular && (
          <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--gold)', padding: '4px 12px' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--navy)' }}>Popular</span>
          </div>
        )}
        {trip.starting_from && (
          <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(13,27,42,0.85)', padding: '6px 14px', backdropFilter: 'blur(4px)' }}>
            <span style={{ fontSize: '0.7rem', color: 'white', letterSpacing: '0.08em' }}>From <strong style={{ color: 'var(--gold)' }}>{trip.starting_from}</strong> / person</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: 'clamp(18px, 3vw, 28px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10, flexWrap: 'wrap', gap: 4 }}>
          <h3 className="font-display" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', fontWeight: 400, color: 'var(--navy)' }}>{trip.trip_name}</h3>
          {trip.duration && (
            <span style={{ fontSize: '0.7rem', color: 'var(--slate)', letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap', paddingLeft: 8 }}>{trip.duration}</span>
          )}
        </div>
        {trip.description && (
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{trip.description}</p>
        )}
        {trip.highlights && trip.highlights.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
            {trip.highlights.map(h => (
              <span key={h} style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'var(--cream)', color: 'var(--slate)', letterSpacing: '0.05em' }}>{h}</span>
            ))}
          </div>
        )}
        <Link href={href} className="btn-navy" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
          {(trip as any).slug ? 'View Trip Details' : 'Request This Trip'}
        </Link>
      </div>
    </article>
  )
}
