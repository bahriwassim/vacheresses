# 📸 Instagram Feed - Manoir de Vacheresses

## 🚀 Installation rapide

Aucune configuration requise ! Le système fonctionne automatiquement.

```bash
# Installer les dépendances
npm install

# Lancer le serveur
npm run dev
```

Visitez `http://localhost:3000` et scrollez jusqu'à la section Instagram.

## ✨ Caractéristiques

- ✅ **Zéro configuration** - Fonctionne directement
- ✅ **Sans API** - Pas besoin de clés ou tokens
- ✅ **Automatique** - Récupère les 6 derniers posts Instagram
- ✅ **Cache intelligent** - Mise en cache d'1 heure
- ✅ **Mode fallback** - Images locales si Instagram est inaccessible
- ✅ **Responsive** - S'adapte à tous les écrans

## 📝 Comment ça fonctionne ?

Le système récupère les posts Instagram en 3 étapes :

1. **Scraping** : Lit la page publique Instagram de `@manoirdevacheresses`
2. **Extraction** : Extrait les 6 dernières images et leurs infos
3. **Affichage** : Affiche les posts avec animations et liens directs

```
Visiteur → API Route → Instagram.com → Extraction → Cache → Affichage
           ↓ (si échec)
           Fallback (images locales)
```

## 🔧 Personnalisation

### Changer le compte Instagram

**Fichier** : `src/app/api/instagram/route.ts`

```typescript
// Ligne 7 - Remplacez par votre nom d'utilisateur
const INSTAGRAM_USERNAME = 'votre_compte_instagram';
```

### Changer le nombre de posts

**Fichier** : `src/app/api/instagram/route.ts`

```typescript
// Ligne 72, 99, 120 - Changez 6 par le nombre souhaité
posts.slice(0, 6)  // Changez le 6
```

**Fichier** : `src/components/sections/instagram-feed.tsx`

```typescript
// Ligne 124 - Changez 6 par le nombre souhaité
posts.slice(0, 6).map(...)  // Changez le 6
```

### Modifier le temps de cache

**Fichier** : `src/app/api/instagram/route.ts`

```typescript
// Ligne 4 - Temps en secondes (3600 = 1 heure)
export const revalidate = 3600; // Changez cette valeur
```

## 🎨 Personnaliser l'affichage

### Grille d'affichage

**Fichier** : `src/components/sections/instagram-feed.tsx`

```typescript
// Ligne 98 - Classes Tailwind pour la grille
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//                      ↑         ↑              ↑
//                   Mobile   Tablette       Desktop
```

### Images de fallback

**Fichier** : `src/components/sections/instagram-feed.tsx`

```typescript
// Lignes 32-39 - Changez les IDs des images
const fallbackImages = [
  getImageById("testimonial-1"),  // Changez ces IDs
  getImageById("testimonial-2"),
  getImageById("testimonial-3"),
  // ... ajoutez ou modifiez les images
];
```

## 🛠️ Dépannage

### Les posts ne s'affichent pas

**Problème** : Vous voyez les images de fallback au lieu des vrais posts Instagram

**Solutions** :
1. Vérifiez que `@manoirdevacheresses` est un compte public
2. Ouvrez la console du navigateur (F12) pour voir les erreurs
3. Vérifiez les logs du serveur
4. Instagram peut avoir changé sa structure HTML

### Erreur CORS

**Problème** : Erreur "CORS policy" dans la console

**Solution** : C'est normal, la requête se fait côté serveur (pas de problème CORS)

### Images ne se chargent pas

**Problème** : Les URLs des images Instagram sont bloquées

**Solution** : Vérifiez `next.config.ts` :

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**.cdninstagram.com',
      // ...
    }
  ]
}
```

### Rate limiting Instagram

**Problème** : Instagram bloque les requêtes trop fréquentes

**Solutions** :
1. Augmentez le temps de cache (ex: 7200 = 2 heures)
2. Le mode fallback s'activera automatiquement
3. Considérez l'utilisation de l'API officielle (voir `INSTAGRAM_SETUP.md`)

## 📊 Performances

- **Premier chargement** : ~500ms (récupération depuis Instagram)
- **Chargements suivants** : ~10ms (depuis le cache)
- **Cache valide pendant** : 1 heure
- **Fallback** : Instantané (images locales)

## 🔐 Sécurité

- ✅ Aucune clé API exposée
- ✅ Pas de données sensibles
- ✅ Scraping de pages publiques uniquement
- ✅ Cache côté serveur
- ✅ Pas de tracking ou analytics

## 📚 Fichiers importants

```
src/
├── app/
│   └── api/
│       └── instagram/
│           └── route.ts          # API qui récupère les posts
└── components/
    └── sections/
        └── instagram-feed.tsx    # Composant d'affichage

Documentation:
├── INSTAGRAM_SETUP_SIMPLE.md     # Guide rapide (ce fichier)
├── INSTAGRAM_SETUP.md            # Guide API officielle (optionnel)
└── MODIFICATIONS_SUMMARY.md      # Résumé de toutes les modifs
```

## 🚨 Limitations

⚠️ **Instagram peut changer sa structure** : Le scraping peut cesser de fonctionner si Instagram modifie son HTML

⚠️ **Comptes privés** : Ne fonctionne qu'avec des comptes publics

⚠️ **Rate limiting** : Instagram peut limiter les requêtes trop fréquentes

## 💡 Alternatives

Si le scraping ne fonctionne plus :

1. **API officielle Instagram** - Voir `INSTAGRAM_SETUP.md`
2. **Services tiers** :
   - [Juicer.io](https://www.juicer.io/)
   - [Flockler](https://flockler.com/)
   - [Taggbox](https://taggbox.com/)
3. **Widget Instagram** - Embed officiel d'Instagram

## 🎯 Prochaines étapes

1. ✅ Testez en local (`npm run dev`)
2. ✅ Vérifiez que les posts s'affichent
3. ✅ Déployez en production
4. 📊 Surveillez les logs pour détecter les erreurs
5. 🔄 Ajustez le cache si nécessaire

## 📞 Support

En cas de problème :
1. Consultez les logs du serveur
2. Vérifiez la console du navigateur (F12)
3. Testez l'URL directement : `http://localhost:3000/api/instagram`
4. Vérifiez que le compte Instagram est public

---

**Profitez de votre feed Instagram automatique ! 🎉**
