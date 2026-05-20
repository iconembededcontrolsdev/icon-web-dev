import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Netlify deployment
  output: 'standalone',

  // Enable gzip compression for production
  compress: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Expose the public reCAPTCHA site key to client-side code.
  env: {
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // Serve logo-low.png by rewriting to existing logo.png files
      {
        source: '/images/lowres/logo-low.png',
        destination: '/images/lowres/logo.png',
      },
      {
        source: '/images/highres/logo-low.png',
        destination: '/images/highres/logos/logo.png',
      },
      {
        source: '/images/highres/logos/logo-low.png',
        destination: '/images/highres/logos/logo.png',
      },
      {
        source: '/images/highres/extras/logo-low.png',
        destination: '/images/highres/extras/logo.png',
      },
    ];
  },
};

export default nextConfig;
