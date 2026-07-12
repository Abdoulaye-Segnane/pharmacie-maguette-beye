import AnimatedSection from '@/components/ui/AnimatedSection'
import type { Testimonial } from '@/lib/types'
import testimonialsData from '@/data/testimonials.json'
import type { ReactNode } from 'react'

const testimonials = testimonialsData satisfies Testimonial[]

const AVATAR_COLORS = [
  'bg-green-primary',
  'bg-gold/90',
  'bg-teal-600',
  'bg-emerald-700',
] as const

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function InitialAvatar({ name, index }: { name: string; index: number }): ReactNode {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length]
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${color}`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  )
}

function StarRating({ rating }: { rating: number }): ReactNode {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? '#D4A574' : 'none'}
          stroke={i < rating ? '#D4A574' : 'rgba(255,255,255,0.25)'}
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }): ReactNode {
  return (
    <div className="flex h-full flex-col rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
      <StarRating rating={testimonial.rating} />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/85">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <InitialAvatar name={testimonial.name} index={index} />
        <div>
          <div className="text-sm font-semibold text-white">{testimonial.name}</div>
          <div className="text-xs text-white/55">{testimonial.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-green-dark text-white border-t border-green-primary/20">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection className="mb-14 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ce que disent nos clients
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-gold/60" />
        </AnimatedSection>

        {/* Carousel mobile → grille 2 colonnes desktop.
            Une seule liste rendue : aucun doublon dans le DOM. */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:snap-none md:pb-0">
          {testimonials.map((t, i) => (
            <AnimatedSection
              key={t.id}
              delay={i * 0.1}
              className="w-[85vw] shrink-0 snap-start md:w-auto md:shrink"
            >
              <TestimonialCard testimonial={t} index={i} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
