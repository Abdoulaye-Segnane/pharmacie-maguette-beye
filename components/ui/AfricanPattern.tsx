interface AfricanPatternProps {
  className?: string
  /** Identifiant unique du motif — obligatoire si plusieurs instances sur une même page. */
  id?: string
}

/**
 * Motif décoratif géométrique d'inspiration ouest-africaine (losanges / tressage).
 * Rendu via un `<pattern>` répété, en `currentColor` — la couleur et l'opacité
 * se pilotent par les classes du parent (ex. `text-terra opacity-[0.06]`).
 */
export default function AfricanPattern({ className, id = 'afri' }: AfricanPatternProps) {
  const patternId = `${id}-pattern`
  return (
    <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={patternId} width="48" height="48" patternUnits="userSpaceOnUse">
          {/* Losange (tressage) */}
          <path d="M24 3 L45 24 L24 45 L3 24 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {/* Losange plein central */}
          <path d="M24 17 L31 24 L24 31 L17 24 Z" fill="currentColor" />
          {/* Points aux intersections */}
          <circle cx="0" cy="24" r="1.5" fill="currentColor" />
          <circle cx="48" cy="24" r="1.5" fill="currentColor" />
          <circle cx="24" cy="0" r="1.5" fill="currentColor" />
          <circle cx="24" cy="48" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}
