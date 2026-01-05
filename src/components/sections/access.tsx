"use client";

import { useLocale } from "@/hooks/use-locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Train, Plane } from "lucide-react";
import { EditableText } from "@/components/ui/editable-text";

export function Access() {
  const { t, locale } = useLocale();

  const accessInfo = [
    {
      title: t.access.byCar,
      pathKey: 'byCar',
      icon: <Car className="h-8 w-8 text-primary" />,
      details: Array.isArray(t.access.distances?.byCar) ? t.access.distances!.byCar : [],
    },
    {
      title: t.access.byTrain,
      pathKey: 'byTrain',
      icon: <Train className="h-8 w-8 text-primary" />,
      details: Array.isArray(t.access.distances?.byTrain) ? t.access.distances!.byTrain : [],
    },
    {
      title: t.access.byAir,
      pathKey: 'byAir',
      icon: <Plane className="h-8 w-8 text-primary" />,
      details: Array.isArray(t.access.distances?.byAir) ? t.access.distances!.byAir : [],
    },
  ];

  return (
    <section id="access" className="py-12 md:py-20 bg-background">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            <EditableText path="access.title" value={t.access.title} />
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            <EditableText path="access.subtitle" value={t.access.subtitle} />
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {accessInfo.map((info) => (
            <Card key={info.pathKey} className="shadow-lg flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4">
                {info.icon}
                <CardTitle className="font-headline text-2xl">
                  <EditableText path={`access.${info.pathKey}`} value={info.title} />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-2 text-muted-foreground">
                  {info.details.map((detail, index) => (
                    <li key={index}>
                      <EditableText 
                        path={`access.distances.${info.pathKey}.${index}`} 
                        value={detail} 
                      />
                    </li>
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
