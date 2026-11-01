import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Group Travel',
  description: 'Group cruises and resort trips for churches, reunions, friend groups, and companies, planned by Crestwell Travel Services.',
  path: '/group-travel',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
