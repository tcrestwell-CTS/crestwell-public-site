import type { Metadata } from 'next';
import CityLanding, { cityMetadata } from '@/components/CityLanding';

export const metadata: Metadata = cityMetadata('memphis');

export default function Page() {
  return <CityLanding slug="memphis" />;
}
