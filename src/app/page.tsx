
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
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { CardImage } from '@/components/ui/animated-image';

export default function Home() {
  const { t, locale } = useLocale();
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
              <Carousel opts={{ align: 'start', loop: true }} className="w-full max-w-6xl mx-auto">
                <CarouselContent>
                  {pressArticles.map((article, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1 h-full">
                        <Card className="h-full flex flex-col justify-between transition-all duration-500 hover-lift hover-glow hover:border-primary/30 animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${index * 200}ms` }}>
                          <div className="relative h-40 overflow-hidden">
                            <CardImage src={article.image} alt={article.title} fill className="object-cover" />
                          </div>
                          <CardHeader>
                            <CardTitle className="font-headline text-lg">{article.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-6 flex flex-col gap-4">
                            <p className="text-muted-foreground italic">"{article.excerpt}"</p>
                            <div className="text-sm text-primary/80 font-medium">{article.publication} • {article.date}</div>
                            <div>
                              <Button asChild variant="link" className="p-0">
                                <Link href="/blog/press">{t.blog.readMore} &rarr;</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
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
