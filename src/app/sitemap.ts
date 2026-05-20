import type { MetadataRoute } from "next";
import { getActiveProducts } from "@/lib/catalog";
import { collectionHandles } from "@/lib/data/categories";
import { collectionPath, productPath, searchPath } from "@/lib/paths";
import { baseUrl } from "@/lib/seo/base-url";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getActiveProducts();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${baseUrl}${searchPath()}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = collectionHandles.map((handle) => ({
    url: `${baseUrl}${collectionPath(handle)}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}${productPath(product.id)}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
