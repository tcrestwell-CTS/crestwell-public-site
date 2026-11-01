import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Bahamas Cruises',
  description: 'Bahamas cruise and resort planning from Crestwell Travel Services.',
  path: '/destinations/bahamas',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
