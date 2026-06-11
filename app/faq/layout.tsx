import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Planning FAQ | Crestwell Travel Services',
  description: 'Answers to the questions we hear most — planning fees (there are none), service areas, group travel, cruise quotes, payments, and travel insurance.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Travel Planning FAQ | Crestwell Travel Services',
    description: 'Planning fees, service areas, group travel, cruise quotes, and more — answered honestly.',
    url: '/faq',
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
