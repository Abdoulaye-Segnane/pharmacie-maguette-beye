import Skeleton from '@/components/ui/Skeleton'

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <Skeleton variant="image" className="h-48 w-full" />
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <Skeleton variant="text" className="w-1/2" />
          <Skeleton variant="circle" className="h-5 w-16 shrink-0" />
        </div>
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-4/5" />
      </div>
    </div>
  )
}

/** Fallback du catalogue : barre de recherche + filtres + grille de 8 cartes. */
export default function CatalogSkeleton() {
  return (
    <div role="status" aria-label="Chargement du catalogue">
      <Skeleton variant="card" className="mb-6 h-12 w-full" />
      <div className="mb-8 flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} variant="circle" className="h-8 w-20" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
