// lib/constants.ts
import type { ContactInfo, NavItem } from './types';

export const PHARMACY_NAME    = 'Pharmacie Maguette Beye' as const;
export const PHARMACY_BRAND_NAME = 'MAGUETTE BEYE' as const;
export const PHARMACY_CITY    = 'Kaolack' as const;
export const PHARMACY_COUNTRY = 'Sénégal' as const;
export const SITE_URL         = 'https://pharmaciemaguettebeye.sn' as const;
export const HERO_IMAGE_URL   = 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=1920&q=80' as const;
export const WHATSAPP_NUMBER  = '221770000000' as const;

export const contact: ContactInfo = {
  phone:   '+221 33 941 00 00',
  email:   'contact@pharmaciemaguettebeye.sn',
  address: 'Kaolack, Sénégal',
  hours: {
    weekdays: { open: '08h00', close: '20h00' },
    saturday: { open: '08h00', close: '18h00' },
    sunday:   { open: '09h00', close: '14h00' },
  },
};

export const navLinks: NavItem[] = [
  { label: 'Accueil',   href: '/' },
  { label: 'Services',  href: '/services' },
  { label: 'À propos',  href: '/a-propos' },
  { label: 'Contact',   href: '/contact' },
];
