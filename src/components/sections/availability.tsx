
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

  return (
    <section id="availability" className="py-16 md:py-24 bg-secondary/50">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">{t.availability.title}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.availability.subtitle}
          </p>
        </div>
        <div className="flex justify-center">
          <Card className="p-4 shadow-lg">
            <CardContent className="p-0">
               <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                disabled={(day) => 
                  day < new Date(new Date().setDate(new Date().getDate() - 1)) || 
                  bookedDates.some(bookedDate => 
                    day.getFullYear() === bookedDate.getFullYear() &&
                    day.getMonth() === bookedDate.getMonth() &&
                    day.getDate() === bookedDate.getDate()
                  )
                }
              />
            </CardContent>
          </Card>
        </div>
        <p className="text-center mt-6 text-sm text-muted-foreground">
          {t.availability.unavailable}
        </p>
      </div>
    </section>
  );
}

    