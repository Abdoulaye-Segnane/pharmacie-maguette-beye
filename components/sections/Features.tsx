import Card from '@/components/ui/Card'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { features } from '@/data/features'
import type { Feature } from '@/lib/types'
import type { ReactNode } from 'react'

const iconMap: Record<Feature['icon'], ReactNode> = {
  shield: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  user: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  heart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  'map-pin': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
}

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-green-dark">
            Pourquoi nous choisir ?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-dark/70">
            Une pharmacie à l'écoute, engagée pour votre bien-être et celui de votre famille.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.id} delay={i * 0.1}>
              <Card className="flex h-full flex-col p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-primary/10 text-green-primary">
                  {iconMap[feature.icon]}
                </div>
                <h3 className="mb-2 font-semibold text-green-dark">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-dark/70">{feature.description}</p>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
