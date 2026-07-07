import type { Metadata } from 'next'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { team } from '@/data/team'

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
      {/* Hero */}
      <section className="bg-green-dark py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <AnimatedSection variant="fadeIn">
            <span className="inline-flex items-center rounded-full bg-gold/20 px-4 py-1.5 text-sm font-medium text-gold ring-1 ring-gold/30">
              Depuis 2005
            </span>
          </AnimatedSection>
          <AnimatedSection variant="slideUp" delay={0.1}>
            <h1 className="mt-6 text-4xl font-bold md:text-5xl">Notre histoire</h1>
          </AnimatedSection>
          <AnimatedSection variant="slideUp" delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              La Pharmacie Maguette Beye est une pharmacie indépendante au service des habitants
              de Kaolack et de la région depuis plus de vingt ans.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <AnimatedSection>
              <div className="relative h-72 overflow-hidden rounded-2xl lg:h-96">
                <Image
                  src="https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80"
                  alt="Intérieur de la Pharmacie Maguette Beye"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl font-bold text-green-dark mb-6">Une pharmacie de confiance</h2>
              <div className="space-y-4 text-gray-dark/80 leading-relaxed">
                <p>
                  Fondée en 2005 par Maguette Beye, pharmacienne diplômée de la Faculté de Médecine
                  de Dakar, notre officine s&rsquo;est imposée comme un acteur de référence de la
                  santé à Kaolack.
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
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-green-dark">Notre équipe</h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-dark/70">
              Des professionnels de santé dévoués, à votre service chaque jour.
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
                  <div className="mt-1 text-sm text-gray-dark/60">{member.role}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-green-dark">Nos valeurs</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {values.map((value, i) => (
              <AnimatedSection key={value.id} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-primary/10 text-green-primary">
                    {value.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-green-dark">{value.title}</h3>
                  <p className="text-sm text-gray-dark/70 leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
