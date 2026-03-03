import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPublishedTrip, getPublishedTrips } from '@/lib/supabase'
import { ContactForm } from '@/components/ContactForm'

export const revalidate = 3600

export async function generateStaticParams() {
  const trips = await getPublishedTrips().catch(() => [])
  return trips.map(t => ({ id: t.id }))
}

export default async function TripDetailPage({ params }: { params: { id: string } }) {
  const trip = await getPublishedTrip(params.id).catch(() => null)
  if (!trip) notFound()

  const itinerary = trip.itineraries
  const nights = trip.depart_date && trip.return_date
    ? Math.round((new Date(trip.return_date).getTime() - new Date(trip.depart_date).getTime()) / 86400000)
    : null

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {trip.cover_image_url ? (
          <Image
            src={trip.cover_image_url}
            alt={trip.trip_name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(160deg, #0c4a6e 0%, #0369a1 100%)' }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(12,74,110,0.85) 0%, rgba(12,74,110,0.2) 60%, transparent 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 max-w-5xl">
          {trip.trip_type === 'group' && (
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
              style={{ background: '#fde047', color: '#0c4a6e' }}
            >
              👥 Group Trip
            </span>
          )}
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-2"
            style={{ fontFamily: 'Playfair Display, serif', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            {trip.trip_name}
          </h1>
          <p className="text-blue-100 text-xl">{trip.destination}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Trip details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick info strip */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl"
            style={{ background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.07)' }}
          >
            {[
              { icon: '📅', label: 'Departure', value: trip.depart_date ? new Date(trip.depart_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' },
              { icon: '🔙', label: 'Return', value: trip.return_date ? new Date(trip.return_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' },
              { icon: '🌙', label: 'Duration', value: nights ? `${nights} nights` : '—' },
              { icon: '📍', label: 'Destination', value: trip.destination },
            ].map(({ icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wide">{label}</div>
                <div className="font-semibold text-slate-700 text-sm mt-0.5">{value}</div>
              </div>
            ))}
          </div>

          {/* Notes / description */}
          {trip.notes && (
            <div
              className="p-6 rounded-2xl"
              style={{ background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.07)' }}
            >
              <h2
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: 'Playfair Display, serif', color: '#0c4a6e' }}
              >
                About This Trip
              </h2>
              <p className="text-slate-600 leading-relaxed">{trip.notes}</p>
            </div>
          )}

          {/* Itinerary */}
          {itinerary && itinerary.items?.length > 0 && (
            <div
              className="p-6 rounded-2xl"
              style={{ background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.07)' }}
            >
              <h2
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: 'Playfair Display, serif', color: '#0c4a6e' }}
              >
                Day-by-Day Itinerary
              </h2>
              <div className="space-y-4">
                {[...itinerary.items]
                  .sort((a: any, b: any) => a.day_number - b.day_number)
                  .map((item: any) => (
                    <div
                      key={item.id}
                      className="flex gap-4"
                    >
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}
                      >
                        {item.day_number}
                      </div>
                      <div className="pt-1">
                        <h4 className="font-semibold text-slate-800">{item.title}</h4>
                        {item.description && (
                          <p className="text-slate-500 text-sm mt-1">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {trip.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {trip.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ background: '#e0f2fe', color: '#0369a1' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: Inquiry card */}
        <div className="space-y-4">
          <div
            className="p-6 rounded-2xl sticky top-6"
            style={{ background: 'white', boxShadow: '0 4px 25px rgba(0,0,0,0.1)' }}
          >
            {/* Pricing */}
            {trip.budget_range && (
              <div className="mb-4 pb-4" style={{ borderBottom: '1px solid #f1f5f9' }}>
                <div className="text-xs text-slate-400 uppercase tracking-wide">Starting from</div>
                <div
                  className="text-3xl font-bold mt-1"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#0c4a6e' }}
                >
                  {trip.budget_range}
                </div>
                <div className="text-sm text-slate-400">per person</div>
              </div>
            )}

            {trip.deposit_amount && (
              <div
                className="p-3 rounded-xl mb-4 text-sm"
                style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534' }}
              >
                ✓ Secure your spot with a ${trip.deposit_amount} deposit
              </div>
            )}

            <div
              className="p-3 rounded-xl mb-4 text-sm"
              style={{ background: '#fef9c3', border: '1px solid #fde047', color: '#713f12' }}
            >
              💳 Financing available via Affirm
            </div>

            <ContactForm tripName={trip.trip_name} tripId={trip.id} />

            <div className="mt-4 text-center">
              <Link href="/trips" className="text-sm text-slate-400 hover:text-blue-600">
                ← Back to all trips
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
