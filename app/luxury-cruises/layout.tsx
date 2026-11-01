import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Luxury Cruises',
  description: 'Luxury cruise planning from Crestwell Travel Services, including small-ship and yacht-style lines listed on this page.',
  path: '/luxury-cruises',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
