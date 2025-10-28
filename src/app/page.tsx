
"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { DomainTeaser } from '@/components/sections/domain-teaser';
import { InteractiveMap } from '@/components/sections/interactive-map';
import { DateSelector } from '@/components/sections/date-selector';
import { Packages } from '@/components/sections/packages';
import { VisualTour } from '@/components/sections/visual-tour';
import { Availability } from '@/components/sections/availability';
import { Testimonials } from '@/components/sections/testimonials';
import { Access } from '@/components/sections/access';
import { VideoSection } from '@/components/sections/video-section';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { BookingProvider } from '@/contexts/booking-context';

export default function Home() {
  return (
    <BookingProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1">
          <Hero />
          <InteractiveMap />
          <DateSelector />
          <Packages />
          <VideoSection />
          <VisualTour />
          <Availability />
          <Testimonials />
          <Access />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </BookingProvider>
  );
}
