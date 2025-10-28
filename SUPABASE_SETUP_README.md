# Configuration Supabase - Manoir de Vacheresses

## 📋 Table des matières
- [Introduction](#introduction)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Structure de la base de données](#structure-de-la-base-de-données)
- [Fonctionnalités](#fonctionnalités)
- [Configuration de l'authentification](#configuration-de-lauthentification)
- [Variables d'environnement](#variables-denvironnement)
- [API et requêtes](#api-et-requêtes)

## Introduction

Ce script SQL configure une base de données complète pour le backoffice du Manoir de Vacheresses, incluant :
- Gestion des réservations de mariages
- Gestion des hébergements
- Contrats et paiements
- Messagerie client-admin
- Calendrier de disponibilité
- Blog et témoignages

## Prérequis

1. **Compte Supabase** : Créez un compte sur [supabase.com](https://supabase.com)
2. **Projet Supabase** : Créez un nouveau projet
3. **Accès SQL Editor** : Dans votre tableau de bord Supabase

## Installation

### Étape 1 : Connexion à Supabase

1. Connectez-vous à votre dashboard Supabase
2. Sélectionnez votre projet
3. Allez dans **SQL Editor** (dans le menu latéral)

### Étape 2 : Exécution du script

1. Cliquez sur **New Query**
2. Copiez tout le contenu du fichier `supabase-setup.sql`
3. Collez-le dans l'éditeur
4. Cliquez sur **Run** (ou Ctrl+Enter)
5. Vérifiez qu'il n'y a pas d'erreurs dans la console

### Étape 3 : Vérification

Exécutez cette requête pour vérifier :
```sql
SELECT
    (SELECT COUNT(*) FROM public.packages) AS packages,
    (SELECT COUNT(*) FROM public.addons) AS addons,
    (SELECT COUNT(*) FROM public.accommodations) AS accommodations,
    (SELECT COUNT(*) FROM public.users) AS users;
```

Vous devriez voir :
- 3 packages
- 6 addons
- 6 accommodations
- 1 user (admin)

## Structure de la base de données

### Tables principales

#### 1. **users** - Utilisateurs
- `id` : UUID unique
- `email` : Email unique
- `name` : Nom complet
- `phone` : Téléphone
- `role` : 'client' ou 'admin'
- `password_hash` : Mot de passe chiffré

#### 2. **bookings** - Réservations
- `id` : UUID unique
- `booking_reference` : Référence unique (ex: VAC123456)
- `user_id` : Client
- `package_id` : Forfait choisi
- `event_date` : Date de l'événement
- `guest_count` : Nombre d'invités
- `status` : inquiry, booked, confirmed, completed, cancelled
- `total_amount` : Montant total

#### 3. **accommodations** - Hébergements
- `id` : UUID unique
- `room_id` : ID unique (ex: heures_du_jour)
- `name_fr/en` : Nom en français/anglais
- `capacity` : Capacité
- `price_per_night` : Prix par nuit
- `is_available` : Disponibilité

#### 4. **contracts** - Contrats
- `id` : UUID unique
- `booking_id` : Réservation associée
- `contract_type` : main, catering, accommodation
- `status` : awaiting_signature, signed, completed
- `document_url` : URL du document

#### 5. **payments** - Paiements
- `id` : UUID unique
- `booking_id` : Réservation associée
- `payment_type` : deposit, initial, balance, etc.
- `amount` : Montant
- `due_date` : Date d'échéance
- `status` : due, pending, paid, overdue

#### 6. **messages** - Messages
- `id` : UUID unique
- `booking_id` : Réservation associée
- `sender_id` : Expéditeur
- `message` : Contenu
- `is_read` : Lu ou non

## Fonctionnalités

### 1. Sécurité (Row Level Security)

Le RLS est activé sur les tables sensibles :
- Les clients voient uniquement leurs données
- Les admins voient toutes les données

### 2. Fonctions automatiques

#### Génération de référence
```sql
-- Génère automatiquement une référence unique (ex: VAC123456)
SELECT generate_booking_reference();
```

#### Vérification de disponibilité
```sql
-- Vérifie si une date est disponible
SELECT check_date_availability('2025-06-15');
```

#### Calcul de nuits
```sql
-- Calcule le nombre de nuits
SELECT calculate_nights('2025-06-15', '2025-06-17'); -- Retourne 2
```

### 3. Vues pratiques

#### Vue booking_summary
```sql
-- Résumé complet des réservations
SELECT * FROM booking_summary;
```

#### Vue dashboard_stats
```sql
-- Statistiques du dashboard
SELECT * FROM dashboard_stats;
```

#### Vue calendar_occupancy
```sql
-- Calendrier d'occupation
SELECT * FROM calendar_occupancy
WHERE date BETWEEN '2025-01-01' AND '2025-12-31';
```

## Configuration de l'authentification

### Étape 1 : Activer l'authentification par email

1. Allez dans **Authentication** > **Providers**
2. Activez **Email**
3. Configurez les templates d'email

### Étape 2 : Configuration des rôles

Le système utilise 2 rôles :
- **client** : Utilisateurs normaux
- **admin** : Administrateurs

### Compte admin par défaut

```
Email : admin@manoirdevacheresses.com
Mot de passe : Admin2024!
```

⚠️ **IMPORTANT** : Changez ce mot de passe immédiatement après la première connexion !

```sql
-- Pour changer le mot de passe admin
UPDATE public.users
SET password_hash = crypt('NouveauMotDePasse123!', gen_salt('bf'))
WHERE email = 'admin@manoirdevacheresses.com';
```

## Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-clé-anonyme
SUPABASE_SERVICE_ROLE_KEY=votre-clé-service

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Où trouver ces clés ?

1. Allez dans **Settings** > **API**
2. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ À garder secret !)

## API et requêtes

### Exemples de requêtes

#### 1. Créer une réservation

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Créer une réservation
const { data, error } = await supabase
  .from('bookings')
  .insert({
    user_id: userId,
    package_id: packageId,
    event_date: '2025-06-15',
    guest_count: 120,
    status: 'inquiry',
    total_amount: 25000
  })
  .select()
  .single();
```

#### 2. Récupérer les réservations d'un client

```typescript
const { data: bookings } = await supabase
  .from('bookings')
  .select(`
    *,
    package:packages(*),
    contracts(*),
    payments(*)
  `)
  .eq('user_id', userId)
  .order('event_date', { ascending: true });
```

#### 3. Mettre à jour le statut d'une réservation

```typescript
const { error } = await supabase
  .from('bookings')
  .update({ status: 'confirmed' })
  .eq('id', bookingId);
```

#### 4. Ajouter un message

```typescript
const { error } = await supabase
  .from('messages')
  .insert({
    booking_id: bookingId,
    sender_id: userId,
    sender_role: 'client',
    message: 'Bonjour, j\'aimerais modifier ma réservation.'
  });
```

#### 5. Créer un paiement

```typescript
const { error } = await supabase
  .from('payments')
  .insert({
    booking_id: bookingId,
    payment_type: 'deposit',
    amount: 5000,
    due_date: '2025-05-01',
    status: 'due'
  });
```

#### 6. Réserver un hébergement

```typescript
const { data, error } = await supabase
  .from('accommodation_bookings')
  .insert({
    accommodation_id: roomId,
    user_id: userId,
    booking_id: bookingId, // Optionnel
    check_in_date: '2025-06-14',
    check_out_date: '2025-06-16',
    guest_count: 2,
    status: 'confirmed',
    total_amount: 240 // 2 nuits × 120€
  });
```

## Fonctionnalités avancées

### 1. Recherche de disponibilités

```typescript
// Chercher les dates disponibles pour un mois
const { data: availableDates } = await supabase
  .from('availability_calendar')
  .select('date')
  .gte('date', '2025-06-01')
  .lte('date', '2025-06-30')
  .eq('is_available', true);
```

### 2. Statistiques pour le dashboard admin

```typescript
const { data: stats } = await supabase
  .from('dashboard_stats')
  .select('*')
  .single();

console.log(stats);
// {
//   upcoming_weddings: 12,
//   new_inquiries: 5,
//   total_revenue_year: 450000,
//   unread_messages: 3
// }
```

### 3. Calendrier d'occupation

```typescript
const { data: calendar } = await supabase
  .from('calendar_occupancy')
  .select('*')
  .gte('date', '2025-01-01')
  .lte('date', '2025-12-31')
  .order('date');
```

## Support et maintenance

### Backup de la base de données

1. Allez dans **Database** > **Backups**
2. Configurez des backups automatiques quotidiens
3. Testez la restauration régulièrement

### Monitoring

1. **Database** > **Logs** : Voir les erreurs SQL
2. **API** > **Logs** : Voir les requêtes API
3. **Auth** > **Users** : Gérer les utilisateurs

### Mises à jour

Pour ajouter des colonnes ou modifier la structure :

```sql
-- Exemple : Ajouter une colonne
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS special_requests TEXT;

-- Exemple : Modifier une colonne
ALTER TABLE public.bookings
ALTER COLUMN notes TYPE TEXT;
```

## Troubleshooting

### Erreur : "relation does not exist"
→ Le script n'a pas été exécuté complètement. Réexécutez-le.

### Erreur : "permission denied"
→ Vérifiez les politiques RLS et les permissions.

### Erreur : "duplicate key value"
→ Les données initiales existent déjà. C'est normal si vous réexécutez le script.

## Contact

Pour toute question ou assistance :
- Email : support@manoirdevacheresses.com
- Documentation Supabase : https://supabase.com/docs

---

✅ **Base de données prête à l'emploi !**
