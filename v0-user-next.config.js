/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com"], // Allow Google profile images
    unoptimized: true, // Important for static deployments
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["mernpress.com", "www.mernpress.com", "localhost:3000"],
    },
  },
}

module.exports = nextConfig
