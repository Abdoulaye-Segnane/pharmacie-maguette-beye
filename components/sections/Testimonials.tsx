import Card from '@/components/ui/Card'
import AnimatedSection from '@/components/ui/AnimatedSection'
import type { Testimonial } from '@/lib/types'
import testimonialsData from '@/data/testimonials.json'
import type { ReactNode } from 'react'

const testimonials = testimonialsData satisfies Testimonial[]

function StarRating({ rating }: { rating: number }): ReactNode {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? '#D4A574' : 'none'}
          stroke={i < rating ? '#D4A574' : '#D1D5DB'}
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }): ReactNode {
  return (
    <Card className="flex h-full flex-col p-6">
      <StarRating rating={testimonial.rating} />
      <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-dark/80">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="text-sm font-semibold text-green-dark">{testimonial.name}</div>
        <div className="text-xs text-gray-dark/60">{testimonial.role}</div>
      </div>
    </Card>
  )
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-green-dark">
            Ce que disent nos clients
          </h2>
        </AnimatedSection>

        {/* Mobile carousel — CSS scroll-snap */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden">
          {testimonials.map((t) => (
            <div key={t.id} className="w-[85vw] flex-shrink-0 snap-start">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.id} delay={i * 0.1}>
              <TestimonialCard testimonial={t} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
