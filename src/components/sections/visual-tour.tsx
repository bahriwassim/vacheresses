
"use client";

import { getGalleryImages } from "@/lib/vacheresses-images";
import { GalleryImage } from "@/components/ui/animated-image";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { X } from "lucide-react";

export function VisualTour() {
  const galleryImages = getGalleryImages().slice(0, 12); // Limite à 12 images pour la galerie
  const { t } = useLocale();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Empêcher toute navigation depuis le popup
  const handleDialogClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Bloquer tous les liens et boutons avec href
    if (target.tagName === 'A' || target.closest('a') || target.getAttribute('href')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  // Bloquer la navigation au niveau du document quand le popup est ouvert
  useEffect(() => {
    if (isDialogOpen) {
      const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' || target.closest('a')) {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      document.addEventListener('click', handleClick, true);
      return () => document.removeEventListener('click', handleClick, true);
    }
  }, [isDialogOpen]);

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
              <Card
                className="overflow-hidden h-full group border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
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

        {/* Dialog Popup avec contenu de la page domaine */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            className="max-w-6xl max-h-[90vh] p-0 [&_a]:pointer-events-none [&_a]:cursor-default"
            onClick={handleDialogClick}
          >
            <ScrollArea className="h-[90vh]">
              <div className="relative">
                {/* Bouton fermer */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">{t.visualTour.close}</span>
                </Button>

                {/* Hero Section */}
                <div className="relative h-[40vh] overflow-hidden">
                  <Image
                    src="/vacheresses_7.jpg"
                    alt="Manoir de Vacheresses"
                    fill
                    className="object-cover brightness-75"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
                  <div className="relative h-full flex items-center justify-center text-center px-4">
                    <div>
                      <h1 className="text-4xl md:text-6xl font-headline font-bold text-white mb-4 drop-shadow-2xl">
                        {t.domain.title}
                      </h1>
                      <p className="text-lg md:text-xl tracking-wider text-white/90 uppercase drop-shadow-lg">
                        {t.domain.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contenu principal */}
                <div className="px-6 md:px-12 pb-12">
                  {/* L'Esprit Section */}
                  <div className="mt-8 mb-12">
                    <Card className="shadow-xl border-primary/20 overflow-hidden">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-64 md:h-auto overflow-hidden group">
                          <Image
                            src="/esprit_vacheresses_1.jpg"
                            alt="L'esprit du Manoir"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-center">
                          <h2 className="font-headline text-2xl md:text-3xl text-primary mb-4">
                            {t.domain.spirit_title}
                          </h2>
                          <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-sm md:text-base">
                            {t.domain.spirit_content}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-0.5 bg-background/50">
                        {['/esprit_vacheresses_7.jpg', '/esprit_vacheresses_9.jpg', '/esprit_vacheresses_13.jpg'].map((img, i) => (
                          <div key={i} className="relative h-32 overflow-hidden group">
                            <Image
                              src={img}
                              alt={`Détail ${i + 1}`}
                              fill
                              className="object-cover transition-all duration-500 group-hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* L'Histoire Section */}
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-3">
                      {t.domain.history_title}
                    </h2>
                    <p className="text-sm tracking-wider text-muted-foreground uppercase text-center mb-8">
                      {t.domain.subtitle}
                    </p>
                  </div>

                  {/* Histoire Timeline */}
                  <div className="space-y-8">
                    {/* L'Âge d'or */}
                    <Card className="shadow-lg overflow-hidden">
                      <div className="grid md:grid-cols-5 gap-0">
                        <div className="md:col-span-2 relative h-48 md:h-auto overflow-hidden">
                          <Image
                            src="/vacheresses_14.jpg"
                            alt="L'âge d'or"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="md:col-span-3 p-6">
                          <h3 className="font-headline text-xl md:text-2xl text-primary mb-3">
                            {t.domain.age_or_title}
                          </h3>
                          <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">
                            {t.domain.age_or_content}
                          </p>
                        </div>
                      </div>
                    </Card>

                    {/* Renaissance */}
                    <Card className="shadow-lg overflow-hidden">
                      <div className="grid md:grid-cols-5 gap-0">
                        <div className="md:col-span-3 p-6 order-2 md:order-1">
                          <h3 className="font-headline text-xl md:text-2xl text-primary mb-3">
                            {t.domain.renaissance_title}
                          </h3>
                          <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">
                            {t.domain.renaissance_content}
                          </p>
                        </div>
                        <div className="md:col-span-2 relative h-48 md:h-auto overflow-hidden order-1 md:order-2">
                          <Image
                            src="/vacheresses_13.jpg"
                            alt="Renaissance"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </Card>

                    {/* Noailles */}
                    <Card className="shadow-lg overflow-hidden">
                      <div className="grid md:grid-cols-5 gap-0">
                        <div className="md:col-span-2 relative h-48 md:h-auto overflow-hidden">
                          <Image
                            src="/Parc_1.jpg"
                            alt="Dynastie de Noailles"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="md:col-span-3 p-6">
                          <h3 className="font-headline text-xl md:text-2xl text-primary mb-3">
                            {t.domain.noailles_title}
                          </h3>
                          <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">
                            {t.domain.noailles_content}
                          </p>
                        </div>
                      </div>
                    </Card>

                    {/* Temps Modernes */}
                    <Card className="shadow-lg overflow-hidden">
                      <div className="grid md:grid-cols-5 gap-0">
                        <div className="md:col-span-3 p-6 order-2 md:order-1">
                          <h3 className="font-headline text-xl md:text-2xl text-primary mb-3">
                            {t.domain.modern_title}
                          </h3>
                          <p className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">
                            {t.domain.modern_content}
                          </p>
                        </div>
                        <div className="md:col-span-2 relative h-48 md:h-auto overflow-hidden order-1 md:order-2">
                          <Image
                            src="/vacheresses_17.jpg"
                            alt="Temps modernes"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Galerie finale */}
                  <div className="mt-12 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['/Parc_2.jpg', '/Parc_3.jpg', '/Parc_5.jpg', '/preau_verger_1.jpg'].map((img, i) => (
                        <div key={i} className="relative h-32 md:h-48 overflow-hidden rounded-lg group">
                          <Image
                            src={img}
                            alt={`Galerie ${i + 1}`}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

    