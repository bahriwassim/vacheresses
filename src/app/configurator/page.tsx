
"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Car, Flame, Flower, PartyPopper, Sofa, Wind } from "lucide-react";
import { getGalleryImages } from "@/lib/vacheresses-images";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CardImage } from "@/components/ui/animated-image";
import { Separator } from "@/components/ui/separator";
import { useLocale } from "@/hooks/use-locale";
import type { Translation } from "@/lib/translations";

const getPackages = (t: Translation) => [
  { id: "classic", name: t.packages.classic_title, basePrice: 15000 },
  { id: "premium", name: t.packages.premium_title, basePrice: 25000 },
  { id: "luxury", name: t.packages.luxury_title, basePrice: 40000 },
];

const getAddons = (t: Translation) => [
  { id: "rolls", name: t.configurator.addon_rolls, price: 500, icon: Car },
  { id: "lanterns", name: t.configurator.addon_lanterns, price: 300, icon: PartyPopper },
  { id: "chairs", name: t.configurator.addon_chairs, price: 800, icon: Sofa },
  { id: "bbq", name: t.configurator.addon_bbq, price: 1200, icon: Flame },
  { id: "flowers", name: t.configurator.addon_flowers, price: 1500, icon: Flower },
  { id: "balloon", name: t.configurator.addon_balloon, price: 2500, icon: Wind },
  { id: "catering", name: "Traiteur gastronomique", price: 2000, icon: Flame },
];

function ConfiguratorContent() {
  const { t, locale } = useLocale();
  const searchParams = useSearchParams();

  const packages = useMemo(() => getPackages(t), [t]);
  const addons = useMemo(() => getAddons(t), [t]);
  const weddingImages = getGalleryImages().slice(0, 6); // Images de mariage pour le diaporama

  const [guestCount, setGuestCount] = useState(100);
  const [selectedPackage, setSelectedPackage] = useState(packages[1]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  useEffect(() => {
    const packageId = searchParams.get('package');
    if (packageId) {
      const foundPackage = packages.find(p => p.id === packageId);
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

  const costPerGuest = 50;
  const guestCost = guestCount * costPerGuest;
  const addonCost = addons
    .filter((addon) => selectedAddons.includes(addon.id))
    .reduce((total, addon) => total + addon.price, 0);

  const totalEstimate = selectedPackage.basePrice + guestCost + addonCost;

  const formatCurrency = (value: number) => {
    return value.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US', { style: 'currency', currency: 'EUR' });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">{t.configurator.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.configurator.subtitle}
            </p>
          </div>

          {/* Diaporama des images de mariage */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-center mb-8">
              Inspirez-vous de nos mariages
            </h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {weddingImages.map((image, index) => (
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
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <Label htmlFor="guests" className="text-lg font-medium">{t.configurator.guests}: {guestCount}</Label>
                    <Slider
                      id="guests"
                      min={20}
                      max={300}
                      step={5}
                      value={[guestCount]}
                      onValueChange={(value) => setGuestCount(value[0])}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="package" className="text-lg font-medium">{t.configurator.package}</Label>
                     <Select
                        value={selectedPackage.id}
                        onValueChange={(value) => {
                            const newPackage = packages.find(p => p.id === value);
                            if (newPackage) setSelectedPackage(newPackage);
                        }}
                    >
                      <SelectTrigger id="package" className="w-full">
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id}>{pkg.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t.configurator.addons}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {addons.map((addon) => (
                        <div key={addon.id} 
                             className="flex items-center space-x-3 rounded-md border p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                             onClick={() => handleAddonToggle(addon.id)}>
                          <Checkbox
                            id={addon.id}
                            checked={selectedAddons.includes(addon.id)}
                            onCheckedChange={() => handleAddonToggle(addon.id)}
                          />
                           <div className="flex-1">
                            <Label htmlFor={addon.id} className="flex items-center gap-2 font-normal cursor-pointer">
                              <addon.icon className="h-5 w-5 text-primary"/>
                              {addon.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">+ {formatCurrency(addon.price)} ({t.services.on_request})</p>
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
                        <p>{t.configurator.base_package} ({selectedPackage.name})</p>
                        <p>{formatCurrency(selectedPackage.basePrice)}</p>
                    </div>
                     <div className="flex justify-between">
                        <p>{t.configurator.guest_surcharge} ({guestCount} {t.configurator.guests.toLowerCase()})</p>
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

export default function ConfiguratorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfiguratorContent />
    </Suspense>
  );
}
