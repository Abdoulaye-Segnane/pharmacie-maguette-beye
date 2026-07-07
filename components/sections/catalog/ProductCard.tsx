import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-green-dark leading-snug line-clamp-2">
            {product.name}
          </h3>
          <Badge color={product.available ? 'green' : 'gray'} className="shrink-0">
            {product.available ? 'Disponible' : 'Indisponible'}
          </Badge>
        </div>
        <p className="text-sm text-gray-dark/70 line-clamp-2 flex-1">
          {product.description}
        </p>
        <span className="mt-3 text-sm font-medium text-green-primary">
          Voir le détail →
        </span>
      </div>
    </Link>
  )
}
