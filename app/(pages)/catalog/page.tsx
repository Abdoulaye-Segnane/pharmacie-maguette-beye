import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { generateMetadata as genMeta } from '@/lib/seo'
import CatalogSkeleton from '@/components/products/CatalogSkeleton'
import type { Product } from '@/lib/types'
import productsData from '@/data/products.json'

// Chargé en lazy : le squelette s'affiche pendant le chargement du chunk
// (navigation client) ; le contenu reste rendu côté serveur (SSR) pour le SEO.
const CatalogClient = dynamic(() => import('@/components/sections/catalog/CatalogClient'), {
  loading: () => <CatalogSkeleton />,
})

export const metadata: Metadata = genMeta({
  title: 'Catalogue',
  description:
    'Découvrez notre catalogue de médicaments et produits de parapharmacie à la Pharmacie Maguette Beye, Kaolack.',
  canonical: '/catalog',
})

const products = productsData satisfies Product[]

export default function CatalogPage() {
  const categories = [...new Set(products.map((p) => p.category))]

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-green-dark">Notre catalogue</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-dark/70">
            Médicaments et produits de parapharmacie disponibles en pharmacie.
          </p>
        </div>
        <CatalogClient products={products} categories={categories} />
      </div>
    </section>
  )
}
