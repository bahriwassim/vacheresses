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

const getElopementPackages = (t: Translation) => [
  {
    id: "formule1",
    name: "Élopement Formule 1 (1 Journée)",
    basePrice: 5300, // Fixed costs: 2600 + 1500 + 700 + 500
    variablePricePerPerson: 130, // Repas/boisson
    maxGuests: 10,
    isWeekdayOnly: true,
    program: [
      "Matin – Arrivée au Manoir",
      "Matin – Préparatifs (maquillage & coiffure)",
      "Midi – First Look",
      "Après-midi – Échange de vœux avec célébrant",
      "Après-midi – Toast au champagne",
      "Après-midi – Session photo (parc, salon, ext.)",
      "Soir – Repas intérieur ou extérieur avec chef privé",
      "Fin de journée – Départ"
    ]
  },
  {
    id: "formule2",
    name: "Élopement Formule 2 (Avec Nuitée)",
    basePrice: 5700, // Fixed costs: 3000 + 1500 + 700 + 500
    variablePricePerPerson: 290, // Repas (130) + Nuitée (160)
    maxGuests: 10,
    isWeekdayOnly: true,
    program: [
      "13h00 – Arrivée au Manoir",
      "13h30 – Préparatifs (maquillage & coiffure)",
      "14h30 – First Look",
      "15h00 – Échange de vœux avec célébrant",
      "15h30 – Toast au champagne",
      "Après-midi – Session photo (parc, salon, ext.)",
      "Soir – Repas intérieur ou extérieur avec chef privé",
      "Nuit – Nuitée au domaine",
      "Lendemain – Petit déjeuner / Brunch & Départ"
    ]
  },
  {
    id: "formule_hiver",
    name: "Élopement Formule Hiver (2 Personnes)",
    basePrice: 4000, // Fixed costs: 1500 + 1500 + 700 + 300
    variablePricePerPerson: 150, // Repas
    maxGuests: 2,
    isWinterOnly: true,
    program: [
      "Matin – Arrivée au Manoir",
      "Matin – Préparatifs (maquillage & coiffure)",
      "Midi – First Look",
      "Après-midi – Échange de vœux dans le salon du Manoir",
      "Après-midi – Toast au champagne",
      "Après-midi – Session photo (parc, salon, ext.)",
      "Soir – Repas dans la salle à manger du Manoir avec chef privé",
      "Fin de journée – Départ"
    ]
  }
];

const ELOPEMENT_OPTIONS = [
  { id: "videaste", name: "Vidéaste", price: 1600 },
  { id: "coiffure", name: "Coiffure & maquillage mariée", price: 500 },
  { id: "musique", name: "Musicien cérémonie", price: 300 },
  { id: "rolls", name: "Location Rolls Royce ou Jaguar", price: 250 },
];

