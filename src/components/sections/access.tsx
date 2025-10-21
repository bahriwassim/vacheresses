
"use client";

import { useLocale } from "@/hooks/use-locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Train, Plane } from "lucide-react";

export function Access() {
  const { t } = useLocale();

  const accessInfo = [
    {
      title: t.access.byCar,
      icon: <Car className="h-8 w-8 text-primary" />,
      details: [
        "75 km de Paris",
        "45 Km de Versailles",
        "30 km de Chartres",
        "22 km de Rambouillet",
        "6 Km de Maintenon",
      ],
    },
    {
      title: t.access.byTrain,
      icon: <Train className="h-8 w-8 text-primary" />,
      details: ["Gare de Maintenon (55 mn de la Gare Montparnasse)"],
    },
    {
      title: t.access.byAir,
      icon: <Plane className="h-8 w-8 text-primary" />,
      details: ["Paris Orly : 86 Km", "Paris Roissy Charles de Gaulle : 116 Km"],
    },
  ];

  return (
    <section id="access" className="py-16 md:py-24 bg-background">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">{t.access.title}</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.access.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accessInfo.map((info) => (
            <Card key={info.title} className="shadow-lg flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                {info.icon}
                <CardTitle className="font-headline text-2xl">{info.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-muted-foreground">
                  {info.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
