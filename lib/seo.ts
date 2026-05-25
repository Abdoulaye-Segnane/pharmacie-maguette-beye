// lib/seo.ts
import type { Metadata } from 'next';
import type { SeoConfig } from './types';
import {
  PHARMACY_NAME,
  PHARMACY_CITY,
  PHARMACY_COUNTRY,
  SITE_URL,
} from './constants';

export const baseMetadata: Metadata = {
  title: {
    default:  PHARMACY_NAME,
    template: `%s | ${PHARMACY_NAME}`,
  },
  description: `${PHARMACY_NAME} — Votre pharmacie de confiance à ${PHARMACY_CITY}, ${PHARMACY_COUNTRY}. Médicaments, conseils santé, parapharmacie.`,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: PHARMACY_NAME,
    locale:   'fr_SN',
    type:     'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export function generateMetadata(config: SeoConfig): Metadata {
  return {
    title:       config.title,
    description: config.description,
    alternates:  config.canonical ? { canonical: config.canonical } : undefined,
    openGraph: {
      title:       config.title,
      description: config.description,
      type: (config.openGraph?.type as 'website' | 'article') ?? 'website',
      ...(config.openGraph?.image && { images: [config.openGraph.image] }),
    },
  };
}
