import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Viator Tours & Shore Excursions | Crestwell Travel Services',
  description: 'Browse 300,000+ tours and shore excursions through Viator, a TripAdvisor company — free cancellation on most activities, curated by Crestwell.',
  alternates: { canonical: '/excursions/viator' },
  openGraph: {
    title: 'Viator Tours & Shore Excursions | Crestwell Travel Services',
    description: 'Browse 300,000+ tours and shore excursions through Viator — curated by Crestwell.',
    url: '/excursions/viator',
  },
};

export default function ViatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
