import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Win a Dinner for Two Gift Card',
  description: 'Enter the Crestwell Travel Services dinner-for-two gift card drawing. No purchase necessary.',
  path: '/win',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
