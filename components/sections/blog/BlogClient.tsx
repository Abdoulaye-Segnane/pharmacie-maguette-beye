'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import ArticleCard from '@/components/sections/blog/ArticleCard'
import type { Article } from '@/lib/types'

interface BlogClientProps {
  articles: Article[]
  categories: string[]
}

export default function BlogClient({ articles, categories }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState('Tous')

  const filtered =
    activeCategory === 'Tous'
      ? articles
      : articles.filter((a) => a.category === activeCategory)

  return (
    <div>
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {['Tous', ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              activeCategory === cat
                ? 'bg-green-primary text-white'
                : 'bg-gray-100 text-gray-dark hover:bg-gray-200',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
