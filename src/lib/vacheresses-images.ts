export type VacheressesImage = {
  id: string;
  description: string;
  imageUrl: string;
  category: 'hero' | 'gallery' | 'package' | 'service' | 'blog' | 'testimonial';
  imageHint: string;
  priority?: boolean;
};

export const VacheressesImages: VacheressesImage[] = [
  // Hero images - Vue d'ensemble du domaine
  {
    id: "hero",
    description: "Vue panoramique du Manoir de Vacheresses au coucher du soleil",
    imageUrl: "/vacheresses_20.jpg",
    category: "hero",
    imageHint: "manoir vacheresses vue panoramique",
    priority: true
  },
  {
    id: "hero-alt",
    description: "Le Manoir de Vacheresses dans son écrin de verdure",
    imageUrl: "/vacheresses_7.jpg",
    category: "hero",
    imageHint: "manoir vacheresses architecture"
  },

  // Package images - Espaces de réception
  {
    id: "package-classic",
    description: "Salle de réception élégante avec vue sur le parc",
    imageUrl: "/salle_reception_6.jpg",
    category: "package",
    imageHint: "salle réception mariage"
  },
  {
    id: "package-premium",
    description: "Espace de réception spacieux et lumineux",
    imageUrl: "/salle_reception_7.jpg",
    category: "package",
    imageHint: "réception mariage premium"
  },
  {
    id: "package-luxury",
    description: "Détails raffinés de la salle de réception",
    imageUrl: "/salle_reception_8.jpg",
    category: "package",
    imageHint: "réception mariage luxe"
  },
  // Additional space images for better representation
  {
    id: "cour-honneur",
    description: "Cour d'honneur du Manoir de Vacheresses",
    imageUrl: "/vacheresses_7.jpg",
    category: "gallery",
    imageHint: "cour d'honneur manoir"
  },
  {
    id: "salle-reception-main",
    description: "Salle de réception principale du domaine",
    imageUrl: "/salle_reception_9.jpg",
    category: "gallery",
    imageHint: "salle réception principale"
  },
  {
    id: "salle-exposition",
    description: "Salle d'exposition du Manoir",
    imageUrl: "/espace_15.jpg",
    category: "gallery",
    imageHint: "salle exposition manoir"
  },
  {
    id: "potager-maison",
    description: "Maison du potager avec ses chambres",
    imageUrl: "/potager_3.jpg",
    category: "gallery",
    imageHint: "maison potager chambres"
  },
  {
    id: "parc-ombre",
    description: "Parc ombragé pour les cérémonies en plein air",
    imageUrl: "/Parc_2.jpg",
    category: "gallery",
    imageHint: "parc cérémonie plein air"
  },

  // Gallery images - Espaces extérieurs et jardins
  {
    id: "gallery-1",
    description: "Le parc du domaine avec ses arbres centenaires",
    imageUrl: "/Parc_1.jpg",
    category: "gallery",
    imageHint: "parc domaine vacheresses"
  },
  {
    id: "gallery-2",
    description: "Allée ombragée dans le parc du manoir",
    imageUrl: "/Parc_2.jpg",
    category: "gallery",
    imageHint: "allée parc mariage"
  },
  {
    id: "gallery-3",
    description: "Coin de verdure paisible pour les photos",
    imageUrl: "/Parc_3.jpg",
    category: "gallery",
    imageHint: "jardin photos mariage"
  },
  {
    id: "gallery-4",
    description: "Vue sur le parc depuis le manoir",
    imageUrl: "/Parc_5.jpg",
    category: "gallery",
    imageHint: "vue parc manoir"
  },
  {
    id: "gallery-5",
    description: "Espace extérieur pour cérémonies",
    imageUrl: "/espace_1.jpg",
    category: "gallery",
    imageHint: "cérémonie extérieure"
  },
  {
    id: "gallery-6",
    description: "Terrasse avec vue panoramique",
    imageUrl: "/espace_2_(1).jpg",
    category: "gallery",
    imageHint: "terrasse vue mariage"
  },
  {
    id: "gallery-7",
    description: "Espace de réception extérieure",
    imageUrl: "/espace_4.jpg",
    category: "gallery",
    imageHint: "réception extérieure"
  },
  {
    id: "gallery-8",
    description: "Coin intimiste dans le jardin",
    imageUrl: "/espace_5.jpg",
    category: "gallery",
    imageHint: "jardin intimiste"
  },
  {
    id: "gallery-9",
    description: "Espace de détente dans le parc",
    imageUrl: "/espace_6.jpg",
    category: "gallery",
    imageHint: "détente parc"
  },
  {
    id: "gallery-10",
    description: "Allée de cérémonie fleurie",
    imageUrl: "/espace_7.jpg",
    category: "gallery",
    imageHint: "allée cérémonie"
  },
  {
    id: "gallery-11",
    description: "Espace de réception avec pergola",
    imageUrl: "/espace_8.jpg",
    category: "gallery",
    imageHint: "réception pergola"
  },
  {
    id: "gallery-12",
    description: "Jardin paysager du domaine",
    imageUrl: "/espace_9.jpg",
    category: "gallery",
    imageHint: "jardin paysager"
  },
  {
    id: "gallery-13",
    description: "Espace de réception moderne",
    imageUrl: "/espace_15.jpg",
    category: "gallery",
    imageHint: "réception moderne"
  },

  // Service images - Préau et verger
  {
    id: "service-preau-1",
    description: "Le préau du verger pour les réceptions",
    imageUrl: "/preau_verger_1.jpg",
    category: "service",
    imageHint: "préau verger réception"
  },
  {
    id: "service-preau-2",
    description: "Espace couvert avec vue sur le verger",
    imageUrl: "/preau_verger_2.jpg",
    category: "service",
    imageHint: "préau couvert verger"
  },
  {
    id: "service-preau-3",
    description: "Réception sous le préau",
    imageUrl: "/preau_verger_3.jpg",
    category: "service",
    imageHint: "réception préau"
  },
  {
    id: "service-preau-4",
    description: "Détails du préau et verger",
    imageUrl: "/preau_verger_4.jpg",
    category: "service",
    imageHint: "détails préau verger"
  },
  {
    id: "service-preau-5",
    description: "Vue d'ensemble préau et verger",
    imageUrl: "/preau_verger_5.jpg",
    category: "service",
    imageHint: "ensemble préau verger"
  },
  {
    id: "service-preau-verger-1",
    description: "Le préau et le verger ensemble",
    imageUrl: "/preau_et_verger_3.jpg",
    category: "service",
    imageHint: "préau verger ensemble"
  },
  {
    id: "service-preau-verger-2",
    description: "Espace préau-verger pour événements",
    imageUrl: "/preau_et_verger_4.jpg",
    category: "service",
    imageHint: "événement préau verger"
  },

  // Esprit Vacheresses - Ambiance et détails
  {
    id: "esprit-1",
    description: "L'esprit authentique du Manoir de Vacheresses",
    imageUrl: "/vacheresses_13.jpg",
    category: "gallery",
    imageHint: "esprit manoir authentique"
  },
  {
    id: "esprit-2",
    description: "Détails architecturaux du manoir",
    imageUrl: "/vacheresses_14.jpg",
    category: "gallery",
    imageHint: "architecture manoir"
  },
  {
    id: "esprit-3",
    description: "Ambiance chaleureuse du domaine",
    imageUrl: "/vacheresses_17.jpg",
    category: "gallery",
    imageHint: "ambiance domaine"
  },
  {
    id: "esprit-4",
    description: "Charme rustique du manoir",
    imageUrl: "/vacheresses_19.jpg",
    category: "gallery",
    imageHint: "charme rustique"
  },
  {
    id: "esprit-5",
    description: "Élégance du Manoir de Vacheresses",
    imageUrl: "/vacheresse-1.jpg",
    category: "gallery",
    imageHint: "élégance manoir"
  },
  {
    id: "esprit-6",
    description: "Détails raffinés du domaine",
    imageUrl: "/vacheresse-1145.jpg",
    category: "gallery",
    imageHint: "détails raffinés"
  },
  {
    id: "esprit-7",
    description: "Atmosphère romantique du manoir",
    imageUrl: "/renaissance.jpg",
    category: "gallery",
    imageHint: "atmosphère romantique"
  },
  {
    id: "esprit-8",
    description: "Sérénité du domaine",
    imageUrl: "/dynastiedenoailles.jpg",
    category: "gallery",
    imageHint: "sérénité domaine"
  },
  {
    id: "esprit-9",
    description: "Beauté naturelle du Manoir de Vacheresses",
    imageUrl: "/VacheressesHistoire.jpg",
    category: "gallery",
    imageHint: "beauté naturelle"
  },
  {
    id: "esprit-10",
    description: "Harmonie entre architecture et nature",
    imageUrl: "/manoir1950.jpg",
    category: "gallery",
    imageHint: "harmonie architecture nature"
  },
  {
    id: "esprit-11",
    description: "Prestance du Manoir de Vacheresses",
    imageUrl: "/2020-06-30_Dans_les_bois-29.jpg",
    category: "gallery",
    imageHint: "prestance manoir"
  },
  {
    id: "esprit-12",
    description: "Charme intemporel du domaine",
    imageUrl: "/mariage_Véronique__Florian_-959.jpg",
    category: "gallery",
    imageHint: "charme intemporel"
  },
  {
    id: "esprit-13",
    description: "Élégance discrète du manoir",
    imageUrl: "/TerracottaOttoman(37).jpg",
    category: "gallery",
    imageHint: "élégance discrète"
  },
  {
    id: "esprit-14",
    description: "Authenticité du Manoir de Vacheresses",
    imageUrl: "/TerracottaOttoman(102).jpg",
    category: "gallery",
    imageHint: "authenticité manoir"
  },
  {
    id: "esprit-15",
    description: "Raffinement du domaine",
    imageUrl: "/salle_reception_10.jpg",
    category: "gallery",
    imageHint: "raffinement domaine"
  },

  // Images supplémentaires du manoir
  {
    id: "manoir-1",
    description: "Vue du Manoir de Vacheresses",
    imageUrl: "/vacheresses_20.jpg",
    category: "gallery",
    imageHint: "manoir vacheresses vue"
  },
  {
    id: "manoir-2",
    description: "Architecture du manoir",
    imageUrl: "/vacheresses_13.jpg",
    category: "gallery",
    imageHint: "architecture manoir"
  },
  {
    id: "manoir-3",
    description: "Détails du Manoir de Vacheresses",
    imageUrl: "/vacheresses_14.jpg",
    category: "gallery",
    imageHint: "détails manoir"
  },
  {
    id: "manoir-4",
    description: "Façade du manoir",
    imageUrl: "/vacheresses_17.jpg",
    category: "gallery",
    imageHint: "façade manoir"
  },
  {
    id: "manoir-5",
    description: "Le Manoir de Vacheresses sous différents angles",
    imageUrl: "/vacheresses_19.jpg",
    category: "gallery",
    imageHint: "manoir angles"
  },

  // Images de mariage
  {
    id: "mariage-1",
    description: "Cérémonie de mariage au Manoir de Vacheresses",
    imageUrl: "/se_marier_3.jpg",
    category: "gallery",
    imageHint: "cérémonie mariage"
  },

  // Potager
  {
    id: "potager-1",
    description: "Le potager du domaine",
    imageUrl: "/Parc_3.jpg",
    category: "gallery",
    imageHint: "potager domaine"
  },
  {
    id: "potager-2",
    description: "Jardin potager du manoir",
    imageUrl: "/Parc_5.jpg",
    category: "gallery",
    imageHint: "jardin potager"
  },

  // Blog images
  {
    id: "blog-venue",
    description: "Le Manoir de Vacheresses, lieu de réception d'exception",
    imageUrl: "/vacheresses_7.jpg",
    category: "blog",
    imageHint: "lieu réception exception"
  },
  {
    id: "blog-decor",
    description: "Décoration élégante pour votre mariage",
    imageUrl: "/renaissance.jpg",
    category: "blog",
    imageHint: "décoration mariage"
  },
  {
    id: "blog-personalize",
    description: "Personnalisez votre événement au Manoir de Vacheresses",
    imageUrl: "/espace_8.jpg",
    category: "blog",
    imageHint: "événement personnalisé"
  },
  {
    id: "blog-photos",
    description: "Cadres parfaits pour vos photos de mariage",
    imageUrl: "/Parc_2.jpg",
    category: "blog",
    imageHint: "photos mariage"
  },
  {
    id: "blog-catering",
    description: "Réception gastronomique au Manoir de Vacheresses",
    imageUrl: "/salle_reception_9.jpg",
    category: "blog",
    imageHint: "réception gastronomique"
  },

  // Testimonials images
  {
    id: "testimonial-1",
    description: "Couple heureux au Manoir de Vacheresses",
    imageUrl: "/se_marier_3.jpg",
    category: "testimonial",
    imageHint: "couple mariage"
  },
  {
    id: "testimonial-2",
    description: "Mariage réussi au domaine",
    imageUrl: "/vacheresses_7.jpg",
    category: "testimonial",
    imageHint: "mariage réussi"
  },
  {
    id: "testimonial-3",
    description: "Événement inoubliable au Manoir de Vacheresses",
    imageUrl: "/vacheresses_20.jpg",
    category: "testimonial",
    imageHint: "événement inoubliable"
  }
];

