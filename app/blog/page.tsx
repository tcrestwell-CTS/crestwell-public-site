import { createClient } from '@supabase/supabase-js';
import BlogIndexClient from './BlogIndexClient';

export const dynamic = 'force-dynamic';

async function loadPosts() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const supabase = createClient(url, key);
  const { data } = await supabase
    .from('blog_posts')
    .select('id, slug, title, meta_description, hero_image_url, hero_image_alt, tags, reading_time, published_at')
    .order('published_at', { ascending: false })
    .range(0, 11);
  return data ?? [];
}

export default async function BlogPage() {
  const posts = await loadPosts();
  return <BlogIndexClient initialPosts={posts} />;
}
