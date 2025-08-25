 const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Konfigurasi Next.js Anda lainnya di sini
};

module.exports = withBundleAnalyzer(nextConfig);