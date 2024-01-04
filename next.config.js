/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination: `https://baftogether.com/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.lost112.go.kr',
        pathname: '/lostnfs/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
