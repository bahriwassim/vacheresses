
"use client";

import { useLocale } from "@/hooks/use-locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Train, Plane } from "lucide-react";

export function Access() {
  const { t, locale } = useLocale();

  const accessInfoEn = [
    {
      title: t.access.byCar,
      icon: <Car className="h-8 w-8 text-primary" />,
      details: [
        "47 miles from Paris (~1h 15min)",
        "28 miles from Versailles (~45 min)",
        "19 miles from Chartres (~30 min)",
        "14 miles from Rambouillet (~25 min)",
        "4 miles from Maintenon (~10 min)",
      ],
    },
    {
      title: t.access.byTrain,
      icon: <Train className="h-8 w-8 text-primary" />,
      details: ["Maintenon station (55 min from Gare Montparnasse)"],
    },
    {
      title: t.access.byAir,
      icon: <Plane className="h-8 w-8 text-primary" />,
      details: ["Paris Orly: 53 miles", "Paris Roissy Charles de Gaulle: 72 miles"],
    },
  ];
  
  const accessInfoFr = [
    {
      title: t.access.byCar,
      icon: <Car className="h-8 w-8 text-primary" />,
      details: [
        "75 km de Paris (~1h 15min)",
        "45 km de Versailles (~45 min)",
        "30 km de Chartres (~30 min)",
        "22 km de Rambouillet (~25 min)",
        "6 km de Maintenon (~10 min)",
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
      details: ["Paris Orly : 86 km", "Paris Roissy Charles de Gaulle : 116 km"],
    },
  ];

  const accessInfo = locale === 'fr' ? accessInfoFr : accessInfoEn;


  return (
    <section id="access" className="py-12 md:py-20 bg-background">
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
