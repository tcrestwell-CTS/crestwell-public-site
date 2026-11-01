import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import TripsIndexClient from './TripsIndexClient';
import { pageMetadata } from '@/lib/page-metadata';
import type { FeaturedTrip } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMetadata({
  title: 'Featured Trips',
  description: 'Hand-picked cruises, resorts, and vacation packages from Crestwell Travel Services.',
  path: '/trips',
});

async function loadTrips(): Promise<FeaturedTrip[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from('featured_trips')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as FeaturedTrip[];
}

export default async function FeaturedTripsPage() {
  const trips = await loadTrips();
  return <TripsIndexClient initialTrips={trips} />;
}
