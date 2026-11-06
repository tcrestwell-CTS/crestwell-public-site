import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Travel Financing Pre-Qualification',
  description: 'Request pre-qualification for in-house travel financing through Crestwell Travel Services.',
  path: '/financing',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
