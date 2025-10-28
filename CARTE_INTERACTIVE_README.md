# 🗺️ Carte Interactive - Manoir de Vacheresses

## Description

Une carte interactive immersive de la propriété qui permet aux visiteurs d'explorer visuellement le domaine et de découvrir les différents hébergements en cliquant sur des points interactifs.

## 📍 Fonctionnalités

### Carte Interactive Vue Aérienne
- **Photo aérienne haute résolution** du domaine (`vacheresses_4-1.jpg`)
- **6 points cliquables** positionnés sur les bâtiments
- **Animations pulsantes** pour attirer l'attention
- **Popups d'information** avec détails de chaque hébergement
- **Navigation directe** vers la page de réservation

### Points Interactifs (Hotspots)

#### 1. Les Heures du Jour
- **Position** : Bâtiment gauche (35%, 45%)
- **Type** : Duplex, 4 personnes
- **Lien** : `/sejourner#heures_du_jour`

#### 2. Ruines Antiques
- **Position** : Bâtiment central (48%, 52%)
- **Type** : Duplex, 4 personnes
- **Lien** : `/sejourner#ruines_antiques`

#### 3. Les Jardins Tivoli
- **Position** : Bâtiment central droit (52%, 48%)
- **Type** : Chambre, 3 personnes
- **Lien** : `/sejourner#jardins_tivoli`

#### 4. Le Petit Trianon
- **Position** : Bâtiment droite (65%, 50%)
- **Type** : Chambre, 2 personnes
- **Lien** : `/sejourner#petit_trianon`

#### 5. La Loge
- **Position** : Petit bâtiment (42%, 60%)
- **Type** : Guest House, 6 personnes
- **Lien** : `/sejourner#la_loge`

#### 6. Maison du Potager
- **Position** : Haut centre (58%, 38%)
- **Type** : Espace commun
- **Lien** : `/sejourner`

## 🎨 Design & UX

### Animations
- **Cercles pulsants** : `animate-ping` et `animate-pulse`
- **Effet hover** : Scale 125% + ombre portée
- **Popup slide-in** : Animation douce depuis le bas
- **Durée** : 300ms pour toutes les transitions

### Style des Points
```tsx
// Cercle externe (ping)
<span className="w-12 h-12 bg-primary/30 animate-ping" />

// Cercle moyen (pulse)
<span className="w-8 h-8 bg-primary/50 animate-pulse" />

// Point principal
<span className="w-8 h-8 bg-primary shadow-lg hover:scale-125" />
```

### Popup Card
- **Largeur** : 64 (256px)
- **Position** : Centrée sous le point
- **Flèche** : Rotated div pointant vers le hotspot
- **Contenu** :
  - Nom de l'hébergement (font-headline)
  - Description courte
  - Bouton "Découvrir"
  - Bouton de fermeture (X)

## 📱 Responsive Design

### Desktop
- Points bien espacés
- Popups larges (256px)
- Images haute résolution

### Mobile
- Points tactiles (48x48px minimum)
- Popups adaptées
- Image responsive (aspect-ratio: 16/10)

## 🔗 Navigation & Deep Linking

### Ancres de Navigation
Chaque chambre possède un ID unique dans `/sejourner` :

```tsx
<Card id="heures_du_jour" className="scroll-mt-24" />
```

### Effet de Highlight
Quand on arrive via un lien avec ancre :
- **Ring** : Bordure verte de 4px
- **Shadow** : Ombre verte éclatante
- **Durée** : 3 secondes puis disparition automatique

```tsx
className={`${
  highlightedRoom === room.id
    ? 'ring-4 ring-primary ring-offset-4 shadow-2xl shadow-primary/50'
    : ''
}`}
```

### Smooth Scroll
```css
scroll-mt-24  /* Offset de 6rem pour compenser le header fixe */
```

## 🎯 Grille des Liens Rapides

Sous la carte, une grille de 6 cartes cliquables :
- **Layout** : 2 colonnes mobile, 3 colonnes desktop
- **Icône** : MapPin avec fond primary/10
- **Effet hover** :
  - Border primary/50
  - Shadow primary/20
  - Texte devient primary
  - Background icon devient primary/20

