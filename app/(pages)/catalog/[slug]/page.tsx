import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Badge from '@/components/ui/Badge'
import ProductCard from '@/components/sections/catalog/ProductCard'
import { generateMetadata as genMeta } from '@/lib/seo'
import { PHARMACY_NAME, SITE_URL } from '@/lib/constants'
import type { Product } from '@/lib/types'
import productsData from '@/data/products.json'

const products = productsData satisfies Product[]

export function generateStaticParams(): { slug: string }[] {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return {}
  return genMeta({
    title: product.name,
    description: product.description,
    canonical: `/catalog/${product.slug}`,
  })
}

export default async function ProductPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const similar = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { '@type': 'Brand', name: PHARMACY_NAME },
    offers: {
      '@type': 'Offer',
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/catalog/${product.slug}`,
      seller: { '@type': 'Organization', name: PHARMACY_NAME },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-16 bg-white min-h-screen">
        <div className="mx-auto max-w-5xl px-4">
          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-gray-dark/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-green-primary">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/catalog" className="hover:text-green-primary">Catalogue</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-dark" aria-current="page">{product.name}</li>
            </ol>
          </nav>

          {/* Contenu produit */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="relative h-72 overflow-hidden rounded-2xl bg-gray-50 lg:h-96">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-3 flex items-center gap-2">
                <Badge color="gold">{product.category}</Badge>
                <Badge color={product.available ? 'green' : 'gray'}>
                  {product.available ? 'Disponible' : 'Indisponible'}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-green-dark">{product.name}</h1>
              <p className="mt-4 text-gray-dark/80 leading-relaxed">{product.description}</p>
              <div className="mt-8 rounded-xl bg-green-primary/5 border border-green-primary/20 p-4 text-sm text-gray-dark/70">
                <strong className="text-green-dark">Conseil de votre pharmacien :</strong>{' '}
                Pour toute question sur ce produit, n&rsquo;hésitez pas à consulter notre équipe
                en pharmacie ou à nous appeler.
              </div>
            </div>
          </div>

          {/* Produits similaires */}
          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-green-dark">
                Dans la même catégorie
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {similar.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
