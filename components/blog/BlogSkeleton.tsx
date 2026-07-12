import Skeleton from '@/components/ui/Skeleton'

function BlogCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <Skeleton variant="image" className="h-48 w-full" />
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-center gap-2">
          <Skeleton variant="circle" className="h-5 w-20" />
          <Skeleton variant="text" className="w-24" />
        </div>
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-2/3" />
      </div>
    </div>
  )
}

/** Fallback du blog : filtres + grille de 3 cartes (image + titre + excerpt + date). */
export default function BlogSkeleton() {
  return (
    <div role="status" aria-label="Chargement des articles">
      <div className="mb-8 flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="circle" className="h-8 w-20" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <BlogCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
