import type { FaqItem } from '@/lib/types'
import { contact, PHARMACY_CITY, PHARMACY_COUNTRY } from '@/lib/constants'
import { formatPhone } from '@/lib/utils'

/**
 * Questions fréquentes — source unique pour l'affichage (composant Faq)
 * ET le balisage structuré FAQPage (JSON-LD sur la page d'accueil).
 */
export const faqs: FaqItem[] = [
  {
    question: 'Où se trouve la Pharmacie Maguette Beye ?',
    answer: `La Pharmacie Maguette Beye est située à ${contact.address}, à ${PHARMACY_CITY} (${PHARMACY_COUNTRY}), à quelques minutes du marché central. Elle est facilement accessible pour toute la région du Sine-Saloum.`,
  },
  {
    question: 'Quels sont les horaires de la pharmacie ?',
    answer: `Nous sommes ouverts du lundi au vendredi de ${contact.hours.weekdays.open} à ${contact.hours.weekdays.close}, et le samedi de ${contact.hours.saturday.open} à ${contact.hours.saturday.close}. La pharmacie est fermée le dimanche, en dehors des services de garde.`,
  },
  {
    question: 'La pharmacie assure-t-elle les gardes ?',
    answer:
      "Oui. Les jours fériés (fêtes nationales et religieuses), nous assurons un service de garde, généralement de 09h00 à 14h00. Les prochaines dates de garde sont affichées sur notre page d'accueil.",
  },
  {
    question: 'Comment contacter le pharmacien ?',
    answer: `Vous pouvez nous joindre par téléphone au ${formatPhone(contact.phone)}, via WhatsApp, ou en passant directement à la pharmacie à ${PHARMACY_CITY}. Un formulaire de contact est également disponible sur notre site.`,
  },
  {
    question: 'La pharmacie vend-elle des médicaments génériques ?',
    answer:
      "Oui. Nous proposons des médicaments génériques agréés — équivalents thérapeutiques des médicaments de marque, à un coût plus accessible — aux côtés des spécialités. Nos pharmaciens vous conseillent sur l'option la mieux adaptée à votre traitement.",
  },
]
