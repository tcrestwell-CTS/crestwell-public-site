import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Cruise Lines',
  description: 'Ocean and river cruise lines Crestwell Travel Services plans with, from family ships to luxury yachts.',
  path: '/cruise-lines',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
