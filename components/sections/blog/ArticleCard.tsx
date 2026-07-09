import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import ChevronRight from '@/components/ui/ChevronRight'
import { formatDate } from '@/lib/utils'
import type { Article } from '@/lib/types'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <Badge color="gold">{article.category}</Badge>
          <time dateTime={article.date} className="text-xs text-gray-dark/50">
            {formatDate(article.date)}
          </time>
        </div>
        <h3 className="mb-2 font-semibold text-green-dark leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="mb-4 text-sm text-gray-dark/70 line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-primary">
          Lire la suite
          <ChevronRight size={14} />
        </span>
      </div>
    </Link>
  )
}
