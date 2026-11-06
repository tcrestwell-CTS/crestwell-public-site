import type { Metadata } from "next";
import "../journey-of-honor/joh.css";
import "./se.css";
import RequestForm from "./RequestForm";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/site";

const SIGNATURE_FAQS = [
  {
    question: "Is Signature Experiences the same as requesting a quote?",
    answer: "No. Signature Experiences is an invitation-based concierge membership. Membership is currently complimentary for qualified clients, and trips are booked and priced separately. To price a specific trip, use the quote request form.",
  },
  {
    question: "What does membership include?",
    answer: "A dedicated advisor, curated luxury cruise and resort options, private group travel planning, and celebration travel coordination. Priority sports and premium requests are worked with suppliers; availability varies and cannot be guaranteed. Special experiences and supplier offers are shared when they are actually available.",
  },
  {
    question: "How do I ask to join?",
    answer: "Request an invitation on this page. Each request is reviewed personally, and Crestwell follows up either way.",
  },
];

const TITLE = "Signature Experiences | Crestwell Travel Services";
const DESC =
  "An invitation-based concierge service from Crestwell Travel Services: a dedicated advisor, curated luxury cruise and resort opportunities, private group planning and celebration travel.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/signature-experiences` },
  openGraph: { title: TITLE, description: DESC, url: `${SITE_URL}/signature-experiences`, type: "website" },
};

export default function SignatureExperiencesPage() {
  return (
    <main className="joh-page">
      <JsonLd data={faqPageJsonLd(SIGNATURE_FAQS)} />
      {/* HERO */}
      <section className="joh-hero se-hero">
        <div className="joh-wrap">
          <div className="joh-eyebrow">By Invitation · Crestwell Travel Services</div>
          <h1>Crestwell Signature Experiences</h1>
          <p className="sub">
            A private concierge service for clients who want more than a booking — one
            dedicated advisor, thoughtfully curated options, and your most important trips
            handled with care from first idea to safe return.
          </p>
          <div className="ctas">
            <a className="btn-gold" href="#request">Request an Invitation</a>
            <a className="btn-ghost" href="#benefits">See What&apos;s Included</a>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="joh-benefits" id="benefits">
        <div className="joh-wrap">
          <div className="center">
            <div className="joh-eyebrow">Membership Benefits</div>
            <h2 className="joh-h2">Expert guidance, personally delivered.</h2>
          </div>
          <div className="benefit-grid">
            <div className="benefit">
              <span className="ico">🧭</span>
              <h3>A Dedicated Advisor</h3>
              <p>One advisor who knows your preferences, your travel party and your standards — and plans every trip around them.</p>
            </div>
            <div className="benefit">
              <span className="ico">🏟️</span>
              <h3>Priority Sports &amp; Premium Requests</h3>
              <p>Priority attention when you want help with premium sports and event travel. We work with our suppliers on your behalf; availability varies and can&apos;t be guaranteed.</p>
            </div>
            <div className="benefit">
              <span className="ico">🛳️</span>
              <h3>Curated Luxury Cruise &amp; Resort Opportunities</h3>
              <p>Hand-selected luxury cruise and resort options matched to how you like to travel, shared with you directly rather than a search results page.</p>
            </div>
            <div className="benefit">
              <span className="ico">👥</span>
              <h3>Private Group Travel Planning</h3>
              <p>Family reunions, milestone gatherings and friends&apos; trips, planned end to end, with a single point of contact for the whole group.</p>
            </div>
            <div className="benefit">
              <span className="ico">🥂</span>
              <h3>Celebration Travel Coordination</h3>
              <p>Anniversaries, birthdays and milestones, with the details that make a trip feel like an occasion.</p>
            </div>
            <div className="benefit">
              <span className="ico">✨</span>
              <h3>Special Experiences, When Available</h3>
              <p>Access to special experiences and supplier offers when they become available through our partners. We&apos;ll tell you what&apos;s real and what&apos;s possible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="joh-how">
        <div className="joh-wrap">
          <div className="center">
            <div className="joh-eyebrow">How It Works</div>
            <h2 className="joh-h2">Membership is by invitation.</h2>
          </div>
          <div className="how-grid">
            <div className="how">
              <div className="num">1</div>
              <h3>Request an invitation</h3>
              <p>Tell us a little about how you like to travel. Takes two minutes, no obligation.</p>
            </div>
            <div className="how">
              <div className="num">2</div>
              <h3>Personal review</h3>
              <p>We review each request personally. Invitations are extended to qualified clients, and we&apos;ll follow up either way.</p>
            </div>
            <div className="how">
              <div className="num">3</div>
              <h3>Meet your advisor</h3>
              <p>Once invited, you&apos;re matched with your dedicated advisor and we start planning your next trip.</p>
            </div>
          </div>
          <p className="se-note">
            Signature Experiences membership is currently complimentary for qualified clients. Trips are
            booked and priced separately. Terms may change in the future.
          </p>
        </div>
      </section>

      <section className="joh-faq">
        <div className="joh-wrap">
          <div className="center">
            <div className="joh-eyebrow">Questions</div>
            <h2 className="joh-h2">Quote, or invitation?</h2>
          </div>
          <div className="faq">
            {SIGNATURE_FAQS.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="se-note">
            For a specific trip, use the <a href="/request-quote">quote request form</a>. For the concierge membership, use the invitation form on this page.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="joh-form" id="request">
        <div className="joh-wrap">
          <div className="center">
            <div className="joh-eyebrow" style={{ color: "var(--gold-light)" }}>Request an Invitation</div>
            <h2 className="joh-h2" style={{ color: "var(--warm-white)" }}>Let&apos;s plan something exceptional.</h2>
          </div>
          <RequestForm />
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
              <summary>Does it cost anything to join?</summary>
              <p>Not at this time. Membership is complimentary for qualified clients. You pay only for the trips you book.</p>
            </details>
            <details>
              <summary>Who is invited?</summary>
              <p>We invite clients based on their travel plans and history with us. Submitting a request doesn&apos;t guarantee an invitation, but every request is reviewed personally.</p>
            </details>
            <details>
              <summary>Can you get me tickets or access to sold-out events?</summary>
              <p>We&apos;ll do everything we can through our supplier relationships, but availability varies and we never promise access we can&apos;t deliver. Your advisor will be upfront about what&apos;s possible.</p>
            </details>
            <details>
              <summary>How is this different from your regular service?</summary>
              <p>You get a single dedicated advisor, proactive curated suggestions and priority attention, rather than starting fresh with each request.</p>
            </details>
          </div>
        </div>
      </section>

      <div className="sticky-cta">
        <a className="btn-gold" href="#request">Request an Invitation</a>
      </div>
    </main>
  );
}
