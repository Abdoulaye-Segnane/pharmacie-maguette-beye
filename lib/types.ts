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
