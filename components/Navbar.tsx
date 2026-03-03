'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: '/trips', label: 'Trips' },
    { href: '/trips?type=group', label: 'Group Travel' },
    { href: '/trips?type=cruise', label: 'Cruises' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(12,74,110,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <span style={{ fontSize: '28px' }}>🌊</span>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'white', lineHeight: 1, fontFamily: 'Playfair Display, serif' }}>Crestwell</div>
            <div style={{ fontSize: '11px', color: '#93c5fd', lineHeight: 1 }}>Travel Services</div>
          </div>
        </Link>

        {/* Desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }} className="hidden-mobile">
          {navLinks.map(({ href, label }) => (
            <Link key={label} href={href} style={{ color: '#bae6fd', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>{label}</Link>
          ))}
          <Link href="/contact" style={{ padding: '8px 20px', borderRadius: '9999px', fontWeight: 700, background: '#fde047', color: '#0c4a6e', textDecoration: 'none', fontSize: '14px' }}>
            Book Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '22px', cursor: 'pointer', padding: '4px' }}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: '#0c4a6e', padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {navLinks.map(({ href, label }) => (
            <Link key={label} href={href} onClick={() => setOpen(false)} style={{ display: 'block', color: '#bae6fd', textDecoration: 'none', padding: '10px 0', fontSize: '15px' }}>
              {label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} style={{ display: 'block', textAlign: 'center', marginTop: '12px', padding: '10px', borderRadius: '9999px', fontWeight: 700, background: '#fde047', color: '#0c4a6e', textDecoration: 'none' }}>
            Book Now
          </Link>
        </div>
      )}

      <style>{`.hidden-mobile { display: none; } @media(min-width: 768px) { .hidden-mobile { display: flex !important; } }`}</style>
    </nav>
  )
}
