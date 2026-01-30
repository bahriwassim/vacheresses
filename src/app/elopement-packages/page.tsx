"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Calendar, Mail, Phone } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DatePickerDialog } from "@/components/sections/date-picker-dialog";
import { CardImage } from "@/components/ui/animated-image";
import { getImageById } from "@/lib/vacheresses-images";
import { DomainTeaser } from "@/components/sections/domain-teaser";
import { Testimonials } from "@/components/sections/testimonials";
import { Access } from "@/components/sections/access";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { EditableText } from "@/components/ui/editable-text";
import { loadMediaOverridesByPath } from "@/lib/supabase";
import { useBooking } from "@/contexts/booking-context";

function ElopementContent() {
  const { t } = useLocale();
  const router = useRouter();
  const { dates, setDates } = useBooking();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [, setRefresh] = useState(0);
  const overridePath = (path: string) => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('imageOverridesByPath') : null;
      const map = raw ? JSON.parse(raw) as Record<string,string> : null;
      return map && map[path] ? map[path] : path;
    } catch {
      return path;
    }
  };

  useEffect(() => {
    (async () => {
      await loadMediaOverridesByPath();
      setRefresh(x => x + 1);
    })();
  }, []);

  const elopementPackages = [
    {
      id: "pack1",
      title: "Pack 1 — Secret Elopement in the Garden",
      price: "À partir de 4 950 €",
      description: "Une expérience chaleureuse et élégante, idéale pour la saison hivernale.",
      imageId: "package-classic",
      features: [
        "Cérémonie d’elopement intimiste en intérieur",
        "Séance First Look dans la bibliothèque du Manoir",
        "3h de couverture photo & vidéo avec film monté",
        "Officiant de cérémonie anglophone",
        "Toast au champagne près de la cheminée",
        "Déjeuner romantique à la française préparé par notre chef privé",
        "Accès aux salons historiques du Manoir"
      ],
      highlighted: false
    },
    {
      id: "pack2",
      title: "Pack 2 — Elopement Secret (1 Journée)",
      price: "À partir de 5 950 €",
      description: "Parfait pour une célébration romantique et symbolique en plein air.",
      imageId: "package-premium",
      features: [
        "Cérémonie d’elopement en extérieur sous l’arche de pierre",
        "Accès exclusif aux jardins et intérieurs historiques",
        "Séance First Look dans les jardins ou la cour du Manoir",
        "3h de couverture photo & vidéo avec film monté",
        "Officiant de cérémonie anglophone",
        "Toast au champagne",
        "Déjeuner gastronomique romantique pour deux",
        "Décoration florale",
        "Coordination sur place le jour J"
      ],
      highlighted: true
    },
    {
      id: "pack3",
      title: "Pack 3 — Overnight in Love : a countryside elopement",
      price: "À partir de 7 950 €",
      description: "L’expérience idéale pour vivre votre elopement comme une véritable escapade.",
      imageId: "package-luxury",
      features: [
        "Cérémonie d’elopement romantique au Manoir",
        "Accès exclusif aux jardins et intérieurs historiques",
        "Séance First Look dans le domaine",
        "3h de couverture photo & vidéo avec film monté",
        "Officiant de cérémonie anglophone",
        "Toast au champagne",
        "Déjeuner gastronomique pour deux",
        "1 nuit en suite privée au Manoir de Vacheresses",
        "Brunch gourmand le lendemain",
        "Départ tardif et moments de calme sur le domaine"
      ],
      highlighted: false
    },
    {
      id: "pack4",
      title: "Pack 4 — Elopement Raffiné jusqu’à 20 invités",
      price: "À partir de 16 000 €",
      description: "L’équilibre parfait entre intimité et célébration.",
      imageId: "parc-ombre",
      features: [
        "Elopement avec jusqu’à 20 invités",
        "Hébergement sur place (1 nuit)",
        "Boissons d’accueil",
        "Dîner de répétition (intérieur ou extérieur)",
        "Cérémonie avec officiant anglophone",
        "Déjeuner de mariage complet",
        "Petit-déjeuner continental",
        "Fleurs : bouquet, boutonnière et centres de table",
        "Coordination le jour du mariage",
        "Taxes et frais de service inclus"
      ],
      highlighted: false
    }
  ];

  const buildPackageUrl = (packageId: string) => {
    const params = new URLSearchParams({ package: packageId });
    if (dates?.from) {
      params.set('eventDate', dates.from.toISOString());
    }
    return `/configurator-elopement?${params.toString()}`;
  };

  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [isProgramOpen, setIsProgramOpen] = useState(false);
  const handlePackageClick = (packageId: string) => {
    setSelectedPackageId(packageId);
    if (!dates) {
      setIsDialogOpen(true);
    } else {
      // Instead of redirecting immediately, show the program
      setIsProgramOpen(true);
      setTimeout(() => {
        document.getElementById('program-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleDateSelected = (date: Date) => {
    setDates({ from: date, to: date });
    setIsDialogOpen(false);
    if (selectedPackageId) {
       // Show program instead of redirecting
       setIsProgramOpen(true);
       setTimeout(() => {
        document.getElementById('program-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const programs: Record<string, string[]> = {
    pack1: [
      "10h00 – Arrivée à la gare de Maintenon en Rolls-Royce",
      "10h30 – Accueil au Manoir & préparatifs (coiffure et maquillage)",
      "11h30 – First Look dans la bibliothèque du Manoir",
      "12h00 – Cérémonie d’elopement romantique dans le salon du Manoir",
      "12h30 – Toast au champagne près de la cheminée",
      "Séance photo dans le parc",
      "13h30 – Déjeuner romantique à la française dans la cour",
      "15h00 – Départ du Manoir de Vacheresses"
    ],
    pack2: [
      "10h00 – Arrivée à la gare de Maintenon en Rolls-Royce",
      "10h30 – Accueil au Manoir & préparatifs (coiffure et maquillage)",
      "11h30 – First Look dans la cour principale et les intérieurs historiques",
      "12h00 – Cérémonie sous l’arche de pierre",
      "12h30 – Toast au champagne",
      "Séance photo dans le parc",
      "13h30 – Déjeuner romantique dans la cour",
      "15h00 – Départ du Manoir de Vacheresses"
    ],
    pack3: [
      "11h00 – Arrivée au Manoir de Vacheresses",
      "11h30 – Welcome drink & déjeuner léger",
      "12h00 – Préparatifs des mariés (coiffure & maquillage)",
      "13h00 – First Look et séance photo dans le salon du Manoir",
      "14h00 – Cérémonie de mariage dans le verger",
      "14h30 – Toast au champagne",
      "15h00 – Séance photo de couple dans le parc",
      "16h00 – Dîner avec chef privé dans la cour d’honneur",
      "Soirée & nuit – Nuitée dans la guesthouse du Potager",
      "Brunch gourmand le lendemain & départ tardif"
    ],
    pack4: [
      "Jour d’arrivée",
      "17h00 – Accueil des mariés et des invités & welcome drink",
      "19h00 – Dîner de répétition (intérieur ou extérieur, jusqu’à 20 invités)",
      "Jour du mariage",
      "09h30 – Petit-déjeuner",
      "10h30 – Préparatifs des mariés",
      "12h30 – First Look et séance photo dans le salon du Manoir",
      "14h00 – Cérémonie de mariage dans le verger",
      "15h00 – Déjeuner de mariage dans la cour d’honneur ou la salle de réception",
      "17h30 – Départ des invités et des mariés"
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <p className="text-sm md:text-base tracking-wider text-primary uppercase font-semibold">
              <EditableText path="elopement.hero.kicker" value="Mariages Intimes" />
            </p>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">
              <EditableText path="elopement.hero.title" value="Forfaits Élopement" />
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              <EditableText
                path="elopement.hero.subtitle"
                value="Célébrez votre amour dans l'intimité absolue de notre domaine enchanteur. Des expériences personnalisées pour des mariages intimes et mémorables."
                multiline
              />
            </p>
          </div>

          {/* Intro Section */}
          <div className="bg-card rounded-xl shadow-lg p-8 mb-16 border border-primary/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-headline font-bold mb-4">
                  <EditableText path="elopement.intro.title" value="Mariages Intimes au Manoir" />
                </h2>
                <p className="text-muted-foreground mb-4">
                  <EditableText
                    path="elopement.intro.p1"
                    value="Nos forfaits élopement sont conçus pour les couples qui souhaitent célébrer leur union dans un cadre intime et enchanteur. Profitez de la beauté naturelle de notre domaine sans les contraintes d'un grand mariage."
                    multiline
                  />
                </p>
                <p className="text-muted-foreground">
                  <EditableText
                    path="elopement.intro.p2"
                    value="Tous nos forfaits incluent l'hébergement pour 2 personnes dans le domaine, contrairement à nos forfaits de mariage traditionnels où l'hébergement est en option."
                    multiline
                  />
                </p>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden">
                <CardImage
                  src={overridePath("/potager_4.jpg")}
                  alt="Mariage Intime au Manoir"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Packages Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-4">
              <EditableText path="elopement.packages.title" value="Nos Forfaits Élopement" />
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              <EditableText path="elopement.packages.subtitle" value="Une expérience intime au cœur de la campagne française, près de Paris" />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {elopementPackages.map((pkg, index) => {
                const image = getImageById(pkg.imageId);
                return (
                  <Card
                    key={pkg.id}
                    className={`flex flex-col transition-all duration-500 hover-lift hover-glow animate-in fade-in slide-in-from-bottom-8 ${
                      pkg.highlighted 
                        ? 'border-primary shadow-lg scale-105 ring-2 ring-primary/20' 
                        : 'hover:shadow-lg hover:border-primary/50'
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <CardHeader>
                      {image && (
                        <CardImage
                          src={image.imageUrl}
                          alt={image.description}
                          width={600}
                          height={400}
                          dataAiHint={image.imageHint}
                          aspectRatio="landscape"
                          overrideKey={pkg.imageId}
                          overlay={true}
                          overlayContent={
                            <div className="text-center text-white">
                              <p className="text-sm font-medium">
                                <EditableText path="elopement.packages.discover" value="Découvrir" />
                              </p>
                            </div>
                          }
                          className="mb-4"
                        />
                      )}
                      <CardTitle className="font-headline">
                        <EditableText path={`elopement.packages.${pkg.id}_title`} value={pkg.title} />
                      </CardTitle>
                      <CardDescription>
                        <EditableText path={`elopement.packages.${pkg.id}_desc`} value={pkg.description} />
                      </CardDescription>
                      <div className="mt-2 text-2xl font-bold text-primary">
                        <EditableText path={`elopement.packages.${pkg.id}_price`} value={pkg.price} />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">
                              <EditableText path={`elopement.packages.${pkg.id}_feature_${feature.length}_${feature.slice(0,10)}`} value={feature} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => handlePackageClick(pkg.id)}
                      className="w-full"
                      variant={pkg.highlighted ? 'default' : 'outline'}
                      // Button is enabled by default, will work on client-side
                    >
                      {dates ? (
                          <EditableText path="elopement.packages.button_select" value="Voir le programme" />
                        ) : (
                          <EditableText path="elopement.packages.button_choice" value="Choisir une date" />
                        )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>

        {isProgramOpen && selectedPackageId && (
          <div className="mb-16" id="program-section">
            <div className="bg-card rounded-xl shadow-lg p-8 border border-primary/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-headline font-bold">Programme</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {dates?.from ? new Date(dates.from).toLocaleDateString('fr-FR') : "Date non sélectionnée"}
                </div>
              </div>
              <ul className="space-y-3">
                {programs[selectedPackageId].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button onClick={() => router.push(buildPackageUrl(selectedPackageId))} className="gap-2">
                  Continuer
                </Button>
                <Button variant="outline" onClick={() => setIsProgramOpen(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-16">
          <h2 className="text-3xl font-headline font-bold text-center mb-4">
            <EditableText path="elopement.gallery1.title" value="Moments Inoubliables" />
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              <EditableText path="elopement.gallery1.subtitle" value="Découvrez la magie de nos mariages intimes à travers ces images" />
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "/espace_1.jpg", "/espace_2_(1).jpg", "/espace_4.jpg", 
                "/Parc_1.jpg", "/Parc_2.jpg", 
                "/preau_verger_1.jpg", "/preau_verger_2.jpg",
                "/vacheresses_17.jpg"
              ].map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                  <CardImage
                    src={overridePath(img)}
                    alt={`Mariage intime ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-primary/5 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-headline font-bold mb-4">
              <EditableText path="elopement.contact.title" value="Envie d'un Forfait Personnalisé ?" />
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              <EditableText
                path="elopement.contact.subtitle"
                value="Nous pouvons créer un forfait spécial adapté à vos besoins et préférences spécifiques. Contactez-nous pour discuter de vos idées."
                multiline
              />
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="gap-2">
                <Link href="mailto:contact@manoirdevacheresses.com">
                  <Mail className="h-4 w-4" />
                  <EditableText path="elopement.contact.button_email" value="Envoyer un Email" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2">
                <Link href="tel:+33611842021">
                  <Phone className="h-4 w-4" />
                  <EditableText path="elopement.contact.button_call" value="Appeler le Manoir" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <DomainTeaser />
        <Testimonials />
        <Access />
        <InstagramFeed />

        {/* Date Picker Dialog */}
        <DatePickerDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onDateSelected={handleDateSelected}
        />
      </main>
      <Footer />
    </div>
  );
}

export default function ElopementPackagesPage() {
  return (
    <ElopementContent />
  );
}
