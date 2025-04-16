/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placeholder.com", "v0.dev"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  // Ensure we're using Node.js 18.x
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig
