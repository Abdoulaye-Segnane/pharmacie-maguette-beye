import Skeleton from '@/components/ui/Skeleton'

function FieldSkeleton({ inputClassName }: { inputClassName: string }) {
  return (
    <div className="space-y-1.5">
      <Skeleton variant="text" className="w-28" />
      <Skeleton variant="card" className={inputClassName} />
    </div>
  )
}

/** Fallback du formulaire de contact : 3 champs + bouton. */
export default function ContactSkeleton() {
  return (
    <div role="status" aria-label="Chargement du formulaire" className="space-y-5">
      <FieldSkeleton inputClassName="h-12 w-full" />
      <FieldSkeleton inputClassName="h-12 w-full" />
      <FieldSkeleton inputClassName="h-32 w-full" />
      <Skeleton variant="card" className="h-12 w-full sm:w-48" />
    </div>
  )
}
