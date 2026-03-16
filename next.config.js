/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Supabase storage
      { protocol: 'https', hostname: '**.supabase.co' },
      // Unsplash
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Widgety CDN (cruise line operator images)
      { protocol: 'https', hostname: 'assets.widgety.co.uk' },
      { protocol: 'https', hostname: 'www.widgety.co.uk' },
      // Cruise line image CDNs
      { protocol: 'https', hostname: '**.imgix.net' },
      { protocol: 'https', hostname: '**.cloudfront.net' },
      { protocol: 'https', hostname: '**.akamaized.net' },
      { protocol: 'https', hostname: '**.royalcaribbean.com' },
      { protocol: 'https', hostname: '**.carnival.com' },
      { protocol: 'https', hostname: '**.ncl.com' },
      { protocol: 'https', hostname: '**.princess.com' },
      { protocol: 'https', hostname: '**.virginvoyages.com' },
      { protocol: 'https', hostname: '**.msccruises.com' },
      { protocol: 'https', hostname: '**.celebritycruises.com' },
      { protocol: 'https', hostname: '**.hollandamerica.com' },
      // Generic fallback for any https image
      { protocol: 'https', hostname: '**' },
    ],
  },
}
module.exports = nextConfig
