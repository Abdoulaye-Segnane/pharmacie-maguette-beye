import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import productsData from '@/data/products.json'
import articlesData from '@/data/articles.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,          changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/catalog`,   changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/blog`,      changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/a-propos`,  changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`,   changeFrequency: 'yearly',  priority: 0.5 },
    { url: `${SITE_URL}/mentions-legales`, changeFrequency: 'yearly', priority: 0.3 },
  ]

  const products = productsData satisfies { slug: string }[]
  const articles = articlesData satisfies { slug: string }[]

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/catalog/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...articleRoutes]
}
