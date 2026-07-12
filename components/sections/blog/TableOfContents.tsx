'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TocEntry {
  id: string
  title: string
}

interface TableOfContentsProps {
  toc: TocEntry[]
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (toc.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-10% 0% -70% 0%' },
    )

    toc.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [toc])

  if (toc.length === 0) return null

  return (
    <nav aria-label="Sommaire" className="rounded-xl border border-gray-100 bg-gray-50 p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-dark/70">
        Sommaire
      </p>
      <ol className="space-y-2">
        {toc.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                'block text-sm transition-colors',
                activeId === id
                  ? 'font-semibold text-green-primary'
                  : 'text-gray-dark/70 hover:text-green-primary',
              )}
            >
              {title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
