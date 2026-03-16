import { createClient } from '@supabase/supabase-js';

export const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Keep exported instance for components that need it directly
export const supabase = getSupabase()

// ─── Types ────────────────────────────────────────────────────────────────────

export type QuoteRequest = {
  id?: string;
  created_at?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  trip_type: string;
  destination?: string;
  departure_date?: string;
  travelers_adults: number;
  travelers_children: number;
  budget?: string;
  flexibility: string;
  message?: string;
  status?: 'new' | 'contacted' | 'booked' | 'closed';
};

export type NewsletterSubscriber = {
  id?: string;
  created_at?: string;
  email: string;
  source?: string;
};

export type ContactMessage = {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: 'new' | 'read' | 'replied';
};

export type FeaturedTrip = {
  id: string;
  created_at?: string;
  slug?: string;
  trip_name: string;
  destination: string;
  trip_type?: string;
  duration?: string;
  starting_from?: string;
  highlights?: string[];
  description?: string;
  popular?: boolean;
  cover_image_url?: string;
  published?: boolean;
  // Detail page fields
  tagline?: string;
  overview?: string;
  itinerary?: {
    day: number;
    title: string;
    location?: string;
    description?: string;
    highlights?: string[];
    accommodation?: string;
    meals?: string[];
  }[];
  included?: string[];
  excluded?: string[];
  gallery_images?: string[];
  group_size?: string;
  difficulty?: string;
  rating?: number;
  review_count?: number;
};

// ─── Featured Trip query helpers ──────────────────────────────────────────────

export type GetFeaturedTripsParams = {
  destination?: string;
  search?: string;
  trip_type?: string;
};

export async function getFeaturedTrips(params: GetFeaturedTripsParams = {}): Promise<FeaturedTrip[]> {
  // Create a fresh client each call to avoid stale cached instances
  const client = getSupabase();

  let query = client
    .from('featured_trips')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (params.destination) {
    query = query.ilike('destination', `%${params.destination}%`);
  }
  if (params.search) {
    query = query.or(`trip_name.ilike.%${params.search}%,destination.ilike.%${params.search}%`);
  }
  if (params.trip_type) {
    query = query.eq('trip_type', params.trip_type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedTrip(id: string): Promise<FeaturedTrip | null> {
  const client = getSupabase();
  const { data, error } = await client
    .from('featured_trips')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .single();
  if (error) throw error;
  return data;
}
