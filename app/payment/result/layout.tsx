import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Payment Result',
  description: 'Payment result for a Crestwell Travel Services booking.',
  path: '/payment/result',
  index: false,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
