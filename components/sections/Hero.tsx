import Image from 'next/image'
import Link from 'next/link'
import { contact, HERO_IMAGE_URL } from '@/lib/constants'
import { toTelUri } from '@/lib/utils'
import AnimatedSection from '@/components/ui/AnimatedSection'
import PharmacyCross from '@/components/ui/PharmacyCross'
import AfricanPattern from '@/components/ui/AfricanPattern'
import ChevronRight from '@/components/ui/ChevronRight'

export default function Hero() {
  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden h-[90vh]">
      <Image
        src={HERO_IMAGE_URL}
        alt="Pharmacie Maguette Beye — Kaolack, Sénégal"
        fill
        sizes="100vw"
        quality={55}
        loading="eager"
        fetchPriority="high"
        className="object-cover object-center"
      />

      {/* Gradient directionnel : gauche sombre → droite transparent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(26,77,53,0.92) 0%, rgba(26,77,53,0.60) 42%, rgba(26,77,53,0.15) 68%, transparent 88%)',
        }}
      />

      {/* Motif africain décoratif — coin droit */}
      <AfricanPattern
        id="hero"
        className="pointer-events-none absolute right-0 top-0 bottom-0 hidden w-1/3 text-gold opacity-[0.07] md:block"
      />

      {/* Croix watermark décorative */}
      <div
        className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block opacity-10 text-white"
        aria-hidden="true"
      >
        <PharmacyCross className="h-80 w-80" />
      </div>

      {/* Contenu — aligné à gauche sur ~50% */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="max-w-xl text-white">
          <AnimatedSection variant="fadeIn">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 text-sm font-medium text-gold ring-1 ring-gold/30">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gold animate-ping opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              Au cœur de Kaolack depuis 2010
            </span>
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.1}>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Votre santé,<br />notre priorité
            </h1>
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.2}>
            <p className="mt-6 text-lg text-white/85 md:text-xl">
              Médicaments authentiques et conseil personnalisé
              pour toute la région du Sine-Saloum.
            </p>
          </AnimatedSection>

          <AnimatedSection variant="slideUp" delay={0.3}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold px-7 py-3.5 text-base font-semibold text-green-dark transition-colors duration-200 hover:bg-gold/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                Voir nos produits
                <ChevronRight size={18} />
              </Link>
              <a
                href={toTelUri(contact.phone)}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/80 px-7 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Nous appeler
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
