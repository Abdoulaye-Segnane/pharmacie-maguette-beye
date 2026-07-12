import type { Metadata } from 'next'
import Link from 'next/link'
import { generateMetadata as genMeta } from '@/lib/seo'
import { contact, PHARMACY_NAME, PHARMACY_CITY, PHARMACY_COUNTRY } from '@/lib/constants'
import { formatPhone, toTelUri } from '@/lib/utils'

export const metadata: Metadata = genMeta({
  title: 'Mentions légales',
  description:
    'Mentions légales de la Pharmacie Maguette Beye à Kaolack : éditeur du site, hébergeur, contact et avertissement médical.',
  canonical: '/mentions-legales',
})

export default function MentionsLegalesPage() {
  return (
    <section className="min-h-screen bg-white py-16">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-green-dark">Mentions légales</h1>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-green-primary/50" />
        </div>

        <div className="space-y-10 leading-relaxed text-gray-dark/80">
          <div>
            <h2 className="mb-3 text-xl font-bold text-green-dark">Éditeur du site</h2>
            <p>
              {PHARMACY_NAME}
              <br />
              Directeur de la publication : Dr Mamadou Ndiaye, pharmacien titulaire
              <br />
              {contact.address}
              <br />
              {PHARMACY_CITY}, {PHARMACY_COUNTRY}
              <br />
              Téléphone :{' '}
              <a
                href={toTelUri(contact.phone)}
                className="text-green-primary transition-colors hover:text-green-dark"
              >
                {formatPhone(contact.phone)}
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-green-dark">Hébergement</h2>
            <p>
              Ce site est hébergé par Vercel Inc.
              <br />
              340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
              <br />
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-primary transition-colors hover:text-green-dark"
              >
                vercel.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-green-dark">Contact</h2>
            <p>
              Pour toute question, contactez-nous par téléphone au{' '}
              <a
                href={toTelUri(contact.phone)}
                className="text-green-primary transition-colors hover:text-green-dark"
              >
                {formatPhone(contact.phone)}
              </a>{' '}
              ou via notre{' '}
              <Link href="/contact" className="text-green-primary transition-colors hover:text-green-dark">
                formulaire de contact
              </Link>
              .
              <br />
              Adresse e-mail : {contact.email}{' '}
              <span className="text-sm text-gray-dark/50">(bientôt disponible)</span>
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-green-dark">Propriété intellectuelle</h2>
            <p>
              L&rsquo;ensemble des contenus (textes, images, logo) présents sur ce site est la
              propriété de {PHARMACY_NAME}, sauf mention contraire. Toute reproduction, même
              partielle, sans autorisation préalable est interdite.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-bold text-green-dark">Avertissement médical</h2>
            <p>
              Les informations publiées sur ce site sont fournies à titre indicatif et ne remplacent
              en aucun cas une consultation, un diagnostic ou un avis médical professionnel.
              Consultez toujours votre médecin ou votre pharmacien avant toute prise de médicament.
              En cas d&rsquo;urgence, contactez immédiatement les services de secours.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
