import type { Metadata } from 'next'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import AnimatedSection from '@/components/ui/AnimatedSection'
import PharmacyCross from '@/components/ui/PharmacyCross'
import { team } from '@/data/team'
import { ABOUT_HERO_IMAGE_URL } from '@/lib/constants'

export const metadata: Metadata = genMeta({
  title: 'À propos',
  description:
    'Découvrez l\'histoire, l\'équipe et les valeurs de la Pharmacie Maguette Beye à Kaolack, Sénégal.',
  canonical: '/a-propos',
})

const values = [
  {
    id: '1',
    title: 'Authenticité',
    description: 'Tous nos médicaments proviennent de distributeurs agréés. Aucun compromis sur la qualité.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: '2',
    title: 'Proximité',
    description: 'Au cœur de Kaolack, nous sommes votre pharmacie de quartier. Disponibles, à l\'écoute.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: '3',
    title: 'Excellence',
    description: 'Conseil personnalisé, formation continue, équipe qualifiée. Votre santé mérite le meilleur.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero — même traitement gradient que la page d'accueil */}
      <section className="relative flex min-h-[420px] items-center overflow-hidden">
        <Image
          src={ABOUT_HERO_IMAGE_URL}
          alt="Pharmacien de la Pharmacie Maguette Beye"
          fill
          sizes="100vw"
          quality={55}
          loading="eager"
          fetchPriority="high"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(26,77,53,0.92) 0%, rgba(26,77,53,0.60) 42%, rgba(26,77,53,0.15) 68%, transparent 88%)',
          }}
        />
        {/* Croix watermark */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block opacity-10 text-white"
          aria-hidden="true"
        >
          <PharmacyCross className="h-64 w-64" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-xl text-white">
            <AnimatedSection variant="fadeIn">
              <span className="inline-flex items-center rounded-full bg-gold/20 px-4 py-1.5 text-sm font-medium text-gold ring-1 ring-gold/30">
                Depuis 2010
              </span>
            </AnimatedSection>
            <AnimatedSection variant="slideUp" delay={0.1}>
              <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">Notre histoire</h1>
            </AnimatedSection>
            <AnimatedSection variant="slideUp" delay={0.2}>
              <p className="mt-6 text-lg text-white/85">
                Une pharmacie indépendante au service des habitants de Kaolack
                et de toute la région du Sine-Saloum depuis 2010.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-24 bg-white border-t border-green-primary/10">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <AnimatedSection>
              <div className="relative h-72 overflow-hidden rounded-2xl lg:h-96">
                <Image
                  src="https://images.unsplash.com/photo-1758573467057-955f803660a9?w=800&q=80"
                  alt="Pharmacien préparant une ordonnance à la Pharmacie Maguette Beye"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl font-bold text-green-dark mb-4">Une pharmacie de confiance</h2>
              <div className="h-0.5 w-10 bg-green-primary/50 mb-6" />
              <div className="space-y-4 text-gray-dark/80 leading-relaxed">
                <p>
                  Fondée en 2010 par le Dr Mamadou Ndiaye, pharmacien diplômé de la Faculté de
                  Médecine de Dakar, notre officine s&rsquo;est imposée comme un acteur de
                  référence de la santé à Kaolack.
                </p>
                <p>
                  Notre mission est simple : rendre les soins de qualité accessibles à tous, avec
                  une attention particulière portée aux familles, aux enfants et aux personnes âgées.
                </p>
                <p>
                  Chaque jour, notre équipe de professionnels de santé accueille des dizaines de
                  patients avec bienveillance, compétence et discrétion.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-24 bg-white border-t border-green-primary/10">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-green-dark">Notre équipe</h2>
            <div className="mx-auto mt-4 h-0.5 w-12 bg-green-primary/50" />
            <p className="mx-auto mt-5 max-w-xl text-gray-dark/70">
              Des professionnels de santé dévoués, à votre service du lundi au samedi.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {team.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                  <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="font-semibold text-green-dark">{member.name}</div>
                  <div className="mt-1 text-sm text-gray-dark/70">{member.role}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-24 bg-white border-t border-green-primary/10">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-green-dark">Nos valeurs</h2>
            <div className="mx-auto mt-4 h-0.5 w-12 bg-green-primary/50" />
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {values.map((value, i) => (
              <AnimatedSection key={value.id} delay={i * 0.1}>
                <div className="flex gap-5 items-start">
                  <div className="shrink-0 text-green-primary">{value.icon}</div>
                  <div>
                    <h3 className="font-bold text-green-dark text-lg">{value.title}</h3>
                    <p className="mt-2 text-sm text-gray-dark/70 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
