"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLocale } from "@/hooks/use-locale";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGallery } from "@/lib/gallery-maps";
import { CardImage } from "@/components/ui/animated-image";
import { EditableText } from "@/components/ui/editable-text";
import { EditableMedia } from "@/components/ui/editable-media";
import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { getLocalOverride } from "@/lib/supabase";
import { useState, useEffect } from "react";

export default function StayDetailPage() {
  const { t, locale } = useLocale();
  const params = useParams();
  const slug = (params?.slug as string) || "";

  if (!slug || !t || !t.stay || !t.stay.rooms) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const room = (t.stay.rooms as any)[slug] || null;
  const images = getGallery(slug) || [];
  const overridePath = (path: string) => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('imageOverridesByPath') : null;
      const map = raw ? JSON.parse(raw) as Record<string,string> : null;
      return map && map[path] ? map[path] : path;
    } catch {
      return path;
    }
  };

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const vidId = typeof window !== "undefined" ? (getLocalOverride(locale, `stay.rooms.${slug}.videoId`) || "") : "";
  const lightboxItems = [
    ...(vidId ? [{ type: "video" as const, id: vidId }] : []),
    ...images.map((originalSrc, i) => {
      const displaySrc = originalSrc || "/vacheresses_20.jpg";
      return { type: "image" as const, src: overridePath(displaySrc), alt: `${room?.name || slug} ${i + 1}` };
    }),
  ];

  const openLightboxAt = (idx: number) => {
    setCurrentIndex(idx);
    setIsLightboxOpen(true);
  };

  useEffect(() => {
    if (api && isLightboxOpen) {
      api.scrollTo(currentIndex, true);
    }
  }, [api, isLightboxOpen, currentIndex]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-headline font-bold mt-2">
              <EditableText path={`stay.rooms.${slug}.name`} value={room?.name || slug} />
            </h1>
            {room && (
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                <EditableText path={`stay.rooms.${slug}.description`} value={room.description} multiline />
              </p>
            )}
          </div>

          <div className="mb-8">
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black/5">
              <EditableMedia
                type="video"
                path={`stay.rooms.${slug}.videoId`}
                value=""
                className="w-full h-full"
                render={(vid) => (
                  vid
                    ? (
                      <div className="absolute inset-0">
                        <iframe
                          src={`https://www.youtube.com/embed/${vid}?autoplay=0&mute=0&controls=1&modestbranding=1`}
                          title="Vidéo de présentation"
                          className="absolute inset-0 w-full h-full"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                        <button
                          type="button"
                          className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full bg-black/50 text-white text-xs"
                          onClick={() => openLightboxAt(0)}
                        >
                          Agrandir
                        </button>
                      </div>
                    )
                    : (
                      <div className="absolute inset-0 bg-muted/50 flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                           <Maximize2 className="w-8 h-8 text-primary/40" />
                        </div>
                        <span className="text-muted-foreground font-medium">Vidéo de présentation</span>
                        <p className="text-xs text-muted-foreground px-8 text-center">Ajoutez un ID YouTube pour afficher la vidéo</p>
                      </div>
                    )
                )}
              />
            </div>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Galerie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((i) => {
                  const originalSrc = images[i];
                  const overrideKey = originalSrc || `stay_rooms_${slug}_gallery_${i}`;
                  const displaySrc = originalSrc || "/vacheresses_20.jpg";
                  const idxInLightbox = (vidId ? 1 : 0) + i;
                  return (
                    <button
                      key={i}
                      type="button"
                      className="relative aspect-video rounded-xl overflow-hidden shadow-md focus:outline-none"
                      onClick={() => openLightboxAt(idxInLightbox)}
                    >
                      <CardImage 
                        src={overridePath(displaySrc)} 
                        alt={`${room?.name || slug} ${i + 1}`} 
                        fill 
                        className="object-cover transition-transform hover:scale-105 duration-500" 
                        overrideKey={overrideKey}
                      />
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
            <DialogContent className="max-w-none w-full h-[95vh] p-0 bg-black/95 border-none">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 z-50 rounded-full bg-black/50 hover:bg-black"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X className="h-5 w-5 text-white" />
              </Button>
              <div className="relative w-full h-full">
                <Carousel
                  setApi={setApi}
                  className="w-full h-full"
                >
                  <CarouselContent className="h-full">
                    {lightboxItems.map((item, idx) => (
                      <CarouselItem key={idx} className="h-full">
                        {item.type === "image" ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <Image src={item.src} alt={item.alt} fill className="object-contain" />
                          </div>
                        ) : (
                          <div className="relative w-full h-full">
                            <iframe
                              src={`https://www.youtube.com/embed/${item.id}?autoplay=0&mute=0&controls=1&modestbranding=1`}
                              title="Vidéo"
                              className="absolute inset-0 w-full h-full"
                              frameBorder="0"
                              allow="autoplay; encrypted-media"
                              allowFullScreen
                            />
                          </div>
                        )}
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4 text-white border-white/20 bg-black/40 hover:bg-black/60" />
                  <CarouselNext className="right-4 text-white border-white/20 bg-black/40 hover:bg-black/60" />
                </Carousel>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
}
