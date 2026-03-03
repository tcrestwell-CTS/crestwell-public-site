import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Crestwell Travel Services — Cruises & All-Inclusive Getaways',
  description: 'Expert cruise, all-inclusive, and group vacation planning for families. Book your dream trip with Crestwell Travel Services.',
  metadataBase: new URL('https://crestwellgetaways.com'),
  openGraph: {
    title: 'Crestwell Travel Services',
    description: 'Cruises, all-inclusive getaways, and group vacations.',
    url: 'https://crestwellgetaways.com',
    siteName: 'Crestwell Travel Services',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