// Programmes par pack (remplace Optional Add-ons)
const getProgramsByPackage = (packageId: string) => {
  const packages = getElopementPackages({} as Translation);
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
  const [date, setDate] = useState<string>("");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const packages = useMemo(() => getElopementPackages(t), [t]);

  useEffect(() => {
    const checkAuth = async () => {
        const { profile } = await authService.getCurrentUser();
        setCurrentUser(profile);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const packageId = searchParams.get("package");
    if (packageId) {
      const foundPackage = packages.find((p) => p.id === packageId);
      if (foundPackage) {
        setSelectedPackage(foundPackage);
      }
    }
    const urlDateParam = searchParams.get("eventDate");
    if (urlDateParam) {
      setDate(String(urlDateParam).split("T")[0]);
    } else if (!date && dates?.from) {
      setDate(dates.from.toISOString().split("T")[0]);
    }
  }, [searchParams, packages, dates, date]);

  const handleDateChange = (newDate: Date) => {
    const day = newDate.getDay();
    const isWeekend = day === 0 || day === 6;
    
    if (selectedPackage?.isWeekdayOnly && isWeekend) {
      toast({
        title: "Date non disponible",
        description: "Cette formule est uniquement disponible en semaine (du lundi au vendredi).",
        variant: "destructive"
      });
      return;
    }

    const month = newDate.getMonth(); // 0-11
    const isWinter = month >= 10 || month <= 2; // Nov (10) to March (2)
    if (selectedPackage?.isWinterOnly && !isWinter) {
      toast({
        title: "Date non disponible",
        description: "Cette formule est uniquement disponible en hiver (de novembre à mars).",
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
      const opt = ELOPEMENT_OPTIONS.find(o => o.id === optId);
      return acc + (opt?.price || 0);
    }, 0);
  }, [selectedOptions]);

  const totalEstimate = useMemo(() => {
    if (!selectedPackage) return 0;
    const variableCosts = guestCount * (selectedPackage.variablePricePerPerson || 0);
    return selectedPackage.basePrice + variableCosts + optionsTotal;
  }, [selectedPackage, guestCount, optionsTotal]);

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
        router.push('/login?next=/configurator-elopement');
        return;
    }

    setIsSubmitting(true);
    try {
      const selectedOptsNames = selectedOptions
        .map(id => ELOPEMENT_OPTIONS.find(o => o.id === id)?.name)
        .join(', ');

      const notes = `Élopement: ${selectedPackage.name}. Invités: ${guestCount}. Options: ${selectedOptsNames || 'Aucune'}.`;
      const payload = {
        user_id: currentUser.id,
        package_id: null,
        event_date: date,
        guest_count: guestCount,
        status: "inquiry",
        total_amount: totalEstimate,
        notes,
      };

      const { data, error } = await createBooking(payload);

      if (error) {
         throw new Error(typeof error === 'string' ? error : (error.error || error.message || "Erreur inconnue"));
      }

      localStorage.removeItem("pendingElopement");
      
      toast({ 
        title: "Demande envoyée !", 
        description: "Votre demande d'elopement a été reçue." 
      });

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error creating booking:", error);
      toast({ 
        title: "Erreur", 
        description: error.message || "Une erreur est survenue.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const programs = useMemo(() => getProgramsByPackage(selectedPackage?.id || ""), [selectedPackage?.id]);

  if (!selectedPackage) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Aucun pack sélectionné</h2>
            <Link href="/elopement-packages">
              <Button>Voir les packs d'élopement</Button>
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
            Retour aux packs
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Package Details */}
            <div className="lg:col-span-2 space-y-6 order-1">
              {/* Package Header */}
              <Card className="shadow-md">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-2xl md:text-3xl font-headline">{selectedPackage.name}</CardTitle>
                  <CardDescription className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-primary">{selectedPackage.basePrice.toLocaleString()} €</span>
                    <span className="text-xs text-muted-foreground">à partir de</span>
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
                      <span>Date flexible</span>
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
                  <CardTitle className="text-xl md:text-2xl font-headline">Programme & Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 md:space-y-8 p-4 md:p-6 pt-0">
                  <div className="space-y-4">
                    <h3 className="text-base md:text-lg font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      Programme de la journée
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
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
                    <h3 className="text-base md:text-lg font-medium">Options disponibles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {ELOPEMENT_OPTIONS.map((option) => (
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
              <Card className="lg:sticky lg:top-24 shadow-lg border-primary/10">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="text-xl font-headline">Réserver ce pack</CardTitle>
                  <CardDescription className="text-xs">
                    Remplissez le formulaire pour réserver votre élopement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 p-4 md:p-6 pt-0">
                  <div className="space-y-2">
                    <Label className="text-sm">Date d'élopement</Label>
                    <div className="flex items-center gap-2">
                      <input
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
                        Changer
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Nom complet</Label>
                      <Input
                        type="text"
                        placeholder="Votre nom complet"
                        className="w-full text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm">Email</Label>
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        className="w-full text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Nombre d'invités</Label>
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
                            {num} personnes
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-[10px] text-muted-foreground italic">
                      +{selectedPackage.variablePricePerPerson}€ / personne (repas & boissons)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm">Notes supplémentaires</Label>
                    <Textarea
                      placeholder="Des détails supplémentaires sur votre élopement..."
                      className="min-h-[80px] text-sm"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2 bg-secondary/10 p-3 rounded-lg">
                    <div className="flex justify-between text-[11px] md:text-xs">
                      <span className="text-muted-foreground">Coûts fixes ({selectedPackage.name})</span>
                      <span className="font-medium">{selectedPackage.basePrice.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between text-[11px] md:text-xs">
                      <span className="text-muted-foreground">Coûts variables ({guestCount} pers.)</span>
                      <span className="font-medium">{(guestCount * selectedPackage.variablePricePerPerson).toLocaleString()} €</span>
                    </div>
                    {selectedOptions.length > 0 && (
                      <div className="flex justify-between text-[11px] md:text-xs text-primary">
                        <span>Options sélectionnées</span>
                        <span className="font-medium">{optionsTotal.toLocaleString()} €</span>
                      </div>
                    )}
                    <Separator className="my-1" />
                    <div className="flex justify-between font-bold text-base md:text-lg text-primary pt-1">
                      <span>Total Estimé</span>
                      <span>{totalEstimate.toLocaleString()} €</span>
                    </div>
                  </div>

                  <Button className="w-full shadow-md" size="lg" onClick={handleElopementBooking} disabled={isSubmitting}>
                    {isSubmitting ? "Envoi..." : "Réserver maintenant"}
                  </Button>

                  <p className="text-[10px] text-muted-foreground text-center italic px-2">
                    Aucun paiement requis maintenant. Nous vous contacterons pour confirmer les détails.
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