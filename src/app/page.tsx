
"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { DomainTeaser } from '@/components/sections/domain-teaser';
import { InteractiveMap } from '@/components/sections/interactive-map';
import { Packages } from '@/components/sections/packages';
import { VisualTour } from '@/components/sections/visual-tour';
import { Testimonials } from '@/components/sections/testimonials';
import { Access } from '@/components/sections/access';
import { VideoSection } from '@/components/sections/video-section';
import { ProprietorsSection } from '@/components/sections/proprietors-section';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { BookingProvider } from '@/contexts/booking-context';
import { InstagramFeed } from '@/components/sections/instagram-feed';
import { useLocale } from '@/hooks/use-locale';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CardImage } from '@/components/ui/animated-image';
import { useEffect, useState } from 'react';
import { loadMediaOverridesByPath } from '@/lib/supabase';

export default function Home() {
  const { t, locale } = useLocale();
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {
    (async () => {
      await loadMediaOverridesByPath();
      setRefresh(x => x + 1);
    })();
  }, []);
  const pressArticles = [
    {
      image: '/vacheresses_7.jpg',
      publication: locale === 'fr' ? 'Vogue Mariages' : 'Vogue Weddings',
      date: locale === 'fr' ? '15 Juin 2024' : 'June 15, 2024',
      title: locale === 'fr' ? 'Un mariage de conte de fées au Manoir de Vacheresses' : 'A Fairytale Wedding at Manoir de Vacheresses',
      excerpt: locale === 'fr'
        ? "Découvrez comment ce couple a célébré leur union dans l'un des plus beaux domaines de France."
        : "Discover how this couple celebrated their union at one of France’s most beautiful estates.",
    },
    {
      image: '/vacheresses_20.jpg',
      publication: 'Elle Decoration',
      date: locale === 'fr' ? '3 Mars 2024' : 'March 3, 2024',
      title: locale === 'fr' ? 'Les 10 plus beaux lieux de mariage en Île-de-France' : 'Top 10 Wedding Venues in Île-de-France',
      excerpt: locale === 'fr'
        ? "Le Manoir de Vacheresses figure parmi les destinations les plus prisées pour les mariages élégants."
        : "Manoir de Vacheresses ranks among the most sought-after destinations for elegant weddings.",
    },
    {
      image: '/espace_1.jpg',
      publication: 'Bridal Magazine',
      date: locale === 'fr' ? '22 Janvier 2024' : 'January 22, 2024',
      title: locale === 'fr' ? "Destination Wedding: Le charme français à l'état pur" : 'Destination Wedding: Pure French Charm',
      excerpt: locale === 'fr'
        ? 'Pourquoi les couples internationaux choisissent le Manoir de Vacheresses pour leurs unions.'
        : 'Why international couples choose Manoir de Vacheresses for their unions.',
    },
    {
      image: '/potager_4.jpg',
      publication: 'Marie Claire',
      date: locale === 'fr' ? '8 Novembre 2023' : 'November 8, 2023',
      title: locale === 'fr' ? 'Mariages Intimes: Une tendance en pleine expansion' : 'Intimate Weddings: A Growing Trend',
      excerpt: locale === 'fr'
        ? "Comment le Manoir de Vacheresses réinvente le mariage intimiste avec élégance."
        : 'How Manoir de Vacheresses reinvents intimate weddings with elegance.',
    },
  ];
  const pressLogos = [
    { id: 'press-vogue', name: locale === 'fr' ? 'Vogue Mariages' : 'Vogue Weddings', src: 'https://picsum.photos/seed/vogue/200/200' },
    { id: 'press-elle', name: 'Elle Decoration', src: 'https://picsum.photos/seed/elle/200/200' },
    { id: 'press-bridal', name: 'Bridal Magazine', src: 'https://picsum.photos/seed/bridal/200/200' },
    { id: 'press-marieclaire', name: 'Marie Claire', src: 'https://picsum.photos/seed/marieclaire/200/200' },
  ];
  return (
    <BookingProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1">
          <Hero />
          <DomainTeaser />
          <ProprietorsSection />
          <VideoSection />
          <InteractiveMap />
          <Packages />
          <VisualTour />
          <section id="press" className="py-12 md:py-20">
            <div className="container max-w-7xl px-4">
              <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">
                  {t.blog.pressTitle}
                </h2>
                <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
                  {t.blog.pressSubtitle}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {pressLogos.map((logo) => (
                  <Link key={logo.id} href="/blog/press" className="group">
                    <div className="relative aspect-square rounded-xl border bg-card hover:border-primary/40 transition-all duration-300 hover:shadow-md overflow-hidden">
                      <CardImage
                        src={logo.src}
                        alt={logo.name}
                        fill
                        aspectRatio="square"
                        overrideKey={logo.id}
                        className="object-contain p-4"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          <Testimonials />
          <InstagramFeed />
          <Access />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </BookingProvider>
  );
}
