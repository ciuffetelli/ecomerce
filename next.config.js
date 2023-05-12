/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['public.tsx', 'public.ts'],
  images: {
    domains: ['fakestoreapi.com', 'ik.imagekit.io', 'pisces.bbystatic.com'],
    minimumCacheTTL: 60,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
}

module.exports = nextConfig
