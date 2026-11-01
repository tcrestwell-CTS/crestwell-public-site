import type { Metadata } from 'next';
import CityLanding, { cityMetadata } from '@/components/CityLanding';

export const metadata: Metadata = cityMetadata('chattanooga');

export default function Page() {
  return <CityLanding slug="chattanooga" />;
}
