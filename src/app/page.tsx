
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
import { EditableText } from '@/components/ui/editable-text';
import { useEffect, useState } from 'react';
import { loadMediaOverridesByPath } from '@/lib/supabase';

export default function Home() {
  const { t, locale } = useLocale();
  const [, setRefresh] = useState(0);
  useEffect(() => {
    (async () => {
      await loadMediaOverridesByPath();
      setRefresh(x => x + 1);
    })();
  }, []);
  const pressLogos = [
    { id: 'press-vogue', name: locale === 'fr' ? 'Vogue Mariages' : 'Vogue Weddings', src: 'https://picsum.photos/seed/vogue/200/200' },
    { id: 'press-elle', name: 'Elle Decoration', src: 'https://picsum.photos/seed/elle/200/200' },
    { id: 'press-bridal', name: 'Bridal Magazine', src: 'https://picsum.photos/seed/bridal/200/200' },
    { id: 'press-marieclaire', name: 'Marie Claire', src: 'https://picsum.photos/seed/marieclaire/200/200' },
  ];
  return (
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
                <EditableText path="blog.pressTitle" value={t.blog.pressTitle} />
              </h2>
              <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
                <EditableText path="blog.pressSubtitle" value={t.blog.pressSubtitle} />
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
  );
}
