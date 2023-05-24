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
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
  },
};

module.exports = nextConfig;
