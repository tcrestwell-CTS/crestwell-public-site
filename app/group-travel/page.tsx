'use client';
import { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from "@/components/Breadcrumb";

// ─── Group types ──────────────────────────────────────────────────────────────

const GROUP_TYPES = [
  {
    id: 'church',
    icon: '✝',
    title: 'Church & Faith Groups',
    desc: 'We specialize in faith-based group travel across the Southeast. From congregation cruises to Holy Land tours, we handle every detail so your group can focus on fellowship.',
    highlights: ['Private group devotional spaces', 'Flexible deposit structure for members', 'Experience with Georgia, Tennessee & Alabama churches', 'Group communication & payment management'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  },
  {
    id: 'family',
    icon: '⌂',
    title: 'Family Reunions',
    desc: 'Bring the whole family together on a vacation everyone will remember. We coordinate cabin selection, dining reservations, and group activities across multiple generations.',
    highlights: ['Adjacent cabin blocking', 'Multi-generational itinerary planning', 'Family-friendly dining coordination', 'Kids\' activities & teen programming'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  },
  {
    id: 'friends',
    icon: '◎',
    title: 'Friend Groups & Social Clubs',
    desc: 'Birthday milestones, girls\' trips, golf groups, social organizations — we make group travel seamless so your crew shows up, has a great time, and actually stays friends.',
    highlights: ['Group cocktail party or welcome event', 'Shared excursion coordination', 'Individual booking management', 'Custom group name & branded materials'],
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80',
  },
  {
    id: 'corporate',
    icon: '◈',
    title: 'Corporate & Incentive Travel',
    desc: 'Reward your top performers with an incentive trip they\'ll talk about for years. We handle the planning — you focus on running your business.',
    highlights: ['Branded group experience', 'Meeting space & A/V coordination', 'Team-building excursions', 'Executive-level accommodation'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  },
];

// ─── Benefits ─────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    num: '01',
    title: 'Group Rates & Savings',
    body: 'Most cruise lines and resorts unlock group pricing at 8 cabins or 10 rooms. We negotiate on your behalf for reduced per-person fares, onboard credits, and complimentary amenities.',
  },
  {
    num: '02',
    title: 'One Free Berth Policy',
    body: 'Book enough cabins and one traveler sails free — or the credit applies to your group fund. We track these thresholds and make sure you capture every benefit you\'re entitled to.',
  },
  {
    num: '03',
    title: 'Private Group Amenities',
    body: 'From welcome cocktail parties to private shore excursions, group bookings unlock onboard events and exclusive experiences not available to individual travelers.',
  },
  {
    num: '04',
    title: 'We Handle the Admin',
    body: 'Collecting deposits, tracking payments, managing rooming lists, handling individual changes — we manage the logistics so you don\'t have to chase down 30 people for their passport numbers.',
  },
  {
    num: '05',
    title: 'Flexible Payment Plans',
    body: 'We offer monthly payment plans for group members, making it easier for everyone to commit early. Individual members can pay on their own schedule — we consolidate everything.',
  },
  {
    num: '06',
    title: 'Dedicated Group Specialist',
    body: 'Your group gets a named Crestwell specialist as a single point of contact from first inquiry through embarkation day — and available by phone if anything comes up while you\'re at sea.',
  },
];

// ─── Process steps ────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: '1',
    title: 'Tell Us About Your Group',
    body: 'Fill out our group planning form — group type, approximate size, travel dates, and budget. We\'ll follow up within one business day.',
  },
  {
    n: '2',
    title: 'We Build Your Options',
    body: 'Your specialist sources the best ships, resorts, and dates for your group size. We present 2–3 curated options with pricing and group amenity breakdowns.',
  },
  {
    n: '3',
    title: 'Hold Your Group Space',
    body: 'A deposit holds your block of cabins or rooms. We set up your group\'s payment portal and manage individual member reservations from here.',
  },
  {
    n: '4',
    title: 'Smooth Sailing',
    body: 'We handle every detail through departure — rooming lists, documentation, excursion bookings, and day-of support. You just show up.',
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: 'How many people do we need for a group booking?',
    a: 'Most cruise lines unlock group rates at 8 cabins (typically 16 passengers). For resorts, it\'s usually 10 rooms. Smaller groups can still travel together under a coordinated reservation — you may just not hit formal group pricing thresholds.',
  },
  {
    q: 'How far in advance should we book?',
    a: 'For large groups of 20+ we recommend 12–18 months out, especially for holiday sailings or popular itineraries. Smaller groups of 10–20 can often book 6–9 months ahead. The sooner the better for cabin selection and group pricing.',
  },
  {
    q: 'Can members of our group book on their own payment schedule?',
    a: 'Yes. We set up individual payment profiles for each member. They can pay their own deposit and balance directly through our system, on their own timeline, as long as payments hit before the final payment deadline.',
  },
  {
    q: 'What if someone needs to cancel?',
    a: 'Each member\'s booking follows the cruise line or resort\'s standard cancellation policy. We strongly recommend travel insurance for all group members — we work with several providers and can include it in the initial quote.',
  },
  {
    q: 'Do you handle group excursions?',
    a: 'Yes. We can book group shore excursions through the cruise line or with vetted local operators — often at a group discount. For certain ports we can arrange fully private excursions for your group.',
  },
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({ faq }: { faq: typeof FAQS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: 'clamp(16px, 2vw, 20px) 0', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
        }}
      >
        <span style={{ fontSize: 'clamp(0.88rem, 2vw, 0.95rem)', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 300, lineHeight: 1.4 }}>
          {faq.q}
        </span>
        <span style={{ color: 'var(--gold)', fontSize: '1.2rem', flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, paddingBottom: 20 }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GroupTravelPage() {
  const [activeType, setActiveType] = useState('church');
  const active = GROUP_TYPES.find(g => g.id === activeType)!;

  return (
    <>
      <Breadcrumb items={[{"name": "Home", "href": "/"}, {"name": "Group Travel"}]} />
      {/* ── Hero ── */}
      <section style={{
        background: '#05080f', position: 'relative', overflow: 'hidden',
        paddingTop: 'clamp(100px, 14vw, 160px)',
        paddingBottom: 'clamp(60px, 8vw, 100px)',
        minHeight: '60vh', display: 'flex', alignItems: 'center',
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1800&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center 35%',
          opacity: 0.15,
        }} />
        {/* Gradient vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(5,8,15,0.95) 0%, rgba(5,8,15,0.5) 60%, rgba(5,8,15,0.9) 100%)',
        }} />
        {/* Gold rule */}
        <div style={{ position: 'absolute', top: 72, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)' }} />

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 clamp(18px, 5vw, 32px)', width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 24, height: 1, background: 'var(--gold)', opacity: 0.7 }} />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              Group Travel Specialists
            </span>
            <div style={{ width: 24, height: 1, background: 'var(--gold)', opacity: 0.7 }} />
          </div>

          <h1 className="font-display" style={{
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 200, color: 'white', lineHeight: 1.05,
            marginBottom: 24, maxWidth: 780, letterSpacing: '-0.02em',
          }}>
            Travel Together.<br />
            <em style={{ color: 'var(--gold-light)' }}>Remember Forever.</em>
          </h1>

          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            maxWidth: 560, lineHeight: 1.85, marginBottom: 44,
          }}>
            From church groups and family reunions to corporate incentive trips — Crestwell
            manages every detail so your group shows up, connects, and has the time of their lives.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 56px)', flexWrap: 'wrap' }}>
            {[
              { num: '8+',   label: 'Cabins for group rates' },
              { num: '1',    label: 'Free berth per group block' },
              { num: '100%', label: 'Admin handled by us' },
              { num: '0',    label: 'Booking fees' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--gold)', fontWeight: 200, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginTop: 6, fontFamily: 'var(--font-body)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Group types ── */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(56px, 7vw, 96px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Who We Serve</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)' }}>
              Every Kind of Group
            </h2>
          </div>

          {/* Type selector tabs */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 0, flexWrap: 'wrap', borderBottom: '2px solid rgba(13,27,42,0.1)' }}>
            {GROUP_TYPES.map(g => (
              <button
                key={g.id}
                onClick={() => setActiveType(g.id)}
                style={{
                  flex: '1 1 160px', padding: 'clamp(14px, 2vw, 20px) clamp(16px, 3vw, 28px)',
                  background: 'none', border: 'none',
                  borderBottom: activeType === g.id ? '3px solid var(--gold)' : '3px solid transparent',
                  marginBottom: -2,
                  color: activeType === g.id ? 'var(--navy)' : 'var(--slate)',
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                <span style={{ fontSize: '1rem', color: activeType === g.id ? 'var(--gold)' : 'var(--slate)' }}>{g.icon}</span>
                <span style={{ fontSize: 'clamp(0.78rem, 2vw, 0.88rem)', fontWeight: activeType === g.id ? 600 : 400, fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                  {g.title.split(' ')[0]} {g.title.split(' ')[1]}
                </span>
              </button>
            ))}
          </div>

          {/* Active type detail */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
            gap: 0,
            background: 'white',
          }}>
            {/* Image */}
            <div style={{
              minHeight: 360,
              backgroundImage: `url(${active.image})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,27,42,0.0) 0%, rgba(13,27,42,0.0) 100%)' }} />
              <div style={{
                position: 'absolute', bottom: 28, left: 28,
                background: 'var(--navy)', padding: '6px 18px',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ fontSize: '1.1rem', color: 'var(--gold)' }}>{active.icon}</span>
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                  {active.title}
                </span>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: 'clamp(28px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 28 }}>
                {active.desc}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {active.highlights.map((h, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ width: 18, height: 18, background: 'var(--gold)', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2, fontSize: '0.6rem', color: 'var(--navy)', fontWeight: 700 }}>✓</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--navy)', lineHeight: 1.6 }}>{h}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/plan?trip_type=Group+Travel&group_type=${active.id}`}
                className="btn-primary"
                style={{ textDecoration: 'none', alignSelf: 'flex-start' }}
              >
                Plan a {active.title.split(' ')[0]} Trip →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits grid ── */}
      <section style={{ background: 'var(--navy)', padding: 'clamp(56px, 7vw, 96px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Why Book Group Travel With Us</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, color: 'white' }}>
              What Your Group Gets
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 2 }}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={{
                padding: 'clamp(28px, 4vw, 40px)',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                borderLeft: '3px solid',
                borderColor: i % 2 === 0 ? 'var(--gold)' : 'rgba(201,168,76,0.3)',
                transition: 'background 0.2s',
              }}>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--gold)', fontFamily: 'var(--font-body)', marginBottom: 12 }}>{b.num}</div>
                <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 400, color: 'white', marginBottom: 12 }}>{b.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.85 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ background: 'white', padding: 'clamp(56px, 7vw, 96px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="overline" style={{ marginBottom: 12 }}>How It Works</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)' }}>
              From Idea to Embarkation
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 0 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{
                padding: 'clamp(28px, 4vw, 40px)',
                borderRight: i < STEPS.length - 1 ? '1px solid rgba(13,27,42,0.08)' : 'none',
                position: 'relative',
              }}>
                {/* Number */}
                <div className="font-display" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 200, color: 'rgba(13,27,42,0.06)', lineHeight: 1, marginBottom: 16 }}>
                  {s.n}
                </div>
                {/* Gold dot */}
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)', marginBottom: 16 }} />
                <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--navy)', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--slate)', lineHeight: 1.8 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: '#05080f', padding: 'clamp(56px, 7vw, 96px) clamp(16px, 5vw, 32px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="overline" style={{ marginBottom: 12 }}>Common Questions</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, color: 'white' }}>
              Group Travel FAQ
            </h2>
          </div>
          <div>
            {FAQS.map((faq, i) => <FaqItem key={i} faq={faq} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/faq" style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: 2 }}>
              View Full FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(56px, 7vw, 96px) clamp(16px, 5vw, 32px)', textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Ready to Start Planning?</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--navy)', marginBottom: 16, lineHeight: 1.2 }}>
            Let's Build Your<br />Group's Perfect Trip
          </h2>
          <p style={{ color: 'var(--slate)', fontSize: '0.95rem', lineHeight: 1.85, maxWidth: 520, margin: '0 auto 40px' }}>
            Tell us about your group — size, travel style, and when you want to go. We'll come back with tailored options, pricing, and a plan.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
            <Link href="/plan?trip_type=Group+Travel" className="btn-primary" style={{ textDecoration: 'none' }}>
              Start Planning Your Group Trip
            </Link>
            <Link href="/contact" className="btn-navy" style={{ textDecoration: 'none' }}>
              Talk to a Specialist
            </Link>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--slate)' }}>
            Or call us directly: <a href="tel:8885086893" style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'none' }}>888.508.6893</a>
          </p>
        </div>
      </section>
    </>
  );
}
