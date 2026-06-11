import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cruise Vacations | Crestwell Travel Services',
  description: 'Search 1,670+ sailings from Carnival, Royal Caribbean, Disney, Norwegian & more. Expert cruise matching, exclusive rates, and price-drop monitoring — free.',
  alternates: { canonical: '/cruises' },
  openGraph: {
    title: 'Cruise Vacations | Crestwell Travel Services',
    description: 'Search 1,670+ sailings from every major cruise line — expertly matched to you at rates you won\'t find online.',
    url: '/cruises',
    images: ['/images/og-default.jpg'],
  },
};

export default function CruisesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
