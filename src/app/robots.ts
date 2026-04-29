import type { MetadataRoute } from 'next'

const BASE_URL = 'https://santechouse.uz'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*/account/',
          '/*/cart',
          '/*/checkout',
          '/*/search',
          '/api/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}