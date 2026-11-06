import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Mexico Vacations',
  description: 'Mexico cruise and all-inclusive resort planning from Crestwell Travel Services.',
  path: '/destinations/mexico',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
