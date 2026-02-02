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
import { Maximize2 } from "lucide-react";

export default function DomainSpacePage() {
  const { t } = useLocale();
  const params = useParams();
  const slug = (params?.slug as string) || "";

  if (!slug || !t || !t.domain || !t.domain.poi) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const poi = (t.domain.poi as any)[slug] || null;
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
              <CardTitle className="font-headline text-2xl">Galerie & Vidéo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid grid-cols-1 gap-4">
                  {[0, 1, 2].map((i) => {
                    const originalSrc = images[i];
                    // Si l'image n'existe pas, on crée une clé unique pour permettre l'upload
                    const overrideKey = originalSrc || `domain_poi_${slug}_gallery_${i}`;
                    const displaySrc = originalSrc || "/vacheresses_20.jpg";

                    return (
                      <div key={i} className="relative aspect-video rounded-xl overflow-hidden shadow-md">
                        <CardImage 
                          src={overridePath(displaySrc)} 
                          alt={`${poi?.title || slug} ${i + 1}`} 
                          fill 
                          className="object-cover transition-transform hover:scale-105 duration-500" 
                          overrideKey={overrideKey}
                        />
                        {!originalSrc && (
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-black/40 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20">
                              Emplacement Image {i + 1}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="relative aspect-video md:aspect-auto h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg bg-black/5">
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
                            title="Vidéo de présentation"
                            className="absolute inset-0 w-full h-full"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
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
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
