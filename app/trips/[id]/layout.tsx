import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';

interface Props {
  params: { id: string };
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: trip } = await supabase
    .from('featured_trips')
    .select('trip_name, destination, tagline, overview, description, cover_image_url, gallery_images')
    .eq('id', params.id)
    .maybeSingle();

  if (!trip) {
    return {
      title: 'Trip Details | Crestwell Travel Services',
      description: 'Explore curated cruise and resort vacations with Crestwell Travel Services.',
    };
  }

  const title = `${trip.trip_name} — ${trip.destination} | Crestwell Travel`;
  const description =
    trip.tagline || trip.overview || trip.description ||
    `Explore ${trip.destination} with Crestwell Travel Services. Expert-curated itineraries, best pricing, no booking fees.`;

  const ogImage =
    trip.cover_image_url ||
    (Array.isArray(trip.gallery_images) && trip.gallery_images[0]) ||
    'https://crestwellgetaways.com/og-default.jpg';

  const pageUrl = `https://crestwellgetaways.com/trips/${params.id}`;

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: pageUrl,
      title,
      description,
      siteName: 'Crestwell Travel Services',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${trip.trip_name} — ${trip.destination}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default function TripDetailLayout({ children }: Props) {
  return <>{children}</>;
}
