import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vacation Budget Calculator | Crestwell Travel Services',
  description: 'See what your dream trip really costs in 60 seconds — estimate monthly payments and find a cruise or resort vacation that fits your budget.',
  alternates: { canonical: '/budget' },
  openGraph: {
    title: 'Vacation Budget Calculator | Crestwell Travel Services',
    description: 'See what your dream trip really costs in 60 seconds — and what fits your monthly budget.',
    url: '/budget',
    images: ['/images/og-default.jpg'],
  },
};

export default function BudgetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
