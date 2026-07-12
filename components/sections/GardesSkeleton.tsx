import Skeleton from '@/components/ui/Skeleton'

function GardeCardSkeleton() {
  return (
    <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-7">
      <Skeleton variant="text" className="w-24" />
      <Skeleton variant="card" className="h-5 w-32" />
      <Skeleton variant="text" className="w-28" />
      <Skeleton variant="circle" className="mt-1 h-7 w-28" />
      <Skeleton variant="text" className="w-36" />
    </div>
  )
}

/** Fallback de la section « Prochaines gardes » : en-tête + 3 cartes. */
export default function GardesSkeleton() {
  return (
    <section
      role="status"
      aria-label="Chargement des gardes"
      className="border-t border-green-primary/10 bg-white py-24"
    >
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-12 flex flex-col items-center gap-4">
          <Skeleton variant="circle" className="h-7 w-28" />
          <Skeleton variant="card" className="h-9 w-64" />
          <Skeleton variant="text" className="w-80 max-w-full" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <GardeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
