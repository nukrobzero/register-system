/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "api.qrserver.com",
      "www.sumipol.com",
      "chart.googleapis.com",
      "res.cloudinary.com",
    ],
    formats: ["image/webp"],
  },
  experimental: {
    serverActions: true,
  },
  env: {
    SECRET_KEY: process.env.SECRET_KEY,
    GOOGLE_SHEET_ADDCHECKIN: process.env.GOOGLE_SHEET_ADDCHECKIN,
    GOOGLE_SHEET: process.env.GOOGLE_SHEET,
  },
};

module.exports = nextConfig;
