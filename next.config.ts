import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'shineasiaestate.co' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'videos.pexels.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1440, 1920, 2400],
    imageSizes: [128, 192, 256, 384, 512, 640, 800],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
