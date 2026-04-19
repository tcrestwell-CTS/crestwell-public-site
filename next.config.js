/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [64, 128, 256, 384, 512],
    minimumCacheTTL: 5184000,
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'media.istockphoto.com' },
      { protocol: 'https', hostname: 'tse3.mm.bing.net' },
      { protocol: 'https', hostname: '**.mm.bing.net' },
      { protocol: 'https', hostname: 'assets.widgety.co.uk' },
      { protocol: 'https', hostname: 'www.widgety.co.uk' },
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
      { protocol: 'https', hostname: 'luxurylaunches.com' },
      { protocol: 'https', hostname: 'myextraordinaryadventures.com' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  compress: true,
  generateEtags: true,

  // Allow /display page to be embedded in Look Digital Signage (iframe)
  async headers() {
    return [
      {
        source: '/display',
        headers: [
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          { key: 'Content-Security-Policy', value: "frame-ancestors *;" },
        ],
      },
    ];
  },
}

// Disable Next.js telemetry at build time
process.env.NEXT_TELEMETRY_DISABLED = '1';

module.exports = nextConfig

// cache bust: f8ee595763c5