import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPublishedTrip } from '@/lib/supabase'
import { ContactForm } from '@/components/ContactForm'

export const revalidate = 3600

// Next.js 15: params must be awaited
export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const trip = await getPublishedTrip(id).catch(() => null)
  if (!trip) notFound()

  const nights = trip.depart_date && trip.return_date
    ? Math.round((new Date(trip.return_date).getTime() - new Date(trip.depart_date).getTime()) / 86400000)
    : null

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '55vh', minHeight: '380px', overflow: 'hidden' }}>
        {trip.cover_image_url ? (
          <Image src={trip.cover_image_url} alt={trip.trip_name} fill style={{ objectFit: 'cover' }} priority />
        ) : (
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #0c4a6e, #0369a1)' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,74,110,0.85) 0%, rgba(12,74,110,0.2) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px', maxWidth: '900px' }}>
          {trip.trip_type === 'group' && (
            <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, background: '#fde047', color: '#0c4a6e', marginBottom: '12px' }}>👥 Group Trip</span>
          )}
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'white', fontFamily: 'Playfair Display, serif', marginBottom: '8px', lineHeight: 1.2 }}>{trip.trip_name}</h1>
          <p style={{ color: '#bae6fd', fontSize: '20px' }}>{trip.destination}</p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 1rem', display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Quick info */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '24px', borderRadius: '16px', background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.07)' }}>
            {[
              { icon: '📅', label: 'Departure', value: trip.depart_date ? new Date(trip.depart_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' },
              { icon: '🔙', label: 'Return', value: trip.return_date ? new Date(trip.return_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—' },
              { icon: '🌙', label: 'Duration', value: nights ? `${nights} nights` : '—' },
              { icon: '📍', label: 'Destination', value: trip.destination },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{icon}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '13px', marginTop: '2px' }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          {trip.notes && (
            <div style={{ padding: '24px', borderRadius: '16px', background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.07)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0c4a6e', fontFamily: 'Playfair Display, serif', marginBottom: '16px' }}>About This Trip</h2>
              <p style={{ color: '#475569', lineHeight: 1.8 }}>{trip.notes}</p>
            </div>
          )}

          {/* Itinerary */}
          {(trip.itineraries?.itinerary_items?.length ?? 0) > 0 && (
            <div style={{ padding: '24px', borderRadius: '16px', background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.07)' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0c4a6e', fontFamily: 'Playfair Display, serif', marginBottom: '24px' }}>Day-by-Day Itinerary</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[...trip.itineraries.itinerary_items]
                  .sort((a: { day_number: number }, b: { day_number: number }) => a.day_number - b.day_number)
                  .map((item: { id: string; day_number: number; title: string; description?: string }) => (
                    <div key={item.id} style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: 'white', background: 'linear-gradient(135deg, #0369a1, #0ea5e9)' }}>
                        {item.day_number}
                      </div>
                      <div style={{ paddingTop: '8px' }}>
                        <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{item.title}</h4>
                        {item.description && <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>{item.description}</p>}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <Link href="/trips" style={{ color: '#0369a1', fontSize: '14px', textDecoration: 'none' }}>← Back to all trips</Link>
        </div>

        {/* Right - Inquiry */}
        <div>
          <div style={{ padding: '24px', borderRadius: '16px', background: 'white', boxShadow: '0 4px 25px rgba(0,0,0,0.1)', position: 'sticky', top: '80px' }}>
            {trip.budget_range && (
              <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Starting from</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0c4a6e', fontFamily: 'Playfair Display, serif' }}>{trip.budget_range}</div>
                <div style={{ fontSize: '13px', color: '#94a3b8' }}>per person</div>
              </div>
            )}
            {trip.deposit_amount && (
              <div style={{ padding: '10px', borderRadius: '10px', marginBottom: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', fontSize: '13px' }}>
                ✓ Secure your spot with a ${trip.deposit_amount} deposit
              </div>
            )}
            <div style={{ padding: '10px', borderRadius: '10px', marginBottom: '16px', background: '#fef9c3', border: '1px solid #fde047', color: '#713f12', fontSize: '13px' }}>
              💳 Financing available via Affirm
            </div>
            <ContactForm tripName={trip.trip_name} tripId={trip.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
