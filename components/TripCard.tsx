'use client'
import Link from 'next/link'
import Image from 'next/image'
import type { FeaturedTrip } from '@/lib/supabase'

export function TripCard({ trip }: { trip: Trip }) {
  const nights = trip.depart_date && trip.return_date
    ? Math.round((new Date(trip.return_date).getTime() - new Date(trip.depart_date).getTime()) / 86400000)
    : null

  const departDate = trip.depart_date
    ? new Date(trip.depart_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  return (
    <Link href={`/trips/${trip.id}`} className="trip-card" style={{ display: 'block', textDecoration: 'none' }}>
      {/* Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
        {trip.cover_image_url ? (
          <Image src={trip.cover_image_url} alt={trip.trip_name} fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0c4a6e, #0ea5e9)' }}>
            <span style={{ fontSize: '60px', opacity: 0.4 }}>🌊</span>
          </div>
        )}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '8px' }}>
          {trip.trip_type === 'group' && (
            <span style={{ padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700, background: '#fde047', color: '#0c4a6e' }}>👥 Group</span>
          )}
          {nights && (
            <span style={{ padding: '4px 10px', borderRadius: '9999px', fontSize: '11px', fontWeight: 600, background: 'rgba(0,0,0,0.5)', color: 'white', backdropFilter: 'blur(4px)' }}>{nights} nights</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0c4a6e', fontFamily: 'Playfair Display, serif', marginBottom: '8px', lineHeight: 1.3 }}>{trip.trip_name}</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <span style={{ fontSize: '13px' }}>📍</span>
          <span style={{ color: '#64748b', fontSize: '13px' }}>{trip.destination}</span>
        </div>

        {departDate && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px' }}>📅</span>
            <span style={{ color: '#64748b', fontSize: '13px' }}>{departDate}</span>
          </div>
        )}

        {trip.tags && trip.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
            {trip.tags.slice(0, 3).map((tag) => (
              <span key={tag} style={{ padding: '3px 10px', borderRadius: '9999px', fontSize: '11px', background: '#e0f2fe', color: '#0369a1' }}>{tag}</span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
          {trip.budget_range ? (
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>From</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#0c4a6e', fontFamily: 'Playfair Display, serif' }}>{trip.budget_range}</div>
            </div>
          ) : (
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>Contact for pricing</span>
          )}
          <span style={{ padding: '8px 18px', borderRadius: '9999px', fontSize: '13px', fontWeight: 700, background: 'linear-gradient(135deg, #0369a1, #0ea5e9)', color: 'white' }}>
            View Trip →
          </span>
        </div>
      </div>
    </Link>
  )
}
