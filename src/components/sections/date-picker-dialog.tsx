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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const todayStart = useMemo(() => monthStart(new Date()), []);
  const [currentMonth, setCurrentMonth] = useState(todayStart);

  useEffect(() => {
    if (open) {
      setCurrentMonth(selectedDate ? monthStart(selectedDate) : todayStart);
    }
  }, [open, selectedDate, todayStart]);

  const handleDateSelect = (date: Date | undefined) => {
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
        <DialogContent className="sm:max-w-md p-6 bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl font-headline text-center text-card-foreground">
              {t.dateSelector?.dialogTitle || 'Sélectionnez la date de votre événement'}
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              {t.dateSelector?.dialogDescription || 'Choisissez la date pour continuer'}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              disabled={(day) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return day < today;
              }}
              className="p-0"
              classNames={{
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
              }}
            />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
