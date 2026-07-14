import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Badge from '@/components/ui/Badge'
import ProductCard from '@/components/sections/catalog/ProductCard'
import ProductPlaceholder from '@/components/products/ProductPlaceholder'
import { generateMetadata as genMeta } from '@/lib/seo'
import { PHARMACY_NAME, SITE_URL, WHATSAPP_NUMBER } from '@/lib/constants'
import type { Product } from '@/lib/types'
import productsData from '@/data/products.json'

const products: Product[] = productsData

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

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Bonjour, je souhaite connaître le prix et la disponibilité de : ${product.name}.`,
  )}`

  // Prix volontairement absent du JSON-LD en MVP (masqué côté public) ; on
  // conserve l'Offer avec la seule disponibilité (InStock / OutOfStock).
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: product.category,
    ...(product.image ? { image: product.image } : {}),
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Catalogue', item: `${SITE_URL}/catalog` },
      { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE_URL}/catalog/${product.slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="py-16 bg-white min-h-screen">
        <div className="mx-auto max-w-5xl px-4">
          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-gray-dark/70">
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
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <ProductPlaceholder category={product.category} />
              )}
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
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Vérifier le prix sur WhatsApp
                </a>
                <span className="text-sm font-medium text-gray-dark/60">
                  ou disponible directement en pharmacie
                </span>
              </div>
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
