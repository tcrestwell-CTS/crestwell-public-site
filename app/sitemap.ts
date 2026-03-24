import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const SITE_URL = 'https://crestwellgetaways.com';

// Static pages with priorities
const STATIC_PAGES = [
  { path: '',              priority: 1.0,  changeFreq: 'weekly'  },
  { path: '/cruises',      priority: 0.9,  changeFreq: 'daily'   },
  { path: '/cruise-lines', priority: 0.9,  changeFreq: 'weekly'  },
  { path: '/all-inclusive',priority: 0.8,  changeFreq: 'weekly'  },
  { path: '/destinations', priority: 0.8,  changeFreq: 'weekly'  },
  { path: '/blog',         priority: 0.8,  changeFreq: 'daily'   },
  { path: '/about',        priority: 0.7,  changeFreq: 'monthly' },
  { path: '/contact',      priority: 0.7,  changeFreq: 'monthly' },
  { path: '/faq',           priority: 0.7,  changeFreq: 'monthly' },
  { path: '/request-quote',priority: 0.8,  changeFreq: 'monthly' },
  { path: '/payment',      priority: 0.6,  changeFreq: 'monthly' },
  { path: '/terms',        priority: 0.3,  changeFreq: 'yearly'  },
  { path: '/privacy',      priority: 0.3,  changeFreq: 'yearly'  },
];

// Individual destination pages
const DESTINATION_PAGES = [
  { path: '/destinations/caribbean',    priority: 0.8, changeFreq: 'weekly' },
  { path: '/destinations/mediterranean',priority: 0.8, changeFreq: 'weekly' },
  { path: '/destinations/alaska',       priority: 0.8, changeFreq: 'weekly' },
  { path: '/destinations/bahamas',      priority: 0.8, changeFreq: 'weekly' },
  { path: '/destinations/europe',       priority: 0.8, changeFreq: 'weekly' },
  { path: '/destinations/mexico',       priority: 0.8, changeFreq: 'weekly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticEntries: MetadataRoute.Sitemap = [
    ...STATIC_PAGES,
    ...DESTINATION_PAGES,
  ].map(page => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFreq as MetadataRoute.Sitemap[0]['changeFrequency'],
    priority: page.priority,
  }));

  // Blog posts from Supabase
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .order('published_at', { ascending: false });

    if (posts) {
      blogEntries = posts.map((post: { slug: string; updated_at: string; published_at: string }) => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.published_at || now),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.error('Sitemap: failed to fetch blog posts', err);
  }

  // Featured trips from Supabase
  let tripEntries: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: trips } = await supabase
      .from('featured_trips')
      .select('slug, created_at')
      .eq('published', true)
      .not('slug', 'is', null);

    if (trips) {
      tripEntries = trips.map((trip: { slug: string; created_at: string }) => ({
        url: `${SITE_URL}/trips/${trip.slug}`,
        lastModified: new Date(trip.created_at || now),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.error('Sitemap: failed to fetch trips', err);
  }

  return [...staticEntries, ...blogEntries, ...tripEntries];
}
