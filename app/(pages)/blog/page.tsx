import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { generateMetadata as genMeta } from '@/lib/seo'
import BlogSkeleton from '@/components/blog/BlogSkeleton'
import type { Article } from '@/lib/types'
import articlesData from '@/data/articles.json'

const BlogClient = dynamic(() => import('@/components/sections/blog/BlogClient'), {
  loading: () => <BlogSkeleton />,
})

export const metadata: Metadata = genMeta({
  title: 'Conseils santé',
  description:
    'Conseils santé, prévention et bien-être par les pharmaciens de la Pharmacie Maguette Beye à Kaolack.',
  canonical: '/blog',
})

const articles = articlesData satisfies Article[]

export default function BlogPage() {
  const categories = [...new Set(articles.map((a) => a.category))]

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-green-dark">Conseils santé</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-dark/70">
            Nos pharmaciens partagent leurs connaissances pour vous aider à prendre soin de votre santé.
          </p>
        </div>
        <BlogClient articles={articles} categories={categories} />
      </div>
    </section>
  )
}
