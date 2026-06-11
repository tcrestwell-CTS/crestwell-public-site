import type { Metadata } from 'next';
import TripsClient from './TripsClient';

export const metadata: Metadata = {
  title: 'Featured Trips & Travel Deals | Crestwell Travel Services',
  description: 'Hand-picked cruise and resort deals curated by our advisors — current promotions, group sailings, and limited-time offers updated regularly.',
  alternates: { canonical: '/trips' },
  openGraph: {
    title: 'Featured Trips & Travel Deals | Crestwell Travel Services',
    description: 'Hand-picked cruise and resort deals curated by our advisors — updated regularly.',
    url: '/trips',
  },
};

export default function TripsPage() {
  return <TripsClient />;
}
