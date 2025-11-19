'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from '@/components/ui/dialog';
import { useLocale } from '@/hooks/use-locale';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDateSelected: (date: Date) => void;
}

function monthStart(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function DatePickerDialog({ open, onOpenChange, onDateSelected }: DatePickerDialogProps) {
  const { t, locale } = useLocale();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const todayStart = useMemo(() => monthStart(new Date()), []);
  const [currentMonth, setCurrentMonth] = useState(todayStart);

  useEffect(() => {
    if (open) {
      setCurrentMonth(selectedDate ? monthStart(selectedDate) : todayStart);
    }
  }, [open, selectedDate, todayStart]);

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onDateSelected(date);
      onOpenChange(false);
    }
  };

  const prevMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const isPrevDisabled = currentMonth.getTime() <= todayStart.getTime();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="max-w-4xl max-h-[80vh] p-6 bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline text-center">
              {t.dateSelector?.dialogTitle || 'Sélectionnez la date de votre événement'}
            </DialogTitle>
            <DialogDescription className="text-center">
              {t.dateSelector?.dialogDescription || 'Choisissez la date pour continuer'}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={prevMonth}
              className="p-2 text-white"
              disabled={isPrevDisabled}
              aria-label="Mois précédent"
            >
              <ChevronLeft />
            </Button>
            <span className="text-xl font-bold">
              {format(currentMonth, 'MMMM yyyy', { locale: locale === 'fr' ? fr : undefined })}
            </span>
            <Button variant="ghost" onClick={nextMonth} className="p-2 text-white" aria-label="Mois suivant">
              <ChevronRight />
            </Button>
          </div>

          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            month={currentMonth}
            disabled={(day) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return day < today;
            }}
            className="rounded-md shadow-md bg-gray-800 text-white"
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
