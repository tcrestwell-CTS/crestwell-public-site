import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request a Free Travel Quote | Crestwell Travel Services',
  description: 'Tell us about your dream trip and get three hand-picked cruise or resort options within 24 hours. Free planning, exclusive rates, no obligation.',
  alternates: { canonical: '/request-quote' },
  openGraph: {
    title: 'Request a Free Travel Quote | Crestwell Travel Services',
    description: 'Three hand-picked cruise or resort options within 24 hours. Free planning, exclusive rates, no obligation.',
    url: '/request-quote',
    images: ['/images/og-default.jpg'],
  },
};

export default function RequestQuoteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
