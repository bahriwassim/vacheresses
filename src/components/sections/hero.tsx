
"use client";

import { getHeroImages } from "@/lib/vacheresses-images";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLocale } from "@/hooks/use-locale";
import { EditableText } from "@/components/ui/editable-text";

export function Hero() {
  const heroImage = getHeroImages()[0];
  const { t } = useLocale();

  return (
    <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover w-full h-full animate-kenburns"
          data-ai-hint={heroImage.imageHint}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      <div className="absolute inset-0 z-10 flex items-center justify-center h-full text-center px-4 text-white">
        <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold drop-shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <EditableText path="hero.title" value={t.hero.title} />
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/90 drop-shadow animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <EditableText path="hero.subtitle" value={t.hero.subtitle} />
            </p>
            <div className="mt-8 flex justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Button size="lg" asChild>
                <Link href="/#packages"><EditableText path="hero.buttonExplore" value={t.hero.buttonExplore} /></Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
                <Link href="/configurator"><EditableText path="hero.buttonPlan" value={t.hero.buttonPlan} /></Link>
            </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
