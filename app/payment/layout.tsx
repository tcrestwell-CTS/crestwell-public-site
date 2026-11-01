import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Payment',
  description: 'Secure payment page for Crestwell Travel Services.',
  path: '/payment',
  index: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
