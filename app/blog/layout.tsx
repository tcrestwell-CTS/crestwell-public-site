import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Tips & Guides | Crestwell Travel Services',
  description: 'Travel tips, destination guides, cruise advice, and vacation inspiration from Crestwell Travel Services.',
  openGraph: {
    type: 'website',
    url: 'https://crestwellgetaways.com/blog',
    title: 'Travel Tips & Guides | Crestwell Travel Services',
    description: 'Travel tips, destination guides, cruise advice, and vacation inspiration from Crestwell Travel Services.',
    siteName: 'Crestwell Travel Services',
    locale: 'en_US',
    images: [
      {
        url: 'https://crestwellgetaways.com/eurotour-og.webp?v=2',
        width: 1200,
        height: 630,
        alt: 'Travel Tips & Guides — Crestwell Travel Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Tips & Guides | Crestwell Travel Services',
    description: 'Travel tips, destination guides, cruise advice, and vacation inspiration from Crestwell Travel Services.',
    images: ['https://crestwellgetaways.com/eurotour-og.webp?v=2'],
  },
  alternates: {
    canonical: 'https://crestwellgetaways.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
