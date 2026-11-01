import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Request a Quote',
  description: 'Request a cruise, resort, group, or other trip quote from Crestwell Travel Services. The form says a specialist replies within 24 hours.',
  path: '/request-quote',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
