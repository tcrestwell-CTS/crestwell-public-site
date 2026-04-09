/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve WebP/AVIF automatically — massive file size reduction
    formats: ['image/avif', 'image/webp'],
    // Responsive breakpoints matching Crestwell layout widths
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [64, 128, 256, 384, 512],
    // Cache optimized images for 60 days
    minimumCacheTTL: 5184000,
    remotePatterns: [
      // Supabase storage
      { protocol: 'https', hostname: '**.supabase.co' },
      // Unsplash
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // iStock / Getty
      { protocol: 'https', hostname: 'media.istockphoto.com' },
      // Bing image CDN
      { protocol: 'https', hostname: 'tse3.mm.bing.net' },
      { protocol: 'https', hostname: '**.mm.bing.net' },
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
      // Partner blog/press images
      { protocol: 'https', hostname: 'luxurylaunches.com' },
      { protocol: 'https', hostname: 'myextraordinaryadventures.com' },
      // Generic fallback
      { protocol: 'https', hostname: '**' },
    ],
  },
  // Enable gzip compression
  compress: true,
  // Power ETags for better caching
  generateEtags: true,
}
module.exports = nextConfig
