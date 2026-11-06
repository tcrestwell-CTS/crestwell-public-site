import type { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import BlogPostClient from './BlogPostClient';
import { BUSINESS_NAME, SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';

type BlogPost = {
  slug: string;
  title: string;
  meta_description: string | null;
  hero_image_url: string | null;
  published_at: string;
  updated_at: string | null;
};

async function loadPost(slug: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { post: null, related: [] };

  const supabase = createClient(url, key);
  const { data } = await supabase.from('blog_posts').select('*').eq('slug', slug).maybeSingle();
  if (!data) return { post: null, related: [] };

  const { data: related } = await supabase
    .from('blog_posts')
    .select('id, slug, title, hero_image_url, hero_image_alt, published_at, reading_time')
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(3);

  return { post: data, related: related ?? [] };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await loadPost(slug);
  const article = post as BlogPost | null;
  if (!article) {
    return { title: `Article | ${BUSINESS_NAME}`, robots: { index: false, follow: false } };
  }
  const title = article.title.includes(BUSINESS_NAME) ? article.title : `${article.title} | ${BUSINESS_NAME}`;
  const description = article.meta_description ?? undefined;
  const canonical = `${SITE_URL}/blog/${slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      siteName: BUSINESS_NAME,
      ...(article.hero_image_url ? { images: [article.hero_image_url] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post, related } = await loadPost(slug);
  return <BlogPostClient initialPost={post} initialRelated={related} />;
}
