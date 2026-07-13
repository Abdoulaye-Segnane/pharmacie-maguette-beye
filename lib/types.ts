// lib/types.ts
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface HoursSlot {
  open: string;
  close: string;
  /** Si true, le jour est fermé — open/close ignorés, affiché « Fermé ». */
  closed?: boolean;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: {
    weekdays: HoursSlot;
    saturday: HoursSlot;
    sunday: HoursSlot;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    image?: string;
    type?: string;
  };
}

export type ColorPalette = {
  readonly greenPrimary: string;
  readonly greenDark: string;
  readonly gold: string;
  readonly white: string;
  readonly grayDark: string;
};

export interface Testimonial {
  id: string
  name: string
  role: string
  rating: number
  text: string
}

export interface Article {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
  category: string
}

export interface Feature {
  id: string
  title: string
  description: string
  icon: 'shield' | 'user' | 'heart' | 'map-pin'
  stat: string
}

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  description: string
  /** URL de la photo produit, ou null pour afficher le placeholder uniforme. */
  image: string | null
  /** Prix indicatif en FCFA (franc CFA, XOF). */
  price: number
  available: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface GardeEntry {
  /** Date ISO au format YYYY-MM-DD. */
  date: string
  /** « Fête nationale » | « Fête musulmane » | « Fête chrétienne ». */
  type: string
  label: string
  heures_ouverture: string
  heures_fermeture: string
  note: string
}

