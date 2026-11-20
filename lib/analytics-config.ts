export const GA_MEASUREMENT_ID = 'G-PSD3RNQKRH';
export const GTM_CONTAINER_ID = 'GTM-P3HVW4HR';

export const LIVE_ANALYTICS_HOSTS = ['crestwellgetaways.com', 'www.crestwellgetaways.com'] as const;

export function isLiveAnalyticsHost(hostname: string): boolean {
  const host = hostname.trim().toLowerCase().split(':')[0];
  return (LIVE_ANALYTICS_HOSTS as readonly string[]).includes(host);
}

/** /payment, /pay, and nested routes such as /payment/result. */
export function isPaymentPath(pathname: string): boolean {
  return (
    pathname === '/payment' ||
    pathname === '/pay' ||
    pathname.startsWith('/payment/') ||
    pathname.startsWith('/pay/')
  );
}

/**
 * Stable generate_lead source for a port-guide download.
 * City pages pass the city slug (`chattanooga` -> `city_port_guide_chattanooga`).
 * The homepage form passes `general`.
 */
export function portGuideLeadSource(city: string | null | undefined): string {
  const slug = (city ?? '').trim().toLowerCase();
  if (!slug || slug === 'general' || slug === 'homepage' || slug === 'southeast') {
    return 'homepage_port_guide';
  }
  const safe = slug.replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  return safe ? `city_port_guide_${safe}` : 'homepage_port_guide';
}

/**
 * Synchronous head snippet. Defines window.gtag immediately so a lead submitted
 * before gtag.js finishes loading is queued, then loads GTM and GA4 only on the
 * live host. On /payment and /pay, page_location and page_path omit the query
 * string so payment tokens are not sent to GA4.
 */
export function analyticsBootstrapScript(): string {
  const hosts = LIVE_ANALYTICS_HOSTS.map((host) => `'${host}'`).join(',');
  return `(function(){
    var host = (location.hostname || '').toLowerCase();
    var allowed = [${hosts}];
    if (allowed.indexOf(host) === -1) return;
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
    window.gtag('js', new Date());
    var path = location.pathname || '/';
    var payment = path === '/payment' || path === '/pay' || path.indexOf('/payment/') === 0 || path.indexOf('/pay/') === 0;
    if (payment) {
      var clean = location.origin + path;
      window.gtag('set', { page_path: path, page_location: clean });
      window.gtag('config', '${GA_MEASUREMENT_ID}', { page_path: path, page_location: clean });
    } else {
      window.gtag('config', '${GA_MEASUREMENT_ID}', { page_path: path });
    }
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
    document.head.appendChild(g);
  })();`;
}
