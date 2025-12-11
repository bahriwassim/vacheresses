"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function ProprietorsSection() {
  const { t } = useLocale();

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-background to-secondary/30">
      <div className="container max-w-6xl">
        <Card className="shadow-2xl border-primary/20 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image gauche */}
            <div className="relative h-64 md:h-auto overflow-hidden group">
              <Image
                src="/vacheresses_13.jpg"
                alt="Frédérique et Philippe, propriétaires du Manoir de Vacheresses"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Contenu */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                  Nos Propriétaires
                </h2>
                <p className="text-sm md:text-base tracking-wider text-muted-foreground uppercase">
                  Frédérique & Philippe
                </p>
              </div>

              <div className="prose prose-lg max-w-none dark:prose-invert mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-base md:text-lg">
                  Passionnés d'art, d'histoire et de vieilles pierres, Frédérique et Philippe ont succombé à l'authenticité et à l'architecture du bâti qui rappelait à Philippe des souvenirs d'enfance et ses origines anglaises.
                </p>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-base md:text-lg">
                  Depuis 2017, ils ont entrepris des travaux de rénovation et ouvrent cette demeure de famille pour faire naître de nouvelles émotions et partager des valeurs qui leur sont chères : convivialité, générosité, élégance, art de vivre à la française…
                </p>
              </div>

              <div className="pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                <Button asChild size="lg" className="group">
                  <Link href="/domaine#histoire" className="flex items-center gap-2">
                    {t.domain.discover_more}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}