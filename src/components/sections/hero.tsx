
"use client";

import { VacheressesImages, getHeroImages } from "@/lib/vacheresses-images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLocale } from "@/hooks/use-locale";

export function Hero() {
  const heroImages = getHeroImages();
  const heroImage = heroImages[0]; // Utilise la première image hero
  const { t } = useLocale();

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold drop-shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {t.hero.title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90 drop-shadow animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          {t.hero.subtitle}
        </p>
        <div className="mt-8 flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <Button size="lg" asChild>
            <Link href="/#packages">{t.hero.buttonExplore}</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/configurator">{t.hero.buttonPlan}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

    