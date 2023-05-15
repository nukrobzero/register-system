/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.qrserver.com", "www.sumipol.com", "chart.googleapis.com"],
    formats: ["image/webp"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
