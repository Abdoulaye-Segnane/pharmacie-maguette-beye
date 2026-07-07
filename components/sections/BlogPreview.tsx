import Image from 'next/image'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import AnimatedSection from '@/components/ui/AnimatedSection'
import type { Article } from '@/lib/types'
import articlesData from '@/data/articles.json'
import { formatDate } from '@/lib/utils'

const articles = articlesData satisfies Article[]

export default function BlogPreview() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-green-dark">Conseils santé</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-dark/70">
            Nos pharmaciens partagent leurs connaissances pour vous aider à prendre soin de votre santé.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((article, i) => (
            <AnimatedSection key={article.id} delay={i * 0.1}>
              <Card className="flex h-full flex-col overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <time
                    dateTime={article.date}
                    className="mb-2 text-xs text-gray-dark/50"
                  >
                    {formatDate(article.date)}
                  </time>
                  <h3 className="mb-2 line-clamp-2 font-semibold text-green-dark">
                    {article.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 flex-1 text-sm text-gray-dark/70">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-sm font-medium text-green-primary transition-colors hover:text-green-dark"
                  >
                    Lire la suite →
                  </Link>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
