'use client'

import { useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { NavItem } from '@/lib/types'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links: NavItem[]
}

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <m.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed top-0 right-0 h-full w-72 bg-white z-50 flex flex-col shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-semibold text-green-dark">Menu</span>
              <button
                onClick={onClose}
                className="p-2 text-gray-dark hover:text-green-primary transition-colors"
                aria-label="Fermer le menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col p-4 gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block px-3 py-2.5 rounded-lg text-gray-dark hover:bg-green-primary/10 hover:text-green-primary transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </m.nav>
        </>
      )}
    </AnimatePresence>
  )
}
