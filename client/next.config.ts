import type { NextConfig } from "next";
import { withBetterStack } from "@logtail/next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Increased for multiple file uploads
    },
  },
  compiler: {
    styledComponents: true,
  },
  // Increase timeout for API routes
  serverRuntimeConfig: {
    maxDuration: 60, // 60 seconds timeout
  },
  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "**.backblazeb2.com",
      },
    ],
  },
};

export default withBetterStack(nextConfig);
