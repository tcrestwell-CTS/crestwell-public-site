import type { Metadata } from 'next';
import { BUSINESS_NAME } from '@/lib/site';

// Each rail trip is loaded in the browser from a supplier URL, so a single
// canonical cannot be known here. The index page carries the canonical.
export const metadata: Metadata = {
  title: `Rail Vacation | ${BUSINESS_NAME}`,
  description: 'Scenic rail vacation details booked through Crestwell Travel Services and Vacations By Rail.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
