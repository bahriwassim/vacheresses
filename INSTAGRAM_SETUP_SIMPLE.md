# Configuration Instagram - Version Simple (Sans API)

## ✅ Aucune configuration requise !

Le système récupère automatiquement les derniers posts Instagram du compte **@manoirdevacheresses** sans nécessiter de clés API ou de configuration.

## Comment ça fonctionne ?

Le système :
1. Récupère la page publique Instagram de votre compte
2. Extrait les 6 derniers posts automatiquement
3. Affiche les images avec leurs légendes
4. Met en cache les résultats pendant 1 heure pour optimiser les performances

## Modifier le nom d'utilisateur Instagram

Si vous souhaitez changer le compte Instagram affiché, modifiez le fichier :

**Fichier** : `src/app/api/instagram/route.ts`

**Ligne 7** :
```typescript
const INSTAGRAM_USERNAME = 'manoirdevacheresses';
```

Remplacez `'manoirdevacheresses'` par votre nom d'utilisateur Instagram.

## Mode Fallback

Si Instagram bloque l'accès ou si le scraping échoue :
- Le système bascule automatiquement en mode fallback
- Affiche 6 belles images du domaine depuis la base de données locale
- Aucune erreur visible pour les visiteurs
- Le site continue de fonctionner normalement

## Avantages de cette méthode

✅ **Pas de configuration** - Fonctionne directement
✅ **Pas d'API** - Pas besoin de token ou clés
✅ **Gratuit** - Aucun coût associé
✅ **Automatique** - Les nouveaux posts apparaissent automatiquement
✅ **Cache** - Optimisé avec 1h de cache
✅ **Fallback** - Si ça ne marche pas, utilise des images locales

## Limitations

⚠️ **Fiabilité** : Instagram peut changer sa structure HTML à tout moment
⚠️ **Rate limiting** : Instagram peut bloquer les requêtes trop fréquentes
⚠️ **Compte privé** : Ne fonctionne que pour les comptes publics

## Recommandations

**Pour un usage en production** :
1. ✅ **Actuellement** : Le système fonctionne avec scraping + fallback
2. 🔄 **Si problèmes** : Basculer vers l'API officielle (voir `INSTAGRAM_SETUP.md`)
3. 💡 **Alternative** : Utiliser un service tiers comme [Juicer.io](https://www.juicer.io/) ou [Flockler](https://flockler.com/)

## Test

Pour tester que tout fonctionne :

1. Démarrez le serveur :
   ```bash
   npm run dev
   ```

2. Visitez : `http://localhost:3000`

3. Scrollez jusqu'à la section "Follow us on Instagram"

4. Vérifiez que les images s'affichent

5. Ouvrez la console du navigateur (F12) pour voir si des erreurs apparaissent

## En cas de problème

**Si aucune image ne s'affiche** :
1. Vérifiez la console du navigateur (F12)
2. Vérifiez les logs du serveur
3. Le mode fallback devrait s'activer automatiquement
4. Vérifiez que le compte Instagram `@manoirdevacheresses` est public

**Si vous voyez des images de fallback** :
- C'est normal si Instagram bloque le scraping
- Le site fonctionne quand même avec de belles images locales
- Pour utiliser les vrais posts Instagram, suivez le guide `INSTAGRAM_SETUP.md` pour configurer l'API officielle

## Structure du code

```
src/
  app/
    api/
      instagram/
        route.ts          # ← API qui récupère les posts (scraping)
  components/
    sections/
      instagram-feed.tsx  # ← Composant qui affiche les posts
```

## Changements récents

- ✅ Suppression de la dépendance aux API Instagram
- ✅ Scraping direct depuis la page publique
- ✅ Fallback automatique en cas d'échec
- ✅ Cache d'1 heure pour optimiser les performances
- ✅ Aucune configuration requise

---

**Profitez de votre flux Instagram automatique !** 🎉
