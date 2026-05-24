'use client';
import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const SITE_DOMAIN = 'https://crestwellgetaways.com';

type FaqItem = { question: string; answer: string };

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  content_html: string | null;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  infographic_url: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  tags: string | null;
  faq_schema: FaqItem[] | null;
  reading_time: number;
  published_at: string;
  updated_at: string | null;
};

type RelatedPost = {
  id: number;
  slug: string;
  title: string;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  published_at: string;
  reading_time: number;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// ── FAQ Accordion ─────────────────────────────────────────────────────────────

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div style={{ marginTop: 48 }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', marginBottom: 24, fontFamily: 'var(--font-display)' }}>
        Frequently Asked Questions
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item, i) => (
          <div key={i} style={{ border: '1px solid rgba(13,27,42,0.1)', background: open === i ? 'white' : 'var(--cream)' }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--navy)', lineHeight: 1.4 }}>{item.question}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transition: 'transform 0.2s', transform: open === i ? 'rotate(180deg)' : 'none' }}>
                <path d="M4 6l4 4 4-4" stroke="var(--slate)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {open === i && (
              <div style={{ padding: '0 20px 20px', borderTop: '1px solid rgba(13,27,42,0.06)' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginTop: 16 }}>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

function BlogPostContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroError, setHeroError] = useState(false);
  const [infraError, setInfraError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data, error }: { data: BlogPost | null; error: any }) => {
        if (!error && data) {
          setPost(data);
          // Fetch related posts
          supabase
            .from('blog_posts')
            .select('id, slug, title, hero_image_url, hero_image_alt, published_at, reading_time')
            .neq('slug', slug)
            .order('published_at', { ascending: false })
            .limit(3)
            .then(({ data: rel }: { data: RelatedPost[] | null }) => setRelated(rel || []));
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ background: 'var(--navy)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading…</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, paddingTop: 120 }}>
        <div style={{ fontSize: '2rem', opacity: 0.3 }}>📝</div>
        <h2 className="font-display" style={{ color: 'var(--navy)', fontWeight: 300 }}>Article Not Found</h2>
        <p style={{ color: 'var(--slate)', fontSize: '0.875rem' }}>This article may have moved or been removed.</p>
        <Link href="/blog" className="btn-navy" style={{ textDecoration: 'none' }}>← Back to All Articles</Link>
      </div>
    );
  }

  const faqItems: FaqItem[] = Array.isArray(post.faq_schema) ? post.faq_schema : [];

  // JSON-LD structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.hero_image_url,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    description: post.meta_description,
    publisher: {
      '@type': 'Organization',
      name: 'Crestwell Travel Services',
      url: SITE_DOMAIN,
    },
  };

  const faqJsonLd = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null;

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      {/* Hero image */}
      {post.hero_image_url && !heroError && (
        <div style={{ width: '100%', maxHeight: 400, overflow: 'hidden', marginTop: 72 }}>
          <img
            src={post.hero_image_url}
            alt={post.hero_image_alt || post.title}
            onError={() => setHeroError(true)}
            style={{ width: '100%', height: 400, objectFit: 'cover' }}
          />
        </div>
      )}
      {(!post.hero_image_url || heroError) && <div style={{ height: 72 }} />}

      {/* Article */}
      <section style={{ background: 'white', padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 32px) 80px' }}>
        <div className="blog-layout" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 280px', gap: 64, alignItems: 'start' }}>

          {/* Main content */}
          <article>
            {/* Back link */}
            <Link href="/blog" style={{ fontSize: '0.8rem', color: 'var(--slate)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
              ← Back to all articles
            </Link>

            {/* Meta */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
              {post.tags && (
                <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', padding: '3px 10px', border: '1px solid rgba(201,168,76,0.4)' }}>
                  {post.tags.split(',')[0].trim()}
                </span>
              )}
              <span style={{ fontSize: '0.8rem', color: 'var(--slate)' }}>{formatDate(post.published_at)}</span>
              <span style={{ color: 'var(--slate)', fontSize: '0.8rem' }}>·</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--slate)' }}>{post.reading_time} min read</span>
            </div>

            {/* Title */}
            <h1 className="font-display" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 300, color: 'var(--navy)', lineHeight: 1.2, marginBottom: 32 }}>
              {post.title}
            </h1>

            {/* Article body */}
            {post.content_html && (
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: post.content_html }}
              />
            )}

            {/* Infographic */}
            {post.infographic_url && !infraError && (
              <div style={{ marginTop: 40, border: '1px solid #e5e7eb', borderRadius: 8, overflow: 'hidden' }}>
                <img
                  src={post.infographic_url}
                  alt="Infographic"
                  onError={() => setInfraError(true)}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            )}

            {/* FAQ */}
            {faqItems.length > 0 && <FaqAccordion items={faqItems} />}

            {/* Tags */}
            {post.tags && (
              <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #eee' }}>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 12 }}>Tags</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {post.tags.split(',').map(tag => (
                    <span key={tag} style={{ fontSize: '0.75rem', padding: '5px 12px', background: 'var(--cream)', color: 'var(--navy)', letterSpacing: '0.05em' }}>
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside>
            <div style={{ position: 'sticky', top: 100 }}>
              <div style={{ background: 'var(--navy)', padding: '28px', marginBottom: 16 }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>Plan Your Trip</div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: 20 }}>
                  Ready to turn inspiration into a real vacation? Our specialists are here to help — no booking fees, ever.
                </p>
                <Link href="/request-quote" className="btn-primary" style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginBottom: 10 }}>
                  Request a Free Quote
                </Link>
                <Link href="/contact" style={{
                  display: 'block', textAlign: 'center', textDecoration: 'none',
                  padding: '11px', fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                  border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'var(--font-body)',
                }}>
                  Talk to a Specialist
                </Link>
              </div>
              <div style={{ background: 'var(--cream)', padding: '20px 24px' }}>
                {[
                  { icon: '🔒', text: 'No booking fees — ever' },
                  { icon: '⭐', text: 'ASTA & CLIA certified' },
                  { icon: '📞', text: '24hr specialist support' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', borderBottom: i < 2 ? '1px solid rgba(13,27,42,0.06)' : 'none' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--navy)' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── CTA Block ──────────────────────────────────────────────────────── */}
      <section style={{ margin: '64px auto', maxWidth: 760, padding: '0 24px' }}>
        <div style={{
          background: 'var(--navy)', borderRadius: 12, padding: '48px 40px',
          position: 'relative', overflow: 'hidden',
          border: '1px solid rgba(201,168,76,0.2)',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 10 }}>
                Ready to Travel?
              </p>
              <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 400, color: 'white', marginBottom: 10, lineHeight: 1.3 }}>
                Planning a cruise or vacation?
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontFamily: 'var(--font-body)' }}>
                Get a free personalized quote from a Crestwell advisor — no booking fees, no pressure.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <a href="/request-quote" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', background: 'var(--gold)', color: 'var(--navy)',
                textDecoration: 'none', fontSize: '0.78rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)',
                borderRadius: 4, whiteSpace: 'nowrap',
              }}>
                Get a Free Quote →
              </a>
              <a href="tel:8885086893" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '10px 20px', border: '1px solid rgba(201,168,76,0.4)',
                color: 'var(--gold)', textDecoration: 'none',
                fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', fontFamily: 'var(--font-body)',
                borderRadius: 4, whiteSpace: 'nowrap',
              }}>
                📞 888.508.6893
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}}
      {related.length > 0 && (
        <section style={{ background: 'var(--cream)', padding: '64px 32px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div className="overline" style={{ marginBottom: 12 }}>Keep Reading</div>
            <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--navy)', marginBottom: 36 }}>Related Articles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {related.map(p => (
                <Link key={p.id} href={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <article className="card-hover" style={{ background: 'white', overflow: 'hidden' }}>
                    {p.hero_image_url && (
                      <div style={{ height: 180, overflow: 'hidden' }}>
                        <img
                          src={p.hero_image_url}
                          alt={p.hero_image_alt || p.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={e => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none'; }}
                        />
                      </div>
                    )}
                    <div style={{ padding: '24px' }}>
                      <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--navy)', lineHeight: 1.3, marginBottom: 10 }}>{p.title}</h3>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.72rem', color: 'var(--slate)' }}>{formatDate(p.published_at)}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--slate)' }}>{p.reading_time} min read</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prose styles */}
      <style>{`
        /* Prose content styles */
        .prose-content { word-break: break-word; overflow-wrap: break-word; }
        .prose-content h2 { font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--navy); margin: 1.75rem 0 0.75rem; line-height: 1.3; }
        .prose-content h3 { font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--navy); margin: 1.5rem 0 0.6rem; line-height: 1.3; }
        .prose-content p { font-size: 0.95rem; line-height: 1.85; color: #374151; margin-bottom: 1rem; }
        .prose-content ul, .prose-content ol { padding-left: 1.5rem; margin-bottom: 1rem; }
        .prose-content li { margin-bottom: 0.5rem; line-height: 1.75; font-size: 0.95rem; color: #374151; }
        .prose-content blockquote { border-left: 4px solid var(--gold); padding-left: 1rem; font-style: italic; color: #6b7280; margin: 1.5rem 0; }
        .prose-content code:not(pre code) { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.875em; word-break: break-all; }
        .prose-content pre { background: #111827; color: #f9fafb; padding: 1rem; border-radius: 8px; overflow-x: auto; margin-bottom: 1rem; max-width: 100%; }
        .prose-content pre code { background: none; padding: 0; white-space: pre-wrap; }
        .prose-content table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; display: block; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .prose-content th, .prose-content td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; font-size: 0.875rem; white-space: nowrap; }
        .prose-content tr:nth-child(even) { background: #f9fafb; }
        .prose-content img { max-width: 100%; height: auto; border-radius: 8px; display: block; margin: 1.5rem auto; }
        .prose-content a { color: var(--navy); text-decoration: underline; }
        .prose-content a:hover { color: var(--gold); }
        .prose-content iframe { max-width: 100%; }

        /* Layout breakpoints */
        .blog-layout { grid-template-columns: minmax(0, 1fr) 280px; }

        @media (max-width: 900px) {
          .blog-layout {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          /* Move sidebar above related posts on mobile */
          .blog-layout aside {
            order: -1;
          }
          .blog-layout aside > div {
            position: static !important;
          }
        }

        @media (max-width: 600px) {
          .prose-content h2 { font-size: 1.25rem; }
          .prose-content h3 { font-size: 1.1rem; }
          .prose-content p, .prose-content li { font-size: 0.9rem; }
        }
      `}</style>
    </>
  );
}

export default function BlogPostPage() {
  return (
    <Suspense fallback={<div style={{ background: 'var(--navy)', minHeight: '100vh' }} />}>
      <BlogPostContent />
    </Suspense>
  );
}
