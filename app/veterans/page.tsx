import type { Metadata } from "next";
import "./veterans.css";
import LeadForm from "./LeadForm";
import ShareRow from "./ShareRow";

export const metadata: Metadata = {
  title: "Veterans, Family & Group Travel | Crestwell Travel Services",
  description:
    "Group cruises, all-inclusive resorts, reunions and milestone trips — planned start to finish for veterans, military families and the people they love. Payment plans available.",
  alternates: { canonical: "https://www.crestwellgetaways.com/veterans" },
  openGraph: {
    title: "Veterans, Family & Group Travel | Crestwell Travel Services",
    description:
      "Group cruises, all-inclusive resorts, reunions and milestone trips — planned start to finish for veterans, military families and the people they love. Payment plans available.",
    url: "https://www.crestwellgetaways.com/veterans",
    type: "website",
    images: [{ url: "/images/veterans-og.jpg", width: 1140, height: 655 }],
  },
  twitter: { card: "summary_large_image", images: ["/images/veterans-og.jpg"] },
};

export default function VeteransPage() {
  return (
    <main className="vets-page">
      {/* HERO */}
      <section className="vets-hero">
        <div className="vets-wrap">
          <div className="vets-eyebrow">Veterans · Military Families · Group Travel</div>
          <h1>You served. Let us handle the travel.</h1>
          <p className="sub">
            Group cruises, all-inclusive getaways, reunions and milestone trips for veterans,
            active-duty members and the families who stood beside them — planned start to finish
            by your personal travel advisor, not an algorithm.
          </p>
          <div className="ctas">
            <a className="btn-gold" href="#plan">Start Planning — Free</a>
            <a className="btn-ghost" href="#flagship">See Our First Group Departure</a>
          </div>
          <div className="vets-trust">
            <span>ASTA Member</span>
            <span>CLIA Certified</span>
            <span>No Planning Fees</span>
            <span>Payment Plans Available</span>
          </div>
        </div>
      </section>

      {/* FLAGSHIP */}
      <section className="vets-flag" id="flagship">
        <div className="vets-wrap">
          <div className="flag-card">
            <div>
              <span className="flag-badge">Founding Departure · List Open Now</span>
              <div className="vets-eyebrow" style={{ marginTop: 10 }}>
                Our First Hosted Veterans Group Cruise
              </div>
              <h2 className="vets-h2">Veterans Day at Sea&nbsp;· November&nbsp;2027</h2>
              <p style={{ color: "var(--text-secondary)" }}>
                A 5–7 night Caribbean sailing over Veterans Day week 2027, honoring those who
                served — with the people they love along for the trip. Ship, itinerary and pricing
                are being finalized now; founding members hear it all first.
              </p>
              <ul className="flag-list">
                <li>Group rates with onboard amenities for our block</li>
                <li>Roommate matching for solo travelers</li>
                <li>Family &amp; friends welcome — all ages</li>
                <li>Deposit-friendly payment plans</li>
              </ul>
              <a className="btn-gold" href="#plan">Get First Access →</a>
            </div>
            <div className="flag-side">
              <p className="big">
                “The best salute we can offer is a week where someone else takes the watch.”
              </p>
              <p>
                Founding members get first pick of cabins, first look at the itinerary, and no
                obligation — joining the list just means you hear it first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="vets-services">
        <div className="vets-wrap">
          <div className="center">
            <div className="vets-eyebrow">Everything We Handle</div>
            <h2 className="vets-h2">One advisor. Every mile of the trip.</h2>
          </div>
          <div className="svc-grid">
            <div className="svc"><span className="ico">🚢</span><h3>Group Cruises</h3><p>Carnival, Royal Caribbean, Norwegian, Virgin Voyages and MSC — we hold the group block, you enjoy the sail.</p></div>
            <div className="svc"><span className="ico">🏝️</span><h3>All-Inclusive Resorts</h3><p>Caribbean and Mexico stays where one price covers your room, meals and more.</p></div>
            <div className="svc"><span className="ico">✈️</span><h3>Flights &amp; Hotels</h3><p>Major airlines and trusted hotel brands, booked and managed alongside the rest of your trip.</p></div>
            <div className="svc"><span className="ico">🚐</span><h3>Transfers &amp; Ground Transport</h3><p>Airport pickups, port shuttles and group transportation — every leg covered, nobody left at the curb.</p></div>
            <div className="svc"><span className="ico">🚗</span><h3>Car Rentals</h3><p>National rental brands added right into your itinerary, ready when you land.</p></div>
            <div className="svc"><span className="ico">🎉</span><h3>Full Group Planning</h3><p>Reunions, retirement celebrations, homecomings and milestone birthdays — handled end to end.</p></div>
          </div>
        </div>
      </section>

      {/* WHO WE PLAN FOR */}
      <section className="vets-who">
        <div className="vets-wrap">
          <div className="center">
            <div className="vets-eyebrow">Who We Plan For</div>
            <h2 className="vets-h2" style={{ color: "var(--warm-white)" }}>Every branch. Every generation.</h2>
          </div>
          <div className="who-grid">
            <div className="who"><h3>Veterans &amp; Active Duty</h3><p>Getaways that honor your time, your pace and your budget — including R&amp;R that actually feels like rest.</p></div>
            <div className="who"><h3>Military Families</h3><p>Spouse getaways, homecoming celebrations and multi-generation vacations the whole family will remember.</p></div>
            <div className="who"><h3>Unit &amp; Squadron Reunions</h3><p>We bring everyone back together — cabins, group dinners, excursions and the details in between.</p></div>
            <div className="who"><h3>Posts &amp; Organizations</h3><p>VFW and American Legion posts, veteran service groups and clubs — group trips your members will talk about all year.</p></div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="vets-how">
        <div className="vets-wrap">
          <div className="center">
            <div className="vets-eyebrow">How It Works</div>
            <h2 className="vets-h2">Three steps. Zero planning stress.</h2>
          </div>
          <div className="how-grid">
            <div className="how"><div className="num">1</div><h3>Tell us about your trip</h3><p>Two minutes, free, no obligation — the form below comes straight to us.</p></div>
            <div className="how"><div className="num">2</div><h3>We build your options</h3><p>Group rates, military-friendly pricing where available, and every detail from flights to transfers.</p></div>
            <div className="how"><div className="num">3</div><h3>Travel with backup</h3><p>One advisor before, during and after your trip — a real person who answers.</p></div>
          </div>
          <p className="how-note">
            Flexible payment plans available through our secure payment portal — spread your trip over time.
          </p>
        </div>
      </section>

      {/* PROOF */}
      <section className="vets-proof">
        <div className="vets-wrap">
          <div className="vets-eyebrow">Groups We&apos;ve Sailed</div>
          <h2 className="vets-h2">This isn&apos;t our first voyage.</h2>
          <div className="proof-row">
            <span className="chip">Alaska group cruises</span>
            <span className="chip">Caribbean birthday celebrations at sea</span>
            <span className="chip">Bahamas family cruises</span>
            <span className="chip">Multi-generation reunions</span>
          </div>
          <div className="badges">
            <span>One agent, start to finish</span>
            <span>Roommate matching for solo travelers</span>
            <span>Payment plans available</span>
          </div>
        </div>
      </section>

      {/* LEAD FORM */}
      <section className="vets-form" id="plan">
        <div className="vets-wrap">
          <div className="center">
            <div className="vets-eyebrow">Start Your Trip</div>
            <h2 className="vets-h2" style={{ color: "var(--warm-white)" }}>
              No cost. No obligation. One conversation.
            </h2>
            <p style={{ color: "var(--slate-light)", maxWidth: "52ch", margin: "0 auto" }}>
              Tell us a little about the trip you have in mind — we&apos;ll reach out within one business day.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="vets-faq">
        <div className="vets-wrap">
          <div className="center">
            <div className="vets-eyebrow">Good Questions</div>
            <h2 className="vets-h2">Before you ask…</h2>
          </div>
          <div className="faq">
            <details><summary>Do you charge a planning fee?</summary><p>No — planning consultations are free. We&apos;re compensated by our travel partners, so you get an advisor without paying extra for one.</p></details>
            <details><summary>Can non-military family and friends join a veterans group trip?</summary><p>Absolutely. Our veterans departures are built around those who served, and everyone they love is welcome in the group.</p></details>
            <details><summary>Do you offer payment plans?</summary><p>Yes. Most trips start with a modest deposit followed by installment plans through our secure payment portal, including financing options you can pre-qualify for in about 60 seconds.</p></details>
            <details><summary>How do group rates work?</summary><p>We hold a block of cabins or rooms with the cruise line or resort. That locks in group pricing and earns amenities — onboard credit, private events, perks — that we pass along to the group.</p></details>
          </div>
        </div>
      </section>

      {/* SHARE */}
      <section className="vets-share">
        <div className="vets-wrap">
          <h2 className="vets-h2">Know a veteran who deserves a getaway?</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Share this page — it might be the nudge they&apos;ve been waiting for.
          </p>
          <ShareRow />
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="sticky-cta">
        <a className="btn-gold" href="#plan" style={{ width: "100%" }}>Start Planning — Free</a>
      </div>
    </main>
  );
}
