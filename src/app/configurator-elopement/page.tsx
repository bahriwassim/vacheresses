"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Camera, Flower, Film, PartyPopper, Wind } from "lucide-react";
import { getGalleryImages } from "@/lib/vacheresses-images";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CardImage } from "@/components/ui/animated-image";
import { Separator } from "@/components/ui/separator";
import { useLocale } from "@/hooks/use-locale";
import type { Translation } from "@/lib/translations";

const getElopementPackages = (t: Translation) => [
  { id: "intimate", name: "Séance Photo Intime", basePrice: 1500 },
  { id: "romantic", name: "Élopement Romantique – Shooting", basePrice: 2900 },
  { id: "luxury", name: "Dream Shooting Luxe", basePrice: 5500 },
];

const getElopementAddons = (t: Translation) => [
  { id: "flowers", name: t.configurator.addon_flowers, price: 350, icon: Flower },
  { id: "styled_scene", name: "Scène stylisée (arches/voiles)", price: 600, icon: PartyPopper },
  { id: "teaser", name: "Mini vidéo teaser (30–60 s)", price: 800, icon: Film },
  { id: "drone", name: "Option drone (si autorisé)", price: 450, icon: Wind },
  { id: "extra_hour", name: "Heure supplémentaire de shooting", price: 300, icon: Camera },
];

function ConfiguratorElopementContent() {
  const { t, locale } = useLocale();
  const searchParams = useSearchParams();

  const packages = useMemo(() => getElopementPackages(t), [t]);
  const addons = useMemo(() => getElopementAddons(t), [t]);
  const gallery = getGalleryImages().slice(0, 6);

  const [guestCount, setGuestCount] = useState(2);
  const [selectedPackage, setSelectedPackage] = useState(packages[1]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  useEffect(() => {
    const packageId = searchParams.get("package");
    if (packageId) {
      const foundPackage = packages.find((p) => p.id === packageId);
      if (foundPackage) {
        setSelectedPackage(foundPackage);
      }
    }
  }, [searchParams, packages]);

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const costPerGuest = 0;
  const guestCost = guestCount * costPerGuest;
  const addonCost = addons
    .filter((addon) => selectedAddons.includes(addon.id))
    .reduce((total, addon) => total + addon.price, 0);

  const totalEstimate = selectedPackage.basePrice + guestCost + addonCost;

  const formatCurrency = (value: number) => {
    return value.toLocaleString(locale === "fr" ? "fr-FR" : "en-US", {
      style: "currency",
      currency: "EUR",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">
              {t.configurator.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.configurator.subtitle}
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-center mb-8">
              Inspirez-vous de nos élopements
            </h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {gallery.map((image, index) => (
                  <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <CardImage
                        src={image.imageUrl}
                        alt={image.description}
                        width={400}
                        height={300}
                        dataAiHint={image.imageHint}
                        aspectRatio="landscape"
                        hoverEffect="scale"
                        className="h-64"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline">{t.configurator.customize_title}</CardTitle>
                  <CardDescription>Sélectionnez votre forfait élopement et les options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="package" className="text-lg font-medium">
                      {t.configurator.package}
                    </Label>
                    <Select
                      value={selectedPackage.id}
                      onValueChange={(value) => {
                        const newPackage = packages.find((p) => p.id === value);
                        if (newPackage) setSelectedPackage(newPackage);
                      }}
                    >
                      <SelectTrigger id="package" className="w-full">
                        <SelectValue placeholder="Sélectionner un forfait" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id}>
                            {pkg.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t.configurator.addons}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {addons.map((addon) => (
                        <div
                          key={addon.id}
                          className="flex items-center space-x-3 rounded-md border p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                          onClick={() => handleAddonToggle(addon.id)}
                        >
                          <Checkbox
                            id={addon.id}
                            checked={selectedAddons.includes(addon.id)}
                            onCheckedChange={() => handleAddonToggle(addon.id)}
                          />
                          <div className="flex-1">
                            <Label htmlFor={addon.id} className="flex items-center gap-2 font-normal cursor-pointer">
                              <addon.icon className="h-5 w-5 text-primary" />
                              {addon.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              + {formatCurrency(addon.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="font-headline">{t.configurator.budget_title}</CardTitle>
                  <CardDescription>{t.configurator.budget_subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <p>
                      {t.configurator.base_package} ({selectedPackage.name})
                    </p>
                    <p>{formatCurrency(selectedPackage.basePrice)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>
                      {t.configurator.guest_surcharge} ({guestCount} {t.configurator.guests.toLowerCase()})
                    </p>
                    <p>{formatCurrency(guestCost)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>{t.configurator.addons_total}</p>
                    <p>{formatCurrency(addonCost)}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xl font-bold">
                    <p>{t.configurator.total_estimate}</p>
                    <p>{formatCurrency(totalEstimate)}</p>
                  </div>
                  <Button asChild className="w-full mt-4" size="lg">
                    <Link href="/login">{t.configurator.request_consultation}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function ConfiguratorElopementPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfiguratorElopementContent />
    </Suspense>
  );
}
