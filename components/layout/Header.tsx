'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks, contact, PHARMACY_BRAND_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import MobileNav from '@/components/layout/MobileNav'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-green-primary/5 backdrop-blur-sm border-b border-green-primary/10">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="text-green-dark font-bold text-sm leading-tight">
            Pharmacie
          </span>
          <span className="text-green-primary text-xs font-medium tracking-widest">
            {PHARMACY_BRAND_NAME}
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'text-green-primary'
                    : 'text-gray-dark hover:text-green-primary',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a href={`tel:${contact.phone}`}>
            <Button variant="outline" size="sm">
              {contact.phone}
            </Button>
          </a>
        </div>

        <button
          className="md:hidden p-2 text-green-dark hover:text-green-primary transition-colors"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="2" y1="5" x2="20" y2="5" />
            <line x1="2" y1="11" x2="20" y2="11" />
            <line x1="2" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </nav>

      <MobileNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={navLinks}
      />
    </header>
  )
}
