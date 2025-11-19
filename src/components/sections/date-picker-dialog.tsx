"use client";

import { useEffect, useState, useCallback } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLocale } from "@/hooks/use-locale";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDateSelected: (date: Date) => void;
}

function monthStart(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function DatePickerDialog({ open, onOpenChange, onDateSelected }: DatePickerDialogProps) {
  const { t, locale } = useLocale();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => monthStart(new Date()));
  const todayStart = monthStart(new Date());

  useEffect(() => {
    if (open) setCurrentMonth(selectedDate ? monthStart(selectedDate) : todayStart);
  }, [open, selectedDate, todayStart]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
      if (e.key === "ArrowRight") setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  const prevMonth = useCallback(() => setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1)), []);
  const nextMonth = useCallback(() => setCurrentMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1)), []);

  const handleConfirm = () => {
    if (selectedDate) {
      onDateSelected(selectedDate);
      onOpenChange(false);
    }
  };

  const isPrevDisabled = monthStart(currentMonth) <= todayStart;

  // Mise à jour mois uniquement si nécessaire
  useEffect(() => {
    if (!selectedDate) return;
    const newMonth = monthStart(selectedDate);
    if (newMonth.getTime() !== currentMonth.getTime()) setCurrentMonth(newMonth);
  }, [selectedDate, currentMonth]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">
            {t.dateSelector?.dialogTitle || "Sélectionnez la date de votre événement"}
          </DialogTitle>
          <DialogDescription>
            {t.dateSelector?.dialogDescription || "Choisissez la date pour continuer"}
          </DialogDescription>
        </DialogHeader>

        {selectedDate && (
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center my-4">
            <p className="text-sm text-muted-foreground mb-1">
              {t.dateSelector?.selectedDate || "Date sélectionnée"}
            </p>
            <p className="text-lg font-semibold">
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
          onSelect={setSelectedDate}
          month={currentMonth}
          disabled={(day) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return day < today;
          }}
          className="rounded-md shadow-md"
          dayKey={(day) => day.getTime()}
        />

        <div className="flex gap-3 justify-end mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.dateSelector?.cancel || "Annuler"}
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedDate}>
            {t.dateSelector?.confirm || "Confirmer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
