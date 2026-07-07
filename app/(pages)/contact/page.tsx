import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import { contact } from '@/lib/constants'
import { formatPhone, toTelUri } from '@/lib/utils'
import ContactForm from '@/components/sections/contact/ContactForm'

export const metadata: Metadata = genMeta({
  title: 'Contact',
  description:
    'Contactez la Pharmacie Maguette Beye à Kaolack. Formulaire en ligne, téléphone ou venez directement en pharmacie.',
  canonical: '/contact',
})

export default function ContactPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-green-dark">Contactez-nous</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-dark/70">
            Notre équipe est à votre écoute. Remplissez le formulaire ou contactez-nous directement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          {/* Infos de contact */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <h2 className="mb-6 text-xl font-semibold text-green-dark">Nos coordonnées</h2>
            <dl className="space-y-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-dark/50">
                  Adresse
                </dt>
                <dd className="mt-1 text-gray-dark">{contact.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-dark/50">
                  Téléphone
                </dt>
                <dd className="mt-1">
                  <a
                    href={toTelUri(contact.phone)}
                    className="text-lg font-semibold text-green-primary hover:text-green-dark transition-colors"
                  >
                    {formatPhone(contact.phone)}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-dark/50">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gray-dark hover:text-green-primary transition-colors"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-dark/50">
                  Horaires
                </dt>
                <dd className="mt-1 space-y-1 text-sm text-gray-dark/80">
                  <p>Lun–Ven : {contact.hours.weekdays.open} – {contact.hours.weekdays.close}</p>
                  <p>Samedi : {contact.hours.saturday.open} – {contact.hours.saturday.close}</p>
                  <p>Dimanche : {contact.hours.sunday.open} – {contact.hours.sunday.close}</p>
                </dd>
              </div>
            </dl>
          </div>

          {/* Formulaire */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <h2 className="mb-6 text-xl font-semibold text-green-dark">Envoyer un message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
