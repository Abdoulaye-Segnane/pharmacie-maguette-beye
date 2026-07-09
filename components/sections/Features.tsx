import AnimatedSection from '@/components/ui/AnimatedSection'
import PharmacyCross from '@/components/ui/PharmacyCross'
import { features } from '@/data/features'
import type { Feature } from '@/lib/types'
import type { ReactNode } from 'react'

const iconMap: Record<Feature['icon'], ReactNode> = {
  shield: <PharmacyCross className="h-12 w-12" />,
  user: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  heart: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  'map-pin': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
}

export default function Features() {
  return (
    <section className="py-24 bg-white border-t border-green-primary/10">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-green-dark md:text-4xl">
            Pourquoi nous choisir ?
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-green-primary/50" />
          <p className="mx-auto mt-5 max-w-xl text-gray-dark/70">
            Une pharmacie à l'écoute, engagée pour votre bien-être et celui de votre famille.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.id} delay={i * 0.1}>
              <div className="flex gap-6 items-start">
                <div className="shrink-0 text-green-primary">
                  {iconMap[feature.icon]}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-dark">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-dark/70 leading-relaxed">{feature.description}</p>
                  <p className="mt-3 text-sm font-semibold text-green-primary">{feature.stat}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
