import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Crestwell Travel Services',
  description: 'Contact Crestwell Travel Services in Chattanooga by phone at 888.508.6893 or email info@crestwellgetaways.com.',
  path: '/contact',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
