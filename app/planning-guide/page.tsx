import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import JsonLd from '@/components/JsonLd';
import { PLANNING_FAQS } from '@/data/planning-guide';
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/page-metadata';
import { BUSINESS_NAME, SITE_URL } from '@/lib/site';

const PATH = '/planning-guide';

export const metadata: Metadata = pageMetadata({
  title: 'Cruise and Group Planning Guide',
  description:
    'Plain answers from Crestwell Travel Services on multigenerational cruises, what a group organizer should prepare, Journey of Honor, and Signature Experiences — then the quote form.',
  path: PATH,
});

export default function PlanningGuidePage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Planning guide', path: PATH },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs, `${SITE_URL}${PATH}#breadcrumb`)} />
      <JsonLd
        data={faqPageJsonLd(
          PLANNING_FAQS.map((item) => ({ question: item.question, answer: item.answer })),
        )}
      />
      <Breadcrumb items={crumbs.map((c) => ({ name: c.name, href: c.path }))} />

      <article style={{ background: 'var(--cream)' }}>
        <header style={{ background: 'var(--navy)', padding: '120px 32px 72px' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <p className="overline" style={{ marginBottom: 16 }}>{BUSINESS_NAME}</p>
            <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 300, color: 'white', lineHeight: 1.15, marginBottom: 20 }}>
              Questions to answer before you request a quote
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: 640 }}>
              Practical notes for cruises, groups, Journey of Honor, and Signature Experiences.
              The website is crestwellgetaways.com. Nothing here is a price or a promise about a specific sailing — that comes back on your quote.
            </p>
          </div>
        </header>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '56px 32px 24px' }}>
          <nav aria-label="On this page" style={{ background: 'white', padding: '24px 28px', borderTop: '3px solid var(--gold)' }}>
            <p style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--slate)', marginBottom: 12 }}>
              On this page
            </p>
            <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PLANNING_FAQS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} style={{ color: 'var(--navy)', fontSize: '0.95rem' }}>{item.question}</a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {PLANNING_FAQS.map((item) => (
          <section key={item.id} id={item.id} style={{ maxWidth: 800, margin: '0 auto', padding: '12px 32px 28px' }}>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.45rem, 3vw, 1.9rem)', fontWeight: 400, color: 'var(--navy)', marginBottom: 16, lineHeight: 1.3 }}>
              {item.question}
            </h2>
            {item.answer.split('\n\n').map((paragraph) => (
              <p key={paragraph.slice(0, 40)} style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>
                {paragraph}
              </p>
            ))}
            <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {item.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: '0.82rem', color: 'var(--navy)', borderBottom: '1px solid var(--gold)', textDecoration: 'none' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section style={{ maxWidth: 800, margin: '0 auto', padding: '12px 32px 80px' }}>
          <div style={{ background: 'var(--navy)', padding: '36px 32px', borderTop: '3px solid var(--gold)' }}>
            <h2 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 300, color: 'white', marginBottom: 12 }}>
              Ready to send the details?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 20 }}>
              Use the quote form. Say what you know and what you are unsure about. A specialist follows up from {BUSINESS_NAME}.
            </p>
            <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Request a quote
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
