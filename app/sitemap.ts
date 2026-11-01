import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const SITE_URL = 'https://crestwellgetaways.com';

// Static pages with priorities
// /payment is omitted: robots.txt disallows /payment/.
// Also omitted as non-content or tokenized: /pay, /payment/result, /proposal,
// /qualify, /rental-payment, /display, /api, and cabin-selection steps.
const STATIC_PAGES = [
  { path: '',              priority: 1.0,  changeFreq: 'weekly'  },
  { path: '/cruises',      priority: 0.9,  changeFreq: 'daily'   },
  { path: '/luxury-cruises', priority: 0.8,  changeFreq: 'weekly'  },
  { path: '/cruise-lines', priority: 0.8,  changeFreq: 'weekly'  },
  { path: '/cruise-finder', priority: 0.7, changeFreq: 'monthly' },
  { path: '/group-travel',     priority: 0.8,  changeFreq: 'monthly' },
  { path: '/group-travel/valiant-lady-nov-2027', priority: 0.6, changeFreq: 'monthly' },
  { path: '/all-inclusive',priority: 0.8,  changeFreq: 'weekly'  },
  { path: '/destinations', priority: 0.9,  changeFreq: 'weekly'  },
  { path: '/trips',         priority: 0.8,  changeFreq: 'weekly'  },
  { path: '/blog',         priority: 0.8,  changeFreq: 'daily'   },
  { path: '/planning-guide', priority: 0.8, changeFreq: 'monthly' },
  { path: '/about',        priority: 0.7,  changeFreq: 'monthly' },
  { path: '/contact',      priority: 0.7,  changeFreq: 'monthly' },
  { path: '/faq',           priority: 0.8,  changeFreq: 'monthly' },
  { path: '/plan',          priority: 0.7,  changeFreq: 'monthly' },
  { path: '/request-quote',priority: 0.8,  changeFreq: 'monthly' },
  { path: '/budget',        priority: 0.6,  changeFreq: 'monthly' },
  { path: '/signature-experiences', priority: 0.7, changeFreq: 'monthly' },
  { path: '/journey-of-honor', priority: 0.7, changeFreq: 'monthly' },
  { path: '/veterans', priority: 0.7, changeFreq: 'monthly' },
  { path: '/solo-travel', priority: 0.6, changeFreq: 'monthly' },
  { path: '/financing', priority: 0.5, changeFreq: 'monthly' },
  { path: '/the-circle', priority: 0.5, changeFreq: 'monthly' },
  { path: '/domestic-travel', priority: 0.6, changeFreq: 'monthly' },
  { path: '/car-rental', priority: 0.4, changeFreq: 'monthly' },
  { path: '/excursions', priority: 0.6, changeFreq: 'weekly' },
  { path: '/excursions/viator', priority: 0.5, changeFreq: 'weekly' },
  { path: '/excursions/getyourguide', priority: 0.5, changeFreq: 'weekly' },
  { path: '/excursions/civitatis', priority: 0.5, changeFreq: 'weekly' },
  { path: '/deals/legend-of-the-seas-2026', priority: 0.6, changeFreq: 'weekly' },
  { path: '/press/txtcha-cross-channel-messaging', priority: 0.3, changeFreq: 'yearly' },
  { path: '/vacations-by-rail/usa-brochure', priority: 0.5, changeFreq: 'monthly' },
  { path: '/win', priority: 0.3, changeFreq: 'monthly' },
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

  // City landing pages — travel-agent-[city]
  const cityEntries: MetadataRoute.Sitemap = [
    'atlanta', 'nashville', 'birmingham', 'chattanooga',
    'huntsville', 'knoxville', 'memphis', 'savannah',
  ].map((city) => ({
    url: `${SITE_URL}/travel-agent-${city}`,
    lastModified: new Date(now),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const packageEntry: MetadataRoute.Sitemap = [{
    url: `${SITE_URL}/destination-packages`,
    lastModified: new Date(now),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }];

  const railEntry: MetadataRoute.Sitemap = [{
    url: `${SITE_URL}/vacations-by-rail`,
    lastModified: new Date(now),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }];

  return [...staticEntries, ...blogEntries, ...tripEntries, ...cityEntries, ...packageEntry, ...railEntry];
}
