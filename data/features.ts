import type { Feature } from '@/lib/types'

export const features: Feature[] = [
  {
    id: '1',
    title: 'Médicaments authentiques',
    description: 'Tous nos produits sont sourcés auprès de distributeurs agréés. Qualité et traçabilité garanties.',
    icon: 'shield',
    stat: 'Agréé par l\'ARP Sénégal',
  },
  {
    id: '2',
    title: 'Pharmacien disponible',
    description: 'Notre équipe qualifiée est à votre écoute du lundi au samedi pour répondre à vos questions de santé.',
    icon: 'user',
    stat: 'Disponibles 6j/7',
  },
  {
    id: '3',
    title: 'Conseil personnalisé',
    description: 'Nous prenons le temps de comprendre votre situation pour un accompagnement adapté.',
    icon: 'heart',
    stat: 'À l\'écoute de chaque patient',
  },
  {
    id: '4',
    title: 'Localisation centrale',
    description: 'Situés au cœur de Kaolack, nous sommes facilement accessibles pour toute la région.',
    icon: 'map-pin',
    stat: 'À 5 min du marché central de Kaolack',
  },
]
