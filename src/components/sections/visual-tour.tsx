"use client";

import { getGalleryImages } from "@/lib/vacheresses-images";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/hooks/use-locale";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VisualTour() {
  const galleryImages = getGalleryImages().slice(0, 12);
  const { t } = useLocale();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImage = (index: number) => {
    setCurrentIndex(index);
    setIsDialogOpen(true);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section id="visual-tour" className="py-16 md:py-24">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            {t.visualTour.title}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.visualTour.subtitle}
          </p>
        </div>

        {/* GRID IMAGES */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className={cn(
                index === 0 ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2" : "",
                index === 1 ? "col-span-2 md:col-span-1" : "",
                index === 2 ? "col-span-2 md:col-span-1" : ""
              )}
            >
              <Card
                className="overflow-hidden h-full group border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => openImage(index)}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </Card>
            </div>
          ))}
        </div>

        {/* LIGHTBOX GALLERY */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            className="max-w-none w-full h-[95vh] p-0 bg-black/95 border-none"
          >
            {/* CLOSE BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-50 rounded-full bg-black/50 hover:bg-black"
              onClick={() => setIsDialogOpen(false)}
            >
              <X className="h-5 w-5 text-white" />
            </Button>

            {/* PREVIOUS BUTTON */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/40 hover:bg-black/60 z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* NEXT BUTTON */}
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/40 hover:bg-black/60 z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* IMAGE */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={galleryImages[currentIndex].imageUrl}
                alt={galleryImages[currentIndex].description}
                fill
                className="object-contain"
              />
            </div>

            {/* COUNTER */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm px-4 py-1 bg-black/40 rounded-full">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
