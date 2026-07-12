import { cn } from '@/lib/utils'

export type SkeletonVariant = 'text' | 'card' | 'image' | 'circle'

interface SkeletonProps {
  variant?: SkeletonVariant
  className?: string
}

// Chaque variante ne fixe que la forme (arrondi). La taille (h-*/w-*) est
// fournie par l'appelant — évite les conflits de classes (cn = clsx, sans merge).
const variantClasses: Record<SkeletonVariant, string> = {
  text: 'h-4 rounded',
  card: 'rounded-xl',
  image: 'rounded-none',
  circle: 'rounded-full',
}

/** Bloc de chargement animé (pulse), teinte sable cohérente avec la palette africaine. */
export default function Skeleton({ variant = 'text', className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse bg-sand/40', variantClasses[variant], className)}
    />
  )
}
