import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { activityCategories } from "@/lib/content/activities";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/restaurant",
    "/activities",
    "/transfers",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const activityRoutes = activityCategories.map(
    (category) => `/activities/${category.slug}`,
  );

  return [...staticRoutes, ...activityRoutes].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
