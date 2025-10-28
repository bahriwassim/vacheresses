
"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useLocale } from "@/hooks/use-locale";

export function Availability() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { t } = useLocale();

  // Mocking some booked dates
  const bookedDates = [
    new Date(2024, 6, 20),
    new Date(2024, 6, 21),
    new Date(2024, 7, 10),
  ];

  // Générer 3 mois à partir du mois actuel
  const currentMonth = new Date();
  const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  const thirdMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 1);

  return (
    <section id="availability" className="py-16 md:py-24 bg-secondary/50">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">{t.availability.title}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.availability.subtitle}
          </p>
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
                    month={currentMonth}
                    disabled={(day) =>
                      day < new Date(new Date().setDate(new Date().getDate() - 1)) ||
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
                    disabled={(day) =>
                      day < new Date(new Date().setDate(new Date().getDate() - 1)) ||
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
                    disabled={(day) =>
                      day < new Date(new Date().setDate(new Date().getDate() - 1)) ||
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

    