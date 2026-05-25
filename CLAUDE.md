# CLAUDE.md — FEMCOEUR

Instructions pour Claude Code travaillant sur ce projet.

## Stack

- **Next.js 16** (App Router, `app/(site)/` pour les routes publiques)
- **Sanity CMS** (singletons + documents — schema dans `sanity/schema/`)
- **Tailwind CSS v4** (config inline dans `app/globals.css`)
- **shadcn/ui** pour les primitives UI
- **lucide-react** pour les icônes
- TypeScript strict

## Conventions de nommage

| Dossier | Convention | Pourquoi |
|---|---|---|
| `components/ui/` | kebab-case (`button.tsx`) | Primitives shadcn |
| `components/content/`, `components/layout/`, `components/forms/` | PascalCase (`WelcomeSection.tsx`) | Composants applicatifs custom |

**Ne pas mélanger** : kebab-case dans `ui/`, PascalCase ailleurs.

## Composants partagés — utilise-les TOUJOURS quand le pattern colle

### Layout primaires

- **`<PageHero>`** (`components/content/shared/`) — pour tous les heros de page (gradient + blobs + 2 illustrations rotées + badge). N'INJECTE PAS un hero custom, étends `PageHero`.
- **`<EditorialCard>`** — carte gradient rounded-3xl avec barre d'accent gauche + bouton centré. Utilisée sur home (WelcomeSection) et join (JoinHeroSection).
- **`<NumberedCard>`** — carte avec numéro filigrane (01, 02...). 2 variantes : `dark` (sur sections navy) / `light` (sur sections claires). Prop `layout="row"` (liste verticale) ou `"column"` (grille).
- **`<FollowUsSection>`** — section "Suivez-nous". Toujours alimentée par `siteSettings.socialLinks` (jamais hardcodé).
- **`<EmptyState>`** — pour TOUTES les listes vides (articles, événements, membres). Pas de carte vide inline.

### UI helpers

- **`<Reveal>`** (`components/ui/`) — scroll reveal via IntersectionObserver. **À utiliser UNIQUEMENT sur les sections numérotées** (WhatWeDo, KeyActions, Values, Modalités). Pas ailleurs (pollution visuelle).
- **`<SquiggleUnderline>`** — squiggle décoratif sous un texte highlighted.
- **`<FemcoeurMark>`** — rendu "FEM" (foreground) + "COEUR" (primary) + squiggle.
- **`<TitleWithFemcoeurMark title="...">`** — wrapper qui détecte "FEMCOEUR" dans un titre Sanity et le remplace par `<FemcoeurMark>`.

## Utility classes (`app/globals.css`)

Pour toute card "light" sur fond clair :

| Classe | Effet |
|---|---|
| `card-base` | shell : `rounded-2xl bg-card border border-primary/12 shadow-sm` |
| `card-interactive` | hover : lift -translate-y-1 + shadow-xl + border-primary/30 |
| `card-interactive-subtle` | hover plus discret : -translate-y-0.5 + shadow-lg |

**Ne PAS dupliquer le shell inline**. Si tu écris `rounded-2xl bg-card border border-primary/12 shadow-sm`, utilise `card-base` à la place.

## Règles de design

### Couleurs

- **JAMAIS** de couleurs hardcodées (`#ed6b3c`, etc.)
- Toujours via variables CSS / classes Tailwind : `text-primary`, `bg-secondary`, `border-primary/12`, etc.
- Variables définies dans `app/globals.css` (`:root` et `.dark`)

### Layout cards (règle non-évidente)

- **Card dans liste verticale** (1/row, beaucoup de largeur) → `layout="row"` : icône à gauche du titre
- **Card dans grille horizontale** (3-4/row, largeur compressée) → `layout="column"` : icône au-dessus du titre
- **Mobile** : toujours side-by-side (icône+titre en row, description en dessous full-width)

### Responsive

- Mobile-first, breakpoints Tailwind standard (`sm:`, `md:`, `lg:`)
- Titres `<h2>` de section : `text-2xl sm:text-3xl md:text-4xl` (jamais commencer en text-3xl mobile)
- Titres `<h1>` de hero : peuvent rester gros (`text-3xl md:text-4xl lg:text-5xl`)
- Padding cards mobile réduit (`p-4 sm:p-7` plutôt que `p-7` partout)

### Animations

