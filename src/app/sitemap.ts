import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

/* ── Sitemap — four server-rendered entry points.
   Category filtering happens client-side under /products and canonicalizes to
   it, so ?cat= URLs are intentionally absent. ── */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteUrl}/products`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/legal`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
