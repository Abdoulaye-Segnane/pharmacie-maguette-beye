# Phase 4 — Pages secondaires + SEO complet — Design

**Date :** 2026-07-04  
**Statut :** Approuvé

---

## Contexte

Les phases 1–3 sont terminées. La page d'accueil est assemblée (`app/(pages)/page.tsx`), le layout (Header, Footer), les UI primitives (Button, Card, Badge, AnimatedSection) et les données statiques (features, testimonials, articles) existent.

Cette phase construit les pages secondaires manquantes et le SEO global.

---

## Décisions de design

| Thème | Décision |
|-------|----------|
| Corps des articles blog | Fichiers MDX dans `content/blog/[slug].mdx` |
| Parsing MDX | `gray-matter` (frontmatter) + `remark` + `remark-html` (MD→HTML) |
| Table des matières | Extraction par regex des `## Titres` avant conversion remark |
| Email formulaire contact | Service **Resend** — SDK officiel TypeScript |
| Schema produits | Simple : `id, name, slug, category, description, image, available` |
| Filtre / recherche catalogue | `Array.filter` natif côté client — pas de dépendance externe |
| Navigation | Mise à jour `navLinks` : ajouter Catalogue + Blog, retirer Services (page inexistante) |

---

## Nouvelles dépendances npm

```
resend          # email API
gray-matter     # parse YAML frontmatter des fichiers MDX
remark          # processeur Markdown
remark-html     # plugin remark → HTML string
```

---

## Architecture des fichiers

### Nouveaux fichiers

```
content/
  blog/
    hydratation-chaleur-senegal.mdx
    paludisme-prevention-traitement.mdx
    vitamines-immunite.mdx
data/
  products.json                       # 8 produits, 4 catégories
  team.ts                             # 3 membres (TypeScript typé)
app/
  (pages)/
    a-propos/
      page.tsx
    catalog/
      page.tsx
      [slug]/
        page.tsx
    blog/
      page.tsx
      [slug]/
        page.tsx
    contact/
      page.tsx
  api/
    contact/
      route.ts
  sitemap.ts
  robots.ts
components/
  sections/
    about/
      AboutHero.tsx
      TeamSection.tsx
      ValuesSection.tsx
    catalog/
      CatalogClient.tsx              # 'use client' — filtre + search
      ProductCard.tsx
    blog/
      BlogClient.tsx                 # 'use client' — filtre catégories
      ArticleCard.tsx
      TableOfContents.tsx            # 'use client' — scroll highlight
    contact/
      ContactForm.tsx                # 'use client' — controlled form
```

### Fichiers modifiés

```
lib/types.ts          # Ajouter Product, TeamMember, ContactFormData ; Article += category
lib/constants.ts      # Ajouter RESEND_FROM_EMAIL, RESEND_TO_EMAIL
data/articles.json    # Ajouter champ "category" à chaque article
app/layout.tsx        # Ajouter LocalBusiness JSON-LD
```

---

## Types (lib/types.ts)

Ajouter à la fin du fichier existant :

```typescript
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

Modifier `Article` pour ajouter `category` :

```typescript
export interface Article {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
  category: string   // AJOUT
}
```

---

## Constantes (lib/constants.ts)

Ajouter :

```typescript
export const RESEND_FROM_EMAIL = 'contact@pharmaciemaguettebeye.sn' as const;
export const RESEND_TO_EMAIL   = 'contact@pharmaciemaguettebeye.sn' as const;
```

Mettre à jour `navLinks` :

```typescript
export const navLinks: NavItem[] = [
  { label: 'Accueil',    href: '/' },
  { label: 'Catalogue',  href: '/catalog' },
  { label: 'Blog',       href: '/blog' },
  { label: 'À propos',   href: '/a-propos' },
  { label: 'Contact',    href: '/contact' },
];
```

---

## Données statiques

### data/articles.json — mise à jour

Ajouter `"category"` à chaque article existant :

```json
[
  { ..., "category": "Hydratation" },
  { ..., "category": "Prévention" },
  { ..., "category": "Immunité" }
]
```

### data/products.json — nouveau

8 produits répartis en 4 catégories : Antalgiques, Vitamines, Dermatologie, Pédiatrie.

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

### data/team.ts — nouveau

```typescript
import type { TeamMember } from '@/lib/types'

