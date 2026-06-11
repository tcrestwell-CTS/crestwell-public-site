import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Crestwell Travel Services',
  description: 'How Crestwell Travel Services LLC collects, uses, and protects your personal information — and the choices you have about your data.',
  alternates: { canonical: '/privacy' },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(13,27,42,0.1)' }}>
        {title}
      </h2>
      <div style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.85 }}>
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '80px 32px 64px', textAlign: 'center' }}>
        <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', marginBottom: 48 }} />
        <div className="overline" style={{ marginBottom: 16 }}>Legal</div>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'white', lineHeight: 1.2 }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', marginTop: 16 }}>Last updated: May 23, 2025</p>
      </section>

      {/* Content */}
      <section style={{ background: 'white', padding: '64px 32px 80px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.85, marginBottom: 40 }}>
            Crestwell Travel Service LLC d/b/a Crestwell Travel Service operates www.crestwellgetaways.com (the "Site"). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site. We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.
          </p>

          <Section title="Information Collection and Use">
            <p>While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Information"). Personal Identifiable information may include, but is not limited to, your name, address, and email address.</p>
            <p style={{ marginTop: 12 }}>When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.</p>
            <p style={{ marginTop: 12 }}>If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.</p>
          </Section>

          <Section title="Log Data">
            <p>Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, operating system, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>
            <p style={{ marginTop: 12 }}>In addition, we may use third party services such as Google Analytics or Facebook Ads Conversion Tracking that collect, monitor and analyze this information.</p>
          </Section>

          <Section title="Communications">
            <p>With your permission, we may use your Personal Information to contact you with newsletters, marketing or promotional materials and other relevant information about our store, products, or partners that we feel may be of interest to you.</p>
            <p style={{ marginTop: 12 }}>You may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at any time, by contacting us at info@crestwellgetaways.com.</p>
          </Section>

          <Section title="Cookies">
            <p>Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.</p>
            <p style={{ marginTop: 12 }}>Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.</p>
          </Section>

          <Section title="Security">
            <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>
          </Section>

          <Section title="Third Parties">
            <p>In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us. However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.</p>
            <p style={{ marginTop: 12 }}>For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled. Please remember that certain providers may be located in or have facilities in a different jurisdiction than either you or us.</p>
            <p style={{ marginTop: 12 }}>Once you leave our website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website's Terms of Service.</p>
          </Section>

          <Section title="Links">
            <p>When you click on links on our site, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.</p>
          </Section>

          <Section title="Changes to This Privacy Policy">
            <p>This Privacy Policy is effective as of January 1, 2025, and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.</p>
            <p style={{ marginTop: 12 }}>We reserve the right to update or change our Privacy Policy at any time, and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.</p>
            <p style={{ marginTop: 12 }}>If we make any material changes to this Privacy Policy, we will notify you through either the email address you have provided us, or by placing a prominent notice on our website.</p>
          </Section>

          <Section title="Contact Us">
            <p>If you have any questions about this Privacy Policy, please contact us at info@crestwellgetaways.com.</p>
          </Section>

          <div style={{ marginTop: 48, padding: '24px 32px', background: 'var(--cream)', borderLeft: '3px solid var(--gold)' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--navy)', marginBottom: 8 }}>Questions about our Privacy Policy?</p>
            <Link href="/contact" style={{ color: 'var(--navy)', fontWeight: 600, fontSize: '0.85rem' }}>Contact Us →</Link>
          </div>

        </div>
      </section>
    </>
  );
}
