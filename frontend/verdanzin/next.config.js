/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.0.108',
        port: '3001',
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
