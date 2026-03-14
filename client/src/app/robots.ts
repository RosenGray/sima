import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_CLIENT_URL ?? "https://www.sima-board.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/auth/",
          "/private-zone/",
          "/publish-ad/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
