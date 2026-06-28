import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  color?: 'green' | 'gold' | 'gray'
  children: ReactNode
  className?: string
}

const colorClasses: Record<NonNullable<BadgeProps['color']>, string> = {
  green: 'bg-green-primary/10 text-green-dark',
  gold: 'bg-gold/20 text-amber-800',
  gray: 'bg-gray-100 text-gray-dark',
}

export default function Badge({
  color = 'green',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        colorClasses[color],
        className,
      )}
    >
      {children}
    </span>
  )
}
