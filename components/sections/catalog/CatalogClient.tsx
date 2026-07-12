'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import ProductCard from '@/components/sections/catalog/ProductCard'
import type { Product } from '@/lib/types'

interface CatalogClientProps {
  products: Product[]
  categories: string[]
}

export default function CatalogClient({ products, categories }: CatalogClientProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tous')

  const filtered = products.filter((p) => {
    const matchesCategory =
      activeCategory === 'Tous' || p.category === activeCategory
    const q = query.toLowerCase()
    const matchesQuery =
      !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Rechercher un produit..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-dark placeholder-gray-400 shadow-sm outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20"
        />
      </div>

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
      {filtered.length === 0 ? (
        <p className="text-center text-gray-dark/70 py-12">
          Aucun produit ne correspond à votre recherche.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
