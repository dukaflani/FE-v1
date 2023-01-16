/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGES_URL],
    // unoptimized: true,
  }
})
