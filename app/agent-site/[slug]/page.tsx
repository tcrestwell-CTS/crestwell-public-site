import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAgentByStorefrontSlug, getFeaturedTrips } from '@/lib/supabase';

export const revalidate = 300; // 5 min — trip inventory changes occasionally, agent info rarely

export default async function AgentStorefrontPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const agent = await getAgentByStorefrontSlug(slug).catch(() => null);
  if (!agent) notFound();

  const trips = await getFeaturedTrips().catch(() => []);

  const initials = (agent.full_name ?? '?')
    .split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  const quoteHref = (trip?: { destination: string; trip_name: string }) => {
    const qp = new URLSearchParams({ agent: agent.user_id });
    if (trip) {
      qp.set('destination', trip.destination);
      qp.set('trip', trip.trip_name);
    }
    return `/request-quote?${qp.toString()}`;
  };

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px' }}>
      {/* Agent header */}
      <section style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '48px 0', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{
          width: 84, height: 84, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
          background: 'linear-gradient(135deg, #1a294d, #0d1730)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {agent.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={agent.avatar_url} alt={agent.full_name ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ color: '#c9a84c', fontSize: 28, fontFamily: 'Georgia, serif' }}>{initials}</span>
          )}
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: '#c9a84c', fontWeight: 700 }}>
            {agent.storefront_headline || 'Your Personal Travel Advisor'}
          </p>
          <h1 style={{ margin: '4px 0 0', fontSize: 32, color: '#1a294d' }}>{agent.full_name}</h1>
          {agent.job_title && <p style={{ margin: '4px 0 0', color: '#6b7280', fontSize: 14 }}>{agent.job_title}</p>}
          {agent.storefront_bio && <p style={{ margin: '12px 0 0', color: '#374151', fontSize: 14, lineHeight: 1.6, maxWidth: 560 }}>{agent.storefront_bio}</p>}
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <Link
              href={quoteHref()}
              style={{
                display: 'inline-block', background: '#c9a84c', color: '#1a294d',
                padding: '10px 24px', borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: 'none',
              }}
            >
              Get a Free Quote
            </Link>
            {agent.phone && (
              <a
                href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`}
                style={{
                  display: 'inline-block', border: '1px solid #1a294d', color: '#1a294d',
                  padding: '10px 24px', borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: 'none',
                }}
              >
                Call {agent.phone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Featured trips */}
      <section style={{ padding: '48px 0' }}>
        <h2 style={{ fontSize: 24, color: '#1a294d', marginBottom: 24 }}>Featured Trips</h2>
        {trips.length === 0 ? (
          <p style={{ color: '#6b7280' }}>Check back soon for featured trips, or reach out for a personalized recommendation.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {trips.map((trip) => (
              <div key={trip.id} style={{ border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
                {trip.cover_image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={trip.cover_image_url} alt={trip.trip_name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
                )}
                <div style={{ padding: 16 }}>
                  <p style={{ margin: 0, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#c9a84c', fontWeight: 700 }}>
                    {trip.destination}
                  </p>
                  <h3 style={{ margin: '4px 0 8px', fontSize: 17, color: '#1a294d' }}>{trip.trip_name}</h3>
                  {trip.tagline && <p style={{ margin: '0 0 12px', fontSize: 13, color: '#6b7280' }}>{trip.tagline}</p>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {trip.starting_from && <span style={{ fontWeight: 700, color: '#1a294d', fontSize: 14 }}>from {trip.starting_from}</span>}
                    <Link href={quoteHref(trip)} style={{ fontSize: 13, fontWeight: 700, color: '#c9a84c', textDecoration: 'none' }}>
                      Request Quote →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
