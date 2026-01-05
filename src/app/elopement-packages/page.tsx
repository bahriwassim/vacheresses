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
import { BookingProvider, useBooking } from "@/contexts/booking-context";

function ElopementContent() {
  const { t } = useLocale();
  const router = useRouter();
  const { dates, setDates } = useBooking();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
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
      id: "intimate",
      title: "Séance Photo Intime",
      price: "À partir de 1 500 €",
      description: "Shooting élopement épuré pour deux, dans un lieu du domaine",
      imageId: "package-classic",
      features: [
        "Photographe professionnel – 2 heures de couverture",
        "1 lieu emblématique du domaine",
        "Direction artistique légère et assistance pose",
        "50 photos retouchées en haute définition",
        "Galerie en ligne privée",
        "Coordination sur place (30 min)"
      ],
      highlighted: false
    },
    {
      id: "romantic",
      title: "Élopement Romantique – Shooting",
      price: "À partir de 2 900 €",
      description: "Expérience photo complète avec plusieurs scènes et stylisme",
      imageId: "package-premium",
      features: [
        "Photographe professionnel – 4 heures de couverture",
        "2 à 3 lieux (Parc, Orangerie, Cour d'honneur)",
        "Mini cérémonie intime mise en scène",
        "Stylisme floral de base pour le shooting",
        "120 photos retouchées + sélection noir & blanc",
        "Mini vidéo teaser (30–60 s)"
      ],
      highlighted: true
    },
    {
      id: "luxury",
      title: "Dream Shooting Luxe",
      price: "À partir de 5 500 €",
      description: "Journée élopement créative avec vidéo et accessoires premium",
      imageId: "package-luxury",
      features: [
        "Couverture photo sur la journée (jusqu'à 8 heures)",
        "3 à 5 lieux du domaine + changement de tenues",
        "Stylisme avancé & accessoires (voiles, lanternes)",
        "Galerie complète retouchée (200+ photos)",
        "Vidéo highlight (3–5 min) – option drone si autorisé",
        "Album photo premium 30×30 cm"
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

  const handlePackageClick = (packageId: string) => {
    if (!dates) {
      setIsDialogOpen(true);
    } else {
      router.push(buildPackageUrl(packageId));
    }
  };

  const handleDateSelected = (date: Date) => {
    setDates({ from: date, to: date });
    setIsDialogOpen(false);
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

          {/* Gallery Section */}
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


          {/* Packages Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-4">
              <EditableText path="elopement.packages.title" value="Nos Forfaits Élopement" />
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              <EditableText path="elopement.packages.subtitle" value="Choisissez parmi nos forfaits soigneusement conçus pour créer des souvenirs inoubliables" />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                          <EditableText path="elopement.packages.button_select" value="Sélectionner" />
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
    <BookingProvider>
      <ElopementContent />
    </BookingProvider>
  );
}
