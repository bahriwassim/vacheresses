"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useLocale } from "@/hooks/use-locale";
import { useBooking } from "@/contexts/booking-context";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function DateSelector() {
  const { t, locale } = useLocale();
  const { setDates } = useBooking();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      // Pour un mariage, on sélectionne juste une date (pas une période)
      setDates({ from: date, to: date });

      // Scroll automatique vers les packages dès qu'une date est sélectionnée
      setTimeout(() => {
        const packagesSection = document.getElementById('packages');
        if (packagesSection) {
          packagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      setDates(null);
    }
  };

  // Générer 3 mois à partir du mois actuel
  const currentMonth = new Date();
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  const thirdMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 1);

  return (
    <section id="date-selector" className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            {t.dateSelector?.title || "Choisissez la date de votre événement"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.dateSelector?.subtitle || "Sélectionnez la date de votre mariage ou événement pour découvrir nos forfaits"}
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <CardContent className="p-6">
              {/* Affichage de la date sélectionnée */}
              {selectedDate && (
                <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20 animate-in fade-in slide-in-from-top-4 duration-500 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.dateSelector?.selectedDate || "Date sélectionnée"}
                  </p>
                  <p className="text-xl font-semibold">
                    {format(selectedDate, "EEEE d MMMM yyyy", { locale: locale === 'fr' ? fr : undefined })}
                  </p>
                </div>
              )}

              {/* 3 Calendriers */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Premier mois */}
                <div className="animate-in fade-in slide-in-from-left-8 duration-700 delay-300">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="rounded-md"
                    month={currentMonth}
                    disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </div>

                {/* Deuxième mois */}
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="rounded-md"
                    month={nextMonth}
                    disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </div>

                {/* Troisième mois */}
                <div className="animate-in fade-in slide-in-from-right-8 duration-700 delay-500">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="rounded-md"
                    month={thirdMonth}
                    disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground animate-in fade-in duration-1000 delay-600">
          {t.dateSelector?.helpText || "Cliquez sur une date pour continuer"}
        </p>
      </div>
    </section>
  );
}
