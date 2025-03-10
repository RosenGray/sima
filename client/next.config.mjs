/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      serverActions:true,
      bodySizeLimit: "10mb",
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://sima.dev/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f003.backblazeb2.com",
      },
    ],
  },
};

export default nextConfig;
