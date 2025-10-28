"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";
import Link from "next/link";

interface HotspotData {
  id: string;
  name: string;
  description: string;
  x: number; // Position en pourcentage
  y: number; // Position en pourcentage
  link: string;
}

export function InteractiveMap() {
  const { t } = useLocale();
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const hotspots: HotspotData[] = [
    {
      id: "heures_du_jour",
      name: t.stay.rooms.heures_du_jour.name,
      description: t.stay.rooms.heures_du_jour.type,
      x: 35, // Bâtiment à gauche
      y: 45,
      link: "/sejourner#heures_du_jour",
    },
    {
      id: "ruines_antiques",
      name: t.stay.rooms.ruines_antiques.name,
      description: t.stay.rooms.ruines_antiques.type,
      x: 48, // Bâtiment central
      y: 52,
      link: "/sejourner#ruines_antiques",
    },
    {
      id: "jardins_tivoli",
      name: t.stay.rooms.jardins_tivoli.name,
      description: t.stay.rooms.jardins_tivoli.type,
      x: 52, // Bâtiment central droit
      y: 48,
      link: "/sejourner#jardins_tivoli",
    },
    {
      id: "petit_trianon",
      name: t.stay.rooms.petit_trianon.name,
      description: t.stay.rooms.petit_trianon.type,
      x: 65, // Bâtiment à droite
      y: 50,
      link: "/sejourner#petit_trianon",
    },
    {
      id: "la_loge",
      name: t.stay.rooms.la_loge.name,
      description: t.stay.rooms.la_loge.type,
      x: 42, // Petit bâtiment
      y: 60,
      link: "/sejourner#la_loge",
    },
    {
      id: "potager",
      name: t.stay.maison_potager_title,
      description: t.stay.maison_potager_subtitle,
      x: 58,
      y: 38,
      link: "/sejourner",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container max-w-7xl">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            {t.interactiveMap.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.interactiveMap.subtitle}
          </p>
        </div>

        <Card className="overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <CardContent className="p-0">
            <div className="relative w-full group">
              {/* Image principale */}
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src="/vacheresses_4-1.jpg"
                  alt="Vue aérienne du Manoir de Vacheresses"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay léger pour améliorer la visibilité des points */}
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Points cliquables (Hotspots) */}
              {hotspots.map((hotspot) => (
                <div
                  key={hotspot.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                  }}
                >
                  {/* Point pulsant */}
                  <button
                    onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                    className="relative group/hotspot"
                    aria-label={`Voir ${hotspot.name}`}
                  >
                    {/* Cercles d'animation */}
                    <span className="absolute inset-0 w-12 h-12 -ml-6 -mt-6 bg-primary/30 rounded-full animate-ping" />
                    <span className="absolute inset-0 w-8 h-8 -ml-4 -mt-4 bg-primary/50 rounded-full animate-pulse" />

                    {/* Point principal */}
                    <span className="relative flex items-center justify-center w-8 h-8 -ml-4 -mt-4 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300 group-hover/hotspot:scale-125 group-hover/hotspot:shadow-2xl">
                      <MapPin className="w-5 h-5" />
                    </span>
                  </button>

                  {/* Popup d'information */}
                  {activeHotspot === hotspot.id && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 z-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <Card className="shadow-2xl border-primary/20">
                        <CardContent className="p-4">
                          <button
                            onClick={() => setActiveHotspot(null)}
                            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={t.interactiveMap.close}
                          >
                            <X className="w-4 h-4" />
                          </button>

                          <h3 className="font-headline text-lg font-semibold mb-1 pr-6">
                            {hotspot.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {hotspot.description}
                          </p>

                          <Button asChild size="sm" className="w-full">
                            <Link href={hotspot.link}>
                              {t.interactiveMap.discover}
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                      {/* Flèche pointant vers le point */}
                      <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-4 h-4 bg-card border-l border-t border-primary/20 rotate-45" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Légende */}
            <div className="bg-muted/50 p-6">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>
                  {t.interactiveMap.legend}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grille des hébergements en dessous */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
          {hotspots.map((hotspot) => (
            <Link
              key={hotspot.id}
              href={hotspot.link}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                      {hotspot.name}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {hotspot.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
