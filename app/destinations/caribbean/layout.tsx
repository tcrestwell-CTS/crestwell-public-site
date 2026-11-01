import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Caribbean Cruises',
  description: 'Caribbean cruise planning from Crestwell Travel Services for travelers in the Southeast.',
  path: '/destinations/caribbean',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
