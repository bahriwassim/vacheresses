"use client";

import { useEffect, useState, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import { useBooking } from "@/contexts/booking-context";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

function monthStart(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function DateSelector() {
  const { t, locale } = useLocale();
  const { setDates } = useBooking();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => monthStart(new Date()));
  const todayStart = monthStart(new Date());

  useEffect(() => {
    if (selectedDate) {
      setDates({ from: selectedDate, to: selectedDate });
      setTimeout(() => {
        const packagesSection = document.getElementById("packages");
        if (packagesSection) packagesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      setDates(null);
    }
  }, [selectedDate, setDates]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
      if (e.key === "ArrowRight") setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const prevMonth = useCallback(() => setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)), []);
  const nextMonth = useCallback(() => setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)), []);

  const isPrevDisabled = monthStart(currentMonth) <= todayStart;

  // Met à jour le mois seulement si nécessaire
  useEffect(() => {
    if (!selectedDate) return;
    const newMonth = monthStart(selectedDate);
    if (newMonth.getTime() !== currentMonth.getTime()) setCurrentMonth(newMonth);
  }, [selectedDate, currentMonth]);

  return (
    <section id="date-selector" className="py-16 md:py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            {t.dateSelector?.title || "Choisissez la date de votre événement"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.dateSelector?.subtitle || "Sélectionnez la date pour découvrir nos forfaits"}
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 w-full max-w-4xl">
            <CardContent className="p-6">
              {selectedDate && (
                <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20 animate-in fade-in slide-in-from-top-4 duration-500 text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.dateSelector?.selectedDate || "Date sélectionnée"}
                  </p>
                  <p className="text-xl font-semibold">
                    {format(selectedDate, "EEEE d MMMM yyyy", { locale: locale === "fr" ? fr : undefined })}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" onClick={prevMonth} className="p-2" disabled={isPrevDisabled} aria-label="Mois précédent">
                  <ChevronLeft />
                </Button>
                <span className="text-lg font-medium">
                  {format(currentMonth, "MMMM yyyy", { locale: locale === "fr" ? fr : undefined })}
                </span>
                <Button variant="ghost" onClick={nextMonth} className="p-2" aria-label="Mois suivant">
                  <ChevronRight />
                </Button>
              </div>

              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(d) => setSelectedDate(d ?? undefined)}
                month={currentMonth}
                disabled={(day) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return day < today;
                }}
                className="rounded-md shadow-md"
              />
            </CardContent>
          </Card>
        </div>

        <p className="text-center mt-6 text-sm text-muted-foreground animate-in fade-in duration-1000 delay-600">
          {t.dateSelector?.helpText || "Cliquez sur une date pour continuer — utilisez ← → pour changer de mois"}
        </p>
      </div>
    </section>
  );
}
