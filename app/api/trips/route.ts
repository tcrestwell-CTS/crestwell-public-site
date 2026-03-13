import { NextRequest, NextResponse } from 'next/server'
import { getFeaturedTrips } from '@/lib/supabase'

export const revalidate = 0

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const destination = searchParams.get('destination') ?? undefined
  const search      = searchParams.get('search') ?? undefined

  try {
    const trips = await getFeaturedTrips({ destination, search })
    return NextResponse.json({ trips }, {
      headers: { 'Cache-Control': 'no-store' }
    })
  } catch (err) {
    console.error('Failed to fetch trips:', err)
    return NextResponse.json({ error: 'Failed to fetch trips' }, { status: 500 })
  }
}
