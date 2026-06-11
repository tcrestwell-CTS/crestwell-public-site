import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Crestwell Travel Services',
  description: 'Reach your Crestwell travel advisor by phone, email, or our contact form. Based in Chattanooga, serving Georgia, Tennessee, Alabama & Florida.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us | Crestwell Travel Services',
    description: 'Reach your travel advisor by phone, email, or our contact form — a real person, not a call center.',
    url: '/contact',
    images: ['/images/og-default.jpg'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
