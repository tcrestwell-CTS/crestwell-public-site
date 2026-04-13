import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Tips & Guides | Crestwell Travel Services',
  description: 'Expert travel tips, destination guides, cruise advice, and vacation inspiration from the Crestwell Travel team. Plan smarter, travel better.',
  openGraph: {
    type: 'website',
    url: 'https://www.crestwellgetaways.com/blog',
    title: 'Travel Tips & Guides | Crestwell Travel Services',
    description: 'Expert travel tips, destination guides, cruise advice, and vacation inspiration from the Crestwell Travel team. Plan smarter, travel better.',
    siteName: 'Crestwell Travel Services',
    locale: 'en_US',
    images: [
      {
        url: 'https://crestwellgetaways.com/eurotour-og.webp',
        width: 1200,
        height: 630,
        alt: 'Travel Tips & Guides — Crestwell Travel Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Tips & Guides | Crestwell Travel Services',
    description: 'Expert travel tips, destination guides, cruise advice, and vacation inspiration from the Crestwell Travel team.',
    images: ['https://crestwellgetaways.com/eurotour-og.webp'],
  },
  alternates: {
    canonical: 'https://www.crestwellgetaways.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