export const team: TeamMember[] = [
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

### Fichiers MDX — content/blog/

Chaque fichier a un frontmatter YAML minimal (pour compatibilité gray-matter) suivi du contenu Markdown. Le titre H1 n'est pas inclus (affiché depuis `articles.json`).

#### content/blog/hydratation-chaleur-senegal.mdx

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

#### content/blog/paludisme-prevention-traitement.mdx

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

#### content/blog/vitamines-immunite.mdx

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

---

## Pages — Design détaillé

### Page À propos (`app/(pages)/a-propos/page.tsx`)

Server Component. Métadonnées via `generateMetadata()`. 3 sections :

**1. Hero about** : `bg-green-dark`, titre « Notre histoire », sous-titre, photo pharmacie (Unsplash).

**2. Histoire** : paragraphes de texte statiques (fondation, mission, valeurs). Données hardcodées dans le composant (pas de fichier data séparé — YAGNI pour une page unique).

**3. Équipe** : `TeamSection` — grille 1→3 colonnes, cards depuis `data/team.ts`. Chaque card : photo ronde (96×96), nom, rôle.

**4. Valeurs** : 3 valeurs (Authenticité, Proximité, Excellence) avec icônes inline SVG, fond `bg-gray-50`.

---

### Page Catalogue (`app/(pages)/catalog/page.tsx`)

Server Component charge `data/products.json`, extrait les catégories uniques, passe les deux au composant `CatalogClient`.

**CatalogClient** (`'use client'`):
- `useState<string>('')` pour la query de recherche
- `useState<string>('Tous')` pour la catégorie active
- Filtre : `products.filter(p => matchesCategory && matchesQuery)` (case-insensitive sur name + description)
- Rendu : input search + boutons catégories + grille `ProductCard`

**ProductCard** (Server Component réutilisable) :
- Image `next/image` fill
- Nom + description (line-clamp-2)
- Badge disponible/indisponible (color green/gray)
- `<Link href="/catalog/[slug]">`

---

### Page détail produit (`app/(pages)/catalog/[slug]/page.tsx`)

```typescript
export function generateStaticParams() → lire products.json, retourner [{ slug }]
export function generateMetadata({ params }) → titre + description depuis produit
```

Contenu :
- Fil d'Ariane : Accueil → Catalogue → Nom produit
- Image (400×400), nom, catégorie badge, disponibilité badge, description complète
- JSON-LD `Product` schema :
  ```json
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "...",
    "description": "...",
    "image": "...",
    "brand": { "@type": "Brand", "name": "Pharmacie Maguette Beye" },
    "offers": { "@type": "Offer", "availability": "InStock|OutOfStock", "priceCurrency": "XOF" }
  }
  ```
- Section "Produits similaires" : même catégorie, max 3, exclu le produit actuel

---

### Page Blog (`app/(pages)/blog/page.tsx`)

Server Component charge `data/articles.json` (avec `category`), extrait catégories uniques, passe au `BlogClient`.

**BlogClient** (`'use client'`):
- `useState<string>('Tous')` pour filtre catégorie
- Boutons de filtre + grille `ArticleCard`

**ArticleCard** :
- Image `next/image` fill (h-48)
- Badge catégorie (color gold)
- Date formatée via `formatDate()`
- Titre (line-clamp-2), excerpt (line-clamp-3)
- Lien `/blog/[slug]`

---

### Page article (`app/(pages)/blog/[slug]/page.tsx`)

```typescript
export function generateStaticParams() → articles.json slugs
export function generateMetadata({ params }) → titre, description, OG image
```

**Pipeline serveur** (dans le composant page, pas de helper séparé) :
1. Trouver l'article dans `articles.json` par slug
2. Lire `content/blog/[slug].mdx` via `fs.readFileSync`
3. `gray-matter` pour parser frontmatter + corps Markdown
4. Extraire ToC : regex `/^## (.+)/gm` sur le contenu Markdown brut → `{ id: slugify(title), title }`
5. Convertir corps en HTML : `remark().use(remarkHtml).process(content)`

**Contenu** :
- Image hero (h-72)
- Catégorie badge + date + titre H1
- `TableOfContents` (`'use client'`) : liens vers les ancres H2, mise en surbrillance de la section active via `IntersectionObserver`
- Corps HTML : `<article dangerouslySetInnerHTML={{ __html: html }}>`
- JSON-LD `BlogPosting` schema
- Section "Articles recommandés" : même catégorie, max 2, excl. article actuel

**Styles de l'article** : `@tailwindcss/typography` n'est PAS installé dans ce projet. Utiliser des styles CSS custom dans `styles/colors.css` sous `@layer base` ciblant `.article-body h2, .article-body p, .article-body ul, .article-body li, .article-body strong`. Appliquer la classe `article-body` sur le `<article>`.

---

### Page Contact (`app/(pages)/contact/page.tsx`)

Server Component wrapper + `ContactForm` (`'use client'`).

**ContactForm** :
- `useState` pour `name`, `email`, `message`, `status: 'idle' | 'loading' | 'success' | 'error'`
- Validation locale minimale (champs non vides) avant envoi
- `fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })`
- États visuels : bouton désactivé pendant loading, message de succès vert, message d'erreur rouge

**app/api/contact/route.ts** :
```typescript
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function POST(request: Request): Promise<Response> {
  const body = await request.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return Response.json({ error: 'Données invalides' }, { status: 400 })

  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: RESEND_TO_EMAIL,
    subject: `Message de ${parsed.data.name}`,
    text: `Nom: ${parsed.data.name}\nEmail: ${parsed.data.email}\n\n${parsed.data.message}`,
  })
  return Response.json({ success: true })
}
```

**Variable d'environnement** : `RESEND_API_KEY` dans `.env.local` (ne pas commiter).

---

### SEO Global

#### app/sitemap.ts

```typescript
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import productsData from '@/data/products.json'
import articlesData from '@/data/articles.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/a-propos', '/catalog', '/blog', '/contact']
  const productRoutes = productsData.map(p => ({ url: `${SITE_URL}/catalog/${p.slug}` }))
  const articleRoutes = articlesData.map(a => ({ url: `${SITE_URL}/blog/${a.slug}` }))
  return [
    ...staticRoutes.map(path => ({ url: `${SITE_URL}${path}`, changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : 0.8 })),
    ...productRoutes.map(r => ({ ...r, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...articleRoutes.map(r => ({ ...r, changeFrequency: 'weekly' as const, priority: 0.7 })),
  ]
}
```

#### app/robots.ts

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

#### LocalBusiness JSON-LD — app/layout.tsx

Ajouter dans le `<head>` via `<script type="application/ld+json">` :

```json
{
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  "name": "Pharmacie Maguette Beye",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kaolack",
    "addressCountry": "SN"
  },
  "telephone": "+221339410000",
  "email": "contact@pharmaciemaguettebeye.sn",
  "url": "https://pharmaciemaguettebeye.sn",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday"],
      "opens": "09:00",
      "closes": "14:00"
    }
  ]
}
```

---

## Critères de succès

- `npm run build` — 0 erreur TypeScript, 0 erreur de build
- Toutes les pages générées en statique (SSG) à l'exception de l'API route `/api/contact`
- Lighthouse SEO > 95 sur page d'accueil
- Formulaire contact : validation Zod, réponse 200/400/500 correcte
- ToC : liens fonctionnels vers les ancres H2 de l'article

---

## Points d'attention implémentation

1. **AGENTS.md** : Cette version de Next.js peut différer de la documentation en ligne. Lire `node_modules/next/dist/docs/` avant d'écrire du code Next.js.
2. **`fs` dans App Router** : `fs.readFileSync` fonctionne dans les Server Components — ne jamais importer `fs` dans un `'use client'`.
3. **`dangerouslySetInnerHTML`** : Acceptable ici car le HTML vient de `remark-html` (contenu autheurisé, contenu statique contrôlé).
4. **Slugify ToC** : Utiliser une fonction `slugify` inline (`text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')`). Le HTML généré par `remark-html` n'ajoute pas d'`id` aux headings par défaut. Post-traiter le HTML avec un regex :
   ```typescript
   const htmlWithIds = html.replace(/<h2>(.*?)<\/h2>/g, (_, title) => {
     return `<h2 id="${slugify(title)}">${title}</h2>`
   })
   ```
   La même fonction `slugify` génère les `href="#..."` de la ToC. Cohérence garantie.
5. **`process.env.RESEND_API_KEY`** : Disponible côté serveur uniquement (pas de `NEXT_PUBLIC_` prefix). L'API route est correctement serveur.
6. **Styles article** : `@tailwindcss/typography` absent — styles du corps d'article entièrement en CSS custom (classe `.article-body`) dans `styles/colors.css`.
