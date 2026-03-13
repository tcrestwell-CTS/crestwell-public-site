import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get('email') as string;

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { error } = await supabase
    .from('newsletter_subscribers')
    .upsert([{ email, source: 'homepage' }], { onConflict: 'email' });

  if (error) {
    return NextResponse.json({ error: error.message, code: error.code, details: error.details }, { status: 500 });
  }

  return NextResponse.redirect(new URL('/?subscribed=true', request.url));
}
