import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Hours from '@/components/sections/Hours'
import Testimonials from '@/components/sections/Testimonials'
import BlogPreview from '@/components/sections/BlogPreview'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = genMeta({
  title: 'Accueil',
  description:
    'Pharmacie Maguette Beye — Médicaments authentiques, conseil personnalisé et service chaleureux au cœur de Kaolack, Sénégal.',
  canonical: '/',
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Hours />
      <Testimonials />
      <BlogPreview />
      <ContactCTA />
    </>
  )
}
