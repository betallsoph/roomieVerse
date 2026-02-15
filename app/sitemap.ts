import type { MetadataRoute } from "next";
import { getActiveListingIds, getActivePostIds } from "./lib/server-data";

export const revalidate = 3600; // revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://roomieverse.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/roommate`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/roomshare`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/short-term`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/sublease`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  ];

  // Dynamic listing pages
  const [listings, posts] = await Promise.all([
    getActiveListingIds(),
    getActivePostIds(),
  ]);

  const listingPages: MetadataRoute.Sitemap = listings.map((l) => ({
    url: `${baseUrl}/${l.category}/listing/${l.id}`,
    lastModified: new Date(l.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${baseUrl}/community/${p.id}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...listingPages, ...postPages];
}
