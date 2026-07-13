import { cn } from '@/lib/utils'
import PharmacyCross from '@/components/ui/PharmacyCross'

interface ProductPlaceholderProps {
  /** Catégorie du produit, affichée en petit sous la croix. */
  category: string
  /** Classes optionnelles pour le conteneur. */
  className?: string
}

/**
 * Visuel de repli uniforme pour les produits sans photo réelle.
 *
 * Croix pharmaceutique verte (green-primary) centrée sur un fond sand clair,
 * avec la catégorie du produit en dessous. Remplit son conteneur parent —
 * la grille catalogue définit la taille — pour un rendu cohérent partout.
 */
export default function ProductPlaceholder({ category, className }: ProductPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-3 bg-sand/20 p-4 text-center',
        className,
      )}
    >
      <PharmacyCross className="aspect-square w-1/4 max-w-[88px] text-green-primary" />
      <span className="text-xs font-semibold uppercase tracking-wider text-green-primary/60">
        {category}
      </span>
    </div>
  )
}
