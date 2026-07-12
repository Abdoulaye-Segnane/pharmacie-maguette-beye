'use client'

import { LazyMotion, domAnimation } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Charge uniquement le sous-ensemble `domAnimation` de framer-motion (animations,
 * variants, exit, gestes) via LazyMotion, au lieu du bundle `motion` complet.
 * Tous les composants d'animation utilisent `m.*` (et non `motion.*`) sous ce provider.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>
}
