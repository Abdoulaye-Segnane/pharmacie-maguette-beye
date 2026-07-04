# Phase 4 — Pages secondaires + SEO complet — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire 5 pages secondaires (a-propos, catalog, blog, contact) + SEO global pour le site vitrine Pharmacie Maguette Beye.

**Architecture:** Server Components chargent les données depuis JSON/MDX, passent aux composants `'use client'` pour les fonctionnalités interactives (filtre, recherche, formulaire). Articles blog parsés côté serveur avec gray-matter + remark + remark-html.

**Tech Stack:** Next.js 16.2.6 App Router, TypeScript strict (`strict: true`, `noImplicitReturns`, `noFallthroughCasesInSwitch`), Tailwind CSS v4, framer-motion 12, Zod 4, Resend, gray-matter, remark, remark-html.

## Global Constraints

- **AGENTS.md** : Lire `node_modules/next/dist/docs/` avant d'écrire tout code Next.js — cette version peut différer de la doc en ligne.
- Pas de `tailwind.config.ts` — configuration Tailwind entièrement dans `styles/colors.css` via `@theme`.
- TypeScript strict : pas de `any`, `as` uniquement si justifié, préférer `satisfies` pour les données JSON.
- Path aliases : `@/lib/*`, `@/components/*`, `@/data/*`, `@/styles/*` — ne jamais utiliser de chemins relatifs `../`.
- Palette : `bg-green-primary` (#2D7A5C), `bg-green-dark` (#1A4D35), `bg-gold` (#D4A574), `text-gray-dark` (#1F2937).
- Server Components par défaut. `'use client'` uniquement si hooks, événements browser, ou framer-motion.
- Dans les App Router Server Components, `params` est une `Promise<{ slug: string }>` — toujours `await params`.
- Commits fréquents avec messages `feat:` / `fix:` / `docs:`.

---

## Map des fichiers

| Action | Chemin | Responsabilité |
|--------|--------|----------------|
| Modify | `lib/types.ts` | Ajouter Product, TeamMember, ContactFormData ; Article += category |
| Modify | `lib/constants.ts` | RESEND_FROM_EMAIL, RESEND_TO_EMAIL, navLinks updated |
| Modify | `data/articles.json` | Ajouter champ category |
| Create | `data/products.json` | 8 produits, 4 catégories |
| Create | `data/team.ts` | 3 membres de l'équipe |
| Create | `content/blog/hydratation-chaleur-senegal.mdx` | Contenu article 1 |
| Create | `content/blog/paludisme-prevention-traitement.mdx` | Contenu article 2 |
| Create | `content/blog/vitamines-immunite.mdx` | Contenu article 3 |
| Create | `app/sitemap.ts` | Sitemap Next.js (routes statiques + dynamiques) |
| Create | `app/robots.ts` | robots.txt Next.js |
| Modify | `app/layout.tsx` | LocalBusiness JSON-LD |
| Create | `app/(pages)/a-propos/page.tsx` | Page À propos |
| Create | `components/sections/catalog/ProductCard.tsx` | Card produit réutilisable |
| Create | `components/sections/catalog/CatalogClient.tsx` | Filtre + search 'use client' |
| Create | `app/(pages)/catalog/page.tsx` | Page liste catalogue |
| Create | `app/(pages)/catalog/[slug]/page.tsx` | Page détail produit |
| Create | `components/sections/blog/ArticleCard.tsx` | Card article réutilisable |
| Create | `components/sections/blog/BlogClient.tsx` | Filtre catégories 'use client' |
| Create | `app/(pages)/blog/page.tsx` | Page liste blog |
| Create | `components/sections/blog/TableOfContents.tsx` | ToC 'use client' + IntersectionObserver |
| Modify | `styles/colors.css` | Styles .article-body |
| Create | `app/(pages)/blog/[slug]/page.tsx` | Page article complet |
| Create | `components/sections/contact/ContactForm.tsx` | Formulaire 'use client' |
| Create | `app/api/contact/route.ts` | API route POST — Zod + Resend |
| Create | `app/(pages)/contact/page.tsx` | Page contact |

---

### Task 1: Foundation — Types + Constants + NavLinks

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/constants.ts`

**Interfaces:**
- Consumes: fichiers existants
- Produces: `Product`, `TeamMember`, `ContactFormData` (types globaux) ; `Article` avec champ `category` ; `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` (constantes) ; `navLinks` mis à jour

- [ ] **Étape 1 : Modifier `lib/types.ts`**

Remplacer le contenu complet du fichier par :

```typescript
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
```

- [ ] **Étape 2 : Modifier `lib/constants.ts`**

Remplacer le contenu complet du fichier par :

```typescript
// lib/constants.ts
import type { ContactInfo, NavItem } from './types';

export const PHARMACY_NAME       = 'Pharmacie Maguette Beye' as const;
export const PHARMACY_BRAND_NAME = 'MAGUETTE BEYE' as const;
export const PHARMACY_CITY       = 'Kaolack' as const;
export const PHARMACY_COUNTRY    = 'Sénégal' as const;
export const SITE_URL            = 'https://pharmaciemaguettebeye.sn' as const;
export const HERO_IMAGE_URL      = 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=1920&q=80' as const;
export const WHATSAPP_NUMBER     = '221770000000' as const;
export const RESEND_FROM_EMAIL   = 'contact@pharmaciemaguettebeye.sn' as const;
export const RESEND_TO_EMAIL     = 'contact@pharmaciemaguettebeye.sn' as const;

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
  { label: 'Catalogue', href: '/catalog' },
  { label: 'Blog',      href: '/blog' },
  { label: 'À propos',  href: '/a-propos' },
  { label: 'Contact',   href: '/contact' },
];
```

- [ ] **Étape 3 : Vérification TypeScript**

```bash
npx tsc --noEmit
```

Attendu : 0 erreur. Si erreur, corriger avant de continuer.

- [ ] **Étape 4 : Commit**

```bash
git add lib/types.ts lib/constants.ts
git commit -m "feat: add Product, TeamMember, ContactFormData types; update Article + navLinks"
```

---

### Task 2: Dépendances + Données statiques + Contenu MDX

**Files:**
- Modify: `data/articles.json`
- Create: `data/products.json`
- Create: `data/team.ts`
- Create: `content/blog/hydratation-chaleur-senegal.mdx`
- Create: `content/blog/paludisme-prevention-traitement.mdx`
- Create: `content/blog/vitamines-immunite.mdx`

**Interfaces:**
- Consumes: `Product`, `TeamMember`, `Article` (Task 1)
- Produces: données disponibles pour toutes les pages suivantes

- [ ] **Étape 1 : Installer les dépendances npm**

```bash
npm install resend gray-matter remark remark-html
```

Attendu : 4 paquets ajoutés dans `node_modules/`, `package.json` + `package-lock.json` mis à jour.

- [ ] **Étape 2 : Mettre à jour `data/articles.json`**

Ajouter le champ `"category"` à chaque article :

```json
[
  {
    "id": "1",
    "title": "Comment rester hydraté sous la chaleur sénégalaise",
    "excerpt": "En saison sèche, le risque de déshydratation augmente rapidement. Découvrez nos conseils pratiques pour maintenir une bonne hydratation au quotidien.",
    "date": "2026-06-15",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    "slug": "hydratation-chaleur-senegal",
    "category": "Hydratation"
  },
  {
    "id": "2",
    "title": "Paludisme : prévention et traitements disponibles",
    "excerpt": "Le paludisme reste un défi de santé publique en Afrique de l'Ouest. Votre pharmacien vous guide sur les meilleures mesures préventives et les traitements adaptés.",
    "date": "2026-05-28",
    "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    "slug": "paludisme-prevention-traitement",
    "category": "Prévention"
  },
  {
    "id": "3",
    "title": "Les vitamines essentielles pour renforcer votre immunité",
    "excerpt": "Vitamines C, D, zinc : découvrez quels compléments soutiennent votre système immunitaire et comment les intégrer à votre routine santé.",
    "date": "2026-05-10",
    "image": "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=800&q=80",
    "slug": "vitamines-immunite",
    "category": "Immunité"
  }
]
```

- [ ] **Étape 3 : Créer `data/products.json`**

```json
[
  {
    "id": "1",
    "name": "Paracétamol 500mg",
    "slug": "paracetamol-500mg",
    "category": "Antalgiques",
    "description": "Antidouleur et antipyrétique de référence. Soulage les douleurs légères à modérées et fait baisser la fièvre.",
    "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80",
    "available": true
  },
  {
    "id": "2",
    "name": "Ibuprofène 400mg",
    "slug": "ibuprofene-400mg",
    "category": "Antalgiques",
    "description": "Anti-inflammatoire non stéroïdien (AINS). Soulage douleurs, inflammation et fièvre.",
    "image": "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=600&q=80",
    "available": true
  },
  {
    "id": "3",
    "name": "Vitamine C 1000mg",
    "slug": "vitamine-c-1000mg",
    "category": "Vitamines",
    "description": "Complément vitaminique haute dose. Renforce le système immunitaire et réduit la fatigue.",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    "available": true
  },
  {
    "id": "4",
    "name": "Vitamine D3 2000 UI",
    "slug": "vitamine-d3-2000ui",
    "category": "Vitamines",
    "description": "Essentielle pour la santé osseuse et le système immunitaire. Recommandée lors des périodes de faible ensoleillement.",
    "image": "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80",
    "available": true
  },
  {
    "id": "5",
    "name": "Crème hydratante corps",
    "slug": "creme-hydratante-corps",
    "category": "Dermatologie",
    "description": "Formule riche adaptée aux peaux sèches. Hydrate en profondeur et protège contre la déshydratation cutanée.",
    "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
    "available": true
  },
  {
    "id": "6",
    "name": "Crème solaire SPF 50",
    "slug": "creme-solaire-spf50",
    "category": "Dermatologie",
    "description": "Protection solaire haute indice. Formule légère, résistante à la transpiration, adaptée au climat tropical.",
    "image": "https://images.unsplash.com/photo-1526758097130-bab247274f58?w=600&q=80",
    "available": false
  },
  {
    "id": "7",
    "name": "Sirop pédiatrique contre la toux",
    "slug": "sirop-pediatrique-toux",
    "category": "Pédiatrie",
    "description": "Sirop doux pour enfants dès 2 ans. Soulage la toux sèche et irritative. Sans sucre ajouté.",
    "image": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
    "available": true
  },
  {
    "id": "8",
    "name": "Vitamine C pédiatrique",
    "slug": "vitamine-c-pediatrique",
    "category": "Pédiatrie",
    "description": "Complément vitaminique sous forme de sirop fruité. Renforce les défenses naturelles des enfants dès 3 ans.",
    "image": "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80",
    "available": true
  }
]
```

- [ ] **Étape 4 : Créer `data/team.ts`**

```typescript
import type { TeamMember } from '@/lib/types'

