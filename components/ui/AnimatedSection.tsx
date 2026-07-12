'use client'

import { m } from 'framer-motion'
import type { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  variant?: 'fadeIn' | 'slideUp'
  delay?: number
}

const variants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
}

// Animation déclenchée au montage (compatible LazyMotion `domAnimation`, qui
// n'inclut pas la feature `whileInView`/viewport). Le contenu finit toujours visible.
export default function AnimatedSection({
  children,
  className,
  variant = 'slideUp',
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={variants[variant]}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </m.div>
  )
}
