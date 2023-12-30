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
};

module.exports = nextConfig;
