import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
