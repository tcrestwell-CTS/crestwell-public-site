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

  const fetchTrips = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (destination) params.set('destination', destination)
    if (startDate) params.set('startDate', startDate)
    if (endDate) params.set('endDate', endDate)

    const res = await fetch(`/api/trips?${params.toString()}`)
    const data = await res.json()
    let results = data.trips ?? []

    if (tripType === 'group') results = results.filter((t: Trip) => t.trip_type === 'group')
    if (tripType === 'regular') results = results.filter((t: Trip) => t.trip_type === 'regular')

    setTrips(results)
    setLoading(false)
  }, [search, destination, startDate, endDate, tripType])

  // Fetch destinations for dropdown
  useEffect(() => {
    fetch('/api/trips')
      .then(r => r.json())
      .then(d => {
        const unique = [...new Set((d.trips ?? []).map((t: Trip) => t.destination))].sort() as string[]
        setDestinations(unique)
      })
  }, [])

  useEffect(() => {
    const timer = setTimeout(fetchTrips, 300)
    return () => clearTimeout(timer)
  }, [fetchTrips])

  const inputStyle = {
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '10px 14px',
    fontSize: '14px',
    background: 'white',
    color: '#1e293b',
    outline: 'none',
    width: '100%',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Page header */}
      <div
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(160deg, #0c4a6e 0%, #0369a1 100%)' }}
      >
        <h1
          className="text-4xl md:text-5xl font-bold text-white mb-3"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Available Trips
        </h1>
        <p className="text-blue-100 text-lg">
          Find your perfect cruise or all-inclusive getaway
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filters */}
        <div
          className="p-5 rounded-2xl mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
          style={{ background: 'white', boxShadow: '0 2px 15px rgba(0,0,0,0.07)' }}
        >
          {/* Search */}
          <input
            type="text"
            placeholder="🔍  Search trips..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ ...inputStyle, gridColumn: 'span 1' }}
          />

          {/* Destination */}
          <select
            value={destination}
            onChange={e => setDestination(e.target.value)}
            style={inputStyle}
          >
            <option value="">All Destinations</option>
            {destinations.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Date from */}
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            style={inputStyle}
            placeholder="Depart after"
          />

          {/* Date to */}
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            style={inputStyle}
            placeholder="Depart before"
          />

          {/* Trip type */}
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'group', label: '👥 Group' },
              { value: 'regular', label: '🌴 Solo/Family' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTripType(value)}
                className="flex-1 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: tripType === value ? '#0369a1' : '#f1f5f9',
                  color: tripType === value ? 'white' : '#64748b',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-slate-500 text-sm">
            {loading ? 'Loading...' : `${trips.length} trip${trips.length !== 1 ? 's' : ''} found`}
          </p>
          {(search || destination || startDate || endDate || tripType !== 'all') && (
            <button
              onClick={() => {
                setSearch(''); setDestination(''); setStartDate(''); setEndDate(''); setTripType('all')
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Trip grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden animate-pulse"
                style={{ background: '#e2e8f0', height: '360px' }}
              />
            ))}
          </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌊</div>
            <h3
              className="text-2xl font-bold mb-2"
              style={{ color: '#0c4a6e', fontFamily: 'Playfair Display, serif' }}
            >
              No trips found
            </h3>
            <p className="text-slate-500">Try adjusting your filters or{' '}
              <a href="/contact" className="text-blue-600 hover:underline">contact us</a>{' '}
              for a custom itinerary.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
