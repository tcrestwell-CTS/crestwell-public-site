import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Rental Payment',
  description: 'Rental payment page for Crestwell Travel Services.',
  path: '/rental-payment',
  index: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
