import type { Metadata } from 'next';
import DestinationsClient from './DestinationsClient';

export const metadata: Metadata = {
  title: 'Destinations | Crestwell Travel Services',
  description: 'Caribbean, Bahamas, Alaska, Europe, Mexico & the Mediterranean — explore the destinations we plan most, with honest advice on when and how to go.',
  alternates: { canonical: '/destinations' },
  openGraph: {
    title: 'Destinations | Crestwell Travel Services',
    description: 'Caribbean, Bahamas, Alaska, Europe, Mexico & the Mediterranean — explore where we can take you.',
    url: '/destinations',
    images: ['/images/og-default.jpg'],
  },
};

export default function DestinationsPage() {
  return <DestinationsClient />;
}
