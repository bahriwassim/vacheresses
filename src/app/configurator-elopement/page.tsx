"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Clock, Calendar, MapPin } from "lucide-react";
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
    id: "pack1",
    name: "Pack 1 — Secret Elopement in the Garden",
    basePrice: 4950,
    program: [
      "10h00 – Arrivée à la gare de Maintenon en Rolls-Royce",
      "10h30 – Accueil au Manoir & préparatifs (coiffure et maquillage)",
      "11h30 – First Look dans la bibliothèque du Manoir",
      "12h00 – Cérémonie d’elopement romantique dans le salon du Manoir",
      "12h30 – Toast au champagne près de la cheminée",
      "Séance photo dans le parc",
      "13h30 – Déjeuner romantique à la française dans la cour",
      "15h00 – Départ du Manoir de Vacheresses"
    ]
  },
  {
    id: "pack2",
    name: "Pack 2 — Elopement Secret (1 Journée)",
    basePrice: 5950,
    program: [
      "10h00 – Arrivée à la gare de Maintenon en Rolls-Royce",
      "10h30 – Accueil au Manoir & préparatifs (coiffure et maquillage)",
      "11h30 – First Look dans la cour principale et les intérieurs historiques",
      "12h00 – Cérémonie sous l’arche de pierre",
      "12h30 – Toast au champagne",
      "Séance photo dans le parc",
      "13h30 – Déjeuner romantique dans la cour",
      "15h00 – Départ du Manoir de Vacheresses"
    ]
  },
  {
    id: "pack3",
    name: "Pack 3 — Overnight in Love : a countryside elopement",
    basePrice: 7950,
    program: [
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
    ]
  },
  {
    id: "pack4",
    name: "Pack 4 — Elopement Raffiné jusqu’à 20 invités",
    basePrice: 16000,
    program: [
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
  }
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
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
        const { profile } = await authService.getCurrentUser();
        setCurrentUser(profile);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const packages = getElopementPackages(t);
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
    } else if (!date) {
      const d = new Date();
      d.setMonth(d.getMonth() + 1);
      setDate(d.toISOString().split("T")[0]);
    }
  }, [searchParams, t, dates, date]);

  const handleDateChange = (newDate: Date) => {
    setDate(newDate.toISOString().split("T")[0]);
    setDates({ from: newDate, to: newDate });
    setIsDatePickerOpen(false);
  };

  const packages = useMemo(() => getElopementPackages(t), [t]);
  const programs = useMemo(() => getProgramsByPackage(selectedPackage?.id || ""), [selectedPackage?.id]);

  const addonCost = 0; // Les add-ons sont retirés, programmes inclus

  const totalEstimate = selectedPackage ? selectedPackage.basePrice + addonCost : 0;

  const handleElopementBooking = async () => {
    if (!selectedPackage) return;

    if (!currentUser) {
        const state = {
            packageId: selectedPackage.id,
            date
        };
        localStorage.setItem('pendingElopement', JSON.stringify(state));
        router.push('/login?next=/configurator-elopement');
        return;
    }

    setIsSubmitting(true);
    try {
      const notes = `Élopement: ${selectedPackage.name}.`;
      const payload = {
        user_id: currentUser.id,
        package_id: null,
        event_date: date,
        guest_count: 2,
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
            <div className="lg:col-span-2 space-y-6">
              {/* Package Header */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl">{selectedPackage.name}</CardTitle>
                  <CardDescription>
                    <span className="text-2xl font-bold text-primary">{selectedPackage.basePrice.toLocaleString()} €</span>
                    <span className="text-muted-foreground ml-2">à partir de</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>3h de shooting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Date flexible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Manoir de Vacheresses</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Program */}
              <Card>
                <CardHeader>
                  <CardTitle>Programme</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Programme</h3>
                    <ul className="space-y-2">
                      {programs.map((step, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Réserver ce pack</CardTitle>
                  <CardDescription>
                    Remplissez le formulaire pour réserver votre élopement
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Date d'élopement</Label>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="p-2 border rounded-md w-full"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDatePickerOpen(true)}
                        className="shrink-0"
                      >
                        Changer
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Nom complet</Label>
                    <Input
                      type="text"
                      placeholder="Votre nom complet"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Téléphone</Label>
                    <Input
                      type="tel"
                      placeholder="+33 6 12 34 56 78"
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Nombre d'invités</Label>
                    <Select defaultValue="2">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 (couple)</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Notes supplémentaires</Label>
                    <Textarea
                      placeholder="Des détails supplémentaires sur votre élopement..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{selectedPackage.name}</span>
                      <span>{selectedPackage.basePrice.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>{totalEstimate.toLocaleString()} €</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleElopementBooking} disabled={isSubmitting}>
                    {isSubmitting ? "Envoi..." : "Réserver maintenant"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
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