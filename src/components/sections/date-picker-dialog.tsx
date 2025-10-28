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

interface DatePickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDateSelected: (date: Date) => void;
}

export function DatePickerDialog({ open, onOpenChange, onDateSelected }: DatePickerDialogProps) {
  const { t, locale } = useLocale();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // Générer 3 mois à partir du mois actuel
  const currentMonth = new Date();
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  const thirdMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 1);

  const handleConfirm = () => {
    if (selectedDate) {
      onDateSelected(selectedDate);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline">
            {t.dateSelector?.dialogTitle || "Sélectionnez la date de votre événement"}
          </DialogTitle>
          <DialogDescription>
            {t.dateSelector?.dialogDescription || "Choisissez la date de votre mariage ou événement pour continuer"}
          </DialogDescription>
        </DialogHeader>

        {/* Affichage de la date sélectionnée */}
        {selectedDate && (
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 text-center">
            <p className="text-sm text-muted-foreground mb-1">
              {t.dateSelector?.selectedDate || "Date sélectionnée"}
            </p>
            <p className="text-lg font-semibold">
              {format(selectedDate, "EEEE d MMMM yyyy", { locale: locale === 'fr' ? fr : undefined })}
            </p>
          </div>
        )}

        {/* 3 Calendriers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md"
            month={currentMonth}
            disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
          />
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md"
            month={nextMonth}
            disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
          />
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md"
            month={thirdMonth}
            disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </div>

        {/* Boutons */}
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
