
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
import { DatePickerDialog } from "@/components/sections/date-picker-dialog";
import type { Translation } from "@/lib/translations";
import { supabase, authService } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { createBooking } from "@/app/actions/booking";

const getAddons = (t: Translation) => [
  { id: "videaste", name: "Vidéaste", price: 2500, icon: Car },
  { id: "coiffure", name: "Coiffure & maquillage mariée", price: 1500, icon: Flower },
  { id: "musique", name: "Musicien cérémonie", price: 600, icon: PartyPopper },
  { id: "rolls", name: "Location Rolls Royce ou Jaguar", price: 250, icon: Car },
  { id: "mongolfiere", name: "Montgolfière selon météo", price: 2000, icon: Wind },
  { id: "fleurs", name: "Décoration Florale", price: 3000, icon: Flower },
  { id: "photoboost", name: "Photo boost", price: 450, icon: Sofa },
  { id: "jeux", name: "Pack de jeux en bois", price: 200, icon: PartyPopper },
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
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      // Primary formulas as defined in translations
      const formulas = [
        { 
          id: "formule1", 
          package_id: "formule1",
          name: locale === 'fr' ? "Mariage Formule 1 (Week-end)" : "Wedding Formula 1 (Weekend)", 
          basePriceHigh: 15500, // High season base
          basePriceLow: 13500,  // Low season base
          variablePricePerPerson: 203.125,
          maxGuests: 100 
        },
        { 
          id: "formule2", 
          package_id: "formule2",
          name: locale === 'fr' ? "Mariage Formule 2 (Semaine)" : "Wedding Formula 2 (Weekday)", 
          basePrice: 11500, 
          variablePricePerPerson: 203.125,
          maxGuests: 100 
        },
      ];

      if (supabase) {
        const { data, error } = await supabase.from('packages').select('*');
        if (data && !error && data.length > 0) {
            // If we have data, we try to find the actual UUIDs for our formulas if they exist in DB
            // Otherwise we keep our formula objects with mock IDs for now
            const updatedFormulas = formulas.map(f => {
                 const dbMatch = data.find((p: any) => p.package_id === f.package_id);
                 if (dbMatch) {
                     return { ...f, id: dbMatch.id };
                 }
                 return f;
             });
             setPackages(updatedFormulas);
             
             // Selection logic
             let pendingPackageId = null;
             try {
                 const pending = localStorage.getItem('pendingBooking');
                 if (pending) {
                     const d = JSON.parse(pending);
                     pendingPackageId = d.packageId;
                 }
             } catch {}
             
             const packageId = pendingPackageId || searchParams.get('package');
             const found = updatedFormulas.find(p => p.id === packageId || p.package_id === packageId);
             setSelectedPackage(found || updatedFormulas[0]);
         } else {
             setPackages(formulas);
             setSelectedPackage(formulas[0]);
         }
       } else {
         setPackages(formulas);
         setSelectedPackage(formulas[0]);
       }
      
       // Fetch booked dates
       if (supabase) {
        const { data: bookings } = await supabase
          .from('bookings')
          .select('event_date, status')
          .in('status', ['confirmed', 'booked', 'paid']);
        
        if (bookings) {
            setBookedDates(bookings.map(b => {
                const [year, month, day] = b.event_date.split('-').map(Number);
                return new Date(year, month - 1, day);
            }));
         }
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

  const isDateValidForPackage = (pkg: any, dateStr: string) => {
    if (!dateStr || !pkg) return { valid: true };
    const d = new Date(dateStr);
    const day = d.getDay(); // 0 (Sun) to 6 (Sat)
    
    if (pkg.package_id === "formule1") {
      // Week-end: Friday (5), Saturday (6), Sunday (0)
      const isWeekend = [0, 5, 6].includes(day);
      return { 
        valid: isWeekend, 
        message: locale === 'fr' 
          ? "Le forfait Week-end est réservé aux vendredis, samedis et dimanches." 
          : "The Weekend package is reserved for Fridays, Saturdays, and Sundays." 
      };
    }
    
    if (pkg.package_id === "formule2") {
      // Semaine: Monday (1) to Thursday (4)
      const isWeekday = [1, 2, 3, 4].includes(day);
      return { 
        valid: isWeekday, 
        message: locale === 'fr' 
          ? "Le forfait Semaine est réservé aux jours du lundi au jeudi." 
          : "The Weekday package is reserved for Monday to Thursday." 
      };
    }
    
    return { valid: true };
  };

  const isDateDisabled = (date: Date) => {
    // 1. Past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    // 2. Booked dates
    if (bookedDates.some(bookedDate => 
        date.getFullYear() === bookedDate.getFullYear() &&
        date.getMonth() === bookedDate.getMonth() &&
        date.getDate() === bookedDate.getDate()
    )) return true;

    // 3. Package restrictions
    if (selectedPackage) {
        if (selectedPackage.package_id === "formule1") {
            // Week-end: Friday (5), Saturday (6), Sunday (0)
            const day = date.getDay();
            if (![0, 5, 6].includes(day)) return true;
        }
        
        if (selectedPackage.package_id === "formule2") {
            // Semaine: Monday (1) to Thursday (4)
            const day = date.getDay();
            if (![1, 2, 3, 4].includes(day)) return true;
        }
    }
    
    return false;
  };

  const handleDateSelected = (newDate: Date) => {
      // Validate again just in case
      const validation = isDateValidForPackage(selectedPackage, newDate.toISOString().split('T')[0]);
      if (!validation.valid) {
          toast({ title: "Date non conforme", description: validation.message, variant: "destructive" });
          return;
      }
      setDate(newDate.toISOString().split('T')[0]);
      setIsDatePickerOpen(false);
  };

  const handleBooking = async () => {
    if (!selectedPackage) return;
    if (!date) {
        toast({ title: "Date requise", description: "Veuillez sélectionner une date.", variant: "destructive" });
        return;
    }

    const validation = isDateValidForPackage(selectedPackage, date);
    if (!validation.valid) {
        toast({ title: "Date non conforme", description: validation.message, variant: "destructive" });
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
        const nextUrl = encodeURIComponent(window.location.pathname + window.location.search);
        router.push(`/login?next=${nextUrl}`);
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

  const totalEstimate = useMemo(() => {
    if (!selectedPackage) return 0;
    
    let base = selectedPackage.basePrice || 0;
    
    // Logic for Formula 1 seasons
    if (selectedPackage.package_id === "formule1" && date) {
      const d = new Date(date);
      const month = d.getMonth(); // 0-11
      const isHighSeason = month >= 5 && month <= 8; // June to Sept
      base = isHighSeason ? selectedPackage.basePriceHigh : selectedPackage.basePriceLow;
    }

    const variable = guestCount * (selectedPackage.variablePricePerPerson || 0);
    return base + variable + addonCost;
  }, [selectedPackage, guestCount, addonCost, date]);

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
            <div className="lg:col-span-2 order-1">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline">{t.configurator.customize_title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 p-4 md:p-6">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="date">Date estimée</Label>
                        <div className="flex items-center gap-2">
                            <Input 
                                id="date" 
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full"
                                disabled
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setIsDatePickerOpen(true)}
                                className="shrink-0"
                            >
                                Choisir
                            </Button>
                        </div>
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
                           max={100} 
                           step={1} 
                        />
                        <p className="text-[10px] md:text-xs text-muted-foreground">Maximum 100 personnes pour la réception.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t.configurator.addons}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {addons.map((addon) => (
                        <div key={addon.id} 
                             className="flex items-center space-x-3 rounded-md border p-3 md:p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                             onClick={() => handleAddonToggle(addon.id)}>
                          <Checkbox
                            id={addon.id}
                            checked={selectedAddons.includes(addon.id)}
                            onCheckedChange={() => handleAddonToggle(addon.id)}
                          />
                           <div className="flex-1">
                            <Label htmlFor={addon.id} className="flex items-center gap-2 font-normal cursor-pointer text-sm md:text-base">
                              <addon.icon className="h-4 w-4 md:h-5 md:w-5 text-primary"/>
                              {addon.name}
                            </Label>
                            <p className="text-[10px] md:text-sm text-muted-foreground">+ {formatCurrency(addon.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1 order-2 lg:order-2">
              <Card className="shadow-lg lg:sticky lg:top-24 border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="font-headline text-xl">{t.configurator.budget_title}</CardTitle>
                  <CardDescription className="text-xs">{t.configurator.budget_subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                    <div className="flex justify-between text-xs md:text-sm">
                        <p className="text-muted-foreground">{t.configurator.base_package}</p>
                        <p className="font-medium">
                          {formatCurrency(
                            selectedPackage?.package_id === "formule1" && date
                              ? (new Date(date).getMonth() >= 5 && new Date(date).getMonth() <= 8 ? selectedPackage.basePriceHigh : selectedPackage.basePriceLow)
                              : (selectedPackage?.basePrice || 0)
                          )}
                        </p>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                        <p className="text-muted-foreground">Traiteur ({guestCount} pers. à 112,50€)</p>
                        <p className="font-medium">{formatCurrency(guestCount * 112.5)}</p>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                        <p className="text-muted-foreground">Personnel de service (estimé)</p>
                        <p className="font-medium">{formatCurrency(guestCount * 90.625)}</p>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                        <p className="text-muted-foreground">{t.configurator.addons_total}</p>
                        <p className="font-medium">{formatCurrency(addonCost)}</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg md:text-xl font-bold text-primary">
                        <p>{t.configurator.total_estimate}</p>
                        <p>{formatCurrency(totalEstimate)}</p>
                    </div>
                    <Button 
                        className="w-full mt-2 shadow-lg hover:shadow-primary/20 transition-all" 
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
                    <p className="text-[10px] text-center text-muted-foreground italic">
                      Cette estimation ne constitue pas un devis définitif.
                    </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <DatePickerDialog
        open={isDatePickerOpen}
        onOpenChange={setIsDatePickerOpen}
        onDateSelected={handleDateSelected}
        disabled={isDateDisabled}
      />
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
