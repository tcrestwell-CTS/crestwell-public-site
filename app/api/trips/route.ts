import { NextRequest, NextResponse } from 'next/server'
import { getPublishedTrips } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const destination = searchParams.get('destination') ?? undefined
  const search      = searchParams.get('search') ?? undefined
  const startDate   = searchParams.get('startDate') ?? undefined
  const endDate     = searchParams.get('endDate') ?? undefined
  const minPrice    = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined
  const maxPrice    = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined

  try {
    const trips = await getPublishedTrips({ destination, search, startDate, endDate, minPrice, maxPrice })
    return NextResponse.json({ trips })
  } catch (err) {
    console.error('Failed to fetch trips:', err)
    return NextResponse.json({ error: 'Failed to fetch trips' }, { status: 500 })
  }
}
