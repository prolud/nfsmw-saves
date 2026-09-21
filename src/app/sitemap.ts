import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://prolud.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return [
    {
      url: `${SITE_URL}${basePath}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}