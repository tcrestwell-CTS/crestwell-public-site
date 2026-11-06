import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Mediterranean Cruises',
  description: 'Mediterranean cruise planning from Crestwell Travel Services.',
  path: '/destinations/mediterranean',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
