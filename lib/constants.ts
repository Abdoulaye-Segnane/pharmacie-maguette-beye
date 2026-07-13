// lib/constants.ts
import type { ContactInfo, NavItem } from './types';

export const PHARMACY_NAME       = 'Pharmacie Maguette Beye' as const;
export const PHARMACY_BRAND_NAME = 'MAGUETTE BEYE' as const;
export const PHARMACY_CITY       = 'Kaolack' as const;
export const PHARMACY_COUNTRY    = 'Sénégal' as const;
export const SITE_URL            = 'https://pharmacie-maguette-beye.vercel.app' as const;
export const HERO_IMAGE_URL       = 'https://images.unsplash.com/photo-1666886573583-9839aafe43cf?w=1920&q=80' as const;
export const ABOUT_HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1609188076864-c35269136b09?w=1920&q=80' as const;
export const WHATSAPP_NUMBER     = '221339421192' as const;
export const RESEND_FROM_EMAIL   = 'onboarding@resend.dev' as const;
export const RESEND_TO_EMAIL     = 'segnanelaye@gmail.com' as const;

export const contact: ContactInfo = {
  phone:   '+221 33 942 11 92',
  email:   'contact@pharmaciemaguettebeye.sn',
  address: 'Dialègne N°4766, derrière Nouveau Bloc Scientifique du Collège, Kaolack',
  hours: {
    weekdays: { open: '08h00', close: '22h00' },
    saturday: { open: '08h00', close: '13h00' },
    sunday:   { open: '', close: '', closed: true },
  },
};

export const navLinks: NavItem[] = [
  { label: 'Accueil',   href: '/' },
  { label: 'Catalogue', href: '/catalog' },
  { label: 'Blog',      href: '/blog' },
  { label: 'À propos',  href: '/a-propos' },
  { label: 'Contact',   href: '/contact' },
];
