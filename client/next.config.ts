import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // Increased for multiple file uploads
    },
  },
  compiler: {
    styledComponents: true,
  },
  // API route configuration for file uploads
  api: {
    bodyParser: {
      sizeLimit: '50mb', // Increased body size limit
    },
    responseLimit: false, // Disable response size limit
  },
  // Increase timeout for API routes
  serverRuntimeConfig: {
    maxDuration: 60, // 60 seconds timeout
  },
};

export default nextConfig;
