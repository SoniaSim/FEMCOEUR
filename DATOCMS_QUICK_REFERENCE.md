# Référence rapide Dato CMS

## 🚀 Démarrage rapide

1. Créer un compte sur [Dato CMS](https://www.datocms.com/)
2. Créer un nouveau projet
3. Récupérer votre API Token : **Settings > API tokens**
4. Ajouter le token dans `.env.local` :
   ```env
   NEXT_PUBLIC_DATOCMS_API_TOKEN=votre_token_ici
   ```

## 📊 Liste des modèles

| Modèle | Nom API | Description |
|--------|---------|-------------|
| Page | `page` | Pages statiques |
| Article | `article` | Articles de blog |
| Event | `event` | Événements |
| Member | `member` | Membres |
| Resource | `resource` | Ressources |
| Testimonial | `testimonial` | Témoignages |

## 🔑 Noms de champs importants

### ⚠️ ATTENTION : Les noms de champs doivent correspondre EXACTEMENT

#### Page
- `title`, `slug`, `content`, `seo`

#### Article
- `title`, `slug`, `author`, `date`, `content`, `image`, `categories`, `seo`

#### Event
- `title`, `date`, `location`, `description`, `image`, `registrationLink`, `status`

#### Member
- `firstName`, `lastName`, `photo`, `biography`, `specialty`, `role`, `socialLinks`

#### Resource
- `title`, `type`, `description`, `file`, `link`, `category`

#### Testimonial
- `author`, `role`, `content`, `photo`, `date`

## 📋 Checklist de création

Pour chaque modèle, vérifiez :

- [ ] Le nom du modèle correspond au nom API attendu
- [ ] Tous les champs requis sont créés
- [ ] Les types de champs sont corrects
- [ ] Les slugs sont configurés pour génération auto
- [ ] Les blocs modulaires sont bien liés

## 🎯 Premiers contenus à créer

1. **Page "home"** (slug: `home`)
2. **Page "about"** (slug: `about`)
3. **2-3 Articles** pour tester
4. **2-3 Events** (mix upcoming/past)
5. **3-4 Members**
6. **2-3 Resources**

## 🔍 Vérification GraphQL

Dans Dato CMS, allez dans **API Explorer** et testez cette requête :

```graphql
query {
  allPages {
    id
    title
    slug
  }
}
```

Si ça fonctionne, vos modèles sont bien configurés !

## 📝 Exemple de valeurs pour tester

### Page "home"
- **Title** : "Bienvenue à FEMCOEUR"
- **Slug** : `home` (auto-généré)
- **Content** : "FEMCOEUR est..."

### Article
- **Title** : "Les dernières avancées en cardiologie"
- **Slug** : `avancees-cardiologie` (auto-généré)
- **Author** : "Dr. Marie Dubois"
- **Date** : Date du jour
- **Categories** : ["Recherche", "Innovation"]

### Event
- **Title** : "Conférence annuelle 2024"
- **Date** : Date future
- **Location** : "Paris, France"
- **Status** : "upcoming"

## ⚡ Commandes utiles

```bash
# Vérifier que le token est bien configuré
echo $NEXT_PUBLIC_DATOCMS_API_TOKEN

# Redémarrer le serveur après configuration
npm run dev
```

## 🐛 Problèmes courants

### Erreur : "Field not found"
→ Vérifiez que le nom du champ correspond exactement (sensible à la casse)

### Erreur : "Model not found"
→ Vérifiez que le nom du modèle correspond exactement (singulier/pluriel)

### Les données ne s'affichent pas
→ Vérifiez que vous avez créé au moins un élément dans chaque modèle
→ Vérifiez que le token est bien dans `.env.local`
→ Redémarrez le serveur de développement


