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
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    (async () => {
      await loadMediaOverridesByPath();
      setRefresh(x => x + 1);
    })();
  }, []);

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
              {poi?.title || slug}
            </h1>
            {poi && (
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto whitespace-pre-line">
                {poi.content}
              </p>
            )}
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="font-headline">Galerie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                    <CardImage src={overridePath(src)} alt={`${poi?.title || slug} ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
