import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group Travel & Group Cruises | Crestwell Travel Services',
  description: 'Corporate retreats, reunions, church groups & milestone celebrations coordinated end to end. Group rates, amenity points — organizers often travel free.',
  alternates: { canonical: '/group-travel' },
  openGraph: {
    title: 'Group Travel & Group Cruises | Crestwell Travel Services',
    description: 'Groups of any size coordinated end to end — group rates, amenity points, and a dedicated advisor.',
    url: '/group-travel',
    images: ['/images/og-default.jpg'],
  },
};

export default function GroupTravelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
