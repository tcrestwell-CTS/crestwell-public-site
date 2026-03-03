import Link from 'next/link'
import Image from 'next/image'
import type { Trip } from '@/lib/supabase'

export function TripCard({ trip }: { trip: Trip }) {
  const nights = trip.depart_date && trip.return_date
    ? Math.round((new Date(trip.return_date).getTime() - new Date(trip.depart_date).getTime()) / 86400000)
    : null

  const departDate = trip.depart_date
    ? new Date(trip.depart_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  return (
    <Link href={`/trips/${trip.id}`} className="trip-card block group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {trip.cover_image_url ? (
          <Image
            src={trip.cover_image_url}
            alt={trip.trip_name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 100%)' }}
          >
            <span className="text-5xl opacity-40">🌊</span>
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {trip.trip_type === 'group' && (
            <span
              className="px-2.5 py-1 rounded-full text-xs font-bold"
              style={{ background: '#fde047', color: '#0c4a6e' }}
            >
              👥 Group
            </span>
          )}
          {nights && (
            <span
              className="px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(0,0,0,0.5)', color: 'white', backdropFilter: 'blur(4px)' }}
            >
              {nights} nights
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            className="font-bold text-lg leading-snug"
            style={{ fontFamily: 'Playfair Display, serif', color: '#0c4a6e' }}
          >
            {trip.trip_name}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-sm">📍</span>
          <span className="text-slate-500 text-sm">{trip.destination}</span>
        </div>

        {departDate && (
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-sm">📅</span>
            <span className="text-slate-500 text-sm">{departDate}</span>
          </div>
        )}

        {/* Tags */}
        {trip.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {trip.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: '#e0f2fe', color: '#0369a1' }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: '1px solid #f1f5f9' }}
        >
          {trip.budget_range ? (
            <div>
              <div className="text-xs text-slate-400">From</div>
              <div
                className="font-bold text-lg"
                style={{ color: '#0c4a6e', fontFamily: 'Playfair Display, serif' }}
              >
                {trip.budget_range}
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-400">Contact for pricing</div>
          )}

          <span
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all group-hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)', color: 'white' }}
          >
            View Trip →
          </span>
        </div>
      </div>
    </Link>
  )
}
