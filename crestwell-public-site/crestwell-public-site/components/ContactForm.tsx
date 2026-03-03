'use client'

import { useState } from 'react'

export function ContactForm({ tripName, tripId }: { tripName?: string; tripId?: string }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '', groupSize: '1',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async () => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tripName, tripId }),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
    color: '#1e293b',
    background: '#f8fafc',
    outline: 'none',
    marginTop: '4px',
  }

  if (status === 'sent') {
    return (
      <div
        className="text-center py-8 px-4 rounded-2xl"
        style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}
      >
        <div className="text-4xl mb-3">✅</div>
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: 'Playfair Display, serif', color: '#166534' }}
        >
          Request Received!
        </h3>
        <p className="text-green-700 text-sm">
          A Crestwell travel expert will reach out within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tripName && (
        <div
          className="px-3 py-2 rounded-lg text-sm font-medium text-center"
          style={{ background: '#e0f2fe', color: '#0369a1' }}
        >
          Inquiring about: {tripName}
        </div>
      )}

      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Full Name</label>
        <input
          type="text"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="Your name"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="your@email.com"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Phone (optional)</label>
        <input
          type="tel"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          placeholder="(555) 000-0000"
          style={inputStyle}
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Group Size</label>
        <select
          value={form.groupSize}
          onChange={e => setForm(f => ({ ...f, groupSize: e.target.value }))}
          style={inputStyle}
        >
          {['1', '2', '3-4', '5-9', '10-19', '20+'].map(s => (
            <option key={s} value={s}>{s} {parseInt(s) === 1 ? 'traveler' : 'travelers'}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Message (optional)</label>
        <textarea
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Tell us about your travel goals..."
          rows={3}
          style={{ ...inputStyle, resize: 'none' }}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={status === 'sending' || !form.name || !form.email}
        className="w-full py-3 rounded-full font-semibold text-white transition-all"
        style={{
          background: status === 'sending' || !form.name || !form.email
            ? '#94a3b8'
            : 'linear-gradient(135deg, #0369a1, #0ea5e9)',
          cursor: status === 'sending' || !form.name || !form.email ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 15px rgba(3, 105, 161, 0.3)',
        }}
      >
        {status === 'sending' ? 'Sending...' : 'Request Info →'}
      </button>

      {status === 'error' && (
        <p className="text-red-500 text-xs text-center">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <p className="text-xs text-center text-slate-400">
        No spam. A real human will respond within 24 hours.
      </p>
    </div>
  )
}
