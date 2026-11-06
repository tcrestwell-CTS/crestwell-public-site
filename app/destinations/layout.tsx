import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Destinations',
  description: 'Caribbean, Mediterranean, Alaska, Bahamas, Europe, and Mexico trip ideas from Crestwell Travel Services.',
  path: '/destinations',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
