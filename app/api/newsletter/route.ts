import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert([{ email, source: 'homepage', active: true }], { onConflict: 'email' });

    if (error) throw error;

    return NextResponse.redirect(new URL('/?subscribed=true', request.url));
  } catch {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
