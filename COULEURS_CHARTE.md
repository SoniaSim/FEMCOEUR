# Couleurs de la charte graphique

## 🎨 Palette de couleurs

Les couleurs de la charte graphique de FEMCOEUR (Association des Cardiologues Femmes) sont maintenant intégrées dans le projet avec un système sémantique.

### Couleurs de la charte

| Nom | Code hexadécimal | Description |
|-----|------------------|-------------|
| **Orange** | `#ED6B3C` | Couleur primaire / CTA / Actions principales |
| **Yellow** | `#FFB838` | Couleur d'accent / Highlights |
| **Blue** | `#1B3A58` | Couleur secondaire / Texte principal |
| **White/Beige** | `#EDE7D7` | Référence de la charte (inspiré pour les déclinaisons) |

### Couleurs d'interface dérivées

| Nom | Code hexadécimal | Description |
|-----|------------------|-------------|
| **Background** | `#FAF8F2` | Fond principal du site (beige très clair) |
| **Card** | `#FFFFFF` | Fond des cartes (blanc pur) |
| **Muted** | `#F5F1E8` | Zones subtiles, arrière-plans secondaires |
| **Border** | `#E8E3D8` | Bordures, séparateurs |

### Mapping sémantique

Les couleurs sont mappées aux variables Tailwind standard pour une cohérence totale :

| Variable sémantique | Couleur | Usage recommandé |
|---------------------|---------|------------------|
| `primary` | Orange (#ED6B3C) | Boutons principaux, CTA, actions importantes |
| `secondary` | Blue (#1B3A58) | Boutons secondaires, titres |
| `accent` | Yellow (#FFB838) | Highlights, badges, alertes |
| `background` | Beige très clair (#FAF8F2) | Arrière-plan du site |
| `foreground` | Blue (#1B3A58) | Texte principal |
| `card` | Blanc (#FFFFFF) | Fond des cartes |
| `muted` | Beige clair (#F5F1E8) | Arrière-plans subtils |
| `muted-foreground` | Blue clair (#4A5F78) | Texte secondaire |
| `border` | Beige moyen (#E8E3D8) | Bordures, séparateurs |

## 📝 Comment utiliser les couleurs

### ✅ Méthode recommandée : Utiliser les variables sémantiques

**Préférez toujours les variables sémantiques** pour que votre code soit cohérent et facilement maintenable :

```tsx
// ✅ RECOMMANDÉ
<Button className="bg-primary text-primary-foreground">
  Appel à l'action principal (Orange)
</Button>

<Button className="bg-secondary text-secondary-foreground">
  Bouton secondaire (Bleu)
</Button>

<div className="bg-accent text-accent-foreground">
  Zone en surbrillance (Jaune)
</div>

<p className="text-foreground">Texte principal (Bleu)</p>
<p className="text-muted-foreground">Texte secondaire (Bleu clair)</p>
```

### Utilisation avancée

```tsx
// Arrière-plans
<div className="bg-primary">...</div>        // Bleu
<div className="bg-secondary">...</div>      // Orange
<div className="bg-accent">...</div>         // Jaune
<div className="bg-muted">...</div>          // Beige clair

// Texte
<p className="text-primary">...</p>
<p className="text-secondary">...</p>
<p className="text-foreground">...</p>       // Texte principal
<p className="text-muted-foreground">...</p> // Texte secondaire

// Bordures
<div className="border-primary">...</div>
<div className="border-secondary">...</div>

// Avec opacité
<div className="bg-primary/50">...</div>
<div className="text-secondary/80">...</div>

// Hover et états
<button className="bg-primary hover:bg-primary/90">...</button>
```

### Accès direct aux couleurs de la charte (rare)

Si vous avez besoin d'accéder directement aux couleurs de la charte :

```tsx
// 🔸 USAGE RARE - Préférez les variables sémantiques
<div className="bg-brand-orange">...</div>
<div className="bg-brand-yellow">...</div>
<div className="bg-brand-blue">...</div>
<div className="bg-brand-white">...</div>
```

### Dans les styles CSS

```css
.mon-element {
  /* ✅ Recommandé */
  background-color: var(--primary);
  color: var(--primary-foreground);
  
  /* Ou accès direct */
  border: 2px solid var(--brand-orange);
}
```

## 🎯 Guide d'utilisation

### Boutons

- **Bouton CTA principal** : `bg-primary text-primary-foreground` (Orange)
- **Bouton secondaire** : `bg-secondary text-secondary-foreground` (Bleu)
- **Bouton subtle** : `bg-muted text-muted-foreground`

### Texte

- **Titre principal** : `text-foreground` ou `text-secondary` (Bleu)
- **Texte normal** : `text-foreground` (Bleu)
- **Texte secondaire** : `text-muted-foreground` (Bleu clair)
- **Lien/CTA** : `text-primary hover:text-primary/80` (Orange)

### Arrière-plans

- **Fond principal** : `bg-background`
- **Carte** : `bg-card`
- **Section en surbrillance** : `bg-accent`
- **Section subtile** : `bg-muted`

## 🌓 Mode sombre

Le mode sombre est automatiquement géré avec les mêmes variables sémantiques. Les couleurs s'adaptent automatiquement.

## 📍 Localisation

Les couleurs sont définies dans :
- `app/globals.css` : Variables CSS et configuration Tailwind

## 💡 Avantages de cette approche

1. **Cohérence** : Tout le site utilise automatiquement les bonnes couleurs
2. **Maintenabilité** : Changez une couleur à un seul endroit
3. **Accessibilité** : Les contrastes sont gérés automatiquement avec les variables `-foreground`
4. **Mode sombre** : Fonctionne automatiquement
5. **Composants UI** : Tous les composants shadcn/ui utilisent ces variables

