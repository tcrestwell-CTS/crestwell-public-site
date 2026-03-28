'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import TravelAdvisoryTicker from '@/components/TravelAdvisoryTicker';
import { createClient } from '@supabase/supabase-js';

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  meta_description: string | null;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  tags: string | null;
  reading_time: number;
  published_at: string;
};

const PAGE_SIZE = 12;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function SkeletonCard() {
  return (
    <div style={{ background: 'white', overflow: 'hidden' }}>
      <div style={{ height: 200, background: '#e5e7eb', animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ padding: 24 }}>
        {[90, 70, 50].map((w, i) => (
          <div key={i} style={{ height: 14, background: '#e5e7eb', borderRadius: 4, marginBottom: 10, width: `${w}%`, animation: 'pulse 1.5s ease-in-out infinite' }} />
        ))}
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:1} }`}</style>
    </div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState('');
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const fetchPosts = async (from: number, append = false) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title, meta_description, hero_image_url, hero_image_alt, tags, reading_time, published_at')
      .order('published_at', { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (error) throw error;
    const results = data || [];
    setHasMore(results.length === PAGE_SIZE);
    if (append) {
      setPosts(prev => [...prev, ...results]);
    } else {
      setPosts(results);
    }
  };

  useEffect(() => {
    fetchPosts(0)
      .catch(() => setError('Couldn\'t load articles. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      await fetchPosts(posts.length, true);
    } catch {
      setError('Couldn\'t load more articles.');
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', paddingTop: 140, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1473615695634-bfd05d49cb7f?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Travel Insights</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
            Travel Tips & Guides
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: 500, lineHeight: 1.75 }}>
            Expert advice, destination guides, and insider tips from the Crestwell travel team.
          </p>
        </div>
      </section>

      {/* Travel Advisory Ticker */}
      <TravelAdvisoryTicker speed={0.5} />

      {/* Posts */}
      <section style={{ background: 'var(--cream)', padding: '64px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Loading skeletons */}
          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
              {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '2rem', marginBottom: 16, opacity: 0.3 }}>⚠️</div>
              <p style={{ color: 'var(--slate)', marginBottom: 24 }}>{error}</p>
              <button
                onClick={() => { setError(''); setLoading(true); fetchPosts(0).finally(() => setLoading(false)); }}
                className="btn-navy"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: 20, opacity: 0.3 }}>✍️</div>
              <h3 className="font-display" style={{ color: 'var(--navy)', fontWeight: 300, marginBottom: 10 }}>Articles are on the way!</h3>
              <p style={{ color: 'var(--slate)' }}>Check back soon for travel tips, destination guides, and cruise advice.</p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && posts.length > 0 && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28, marginBottom: 48 }}>
                {posts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <article className="card-hover" style={{ background: 'white', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      {/* Hero image — hidden if missing or broken */}
                      {post.hero_image_url && !imgErrors.has(post.id) && (
                        <div style={{ height: 200, overflow: 'hidden', flexShrink: 0 }}>
                          <img
                            src={post.hero_image_url}
                            alt={post.hero_image_alt || post.title}
                            onError={() => setImgErrors(prev => new Set(prev).add(post.id))}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                      )}
                      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        {post.tags && (
                          <div style={{ marginBottom: 10 }}>
                            <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', padding: '2px 8px', border: '1px solid rgba(201,168,76,0.35)' }}>
                              {post.tags.split(',')[0].trim()}
                            </span>
                          </div>
                        )}
                        <h2 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 400, color: 'var(--navy)', lineHeight: 1.3, marginBottom: 12 }}>
                          {post.title}
                        </h2>
                        {post.meta_description && (
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>
                            {post.meta_description.length > 160
                              ? post.meta_description.slice(0, 160) + '…'
                              : post.meta_description}
                          </p>
                        )}
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.72rem', color: 'var(--slate)' }}>
                            {post.published_at ? formatDate(post.published_at) : ''}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--slate)' }}>
                            {post.reading_time} min read
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {hasMore && (
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="btn-navy"
                    style={{ opacity: loadingMore ? 0.6 : 1, cursor: loadingMore ? 'not-allowed' : 'pointer' }}
                  >
                    {loadingMore ? 'Loading…' : 'Load More Articles'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '64px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Ready to Travel?</div>
          <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 300, color: 'white', marginBottom: 12 }}>
            Turn Inspiration Into Your Next Trip
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginBottom: 32 }}>
            Our specialists are ready to help you plan the perfect vacation.
          </p>
          <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
