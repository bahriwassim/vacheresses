
"use client";

import { getGalleryImages } from "@/lib/vacheresses-images";
import { GalleryImage } from "@/components/ui/animated-image";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";

export function VisualTour() {
  const galleryImages = getGalleryImages().slice(0, 12); // Limite à 12 images pour la galerie
  const { t } = useLocale();

  return (
    <section id="visual-tour" className="py-16 md:py-24">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {t.visualTour.title}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            {t.visualTour.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={image.id} 
              className={cn(
                index === 0 ? 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' : '',
                index === 1 ? 'col-span-2 md:col-span-1' : '',
                index === 2 ? 'col-span-2 md:col-span-1' : ''
              )}
            >
              <Card className="overflow-hidden h-full group border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <GalleryImage
                  src={image.imageUrl}
                  alt={image.description}
                  width={800}
                  height={600}
                  dataAiHint={image.imageHint}
                  index={index}
                  totalImages={galleryImages.length}
                  aspectRatio="landscape"
                  className="h-full"
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

    