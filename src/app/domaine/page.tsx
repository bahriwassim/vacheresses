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
  const [refresh, setRefresh] = useState(0);
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
      setRefresh(x => x + 1);
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
                      <EditableText path="domain.spirit_content" value={t.domain.spirit_content} multiline />
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
          <div className="mb-12">
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
                <CardTitle className="font-headline text-xl">{t.domain.poi.cour_honneur.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{t.domain.poi.cour_honneur.subtitle}</p>
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
                <CardTitle className="font-headline text-xl">{t.domain.poi.salle_reception.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{t.domain.poi.salle_reception.subtitle}</p>
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
                <CardTitle className="font-headline text-xl">{t.domain.poi.parc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{t.domain.poi.parc.subtitle}</p>
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
                <CardTitle className="font-headline text-xl">{t.domain.poi.preau_verger.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{t.domain.poi.preau_verger.subtitle}</p>
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
                <CardTitle className="font-headline text-xl">{t.domain.poi.potager.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{t.domain.poi.potager.subtitle}</p>
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
                <CardTitle className="font-headline text-xl">Hébergements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Charmantes chambres dans la Maison du Potager</p>
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
                <CardTitle className="font-headline text-xl">Salle Blanche</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Espace élégant pour les cérémonies</p>
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
                <CardTitle className="font-headline text-xl">Orangerie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Lieu historique pour les cocktails</p>
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
                <CardTitle className="font-headline text-xl">Chapelle</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Lieu spirituel pour les mariages religieux</p>
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
                <CardTitle className="font-headline text-xl">Terrasses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Espaces extérieurs avec vue panoramique</p>
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
                <CardTitle className="font-headline text-xl">Roseraie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Jardin romantique pour les photos</p>
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
