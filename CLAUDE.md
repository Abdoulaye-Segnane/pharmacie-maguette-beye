@AGENTS.md

# Pharmacie Maguette Beye — Documentation Projet

## Présentation

Site vitrine de la **Pharmacie Maguette Beye**, Kaolack, Sénégal.  
Objectif : présenter la pharmacie, ses services, et faciliter le contact.

## Stack

| Outil | Version | Rôle |
|-------|---------|------|
| Next.js | 16.x | Framework (App Router) |
| TypeScript | 5.x strict | Typage statique |
| Tailwind CSS | 4.x | Styles utilitaires |
| framer-motion | 12.x | Animations |
| next-seo + Metadata API | — | SEO |
| zod | 4.x | Validation schémas |
| clsx | 2.x | Concaténation classes |

## Palette de couleurs

| Token CSS | Classe Tailwind | Valeur | Usage |
|-----------|----------------|--------|-------|
| `--color-green-primary` | `bg-green-primary` | `#2D7A5C` | CTA, liens actifs |
| `--color-green-dark` | `bg-green-dark` | `#1A4D35` | Header, footer |
| `--color-gold` | `bg-gold` | `#D4A574` | Accents, highlights |
| `--color-gray-dark` | `text-gray-dark` | `#1F2937` | Corps de texte |
| `#FFFFFF` | `bg-white` | `#FFFFFF` | Fond principal |

> Définis dans `styles/colors.css` (`@theme`). Réexportés en TS dans `lib/colors.ts`.

## Typographie

- **Police** : Plus Jakarta Sans (Google Fonts via `next/font/google`)
- **Variable CSS** : `--font-jakarta` → consommée par `--font-sans` dans `@theme`
- **Poids** : 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Classe Tailwind** : `font-sans`

## Architecture des dossiers

```
app/
  (pages)/          # Route groups — pages du site
  globals.css       # Entrée Tailwind : @import "tailwindcss" + colors.css
  layout.tsx        # RootLayout : font, baseMetadata, html[lang="fr"]
  page.tsx          # Page d'accueil
components/
  ui/               # Primitives réutilisables (Button, Card, Badge…)
  sections/         # Sections de page (Hero, Services, Contact…)
  layout/           # Header, Footer, Nav
data/               # Données statiques TS (services, faq, équipe…)
lib/
  types.ts          # Types globaux (NavItem, Service, ContactInfo, SeoConfig…)
  colors.ts         # Constantes couleurs typées (usage JS/framer-motion)
  constants.ts      # Nom pharmacie, contact, horaires, navLinks
  utils.ts          # cn(), formatPhone(), formatHours()
  seo.ts            # baseMetadata + generateMetadata()
styles/
  colors.css        # @theme Tailwind v4 : palette + polices + animations
docs/
  superpowers/      # Plans et specs de développement
```

## Conventions TypeScript

- `strict: true` activé + `noImplicitReturns` + `noFallthroughCasesInSwitch`
- Path aliases : `@/lib/*`, `@/components/*`, `@/data/*`, `@/styles/*`
- Types dans `lib/types.ts`, jamais inline sauf types locaux triviaux
- `as const satisfies Type` pour les objets constants
- Pas de `any` — utiliser `unknown` si le type est incertain

## Conventions de nommage

| Élément | Convention | Exemple |
|---------|-----------|---------|
| Composants | PascalCase | `HeroSection.tsx` |
| Hooks | camelCase + `use` | `useScrollPosition.ts` |
| Utilitaires | camelCase | `formatPhone.ts` |
| Types/Interfaces | PascalCase | `ContactInfo` |
| Constantes globales | SCREAMING_SNAKE | `PHARMACY_NAME` |
| CSS classes Tailwind | kebab via @theme | `bg-green-primary` |

## SEO

- Utiliser `baseMetadata` de `lib/seo.ts` dans le layout racine
- Surcharger avec `generateMetadata()` pour les pages spécifiques
- `lang="fr"` sur `<html>` — locale `fr_SN` dans OpenGraph

## Sécurité

Headers configurés dans `next.config.ts` :
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

## Tailwind v4 — Points d'attention

- **Pas de `tailwind.config.ts`** — configuration entièrement en CSS via `@theme`
- Les nouvelles couleurs → ajouter dans `styles/colors.css` sous `@theme`
- Les animations → déclarer dans `@theme` + `@keyframes` dans le même fichier
- Vérifier la doc locale : `node_modules/next/dist/docs/`