export const team = [
  {
    id: '1',
    name: 'Maguette Beye',
    role: 'Pharmacienne titulaire',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
  },
  {
    id: '2',
    name: 'Aminata Fall',
    role: 'Pharmacienne adjointe',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
  },
  {
    id: '3',
    name: 'Ibrahima Diop',
    role: 'Préparateur en pharmacie',
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80',
  },
] as const satisfies TeamMember[]
```

- [ ] **Étape 5 : Créer le répertoire `content/blog/`**

```bash
mkdir -p content/blog
```

- [ ] **Étape 6 : Créer `content/blog/hydratation-chaleur-senegal.mdx`**

```markdown
---
slug: hydratation-chaleur-senegal
---

## Pourquoi la déshydratation est-elle dangereuse ?

En saison sèche au Sénégal, les températures peuvent dépasser 40°C. Le corps perd alors de l'eau à travers la transpiration, la respiration et les urines bien plus rapidement qu'en temps normal. Une déshydratation légère suffit à provoquer des maux de tête, de la fatigue et une baisse de concentration.

## Les signes à surveiller

- Urine foncée ou peu fréquente
- Bouche et lèvres sèches
- Sensation de soif tardive (signe que la déshydratation est déjà installée)
- Vertiges ou étourdissements
- Fatigue inhabituelle

