import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import JsonLd from '@/components/JsonLd';
import { headers } from 'next/headers';
import { organizationJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { BUSINESS_NAME, SITE_URL } from '@/lib/site';

async function NavbarFooterWrapper({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') || headersList.get('x-pathname') || '';
  const isDisplay = pathname === '/display' || pathname.startsWith('/display/') || pathname === '/win' || pathname.startsWith('/win/');
  if (isDisplay) return <main style={{ margin: 0, padding: 0 }}>{children}</main>;
  return (
    <>
      <Navbar />
      <main style={{ paddingBottom: 0 }}>{children}</main>
      <Footer />
    </>
  );
}

const DEFAULT_TITLE = `${BUSINESS_NAME} | Cruises, Resorts & Group Travel`;
const DEFAULT_DESCRIPTION = 'Crestwell Travel Services plans cruises, all-inclusive resorts, and group travel for families, couples, and groups. Based in Chattanooga, TN, serving Georgia, Tennessee, Alabama, and Florida. Website: crestwellgetaways.com.';

// Title template is '%s' so pages that already include the business name are not doubled.
// Canonical URLs are set per page. A root canonical would point every page at the homepage.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s',
    default: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: BUSINESS_NAME,
  keywords: ['Crestwell Travel Services', 'travel agency', 'cruises', 'all-inclusive', 'group travel', 'Chattanooga', 'Georgia', 'Tennessee', 'Alabama', 'Florida'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: BUSINESS_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  verification: { google: 'B9Gt4g3dHtK4WGm22Iv_ucUai4QFAa-eRjlI7tMAuNY' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P3HVW4HR');` }} />
        {/* End Google Tag Manager */}
        <meta charSet="utf-8" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

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
        {/* Google Tag Manager (noscript) */}
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P3HVW4HR" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        {/* End Google Tag Manager (noscript) */}
        <AnalyticsEvents />
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
