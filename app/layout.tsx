import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SITE_URL = 'https://crestwellgetaways.com';
const OG_IMAGE = 'https://crestwellgetaways.com/images/ASTAHorizontalCMYK0247817c-a713-4d83-9e60-913564067b77.png';

// Fix 4: Meta description under 160 characters
export const metadata: Metadata = {
  title: {
    template: '%s | Crestwell Travel Services',
    default: 'Crestwell Travel Services — See the World One Port at a Time',
  },
  description: 'Boutique travel agency in Chattanooga specializing in cruises, all-inclusive resorts, and group vacations across GA, TN & AL.',
  keywords: ['travel agency', 'cruises', 'all-inclusive', 'family vacations', 'Georgia', 'Tennessee', 'Alabama', 'Chattanooga'],
};

// Fix 3: JSON-LD structured data
const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'TravelAgency'],
  name: 'Crestwell Travel Services',
  alternateName: 'Crestwell Getaways',
  url: SITE_URL,
  logo: OG_IMAGE,
  telephone: '+18885086893',
  email: 'info@crestwellgetaways.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Chattanooga',
    addressRegion: 'TN',
    addressCountry: 'US',
  },
  areaServed: ['Georgia', 'Tennessee', 'Alabama'],
  description: 'Boutique travel agency specializing in cruises, all-inclusive resorts, and group vacations.',
  sameAs: [
    'https://www.facebook.com/crestwellgetaways',
    'https://www.instagram.com/crestwellgetaways',
  ],
};

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Core Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Fix 4: Concise meta description under 160 chars */}
        <meta name="description" content="Boutique travel agency in Chattanooga specializing in cruises, all-inclusive resorts, and group vacations across GA, TN & AL." />
        <meta name="robots" content="index, follow" />

        {/* Fix 1: Canonical URL */}
        <link rel="canonical" href={SITE_URL} />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="B9Gt4g3dHtK4WGm22Iv_ucUai4QFAa-eRjlI7tMAuNY" />

        {/* Fix 2: Open Graph — complete set, correct domain */}
        <meta property="og:site_name" content="Crestwell Travel Services" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content="Crestwell Travel Services — See the World One Port at a Time" />
        <meta property="og:description" content="Boutique travel agency in Chattanooga specializing in cruises, all-inclusive resorts, and group vacations across GA, TN & AL." />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crestwell Travel Services — See the World One Port at a Time" />
        <meta name="twitter:description" content="Boutique travel agency in Chattanooga specializing in cruises, all-inclusive resorts, and group vacations." />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Fix 3: JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PSD3RNQKRH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PSD3RNQKRH', {
              page_path: window.location.pathname,
            });
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
        `}
        </Script>
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
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
      </body>
    </html>
  );
}
