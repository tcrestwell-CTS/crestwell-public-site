import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Trip = {
  id: string
  trip_name: string
  destination: string
  depart_date: string | null
  return_date: string | null
  cover_image_url: string | null
  trip_type: 'regular' | 'group'
  tags: string[] | null
  notes: string | null
  deposit_amount: number | null
  budget_range: string | null
  currency: string
  share_token: string | null
  published_at: string | null
}

export async function getPublishedTrips({
  destination,
  search,
  startDate,
  endDate,
}: {
  destination?: string
  search?: string
  startDate?: string
  endDate?: string
} = {}) {
  let query = supabase
    .from('trips')
    .select('*')
    .not('published_at', 'is', null)
    .is('parent_trip_id', null)
    .order('depart_date', { ascending: true })

  if (destination) query = query.ilike('destination', `%${destination}%`)
  if (search) query = query.or(`trip_name.ilike.%${search}%,destination.ilike.%${search}%`)
  if (startDate) query = query.gte('depart_date', startDate)
  if (endDate) query = query.lte('depart_date', endDate)

  const { data, error } = await query
  if (error) throw error
  return data as Trip[]
}

export async function getPublishedTrip(id: string) {
  const { data, error } = await supabase
    .from('trips')
    .select(`*, itineraries:approved_itinerary_id ( id, title, itinerary_items ( id, day_number, title, description ) )`)
    .eq('id', id)
    .not('published_at', 'is', null)
    .single()

  if (error) throw error
  return data
}
