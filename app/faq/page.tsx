'use client';
import { useState } from 'react';
import Link from 'next/link';

// ─── FAQ Data ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'working-with-us',
    label: 'Working With Crestwell',
    icon: '',
    questions: [
      {
        q: 'What does Crestwell Travel Services do?',
        a: 'Crestwell Travel Services is a full-service travel agency based in the Southeast United States, specializing in cruises, all-inclusive resort packages, and group vacations. We handle every detail of your trip — from finding the right itinerary and pricing to booking, documentation, and support while you travel. Think of us as your personal travel expert on call.',
      },
      {
        q: 'Is it more expensive to book through a travel agent?',
        a: 'No — and often it\'s less. Cruise lines and resort brands pay our commission directly, so there is no surcharge to you for using our services. In many cases we have access to group rates, exclusive promotions, and cabin upgrades that are not available when booking directly. You get expert guidance, ongoing support, and better value.',
      },
      {
        q: 'What areas do you serve?',
        a: 'Our primary market is Georgia, Tennessee, and Alabama — but we book travel for clients nationwide. There are no geographic restrictions. Whether you are in Atlanta, Nashville, Birmingham, or anywhere else in the US, we can help you plan and book your vacation.',
      },
      {
        q: 'How do I get started?',
        a: 'The easiest way to start is to request a free quote on our website. Tell us your travel style, destinations you are interested in, travel dates, group size, and budget range. One of our specialists will follow up within one business day with personalized options and recommendations.',
      },
      {
        q: 'Do I need to come into an office?',
        a: 'No. Crestwell operates as a virtual travel agency. Everything is handled by phone, email, and our online booking tools. We serve clients across the Southeast and nationwide without requiring an in-person visit.',
      },
    ],
  },
  {
    id: 'cruises',
    label: 'Cruises',
    icon: '',
    questions: [
      {
        q: 'Which cruise lines do you work with?',
        a: 'We work with 20 of the world\'s leading cruise lines including Royal Caribbean, Norwegian, Carnival, Disney, Celebrity, Princess, Holland America, MSC, Virgin Voyages, Silversea, Seabourn, Cunard, AmaWaterways, Avalon Waterways, UNIWORLD, Tauck, Explora Journeys, Ritz-Carlton Yacht Collection, American Cruise Lines, and Celebrity River Cruises — covering everything from family mega-ships and budget ocean cruises to ultra-luxury yachts and European river voyages.',
      },
      {
        q: 'What is the best cruise line for families?',
        a: 'It depends on the ages of your children and your travel style. Disney Cruise Line is excellent for young children and families who want immersive entertainment. Royal Caribbean offers the largest ships with waterparks, rock climbing walls, and teen-specific programming. Norwegian is strong for flexibility with freestyle dining and a wide range of entertainment. Carnival is the most budget-friendly option with solid family amenities. We will ask the right questions to match you with the best fit.',
      },
      {
        q: 'What is the difference between ocean and river cruises?',
        a: 'Ocean cruises sail on open water — Caribbean, Mediterranean, Alaska, Bahamas — typically on large ships carrying 2,000–6,000 passengers, with multiple dining venues, entertainment, and port stops. River cruises travel on inland waterways through Europe, Asia, or the Mississippi on smaller intimate ships (typically 100–200 passengers), docking in town centers with immersive cultural experiences. River cruises tend to be all-inclusive with guided excursions included. We specialize in both.',
      },
      {
        q: 'Can you help with group cruises?',
        a: 'Absolutely — group cruises are one of our specialties. We organize group sailings for church groups, family reunions, friend groups, social organizations, and corporate retreats. Groups of 8 or more cabins typically unlock special group rates, onboard credits, private cocktail parties, and a dedicated group coordinator. We manage everything from the initial block of cabins to final rooming lists and embarkation day logistics.',
      },
      {
        q: 'What is included in a cruise fare?',
        a: 'Standard cruise fares include your cabin accommodations, most meals (main dining room, buffet, some specialty restaurants), onboard entertainment (shows, pools, fitness center), and port taxes and fees. Not typically included: specialty dining, alcoholic beverages, shore excursions, gratuities, spa services, internet, and airfare. Many cruise lines offer beverage packages, dining packages, and shore excursion bundles that can be added for a fixed price — we help you decide what makes sense for your sailing.',
      },
      {
        q: 'Can I pay for my cruise in monthly installments?',
        a: 'Yes. Crestwell offers a payment plan option that spreads your cruise cost into equal monthly payments, with the balance completed 90 days before your sailing date. We also offer Affirm financing for qualifying customers, which allows you to book now and pay over 4 installments or up to 12 months with 0% APR on select options. Ask us about our flexible payment programs when you request a quote.',
      },
      {
        q: 'What documents do I need for a cruise?',
        a: 'For most Caribbean, Bahamas, and Mexican cruises from US ports, a valid US passport is the safest option — though a government-issued ID plus original birth certificate technically suffices for closed-loop sailings (those that start and end at the same US port). For international sailings, a valid passport is required. Some destinations also require visas. We review documentation requirements for every itinerary and alert you well in advance.',
      },
    ],
  },
  {
    id: 'all-inclusive',
    label: 'All-Inclusive Resorts',
    icon: '',
    questions: [
      {
        q: 'What resort brands do you specialize in?',
        a: 'We specialize in Sandals (couples only, Caribbean luxury), Beaches (family all-inclusive, Turks & Caicos and Jamaica), Secrets Resorts & Spas (adults only, Mexico and the Caribbean), Dreams Resorts (family friendly), Hyatt Ziva and Zilara, Excellence Collection, AMResorts properties, Club Med, and Barceló. We are familiar with the product-level differences between room categories, resort layouts, and dining options at each property.',
      },
      {
        q: 'What does "all-inclusive" actually mean?',
        a: 'Truly all-inclusive means your room, all meals, snacks, premium alcoholic and non-alcoholic beverages, entertainment, and most non-motorized water sports are included in the nightly rate. However, not all resorts define this the same way. Some charge extra for à la carte restaurants, certain alcohol brands, spa access, motorized water sports, or airport transfers. We know the difference between each resort\'s inclusions and will tell you exactly what to expect before you book.',
      },
      {
        q: 'Sandals vs. Secrets — which is better?',
        a: 'Both are premium adults-only all-inclusive brands with excellent food and drinks. The key differences: Sandals is couples-focused with a romantic atmosphere, over-the-water bungalows, and locations across the Caribbean including St. Lucia, Jamaica, Barbados, Grenada, and the Bahamas. Secrets skews slightly more lively and social, with strong properties in Mexico (Los Cabos, Riviera Maya, Cancún) and the Caribbean. Sandals tends to have more included water sports and dive programs. Secrets often has a better "Preferred Club" room tier with upgraded amenities. We help you match the right brand and property to your travel style.',
      },
      {
        q: 'Are all-inclusive resorts good for families?',
        a: 'Many are, but not all. Sandals is strictly couples only (18+). Secrets is adults only. Beaches, Dreams, Hyatt Ziva, and Club Med are excellent for families with dedicated kids clubs, teen programs, water parks, and family dining. We will always recommend family-appropriate properties and help you understand the age policies and children\'s programming at each resort you are considering.',
      },
      {
        q: 'Can you book resort + airfare together?',
        a: 'Yes. We can book your resort stay, roundtrip airfare, and airport transfers as a single package. Packaging often results in savings versus booking each component separately. We also work with travel protection providers to bundle trip insurance into your package.',
      },
    ],
  },
  {
    id: 'group-travel',
    label: 'Group Travel',
    icon: '',
    questions: [
      {
        q: 'How many people do you need for a group booking?',
        a: 'For cruise groups, most lines start group amenities at 8 cabins (typically 16 passengers). For resort groups, most properties offer group rates at 10 rooms or more. Smaller groups can still travel together with us coordinating everyone\'s reservations under a single itinerary — we just may not unlock the formal group contract pricing until you hit those thresholds.',
      },
      {
        q: 'What are the benefits of booking as a group?',
        a: 'Group bookings typically come with reduced per-person pricing, onboard credits or resort credits, complimentary amenities (one free berth per X paid, private cocktail parties, group shore excursion discounts), a dedicated group coordinator, and the ability to reserve connected cabin locations or adjacent rooms. We handle all the administrative work — collecting deposits, tracking payments, managing rooming lists, and communicating with the cruise line or resort on behalf of the group.',
      },
      {
        q: 'Can you organize a church group cruise?',
        a: 'Yes — church and faith-based group travel is one of our core specialties. We have organized sailings for congregations across Georgia, Tennessee, and Alabama. We can arrange private fellowship spaces onboard, coordinate group dining times, set up a group communication system, and manage deposits and payments for individual members. Our BSC Cobb County Cruise and Angels First Cruise programs are examples of the group experiences we host.',
      },
      {
        q: 'How far in advance should we book a group trip?',
        a: 'For large groups (20+ people), we recommend booking 12–18 months in advance, especially for popular sailings, holiday weeks, or specific cabin types. For smaller groups of 10–20, 6–12 months is typically sufficient. Booking early gives you the best cabin selection, more flexibility on deposits, and time to market the trip to your members.',
      },
    ],
  },
  {
    id: 'booking-payments',
    label: 'Booking & Payments',
    icon: '',
    questions: [
      {
        q: 'How do deposits and final payments work?',
        a: 'Most cruise and resort bookings require a deposit at the time of booking to hold your reservation — typically $100–$500 per person depending on the cruise line or resort. Final payment is due 60–120 days before departure depending on the supplier. We will give you the exact payment schedule when we book your trip and send reminders as payment dates approach.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover), debit cards, and ACH bank transfers. We also offer Affirm financing for qualified purchases, allowing you to split payments into 4 interest-free installments or spread them over 12 months. Our payment plan option lets you pay monthly directly through Crestwell with automatic drafts.',
      },
      {
        q: 'What is your cancellation and refund policy?',
        a: 'Cancellation policies are set by the cruise line or resort — not by Crestwell. Most suppliers operate on a sliding scale: cancellations further out may result in full deposit forfeiture, while cancellations within 30–60 days of departure can result in penalties of 50–100% of the total fare. This is why we strongly recommend travel insurance on every booking. We will walk you through the specific cancellation terms before you commit.',
      },
      {
        q: 'Do you recommend travel insurance?',
        a: 'Strongly, yes. Travel insurance covers trip cancellation for covered reasons (illness, injury, job loss, death in family), trip interruption, emergency medical evacuation, medical expenses abroad, and lost or delayed luggage. A medical evacuation from a Caribbean cruise ship alone can cost $50,000 or more without coverage. We work with several travel insurance providers and can recommend a policy that fits your trip type and budget.',
      },
      {
        q: 'Can I book for someone else as a gift?',
        a: 'Yes. We handle gift bookings regularly for anniversaries, honeymoons, birthdays, and retirement celebrations. We can issue a gift certificate or create a formal booking in the recipient\'s name. We also offer a "deposit and pay later" option so you can give the experience as a gift while the recipient chooses their preferred dates.',
      },
    ],
  },
  {
    id: 'destinations',
    label: 'Destinations & Planning',
    icon: '',
    questions: [
      {
        q: 'What are the most popular cruise destinations you book?',
        a: 'The Caribbean (Eastern, Western, and Southern) is our most booked destination — ideal year-round with ports in Jamaica, Cozumel, Nassau, St. Thomas, Barbados, and more. Alaska is spectacular from May through September. The Mediterranean (Italy, Greece, Croatia, Spain) is peak June through August. The Bahamas and Bermuda are popular for short 3–5 night getaways. We also book European river cruises, Panama Canal transits, Hawaii, and world voyages.',
      },
      {
        q: 'When is the best time to cruise the Caribbean?',
        a: 'December through April is the classic Caribbean cruise season — outside hurricane season, dry and comfortable temperatures, and peak demand (book early for this window). May through early July is excellent with lower prices and fewer crowds. July through November is hurricane season — not avoided by everyone, but prices are lower and many itineraries are repositioned to avoid weather. We track seasonal conditions and help you weigh price against weather risk.',
      },
      {
        q: 'Do I need a passport for the Caribbean?',
        a: 'For closed-loop cruises that depart and return to the same US port — the most common Caribbean itinerary — technically a government-issued photo ID plus an original birth certificate is legally sufficient for US citizens. However, a valid passport is always the safer choice. If your ship must make an unscheduled stop, or if you have a flight emergency and need to fly home from a foreign port, a passport becomes essential. We always recommend traveling with one.',
      },
      {
        q: 'What is the best time to visit all-inclusive resorts in Mexico?',
        a: 'December through April offers the best weather — low humidity, minimal rain, comfortable temperatures in the high 70s to low 80s. This is also peak pricing. May and June are a good value window before the summer rush. July through August is busy with US families on summer break. September and October are rainy season and the lowest prices but come with weather uncertainty. Cancún and Los Cabos have slightly different microclimates — we can advise based on the specific property.',
      },
      {
        q: 'Can you help with honeymoon planning?',
        a: 'Absolutely. Honeymoon travel is one of our most rewarding bookings. We work with cruise lines and resorts that offer complimentary honeymoon amenities — room upgrades, champagne, breakfast in bed, spa credits, and romantic turndown service — when your booking is registered as a honeymoon. We handle the romantic extras so you can focus on each other. Tell us your dream and we will build the itinerary around it.',
      },
    ],
  },
  {
    id: 'during-travel',
    label: 'During Your Trip',
    icon: '',
    questions: [
      {
        q: 'What support do you provide while we are traveling?',
        a: 'We are reachable by phone and email throughout your trip. If you encounter a problem — a missed connection, a cabin issue, a shore excursion cancellation, a medical situation — we are your first call. We have relationships with cruise line and resort representatives that allow us to escalate issues faster than you could on your own. We also provide pre-departure documentation packages so you have everything organized before you leave.',
      },
      {
        q: 'What should I pack for a cruise?',
        a: 'Essentials: passport or travel documents, cruise boarding pass (print and digital), credit card for onboard account, casual and resort-wear clothing, one formal or smart-casual outfit for specialty dining or formal nights (varies by cruise line), comfortable walking shoes for port days, sunscreen, motion sickness remedies if prone, and any prescription medications with a doctor\'s note. We send our clients a detailed packing guide tailored to their specific itinerary and cruise line.',
      },
      {
        q: 'How do gratuities work on a cruise?',
        a: 'Most major cruise lines automatically add daily gratuities to your onboard account — typically $16–$25 per person per day depending on the line and cabin category. This covers your cabin steward, dining room servers, and other service staff. You can pre-pay gratuities at the time of booking (we recommend this to lock in the current rate). Specialty dining, spa services, and bar tabs typically add an automatic 18–20% gratuity separately.',
      },
      {
        q: 'Should I book shore excursions through the cruise line or independently?',
        a: 'Both have merits. Cruise line excursions are convenient, guaranteed to return before the ship sails, and covered if the tour is delayed. Independent excursions through local operators or reputable third parties are often cheaper and more personalized — but the ship will not wait if you are late. In busy ports with tight schedules, we lean toward ship-sponsored or vetted third-party operators. In easy-to-navigate ports, independent is often the better value. We advise on a port-by-port basis.',
      },
    ],
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type FAQ = { q: string; a: string };
type Category = { id: string; label: string; icon?: string; questions: FAQ[] };

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(13,27,42,0.08)',
        transition: 'background 0.2s',
        background: open ? 'rgba(201,168,76,0.04)' : 'transparent',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '24px 28px', cursor: 'pointer',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20,
        }}
        aria-expanded={open}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flex: 1, minWidth: 0 }}>
          {/* Elegant vertical rule marker */}
          <span style={{
            width: 2, minHeight: 18, flexShrink: 0, marginTop: 4,
            background: open ? 'var(--gold)' : 'rgba(13,27,42,0.15)',
            transition: 'background 0.2s',
            display: 'inline-block',
            borderRadius: 1,
          }} />
          <span style={{
            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
            fontWeight: 500, color: open ? 'var(--navy)' : 'var(--navy)',
            lineHeight: 1.45, fontFamily: 'var(--font-body)',
          }}>
            {faq.q}
          </span>
        </div>
        {/* Chevron */}
        <span style={{
          flexShrink: 0, width: 28, height: 28,
          border: `1px solid ${open ? 'var(--gold)' : 'rgba(13,27,42,0.15)'}`,
          background: open ? 'var(--gold)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.25s', marginTop: 2,
          color: open ? 'var(--navy)' : 'var(--slate)',
          fontSize: '0.7rem',
          transform: open ? 'rotate(180deg)' : 'none',
        }}>
          ▼
        </span>
      </button>

      {/* Answer — CSS height trick for smooth animation */}
      <div style={{
        maxHeight: open ? '600px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.35s ease',
      }}>
        <p style={{
          padding: '0 28px 24px 68px',
          fontSize: '0.92rem', color: 'var(--text-secondary)',
          lineHeight: 1.85, margin: 0,
        }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}

