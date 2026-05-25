// lib/constants.ts
import type { ContactInfo, NavItem } from './types';

export const PHARMACY_NAME    = 'Pharmacie Maguette Beye' as const;
export const PHARMACY_CITY    = 'Kaolack' as const;
export const PHARMACY_COUNTRY = 'Sénégal' as const;
export const SITE_URL         = 'https://pharmaciemaguettebeye.sn' as const;

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
