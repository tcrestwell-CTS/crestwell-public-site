import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Tim Crestwell | Crestwell Travel Services',
  description: 'Meet Tim Crestwell — founder and travel advisor at Crestwell Travel Services. Cruises, all-inclusive resorts, and group travel for families across TN, GA, AL and FL.',
  openGraph: {
    images: [{ url: 'https://crestwellgetaways.com/images/og-crestwell.png', width: 1200, height: 630, alt: 'Crestwell Travel Services' }],
    title: 'Meet Tim Crestwell — Founder & Travel Advisor',
    description: 'A cybersecurity engineer turned travel advisor. ASTA member, CLIA Certified, Carnival Diamond Graduate. Based in Chattanooga, TN.',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
