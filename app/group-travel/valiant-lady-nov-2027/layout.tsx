import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Stuffed & Sailing — Valiant Lady, November 2027',
  description: 'A Crestwell Travel Services group sailing on Valiant Lady from Miami, November 22–27, 2027.',
  path: '/group-travel/valiant-lady-nov-2027',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
