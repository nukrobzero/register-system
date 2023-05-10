/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.qrserver.com", "www.sumipol.com"],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
