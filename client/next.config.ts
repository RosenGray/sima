import type { NextConfig } from "next";
import { withBetterStack } from "@logtail/next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Increased for multiple file uploads
      // Required behind nginx ingress: Next.js compares Origin to Host and can return 403
      // when they differ (e.g. after proxy). Allow our production host so Server Actions work.
      allowedOrigins: [
        "www.sima-board.com",
        "sima-board.com",
        "*.sima-board.com",
      ],
    },
  },
  compiler: {
    styledComponents: true,
  },
  // Increase timeout for API routes
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
