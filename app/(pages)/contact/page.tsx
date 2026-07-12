import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import { contact, PHARMACY_NAME } from '@/lib/constants'
import { formatPhone, toTelUri } from '@/lib/utils'
import ContactForm from '@/components/sections/contact/ContactForm'

export const metadata: Metadata = genMeta({
  title: 'Contact',
  description:
    'Contactez la Pharmacie Maguette Beye à Kaolack. Formulaire en ligne, téléphone ou venez directement en pharmacie.',
  canonical: '/contact',
})

const MAPS_SRC = `https://maps.google.com/maps?q=Pharmacie+Maguette+Beye+Kaolack+Senegal&output=embed`

export default function ContactPage() {
  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-green-dark">Contactez-nous</h1>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-green-primary/50" />
          <p className="mx-auto mt-5 max-w-xl text-gray-dark/70">
            Notre équipe est à votre écoute. Remplissez le formulaire ou contactez-nous directement.
          </p>
        </div>

        {/* 60/40 : formulaire gauche, infos droite */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:items-start">
          {/* Formulaire — 3/5 ≈ 60% */}
          <div className="lg:col-span-3 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <h2 className="mb-6 text-xl font-bold text-green-dark">Envoyer un message</h2>
            <ContactForm />
          </div>

          {/* Infos — 2/5 ≈ 40% */}
          <div className="lg:col-span-2 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <h2 className="mb-6 text-xl font-bold text-green-dark">Nos coordonnées</h2>
            <dl className="space-y-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-dark/70">
                  Adresse
                </dt>
                <dd className="mt-1 text-sm text-gray-dark leading-relaxed">{contact.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-dark/70">
                  Téléphone
                </dt>
                <dd className="mt-1">
                  <a
                    href={toTelUri(contact.phone)}
                    className="text-lg font-bold text-green-primary hover:text-green-dark transition-colors"
                  >
                    {formatPhone(contact.phone)}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-dark/70">
                  Email
                </dt>
                <dd className="mt-1 text-sm text-gray-dark">
                  {contact.email}{' '}
                  <span className="text-xs text-gray-dark/70">(bientôt disponible)</span>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-dark/70">
                  Horaires
                </dt>
                <dd className="mt-1 space-y-1 text-sm text-gray-dark/80">
                  <p>Lun–Ven : {contact.hours.weekdays.open} – {contact.hours.weekdays.close}</p>
                  <p>Samedi : {contact.hours.saturday.open} – {contact.hours.saturday.close}</p>
                  <p>Dimanche : {contact.hours.sunday.closed ? 'Fermé' : `${contact.hours.sunday.open} – ${contact.hours.sunday.close}`}</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Carte Google Maps — pleine largeur */}
        <div className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm h-80">
            <iframe
              src={MAPS_SRC}
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localisation ${PHARMACY_NAME}`}
              className="border-0"
            />
          </div>
          <p className="mt-3 text-center text-xs text-gray-dark/70">
            Si la carte ne s&apos;affiche pas : {contact.address}
          </p>
        </div>
      </div>
    </section>
  )
}
