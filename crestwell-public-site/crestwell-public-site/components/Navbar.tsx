'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'rgba(12, 74, 110, 0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌊</span>
          <div>
            <div
              className="text-lg font-bold text-white leading-none"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Crestwell
            </div>
            <div className="text-xs text-blue-300 leading-none">Travel Services</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { href: '/trips', label: 'Trips' },
            { href: '/trips?type=group', label: 'Group Travel' },
            { href: '/trips?type=cruise', label: 'Cruises' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{ background: '#fde047', color: '#0c4a6e' }}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-4 py-4 space-y-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: '#0c4a6e' }}
        >
          {[
            { href: '/trips', label: 'Trips' },
            { href: '/trips?type=group', label: 'Group Travel' },
            { href: '/trips?type=cruise', label: 'Cruises' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="block text-blue-100 hover:text-white py-2 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block w-full text-center px-4 py-2 rounded-full text-sm font-semibold"
            style={{ background: '#fde047', color: '#0c4a6e' }}
            onClick={() => setOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}
