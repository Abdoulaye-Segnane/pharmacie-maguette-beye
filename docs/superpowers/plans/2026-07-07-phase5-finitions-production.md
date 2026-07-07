# Phase 5 — Finitions & Production-ready Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Corriger les minors déférés de Phase 4, remplacer les données placeholder, documenter les variables d'environnement, et optimiser pour Lighthouse ≥ 90.

**Architecture:** 4 tâches indépendantes sur les mêmes fichiers existants. Pas de nouveaux composants. Toutes les tâches se vérifient avec `npx tsc --noEmit` + `npm run build`.

**Tech Stack:** Next.js 16, TypeScript 5 strict, Zod 4, Resend SDK, Tailwind CSS v4.

## Global Constraints

- TypeScript `strict: true`, `noImplicitReturns`, `noFallthroughCasesInSwitch` — 0 erreur `npx tsc --noEmit`
- Next.js 16 — lire `node_modules/next/dist/docs/` avant toute API Next.js non triviale
- Pas de `any` — `unknown` si type incertain
- Path aliases : `@/lib/*`, `@/components/*`, `@/data/*`
- Tailwind CSS v4 — palette tokens uniquement : `bg-green-primary`, `bg-green-dark`, `text-gray-dark`, etc.
- Ne jamais commiter `.env.local` (gitignored)
- `satisfies` plutôt que `as` pour les types de données JSON

---

### Task 1: Données réelles + dead code + sitemap satisfies

**Files:**
- Modify: `lib/constants.ts`
- Modify: `lib/types.ts` (supprimer ContactFormData lignes 91–95)
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: rien de nouveau
- Produces: `contact.phone = '+221 33 942 11 92'`, `contact.address = 'Dialègne N°4766...'`, `WHATSAPP_NUMBER = '221339421192'`

- [ ] **Étape 1 : Remplacer les 3 valeurs dans `lib/constants.ts`**

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
export const WHATSAPP_NUMBER     = '221339421192' as const;
export const RESEND_FROM_EMAIL   = 'contact@pharmaciemaguettebeye.sn' as const;
export const RESEND_TO_EMAIL     = 'contact@pharmaciemaguettebeye.sn' as const;

export const contact: ContactInfo = {
  phone:   '+221 33 942 11 92',
  email:   'contact@pharmaciemaguettebeye.sn',
  address: 'Dialègne N°4766, derrière Nouveau Bloc Scientifique du Collège, Kaolack',
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

- [ ] **Étape 2 : Supprimer `ContactFormData` dans `lib/types.ts`**

Supprimer les lignes 91–95 (bloc complet) :

```typescript
export interface ContactFormData {
  name: string
  email: string
  message: string
}
```

Le reste du fichier reste identique.

- [ ] **Étape 3 : Ajouter `satisfies` dans `app/sitemap.ts`**

Remplacer le contenu complet du fichier par :

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

  const products = productsData satisfies { slug: string }[]
  const articles = articlesData satisfies { slug: string }[]

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/catalog/${p.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...productRoutes, ...articleRoutes]
}
```

- [ ] **Étape 4 : Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Attendu : 0 erreur. Si erreur sur `ContactFormData`, vérifier qu'aucun fichier ne l'importe encore avec `grep -r "ContactFormData" --include="*.ts" --include="*.tsx" .`.

- [ ] **Étape 5 : Commit**

```bash
git add lib/constants.ts lib/types.ts app/sitemap.ts
git commit -m "fix: update real contact data, remove ContactFormData dead code, add sitemap satisfies"
```

---

### Task 2: Rate limiting sur `/api/contact`

**Files:**
- Modify: `app/api/contact/route.ts`

**Interfaces:**
- Consumes: `Request.headers.get('x-forwarded-for')` pour l'IP
- Produces: `429 Too Many Requests` si > 5 requêtes par IP par 60 secondes

- [ ] **Étape 1 : Remplacer `app/api/contact/route.ts`** par le contenu complet :

```typescript
import { z } from 'zod'
import { Resend } from 'resend'
import { RESEND_FROM_EMAIL, RESEND_TO_EMAIL } from '@/lib/constants'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

const schema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

export async function POST(request: Request): Promise<Response> {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '127.0.0.1'

  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Trop de requêtes. Réessayez dans une minute.' },
      { status: 429 },
    )
  }

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
    return Response.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 })
  }
}
```

- [ ] **Étape 2 : Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Attendu : 0 erreur.

- [ ] **Étape 3 : Vérifier le rate limiting manuellement**

```bash
# Démarrer le serveur de dev
npm run dev &

# Envoyer 6 requêtes successives (la 6e doit retourner 429)
for i in 1 2 3 4 5 6; do
  curl -s -o /dev/null -w "%{http_code}\n" \
    -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User","email":"test@test.com","message":"Message de test suffisamment long"}'
