import type { Metadata } from 'next';
import { BUSINESS_NAME } from '@/lib/site';

export const metadata: Metadata = {
  title: `Your Proposal | ${BUSINESS_NAME}`,
  description: 'Private trip proposal from Crestwell Travel Services.',
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
