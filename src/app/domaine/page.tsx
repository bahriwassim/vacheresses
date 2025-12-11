"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/hooks/use-locale";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function DomainePage() {
  const { t } = useLocale();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          <Image
            src="/vacheresses_7.jpg"
            alt="Manoir de Vacheresses"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-4 drop-shadow-2xl">
              {t.domain.title}
            </h1>
            <p className="text-xl md:text-2xl tracking-wider text-white/90 uppercase drop-shadow-lg">
              {t.domain.subtitle}
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
                  <Image
                    src="/vacheresses_13.jpg"
                    alt="L'esprit du Manoir"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Contenu */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <CardTitle className="font-headline text-3xl md:text-4xl text-primary mb-6">
                    {t.domain.spirit_title}
                  </CardTitle>
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-base md:text-lg">
                      {t.domain.spirit_content}
                    </p>
                  </div>
                </div>
              </div>

              {/* Galerie d'images sous le texte */}
              <div className="grid grid-cols-3 gap-0.5 bg-background/50">
                {['/renaissance.jpg', '/VacheressesHistoire.jpg', '/TerracottaOttoman(37).jpg'].map((img, i) => (
                  <div key={i} className="relative h-40 overflow-hidden group">
                    <Image
                      src={img}
                      alt={`Détail ${i + 1}`}
                      fill
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
              {t.domain.history_title}
            </h2>
            <p className="text-sm md:text-base tracking-wider text-muted-foreground uppercase text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              {t.domain.subtitle}
            </p>
          </div>

          {/* Histoire Timeline avec images alternées */}
          <div className="space-y-16">
            {/* L'Âge d'or des seigneurs */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <Card className="shadow-2xl hover:shadow-primary/20 transition-all duration-500 overflow-hidden group">
                <div className="grid md:grid-cols-5 gap-0">
                  <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden">
                    <Image
                      src="/VacheressesHistoire.jpg"
                      alt="L'âge d'or"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="md:col-span-3 p-8 md:p-10">
                    <CardTitle className="font-headline text-2xl md:text-3xl text-primary mb-4">
                      {t.domain.age_or_title}
                    </CardTitle>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {t.domain.age_or_content}
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
                      {t.domain.renaissance_title}
                    </CardTitle>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {t.domain.renaissance_content}
                    </p>
                  </div>
                  <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden order-1 md:order-2">
                    <Image
                      src="/renaissance.jpg"
                      alt="Renaissance"
                      fill
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
                    <Image
                      src="/dynastiedenoailles.jpg"
                      alt="Dynastie de Noailles"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="md:col-span-3 p-8 md:p-10">
                    <CardTitle className="font-headline text-2xl md:text-3xl text-primary mb-4">
                      {t.domain.noailles_title}
                    </CardTitle>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {t.domain.noailles_content}
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
                      {t.domain.modern_title}
                    </CardTitle>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {t.domain.modern_content}
                    </p>
                  </div>
                  <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden order-1 md:order-2">
                    <Image
                      src="/vacheresses_17.jpg"
                      alt="Temps modernes"
                      fill
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
                <Image
                  src="/vacheresses_7.jpg"
                  alt="Cour d'Honneur"
                  fill
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
                <Image
                  src="/salle_reception_9.jpg"
                  alt="Salle de Réception"
                  fill
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
                <Image
                  src="/Parc_2.jpg"
                  alt="Parc"
                  fill
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
                <Image
                  src="/espace_7.jpg"
                  alt="Préau et Verger"
                  fill
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
                <Image
                  src="/espace_9.jpg"
                  alt="Potager Médiéval"
                  fill
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
                <Image
                  src="/potager_3.jpg"
                  alt="Maison du Potager"
                  fill
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
                <Image
                  src="/salle_reception_6.jpg"
                  alt="Salle Blanche"
                  fill
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
                <Image
                  src="/espace_8.jpg"
                  alt="Orangerie"
                  fill
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
                <Image
                  src="/vacheresses_13.jpg"
                  alt="Chapelle"
                  fill
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
                <Image
                  src="/Parc_1.jpg"
                  alt="Terrasses"
                  fill
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
                <Image
                  src="/Parc_3.jpg"
                  alt="Roseraie"
                  fill
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
                  <Image
                    src={img}
                    alt={`Galerie ${i + 1}`}
                    fill
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