## Nos 5 conseils pratiques

**1. Boire avant d'avoir soif.** La soif est un signal tardif. Habituez-vous à boire régulièrement, même sans sensation de soif.

**2. Viser 2 à 2,5 litres par jour.** En période de chaleur intense ou d'activité physique, cette quantité peut monter à 3 litres.

**3. Privilégier l'eau.** Les boissons sucrées et les sodas déshydratent autant qu'ils hydratent. L'eau reste la meilleure option.

**4. Adapter les horaires des activités.** Évitez les efforts physiques intenses entre 12h et 16h, heures de pic de chaleur.

**5. Surveiller les personnes vulnérables.** Nourrissons, personnes âgées et malades chroniques sont les premiers touchés.

## Quand consulter un pharmacien ?

Si vous présentez des vertiges persistants, une confusion mentale ou si vous n'avez pas uriné depuis plus de 8 heures, passez en pharmacie sans attendre. Notre équipe peut vous conseiller une réhydratation orale adaptée (sels de réhydratation) ou vous orienter vers un médecin.
```

- [ ] **Étape 7 : Créer `content/blog/paludisme-prevention-traitement.mdx`**

```markdown
---
slug: paludisme-prevention-traitement
---

## Comprendre le paludisme

Le paludisme est une maladie parasitaire transmise par la piqûre de moustiques femelles *Anopheles* infectés par le parasite *Plasmodium*. Au Sénégal, il représente l'une des premières causes de consultation médicale, particulièrement en saison des pluies (juillet à octobre).

## Symptômes : reconnaître la maladie

Les symptômes apparaissent généralement 7 à 14 jours après la piqûre :

- Fièvre élevée, souvent avec frissons et sueurs
- Maux de tête intenses
- Douleurs musculaires
- Nausées et vomissements
- Fatigue profonde

Toute fièvre inexpliquée en zone d'endémie doit être considérée comme suspecte de paludisme jusqu'à preuve du contraire.

## Mesures préventives

**Protection contre les piqûres :**
- Utiliser des moustiquaires imprégnées d'insecticide, surtout pour les enfants et les femmes enceintes
- Appliquer des répulsifs cutanés à base de DEET sur les zones exposées
- Porter des vêtements longs en soirée et la nuit
- Installer des moustiquaires aux fenêtres

**Chimioprophylaxie :**
Pour les voyageurs provenant de zones sans endémie ou les personnes à risque élevé, un traitement préventif peut être prescrit. Consultez notre pharmacien pour connaître les options disponibles.

## Traitements disponibles en pharmacie

Plusieurs médicaments antipaludéens sont disponibles sur ordonnance dans notre pharmacie. Le traitement doit impérativement être prescrit par un médecin après confirmation du diagnostic par test rapide ou microscopie.

**Ne tardez pas :** un paludisme non traité peut devenir grave en quelques heures. En cas de doute, consultez immédiatement.

## Notre rôle en tant que pharmacien

Notre équipe peut vous aider à :
- Vous informer sur les moyens de prévention adaptés à votre situation
- Vous proposer les répulsifs et moustiquaires disponibles en pharmacie
- Vous orienter vers un centre médical si vos symptômes le nécessitent
```

- [ ] **Étape 8 : Créer `content/blog/vitamines-immunite.mdx`**

```markdown
---
slug: vitamines-immunite
---

## Pourquoi notre immunité a besoin d'un soutien ?

Notre système immunitaire fait face à de nombreux défis : pollution, stress, alimentation déséquilibrée, saisons changeantes. En Afrique de l'Ouest, les épisodes de chaleur intense ajoutent une contrainte supplémentaire. Certaines vitamines et minéraux jouent un rôle clé dans le maintien de nos défenses naturelles.

## Vitamine C : l'incontournable

La vitamine C est l'un des antioxydants les plus puissants. Elle stimule la production de globules blancs et aide l'organisme à lutter contre les infections.

**Sources alimentaires :** citron, orange, goyave, mangue, poivron.
**En complément :** 500 à 1000 mg par jour pendant les périodes à risque (changement de saison, stress).

## Vitamine D : le point souvent négligé

Malgré l'ensoleillement abondant au Sénégal, beaucoup de personnes sont carencées en vitamine D faute d'une exposition correcte (vêtements couvrants, travail en intérieur, teint foncé absorbant moins les UV).

La vitamine D renforce l'immunité innée et réduit le risque d'infections respiratoires.

**En complément :** 1000 à 2000 UI par jour, idéalement le matin.

## Zinc : le minéral de l'immunité

Le zinc participe à la maturation des cellules immunitaires et à la réponse inflammatoire. Un déficit en zinc se traduit souvent par des infections fréquentes et une cicatrisation lente.

**Sources alimentaires :** viande, légumineuses, noix, graines de courge.
**En complément :** 10 à 15 mg par jour sur des périodes courtes (max 3 mois en continu).

## Nos recommandations

1. **Privilégiez l'alimentation variée.** Les compléments ne remplacent pas une alimentation équilibrée.
2. **Consultez avant de prendre.** Un excès de certaines vitamines peut être nocif. Demandez conseil à notre pharmacien.
3. **Adaptez aux besoins.** Les besoins en micronutriments varient selon l'âge, la grossesse, et les pathologies.

