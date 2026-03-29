/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Removed to support Vercel dynamic Next.js builds
  images: { unoptimized: true },
  reactStrictMode: true,
}

module.exports = nextConfig
