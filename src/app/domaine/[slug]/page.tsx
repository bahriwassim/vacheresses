"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLocale } from "@/hooks/use-locale";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGallery } from "@/lib/gallery-maps";
import { CardImage } from "@/components/ui/animated-image";
import { useEffect, useState } from "react";
import { loadMediaOverridesByPath } from "@/lib/supabase";
import { EditableText } from "@/components/ui/editable-text";
import { EditableMedia } from "@/components/ui/editable-media";

export default function DomainSpacePage() {
  const { t } = useLocale();
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const poi = t.domain.poi[slug as keyof typeof t.domain.poi] as any;
  const images = getGallery(slug);
  const overridePath = (path: string) => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('imageOverridesByPath') : null;
      const map = raw ? JSON.parse(raw) as Record<string,string> : null;
      return map && map[path] ? map[path] : path;
    } catch {
      return path;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-sm md:text-base tracking-wider text-primary uppercase font-semibold">
              Le Domaine
            </p>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">
              <EditableText path={`domain.poi.${slug}.title`} value={poi?.title || slug} />
            </h1>
            {poi && (
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto whitespace-pre-line">
                <EditableText path={`domain.poi.${slug}.content`} value={poi.content} multiline />
              </p>
            )}
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="font-headline">Galerie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.slice(0, 4).map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                    <CardImage src={overridePath(src)} alt={`${poi?.title || slug} ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <EditableMedia
                    type="video"
                    path={`domain.poi.${slug}.videoId`}
                    value=""
                    className="w-full h-full"
                    render={(videoId) => (
                      videoId
                        ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0&controls=1&modestbranding=1`}
                            title="Mini vidéo de l'espace"
                            className="absolute inset-0 w-full h-full"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        )
                        : (
                          <div className="absolute inset-0 bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground">Mini vidéo</span>
                          </div>
                        )
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
