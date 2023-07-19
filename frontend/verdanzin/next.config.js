module.exports = {
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
