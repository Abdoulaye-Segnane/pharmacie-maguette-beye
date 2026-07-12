import Link from 'next/link'
import { contact, navLinks, PHARMACY_NAME, PHARMACY_BRAND_NAME, WHATSAPP_NUMBER } from '@/lib/constants'
import { formatHours, formatPhone, toTelUri } from '@/lib/utils'
import PharmacyCross from '@/components/ui/PharmacyCross'
import AfricanPattern from '@/components/ui/AfricanPattern'
import ChevronRight from '@/components/ui/ChevronRight'

const WHATSAPP_MESSAGE = encodeURIComponent('Bonjour, je souhaite obtenir des informations.')

const hoursRows = [
  { label: 'Lun – Ven', slot: contact.hours.weekdays },
  { label: 'Samedi', slot: contact.hours.saturday },
  { label: 'Dimanche', slot: contact.hours.sunday },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-green-dark text-white">
      {/* Motif africain décoratif — coin gauche */}
      <AfricanPattern
        id="footer"
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-1/4 text-gold opacity-[0.05]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">

          {/* Zone 1 (40%) — Marque + coordonnées */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <PharmacyCross className="h-10 w-10 shrink-0 text-green-primary" />
              <div className="leading-tight">
                <span className="block text-lg font-light">Pharmacie</span>
                <span className="block text-sm font-bold tracking-[0.2em] text-gold">
                  {PHARMACY_BRAND_NAME}
                </span>
              </div>
            </div>

            <p className="mt-4 max-w-xs text-sm italic text-white/70">
              Votre pharmacie de confiance au cœur de Kaolack.
            </p>

            <div className="mt-5 h-0.5 w-12 bg-gold" />

            <address className="mt-5 space-y-3 text-sm not-italic text-white/75">
              <p className="flex items-start gap-2.5">
                <svg className="mt-0.5 shrink-0 text-gold" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{contact.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <svg className="shrink-0 text-gold" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href={toTelUri(contact.phone)} className="font-medium transition-colors hover:text-white">
                  {formatPhone(contact.phone)}
                </a>
              </p>
            </address>
          </div>

          {/* Zone 2 (20%) — Liens rapides */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Liens rapides</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/75 transition-colors hover:text-white"
                  >
                    <ChevronRight
                      size={14}
                      className="-translate-x-1 text-gold opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zone 3 (20%) — Horaires */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Horaires</h3>
            <ul className="space-y-2.5 text-sm">
              {hoursRows.map(({ label, slot }) => (
                <li key={label} className="flex items-center justify-between gap-3">
                  <span className="text-white/70">{label}</span>
                  {slot.closed ? (
                    <span className="font-medium text-red-300">Fermé</span>
                  ) : (
                    <span className="font-medium text-white">{formatHours(slot.open, slot.close)}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Zone 4 (20%) — Nous contacter */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Nous contacter</h3>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-primary/85"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={toTelUri(contact.phone)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Appeler
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — fond légèrement plus sombre */}
      <div className="relative z-10 bg-black/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {PHARMACY_NAME}. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link href="/mentions-legales" className="transition-colors hover:text-white">
              Mentions légales
            </Link>
            <span className="text-white/70">Pharmacie agréée — Kaolack, Sénégal</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
