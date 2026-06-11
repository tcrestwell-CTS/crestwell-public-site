import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan Your Trip | Crestwell Travel Services',
  description: 'Start planning your cruise or resort vacation — tell us your style, dates, and budget, and a dedicated advisor will build options around you.',
  alternates: { canonical: '/plan' },
  openGraph: {
    title: 'Plan Your Trip | Crestwell Travel Services',
    description: 'Tell us your style, dates, and budget — a dedicated advisor builds the options around you.',
    url: '/plan',
    images: ['/images/og-default.jpg'],
  },
};

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
