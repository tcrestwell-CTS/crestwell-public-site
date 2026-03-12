import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | Crestwell Travel Services',
    default: 'Crestwell Travel Services — See the World One Port at a Time',
  },
  description: 'Personalized travel experiences specializing in cruises, all-inclusive resorts, and group vacations. Serving Georgia, Tennessee, and Alabama.',
  keywords: ['travel agency', 'cruises', 'all-inclusive', 'family vacations', 'Georgia', 'Tennessee', 'Alabama'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
