import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Alaska Cruises',
  description: 'Alaska cruise planning notes from Crestwell Travel Services, including season, ports, and what to pack.',
  path: '/destinations/alaska',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
