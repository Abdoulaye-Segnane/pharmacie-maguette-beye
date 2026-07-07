# Phase 5 — Finitions & Production-ready — Design Spec

**Date :** 2026-07-07  
**Statut :** Approuvé

---

## Objectif

Préparer le site pour la mise en production : corriger les minors déférés de Phase 4, remplacer les données placeholder par les vraies coordonnées, documenter les variables d'environnement, et optimiser pour Lighthouse > 90.

---

## Subsystème 1 — Corrections code (minors déférés Phase 4)

### 1a. Rate limiting sur `/api/contact`

**Fichier :** `app/api/contact/route.ts`

Map en mémoire à fenêtre glissante. Seuil : 5 requêtes par IP par 60 secondes.

```typescript
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
```

L'IP est lue depuis `request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '127.0.0.1'`.

Si rate limité → `Response.json({ error: 'Trop de requêtes. Réessayez dans une minute.' }, { status: 429 })`.

La vérification rate limit se fait AVANT le parsing Zod.

### 1b. Erreurs de validation visibles dans `ContactForm.tsx`

**Fichier :** `components/sections/contact/ContactForm.tsx`

Ajouter un état `fieldErrors: Partial<Record<'name' | 'email' | 'message', string>>`.

Sur `!res.ok` : lire `res.json()` pour récupérer `details` (fieldErrors Zod). Afficher l'erreur sous chaque champ (premier message du tableau). Sur erreur réseau (fetch throws) : afficher le message générique existant.

```typescript
const [fieldErrors, setFieldErrors] = useState<Partial<Record<'name' | 'email' | 'message', string>>>({})

// Dans handleSubmit, remplacer le catch actuel par :
if (!res.ok) {
  const data: { error: string; details?: Record<string, string[]> } = await res.json()
  const errs: Partial<Record<'name' | 'email' | 'message', string>> = {}
  if (data.details) {
    for (const key of ['name', 'email', 'message'] as const) {
      if (data.details[key]?.[0]) errs[key] = data.details[key][0]
    }
  }
  setFieldErrors(errs)
  setStatus('error')
  return
}
setFieldErrors({})
setStatus('success')
```

Afficher sous chaque `<input>` / `<textarea>` :
```tsx
{fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
```

Réinitialiser `fieldErrors` au début de chaque soumission (`setFieldErrors({})`).

### 1c. `sitemap.ts` — ajouter `satisfies`

**Fichier :** `app/sitemap.ts`

```typescript
const products = productsData satisfies { slug: string }[]
const articles = articlesData satisfies { slug: string }[]
```

Remplacer les usages inline de `productsData.map(...)` et `articlesData.map(...)` par `products.map(...)` et `articles.map(...)`.

### 1d. Supprimer `ContactFormData` dead code

**Fichier :** `lib/types.ts`

Supprimer l'interface `ContactFormData` (jamais importée). Vérifier avec `npx tsc --noEmit` que 0 erreur.

---

## Subsystème 2 — Variables d'environnement

### 2a. Créer `.env.example`

À la racine du projet (commité dans git) :

```
# Resend — service d'envoi d'emails
# Créer un compte sur https://resend.com (plan gratuit : 100 emails/jour)
# Le domaine "from" doit être vérifié dans Resend
RESEND_API_KEY=re_VOTRE_CLE_API_RESEND
```

Note : `RESEND_FROM_EMAIL` et `RESEND_TO_EMAIL` sont des constantes dans `lib/constants.ts`, pas des variables d'environnement.

### 2b. Vérifier `.env.local`

Le fichier `.env.local` existe déjà (gitignored, créé en Phase 4) avec `RESEND_API_KEY=re_VOTRE_CLE_API_RESEND`. Vérifier sa présence sans le modifier.

---

## Subsystème 3 — Données réelles

**Fichier :** `lib/constants.ts`

| Constante | Valeur actuelle | Valeur cible |
|-----------|----------------|--------------|
| `WHATSAPP_NUMBER` | `'221770000000'` | `'221339421192'` |
| `contact.phone` | `'+221 33 941 00 00'` | `'+221 33 942 11 92'` |
| `contact.address` | `'Kaolack, Sénégal'` | `'Dialègne N°4766, derrière Nouveau Bloc Scientifique du Collège, Kaolack'` |

Après modification, vérifier que `toTelUri(contact.phone)` produit `tel:+221339421192`.

---

## Subsystème 4 — Optimisations Lighthouse

### 4a. Optimisations statiques (appliquées sans audit)

**`app/layout.tsx`** — ajouter dans `<head>` via metadata ou `<link>` :
- `<link rel="preconnect" href="https://images.unsplash.com">` pour réduire la latence des images Unsplash
- `theme-color` : `#1A4D35` (vert foncé) dans les metadata Next.js

**`lib/seo.ts` / `baseMetadata`** :
```typescript
themeColor: '#1A4D35',
```

**Vérifications structurelles :**
- Heading hierarchy : h1 unique par page, h2 → h3 sans saut ✓ (à confirmer)
- `lang="fr"` sur `<html>` ✓ (déjà en place)
- Images above-fold avec `priority` ✓ (Hero, blog hero)
- `alt` text sur toutes les images ✓ (déjà en place)

### 4b. Audit Lighthouse (si Chrome disponible)

```bash
npm run build && npm run start &
npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html --chrome-flags="--headless"
```

Si Chrome absent : documenter les scores estimés et noter dans le rapport de livraison.

**Cible :** Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 90.

---

## Vérification finale

```bash
npx tsc --noEmit   # 0 erreur
npm run build      # ✓ sans warning
```

---

## Fichiers touchés

| Action | Fichier |
|--------|---------|
| MODIFY | `lib/constants.ts` |
| MODIFY | `lib/types.ts` |
| MODIFY | `app/sitemap.ts` |
| MODIFY | `app/api/contact/route.ts` |
| MODIFY | `app/layout.tsx` |
| MODIFY | `lib/seo.ts` |
| MODIFY | `components/sections/contact/ContactForm.tsx` |
| CREATE | `.env.example` |
