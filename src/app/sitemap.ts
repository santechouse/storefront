import type { MetadataRoute } from "next";
import { listCategories } from "@lib/data/categories";
import { listProducts } from "@lib/data/products";
import { listBrands } from "@lib/data/brands";
import { listCollections } from "@lib/data/collections";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://santechouse.uz";
const LOCALES = ["uz", "ru"];

function url(path: string): string {
  return `${BASE_URL}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    { url: url(`/${locale}`), changeFrequency: "daily", priority: 1.0 },
    { url: url(`/${locale}/catalog`), changeFrequency: "daily", priority: 0.9 },
    { url: url(`/${locale}/brands`), changeFrequency: "weekly", priority: 0.8 },
    { url: url(`/${locale}/search`), changeFrequency: "weekly", priority: 0.6 },
    {
      url: url(`/${locale}/privacy`),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ]);

  const [categoriesRes, brandsRes, collectionsRes] = await Promise.allSettled([
    listCategories({ locale: "ru", query: { limit: 1000 } }),
    listBrands(),
    listCollections("ru", { limit: "1000" }),
  ]);

  const categoryRoutes: MetadataRoute.Sitemap =
    categoriesRes.status === "fulfilled"
      ? (categoriesRes.value.product_categories ?? []).flatMap((cat) =>
          LOCALES.map((locale) => ({
            url: url(`/${locale}/catalog/${cat.handle}`),
            changeFrequency: "weekly" as const,
            priority: 0.8,
          })),
        )
      : [];

  const brandRoutes: MetadataRoute.Sitemap =
    brandsRes.status === "fulfilled"
      ? brandsRes.value.flatMap((brand) =>
          LOCALES.map((locale) => ({
            url: url(`/${locale}/brands/${brand.handle}`),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          })),
        )
      : [];

  const collectionRoutes: MetadataRoute.Sitemap =
    collectionsRes.status === "fulfilled"
      ? (collectionsRes.value.collections ?? []).flatMap((col) =>
          LOCALES.map((locale) => ({
            url: url(`/${locale}/collections/${col.handle}`),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          })),
        )
      : [];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const { response } = await listProducts({
      locale: "ru",
      countryCode: "uz",
      queryParams: { limit: 1000 },
    });
    productRoutes = (response.products ?? []).flatMap((product) =>
      LOCALES.map((locale) => ({
        url: url(`/${locale}/products/${product.handle}`),
        changeFrequency: "weekly" as const,
        priority: 0.7,
        lastModified: product.updated_at
          ? new Date(product.updated_at)
          : undefined,
      })),
    );
  } catch {
    // products fetch failed — continue without them
  }

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...brandRoutes,
    ...collectionRoutes,
    ...productRoutes,
  ];
}
