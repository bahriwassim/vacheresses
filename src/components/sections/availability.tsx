
"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLocale } from "@/hooks/use-locale";
import { supabase } from "@/lib/supabase";

export function Availability() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [month, setMonth] = useState<Date>(new Date());
  const { t } = useLocale();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!supabase) return;
      const { data, error } = await supabase
        .from('bookings')
        .select('event_date, status')
        .in('status', ['confirmed', 'booked', 'paid']);

      if (data) {
        setBookedDates(data.map(b => new Date(b.event_date)));
      }
    };
    fetchBookings();
  }, []);

  // Générer les mois à afficher
  const nextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
  const thirdMonth = new Date(month.getFullYear(), month.getMonth() + 2, 1);

  return (
    <section id="availability" className="py-16 md:py-24 bg-secondary/50">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">{t.availability.title}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.availability.subtitle}
          </p>
          <div className="mt-4">
            <Button variant="outline" size="sm" onClick={() => setMonth(new Date())}>
                Revenir à aujourd'hui
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Card className="p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Premier mois */}
                <div className="animate-in fade-in slide-in-from-left-8 duration-700 delay-300">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                    month={month}
                    onMonthChange={setMonth}
                    disabled={(day) =>
                      day < new Date(new Date().setHours(0,0,0,0)) ||
                      bookedDates.some(bookedDate =>
                        day.getFullYear() === bookedDate.getFullYear() &&
                        day.getMonth() === bookedDate.getMonth() &&
                        day.getDate() === bookedDate.getDate()
                      )
                    }
                  />
                </div>

                {/* Deuxième mois */}
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                    month={nextMonth}
                    onMonthChange={(m) => setMonth(new Date(m.getFullYear(), m.getMonth() - 1, 1))}
                    disabled={(day) =>
                      day < new Date(new Date().setHours(0,0,0,0)) ||
                      bookedDates.some(bookedDate =>
                        day.getFullYear() === bookedDate.getFullYear() &&
                        day.getMonth() === bookedDate.getMonth() &&
                        day.getDate() === bookedDate.getDate()
                      )
                    }
                  />
                </div>

                {/* Troisième mois */}
                <div className="animate-in fade-in slide-in-from-right-8 duration-700 delay-500">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md"
                    month={thirdMonth}
                    onMonthChange={(m) => setMonth(new Date(m.getFullYear(), m.getMonth() - 2, 1))}
                    disabled={(day) =>
                      day < new Date(new Date().setHours(0,0,0,0)) ||
                      bookedDates.some(bookedDate =>
                        day.getFullYear() === bookedDate.getFullYear() &&
                        day.getMonth() === bookedDate.getMonth() &&
                        day.getDate() === bookedDate.getDate()
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="text-center mt-6 text-sm text-muted-foreground animate-in fade-in duration-1000 delay-600">
          {t.availability.unavailable}
        </p>
      </div>
    </section>
  );
}

    