import { cities } from '@/data/cities';
import { notFound } from 'next/navigation';
import CityPageClient from '@/components/CityPageClient';
import type { CityData } from '@/data/cities';

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const data = cities.find((c) => c.slug === city);
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `https://crestwellgetaways.com/travel-agent-${data.slug}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `https://crestwellgetaways.com/travel-agent-${data.slug}`,
      siteName: 'Crestwell Travel Services',
      type: 'website',
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = cities.find((c) => c.slug === city);
  if (!cityData) notFound();
  return <CityPageClient cityData={cityData!} />;
}
