import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { headers } from 'next/headers';

async function NavbarFooterWrapper({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') || headersList.get('x-pathname') || '';
  const isDisplay = pathname === '/display' || pathname.startsWith('/display/') || pathname === '/win' || pathname.startsWith('/win/');
  if (isDisplay) return <main style={{ margin: 0, padding: 0 }}>{children}</main>;
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

const SITE_URL = 'https://crestwellgetaways.com';
const OG_IMAGE = 'https://crestwellgetaways.com/images/ASTAHorizontalCMYK0247817c-a713-4d83-9e60-913564067b77.png';

// Fix: Title trimmed to under 60 chars
export const metadata: Metadata = {
  title: {
    template: '%s | Crestwell Travel Services',
    default: 'Crestwell Travel Services | Cruises & Resorts',
  },
  description: 'Boutique travel agency in Chattanooga specializing in cruises, all-inclusive resorts, and group vacations across GA, TN & AL.',
  keywords: ['travel agency', 'cruises', 'all-inclusive', 'family vacations', 'Georgia', 'Tennessee', 'Alabama', 'Chattanooga'],
};

// JSON-LD: Organization + TravelAgency (expanded with LocalBusiness fields)
const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': ['TravelAgency', 'LocalBusiness'],
  name: 'Crestwell Travel Services',
  alternateName: 'Crestwell Getaways',
  url: SITE_URL,
  logo: OG_IMAGE,
  image: OG_IMAGE,
  telephone: '+18885086893',
  email: 'info@crestwellgetaways.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chattanooga',
    addressRegion: 'TN',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'State', name: 'Georgia' },
    { '@type': 'State', name: 'Tennessee' },
    { '@type': 'State', name: 'Alabama' },
    { '@type': 'State', name: 'Florida' },
  ],
  description: 'Boutique travel agency in Chattanooga specializing in cruises, all-inclusive resorts, and group vacations for families and couples across the Southeast.',
  knowsAbout: ['Cruise Vacations', 'All-Inclusive Resorts', 'Group Travel', 'Family Vacations', 'Solo Travel'],
  sameAs: [
    'https://www.facebook.com/profile.php?id=61572819131364',
    'https://www.instagram.com/crestwelltravel',
    'https://www.linkedin.com/company/crestwell-travel-services',
    'https://www.tiktok.com/@crestwelltravel',
  ],
};

// JSON-LD: WebSite
const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Crestwell Travel Services',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

// JSON-LD: FAQ schema for common travel questions
const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Crestwell Travel Services charge a fee?',
      acceptedAnswer: { '@type': 'Answer', text: 'No — our travel planning services are complimentary. We are compensated by the cruise lines and resorts we book, so there is no extra cost to you.' },
    },
    {
      '@type': 'Question',
      name: 'What areas does Crestwell Travel Services serve?',
      acceptedAnswer: { '@type': 'Answer', text: 'We primarily serve clients in Georgia, Tennessee, Alabama, and Florida, but we plan vacations for travelers across the entire United States.' },
    },
    {
      '@type': 'Question',
      name: 'Can Crestwell plan group and corporate travel?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — we specialize in group travel coordination including corporate retreats, family reunions, church groups, and milestone celebrations of any size.' },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to get a cruise quote?',
      acceptedAnswer: { '@type': 'Answer', text: 'Most quote requests are responded to within one business day. Simply fill out our quote request form and a travel advisor will reach out to discuss your options.' },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="Boutique travel agency in Chattanooga specializing in cruises, all-inclusive resorts, and group vacations across GA, TN & AL." />
        <meta name="robots" content="index, follow" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Google Search Console */}
        <meta name="google-site-verification" content="B9Gt4g3dHtK4WGm22Iv_ucUai4QFAa-eRjlI7tMAuNY" />

        {/* Open Graph — base tags only; page-level layouts override title/description/image/url */}
        <meta property="og:site_name" content="Crestwell Travel Services" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crestwell Travel Services | Cruises & Resorts" />
        <meta name="twitter:description" content="Boutique travel agency in Chattanooga specializing in cruises, all-inclusive resorts, and group vacations." />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Analytics GA4 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-PSD3RNQKRH" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PSD3RNQKRH', { page_path: window.location.pathname });
          `}
        </Script>
        <Script id="utm-capture" strategy="afterInteractive">{`
          (function() {
            try {
              const p = new URLSearchParams(window.location.search);
              ['gclid','utm_source','utm_medium','utm_campaign','utm_term','utm_content']
                .forEach(function(k) { const v = p.get(k); if (v) localStorage.setItem(k, v); });
            } catch(e) {}
          })();
        `}</Script>

      {/* TrustBox script */}
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>
      {/* End TrustBox script */}
      </head>
      <body>
        <NavbarFooterWrapper>
          {children}
        </NavbarFooterWrapper>
        <Script
          id="bbb-seal"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var bbb = bbb || [];
              bbb.push(["bbbid", "chattanooga"]);
              bbb.push(["bid", "80012178"]);
              bbb.push(["chk", "C5735AFA23"]);
              bbb.push(["pos", "bottom-left"]);
              (function () {
                var scheme = (("https:" == document.location.protocol) ? "https://" : "http://");
                var bbb = document.createElement("script");
                bbb.type = "text/javascript";
                bbb.async = true;
                bbb.src = scheme + "seal-chattanooga.bbb.org/badge/badge.min.js";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(bbb, s);
              })();
            `,
          }}
        />
      {/* GetYourGuide Analytics */}
      <Script
        src="https://widget.getyourguide.com/dist/pa.umd.production.min.js"
        data-gyg-partner-id="IOXL78H"
        strategy="afterInteractive"
      />
      </body>
    </html>
  );
}
