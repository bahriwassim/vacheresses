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
      id: "formule1",
      title: "Élopement Formule 1 (1 Journée)",
      price: "5 560 €",
      description: "Une journée magique en semaine jusqu'à 10 personnes.",
      imageId: "package-classic",
      features: [
        "Welcome drink",
        "Arrivée matin : maquillage & coiffure",
        "First Look",
        "Échange de vœux avec célébrant",
        "Champagne",
        "Session photo (parc, salon, ext.)",
        "Repas intérieur ou extérieur (chef privé)",
        "Départ en fin de journée"
      ],
      highlighted: false,
      costs: {
        fixed: {
          location: 2800,
          photographe: 1500,
          officiant: 700,
          deco_florale: 500
        },
        variable: {
          repas: 130
        }
      }
    },
    {
      id: "formule2",
      title: "Élopement Formule 2 (Avec Nuitée)",
      price: "6 280 €",
      description: "L'expérience complète avec nuitée et brunch pour 2 personnes.",
      imageId: "package-premium",
      features: [
        "Accès complet domaine, piscine & tennis",
        "Arrivée vers 13h : maquillage & coiffure",
        "First Look",
        "Échange de vœux avec célébrant",
        "Champagne",
        "Session photo (parc, salon, ext.)",
        "Repas intérieur ou extérieur (chef privé)",
        "Nuitée + Petit déjeuner / Brunch",
        "Départ le lendemain"
      ],
      highlighted: true,
      costs: {
        fixed: {
          location: 3000,
          photographe: 1500,
          officiant: 700,
          deco_florale: 500
        },
        variable: {
          repas: 130,
          nuitee: 160
        }
      }
    },
    {
      id: "formule_hiver",
      title: "Élopement Formule Hiver (2 Personnes)",
      price: "4 300 €",
      description: "Un cocon romantique de novembre à mars.",
      imageId: "package-luxury",
      features: [
        "Uniquement en hiver (novembre à mars)",
        "Welcome drink",
        "Arrivée matin : maquillage & coiffure",
        "First Look",
        "Échange de vœux dans le salon du Manoir",
        "Champagne",
        "Session photo (parc, salon, ext.)",
        "Repas intérieur salle à manger (chef privé)",
        "Départ"
      ],
      highlighted: false,
      costs: {
        fixed: {
          location: 1500,
          photographe: 1500,
          officiant: 700,
          deco_florale: 300
        },
        variable: {
          repas: 150
        }
      }
    }
  ];

  const options = [
    { name: "Vidéaste", price: 1600 },
    { name: "Coiffure & maquillage mariée", price: 500 },
    { name: "Musicien cérémonie", price: 300 },
    { name: "Location Rolls Royce ou Jaguar", price: 250 }
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
    formule1: [
      "Matin – Arrivée au Manoir",
      "Matin – Préparatifs (maquillage & coiffure)",
      "Midi – First Look",
      "Après-midi – Échange de vœux avec célébrant",
      "Après-midi – Toast au champagne",
      "Après-midi – Session photo (parc, salon, ext.)",
      "Soir – Repas intérieur ou extérieur avec chef privé",
      "Fin de journée – Départ"
    ],
    formule2: [
      "13h00 – Arrivée au Manoir",
      "13h30 – Préparatifs (maquillage & coiffure)",
      "14h30 – First Look",
      "15h00 – Échange de vœux avec célébrant",
      "15h30 – Toast au champagne",
      "Après-midi – Session photo (parc, salon, ext.)",
      "Soir – Repas intérieur ou extérieur avec chef privé",
      "Nuit – Nuitée au domaine",
      "Lendemain – Petit déjeuner / Brunch & Départ"
    ],
    formule_hiver: [
      "Matin – Arrivée au Manoir",
      "Matin – Préparatifs (maquillage & coiffure)",
      "Midi – First Look",
      "Après-midi – Échange de vœux dans le salon du Manoir",
      "Après-midi – Toast au champagne",
      "Après-midi – Session photo (parc, salon, ext.)",
      "Soir – Repas dans la salle à manger du Manoir avec chef privé",
      "Fin de journée – Départ"
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

            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {elopementPackages.map((pkg, index) => {
                const image = getImageById(pkg.imageId);
                return (
                  <Card
                    key={pkg.id}
                    className={`flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] min-w-[280px] max-w-[350px] transition-all duration-500 hover-lift hover-glow animate-in fade-in slide-in-from-bottom-8 ${
                      pkg.highlighted 
                        ? 'border-primary shadow-lg md:scale-105 ring-2 ring-primary/20' 
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

          <div className="bg-primary/5 rounded-xl p-8 text-center mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8">Options Disponibles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {options.map((option, idx) => (
                <div key={idx} className="bg-card p-6 rounded-xl border border-primary/10 shadow-sm">
                  <h3 className="font-semibold text-primary mb-2">{option.name}</h3>
                  <p className="text-2xl font-bold">{option.price} €</p>
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
