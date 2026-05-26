# Phase 2 — Layout + UI Primitives

**Date:** 2026-05-26  
**Statut:** Approuvé

## Contexte

Suite de la Phase 1 (infrastructure). Construction des composants de base nécessaires avant les sections de page (Phase 3).

Stack : Next.js 16.2.6, TypeScript 5 strict, Tailwind CSS v4, framer-motion 12, clsx.

## Périmètre

Uniquement `components/ui/` et `components/layout/`. Pas de pages, pas de sections de contenu.

## Décisions de design

| Question | Choix |
|----------|-------|
| Style header | C — fond vert très léger (`rgba(45,122,92,0.06)`), logo bilingue, glassmorphism |
| Style boutons | A — coins arrondis 8px, 3 variants, 3 tailles |
| Architecture | Atomic : primitives séparées, composites qui les consomment |

## Fichiers créés

```
components/
  ui/
    Button.tsx       variants: primary | outline | ghost; tailles: sm | md | lg
    Card.tsx         wrapper générique padding + shadow
    Badge.tsx        étiquette colorée: green | gold | gray
  layout/
    Header.tsx       logo bilingue, nav desktop, hamburger → MobileNav, CTA
    Footer.tsx       infos + liens + copyright
    MobileNav.tsx    drawer framer-motion depuis la droite
```

---

## Spec composants

### `components/ui/Button.tsx`

**Props :**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}
```

**Variants :**
- `primary` — `bg-green-primary text-white hover:bg-green-dark`
- `outline` — `border-2 border-green-primary text-green-primary hover:bg-green-primary hover:text-white`
- `ghost` — `text-gray-dark underline hover:text-green-primary`

**Tailles :**
- `sm` — `px-3 py-1.5 text-sm`
- `md` — `px-5 py-2.5 text-base` (défaut)
- `lg` — `px-7 py-3.5 text-lg`

**Commun :** `rounded-lg font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary`

**`asChild` :** Quand `true`, rend un `<span>` wrappé pour permettre l'usage avec `<a>` via composition. Le parent passe ses classes au child.

---

### `components/ui/Card.tsx`

**Props :**
```typescript
interface CardProps {
  className?: string;
  children: React.ReactNode;
}
```

**Rendu :** `<div className={cn('bg-white rounded-xl shadow-sm border border-gray-100', className)}>`

Simple wrapper sans logique — tout le contenu via `children`.

---

### `components/ui/Badge.tsx`

**Props :**
```typescript
interface BadgeProps {
  color?: 'green' | 'gold' | 'gray';
  children: React.ReactNode;
  className?: string;
}
```

**Couleurs :**
- `green` — `bg-green-primary/10 text-green-dark`
- `gold` — `bg-gold/20 text-amber-800`
- `gray` — `bg-gray-100 text-gray-dark`

**Commun :** `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium`

---

### `components/layout/MobileNav.tsx`

**Props :**
```typescript
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavItem[];
}
```

**Comportement :**
- Drawer depuis la droite, largeur `w-72`
- Overlay sombre `bg-black/40` derrière
- Fermeture : bouton ✕, clic overlay, touche `Escape`
- Animation framer-motion : `x: '100%' → x: 0` (entrée), inverse (sortie)
- `AnimatePresence` pour le unmount propre

---

### `components/layout/Header.tsx`

**Aucune prop** — consomme `navLinks` et `contact` depuis `lib/constants` directement.

**Structure :**
```
<header sticky top-0 z-50 backdrop-blur-sm>
  <nav max-w-6xl mx-auto px-4 h-16 flex items-center justify-between>
    Logo bilingue (lien vers /)
    Nav desktop (hidden md:flex) — liens navLinks
    CTA desktop: <Button variant="outline" size="sm"> + numéro
    Hamburger mobile (md:hidden) — toggle MobileNav
  </nav>
  <MobileNav isOpen={...} onClose={...} links={navLinks} />
</header>
```

**Logo bilingue :**
```tsx
<Link href="/">
  <span className="text-green-dark font-bold text-sm leading-tight block">Pharmacie</span>
  <span className="text-green-primary text-xs font-medium tracking-widest block">MAGUETTE BEYE</span>
</Link>
```

**Style glassmorphism :**
```css
background: rgba(45, 122, 92, 0.06);
backdrop-filter: blur(8px);
border-bottom: 1px solid rgba(45, 122, 92, 0.1);
```
→ Via classes Tailwind `bg-green-primary/5 backdrop-blur-sm border-b border-green-primary/10`

**État actif :** `usePathname()` pour surligner le lien courant.

---

### `components/layout/Footer.tsx`

**Aucune prop** — consomme `contact`, `navLinks`, `PHARMACY_NAME` depuis `lib/constants`.

**Structure 2 colonnes :**
```
bg-green-dark text-white
├── Col gauche : nom, adresse, téléphone (formatPhone), horaires (formatHours)
└── Col droite : liens nav (NavItem[])
Copyright line : © {année} PHARMACY_NAME
```

---

## Données

Aucune donnée statique dans les composants. Tout vient de `lib/constants.ts` :
- `navLinks: NavItem[]` → Header + Footer + MobileNav
- `contact: ContactInfo` → Header (tel CTA) + Footer
- `PHARMACY_NAME` → Footer copyright

## Critères de succès

- [ ] `npx tsc --noEmit` — 0 erreur
- [ ] `Button`, `Card`, `Badge` utilisables avec `@/components/ui/*`
- [ ] `Header`, `Footer` importables dans `app/layout.tsx`
- [ ] Mobile nav s'ouvre/ferme avec animation framer-motion
- [ ] Lien actif dans la nav détecté via `usePathname()`
- [ ] Aucun `any`, aucun hardcode de texte dans les composants
