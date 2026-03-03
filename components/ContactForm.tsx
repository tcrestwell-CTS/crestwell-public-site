'use client'

import { useState } from 'react'

export function ContactForm({ tripName, tripId }: { tripName?: string; tripId?: string }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', groupSize: '2', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!form.name || !form.email) return
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

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    border: '1px solid #e2e8f0', fontSize: '14px', color: '#1e293b',
    background: '#f8fafc', outline: 'none', boxSizing: 'border-box',
  }

  if (status === 'sent') return (
    <div style={{ textAlign: 'center', padding: '32px', borderRadius: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
      <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
      <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#166534', fontFamily: 'Playfair Display, serif', marginBottom: '8px' }}>Request Received!</h3>
      <p style={{ color: '#15803d', fontSize: '14px' }}>A Crestwell travel expert will reach out within 24 hours.</p>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {tripName && (
        <div style={{ padding: '10px', borderRadius: '10px', background: '#e0f2fe', color: '#0369a1', fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>
          Inquiring about: {tripName}
        </div>
      )}
      <div>
        <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Full Name *</label>
        <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" style={inputStyle} />
      </div>
      <div>
        <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Email *</label>
        <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" style={inputStyle} />
      </div>
      <div>
        <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Phone</label>
        <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="(555) 000-0000" style={inputStyle} />
      </div>
      <div>
        <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Group Size</label>
        <select value={form.groupSize} onChange={e => setForm(f => ({ ...f, groupSize: e.target.value }))} style={inputStyle}>
          {['1', '2', '3-4', '5-9', '10-19', '20+'].map(s => <option key={s} value={s}>{s} traveler{s === '1' ? '' : 's'}</option>)}
        </select>
      </div>
      <div>
        <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>Message</label>
        <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us about your travel goals..." rows={3} style={{ ...inputStyle, resize: 'none' }} />
      </div>
      <button onClick={handleSubmit} disabled={status === 'sending' || !form.name || !form.email}
        style={{ width: '100%', padding: '14px', borderRadius: '9999px', fontWeight: 700, color: 'white', border: 'none', cursor: !form.name || !form.email ? 'not-allowed' : 'pointer', background: !form.name || !form.email ? '#94a3b8' : 'linear-gradient(135deg, #0369a1, #0ea5e9)', fontSize: '15px', boxShadow: '0 4px 15px rgba(3,105,161,0.3)' }}>
        {status === 'sending' ? 'Sending...' : 'Request Info →'}
      </button>
      {status === 'error' && <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center' }}>Something went wrong. Please try again.</p>}
      <p style={{ fontSize: '12px', textAlign: 'center', color: '#94a3b8' }}>A real human will respond within 24 hours.</p>
    </div>
  )
}
