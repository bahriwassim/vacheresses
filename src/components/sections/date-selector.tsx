"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { useBooking } from "@/contexts/booking-context";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function DateSelector() {
  const { t, locale } = useLocale();
  const { setDates } = useBooking();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      setDates({ from: range.from, to: range.to });
    } else {
      setDates(null);
    }
  };

  const scrollToPackages = () => {
    const packagesSection = document.getElementById('packages');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Générer 2 mois à partir du mois actuel
  const currentMonth = new Date();
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  const isDatesSelected = dateRange?.from && dateRange?.to;

  return (
    <section id="date-selector" className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container max-w-6xl px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            {t.dateSelector?.title || "Choisissez vos dates de séjour"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.dateSelector?.subtitle || "Sélectionnez votre date d'arrivée et de départ pour découvrir nos forfaits disponibles"}
          </p>
        </div>

        <Card className="shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <CardContent className="p-6 md:p-8">
            {/* Affichage des dates sélectionnées */}
            {isDatesSelected && (
              <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex items-center justify-center gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {t.dateSelector?.checkIn || "Arrivée"}
                    </p>
                    <p className="text-lg font-semibold">
                      {format(dateRange.from, "d MMMM yyyy", { locale: locale === 'fr' ? fr : undefined })}
                    </p>
                  </div>
                  <div className="text-2xl text-muted-foreground">→</div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {t.dateSelector?.checkOut || "Départ"}
                    </p>
                    <p className="text-lg font-semibold">
                      {format(dateRange.to, "d MMMM yyyy", { locale: locale === 'fr' ? fr : undefined })}
                    </p>
                  </div>
                </div>
                <p className="text-center mt-3 text-sm text-muted-foreground">
                  {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} {t.dateSelector?.nights || "nuits"}
                </p>
              </div>
            )}

            {/* Calendriers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex justify-center animate-in fade-in slide-in-from-left-8 duration-700 delay-300">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDateSelect}
                  numberOfMonths={1}
                  month={currentMonth}
                  className="rounded-md"
                  disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </div>
              <div className="flex justify-center animate-in fade-in slide-in-from-right-8 duration-700 delay-400">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDateSelect}
                  numberOfMonths={1}
                  month={nextMonth}
                  className="rounded-md"
                  disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </div>
            </div>

            {/* Bouton de confirmation */}
            <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
              <Button
                size="lg"
                onClick={scrollToPackages}
                disabled={!isDatesSelected}
                className="min-w-[250px]"
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                {isDatesSelected
                  ? t.dateSelector?.continueButton || "Continuer vers les forfaits"
                  : t.dateSelector?.selectDatesButton || "Sélectionnez vos dates"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {!isDatesSelected && (
          <p className="text-center mt-6 text-sm text-muted-foreground animate-in fade-in duration-1000 delay-600">
            {t.dateSelector?.helpText || "Cliquez sur une date d'arrivée, puis sur une date de départ"}
          </p>
        )}
      </div>
    </section>
  );
}
