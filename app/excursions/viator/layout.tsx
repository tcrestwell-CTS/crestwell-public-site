import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Viator Excursions',
  description: 'Search Viator shore excursions and tours from the Crestwell Travel Services excursions page.',
  path: '/excursions/viator',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
