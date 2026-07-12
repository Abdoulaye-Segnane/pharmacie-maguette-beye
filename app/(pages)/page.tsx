import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import GardesSkeleton from '@/components/sections/GardesSkeleton'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Hours from '@/components/sections/Hours'
import GardesSection from '@/components/sections/GardesSection'
import Testimonials from '@/components/sections/Testimonials'
import BlogPreview from '@/components/sections/BlogPreview'
import Faq from '@/components/sections/Faq'
import ContactCTA from '@/components/sections/ContactCTA'
import { faqs } from '@/data/faq'

export const metadata: Metadata = genMeta({
  title: 'Accueil',
  description:
    'Pharmacie Maguette Beye — Médicaments authentiques, conseil personnalisé et service chaleureux au cœur de Kaolack, Sénégal.',
  canonical: '/',
})

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  })),
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero />
      <Features />
      <Hours />
      <Suspense fallback={<GardesSkeleton />}>
        <GardesSection />
      </Suspense>
      <Testimonials />
      <BlogPreview />
      <Faq />
      <ContactCTA />
    </>
  )
}
