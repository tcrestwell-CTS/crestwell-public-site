import type { Metadata } from "next";
import "./joh.css";
import IntakeForm from "./IntakeForm";

export const metadata: Metadata = {
  title: "Journey of Honor — Veteran & Military Family Travel | Crestwell Travel Services",
  description:
    "A dedicated travel program for veterans, active-duty service members and their families — cruises, all-inclusive resorts and guided land trips, planned by an advisor who understands your service.",
  alternates: { canonical: "https://www.crestwellgetaways.com/journey-of-honor" },
  openGraph: {
    title: "Journey of Honor — Veteran & Military Family Travel | Crestwell Travel Services",
    description:
      "A dedicated travel program for veterans, active-duty service members and their families — cruises, all-inclusive resorts and guided land trips, planned by an advisor who understands your service.",
    url: "https://www.crestwellgetaways.com/journey-of-honor",
    type: "website",
    images: [{ url: "/images/veterans-og.jpg", width: 1140, height: 655 }],
  },
  twitter: { card: "summary_large_image", images: ["/images/veterans-og.jpg"] },
};

export default function JourneyOfHonorPage() {
  return (
    <main className="joh-page">
      {/* HERO */}
      <section className="joh-hero">
        <div className="joh-wrap">
          <div className="joh-eyebrow">A Crestwell Travel Services Program</div>
          <h1>Journey of Honor</h1>
          <p className="sub">
            A dedicated travel program built for veterans, active-duty service members and
            the families who supported them — real trips, planned by an advisor who
            understands what your service means.
          </p>
          <div className="ctas">
            <a className="btn-gold" href="#join">Join Journey of Honor — Free</a>
            <a className="btn-ghost" href="#program">See What&apos;s Included</a>
          </div>
          <div className="joh-trust">
            <span>ASTA Member</span>
            <span>CLIA Certified</span>
            <span>No Planning Fees</span>
          </div>
        </div>
      </section>

      {/* PROGRAM BENEFITS */}
      <section className="joh-benefits" id="program">
        <div className="joh-wrap">
          <div className="center">
            <div className="joh-eyebrow">What&apos;s Included</div>
            <h2 className="joh-h2">A program, not just a booking.</h2>
          </div>
          <div className="benefit-grid">
            <div className="benefit">
              <span className="ico">🎖️</span>
              <h3>A Dedicated Advisor</h3>
              <p>A personal travel advisor who works specifically with Journey of Honor members, start to finish — not a call center.</p>
            </div>
            <div className="benefit">
              <span className="ico">💵</span>
              <h3>No Planning Fees</h3>
              <p>Journey of Honor members never pay a planning fee for their trip — ever.</p>
            </div>
            <div className="benefit">
              <span className="ico">⭐</span>
              <h3>Priority Booking</h3>
              <p>Journey of Honor members get priority attention when reaching out — your inquiry moves to the front of the line.</p>
            </div>
            <div className="benefit">
              <span className="ico">🤝</span>
              <h3>Giving Back</h3>
              <p>A portion of every Journey of Honor booking supports causes that serve veterans and military families.</p>
            </div>
            <div className="benefit">
              <span className="ico">🌐</span>
              <h3>Real Supplier Access</h3>
              <p>Direct relationships with major cruise lines, resort brands and tour operators — the same access Crestwell uses for every client.</p>
            </div>
            <div className="benefit">
              <span className="ico">📞</span>
              <h3>Support That Doesn&apos;t End at Booking</h3>
              <p>Your advisor stays reachable before, during and after your trip if anything comes up.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRAVEL OPTIONS */}
      <section className="joh-services">
        <div className="joh-wrap">
          <div className="center">
            <div className="joh-eyebrow">Where Journey of Honor Can Take You</div>
            <h2 className="joh-h2">Cruises, resorts and guided trips — planned around you.</h2>
          </div>
          <div className="svc-grid">
            <div className="svc">
              <span className="ico">🚢</span>
              <h3>Cruises</h3>
              <p>Major cruise lines including Carnival, Royal Caribbean, Norwegian and MSC — solo, as a couple, or with the whole family.</p>
            </div>
            <div className="svc">
              <span className="ico">🏝️</span>
              <h3>All-Inclusive Resorts</h3>
              <p>Caribbean and Mexico stays where one price covers your room, meals and more — true rest, no surprises.</p>
            </div>
            <div className="svc">
              <span className="ico">🗺️</span>
              <h3>Guided Land Trips</h3>
              <p>Escorted tours and multi-stop itineraries, planned with real logistics — flights, hotels and transfers included.</p>
            </div>
            <div className="svc">
              <span className="ico">👨‍👩‍👧‍👦</span>
              <h3>Family Travel</h3>
              <p>Multi-generation trips built for the whole family — reunions, anniversaries and long-overdue time together.</p>
            </div>
            <div className="svc">
              <span className="ico">✈️</span>
              <h3>Flights &amp; Hotels</h3>
              <p>Major airlines and trusted hotel brands, booked and managed alongside the rest of your trip.</p>
            </div>
            <div className="svc">
              <span className="ico">🚐</span>
              <h3>Transfers &amp; Activities</h3>
              <p>Airport pickups, excursions and on-the-ground activities — the actual, bookable options available at your destination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO QUALIFIES */}
      <section className="joh-who">
        <div className="joh-wrap">
          <div className="center">
            <div className="joh-eyebrow">Who Qualifies</div>
            <h2 className="joh-h2" style={{ color: "var(--warm-white)" }}>Every branch. Every generation of service.</h2>
          </div>
          <div className="who-grid">
            <div className="who">
              <h3>Veterans &amp; Retirees</h3>
              <p>Any veteran or retired service member, from any branch — trips planned around your time and your budget.</p>
            </div>
            <div className="who">
              <h3>Active Duty</h3>
              <p>Service members currently serving — R&amp;R planned around deployment schedules and leave.</p>
            </div>
            <div className="who">
              <h3>Military Families</h3>
              <p>Spouses, children and family members of those who serve or have served — travel for the people who supported you too.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="joh-how">
        <div className="joh-wrap">
          <div className="center">
            <div className="joh-eyebrow">How It Works</div>
            <h2 className="joh-h2">Three steps to start planning.</h2>
          </div>
          <div className="how-grid">
            <div className="how">
              <div className="num">1</div>
              <h3>Tell us about you</h3>
              <p>Branch of service, status, and the trip you have in mind — two minutes, free, no obligation.</p>
            </div>
            <div className="how">
              <div className="num">2</div>
              <h3>Meet your advisor</h3>
              <p>A dedicated Journey of Honor advisor reaches out to build real options around your trip.</p>
            </div>
            <div className="how">
              <div className="num">3</div>
              <h3>Travel with backup</h3>
              <p>One advisor, reachable before, during and after your trip — a real person who answers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="joh-form" id="join">
        <div className="joh-wrap">
          <div className="center">
            <div className="joh-eyebrow" style={{ color: "var(--gold-light)" }}>Join the Program</div>
            <h2 className="joh-h2" style={{ color: "var(--warm-white)" }}>Start your Journey of Honor.</h2>
          </div>
          <IntakeForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="joh-faq">
        <div className="joh-wrap">
          <div className="center">
            <div className="joh-eyebrow">Questions</div>
            <h2 className="joh-h2">A few things people ask.</h2>
          </div>
          <div className="faq">
            <details>
              <summary>Is there a cost to join Journey of Honor?</summary>
              <p>No. There&apos;s no membership fee and no planning fee — the program is free to join, and you only pay for the trip itself.</p>
            </details>
            <details>
              <summary>Do I need documentation to prove my service?</summary>
              <p>Not to join or start planning. Your advisor will let you know if any specific supplier requires ID or documentation for a particular discount or benefit.</p>
            </details>
            <details>
              <summary>Can my family travel with me?</summary>
              <p>Yes — Journey of Honor trips are built for veterans, active-duty members and their families together, not solo travel only.</p>
            </details>
            <details>
              <summary>What if I&apos;m not sure where I want to go yet?</summary>
              <p>That&apos;s completely fine. Fill out the form with as much or as little as you know — your advisor will help you figure out the rest.</p>
            </details>
          </div>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="sticky-cta">
        <a className="btn-gold" href="#join">Join Journey of Honor</a>
      </div>
    </main>
  );
}