## 💡 Utilisation

### Intégration dans la Page d'Accueil

```tsx
import { InteractiveMap } from '@/components/sections/interactive-map';

export default function Home() {
  return (
    <>
      <Hero />
      <DomainTeaser />
      <InteractiveMap />  {/* ← Carte interactive */}
      <VisualTour />
      {/* ... */}
    </>
  );
}
```

### Ordre Recommandé
1. Hero (bannière)
2. Domain Teaser (histoire)
3. **Interactive Map** ← **Nouvelle section**
4. Visual Tour
5. Availability
6. Testimonials
7. Access
8. Packages

## 🔧 Personnalisation

### Ajuster les Positions des Points

Modifiez les valeurs `x` et `y` (en %) dans `hotspots` :

```tsx
const hotspots: HotspotData[] = [
  {
    id: "exemple",
    name: "Nom",
    description: "Description",
    x: 50,  // ← Position horizontale (0-100%)
    y: 50,  // ← Position verticale (0-100%)
    link: "/sejourner#exemple",
  },
];
```

### Ajouter un Nouveau Point

```tsx
{
  id: "nouveau_point",
  name: t.stay.rooms.nouveau.name,
  description: t.stay.rooms.nouveau.type,
  x: 70,
  y: 40,
  link: "/sejourner#nouveau_point",
}
```

N'oubliez pas d'ajouter l'ID correspondant dans la page `/sejourner` :

```tsx
<Card id="nouveau_point" className="scroll-mt-24" />
```

### Changer l'Image de Fond

Remplacez simplement l'image source :

```tsx
<Image
  src="/votre-nouvelle-image.jpg"  // ← Changez ici
  alt="Vue aérienne"
  fill
/>
```

## 🌐 Internationalisation

Tous les textes sont traduits automatiquement :

```tsx
// Français
t.locale === 'fr'
  ? 'Explorez le Domaine'
  : 'Explore the Estate'

// Boutons
t.locale === 'fr' ? 'Découvrir' : 'Discover'
```

## 📊 Analytics (Recommandé)

Ajoutez du tracking sur les clics :

```tsx
onClick={() => {
  // Analytics
  gtag('event', 'hotspot_click', {
    room_name: hotspot.name,
    room_id: hotspot.id,
  });

  setActiveHotspot(hotspot.id);
}}
```

## 🚀 Améliorations Futures

### Idées d'amélioration
1. **Galerie photo** : Lightbox au clic sur les points
2. **Tour virtuel 360°** : Intégration panoramique
3. **Mode plein écran** : Zoom sur la carte
4. **Filtres** : Afficher seulement certains types d'hébergements
5. **Disponibilité en temps réel** : Indicateur vert/rouge
6. **Prix dynamiques** : Affichage dans les popups
7. **Réservation directe** : Bouton "Réserver" dans la popup

### Optimisations possibles
- **Lazy loading** des popups
- **Preload** de l'image principale
- **WebP format** pour images plus légères
- **Intersection Observer** pour animations au scroll

## 🐛 Troubleshooting

### Les points ne sont pas bien positionnés
→ Ajustez les valeurs `x` et `y` en pourcentage

### Le scroll ne fonctionne pas
→ Vérifiez que `scroll-mt-24` est présent sur les Cards

### Le highlight ne s'affiche pas
→ Vérifiez que l'ID du hash correspond à l'ID de la Card

### Les popups se chevauchent
→ Augmentez l'espacement entre les points ou ajustez le `z-index`

## 📝 Notes Techniques

- **Framework** : Next.js 15 + React 19
- **Images** : Next.js Image avec optimisation automatique
- **Animations** : Tailwind CSS classes
- **État** : React useState pour gestion des popups
- **Navigation** : Next.js Link pour SPA routing
- **Accessibilité** : aria-labels sur tous les boutons

---

✨ **Carte interactive opérationnelle !**

Les visiteurs peuvent maintenant explorer le domaine de manière visuelle et intuitive avant de réserver. 🏰🗺️
