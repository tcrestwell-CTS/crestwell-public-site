'use client';

import { useState, useRef, useEffect } from 'react';

type Station = { stationCode: string; displayName: string };

type JourneyOption = {
  id: string;
  origin: { code: string; name: string; schedule: { departureDateTime: string } };
  destination: { code: string; name: string; schedule: { arrivalDateTime: string } };
  elapsedTime: string;
  travelLegs: Array<{
    travelService: { name: string; number: string; carrier: string };
  }>;
  reservableAccommodations: Array<{
    travelClass: string;
    accommodationFare: { dollarsAmount: { total: string } };
  }>;
};

function parseDuration(iso: string) {
  // "P0DT3H51M" -> "3h 51m"
  const match = iso.match(/P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const [, days, hours, mins] = match;
  const parts = [];
  if (days && Number(days) > 0) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (mins) parts.push(`${mins}m`);
  return parts.join(' ') || '—';
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function cheapestFare(option: JourneyOption) {
  const prices = option.reservableAccommodations
    .map((a) => parseFloat(a.accommodationFare?.dollarsAmount?.total))
    .filter((p) => !isNaN(p) && p > 0);
  return prices.length > 0 ? Math.min(...prices) : null;
}

function StationInput({
  label, value, onChange, placeholder,
}: {
  label: string; value: Station | null; onChange: (s: Station | null) => void; placeholder: string;
}) {
  const [query, setQuery] = useState(value?.displayName ?? '');
  const [results, setResults] = useState<Station[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.length < 2 || (value && query === value.displayName)) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/amtrak/stations?term=${encodeURIComponent(query)}`);
        const body = await res.json();
        const stations: Station[] = (body?.data?.results ?? []).map((r: { stationCode: string; displayName: string }) => ({
          stationCode: r.stationCode, displayName: r.displayName,
        }));
        setResults(stations);
        setOpen(stations.length > 0);
      } catch {
        setResults([]);
      }
    }, 300);
  }, [query, value]);

  return (
    <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 4 }}>{label}</label>
      <input
        value={query}
        onChange={(e) => { setQuery(e.target.value); onChange(null); }}
        onFocus={() => results.length > 0 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder}
        style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }}
      />
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #ddd', borderRadius: 8, marginTop: 4, maxHeight: 220, overflowY: 'auto', zIndex: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          {results.map((s) => (
            <button
              key={s.stationCode}
              onClick={() => { onChange(s); setQuery(s.displayName); setOpen(false); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 13 }}
            >
              {s.displayName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AmtrakScheduleSearch() {
  const [origin, setOrigin] = useState<Station | null>(null);
  const [destination, setDestination] = useState<Station | null>(null);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<JourneyOption[] | null>(null);

  const handleSearch = async () => {
    if (!origin || !destination || !date) {
      setError('Please choose a departure station, arrival station, and date.');
      return;
    }
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await fetch('/api/amtrak/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin: origin.stationCode, destination: destination.stationCode, departureDate: date }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || 'Search failed');
      const options: JourneyOption[] = body?.data?.journey_legs?.[0]?.journeyLegOptions ?? [];
      setResults(options);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div style={{ background: '#f8fafc', borderRadius: 16, padding: '32px 24px', margin: '40px 0' }}>
      <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: '#1a294d' }}>Search Amtrak Schedules</h3>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 20 }}>
        See real departure times and fares. Your advisor handles the actual booking — planning is always free.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <StationInput label="From" value={origin} onChange={setOrigin} placeholder="e.g. Boston" />
        <StationInput label="To" value={destination} onChange={setDestination} placeholder="e.g. New York" />
        <div style={{ minWidth: 160 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#666', marginBottom: 4 }}>Date</label>
          <input
            type="date"
            value={date}
            min={minDate}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          style={{ background: '#0D9FD8', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 24px', fontWeight: 600, fontSize: 14, cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Searching…' : 'Search Trains'}
        </button>
      </div>

      {error && <p style={{ color: '#c00', fontSize: 13, marginTop: 12 }}>{error}</p>}

      {results && results.length === 0 && !error && (
        <p style={{ color: '#666', fontSize: 14, marginTop: 20 }}>No trains found for this route and date.</p>
      )}

      {results && results.length > 0 && (
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {results.slice(0, 8).map((opt) => {
            const price = cheapestFare(opt);
            const service = opt.travelLegs?.[0]?.travelService;
            return (
              <div key={opt.id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#1a294d' }}>
                    {formatTime(opt.origin.schedule.departureDateTime)} → {formatTime(opt.destination.schedule.arrivalDateTime)}
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: '#666' }}>
                    {service ? `${service.name} ${service.number}` : 'Amtrak'} · {parseDuration(opt.elapsedTime)}
                  </p>
                </div>
                {price !== null && (
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontSize: 12, color: '#666' }}>from</p>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 18, color: '#0D9FD8' }}>${price.toFixed(0)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
