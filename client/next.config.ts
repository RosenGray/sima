import type { NextConfig } from "next";
import { withBetterStack } from "@logtail/next";
import { execSync } from "child_process";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  
  // Fix turbopack workspace root warning
  turbopack: {
    root: __dirname,
  },
  
  experimental: {
    // inlineCss: true, // Disabled: Known to cause controller[kState].transformAlgorithm errors
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
  
  // Moved from experimental to top-level for Next.js 16
  serverExternalPackages: [],
  compiler: {
    styledComponents: true,
  },
  generateBuildId: async () => {
    // Use git commit hash for deterministic builds
    try {
      return execSync("git rev-parse HEAD", { stdio: 'pipe' }).toString().trim();
    } catch {
      // Fallback to environment variable or timestamp when git is not available
      return process.env.BUILD_ID || process.env.GITHUB_SHA || Date.now().toString();
    }
  },
  // Increase timeout for API routes
  // Image optimization configuration
  // Use *.hostname for one subdomain level; pathname allows all paths under /file/
  // Prevent HTML document caching so first load always gets current chunk URLs (avoids stale chunk 404s after deploy)
  async headers() {
    return [
      {
        source: "/",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
        ],
      },
      {
        // All page routes except _next (static/chunks) and api
        source: "/:path((?!_next|api).*)",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "*.backblazeb2.com",
        pathname: "/file/**",
      },
      {
        protocol: "https",
        hostname: "**.backblazeb2.com",
        pathname: "/file/**",
      },
    ],
  },
};

export default withBetterStack(nextConfig);
