import Image from 'next/image'
import Link from 'next/link'
import { contact } from '@/lib/constants'
import AnimatedSection from '@/components/ui/AnimatedSection'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1576671081837-49000212a370?w=1920&q=80'

export default function Hero() {
  return (
    <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden h-[90vh]">
      <Image
        src={HERO_IMAGE}
        alt="Pharmacie Maguette Beye — Kaolack, Sénégal"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-green-dark/65" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
        <AnimatedSection variant="fadeIn">
          <span className="inline-flex items-center rounded-full bg-gold/20 px-4 py-1.5 text-sm font-medium text-gold ring-1 ring-gold/30">
            Pharmacie de confiance à Kaolack
          </span>
        </AnimatedSection>

        <AnimatedSection variant="slideUp" delay={0.1}>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Votre santé,<br />notre priorité
          </h1>
        </AnimatedSection>

        <AnimatedSection variant="slideUp" delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/85 md:text-xl">
            Médicaments authentiques, conseils experts et service chaleureux
            au cœur de Kaolack, Sénégal.
          </p>
        </AnimatedSection>

        <AnimatedSection variant="slideUp" delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex items-center rounded-lg bg-gold px-7 py-3.5 text-base font-semibold text-green-dark transition-colors duration-200 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              Voir nos services
            </Link>
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex items-center rounded-lg border-2 border-white/80 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Nous appeler
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
