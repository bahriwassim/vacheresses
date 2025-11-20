# Configuration de l'API Instagram

Ce guide vous explique comment configurer l'API Instagram pour afficher automatiquement vos derniers posts sur le site du Manoir de Vacheresses.

## Prérequis

- Un compte Instagram professionnel ou créateur
- Un compte Facebook Business lié à votre compte Instagram
- Accès au Facebook Developer Portal

## Étapes de configuration

### 1. Créer une application Facebook

1. Allez sur [Facebook Developers](https://developers.facebook.com/)
2. Cliquez sur "Mes applications" puis "Créer une application"
3. Choisissez "Consommateur" comme type d'application
4. Donnez un nom à votre application (ex: "Manoir de Vacheresses Instagram Feed")
5. Créez l'application

### 2. Ajouter le produit Instagram Basic Display

1. Dans le tableau de bord de votre application, cliquez sur "Ajouter un produit"
2. Trouvez "Instagram Basic Display" et cliquez sur "Configurer"
3. Cliquez sur "Créer une nouvelle application" dans la section Instagram Basic Display
4. Acceptez les conditions d'utilisation

### 3. Configurer l'application Instagram

1. Dans "Paramètres de base", remplissez les champs requis :
   - **URI de redirection OAuth valides** : `https://localhost/`
   - **Désactiver les URI de redirection OAuth** : `https://localhost/`
   - **Domaines autorisés** : Votre domaine de production

2. Enregistrez les modifications

### 4. Ajouter un utilisateur Instagram de test

1. Dans la section "Rôles" → "Utilisateurs de test Instagram"
2. Cliquez sur "Ajouter un utilisateur de test Instagram"
3. Connectez-vous à votre compte Instagram
4. Acceptez l'invitation dans l'application Instagram mobile :
   - Allez dans Paramètres → Apps et sites web → Testeur
   - Acceptez l'invitation

### 5. Générer un token d'accès

1. Retournez dans "Paramètres de base" de l'application Instagram Basic Display
2. Cliquez sur "Générer un token" pour l'utilisateur de test
3. Autorisez l'application
4. **Copiez le token d'accès** (vous en aurez besoin pour la configuration)

### 6. Obtenir votre User ID Instagram

1. Une fois le token généré, vous verrez votre User ID Instagram
2. **Copiez le User ID** (un nombre comme `17841405309211844`)

### 7. Configurer les variables d'environnement

1. Créez un fichier `.env.local` à la racine du projet (s'il n'existe pas déjà)
2. Ajoutez les variables suivantes :

```env
INSTAGRAM_ACCESS_TOKEN=votre_token_ici
INSTAGRAM_USER_ID=votre_user_id_ici
```

3. Remplacez `votre_token_ici` et `votre_user_id_ici` par les valeurs obtenues

### 8. Redémarrer le serveur

```bash
npm run dev
```

## Renouvellement du token

⚠️ **Important** : Les tokens d'accès Instagram expirent après 60 jours.

### Tokens longue durée

Pour obtenir un token longue durée (60 jours) :

```bash
curl -i -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={votre-token}"
```

### Automatiser le renouvellement

Pour un usage en production, vous devriez :

1. Implémenter un système de renouvellement automatique du token
2. Ou utiliser une solution comme [Instagram Feed API](https://developers.facebook.com/docs/instagram-api)
3. Ou migrer vers l'API Instagram Graph pour les comptes Business

## Mode Fallback

Si l'API Instagram n'est pas configurée ou rencontre une erreur :
- Le site affichera automatiquement des images de secours depuis la base de données
- Aucune erreur ne sera visible pour les visiteurs
- Les images de secours sont définies dans le composant `InstagramFeed`

## Vérification

Pour vérifier que tout fonctionne :

1. Démarrez le serveur de développement
2. Visitez la page d'accueil
3. Scrollez jusqu'à la section "Instagram"
4. Vous devriez voir vos 6 derniers posts Instagram

## Dépannage

### Le token ne fonctionne pas
- Vérifiez que le compte Instagram est bien un compte professionnel ou créateur
- Assurez-vous d'avoir accepté l'invitation de testeur dans l'app Instagram
- Vérifiez que le token n'a pas expiré

### Les images ne s'affichent pas
- Vérifiez les logs de la console dans le navigateur
- Vérifiez les logs du serveur pour voir les erreurs de l'API
- Assurez-vous que `next.config.ts` autorise le domaine `cdninstagram.com`

### Mode fallback activé
- Vérifiez que les variables d'environnement sont bien définies
- Vérifiez que vous avez redémarré le serveur après avoir ajouté les variables
- Consultez les logs du serveur pour voir l'erreur exacte

## Support

Pour plus d'informations :
- [Documentation Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Getting Started Guide](https://developers.facebook.com/docs/instagram-basic-display-api/getting-started)

## Sécurité

⚠️ **Ne commitez JAMAIS votre fichier `.env.local`**

Le fichier `.env.local` est déjà dans `.gitignore` pour éviter d'exposer vos tokens.
