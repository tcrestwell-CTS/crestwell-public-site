import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Travel Budget Calculator',
  description: 'See a monthly payment for a trip using the Crestwell Travel Services budget calculator. No credit check.',
  path: '/budget',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
