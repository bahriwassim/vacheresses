"use client";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDateSelected: (date: Date) => void;
}

export function DatePickerDialog({ open, onOpenChange, onDateSelected }: DatePickerDialogProps) {
  const { t, locale } = useLocale();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();

  const handleConfirm = () => {
    if (selectedDate) {
      onDateSelected(selectedDate);
      onOpenChange(false);
    }
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

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

        {/* Navigation mois */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={prevMonth} className="p-2">
            <ChevronLeft />
          </Button>
          <span className="text-lg font-medium">
            {format(currentMonth, "MMMM yyyy", { locale: locale === "fr" ? fr : undefined })}
          </span>
          <Button variant="ghost" onClick={nextMonth} className="p-2">
            <ChevronRight />
          </Button>
        </div>

        {/* Calendrier du mois courant */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={currentMonth}
          disabled={(day) => day < today}
          className="rounded-md shadow-md"
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