Passez en pharmacie — nous vous aiderons à choisir les compléments adaptés à votre situation personnelle.
```

- [ ] **Étape 9 : Vérification TypeScript**

```bash
npx tsc --noEmit
```

Attendu : 0 erreur.

- [ ] **Étape 10 : Commit**

```bash
git add package.json package-lock.json data/articles.json data/products.json data/team.ts content/
git commit -m "feat: install resend/remark/gray-matter deps, add products data and MDX blog content"
```

---

### Task 3: SEO Global — sitemap, robots, LocalBusiness JSON-LD

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `SITE_URL`, `PHARMACY_NAME`, `contact` (lib/constants) ; `data/products.json` ; `data/articles.json`
- Produces: `/sitemap.xml` et `/robots.txt` générés automatiquement par Next.js ; LocalBusiness schema dans le `<head>` de toutes les pages

- [ ] **Étape 1 : Créer `app/sitemap.ts`**

```typescript
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import productsData from '@/data/products.json'
import articlesData from '@/data/articles.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,          changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/catalog`,   changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/blog`,      changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${SITE_URL}/a-propos`,  changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`,   changeFrequency: 'yearly',  priority: 0.5 },
  ]

  const productRoutes: MetadataRoute.Sitemap = productsData.map((p) => ({
    url: `${SITE_URL}/catalog/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articlesData.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...articleRoutes]
}
```

- [ ] **Étape 2 : Créer `app/robots.ts`**

```typescript
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
```

- [ ] **Étape 3 : Modifier `app/layout.tsx`**

Ajouter le LocalBusiness JSON-LD via un `<script>` dans le `<body>`. Remplacer le contenu complet du fichier :

```typescript
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { baseMetadata } from '@/lib/seo'
import { PHARMACY_NAME, SITE_URL, contact } from '@/lib/constants'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = baseMetadata

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Pharmacy',
  name: PHARMACY_NAME,
  url: SITE_URL,
  telephone: contact.phone.replace(/\s/g, ''),
  email: contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.address,
    addressLocality: 'Kaolack',
    addressCountry: 'SN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '09:00',
      closes: '14:00',
    },
  ],
} as const

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-dark">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Étape 4 : Vérification build**

```bash
npm run build
```

Attendu : build réussi. Vérifier que `/sitemap.xml` et `/robots.txt` apparaissent dans la liste des routes générées. Si erreur TypeScript, corriger.

- [ ] **Étape 5 : Commit**

```bash
git add app/sitemap.ts app/robots.ts app/layout.tsx
git commit -m "feat: add sitemap, robots.txt, and LocalBusiness JSON-LD schema"
```

---

### Task 4: Page À propos

**Files:**
- Create: `app/(pages)/a-propos/page.tsx`

**Interfaces:**
- Consumes: `team` (data/team.ts) ; `generateMetadata` (lib/seo) ; `AnimatedSection` (components/ui) ; `Image` (next/image)
- Produces: route `/a-propos` statique

- [ ] **Étape 1 : Créer `app/(pages)/a-propos/page.tsx`**

```typescript
import type { Metadata } from 'next'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { team } from '@/data/team'

export const metadata: Metadata = genMeta({
  title: 'À propos',
  description:
    'Découvrez l\'histoire, l\'équipe et les valeurs de la Pharmacie Maguette Beye à Kaolack, Sénégal.',
  canonical: '/a-propos',
})

const values = [
  {
    id: '1',
    title: 'Authenticité',
    description: 'Tous nos médicaments proviennent de distributeurs agréés. Aucun compromis sur la qualité.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: '2',
    title: 'Proximité',
    description: 'Au cœur de Kaolack, nous sommes votre pharmacie de quartier. Disponibles, à l\'écoute.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: '3',
    title: 'Excellence',
    description: 'Conseil personnalisé, formation continue, équipe qualifiée. Votre santé mérite le meilleur.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-green-dark py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <AnimatedSection variant="fadeIn">
            <span className="inline-flex items-center rounded-full bg-gold/20 px-4 py-1.5 text-sm font-medium text-gold ring-1 ring-gold/30">
              Depuis 2005
            </span>
          </AnimatedSection>
          <AnimatedSection variant="slideUp" delay={0.1}>
            <h1 className="mt-6 text-4xl font-bold md:text-5xl">Notre histoire</h1>
          </AnimatedSection>
          <AnimatedSection variant="slideUp" delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              La Pharmacie Maguette Beye est une pharmacie indépendante au service des habitants
              de Kaolack et de la région depuis plus de vingt ans.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <AnimatedSection>
              <div className="relative h-72 overflow-hidden rounded-2xl lg:h-96">
                <Image
                  src="https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80"
                  alt="Intérieur de la Pharmacie Maguette Beye"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-2xl font-bold text-green-dark mb-6">Une pharmacie de confiance</h2>
              <div className="space-y-4 text-gray-dark/80 leading-relaxed">
                <p>
                  Fondée en 2005 par Maguette Beye, pharmacienne diplômée de la Faculté de Médecine
                  de Dakar, notre officine s&rsquo;est imposée comme un acteur de référence de la
                  santé à Kaolack.
                </p>
                <p>
                  Notre mission est simple : rendre les soins de qualité accessibles à tous, avec
                  une attention particulière portée aux familles, aux enfants et aux personnes âgées.
                </p>
                <p>
                  Chaque jour, notre équipe de professionnels de santé accueille des dizaines de
                  patients avec bienveillance, compétence et discrétion.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-green-dark">Notre équipe</h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-dark/70">
              Des professionnels de santé dévoués, à votre service chaque jour.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {team.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                  <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-semibold text-green-dark">{member.name}</div>
                  <div className="mt-1 text-sm text-gray-dark/60">{member.role}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-green-dark">Nos valeurs</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {values.map((value, i) => (
              <AnimatedSection key={value.id} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-primary/10 text-green-primary">
                    {value.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-green-dark">{value.title}</h3>
                  <p className="text-sm text-gray-dark/70 leading-relaxed">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Étape 2 : Vérification build**

```bash
npm run build
```

Attendu : route `/a-propos` apparaît dans la liste des pages statiques générées.

- [ ] **Étape 3 : Commit**

```bash
git add "app/(pages)/a-propos/"
git commit -m "feat: add about page with history, team and values sections"
```

---

### Task 5: Catalogue — Page liste

**Files:**
- Create: `components/sections/catalog/ProductCard.tsx`
- Create: `components/sections/catalog/CatalogClient.tsx`
- Create: `app/(pages)/catalog/page.tsx`

**Interfaces:**
- Consumes: `Product` (lib/types) ; `Badge` (components/ui) ; `cn` (lib/utils) ; `productsData` (data/products.json) ; `generateMetadata` (lib/seo)
- Produces: route `/catalog` avec filtre catégorie et recherche texte ; `ProductCard` réutilisé en Task 6

- [ ] **Étape 1 : Créer `components/sections/catalog/ProductCard.tsx`**

```typescript
import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/catalog/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-green-dark leading-snug line-clamp-2">
            {product.name}
          </h3>
          <Badge color={product.available ? 'green' : 'gray'} className="shrink-0">
            {product.available ? 'Disponible' : 'Indisponible'}
          </Badge>
        </div>
        <p className="text-sm text-gray-dark/70 line-clamp-2 flex-1">
          {product.description}
        </p>
        <span className="mt-3 text-sm font-medium text-green-primary">
          Voir le détail →
        </span>
      </div>
    </Link>
  )
}
```

- [ ] **Étape 2 : Créer `components/sections/catalog/CatalogClient.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import ProductCard from '@/components/sections/catalog/ProductCard'
import type { Product } from '@/lib/types'

interface CatalogClientProps {
  products: Product[]
  categories: string[]
}

export default function CatalogClient({ products, categories }: CatalogClientProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('Tous')

  const filtered = products.filter((p) => {
    const matchesCategory =
      activeCategory === 'Tous' || p.category === activeCategory
    const q = query.toLowerCase()
    const matchesQuery =
      !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <input
          type="search"
          placeholder="Rechercher un produit..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-dark placeholder-gray-400 shadow-sm outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20"
        />
      </div>

      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {['Tous', ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              activeCategory === cat
                ? 'bg-green-primary text-white'
                : 'bg-gray-100 text-gray-dark hover:bg-gray-200',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-dark/60 py-12">
          Aucun produit ne correspond à votre recherche.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Étape 3 : Créer `app/(pages)/catalog/page.tsx`**

```typescript
import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import CatalogClient from '@/components/sections/catalog/CatalogClient'
import type { Product } from '@/lib/types'
import productsData from '@/data/products.json'

export const metadata: Metadata = genMeta({
  title: 'Catalogue',
  description:
    'Découvrez notre catalogue de médicaments et produits de parapharmacie à la Pharmacie Maguette Beye, Kaolack.',
  canonical: '/catalog',
})

const products = productsData satisfies Product[]

export default function CatalogPage() {
  const categories = [...new Set(products.map((p) => p.category))]

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-green-dark">Notre catalogue</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-dark/70">
            Médicaments et produits de parapharmacie disponibles en pharmacie.
          </p>
        </div>
        <CatalogClient products={products} categories={categories} />
      </div>
    </section>
  )
}
```

- [ ] **Étape 4 : Vérification TypeScript**

```bash
npx tsc --noEmit
```

Attendu : 0 erreur.

- [ ] **Étape 5 : Commit**

```bash
git add components/sections/catalog/ "app/(pages)/catalog/page.tsx"
git commit -m "feat: add catalog list page with category filter and text search"
```

---

### Task 6: Catalogue — Page détail produit

**Files:**
- Create: `app/(pages)/catalog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `Product` (lib/types) ; `ProductCard` (Task 5) ; `Badge` (components/ui) ; `productsData` (data/products.json) ; `notFound` (next/navigation) ; `generateMetadata` (lib/seo) ; `PHARMACY_NAME`, `SITE_URL` (lib/constants)
- Produces: routes `/catalog/[slug]` générées statiquement pour chaque produit

- [ ] **Étape 1 : Créer `app/(pages)/catalog/[slug]/page.tsx`**

> Note : En Next.js 15+, `params` est une `Promise`. Vérifier dans `node_modules/next/dist/docs/` si la signature a changé dans Next.js 16.

```typescript
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Badge from '@/components/ui/Badge'
import ProductCard from '@/components/sections/catalog/ProductCard'
import { generateMetadata as genMeta } from '@/lib/seo'
import { PHARMACY_NAME, SITE_URL } from '@/lib/constants'
import type { Product } from '@/lib/types'
import productsData from '@/data/products.json'

const products = productsData satisfies Product[]

export function generateStaticParams(): { slug: string }[] {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return {}
  return genMeta({
    title: product.name,
    description: product.description,
    canonical: `/catalog/${product.slug}`,
  })
}

export default async function ProductPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const similar = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { '@type': 'Brand', name: PHARMACY_NAME },
    offers: {
      '@type': 'Offer',
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceCurrency: 'XOF',
      url: `${SITE_URL}/catalog/${product.slug}`,
      seller: { '@type': 'Organization', name: PHARMACY_NAME },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-16 bg-white min-h-screen">
        <div className="mx-auto max-w-5xl px-4">
          {/* Fil d'Ariane */}
          <nav aria-label="Fil d'Ariane" className="mb-8 text-sm text-gray-dark/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-green-primary">Accueil</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/catalog" className="hover:text-green-primary">Catalogue</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-dark" aria-current="page">{product.name}</li>
            </ol>
          </nav>

          {/* Contenu produit */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="relative h-72 overflow-hidden rounded-2xl bg-gray-50 lg:h-96">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="mb-3 flex items-center gap-2">
                <Badge color="gold">{product.category}</Badge>
                <Badge color={product.available ? 'green' : 'gray'}>
                  {product.available ? 'Disponible' : 'Indisponible'}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-green-dark">{product.name}</h1>
              <p className="mt-4 text-gray-dark/80 leading-relaxed">{product.description}</p>
              <div className="mt-8 rounded-xl bg-green-primary/5 border border-green-primary/20 p-4 text-sm text-gray-dark/70">
                <strong className="text-green-dark">Conseil de votre pharmacien :</strong>{' '}
                Pour toute question sur ce produit, n&rsquo;hésitez pas à consulter notre équipe
                en pharmacie ou à nous appeler.
              </div>
            </div>
          </div>

          {/* Produits similaires */}
          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-green-dark">
                Dans la même catégorie
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {similar.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
```

- [ ] **Étape 2 : Vérification build**

```bash
npm run build
```

Attendu : routes `/catalog/[slug]` générées pour chacun des 8 slugs de `products.json`.

- [ ] **Étape 3 : Commit**

```bash
git add "app/(pages)/catalog/[slug]/"
git commit -m "feat: add catalog product detail page with JSON-LD and similar products"
```

---

### Task 7: Blog — Page liste

**Files:**
- Create: `components/sections/blog/ArticleCard.tsx`
- Create: `components/sections/blog/BlogClient.tsx`
- Create: `app/(pages)/blog/page.tsx`

**Interfaces:**
- Consumes: `Article` (lib/types) ; `Badge` (components/ui) ; `cn` (lib/utils) ; `formatDate` (lib/utils) ; `articlesData` (data/articles.json) ; `generateMetadata` (lib/seo)
- Produces: route `/blog` avec filtre catégorie ; `ArticleCard` réutilisé en Task 8

- [ ] **Étape 1 : Créer `components/sections/blog/ArticleCard.tsx`**

```typescript
import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { Article } from '@/lib/types'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <Badge color="gold">{article.category}</Badge>
          <time dateTime={article.date} className="text-xs text-gray-dark/50">
            {formatDate(article.date)}
          </time>
        </div>
        <h3 className="mb-2 font-semibold text-green-dark leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="mb-4 text-sm text-gray-dark/70 line-clamp-3 flex-1">
          {article.excerpt}
        </p>
        <span className="text-sm font-medium text-green-primary">
          Lire la suite →
        </span>
      </div>
    </Link>
  )
}
```

- [ ] **Étape 2 : Créer `components/sections/blog/BlogClient.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import ArticleCard from '@/components/sections/blog/ArticleCard'
import type { Article } from '@/lib/types'

interface BlogClientProps {
  articles: Article[]
  categories: string[]
}

export default function BlogClient({ articles, categories }: BlogClientProps) {
  const [activeCategory, setActiveCategory] = useState('Tous')

  const filtered =
    activeCategory === 'Tous'
      ? articles
      : articles.filter((a) => a.category === activeCategory)

  return (
    <div>
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {['Tous', ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              activeCategory === cat
                ? 'bg-green-primary text-white'
                : 'bg-gray-100 text-gray-dark hover:bg-gray-200',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Étape 3 : Créer `app/(pages)/blog/page.tsx`**

```typescript
import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import BlogClient from '@/components/sections/blog/BlogClient'
import type { Article } from '@/lib/types'
import articlesData from '@/data/articles.json'

export const metadata: Metadata = genMeta({
  title: 'Conseils santé',
  description:
    'Conseils santé, prévention et bien-être par les pharmaciens de la Pharmacie Maguette Beye à Kaolack.',
  canonical: '/blog',
})

const articles = articlesData satisfies Article[]

export default function BlogPage() {
  const categories = [...new Set(articles.map((a) => a.category))]

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-green-dark">Conseils santé</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-dark/70">
            Nos pharmaciens partagent leurs connaissances pour vous aider à prendre soin de votre santé.
          </p>
        </div>
        <BlogClient articles={articles} categories={categories} />
      </div>
    </section>
  )
}
```

- [ ] **Étape 4 : Vérification TypeScript**

```bash
npx tsc --noEmit
```

Attendu : 0 erreur.

- [ ] **Étape 5 : Commit**

```bash
git add components/sections/blog/ArticleCard.tsx components/sections/blog/BlogClient.tsx "app/(pages)/blog/page.tsx"
git commit -m "feat: add blog list page with category filter"
```

---

### Task 8: Blog — Page article complet (pipeline MDX)

**Files:**
- Modify: `styles/colors.css`
- Create: `components/sections/blog/TableOfContents.tsx`
- Create: `app/(pages)/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `Article` (lib/types) ; `ArticleCard` (Task 7) ; `Badge` (components/ui) ; `formatDate` (lib/utils) ; `articlesData` (data/articles.json) ; `gray-matter`, `remark`, `remark-html` (npm) ; `fs/promises`, `path` (Node.js) ; `PHARMACY_NAME`, `SITE_URL` (lib/constants)
- Produces: routes `/blog/[slug]` avec corps MDX rendu, ToC, JSON-LD BlogPosting

- [ ] **Étape 1 : Ajouter les styles `.article-body` dans `styles/colors.css`**

Ajouter à la fin du fichier existant (après les `@keyframes`) :

```css
/* ── Article body typography ── */
.article-body {
  color: #1F2937;
  line-height: 1.8;
  font-size: 1rem;
}

.article-body h2 {
  font-size: 1.375rem;
  font-weight: 700;
  color: #1A4D35;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
  scroll-margin-top: 5rem;
}

.article-body p {
  margin-bottom: 1rem;
}

.article-body ul,
.article-body ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.article-body ul {
  list-style-type: disc;
}

.article-body ol {
  list-style-type: decimal;
}

.article-body li {
  margin-bottom: 0.375rem;
}

.article-body strong {
  font-weight: 600;
  color: #1F2937;
}

.article-body em {
  font-style: italic;
}
```

- [ ] **Étape 2 : Créer `components/sections/blog/TableOfContents.tsx`**

```typescript
'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface TocEntry {
  id: string
  title: string
}

interface TableOfContentsProps {
  toc: TocEntry[]
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (toc.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-10% 0% -70% 0%' },
    )

    toc.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [toc])

  if (toc.length === 0) return null

  return (
    <nav aria-label="Sommaire" className="rounded-xl border border-gray-100 bg-gray-50 p-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-dark/50">
        Sommaire
      </p>
      <ol className="space-y-2">
        {toc.map(({ id, title }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                'block text-sm transition-colors',
                activeId === id
                  ? 'font-semibold text-green-primary'
                  : 'text-gray-dark/70 hover:text-green-primary',
              )}
            >
              {title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

- [ ] **Étape 3 : Créer `app/(pages)/blog/[slug]/page.tsx`**

> Note : `remark` et `remark-html` utilisent ESM. Vérifier les imports dans `node_modules/next/dist/docs/` si des erreurs d'import ESM apparaissent.

```typescript
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import Badge from '@/components/ui/Badge'
import ArticleCard from '@/components/sections/blog/ArticleCard'
import TableOfContents from '@/components/sections/blog/TableOfContents'
import { generateMetadata as genMeta } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { PHARMACY_NAME, SITE_URL } from '@/lib/constants'
import type { Article } from '@/lib/types'
import articlesData from '@/data/articles.json'

const articles = articlesData satisfies Article[]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

export function generateStaticParams(): { slug: string }[] {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return genMeta({
    title: article.title,
    description: article.excerpt,
    canonical: `/blog/${article.slug}`,
    openGraph: { image: article.image, type: 'article' },
  })
}

export default async function BlogArticlePage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.mdx`)
  const fileContents = await readFile(filePath, 'utf8')
  const { content } = matter(fileContents)

  // Extract ToC from H2 headings
  const tocRegex = /^## (.+)/gm
  const toc: { id: string; title: string }[] = []
  let match: RegExpExecArray | null
  while ((match = tocRegex.exec(content)) !== null) {
    toc.push({ id: slugify(match[1]), title: match[1] })
  }

  // Convert Markdown to HTML and add id to H2 headings
  const processedContent = await remark()
    .use(remarkHtml, { sanitize: false })
    .process(content)
  const rawHtml = processedContent.toString()
  const html = rawHtml.replace(/<h2>(.*?)<\/h2>/g, (_, title: string) => {
    return `<h2 id="${slugify(title)}">${title}</h2>`
  })

  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    image: article.image,
    url: `${SITE_URL}/blog/${article.slug}`,
    author: { '@type': 'Organization', name: PHARMACY_NAME },
    publisher: {
      '@type': 'Organization',
      name: PHARMACY_NAME,
      url: SITE_URL,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Hero image */}
        <div className="relative h-72 w-full overflow-hidden bg-green-dark md:h-96">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>

        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
            {/* Article content */}
            <div>
              {/* Meta */}
              <div className="mb-4 flex items-center gap-3">
                <Badge color="gold">{article.category}</Badge>
                <time dateTime={article.date} className="text-sm text-gray-dark/50">
                  {formatDate(article.date)}
                </time>
              </div>

              <h1 className="text-3xl font-bold text-green-dark leading-tight mb-8 md:text-4xl">
                {article.title}
              </h1>

              {/* MDX body */}
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>

            {/* Sidebar — ToC + related */}
            <aside className="space-y-8">
              <TableOfContents toc={toc} />

              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="mb-1 text-sm font-semibold text-green-dark">
                  Des questions ?
                </p>
                <p className="text-sm text-gray-dark/70">
                  Nos pharmaciens sont disponibles pour vous conseiller.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center text-sm font-medium text-green-primary hover:text-green-dark"
                >
                  Nous contacter →
                </Link>
              </div>
            </aside>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-16 border-t border-gray-100 pt-12">
              <h2 className="mb-6 text-2xl font-bold text-green-dark">Articles recommandés</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {related.map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <Link
              href="/blog"
              className="text-sm font-medium text-green-primary hover:text-green-dark"
            >
              ← Retour aux conseils santé
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
```

- [ ] **Étape 4 : Vérification build**

```bash
npm run build
```

Attendu : routes `/blog/[slug]` générées pour les 3 slugs. Si erreur d'import ESM avec `remark` ou `remark-html`, vérifier `node_modules/next/dist/docs/` pour la syntaxe d'import correcte dans Next.js 16.

- [ ] **Étape 5 : Commit**

```bash
git add styles/colors.css components/sections/blog/TableOfContents.tsx "app/(pages)/blog/[slug]/"
git commit -m "feat: add blog article page with MDX pipeline, ToC and BlogPosting JSON-LD"
```

---

### Task 9: Contact — Page + API Route (Resend)

**Files:**
- Create: `components/sections/contact/ContactForm.tsx`
- Create: `app/api/contact/route.ts`
- Create: `app/(pages)/contact/page.tsx`

**Interfaces:**
- Consumes: `ContactFormData` (lib/types) ; `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`, `contact` (lib/constants) ; `z` (zod) ; `Resend` (resend) ; `toTelUri` (lib/utils)
- Produces: route `/contact` avec formulaire ; endpoint `POST /api/contact` validé Zod + Resend

- [ ] **Étape 1 : Créer le fichier `.env.local` à la racine du projet**

> **Ne jamais commiter `.env.local`** — il est déjà dans `.gitignore`.

```
RESEND_API_KEY=re_VOTRE_CLE_API_RESEND
```

Si vous n'avez pas de clé Resend, créer un compte sur resend.com. Le plan gratuit inclut 100 emails/jour. Le `from` email doit correspondre à un domaine vérifié dans Resend (ou utiliser `onboarding@resend.dev` pour les tests).

- [ ] **Étape 2 : Créer `components/sections/contact/ContactForm.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) throw new Error('Erreur serveur')
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-dark placeholder-gray-400 shadow-sm outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/20 disabled:opacity-50'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-dark">
          Nom complet <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === 'loading'}
          placeholder="Aminata Diallo"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-dark">
          Adresse email <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          placeholder="aminata@exemple.sn"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-dark">
          Message <span aria-hidden="true" className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === 'loading'}
          placeholder="Votre question ou message..."
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      {status === 'success' && (
        <div role="alert" className="rounded-xl bg-green-primary/10 px-4 py-3 text-sm text-green-dark">
          ✓ Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.
        </div>
      )}

      {status === 'error' && (
        <div role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          Une erreur s&rsquo;est produite. Veuillez réessayer ou nous contacter par téléphone.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-xl bg-green-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-green-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary disabled:opacity-60 sm:w-auto"
      >
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer le message'}
      </button>
    </form>
  )
}
```

- [ ] **Étape 3 : Créer `app/api/contact/route.ts`**

```typescript
import { z } from 'zod'
import { Resend } from 'resend'
import { RESEND_FROM_EMAIL, RESEND_TO_EMAIL } from '@/lib/constants'

const schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

export async function POST(request: Request): Promise<Response> {
  const body: unknown = await request.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    return Response.json(
      { error: 'Données invalides', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'Configuration email manquante' }, { status: 500 })
  }

  const { name, email, message } = parsed.data
  const resend = new Resend(apiKey)

  try {
    await resend.emails.send({
      from: RESEND_FROM_EMAIL,
      to: RESEND_TO_EMAIL,
      replyTo: email,
      subject: `Message de ${name} — Pharmacie Maguette Beye`,
      text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
    })
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Erreur lors de l\'envoi du message' }, { status: 500 })
  }
}
```

- [ ] **Étape 4 : Créer `app/(pages)/contact/page.tsx`**

```typescript
import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'
import { contact } from '@/lib/constants'
import { formatPhone, toTelUri } from '@/lib/utils'
import ContactForm from '@/components/sections/contact/ContactForm'

export const metadata: Metadata = genMeta({
  title: 'Contact',
  description:
    'Contactez la Pharmacie Maguette Beye à Kaolack. Formulaire en ligne, téléphone ou venez directement en pharmacie.',
  canonical: '/contact',
})

export default function ContactPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-green-dark">Contactez-nous</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-dark/70">
            Notre équipe est à votre écoute. Remplissez le formulaire ou contactez-nous directement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          {/* Infos de contact */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <h2 className="mb-6 text-xl font-semibold text-green-dark">Nos coordonnées</h2>
            <dl className="space-y-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-dark/50">
                  Adresse
                </dt>
                <dd className="mt-1 text-gray-dark">{contact.address}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-dark/50">
                  Téléphone
                </dt>
                <dd className="mt-1">
                  <a
                    href={toTelUri(contact.phone)}
                    className="text-lg font-semibold text-green-primary hover:text-green-dark transition-colors"
                  >
                    {formatPhone(contact.phone)}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-dark/50">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gray-dark hover:text-green-primary transition-colors"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-dark/50">
                  Horaires
                </dt>
                <dd className="mt-1 space-y-1 text-sm text-gray-dark/80">
                  <p>Lun–Ven : {contact.hours.weekdays.open} – {contact.hours.weekdays.close}</p>
                  <p>Samedi : {contact.hours.saturday.open} – {contact.hours.saturday.close}</p>
                  <p>Dimanche : {contact.hours.sunday.open} – {contact.hours.sunday.close}</p>
                </dd>
              </div>
            </dl>
          </div>

          {/* Formulaire */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
            <h2 className="mb-6 text-xl font-semibold text-green-dark">Envoyer un message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Étape 5 : Vérification TypeScript et build complet**

```bash
npx tsc --noEmit
```

Attendu : 0 erreur TypeScript.

```bash
npm run build
```

Attendu : build réussi. Liste complète des routes :
- `/` (home)
- `/a-propos`
- `/catalog`
- `/catalog/paracetamol-500mg` (et 7 autres slugs)
- `/blog`
- `/blog/hydratation-chaleur-senegal` (et 2 autres slugs)
- `/contact`
- `/sitemap.xml` (généré automatiquement)
- `/robots.txt` (généré automatiquement)
- `POST /api/contact` (API route, non statique)

- [ ] **Étape 6 : Commit**

```bash
git add components/sections/contact/ app/api/ "app/(pages)/contact/"
git commit -m "feat: add contact page with Zod-validated form and Resend API route"
```

---

## Self-Review (plan)

**Couverture spec :**
- ✅ Types Product, TeamMember, ContactFormData → Task 1
- ✅ Article.category → Task 1
- ✅ navLinks mis à jour → Task 1
- ✅ data/products.json, data/team.ts, articles.json category, MDX content → Task 2
- ✅ npm install resend gray-matter remark remark-html → Task 2
- ✅ sitemap.ts, robots.ts → Task 3
- ✅ LocalBusiness JSON-LD → Task 3
- ✅ Page /a-propos → Task 4
- ✅ Catalog list + CatalogClient + ProductCard → Task 5
- ✅ Catalog [slug] + generateStaticParams + JSON-LD Product → Task 6
- ✅ Blog list + BlogClient + ArticleCard → Task 7
- ✅ Blog [slug] + MDX pipeline + ToC + JSON-LD BlogPosting → Task 8
- ✅ .article-body CSS → Task 8
- ✅ Contact form (client) → Task 9
- ✅ API route POST /api/contact + Zod + Resend → Task 9
- ✅ Page /contact → Task 9

**Aucun placeholder** — tout le code est complet dans chaque étape.

**Cohérence des types** :
- `Product` défini Task 1, utilisé Task 5 et Task 6 ✅
- `Article` défini Task 1 (avec category), utilisé Task 7 et Task 8 ✅
- `TeamMember` défini Task 1, utilisé Task 4 ✅
- `RESEND_FROM_EMAIL`/`RESEND_TO_EMAIL` définis Task 1, utilisés Task 9 ✅
- `slugify` défini inline Task 8 (ToC + blog [slug] page) — cohérent ✅
