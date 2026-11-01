import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Select Your Cabin — Valiant Lady',
  description: 'Choose a cabin on the Crestwell Travel Services Valiant Lady group sailing.',
  path: '/group-travel/valiant-lady-nov-2027/select-cabin',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
