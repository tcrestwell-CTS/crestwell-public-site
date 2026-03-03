import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, email, phone, message, groupSize, tripName, tripId } = body

  if (!name || !email) return NextResponse.json({ error: 'Name and email required' }, { status: 400 })

  try {
    await supabase.from('trip_inquiries').insert({
      name, email,
      phone: phone || null,
      message: message || null,
      group_size: groupSize,
      trip_name: tripName || null,
      trip_id: tripId || null,
      source: 'public_website',
      status: 'new',
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