// ─── Category Section ─────────────────────────────────────────────────────────

function CategorySection({ cat }: { cat: Category }) {
  return (
    <section id={cat.id} style={{ marginBottom: 64 }}>
      {/* Category header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        marginBottom: 8, paddingBottom: 16,
        borderBottom: '2px solid var(--navy)',
      }}>
        <h2 className="font-display" style={{
          fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
          fontWeight: 300, color: 'var(--navy)', margin: 0,
        }}>
          {cat.label}
        </h2>
        <span style={{
          marginLeft: 'auto', fontSize: '0.65rem',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--slate)', fontFamily: 'var(--font-body)',
        }}>
          {cat.questions.length} question{cat.questions.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Questions */}
      <div style={{ border: '1px solid rgba(13,27,42,0.1)', background: 'white' }}>
        {cat.questions.map((faq, i) => (
          <FAQItem key={i} faq={faq} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const totalQuestions = CATEGORIES.reduce((s, c) => s + c.questions.length, 0);

  // Filter by search
  const filtered = searchQuery.trim()
    ? CATEGORIES.map(cat => ({
        ...cat,
        questions: cat.questions.filter(
          faq =>
            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter(cat => cat.questions.length > 0)
    : activeCategory
      ? CATEGORIES.filter(c => c.id === activeCategory)
      : CATEGORIES;

  const scrollTo = (id: string) => {
    setActiveCategory(id);
    setSearchQuery('');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        background: 'var(--navy)',
        paddingTop: 140, paddingBottom: 80,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.1,
        }} />
        <div style={{
          height: 2,
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          position: 'absolute', top: 72, left: 0, right: 0,
        }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Help Center</div>
          <h1 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 20, maxWidth: 700,
          }}>
            Frequently Asked<br />
            <em style={{ color: 'var(--gold-light)' }}>Questions</em>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', maxWidth: 520, lineHeight: 1.75, marginBottom: 40 }}>
            {totalQuestions} answers covering cruises, all-inclusive resorts, group travel, payments, and everything in between. Can't find what you need? We're one message away.
          </p>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 560 }}>
            <span style={{
              position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
              fontSize: '1rem', opacity: 0.5, pointerEvents: 'none',
            }}>🔍</span>
            <input
              type="text"
              placeholder="Search questions — e.g. passport, group rates, cancellation..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setActiveCategory(null); }}
              style={{
                width: '100%', padding: '16px 18px 16px 48px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white', fontSize: '0.9rem',
                fontFamily: 'var(--font-body)',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', fontSize: '1.1rem', padding: '4px 8px',
                }}
              >×</button>
            )}
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section style={{ background: 'var(--cream)', padding: '64px 32px 96px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 48, alignItems: 'flex-start' }}>

          {/* ── Sidebar nav ── */}
          <aside style={{
            width: 240, flexShrink: 0,
            position: 'sticky', top: 96,
            display: 'none', // hidden on mobile via inline — shown desktop
          }}
            className="faq-sidebar"
          >
            <div style={{
              fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--slate)', marginBottom: 16, fontFamily: 'var(--font-body)',
            }}>
              Topics
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <button
                onClick={() => { setActiveCategory(null); setSearchQuery(''); }}
                style={{
                  textAlign: 'left', background: 'none',
                  border: 'none', padding: '10px 14px', cursor: 'pointer',
                  fontSize: '0.82rem', fontFamily: 'var(--font-body)',
                  color: !activeCategory && !searchQuery ? 'var(--navy)' : 'var(--slate)',
                  fontWeight: !activeCategory && !searchQuery ? 600 : 400,
                  borderLeft: !activeCategory && !searchQuery ? '3px solid var(--gold)' : '3px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                All Topics
                <span style={{ marginLeft: 6, fontSize: '0.7rem', color: 'var(--slate)' }}>({totalQuestions})</span>
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => scrollTo(cat.id)}
                  style={{
                    textAlign: 'left', background: 'none',
                    border: 'none', padding: '10px 14px', cursor: 'pointer',
                    fontSize: '0.82rem', fontFamily: 'var(--font-body)',
                    color: activeCategory === cat.id ? 'var(--navy)' : 'var(--slate)',
                    fontWeight: activeCategory === cat.id ? 600 : 400,
                    borderLeft: activeCategory === cat.id ? '3px solid var(--gold)' : '3px solid transparent',
                    transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <span style={{ flex: 1 }}>{cat.label}</span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(13,27,42,0.3)' }}>({cat.questions.length})</span>
                </button>
              ))}
            </nav>

            {/* Still have questions */}
            <div style={{
              marginTop: 40, background: 'var(--navy)',
              padding: '24px', borderTop: '3px solid var(--gold)',
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'white', marginBottom: 8, fontFamily: 'var(--font-display)' }}>
                Still have questions?
              </div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 16 }}>
                Our travel specialists are ready to help you plan your perfect trip.
              </p>
              <Link
                href="/request-quote"
                style={{
                  display: 'block', textAlign: 'center',
                  padding: '10px 16px', background: 'var(--gold)',
                  color: 'var(--navy)', textDecoration: 'none',
                  fontSize: '0.68rem', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Get a Free Quote
              </Link>
              <Link
                href="/contact"
                style={{
                  display: 'block', textAlign: 'center',
                  padding: '9px 16px', marginTop: 8,
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                  fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)',
                }}
              >
                Contact Us
              </Link>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Mobile category pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }} className="faq-pills">
              <button
                onClick={() => { setActiveCategory(null); setSearchQuery(''); }}
                style={{
                  padding: '7px 16px', fontSize: '0.72rem', cursor: 'pointer',
                  fontFamily: 'var(--font-body)', letterSpacing: '0.06em',
                  border: '1px solid',
                  borderColor: !activeCategory && !searchQuery ? 'var(--navy)' : 'rgba(13,27,42,0.2)',
                  background: !activeCategory && !searchQuery ? 'var(--navy)' : 'white',
                  color: !activeCategory && !searchQuery ? 'white' : 'var(--slate)',
                  transition: 'all 0.2s',
                }}
              >
                All
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => scrollTo(cat.id)}
                  style={{
                    padding: '7px 16px', fontSize: '0.72rem', cursor: 'pointer',
                    fontFamily: 'var(--font-body)', letterSpacing: '0.06em',
                    border: '1px solid',
                    borderColor: activeCategory === cat.id ? 'var(--gold)' : 'rgba(13,27,42,0.2)',
                    background: activeCategory === cat.id ? 'rgba(201,168,76,0.12)' : 'white',
                    color: activeCategory === cat.id ? 'var(--navy)' : 'var(--slate)',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search results count */}
            {searchQuery && (
              <div style={{
                marginBottom: 32, padding: '12px 20px',
                background: 'rgba(13,27,42,0.05)',
                fontSize: '0.82rem', color: 'var(--slate)',
                fontFamily: 'var(--font-body)',
              }}>
                {filtered.reduce((s, c) => s + c.questions.length, 0)} result
                {filtered.reduce((s, c) => s + c.questions.length, 0) !== 1 ? 's' : ''} for
                <strong style={{ color: 'var(--navy)', marginLeft: 4 }}>"{searchQuery}"</strong>
              </div>
            )}

            {/* No results */}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '64px 32px' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.4 }}>🔍</div>
                <h3 className="font-display" style={{ color: 'var(--navy)', fontWeight: 300, marginBottom: 12 }}>No results found</h3>
                <p style={{ color: 'var(--slate)', fontSize: '0.9rem', marginBottom: 24 }}>
                  Try a different search term, or ask us directly.
                </p>
                <Link href="/contact" className="btn-navy" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  Ask a Question
                </Link>
              </div>
            )}

            {/* FAQ categories */}
            {filtered.map(cat => (
              <CategorySection key={cat.id} cat={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section style={{
        background: 'var(--navy)', padding: '72px 32px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://assets.widgety.co.uk/2023/06/09/07/59/00/5e25b590-ceb4-47eb-b753-9e4f216f9a4b/RCI Wonder of the Seas Exterior.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.07,
        }} />
        <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
          <div className="overline" style={{ marginBottom: 16 }}>Ready to Book?</div>
          <h2 className="font-display" style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 300, color: 'white', marginBottom: 16, lineHeight: 1.2,
          }}>
            Let's Plan Your<br />
            <em style={{ color: 'var(--gold-light)' }}>Perfect Getaway</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: 36 }}>
            From a weekend cruise to a multi-week European river journey — our specialists build trips around you. No fees, no pressure, just expert guidance.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/request-quote" className="btn-primary" style={{ textDecoration: 'none' }}>Request a Free Quote</Link>
            <Link href="/cruises" className="btn-navy" style={{ textDecoration: 'none', borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.75)' }}>Browse Cruises</Link>
          </div>

          {/* Facebook Community */}
          <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: '0.78rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 16, fontFamily: 'var(--font-body)' }}>
              Join Our Community
            </p>
            <a
              href="https://www.facebook.com/groups/766541509669553/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '14px 28px',
                background: '#1877F2',
                color: 'white',
                textDecoration: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                transition: 'all 0.25s',
                boxShadow: '0 4px 20px rgba(24,119,242,0.35)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#166FE5';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(24,119,242,0.5)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#1877F2';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(24,119,242,0.35)';
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              {/* Facebook icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Join Our Facebook Travel Community
            </a>
            <p style={{ marginTop: 12, fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>
              Tips, deals, trip inspiration &amp; fellow travelers from across the Southeast
            </p>
          </div>
        </div>
      </section>

      {/* Sidebar desktop show */}
      <style>{`
        @media (min-width: 900px) {
          .faq-sidebar { display: block !important; }
        }
        @media (max-width: 899px) {
          .faq-sidebar { display: none !important; }
        }
      `}</style>
    </>
  );
}
