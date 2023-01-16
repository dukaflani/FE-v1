/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: "exclude",
  dest: "public",
  disable: process.env.NODE_ENV === 'development',
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGES_URL],
    // unoptimized: true,
  }
})
