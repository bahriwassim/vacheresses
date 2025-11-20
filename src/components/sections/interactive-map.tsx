
"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useLocale } from "@/hooks/use-locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, X, Users, Maximize2, Bed, Wifi, Trees } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HotspotData {
  id: string;
  name: string;
  description: string;
  x: number; // Position en pourcentage
  y: number; // Position en pourcentage
  link: string;
  type: 'accommodation' | 'poi'; // Point of Interest
}

export function InteractiveMap() {
  const { t } = useLocale();
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const hotspots: HotspotData[] = [
    // Accommodations
    {
      id: "heures_du_jour",
      name: t.stay.rooms.heures_du_jour.name,
      description: t.stay.rooms.heures_du_jour.type,
      x: 35,
      y: 45,
      link: "/sejourner#heures_du_jour",
      type: 'accommodation',
    },
    {
      id: "ruines_antiques",
      name: t.stay.rooms.ruines_antiques.name,
      description: t.stay.rooms.ruines_antiques.type,
      x: 48,
      y: 52,
      link: "/sejourner#ruines_antiques",
      type: 'accommodation',
    },
    {
      id: "jardins_tivoli",
      name: t.stay.rooms.jardins_tivoli.name,
      description: t.stay.rooms.jardins_tivoli.type,
      x: 52,
      y: 48,
      link: "/sejourner#jardins_tivoli",
      type: 'accommodation',
    },
    {
      id: "petit_trianon",
      name: t.stay.rooms.petit_trianon.name,
      description: t.stay.rooms.petit_trianon.type,
      x: 65,
      y: 50,
      link: "/sejourner#petit_trianon",
      type: 'accommodation',
    },
    {
      id: "la_loge",
      name: t.stay.rooms.la_loge.name,
      description: t.stay.rooms.la_loge.type,
      x: 42,
      y: 60,
      link: "/sejourner#la_loge",
      type: 'accommodation',
    },
    // Points of Interest
    {
      id: "cour_honneur",
      name: t.domain.poi.cour_honneur.title,
      description: t.domain.poi.cour_honneur.subtitle,
      x: 50,
      y: 65,
      link: "/domaine/cour-honneur",
      type: 'poi',
    },
    {
      id: "salle_reception",
      name: t.domain.poi.salle_reception.title,
      description: t.domain.poi.salle_reception.subtitle,
      x: 45,
      y: 55,
      link: "/domaine/salle-de-reception",
      type: 'poi',
    },
    {
      id: "parc",
      name: t.domain.poi.parc.title,
      description: t.domain.poi.parc.subtitle,
      x: 75,
      y: 60,
      link: "/domaine/parc",
      type: 'poi',
    },
    {
      id: "preau_verger",
      name: t.domain.poi.preau_verger.title,
      description: t.domain.poi.preau_verger.subtitle,
      x: 60,
      y: 25,
      link: "/domaine/preau-verger",
      type: 'poi',
    },
    {
      id: "potager",
      name: t.domain.poi.potager.title,
      description: t.domain.poi.potager.subtitle,
      x: 58,
      y: 38,
      link: "/domaine/potager",
      type: 'poi',
    },
  ];

  const activeHotspot = useMemo(() => {
    if (!activeHotspotId) return null;
    return hotspots.find(h => h.id === activeHotspotId);
  }, [activeHotspotId, hotspots]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setActiveHotspotId(null);
    }
  };

  const openHotspotDialog = (hotspotId: string) => {
    setSelectedImage(0); // Reset image selection
    setActiveHotspotId(hotspotId);
  };
  
  const roomImageGalleries: Record<string, string[]> = {
    heures_du_jour: ["/espace_1.jpg", "/espace_9.jpg", "/espace_15.jpg"],
    ruines_antiques: ["/espace_2_(1).jpg", "/espace_8.jpg", "/espace_9.jpg"],
    jardins_tivoli: ["/espace_4.jpg", "/espace_5.jpg", "/espace_15.jpg"],
    petit_trianon: ["/espace_5.jpg", "/espace_6.jpg", "/espace_7.jpg"],
    la_loge: ["/espace_6.jpg", "/espace_7.jpg", "/espace_8.jpg"],
    potager: ["/Parc_3.jpg", "/preau_verger_3.jpg", "/preau_verger_4.jpg"],
    cour_honneur: ["/vacheresses_13.jpg", "/vacheresses_17.jpg", "/vacheresses_20.jpg"],
    salle_reception: ["/salle_reception_6.jpg", "/salle_reception_7.jpg", "/salle_reception_8.jpg"],
    parc: ["/Parc_1.jpg", "/Parc_2.jpg", "/Parc_3.jpg"],
    preau_verger: ["/preau_verger_1.jpg", "/preau_verger_2.jpg", "/preau_verger_3.jpg"],
  };
  
  const activeRoomDetails = activeHotspot && activeHotspot.type === 'accommodation'
    ? t.stay.rooms[activeHotspot.id as keyof typeof t.stay.rooms] 
    : null;
    
  const activePoiDetails = activeHotspot && activeHotspot.type === 'poi'
    ? t.domain.poi[activeHotspot.id as keyof typeof t.domain.poi]
    : null;

  const activeImages = activeHotspot ? roomImageGalleries[activeHotspot.id] || ["/vacheresses_20.jpg"] : [];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container max-w-7xl">
        <div
          className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000"
        >
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
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src="/vacheresses_17.jpg"
                  alt="Vue aérienne du Manoir de Vacheresses"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {hotspots.map((hotspot) => (
                <div
                  key={hotspot.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                >
                  <button
                    onClick={() => openHotspotDialog(hotspot.id)}
                    className="relative group/hotspot"
                    aria-label={`Voir ${hotspot.name}`}
                  >
                    {hotspot.type === 'accommodation' ? (
                      <>
                        <span className="absolute inset-0 w-12 h-12 -ml-6 -mt-6 bg-primary/30 rounded-full animate-ping" />
                        <span className="absolute inset-0 w-8 h-8 -ml-4 -mt-4 bg-primary/50 rounded-full animate-pulse" />
                        <span className="relative flex items-center justify-center w-8 h-8 -ml-4 -mt-4 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300 group-hover/hotspot:scale-125 group-hover/hotspot:shadow-2xl">
                          <MapPin className="w-5 h-5" />
                        </span>
                      </>
                    ) : (
                      <>
                         <span className="absolute inset-0 w-12 h-12 -ml-6 -mt-6 bg-accent/30 rounded-full animate-ping" />
                        <span className="absolute inset-0 w-8 h-8 -ml-4 -mt-4 bg-accent/50 rounded-full animate-pulse" />
                        <span className="relative flex items-center justify-center w-8 h-8 -ml-4 -mt-4 bg-accent text-accent-foreground rounded-full shadow-lg transition-all duration-300 group-hover/hotspot:scale-125 group-hover/hotspot:shadow-2xl">
                          <Trees className="w-5 h-5" />
                        </span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 p-6">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{t.interactiveMap.legend_accommodation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trees className="w-4 h-4 text-accent" />
                  <span>{t.interactiveMap.legend_poi}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {activeHotspot && (
          <Dialog open={!!activeHotspotId} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
              <DialogHeader className="sr-only">
                <DialogTitle>{activeHotspot.name}</DialogTitle>

              </DialogHeader>
              <button
                onClick={() => setActiveHotspotId(null)}
                className="absolute top-4 right-4 z-50 text-white hover:text-gray-200 transition-colors bg-black/50 rounded-full p-2"
                aria-label={t.interactiveMap.close}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-96">
                <Image
                  src={activeImages[selectedImage]}
                  alt={activeHotspot.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-headline text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {activeHotspot.name}
                  </h3>
                   <p className="text-white/90 text-lg mt-2 drop-shadow">
                      {activeHotspot.description}
                    </p>
                </div>

                <div className="absolute bottom-6 right-6 flex gap-2">
                  {activeImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx ? 'border-white scale-110' : 'border-white/50 hover:border-white'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${activeHotspot.name} ${idx + 1}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8 space-y-6">
                {activeRoomDetails ? (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                        <Users className="w-6 h-6 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Capacité</p>
                          <p className="font-semibold">{activeRoomDetails.capacity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                        <Maximize2 className="w-6 h-6 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Surface</p>
                          <p className="font-semibold">{activeRoomDetails.surface}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                        <Bed className="w-6 h-6 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Literie</p>
                          <p className="font-semibold text-sm">{activeRoomDetails.bedding.split(',')[0]}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                        <Wifi className="w-6 h-6 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">Wifi</p>
                          <p className="font-semibold">Inclus</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-headline text-xl font-semibold">Description</h4>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {activeRoomDetails.description}
                      </p>
                    </div>
                  </>
                ) : activePoiDetails ? (
                   <div className="space-y-3">
                      <h4 className="font-headline text-xl font-semibold">{activePoiDetails.title}</h4>
                      <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-line">
                        {activePoiDetails.content}
                      </p>
                    </div>
                ) : null}
                <div className="flex gap-4 pt-4">
                  <Button asChild className="flex-1" size="lg">
                    <Link href={activeHotspot.link}>
                      {t.interactiveMap.discover}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1" size="lg">
                    <Link href="/contact">
                      {t.stay.contact_us}
                    </Link>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
