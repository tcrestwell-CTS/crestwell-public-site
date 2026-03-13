import { createClient } from '@supabase/supabase-js';

export const getSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
  trip_name: string;
  destination: string;
  trip_type?: string;
  depart_date?: string;
  return_date?: string;
  budget_range?: string;
  deposit_amount?: number;
  notes?: string;
  tags?: string[];
  cover_image_url?: string;
  published?: boolean;
  itineraries?: {
    itinerary_items?: {
      id: string;
      day_number: number;
      title: string;
      description?: string;
    }[];
  };
};

// ─── Featured Trip query helpers ──────────────────────────────────────────────

export type GetFeaturedTripsParams = {
  destination?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
};

export async function getFeaturedTrips(params: GetFeaturedTripsParams = {}): Promise<FeaturedTrip[]> {
  let query = supabase
    .from('featured_trips')
    .select('*')
    .eq('published', true)
    .order('depart_date', { ascending: true });

  if (params.destination) {
    query = query.ilike('destination', `%${params.destination}%`);
  }
  if (params.search) {
    query = query.or(`trip_name.ilike.%${params.search}%,destination.ilike.%${params.search}%`);
  }
  if (params.startDate) {
    query = query.gte('depart_date', params.startDate);
  }
  if (params.endDate) {
    query = query.lte('depart_date', params.endDate);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getFeaturedTrip(id: string): Promise<FeaturedTrip | null> {
  const { data, error } = await supabase
    .from('featured_trips')
    .select('*, itineraries(itinerary_items(*))')
    .eq('id', id)
    .eq('published', true)
    .single();
  if (error) throw error;
  return data;
}