// Fonctions utilitaires pour récupérer les images par catégorie
export const getImagesByCategory = (category: VacheressesImage['category']) => {
  const list = VacheressesImages.filter(img => img.category === category);
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('imageOverridesById') : null;
    const overrides = raw ? JSON.parse(raw) as Record<string, string> : null;
    if (!overrides) return list;
    return list.map(img => overrides[img.id] ? { ...img, imageUrl: overrides[img.id] } : img);
  } catch {
    return list;
  }
};

export const getImageById = (id: string) => {
  const base = VacheressesImages.find(img => img.id === id);
  if (!base) return undefined;
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('imageOverridesById') : null;
    const overrides = raw ? JSON.parse(raw) as Record<string, string> : null;
    if (overrides && overrides[id]) {
      return { ...base, imageUrl: overrides[id] };
    }
    return base;
  } catch {
    return base;
  }
};

export const getHeroImages = () => {
  return getImagesByCategory('hero');
};

export const getGalleryImages = () => {
  return getImagesByCategory('gallery');
};

export const getPackageImages = () => {
  return getImagesByCategory('package');
};

export const getServiceImages = () => {
  return getImagesByCategory('service');
};

export const getBlogImages = () => {
  return getImagesByCategory('blog');
};

export const getTestimonialImages = () => {
  return getImagesByCategory('testimonial');
};
