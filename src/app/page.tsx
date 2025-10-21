
"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Packages } from '@/components/sections/packages';
import { VisualTour } from '@/components/sections/visual-tour';
import { Availability } from '@/components/sections/availability';
import { Testimonials } from '@/components/sections/testimonials';
import { Access } from '@/components/sections/access';
import { VideoSection } from '@/components/sections/video-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Packages />
        <VideoSection />
        <VisualTour />
        <Availability />
        <Testimonials />
        <Access />
      </main>
      <Footer />
    </div>
  );
}
