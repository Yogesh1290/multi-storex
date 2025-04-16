/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["placeholder.com"],
    unoptimized: true,
  },
  // Ensure we're using Node.js 18.x
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig
