'use client'

import { useState, useEffect, useCallback } from 'react'
import { TripCard } from '@/components/TripCard'
import type { Trip } from '@/lib/supabase'

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [destinations, setDestinations] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [tripType, setTripType] = useState('all')

  const inputStyle: React.CSSProperties = {
    border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px',
    fontSize: '14px', background: 'white', color: '#1e293b', outline: 'none', width: '100%', boxSizing: 'border-box',
  }

  const fetchTrips = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (destination) params.set('destination', destination)
    if (startDate) params.set('startDate', startDate)
    if (endDate) params.set('endDate', endDate)
    const res = await fetch(`/api/trips?${params.toString()}`)
    const data = await res.json()
    let results: Trip[] = data.trips ?? []
    if (tripType === 'group') results = results.filter(t => t.trip_type === 'group')
    if (tripType === 'regular') results = results.filter(t => t.trip_type === 'regular')
    setTrips(results)
    setLoading(false)
  }, [search, destination, startDate, endDate, tripType])

  useEffect(() => {
    fetch('/api/trips').then(r => r.json()).then(d => {
      const unique = Array.from(new Set((d.trips ?? []).map((t: Trip) => t.destination))).sort() as string[]
      setDestinations(unique)
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(fetchTrips, 300)
    return () => clearTimeout(timer)
  }, [fetchTrips])

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{ padding: '64px 1rem', textAlign: 'center', background: 'linear-gradient(160deg, #0c4a6e 0%, #0369a1 100%)' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'white', fontFamily: 'Playfair Display, serif', marginBottom: '12px' }}>Available Trips</h1>
        <p style={{ color: '#bae6fd', fontSize: '18px' }}>Find your perfect cruise or all-inclusive getaway</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 1rem' }}>
        {/* Filters */}
        <div style={{ padding: '20px', borderRadius: '16px', marginBottom: '32px', background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.07)', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          <input type="text" placeholder="🔍  Search trips..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, flex: '1 1 200px' }} />
          <select value={destination} onChange={e => setDestination(e.target.value)} style={{ ...inputStyle, flex: '1 1 160px' }}>
            <option value="">All Destinations</option>
            {destinations.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ ...inputStyle, flex: '1 1 140px' }} />
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ ...inputStyle, flex: '1 1 140px' }} />
          <div style={{ display: 'flex', gap: '6px', flex: '1 1 200px' }}>
            {[{ value: 'all', label: 'All' }, { value: 'group', label: '👥 Group' }, { value: 'regular', label: '🌴 Individual' }].map(({ value, label }) => (
              <button key={value} onClick={() => setTripType(value)} style={{ flex: 1, padding: '10px 8px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', background: tripType === value ? '#0369a1' : '#f1f5f9', color: tripType === value ? 'white' : '#64748b', transition: 'all 0.2s' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Count + clear */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <p style={{ color: '#64748b', fontSize: '14px' }}>{loading ? 'Loading...' : `${trips.length} trip${trips.length !== 1 ? 's' : ''} found`}</p>
          {(search || destination || startDate || endDate || tripType !== 'all') && (
            <button onClick={() => { setSearch(''); setDestination(''); setStartDate(''); setEndDate(''); setTripType('all') }} style={{ background: 'none', border: 'none', color: '#0369a1', cursor: 'pointer', fontSize: '14px', textDecoration: 'underline' }}>
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ borderRadius: '16px', height: '360px', background: '#e2e8f0', animation: 'pulse 1.5s infinite' }} />)}
          </div>
        ) : trips.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌊</div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#0c4a6e', fontFamily: 'Playfair Display, serif', marginBottom: '8px' }}>No trips found</h3>
            <p style={{ color: '#64748b' }}>Try adjusting your filters or <a href="/contact" style={{ color: '#0369a1' }}>contact us</a> for a custom itinerary.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {trips.map(trip => <TripCard key={trip.id} trip={trip} />)}
          </div>
        )}
      </div>
    </div>
  )
}
