/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [64, 128, 256, 384, 512],
    minimumCacheTTL: 5184000,
    remotePatterns: [
      // Supabase storage — featured trip cover images (components/TripCard.tsx)
      { protocol: 'https', hostname: '**.supabase.co' },
      // Still used via next/image on /vacations-by-rail, /deals, /destination-packages
      { protocol: 'https', hostname: 'images.unsplash.com' },
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