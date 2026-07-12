// next.config.ts
import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Frame-Options',           value: 'DENY' },
  { key: 'X-Content-Type-Options',    value: 'nosniff' },
  { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-DNS-Prefetch-Control',    value: 'on' },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    // Palier 1366 ajouté (laptops / viewport desktop Lighthouse ~1350px) et max
    // plafonné à 1920 → le hero pleine largeur n'est plus servi en 2048/3840.
    deviceSizes: [640, 750, 828, 1080, 1200, 1366, 1600, 1920],
    qualities: [55, 75],
    minimumCacheTTL: 2678400,
  },
  experimental: {
    // CSS atomique (Tailwind) inliné dans le <head> → supprime la requête CSS
    // bloquante au premier rendu (améliore FCP/LCP). Prod uniquement.
    inlineCss: true,
  },
  async headers() {
    return [
      {
        source:  '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
