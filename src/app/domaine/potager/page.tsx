
"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLocale } from "@/hooks/use-locale";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const images = [
  "/potager_3.jpg",
  "/potager_4.jpg",
  "/esprit_vacheresses_9.jpg",
  "/esprit_vacheresses_10.jpg",
];

export default function PotagerPage() {
  const { t } = useLocale();
  const poi = t.domain.poi.potager;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="relative h-[50vh] overflow-hidden">
          <Image
            src={images[0]}
            alt={poi.title}
            fill
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
                            <Image
                            src={img}
                            alt={`${poi.title} - ${i + 1}`}
                            fill
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

    