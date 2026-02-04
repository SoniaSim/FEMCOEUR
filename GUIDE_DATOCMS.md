# Guide de configuration Dato CMS

Ce guide vous accompagne étape par étape pour créer tous les modèles nécessaires dans Dato CMS.

## 📋 Prérequis

1. Créer un compte sur [Dato CMS](https://www.datocms.com/)
2. Créer un nouveau projet
3. Récupérer votre **API Token** dans Settings > API tokens

## 🏗️ Modèles à créer

Vous devez créer **6 modèles** dans Dato CMS :

1. **Page** - Pages statiques (Accueil, À propos, etc.)
2. **Article** - Articles de blog
3. **Event** - Événements
4. **Member** - Membres de l'association
5. **Resource** - Ressources documentaires
6. **Testimonial** - Témoignages

---

## 1️⃣ Modèle : Page

**Objectif** : Gérer les pages statiques du site (Accueil, À propos, etc.)

### Champs à créer :

| Nom du champ | Type | Options | Requis |
|-------------|------|---------|--------|
| `title` | Text | - | ✅ Oui |
| `slug` | Slug | Basé sur `title` | ✅ Oui |
| `content` | Structured text | - | ✅ Oui |
| `seo` | Modular content | - | ❌ Non |

### Détails des champs :

#### `title` (Text)
- **Label** : Titre
- **Type** : Single-line string
- **Requis** : Oui

#### `slug` (Slug)
- **Label** : Slug
- **Type** : Slug
- **Requis** : Oui
- **Options** : Générer automatiquement depuis `title`

#### `content` (Structured text)
- **Label** : Contenu
- **Type** : Structured text
- **Requis** : Oui
- **Options** : Activer les blocs de texte, listes, liens

#### `seo` (Modular content)
- **Label** : SEO
- **Type** : Single block
- **Requis** : Non
- **Bloc à créer** : "SEO Block" avec les champs :
  - `title` (Text) - Titre SEO
  - `description` (Text) - Description SEO
  - `image` (Image) - Image SEO

### Exemple de contenu :
- **Slug** : `home`
- **Titre** : "Bienvenue à FEMCOEUR"
- **Contenu** : Texte de présentation de l'association

---

## 2️⃣ Modèle : Article

**Objectif** : Gérer les articles de blog

### Champs à créer :

| Nom du champ | Type | Options | Requis |
|-------------|------|---------|--------|
| `title` | Text | - | ✅ Oui |
| `slug` | Slug | Basé sur `title` | ✅ Oui |
| `author` | Text | - | ✅ Oui |
| `date` | Date | - | ✅ Oui |
| `content` | Structured text | - | ✅ Oui |
| `image` | Image | - | ❌ Non |
| `categories` | Multiple choice | - | ❌ Non |
| `seo` | Modular content | - | ❌ Non |

### Détails des champs :

#### `title` (Text)
- **Label** : Titre
- **Type** : Single-line string
- **Requis** : Oui

#### `slug` (Slug)
- **Label** : Slug
- **Type** : Slug
- **Requis** : Oui
- **Options** : Générer automatiquement depuis `title`

#### `author` (Text)
- **Label** : Auteur
- **Type** : Single-line string
- **Requis** : Oui

#### `date` (Date)
- **Label** : Date de publication
- **Type** : Date
- **Requis** : Oui

#### `content` (Structured text)
- **Label** : Contenu
- **Type** : Structured text
- **Requis** : Oui
- **Options** : Activer tous les blocs (texte, images, listes, etc.)

#### `image` (Image)
- **Label** : Image principale
- **Type** : Image
- **Requis** : Non
- **Options** : 
  - Activer "Alt text"
  - Formats acceptés : JPG, PNG, WebP

#### `categories` (Multiple choice)
- **Label** : Catégories
- **Type** : Multiple choice
- **Requis** : Non
- **Options** : 
  - Valeurs suggérées : "Recherche", "Innovation", "Prévention", "Santé des femmes", "Traitement", "Bien-être"

#### `seo` (Modular content)
- **Label** : SEO
- **Type** : Single block
- **Requis** : Non
- **Bloc** : Utiliser le même bloc "SEO Block" que pour Page

---

## 3️⃣ Modèle : Event

**Objectif** : Gérer les événements (conférences, ateliers, etc.)

### Champs à créer :

| Nom du champ | Type | Options | Requis |
|-------------|------|---------|--------|
| `title` | Text | - | ✅ Oui |
| `date` | Date | - | ✅ Oui |
| `location` | Text | - | ✅ Oui |
| `description` | Structured text | - | ✅ Oui |
| `image` | Image | - | ❌ Non |
| `registrationLink` | Link | URL externe | ❌ Non |
| `status` | Single choice | - | ✅ Oui |

### Détails des champs :

#### `title` (Text)
- **Label** : Titre de l'événement
- **Type** : Single-line string
- **Requis** : Oui

#### `date` (Date)
- **Label** : Date de l'événement
- **Type** : Date
- **Requis** : Oui

#### `location` (Text)
- **Label** : Lieu
- **Type** : Single-line string
- **Requis** : Oui

#### `description` (Structured text)
- **Label** : Description
- **Type** : Structured text
- **Requis** : Oui

#### `image` (Image)
- **Label** : Image
- **Type** : Image
- **Requis** : Non
- **Options** : Activer "Alt text"

#### `registrationLink` (Link)
- **Label** : Lien d'inscription
- **Type** : Link (URL)
- **Requis** : Non

#### `status` (Single choice)
- **Label** : Statut
- **Type** : Single choice
- **Requis** : Oui
- **Options** : 
  - `upcoming` - À venir
  - `past` - Passé
  - `cancelled` - Annulé

---

## 4️⃣ Modèle : Member

**Objectif** : Gérer les membres de l'association

### Champs à créer :

| Nom du champ | Type | Options | Requis |
|-------------|------|---------|--------|
| `firstName` | Text | - | ✅ Oui |
| `lastName` | Text | - | ✅ Oui |
| `photo` | Image | - | ❌ Non |
| `biography` | Structured text | - | ✅ Oui |
| `specialty` | Text | - | ✅ Oui |
| `role` | Text | - | ❌ Non |
| `socialLinks` | Modular content | - | ❌ Non |

### Détails des champs :

#### `firstName` (Text)
- **Label** : Prénom
- **Type** : Single-line string
- **Requis** : Oui

#### `lastName` (Text)
- **Label** : Nom
- **Type** : Single-line string
- **Requis** : Oui

#### `photo` (Image)
- **Label** : Photo
- **Type** : Image
- **Requis** : Non
- **Options** : Activer "Alt text"

#### `biography` (Structured text)
- **Label** : Biographie
- **Type** : Structured text
- **Requis** : Oui

#### `specialty` (Text)
- **Label** : Spécialité
- **Type** : Single-line string
- **Requis** : Oui
- **Exemples** : "Cardiologie interventionnelle", "Cardiologie préventive", etc.

#### `role` (Text)
- **Label** : Rôle dans l'association
- **Type** : Single-line string
- **Requis** : Non
- **Exemples** : "Présidente", "Vice-présidente", "Trésorière"

#### `socialLinks` (Modular content)
- **Label** : Liens sociaux
- **Type** : Single block
- **Requis** : Non
- **Bloc à créer** : "Social Links Block" avec les champs :
  - `linkedin` (Link - URL) - LinkedIn
  - `twitter` (Link - URL) - Twitter
  - `email` (Text) - Email

---

## 5️⃣ Modèle : Resource

**Objectif** : Gérer les ressources documentaires (PDFs, liens, vidéos)

### Champs à créer :

| Nom du champ | Type | Options | Requis |
|-------------|------|---------|--------|
| `title` | Text | - | ✅ Oui |
| `type` | Single choice | - | ✅ Oui |
| `description` | Structured text | - | ✅ Oui |
| `file` | File | - | ❌ Non |
| `link` | Link | URL externe | ❌ Non |
| `category` | Single choice | - | ✅ Oui |

### Détails des champs :

#### `title` (Text)
- **Label** : Titre
- **Type** : Single-line string
- **Requis** : Oui

#### `type` (Single choice)
- **Label** : Type de ressource
- **Type** : Single choice
- **Requis** : Oui
- **Options** : 
  - `pdf` - PDF
  - `link` - Lien externe
  - `video` - Vidéo

#### `description` (Structured text)
- **Label** : Description
- **Type** : Structured text
- **Requis** : Oui

#### `file` (File)
- **Label** : Fichier
- **Type** : File
- **Requis** : Non (requis si type = "pdf")
- **Options** : Formats acceptés : PDF

#### `link` (Link)
- **Label** : Lien
- **Type** : Link (URL)
- **Requis** : Non (requis si type = "link" ou "video")

#### `category` (Single choice)
- **Label** : Catégorie
- **Type** : Single choice
- **Requis** : Oui
- **Options** : 
  - "Guides cliniques"
  - "Recommandations"
  - "Formation"
  - "Recherche"

---

## 6️⃣ Modèle : Testimonial

**Objectif** : Gérer les témoignages

### Champs à créer :

| Nom du champ | Type | Options | Requis |
|-------------|------|---------|--------|
| `author` | Text | - | ✅ Oui |
| `role` | Text | - | ✅ Oui |
| `content` | Structured text | - | ✅ Oui |
| `photo` | Image | - | ❌ Non |
| `date` | Date | - | ✅ Oui |

### Détails des champs :

#### `author` (Text)
- **Label** : Auteur
- **Type** : Single-line string
- **Requis** : Oui

#### `role` (Text)
- **Label** : Rôle/Fonction
- **Type** : Single-line string
- **Requis** : Oui

#### `content` (Structured text)
- **Label** : Contenu du témoignage
- **Type** : Structured text
- **Requis** : Oui

#### `photo` (Image)
- **Label** : Photo
- **Type** : Image
- **Requis** : Non
- **Options** : Activer "Alt text"

#### `date` (Date)
- **Label** : Date
- **Type** : Date
- **Requis** : Oui

---

## 🔧 Blocs modulaires à créer

### Bloc : SEO Block

**Utilisé par** : Page, Article

#### Champs :
- `title` (Text) - Titre SEO
- `description` (Text) - Description SEO  
- `image` (Image) - Image SEO

### Bloc : Social Links Block

**Utilisé par** : Member

#### Champs :
- `linkedin` (Link - URL) - LinkedIn
- `twitter` (Link - URL) - Twitter
- `email` (Text) - Email

---

## 📝 Ordre de création recommandé

1. **Créer les blocs modulaires** (SEO Block, Social Links Block)
2. **Créer le modèle Page** (le plus simple)
3. **Créer le modèle Article**
4. **Créer le modèle Event**
5. **Créer le modèle Member**
6. **Créer le modèle Resource**
7. **Créer le modèle Testimonial**

---

## ✅ Vérification

Après avoir créé tous les modèles, vérifiez que :

1. ✅ Tous les champs ont les bons types
2. ✅ Les champs requis sont bien marqués
3. ✅ Les slugs sont configurés pour génération automatique
4. ✅ Les blocs modulaires sont bien liés
5. ✅ Votre API Token est configuré dans `.env.local`

---

## 🔗 Configuration dans votre projet

Une fois les modèles créés, ajoutez votre token dans `.env.local` :

```env
NEXT_PUBLIC_DATOCMS_API_TOKEN=votre_token_ici
NEXT_PUBLIC_DATOCMS_API_URL=https://graphql.datocms.com
```

Le projet basculera automatiquement des données mockées vers les vraies données Dato CMS.

---

## 💡 Conseils

- **Commencez par créer une page "home"** dans le modèle Page pour tester
- **Utilisez les données mockées comme référence** pour remplir vos premiers contenus
- **Testez chaque modèle** en créant au moins un élément de chaque type
- **Vérifiez les requêtes GraphQL** dans l'API Explorer de Dato CMS

---

## 🆘 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez que les noms des champs correspondent exactement à ceux dans les requêtes GraphQL
2. Assurez-vous que les types de champs sont corrects
3. Consultez la [documentation Dato CMS](https://www.datocms.com/docs)


