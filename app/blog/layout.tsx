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
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=80',
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
    images: ['https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=80'],
  },
  alternates: {
    canonical: 'https://www.crestwellgetaways.com/blog',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
