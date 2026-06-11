import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Tim Crestwell | Crestwell Travel Services',
  description: 'Meet Tim Crestwell — founder and travel advisor at Crestwell Travel Services. Cruises, all-inclusive resorts, and group travel for families across TN, GA, AL and FL.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Meet Tim Crestwell — Founder & Travel Advisor',
    description: 'A cybersecurity engineer turned travel advisor. ASTA member, CLIA Certified, Carnival Diamond Graduate. Based in Chattanooga, TN.',
    url: '/about',
    images: ['/images/og-default.jpg'],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
