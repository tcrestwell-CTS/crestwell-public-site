import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Cruise Vacations',
  description: 'Search cruises and read how Crestwell Travel Services matches ocean, river, family, and adults-only sailings.',
  path: '/cruises',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
