
"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLocale } from "@/hooks/use-locale";
import { AnimatedImage } from "@/components/ui/animated-image";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { loadMediaOverridesByPath } from "@/lib/supabase";

const images = [
  "/Parc_1.jpg",
  "/Parc_2.jpg",
  "/Parc_3.jpg",
  "/Parc_5.jpg",
];

export default function ParcPage() {
  const { t } = useLocale();
  const poi = t.domain.poi.parc;
  const overridePath = (path: string) => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('imageOverridesByPath') : null;
      const map = raw ? JSON.parse(raw) as Record<string,string> : null;
      return map && map[path] ? map[path] : path;
    } catch {
      return path;
    }
  };
  const [, setRefresh] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await loadMediaOverridesByPath();
      setRefresh(x => x + 1);
    })();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="relative h-[50vh] overflow-hidden">
          <AnimatedImage
            src={overridePath(images[0])}
            alt={poi.title}
            fill
            overrideKey={images[0]}
            className="object-cover brightness-75"
            priority
          />
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <h1 className="text-4xl md:text-6xl font-headline font-bold text-white mb-4 drop-shadow-2xl">
                {poi.title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 uppercase drop-shadow-lg">
                {poi.subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="container max-w-5xl py-16">
            <Card className="shadow-lg -mt-32 relative z-10">
                <CardContent className="p-8 md:p-12">
                    <div className="prose dark:prose-invert max-w-none text-lg whitespace-pre-line">
                        <p>{poi.content}</p>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-16">
                <h2 className="text-3xl font-headline font-bold text-center mb-8">Galerie</h2>
                <div className="grid grid-cols-2 gap-4">
                    {images.map((img, i) => (
                        <div key={i} className="relative h-64 md:h-96 overflow-hidden rounded-lg group">
                            <AnimatedImage
                              src={overridePath(img)}
                              alt={`${poi.title} - ${i + 1}`}
                              fill
                              overrideKey={img}
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

    
