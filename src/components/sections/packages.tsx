
"use client";

import { getImageById } from "@/lib/vacheresses-images";
import { CardImage } from "@/components/ui/animated-image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { useBooking } from "@/contexts/booking-context";
import { DatePickerDialog } from "./date-picker-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EditableText } from "@/components/ui/editable-text";

const packagesData = (t: any) => [
  {
    id: "classic",
    title: t.packages.classic_title,
    description: t.packages.classic_desc,
    imageId: "package-classic",
    features: t.packages.classic_features,
  },
  {
    id: "premium",
    title: t.packages.premium_title,
    description: t.packages.premium_desc,
    imageId: "package-premium",
    features: t.packages.premium_features,
    highlighted: true,
  },
  {
    id: "luxury",
    title: t.packages.luxury_title,
    description: t.packages.luxury_desc,
    imageId: "package-luxury",
    features: t.packages.luxury_features,
  },
];

export function Packages() {
  const { t } = useLocale();
  const { dates, setDates } = useBooking();
  const router = useRouter();
  const packages = packagesData(t);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  const buildPackageUrl = (packageId: string) => {
    const params = new URLSearchParams({ package: packageId });
    if (dates?.from) {
      params.set('eventDate', dates.from.toISOString());
    }
    return `/configurator?${params.toString()}`;
  };

  const handlePackageClick = (packageId: string) => {
    if (!dates) {
      // Si pas de date sélectionnée, ouvrir la popup
      setSelectedPackageId(packageId);
      setIsDialogOpen(true);
    } else {
      // Si date déjà sélectionnée, aller directement au configurateur
      router.push(buildPackageUrl(packageId));
    }
  };

  const handleDateSelected = (date: Date) => {
    setDates({ from: date, to: date });
    if (selectedPackageId) {
      const params = new URLSearchParams({ package: selectedPackageId });
      params.set('eventDate', date.toISOString());
      router.push(`/configurator?${params.toString()}`);
    }
  };

  return (
    <section id="packages" className="py-8 md:py-12 bg-secondary/50">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <EditableText path="packages.title" value={t.packages.title} />
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <EditableText path="packages.subtitle" value={t.packages.subtitle} />
          </p>
        </div>

     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => {
            const image = getImageById(pkg.imageId);
            return (
              <Card
                key={pkg.id}
                className={`flex flex-col transition-all duration-500 hover-lift hover-glow animate-in fade-in slide-in-from-bottom-8 ${
                  pkg.highlighted ? 'border-primary shadow-lg scale-105 ring-2 ring-primary/20' : 'hover:shadow-lg hover:border-primary/50'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  {image && (
                    <CardImage
                      src={image.imageUrl}
                      alt={image.description}
                      width={600}
                      height={400}
                      dataAiHint={image.imageHint}
                      aspectRatio="landscape"
                      overlay={true}
                      overlayContent={
                        <div className="text-center text-white">
                          <p className="text-sm font-medium">
                            <EditableText path="packages.discover" value={t.packages.discover} />
                          </p>
                        </div>
                      }
                      className="mb-4"
                    />
                  )}
                  <CardTitle className="font-headline">
                    <EditableText path={`packages.${pkg.id}_title`} value={pkg.title} />
                  </CardTitle>
                  <CardDescription>
                    <EditableText path={`packages.${pkg.id}_desc`} value={pkg.description} />
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {pkg.features.map((feature: string, i: number) => (
                      <li key={`${pkg.id}-${i}`} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handlePackageClick(pkg.id)}
                    className="w-full"
                    variant={pkg.highlighted ? 'default' : 'outline'}
                  >
                    {dates ? (
                      <EditableText path="packages.button" value={t.packages.button} />
                    ) : (
                      <EditableText path="packages.selectAndContinue" value={t.packages.selectAndContinue || t.packages.button} />
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Popup de sélection de date */}
      <DatePickerDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onDateSelected={handleDateSelected}
      />
    </section>
  );
}
