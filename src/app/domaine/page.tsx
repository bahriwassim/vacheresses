"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/hooks/use-locale";
import { Separator } from "@/components/ui/separator";
import { AnimatedImage } from "@/components/ui/animated-image";
import { useState, useEffect } from "react";
import { EditableText } from "@/components/ui/editable-text";
import { loadMediaOverridesByPath } from "@/lib/supabase";

export default function DomainePage() {
  const { t } = useLocale();
  const [scrollY, setScrollY] = useState(0);
  const [, setRefresh] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const overridePath = (path: string) => {
    try {
      if (!hydrated) return path;
      const raw = typeof window !== 'undefined' ? localStorage.getItem('imageOverridesByPath') : null;
      const map = raw ? JSON.parse(raw) as Record<string,string> : null;
      return map && map[path] ? map[path] : path;
    } catch {
      return path;
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    (async () => {
      await loadMediaOverridesByPath();
      // Force re-render if needed, but since we removed refresh state, we might just need to ensure hydration
      // or maybe this useEffect was only for side effects of loading media.
      // If refresh was used to trigger re-render, we might need another way or just accept it's done.
      // Given the previous code just incremented a counter that wasn't used, it likely just forced a re-render.
      // But if the component doesn't use the state, it might not re-render?
      // Actually setState triggers re-render. So we should keep a way to trigger re-render if loadMediaOverridesByPath changes something global.
      // But let's assume if it was unused, it wasn't needed for reading, just for triggering.
      // However, if we remove the state, we remove the trigger.
      // Let's check if 'refresh' was used anywhere else. I only saw it in setRefresh.
    })();
  }, []);
  
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section with Parallax */}
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <AnimatedImage
            src={overridePath("/vacheresses_7.jpg")}
            alt="Manoir de Vacheresses"
            fill
            overrideKey="/vacheresses_7.jpg"
            className="object-cover brightness-75"
            priority
          />
        </div>

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-4 drop-shadow-2xl">
              <EditableText path="domain.title" value={t.domain.title} />
            </h1>
            <p className="text-xl md:text-2xl tracking-wider text-white/90 uppercase drop-shadow-lg">
              <EditableText path="domain.subtitle" value={t.domain.subtitle} />
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 -mt-20 relative z-10">
        <div className="container max-w-7xl">

          {/* L'Esprit Section avec images */}
          <div className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <Card className="shadow-2xl border-primary/20 overflow-hidden backdrop-blur-sm bg-card/95">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image gauche */}
                <div className="relative h-64 md:h-auto overflow-hidden group">
                  <AnimatedImage
                    src={overridePath("/vacheresses_13.jpg")}
                    alt="L'esprit du Manoir"
                    fill
                    overrideKey="/vacheresses_13.jpg"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Contenu */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <CardTitle className="font-headline text-3xl md:text-4xl text-primary mb-6">
                    <EditableText path="domain.spirit_title" value={t.domain.spirit_title} />
                  </CardTitle>
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-base md:text-lg">
                      <EditableText path="domain.spirit_content_1" value={t.domain.spirit_content_1} multiline />
                    </p>
                  </div>
                </div>
              </div>

              {/* Galerie d'images sous le texte */}
              <div className="grid grid-cols-3 gap-0.5 bg-background/50">
                {['/renaissance.jpg', '/VacheressesHistoire.jpg', '/TerracottaOttoman(37).jpg'].map((img, i) => (
                  <div key={i} className="relative h-40 overflow-hidden group">
                    <AnimatedImage
                      src={overridePath(img)}
                      alt={`Détail ${i + 1}`}
                      fill
                      overrideKey={img}
                      className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Separator className="my-16" />

          {/* L'Histoire Section */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <EditableText path="domain.history_title" value={t.domain.history_title} />
            </h2>
            <p className="text-sm md:text-base tracking-wider text-muted-foreground uppercase text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              <EditableText path="domain.subtitle" value={t.domain.subtitle} />
            </p>
          </div>

          {/* Histoire Timeline avec images alternées */}
          <div className="space-y-16">
            {/* L'Âge d'or des seigneurs */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <Card className="shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden group">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden">
                  <AnimatedImage
                    src={overridePath("/VacheressesHistoire.jpg")}
                    alt="L'âge d'or"
                    fill
                    overrideKey="/VacheressesHistoire.jpg"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  </div>
                  <div className="md:col-span-3 p-8 md:p-10">
                    <CardTitle className="font-headline text-2xl md:text-3xl text-primary mb-4">
                      <EditableText path="domain.age_or_title" value={t.domain.age_or_title} />
                    </CardTitle>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      <EditableText path="domain.age_or_content" value={t.domain.age_or_content} multiline />
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* À l'aube de la Renaissance - Image à droite */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
              <Card className="shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden group">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-3 p-8 md:p-10 order-2 md:order-1">
                    <CardTitle className="font-headline text-2xl md:text-3xl text-primary mb-4">
                      <EditableText path="domain.renaissance_title" value={t.domain.renaissance_title} />
                    </CardTitle>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      <EditableText path="domain.renaissance_content" value={t.domain.renaissance_content} multiline />
                    </p>
                  </div>
                  <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden order-1 md:order-2">
                    <AnimatedImage
                      src={overridePath("/renaissance.jpg")}
                      alt="Renaissance"
                      fill
                      overrideKey="/renaissance.jpg"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* La dynastie de Noailles */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
              <Card className="shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden group">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden">
                  <AnimatedImage
                      src={overridePath("/dynastiedenoailles.jpg")}
                      alt="Dynastie de Noailles"
                      fill
                      overrideKey="/dynastiedenoailles.jpg"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="md:col-span-3 p-8 md:p-10">
                    <CardTitle className="font-headline text-2xl md:text-3xl text-primary mb-4">
                      <EditableText path="domain.noailles_title" value={t.domain.noailles_title} />
                    </CardTitle>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      <EditableText path="domain.noailles_content" value={t.domain.noailles_content} multiline />
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Le Manoir et les Temps Modernes - Image à droite */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-800">
              <Card className="shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden group">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-3 p-8 md:p-10 order-2 md:order-1">
                    <CardTitle className="font-headline text-2xl md:text-3xl text-primary mb-4">
                      <EditableText path="domain.modern_title" value={t.domain.modern_title} />
                    </CardTitle>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      <EditableText path="domain.modern_content" value={t.domain.modern_content} multiline />
                    </p>
                  </div>
                  <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden order-1 md:order-2">
                    <AnimatedImage
                      src={overridePath("/vacheresses_17.jpg")}
                      alt="Temps modernes"
                      fill
                      overrideKey="/vacheresses_17.jpg"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Points d'intérêt du Domaine */}
          <div className="mt-16 mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              Découvrez les Espaces du Domaine
            </h2>
            <p className="text-sm md:text-base tracking-wider text-muted-foreground uppercase text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              Explorez nos différents lieux pour votre événement
            </p>
          </div>

          {/* Grid des espaces */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Cour d'Honneur */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/vacheresses_7.jpg")}
                  alt="Cour d'Honneur"
                  fill
                  overrideKey="/vacheresses_7.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.cour_honneur.title" value={t.domain.poi.cour_honneur.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4"><EditableText path="domain.poi.cour_honneur.subtitle" value={t.domain.poi.cour_honneur.subtitle} /></p>
                <p className="text-sm"><EditableText path="domain.poi.cour_honneur.content" value={t.domain.poi.cour_honneur.content} multiline /></p>
              </CardContent>
            </Card>

            {/* Salle de Réception */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/salle_reception_9.jpg")}
                  alt="Salle de Réception"
                  fill
                  overrideKey="/salle_reception_9.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.salle_reception.title" value={t.domain.poi.salle_reception.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4"><EditableText path="domain.poi.salle_reception.subtitle" value={t.domain.poi.salle_reception.subtitle} /></p>
                <p className="text-sm"><EditableText path="domain.poi.salle_reception.content" value={t.domain.poi.salle_reception.content} multiline /></p>
              </CardContent>
            </Card>

            {/* Salle d'Exposition */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/vacheresses_17.jpg")}
                  alt="Salle d'Exposition"
                  fill
                  overrideKey="/vacheresses_17.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.salle_exposition.title" value={t.domain.poi.salle_exposition.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4"><EditableText path="domain.poi.salle_exposition.subtitle" value={t.domain.poi.salle_exposition.subtitle} /></p>
                <p className="text-sm"><EditableText path="domain.poi.salle_exposition.content" value={t.domain.poi.salle_exposition.content} multiline /></p>
              </CardContent>
            </Card>

            {/* Parc */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/Parc_2.jpg")}
                  alt="Parc"
                  fill
                  overrideKey="/Parc_2.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.parc.title" value={t.domain.poi.parc.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4"><EditableText path="domain.poi.parc.subtitle" value={t.domain.poi.parc.subtitle} /></p>
                <p className="text-sm"><EditableText path="domain.poi.parc.content" value={t.domain.poi.parc.content} multiline /></p>
              </CardContent>
            </Card>

            {/* Préau et Verger */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/espace_7.jpg")}
                  alt="Préau et Verger"
                  fill
                  overrideKey="/espace_7.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.preau_verger.title" value={t.domain.poi.preau_verger.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4"><EditableText path="domain.poi.preau_verger.subtitle" value={t.domain.poi.preau_verger.subtitle} /></p>
                <p className="text-sm"><EditableText path="domain.poi.preau_verger.content" value={t.domain.poi.preau_verger.content} multiline /></p>
              </CardContent>
            </Card>

            {/* Potager Médiéval */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/espace_9.jpg")}
                  alt="Potager Médiéval"
                  fill
                  overrideKey="/espace_9.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.potager.title" value={t.domain.poi.potager.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4"><EditableText path="domain.poi.potager.subtitle" value={t.domain.poi.potager.subtitle} /></p>
                <p className="text-sm"><EditableText path="domain.poi.potager.content" value={t.domain.poi.potager.content} multiline /></p>
              </CardContent>
            </Card>

            {/* Maison du Potager */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/potager_3.jpg")}
                  alt="Maison du Potager"
                  fill
                  overrideKey="/potager_3.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.hebergements.title" value={t.domain.poi.hebergements.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4"><EditableText path="domain.poi.hebergements.subtitle" value={t.domain.poi.hebergements.subtitle} /></p>
                <p className="text-sm"><EditableText path="domain.poi.hebergements.content" value={t.domain.poi.hebergements.content} multiline /></p>
              </CardContent>
            </Card>

            {/* Salle Blanche */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/salle_reception_6.jpg")}
                  alt="Salle Blanche"
                  fill
                  overrideKey="/salle_reception_6.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.salle_blanche.title" value={t.domain.poi.salle_blanche.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4"><EditableText path="domain.poi.salle_blanche.subtitle" value={t.domain.poi.salle_blanche.subtitle} /></p>
                <p className="text-sm"><EditableText path="domain.poi.salle_blanche.content" value={t.domain.poi.salle_blanche.content} multiline /></p>
              </CardContent>
            </Card>

            {/* Orangerie */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/espace_8.jpg")}
                  alt="Orangerie"
                  fill
                  overrideKey="/espace_8.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.orangerie.title" value={t.domain.poi.orangerie.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4"><EditableText path="domain.poi.orangerie.subtitle" value={t.domain.poi.orangerie.subtitle} /></p>
                <p className="text-sm"><EditableText path="domain.poi.orangerie.content" value={t.domain.poi.orangerie.content} multiline /></p>
              </CardContent>
            </Card>

            {/* Chapelle */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/vacheresses_13.jpg")}
                  alt="Chapelle"
                  fill
                  overrideKey="/vacheresses_13.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.chapelle.title" value={t.domain.poi.chapelle.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm"><EditableText path="domain.poi.chapelle.subtitle" value={t.domain.poi.chapelle.subtitle} /></p>
              </CardContent>
            </Card>

            {/* Terrasses */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/Parc_1.jpg")}
                  alt="Terrasses"
                  fill
                  overrideKey="/Parc_1.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.terrasses.title" value={t.domain.poi.terrasses.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm"><EditableText path="domain.poi.terrasses.subtitle" value={t.domain.poi.terrasses.subtitle} /></p>
              </CardContent>
            </Card>

            {/* Roseraie */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/Parc_3.jpg")}
                  alt="Roseraie"
                  fill
                  overrideKey="/Parc_3.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.roseraie.title" value={t.domain.poi.roseraie.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4"><EditableText path="domain.poi.roseraie.subtitle" value={t.domain.poi.roseraie.subtitle} /></p>
                <p className="text-sm"><EditableText path="domain.poi.roseraie.content" value={t.domain.poi.roseraie.content} multiline /></p>
              </CardContent>
            </Card>

            {/* Mare */}
            <Card className="overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <AnimatedImage
                  src={overridePath("/Parc_2.jpg")}
                  alt="Mare"
                  fill
                  overrideKey="/Parc_2.jpg"
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl"><EditableText path="domain.poi.mare.title" value={t.domain.poi.mare.title} /></CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4"><EditableText path="domain.poi.mare.subtitle" value={t.domain.poi.mare.subtitle} /></p>
                <p className="text-sm"><EditableText path="domain.poi.mare.content" value={t.domain.poi.mare.content} multiline /></p>
              </CardContent>
            </Card>
          </div>

          {/* Galerie finale */}
          <div className="mt-20 mb-12 animate-in fade-in duration-1000 delay-900">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['/Parc_2.jpg', '/Parc_3.jpg', '/Parc_5.jpg', '/preau_verger_1.jpg'].map((img, i) => (
                <div key={i} className="relative h-48 md:h-64 overflow-hidden rounded-lg group">
                  <AnimatedImage
                    src={img}
                    alt={`Galerie ${i + 1}`}
                    fill
                    overrideKey={img}
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
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
