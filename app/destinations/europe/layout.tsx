import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Europe Vacations',
  description: 'Europe cruise and vacation planning from Crestwell Travel Services.',
  path: '/destinations/europe',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
