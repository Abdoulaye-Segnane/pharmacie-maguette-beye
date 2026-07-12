import { contact, PHARMACY_NAME, WHATSAPP_NUMBER } from '@/lib/constants'
import { formatPhone, toTelUri } from '@/lib/utils'
import AnimatedSection from '@/components/ui/AnimatedSection'

const WHATSAPP_MESSAGE = encodeURIComponent(
  'Bonjour, je souhaite obtenir des informations sur vos services.',
)
const MAPS_SRC = `https://maps.google.com/maps?q=Pharmacie+Maguette+Beye+Kaolack+Senegal&output=embed`

export default function ContactCTA() {
  return (
    <section className="py-24 bg-white border-t-4 border-terra">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-green-dark md:text-4xl">Venez nous rendre visite</h2>
          <div className="mx-auto mt-4 h-0.5 w-12 bg-green-primary/50" />
          <p className="mx-auto mt-5 max-w-xl text-gray-dark/70">
            Notre équipe est à votre disposition. Appelez-nous ou passez directement en pharmacie.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          {/* Infos contact */}
          <AnimatedSection>
            <div className="space-y-6">
              <div>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-dark/50">Adresse</h3>
                <p className="text-gray-dark">{contact.address}</p>
              </div>

              <div>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-dark/50">Téléphone</h3>
                <a
                  href={toTelUri(contact.phone)}
                  className="text-lg font-semibold text-green-primary transition-colors hover:text-green-dark"
                >
                  {formatPhone(contact.phone)}
                </a>
              </div>

              <div>
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-dark/50">Email</h3>
                <p className="text-gray-dark">
                  {contact.email}{' '}
                  <span className="text-xs text-gray-dark/50">(bientôt disponible)</span>
                </p>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a
                  href={toTelUri(contact.phone)}
                  className="inline-flex items-center justify-center rounded-lg bg-green-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
                >
                  Appeler maintenant
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-green-primary px-6 py-3 font-semibold text-green-primary transition-colors hover:bg-green-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Google Maps */}
          <AnimatedSection variant="fadeIn">
            <div className="h-72 overflow-hidden rounded-2xl border border-gray-100 shadow-sm lg:h-96">
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
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
