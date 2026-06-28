import Link from 'next/link'
import { contact, navLinks, PHARMACY_NAME } from '@/lib/constants'
import { formatHours, formatPhone } from '@/lib/utils'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-green-dark text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="mb-4">
              <span className="font-bold text-sm block leading-tight">
                Pharmacie
              </span>
              <span className="text-green-primary text-xs font-medium tracking-widest block">
                MAGUETTE BEYE
              </span>
            </div>
            <address className="not-italic text-sm text-white/80 space-y-1">
              <p>{contact.address}</p>
              <p>
                <a
                  href={`tel:${contact.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {formatPhone(contact.phone)}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              </p>
            </address>
            <div className="mt-4 text-sm text-white/70 space-y-0.5">
              <p>
                Lun–Ven :{' '}
                {formatHours(
                  contact.hours.weekdays.open,
                  contact.hours.weekdays.close,
                )}
              </p>
              <p>
                Samedi :{' '}
                {formatHours(
                  contact.hours.saturday.open,
                  contact.hours.saturday.close,
                )}
              </p>
              <p>
                Dimanche :{' '}
                {formatHours(
                  contact.hours.sunday.open,
                  contact.hours.sunday.close,
                )}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/60 uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/50">
          © {currentYear} {PHARMACY_NAME}. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
