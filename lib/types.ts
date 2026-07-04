// lib/types.ts
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface HoursSlot {
  open: string;
  close: string;
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
}

export interface Product {
  id: string
  name: string
  slug: string
  category: string
  description: string
  image: string
  available: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}
