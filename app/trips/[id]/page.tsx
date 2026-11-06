import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import TripDetailClient from './TripDetailClient';
import { BUSINESS_NAME, SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';

async function loadTrip(slug: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from('featured_trips')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const trip = await loadTrip(id);
  if (!trip) {
    return { title: `Trip | ${BUSINESS_NAME}`, robots: { index: false, follow: false } };
  }
  const title = `${trip.trip_name} | ${BUSINESS_NAME}`;
  const description = trip.tagline || trip.overview || trip.description || `Featured trip from ${BUSINESS_NAME}.`;
  const canonical = `${SITE_URL}/trips/${id}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BUSINESS_NAME,
      type: 'website',
      ...(trip.cover_image_url ? { images: [trip.cover_image_url] } : {}),
    },
  };
}

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = await loadTrip(id);
  return <TripDetailClient initialTrip={trip} />;
}
