
"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Car, Flame, Flower, PartyPopper, Sofa, Wind } from "lucide-react";
import { getGalleryImages } from "@/lib/vacheresses-images";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CardImage } from "@/components/ui/animated-image";
import { Separator } from "@/components/ui/separator";
import { useLocale } from "@/hooks/use-locale";
import type { Translation } from "@/lib/translations";
import { supabase, authService } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { createBooking } from "@/app/actions/booking";

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
  const router = useRouter();
  const { toast } = useToast();

  const [packages, setPackages] = useState<any[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const addons = useMemo(() => getAddons(t), [t]);
  const weddingImages = getGalleryImages().slice(0, 6);

  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [guestCount, setGuestCount] = useState<number>(50);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [date, setDate] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      if (!supabase) return;
      
      const { data, error } = await supabase.from('packages').select('*');
      
      if (data && !error) {
        const formattedPackages = data.map((p: any) => ({
          id: p.id,
          name: locale === 'fr' ? p.name_fr : p.name_en,
          basePrice: p.base_price,
          maxGuests: p.max_guests
        }));
        setPackages(formattedPackages);
        
        // Restore pending package if exists
        let pendingPackageId = null;
        try {
            const pending = localStorage.getItem('pendingBooking');
            if (pending) {
                const d = JSON.parse(pending);
                pendingPackageId = d.packageId;
            }
        } catch {}

        // Select default or from URL
        const packageId = pendingPackageId || searchParams.get('package'); 
        
        // Try to match by ID
        const found = formattedPackages.find(p => p.id === packageId);
        if (found) {
            setSelectedPackage(found);
        } else if (formattedPackages.length > 0) {
            // Default to middle one
            setSelectedPackage(formattedPackages[1] || formattedPackages[0]);
        }
      } else {
        // Fallback hardcoded
        const fallback = [
            { id: "classic", name: t.packages.classic_title, basePrice: 15000, maxGuests: 100 },
            { id: "premium", name: t.packages.premium_title, basePrice: 25000, maxGuests: 200 },
            { id: "luxury", name: t.packages.luxury_title, basePrice: 40000, maxGuests: 300 },
        ];
        setPackages(fallback);
        setSelectedPackage(fallback[1]);
      }
      setLoadingPackages(false);
    };

    fetchPackages();
    
    // Check Auth
    const checkAuth = async () => {
        const { user, profile } = await authService.getCurrentUser();
        setCurrentUser(profile);
    };
    checkAuth();

    // Restore pending booking (other fields)
    const pending = localStorage.getItem('pendingBooking');
    if (pending) {
        try {
            const data = JSON.parse(pending);
            if (data.addons) setSelectedAddons(data.addons);
            if (data.date) setDate(data.date);
        } catch {}
    }
    
    // Auto-select date: URL param or default +6 months if empty
    try {
      const urlDateParam = searchParams.get('eventDate') || searchParams.get('date');
      if (!date && urlDateParam) {
        setDate(String(urlDateParam).split('T')[0]);
      } else if (!date) {
        const d = new Date();
        d.setMonth(d.getMonth() + 6);
        setDate(d.toISOString().split('T')[0]);
      }
    } catch {}

  }, [locale, searchParams, t]);

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleBooking = async () => {
    if (!selectedPackage) return;
    if (!date) {
        toast({ title: "Date requise", description: "Veuillez sélectionner une date.", variant: "destructive" });
        return;
    }

    if (!currentUser) {
        // Save state and redirect to login
        const state = {
            packageId: selectedPackage.id,
            addons: selectedAddons,
            date
        };
        localStorage.setItem('pendingBooking', JSON.stringify(state));
        router.push('/login?next=/configurator');
        return;
    }

    // Submit booking
    setIsSubmitting(true);
    if (!supabase) {
         toast({ title: "Erreur", description: "Erreur de configuration serveur.", variant: "destructive" });
         setIsSubmitting(false);
         return;
    }

    try {
        const packageName = selectedPackage.name;
        const addonNames = addons
            .filter(a => selectedAddons.includes(a.id))
            .map(a => a.name)
            .join(', ');

        let notesContent = "";
        // If using fallback package (short ID), include name in notes
        if (selectedPackage.id.length <= 10) {
            notesContent += `Forfait sélectionné: ${packageName} (ID: ${selectedPackage.id}). `;
        }
        if (addonNames) {
            notesContent += `Options: ${addonNames}.`;
        }

        const bookingPayload = {
            user_id: currentUser.id,
            package_id: selectedPackage.id.length > 10 ? selectedPackage.id : null, // Handle mock IDs
            event_date: date,
            guest_count: guestCount,
            status: 'inquiry',
            total_amount: totalEstimate,
            notes: notesContent || null
        };

        console.log("Submitting booking:", bookingPayload);

        const { data, error: bookingError } = await createBooking(bookingPayload);

        if (bookingError) {
            console.error("Booking Error Detail:", bookingError);
            throw new Error(bookingError);
        }

        // Clear pending
        localStorage.removeItem('pendingBooking');
        
        toast({ 
            title: "Demande envoyée !", 
            description: "Votre demande de réservation a été reçue. Vous pouvez la suivre dans votre tableau de bord." 
        });
        
        router.push('/dashboard');

    } catch (err: any) {
        console.error("Full Booking Error:", err);
        toast({ 
            title: "Erreur de réservation", 
            description: err.message || err.details || "Une erreur technique est survenue.", 
            variant: "destructive" 
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  const addonCost = addons
    .filter((addon) => selectedAddons.includes(addon.id))
    .reduce((total, addon) => total + addon.price, 0);

  const totalEstimate = (selectedPackage?.basePrice || 0) + addonCost;

  const formatCurrency = (value: number) => {
    return value.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US', { style: 'currency', currency: 'EUR' });
  }

  if (loadingPackages) {
      return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
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
                    <Label htmlFor="package" className="text-lg font-medium">{t.configurator.package}</Label>
                     <Select
                        value={selectedPackage?.id}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="date">Date estimée</Label>
                        <Input 
                            id="date" 
                            type="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <Label>Nombre d'invités</Label>
                           <span className="text-sm font-medium">{guestCount} personnes</span>
                        </div>
                        <Slider 
                           value={[guestCount]} 
                           onValueChange={(vals) => setGuestCount(vals[0])} 
                           min={10} 
                           max={130} 
                           step={5} 
                        />
                        <p className="text-xs text-muted-foreground">Maximum 130 personnes pour la réception.</p>
                    </div>
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
                        <p>{t.configurator.base_package} ({selectedPackage?.name})</p>
                        <p>{formatCurrency(selectedPackage?.basePrice || 0)}</p>
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
                    <Button 
                        className="w-full mt-4" 
                        size="lg" 
                        onClick={handleBooking}
                        disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? "Envoi..." 
                        : currentUser 
                            ? "Envoyer la demande" 
                            : "Se connecter pour réserver"
                      }
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
