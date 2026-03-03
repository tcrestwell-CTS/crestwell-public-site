import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Trip = {
  id: string
  trip_name: string
  destination: string
  depart_date: string
  return_date: string
  cover_image_url: string | null
  trip_type: 'regular' | 'group'
  tags: string[]
  notes: string | null
  deposit_amount: number | null
  budget_range: string | null
  currency: string
  share_token: string | null
  published_at: string | null
  approved_itinerary_id: string | null
}

export type Itinerary = {
  id: string
  trip_id: string
  title: string
  items: ItineraryItem[]
}

export type ItineraryItem = {
  id: string
  day_number: number
  title: string
  description: string
  booking_id: string | null
}

// Fetch all published trips for public site
export async function getPublishedTrips({
  destination,
  search,
  minPrice,
  maxPrice,
  startDate,
  endDate,
}: {
  destination?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  startDate?: string
  endDate?: string
} = {}) {
  let query = supabase
    .from('trips')
    .select('*')
    .not('published_at', 'is', null)
    .is('parent_trip_id', null) // only top-level trips
    .order('depart_date', { ascending: true })

  if (destination) {
    query = query.ilike('destination', `%${destination}%`)
  }
  if (search) {
    query = query.or(`trip_name.ilike.%${search}%,destination.ilike.%${search}%`)
  }
  if (startDate) {
    query = query.gte('depart_date', startDate)
  }
  if (endDate) {
    query = query.lte('depart_date', endDate)
  }

  const { data, error } = await query
  if (error) throw error
  return data as Trip[]
}

// Fetch single published trip by ID
export async function getPublishedTrip(id: string) {
  const { data, error } = await supabase
    .from('trips')
    .select(`
      *,
      itineraries:approved_itinerary_id (
        id, title,
        itinerary_items (
          id, day_number, title, description
        )
      )
    `)
    .eq('id', id)
    .not('published_at', 'is', null)
    .single()

  if (error) throw error
  return data
}

// Fetch unique destinations for filter dropdown
export async function getDestinations() {
  const { data, error } = await supabase
    .from('trips')
    .select('destination')
    .not('published_at', 'is', null)
    .is('parent_trip_id', null)

  if (error) throw error
  const unique = [...new Set((data ?? []).map((t) => t.destination))].sort()
  return unique
}
