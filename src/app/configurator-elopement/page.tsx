"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Clock, Calendar, MapPin, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useLocale } from "@/hooks/use-locale";
import { Translation } from "@/lib/translations";
import { useBooking } from "@/contexts/booking-context";
import { DatePickerDialog } from "@/components/sections/date-picker-dialog";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createBooking } from "@/app/actions/booking";
import { authService, supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { CardImage } from "@/components/ui/animated-image";
import { getGalleryImages } from "@/lib/vacheresses-images";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const getElopementPackages = (t: Translation) => [
  {
    id: "formule1",
    name: t.elopement.configurator.packages.formule1_name,
    basePrice: 5300, 
    variablePricePerPerson: 130, 
    maxGuests: 10,
    isWeekdayOnly: true,
    program: t.elopement.configurator.packages.program_f1
  },
  {
    id: "formule2",
    name: t.elopement.configurator.packages.formule2_name,
    basePrice: 5700, 
    variablePricePerPerson: 290, 
    maxGuests: 10,
    isWeekdayOnly: true,
    program: t.elopement.configurator.packages.program_f2
  },
  {
    id: "formule_hiver",
    name: t.elopement.configurator.packages.formule_hiver_name,
    basePrice: 4000, 
    variablePricePerPerson: 150, 
    maxGuests: 2,
    isWinterOnly: true,
    program: t.elopement.configurator.packages.program_hiver
  }
];

const getElopementOptions = (t: Translation) => [
  { id: "videaste", name: t.elopement.configurator.options.videaste, price: 1600 },
  { id: "coiffure", name: t.elopement.configurator.options.coiffure, price: 500 },
  { id: "musique", name: t.elopement.configurator.options.musique, price: 300 },
  { id: "rolls", name: t.elopement.configurator.options.rolls, price: 250 },
];

// Programmes par pack (remplace Optional Add-ons)
const getProgramsByPackage = (packageId: string, t: Translation) => {
  const packages = getElopementPackages(t);
  const pkg = packages.find(p => p.id === packageId);
  return pkg?.program || [];
};

function ConfiguratorElopementContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { t, locale } = useLocale();
  const { dates, setDates } = useBooking();

  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);
  const [dbPackages, setDbPackages] = useState<any[]>([]);
  const [date, setDate] = useState<string>("");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const packages = useMemo(() => t?.elopement ? getElopementPackages(t) : [], [t]);
  const elopementOptions = useMemo(() => t?.elopement ? getElopementOptions(t) : [], [t]);
  const galleryImages = getGalleryImages().slice(0, 6);

  useEffect(() => {
    const init = async () => {
      // 0. Fetch DB Packages to map UUIDs
      if (supabase) {
        const { data } = await supabase.from('packages').select('*');
        if (data) {
           setDbPackages(data);
        }
      }

      // 1. Check Auth
      const { profile } = await authService.getCurrentUser();
      setCurrentUser(profile);

      // 2. Restore pending elopement if exists
      let pendingData: any = null;
      try {
        const raw = localStorage.getItem('pendingElopement');
        if (raw) {
          pendingData = JSON.parse(raw);
          if (pendingData.guestCount) setGuestCount(pendingData.guestCount);
          if (pendingData.selectedOptions) setSelectedOptions(pendingData.selectedOptions);
          if (pendingData.date) setDate(pendingData.date);
        }
      } catch (e) {}

      // 3. Determine package
      const packageId = searchParams.get("package") || pendingData?.packageId;
      if (packageId) {
        const foundPackage = packages.find((p) => p.id === packageId);
        if (foundPackage) {
          setSelectedPackage(foundPackage);
        }
      }

      // 4. Date from URL
      const urlDateParam = searchParams.get("eventDate");
      if (urlDateParam) {
        setDate(String(urlDateParam).split("T")[0]);
      } else if (!date && dates?.from) {
        setDate(dates.from.toISOString().split("T")[0]);
      }

      setInitializing(false);
    };

    init();
  }, [searchParams, packages]);

  const handleDateChange = (newDate: Date) => {
    const day = newDate.getDay();
    const isWeekend = day === 0 || day === 6;
    
    if (selectedPackage?.isWeekdayOnly && isWeekend) {
      toast({
        title: t.elopement.configurator.error_date_unavailable,
        description: t.elopement.configurator.error_weekday_only,
        variant: "destructive"
      });
      return;
    }

    const month = newDate.getMonth(); // 0-11
    const isWinter = month >= 10 || month <= 2; // Nov (10) to March (2)
    if (selectedPackage?.isWinterOnly && !isWinter) {
      toast({
        title: t.elopement.configurator.error_date_unavailable,
        description: t.elopement.configurator.error_winter_only,
        variant: "destructive"
      });
      return;
    }

    setDate(newDate.toISOString().split("T")[0]);
    setDates({ from: newDate, to: newDate });
    setIsDatePickerOpen(false);
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId) 
        : [...prev, optionId]
    );
  };

  const optionsTotal = useMemo(() => {
    return selectedOptions.reduce((acc, optId) => {
      const opt = elopementOptions.find(o => o.id === optId);
      return acc + (opt?.price || 0);
    }, 0);
  }, [selectedOptions, elopementOptions]);

  const totalEstimate = useMemo(() => {
    if (!selectedPackage) return 0;
    const variableCosts = guestCount * (selectedPackage.variablePricePerPerson || 0);
    return selectedPackage.basePrice + variableCosts + optionsTotal;
  }, [selectedPackage, guestCount, optionsTotal]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString(locale === 'fr' ? 'fr-FR' : 'en-US', { style: 'currency', currency: 'EUR' });
  };

  const handleElopementBooking = async () => {
    if (!selectedPackage) return;

    if (!currentUser) {
        const state = {
            packageId: selectedPackage.id,
            date,
            guestCount,
            selectedOptions
        };
        localStorage.setItem('pendingElopement', JSON.stringify(state));
        const nextUrl = encodeURIComponent(window.location.pathname + window.location.search);
        router.push(`/login?next=${nextUrl}`);
        return;
    }

    setIsSubmitting(true);
    try {
      const selectedOptsNames = selectedOptions
        .map(id => elopementOptions.find(o => o.id === id)?.name)
        .join(', ');

      const notes = `Élopement: ${selectedPackage.name}. Invités: ${guestCount}. Options: ${selectedOptsNames || 'Aucune'}.`;
      
      // Try to find matching package in DB
      const dbPackage = dbPackages.find(p => p.package_id === selectedPackage.id);
      
      const payload = {
        user_id: currentUser.id,
        package_id: dbPackage ? dbPackage.id : null,
        event_date: date,
        guest_count: guestCount,
        status: "inquiry",
        total_amount: totalEstimate,
        notes,
      };

      const { data, error } = await createBooking(payload);

      if (error) {
         throw new Error(typeof error === 'string' ? error : (error.error || error.message || t.elopement.configurator.error_message));
      }

      localStorage.removeItem("pendingElopement");
      
      toast({ 
        title: t.elopement.configurator.success_title, 
        description: t.elopement.configurator.success_message 
      });

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error creating booking:", error);
      toast({ 
        title: t.elopement.configurator.error_title, 
        description: error.message || t.elopement.configurator.error_message, 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const programs = useMemo(() => getProgramsByPackage(selectedPackage?.id || "", t), [selectedPackage?.id, t]);

  if (!t || !t.elopement) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (initializing) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center animate-pulse">
            <h2 className="text-2xl font-bold mb-4">Chargement de votre forfait...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!selectedPackage) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{t.elopement.configurator.no_package_title}</h2>
            <Link href="/elopement-packages">
              <Button>{t.elopement.configurator.no_package_button}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container max-w-7xl px-4">
          {/* Back Link */}
          <Link href="/elopement-packages" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t.elopement.configurator.back}
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">{t.elopement.configurator.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.elopement.configurator.subtitle}
            </p>
          </div>

          {/* Inspirez-vous Carousel */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-center mb-8">
              {t.elopement.configurator.inspire}
            </h2>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {galleryImages.map((image, index) => (
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

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Package Details */}
            <div className="lg:col-span-2 space-y-6 order-1">
              {/* Package Header */}
              <Card className="shadow-md">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-2xl md:text-3xl font-headline">{selectedPackage.name}</CardTitle>
                  <CardDescription className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-primary">{selectedPackage.basePrice.toLocaleString()} €</span>
                    <span className="text-xs text-muted-foreground">{t.elopement.packages.discover.toLowerCase()}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-xs md:text-sm">
                    <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-lg">
                      <Clock className="h-4 w-4 text-primary shrink-0" />
                      <span>3h de shooting</span>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-lg">
                      <Calendar className="h-4 w-4 text-primary shrink-0" />
                      <span>{t.elopement.configurator.date_label}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <span>Manoir de Vacheresses</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Program */}
              <Card className="shadow-md">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-xl md:text-2xl font-headline">{t.elopement.configurator.program_title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 md:space-y-8 p-4 md:p-6 pt-0">
                  <div className="space-y-4">
                    <h3 className="text-base md:text-lg font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      {t.elopement.configurator.program_day}
                    </h3>
                    <ul className="grid grid-cols-1 gap-2 md:gap-3">
                      {programs.map((step, idx) => (
                        <li key={idx} className="flex items-start bg-secondary/20 p-2 md:p-3 rounded-lg border border-primary/5">
                          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 md:mr-3 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-base md:text-lg font-medium">{t.elopement.configurator.options_available}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {elopementOptions.map((option) => (
                        <div 
                          key={option.id}
                          onClick={() => toggleOption(option.id)}
                          className={`cursor-pointer border rounded-xl p-3 md:p-4 transition-all duration-300 flex justify-between items-center ${
                            selectedOptions.includes(option.id) 
                              ? 'border-primary bg-primary/5 shadow-md' 
                              : 'hover:border-primary/50'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-sm md:text-base">{option.name}</span>
                            <span className="text-xs md:text-sm text-muted-foreground">{option.price} €</span>
                          </div>
                          <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border flex items-center justify-center ${
                            selectedOptions.includes(option.id) ? 'bg-primary border-primary text-white' : 'border-muted-foreground'
                          }`}>
                            {selectedOptions.includes(option.id) && <Check className="w-3 h-3 md:w-4 md:h-4" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1 order-2">
              <Card className="lg:sticky lg:top-24 shadow-lg border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="font-headline text-xl">{t.elopement.configurator.budget_title}</CardTitle>
                  <CardDescription className="text-xs">{t.elopement.configurator.budget_subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
                  <div className="space-y-2">
                    <Label className="text-sm">{t.elopement.configurator.date_label}</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="p-2 border rounded-md w-full text-sm"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsDatePickerOpen(true)}
                        className="shrink-0 text-xs"
                      >
                        {t.elopement.configurator.date_change}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">{t.elopement.configurator.guests_label}</Label>
                    <Select 
                      value={guestCount.toString()} 
                      onValueChange={(val) => setGuestCount(parseInt(val))}
                    >
                      <SelectTrigger className="text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: selectedPackage.maxGuests - 1 }, (_, i) => i + 2).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {t.elopement.configurator.guests_value.replace('{count}', num.toString())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-muted-foreground">{t.elopement.configurator.base_costs.replace('{name}', selectedPackage.name)}</span>
                      <span className="font-medium">{formatCurrency(selectedPackage.basePrice)}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-muted-foreground">{t.elopement.configurator.variable_costs.replace('{count}', guestCount.toString())}</span>
                      <span className="font-medium">{formatCurrency(guestCount * selectedPackage.variablePricePerPerson)}</span>
                    </div>
                    {selectedOptions.length > 0 && (
                      <div className="flex justify-between text-xs md:text-sm text-primary">
                        <span>{t.elopement.configurator.options_total}</span>
                        <span className="font-medium">{formatCurrency(optionsTotal)}</span>
                      </div>
                    )}
                    <Separator className="my-1" />
                    <div className="flex justify-between font-bold text-lg md:text-xl text-primary pt-1">
                      <span>{t.elopement.configurator.total_estimate}</span>
                      <span>{formatCurrency(totalEstimate)}</span>
                    </div>
                  </div>

                  <Button className="w-full shadow-lg hover:shadow-primary/20 transition-all" size="lg" onClick={handleElopementBooking} disabled={isSubmitting}>
                    {isSubmitting ? t.elopement.configurator.submitting : (currentUser ? t.elopement.configurator.book_button : t.elopement.configurator.login_to_book)}
                  </Button>

                  <p className="text-[10px] text-muted-foreground text-center italic px-2">
                    {t.elopement.configurator.disclaimer}
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
        onDateSelected={handleDateChange}
      />
      <Footer />
    </div>
  );
}

export default function ConfiguratorElopementPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Chargement...</div>}>
      <ConfiguratorElopementContent />
    </Suspense>
  );
}