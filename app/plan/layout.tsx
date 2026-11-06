import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Start Planning Your Trip',
  description: 'Tell Crestwell Travel Services about your trip. Planning is free; a specialist follows up after you submit the form.',
  path: '/plan',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
