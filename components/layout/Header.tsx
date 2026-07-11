'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navLinks, contact, PHARMACY_BRAND_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'
import MobileNav from '@/components/layout/MobileNav'
import PharmacyCross from '@/components/ui/PharmacyCross'

// Routes avec un hero sombre pleine largeur derrière le header :
// seules celles-ci autorisent l'état transparent / texte blanc en haut de page.
// Sur toutes les autres routes (fond clair), le header reste solide dès le top
// pour rester lisible.
const HERO_ROUTES = new Set(['/', '/a-propos'])

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const hasHero = HERO_ROUTES.has(pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll() // état initial (ex. rechargement au milieu de la page)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mode « overlay » : transparent + texte blanc par-dessus le hero.
  const overlay = hasHero && !scrolled

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-colors duration-300',
          overlay
            // Scrim sombre subtil : le hero a un gradient horizontal (sombre à
            // gauche → transparent à droite), or le header occupe toute la largeur.
            // Ce voile haut→bas garantit que le contenu aligné à droite (nav, CTA,
            // burger) reste lisible même par-dessus la partie claire de la photo,
            // tout en laissant voir le hero au travers.
            ? 'bg-gradient-to-b from-black/40 to-transparent border-b border-transparent'
            : 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm',
        )}
      >
        <nav
          className={cn(
            'max-w-6xl mx-auto px-4 h-16 flex items-center justify-between',
            overlay && 'drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]',
          )}
        >
          <Link href="/" className="flex items-center gap-2.5">
            <PharmacyCross
              className={cn(
                'h-6 w-6 shrink-0 transition-colors duration-300',
                overlay ? 'text-white' : 'text-green-primary',
              )}
            />
            <div className="flex flex-col">
              <span
                className={cn(
                  'font-bold text-sm leading-tight transition-colors duration-300',
                  overlay ? 'text-white' : 'text-green-dark',
                )}
              >
                Pharmacie
              </span>
              <span
                className={cn(
                  'text-xs font-medium tracking-widest transition-colors duration-300',
                  overlay ? 'text-gold' : 'text-green-primary',
                )}
              >
                {PHARMACY_BRAND_NAME}
              </span>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors duration-300',
                      overlay
                        ? isActive
                          ? 'text-white'
                          : 'text-white/80 hover:text-white'
                        : isActive
                          ? 'text-green-primary'
                          : 'text-gray-dark hover:text-green-primary',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <a
            href={`tel:${contact.phone}`}
            className={cn(
              'hidden md:inline-flex items-center rounded-lg font-semibold text-sm px-3 py-1.5 border-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2',
              overlay
                ? 'border-white text-white hover:bg-white hover:text-green-dark focus-visible:ring-white'
                : 'border-green-primary text-green-primary hover:bg-green-primary hover:text-white focus-visible:ring-green-primary',
            )}
          >
            {contact.phone}
          </a>

          <button
            className={cn(
              'md:hidden p-2 transition-colors duration-300',
              overlay ? 'text-white hover:text-white/70' : 'text-green-dark hover:text-green-primary',
            )}
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
      </header>

      {/* Espaceur : compense la hauteur du header fixe sur les pages sans hero.
          Sur les pages avec hero, aucun espaceur → le hero passe sous le header. */}
      {!hasHero && <div className="h-16" aria-hidden="true" />}

      <MobileNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={navLinks}
      />
    </>
  )
}
