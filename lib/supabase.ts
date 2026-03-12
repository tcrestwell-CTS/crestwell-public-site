import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our lead capture tables
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
