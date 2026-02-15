import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/profile/", "/favorites/", "/auth/"],
    },
    sitemap: "https://roomieverse.app/sitemap.xml",
  };
}