- Pas d'anim au load sur les heros — gardés statiques (le user n'aime pas)
- Hover sur illustrations heros = **CSS only** (`group-hover:rotate-0`) — pas de JS, pas de `"use client"`
- Reveal scroll = seulement sur sections numérotées

## Workflow Sanity

### Après tout changement schema OU query

```bash
npx sanity typegen generate
```

Sans ça, les types `XxxQueryResult` dans `sanity.types.ts` sont périmés → erreurs TS.

### Sources de vérité uniques

| Donnée | Schema | Pourquoi |
|---|---|---|
| Réseaux sociaux | `siteSettings.socialLinks` | Affiché sur home + join. Une seule source pour éviter divergence. |
| Email d'adhésion | `siteSettings.contactEmails` (label "Adhésion") | Récupéré par JoinCtaSection. |

### Fetchers

`lib/sanity/fetch.ts` — utilise `client.fetch<XxxQueryResult>(...)` avec generic explicite (force la cohérence query/type, plus safe que l'annotation manuelle).

### Imports de types côté composants

Importer depuis `@/lib/types/sanity`, jamais directement depuis `@/sanity.types`. Le fichier `lib/types/sanity.ts` re-exporte les types nommés (`Article`, `Member`, `Event`, etc.).

## Conventions UX

### Liens externes

Auto-détection : `href.startsWith("http")` → ajouter `target="_blank"` + `rel="noopener noreferrer"`. Liens internes (`/about`, `#adhesion`) restent dans l'onglet courant.

### Cards cliquables (stretched-link)

Pour une carte cliquable avec bouton interne (ex. EventCard) : NE PAS utiliser un overlay link absolute. Pattern correct : `<Link>` sur le titre avec `::after { content: '' position: absolute inset-0 }`. Boutons internes en `relative z-10` au-dessus.

### Icônes

- `lib/icons.ts` exporte `getIcon(name)` qui mappe les valeurs Sanity `iconPicker` vers les composants lucide
- Pour ajouter une icône au picker : modifier `sanity/schema/objects/iconPicker.ts` + `lib/icons.ts` simultanément

### PortableText

Toujours utiliser `basePortableTextComponents` (`lib/portable-text-components.tsx`) pour le rendu — il gère les styles cohérents (h2, h3, strong en orange, blockquote, listes, lien `center`, etc.).

## Décisions remarquables (gotchas)

1. **"FEMCOEUR" dans les titres Sanity** doit être tapé en un seul mot (case-insensitive, mais pas d'espace). `TitleWithFemcoeurMark` détecte via regex `/FEMCOEUR/i`. Si la content manager écrit "Fem Coeur", le rendu fallback à texte plat.

2. **Schema `testimonial` conservé** sans UI active. Les données potentielles en Sanity sont préservées. Si tu ajoutes une section témoignages, recrée juste la query + le composant.

3. **`whyJoin` retiré** de `joinPage` schema. La section "Suivez-nous" sur cette page utilise `siteSettings.socialLinks`.

4. **Animations heros au load = NON**. L'utilisatrice les trouvait "trop". Garder les heros statiques au chargement, seulement les sections numérotées ont des Reveal scroll.

5. **Modal events vs page détail** : on a choisi page dédiée (`/events/[slug]`) pour la partageabilité et le SEO. Pareil pour blog (`/blog/[slug]`). Pas de modal.

6. **Article lié pour les events passés** : champ `relatedArticle` (référence interne) ou `recapLink` (URL externe), priorité à l'interne. Helper `lib/events/recap.ts`.

7. **`generateStaticParams`** : utiliser le type predicate `event is typeof event & { slug: string }` pour narrowing propre, jamais `as string`.

## Ce qu'il ne faut PAS faire

- ❌ Couleurs hardcodées (hex)
- ❌ Inline shell `rounded-2xl bg-card border-primary/12 shadow-sm` quand `card-base` existe
- ❌ Wrapper hero custom — étends `<PageHero>`
- ❌ Carte cliquable avec overlay `<Link>` nested (a11y issue)
- ❌ `"use client"` pour une simple animation CSS-faisable
- ❌ Imports de types Sanity bricolés (`Awaited<ReturnType<...>>`) — utilise `@/lib/types/sanity`
- ❌ `key={index}` sur des items avec valeur unique stable
- ❌ Anims scroll-reveal sur des sections non-numérotées

## Commands utiles

```bash
npm run dev              # Dev server
npm run build            # Validation TS + build production
npx sanity typegen generate   # Régénérer les types après changement schema/query
```
