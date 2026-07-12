import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import Badge from '@/components/ui/Badge'
import ArticleCard from '@/components/sections/blog/ArticleCard'
import TableOfContents from '@/components/sections/blog/TableOfContents'
import { generateMetadata as genMeta } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { PHARMACY_NAME, SITE_URL } from '@/lib/constants'
import type { Article } from '@/lib/types'
import articlesData from '@/data/articles.json'

const articles = articlesData satisfies Article[]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

export function generateStaticParams(): { slug: string }[] {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return genMeta({
    title: article.title,
    description: article.excerpt,
    canonical: `/blog/${article.slug}`,
    openGraph: { image: article.image, type: 'article' },
  })
}

export default async function BlogArticlePage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`)
  let fileContents: string
  try {
    fileContents = await readFile(filePath, 'utf8')
  } catch {
    return notFound()
  }
  const { content } = matter(fileContents)

  // Extract ToC from H2 headings
  const tocRegex = /^## (.+)/gm
  const toc: { id: string; title: string }[] = []
  let match: RegExpExecArray | null
  while ((match = tocRegex.exec(content)) !== null) {
    toc.push({ id: slugify(match[1]), title: match[1] })
  }

  // Convert Markdown to HTML and add id to H2 headings
  const processedContent = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(content)
  const rawHtml = processedContent.toString()
  const html = rawHtml.replace(/<h2>(.*?)<\/h2>/g, (_, title: string) => {
    return `<h2 id="${slugify(title)}">${title}</h2>`
  })

  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    image: article.image,
    url: `${SITE_URL}/blog/${article.slug}`,
    author: { '@type': 'Organization', name: PHARMACY_NAME },
    publisher: {
      '@type': 'Organization',
      name: PHARMACY_NAME,
      url: SITE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Hero image */}
        <div className="relative h-72 w-full overflow-hidden bg-green-dark md:h-96">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="100vw"
            className="object-cover opacity-60"
            priority
          />
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
            {/* Article content */}
            <div>
              {/* Meta */}
              <div className="mb-4 flex items-center gap-3">
                <Badge color="gold">{article.category}</Badge>
                <time dateTime={article.date} className="text-sm text-gray-dark/70">
                  {formatDate(article.date)}
                </time>
              </div>

              <h1 className="text-3xl font-bold text-green-dark leading-tight mb-8 md:text-4xl">
                {article.title}
              </h1>

              {/* MDX body */}
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>

            {/* Sidebar — ToC + related */}
            <aside className="space-y-8">
              <TableOfContents toc={toc} />

              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="mb-1 text-sm font-semibold text-green-dark">
                  Des questions ?
                </p>
                <p className="text-sm text-gray-dark/70">
                  Nos pharmaciens sont disponibles pour vous conseiller.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-green-primary hover:text-green-dark"
                >
                  Nous contacter
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                </Link>
              </div>
            </aside>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-16 border-t border-gray-100 pt-12">
              <h2 className="mb-6 text-2xl font-bold text-green-dark">Articles recommandés</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {related.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/blog"
              className="text-sm font-medium text-green-primary hover:text-green-dark"
            >
              ← Retour aux conseils santé
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
