import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Frequently Asked Questions',
  description: 'Answers from Crestwell Travel Services on cruises, all-inclusive resorts, group travel, payments, and requesting a quote.',
  path: '/faq',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
