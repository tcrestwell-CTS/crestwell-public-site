import type { Metadata } from 'next';
import HomePage from './HomeClient';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Crestwell Travel Services | Cruises, Resorts & Group Travel',
  description:
    'Crestwell Travel Services plans cruises, all-inclusive resorts, and group travel for families, couples, and groups. Based in Chattanooga, TN, serving Georgia, Tennessee, Alabama, and Florida. Website: crestwellgetaways.com.',
  path: '/',
});

export default function Page() {
  return <HomePage />;
}