done
```

Attendu : `200 200 200 200 200 429`

- [ ] **Étape 4 : Commit**

```bash
git add app/api/contact/route.ts
git commit -m "feat: add in-memory rate limiting to /api/contact (5 req/min per IP)"
```

---

### Task 3: ContactForm — erreurs de validation par champ

**Files:**
- Modify: `components/sections/contact/ContactForm.tsx`

**Interfaces:**
- Consumes: réponse `{ error: string; details?: Record<string, string[]> }` de `POST /api/contact` (400)
- Produces: erreurs sous chaque champ invalide ; message générique si erreur réseau

- [ ] **Étape 1 : Remplacer `components/sections/contact/ContactForm.tsx`** par le contenu complet :

```typescript
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'
type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    setStatus('loading')
    setFieldErrors({})
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (!res.ok) {
        const data: { error: string; details?: Record<string, string[]> } =
          await res.json()
        const errs: FieldErrors = {}
        if (data.details) {
          for (const key of ['name', 'email', 'message'] as const) {
            if (data.details[key]?.[0]) errs[key] = data.details[key][0]
          }
        }
        setFieldErrors(errs)
        setStatus('error')
        return
      }
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
        {fieldErrors.name && (
          <p role="alert" className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>
        )}
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
        {fieldErrors.email && (
          <p role="alert" className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
        )}
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
        {fieldErrors.message && (
          <p role="alert" className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>
        )}
      </div>

      {status === 'success' && (
        <div role="alert" className="rounded-xl bg-green-primary/10 px-4 py-3 text-sm text-green-dark">
          ✓ Votre message a été envoyé. Nous vous répondrons dans les plus brefs délais.
        </div>
      )}

      {status === 'error' && Object.keys(fieldErrors).length === 0 && (
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

- [ ] **Étape 2 : Vérifier TypeScript**

```bash
npx tsc --noEmit
```

Attendu : 0 erreur.

- [ ] **Étape 3 : Commit**

```bash
git add components/sections/contact/ContactForm.tsx
git commit -m "fix: show per-field validation errors from API in ContactForm"
```

---

### Task 4: .env.example + Optimisations Lighthouse

**Files:**
- Create: `.env.example`
- Modify: `app/layout.tsx` (preconnect + viewport export)

**Interfaces:**
- Consumes: Next.js 16 `Viewport` type (vérifier dans `node_modules/next/dist/docs/` avant d'utiliser)
- Produces: `.env.example` commité ; `theme-color` dans les headers ; preconnect Unsplash

- [ ] **Étape 1 : Créer `.env.example` à la racine**

```
# Resend — service d'envoi d'emails transactionnels
# Créer un compte gratuit sur https://resend.com (100 emails/jour inclus)
# Le domaine utilisé dans RESEND_FROM_EMAIL (lib/constants.ts) doit être vérifié dans Resend
RESEND_API_KEY=re_VOTRE_CLE_API_RESEND
```

- [ ] **Étape 2 : Vérifier l'API Viewport dans Next.js 16**

Lire le fichier de doc Next.js 16 sur les metadata / viewport :

```bash
# Sur Windows PowerShell :
Get-ChildItem "node_modules/next/dist/docs/" | Where-Object { $_.Name -like "*metadata*" -or $_.Name -like "*viewport*" }
```

Dans Next.js 14+, `themeColor` est exporté séparément via `export const viewport: Viewport`. Vérifier que l'API est identique en Next.js 16.

- [ ] **Étape 3 : Modifier `app/layout.tsx`**

Ajouter l'import `Viewport` et l'export `viewport`, et un `<head>` avec preconnect. Remplacer le contenu complet :

```typescript
import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  themeColor: '#1A4D35',
}

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
      opens: contact.hours.weekdays.open.replace('h', ':'),
      closes: contact.hours.weekdays.close.replace('h', ':'),
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: contact.hours.saturday.open.replace('h', ':'),
      closes: contact.hours.saturday.close.replace('h', ':'),
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: contact.hours.sunday.open.replace('h', ':'),
      closes: contact.hours.sunday.close.replace('h', ':'),
    },
  ],
}

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
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
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

> **Note :** Si `Viewport` n'est pas exporté par `next` dans cette version, retirer l'export `viewport` et l'import — le `themeColor` est une optimisation non bloquante.

- [ ] **Étape 4 : Vérification build complète**

```bash
npx tsc --noEmit
```

Attendu : 0 erreur.

```bash
npm run build
```

Attendu : build réussi, 22 pages statiques, 1 API route. Vérifier qu'aucun warning TypeScript n'est émis.

- [ ] **Étape 5 : Audit Lighthouse (si Chrome disponible)**

```bash
npm run start &
npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html --chrome-flags="--headless" --only-categories=performance,accessibility,best-practices,seo
```

Cible : Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90.

Si Chrome absent : noter dans le rapport de livraison que l'audit devra être fait depuis le navigateur (DevTools → Lighthouse) après déploiement.

- [ ] **Étape 6 : Commit**

```bash
git add .env.example app/layout.tsx
git commit -m "feat: add .env.example, preconnect Unsplash, theme-color viewport"
```

---

## Self-Review

**Couverture spec :**
- ✅ Rate limiting `/api/contact` → Task 2
- ✅ Server validation errors visibles → Task 3
- ✅ `sitemap.ts` satisfies → Task 1
- ✅ `ContactFormData` dead code supprimé → Task 1
- ✅ `.env.example` créé → Task 4
- ✅ `.env.local` vérifié (existant, gitignored) → documenté dans Task 4 intro
- ✅ `WHATSAPP_NUMBER` → '221339421192' → Task 1
- ✅ `contact.phone` → '+221 33 942 11 92' → Task 1
- ✅ `contact.address` → adresse complète → Task 1
- ✅ Lighthouse optimisations statiques (preconnect, themeColor) → Task 4

**Pas de placeholder** — tout le code est complet dans chaque étape.

**Cohérence des types :**
- `FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>` — défini et utilisé dans Task 3 ✅
- `Viewport` import de `'next'` — même source que `Metadata` ✅
- `{ slug: string }[]` dans sitemap satisfies — minimal, correspond aux champs utilisés ✅
