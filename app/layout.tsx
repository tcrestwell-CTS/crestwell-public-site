import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedTripsPopup from '@/components/FeaturedTripsPopup';

export const metadata: Metadata = {
  title: {
    template: '%s | Crestwell Travel Services',
    default: 'Crestwell Travel Services — See the World One Port at a Time',
  },
  description: 'Personalized travel experiences specializing in cruises, all-inclusive resorts, and group vacations. Serving Georgia, Tennessee, and Alabama.',
  keywords: ['travel agency', 'cruises', 'all-inclusive', 'family vacations', 'Georgia', 'Tennessee', 'Alabama'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Core Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Discover curated vacations, luxury all-inclusive stays, group travel, and personalized getaway planning with Crestwell Getaways. Expertly crafted trips for families, couples, and adventure seekers." />
        <meta name="robots" content="index, follow" />
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="B9Gt4g3dHtK4WGm22Iv_ucUai4QFAa-eRjlI7tMAuNY" />
        {/* Open Graph */}
        <meta property="og:site_name" content="Crestwell Getaways" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://crestwellgetaways.com" />
        <meta property="og:title" content="Crestwell Getaways | Curated Vacations, Luxury Stays & All-Inclusive Travel" />
        <meta property="og:description" content="Discover curated vacations, luxury all-inclusive stays, group travel, and personalized getaway planning with Crestwell Getaways." />
        <meta property="og:image" content="https://crestwell-public-site.vercel.app/images/ASTAHorizontalCMYK0247817c-a713-4d83-9e60-913564067b77.png" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crestwell Getaways | Curated Vacations & All-Inclusive Travel" />
        <meta name="twitter:description" content="Expertly crafted trips for families, couples, and adventure seekers." />
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
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FeaturedTripsPopup />
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
