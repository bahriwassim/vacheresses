
"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useLocale } from "@/hooks/use-locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, X, Users, Maximize2, Bed, Wifi, Trees, Landmark } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditableText } from "@/components/ui/editable-text";
import { loadMediaOverridesByPath } from "@/lib/supabase";

interface HotspotData {
  id: string;
  name: string;
  description: string;
  x: number; // Position en pourcentage
  y: number; // Position en pourcentage
  link: string;
  type: 'accommodation' | 'poi' | 'space';
}

export function InteractiveMap() {
  const { t } = useLocale();
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [, setRefresh] = useState(0);
  const overridePath = (path: string) => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('imageOverridesByPath') : null;
      const map = raw ? JSON.parse(raw) as Record<string,string> : null;
      return map && map[path] ? map[path] : path;
    } catch {
      return path;
    }
  };
  useEffect(() => {
    (async () => {
      await loadMediaOverridesByPath();
      setRefresh(x => x + 1);
    })();
  }, []);

  const hotspots: HotspotData[] = useMemo(() => [
    {
      id: "parking_invites",
      name: t.domain.poi.parking_invites.title,
      description: t.domain.poi.parking_invites.subtitle,
      x: 30,
      y: 2,
      link: "/domaine/parking_invites",
      type: 'poi',
    },
    {
      id: "maison_potager",
      name: "La maison du potager",
      description: "Hébergement de charme près du potager",
      x: 28,
      y: 12,
      link: "/sejourner/hebergements",
      type: 'accommodation',
    },
    {
      id: "potager",
      name: t.domain.poi.potager.title,
      description: t.domain.poi.potager.subtitle,
      x: 19,
      y: 28,
      link: "/domaine/potager",
      type: 'poi',
    },
    {
      id: "preau",
      name: t.domain.poi.preau.title,
      description: t.domain.poi.preau.subtitle,
      x: 17,
      y: 42,
      link: "/domaine/preau",
      type: 'space',
    },
    {
      id: "verger",
      name: t.domain.poi.verger.title,
      description: t.domain.poi.verger.subtitle,
      x: 15,
      y: 68,
      link: "/domaine/verger",
      type: 'poi',
    },
    {
      id: "orangerie",
      name: t.domain.poi.orangerie.title,
      description: t.domain.poi.orangerie.subtitle,
      x: 46,
      y: 17,
      link: "/domaine/orangerie",
      type: 'space',
    },
    {
      id: "la_loge",
      name: t.stay.rooms.la_loge.name,
      description: t.stay.rooms.la_loge.type,
      x: 41,
      y: 26,
      link: "/sejourner/la_loge",
      type: 'accommodation',
    },
    {
      id: "cour_honneur",
      name: t.domain.poi.cour_honneur.title,
      description: t.domain.poi.cour_honneur.subtitle,
      x: 52,
      y: 42,
      link: "/domaine/cour_honneur",
      type: 'poi',
    },
    {
      id: "manoir",
      name: t.domain.poi.manoir.title,
      description: t.domain.poi.manoir.subtitle,
      x: 54,
      y: 80,
      link: "/domaine/manoir",
      type: 'poi',
    },
    {
      id: "parking_prestataires",
      name: t.domain.poi.parking_prestataires.title,
      description: t.domain.poi.parking_prestataires.subtitle,
      x: 68,
      y: 14,
      link: "/domaine/parking_prestataires",
      type: 'poi',
    },
    {
      id: "salle_reception",
      name: t.domain.poi.salle_reception.title,
      description: t.domain.poi.salle_reception.subtitle,
      x: 70,
      y: 32,
      link: "/domaine/salle_reception",
      type: 'space',
    },
    {
      id: "pigeonnier",
      name: t.domain.poi.pigeonnier.title,
      description: t.domain.poi.pigeonnier.subtitle,
      x: 90,
      y: 27,
      link: "/domaine/pigeonnier",
      type: 'poi',
    },
    {
      id: "parc",
      name: t.domain.poi.parc.title,
      description: t.domain.poi.parc.subtitle,
      x: 90,
      y: 88,
      link: "/domaine/parc",
      type: 'poi',
    },
  ], [t]);

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
    preau: ["/preau_verger_1.jpg", "/preau_verger_2.jpg", "/preau_verger_3.jpg"],
    // New estate spaces
    salle_blanche: ["/salle_reception_6.jpg", "/salle_reception_7.jpg", "/salle_reception_8.jpg"],
    orangerie: ["/espace_8.jpg", "/espace_9.jpg", "/espace_15.jpg"],
    chapelle: ["/vacheresses_13.jpg", "/vacheresses_17.jpg", "/vacheresses_20.jpg"],
    terrasses: ["/Parc_1.jpg", "/Parc_2.jpg", "/Parc_3.jpg"],
    roseraie: ["/Parc_3.jpg", "/preau_verger_3.jpg", "/preau_verger_4.jpg"],
    mare: ["/espace_1.jpg", "/espace_2_(1).jpg", "/espace_4.jpg"],
    // Custom points from map
    pigeonnier: ["/vacheresses_17.jpg", "/vacheresses_20.jpg", "/vacheresses_13.jpg"],
    manoir: ["/vacheresses_13.jpg", "/vacheresses_14.jpg", "/vacheresses_7.jpg"],
    maison_potager: ["/potager_4.jpg", "/potager_3.jpg", "/preau_verger_4.jpg"],
    parking_prestataires: ["/vacheresses_20.jpg", "/vacheresses_17.jpg", "/Parc_1.jpg"],
    parking_invites: ["/vacheresses_20.jpg", "/Parc_2.jpg", "/Parc_3.jpg"],
    verger: ["/preau_verger_5.jpg", "/Parc_3.jpg", "/Parc_2.jpg"],
  };
  
  const activeRoomDetails = activeHotspot && activeHotspot.type === 'accommodation'
    ? t.stay.rooms[activeHotspot.id as keyof typeof t.stay.rooms] 
    : null;
    
  const activePoiDetails = activeHotspot && activeHotspot.type !== 'accommodation'
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
            <EditableText path="interactiveMap.title" value={t.interactiveMap.title} />
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            <EditableText path="interactiveMap.subtitle" value={t.interactiveMap.subtitle} />
          </p>
          <p className="mt-2 text-base max-w-2xl mx-auto">
            <Link href="/domaine" className="text-primary hover:underline">
              <EditableText path="interactiveMap.exploreSpaces" value={t.interactiveMap.exploreSpaces || 'Découvrez les Espaces du Domaine'} />
            </Link>
          </p>
        </div>

        <Card className="overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <CardContent className="p-0">
            <div className="relative w-full overflow-x-auto scrollbar-hide">
              <div className="relative min-w-[800px] md:min-w-0 w-full aspect-[16/10] group">
                <Image
                  src={overridePath("/interactive.jpeg")}
                  alt="Vue aérienne interactive du Manoir de Vacheresses"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/10" />

                {hotspots.map((hotspot) => (
                  <div
                    key={hotspot.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                  >
                    <button
                      onClick={() => openHotspotDialog(hotspot.id)}
                      className="relative group/hotspot p-4" // Added padding for larger hit area
                      aria-label={`Voir ${hotspot.name}`}
                    >
                      {hotspot.type === 'accommodation' ? (
                        <>
                          <span className="absolute inset-4 bg-primary/30 rounded-full animate-ping" />
                          <span className="absolute inset-5 bg-primary/50 rounded-full animate-pulse" />
                          <span className="relative flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300 group-hover/hotspot:scale-125 group-hover/hotspot:shadow-2xl">
                            <Bed className="w-5 h-5" />
                          </span>
                        </>
                      ) : hotspot.type === 'poi' ? (
                        <>
                           <span className="absolute inset-4 bg-accent/30 rounded-full animate-ping" />
                          <span className="absolute inset-5 bg-accent/50 rounded-full animate-pulse" />
                          <span className="relative flex items-center justify-center w-8 h-8 bg-accent text-accent-foreground rounded-full shadow-lg transition-all duration-300 group-hover/hotspot:scale-125 group-hover/hotspot:shadow-2xl">
                            <Trees className="w-5 h-5" />
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="absolute inset-4 bg-secondary/30 rounded-full animate-ping" />
                          <span className="absolute inset-5 bg-secondary/50 rounded-full animate-pulse" />
                          <span className="relative flex items-center justify-center w-8 h-8 bg-secondary text-secondary-foreground rounded-full shadow-lg transition-all duration-300 group-hover/hotspot:scale-125 group-hover/hotspot:shadow-2xl">
                            <Landmark className="w-5 h-5" />
                          </span>
                        </>
                      )}
                    </button>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-black/60 text-white text-[10px] md:text-xs opacity-0 group-hover/hotspot:opacity-100 transition-opacity pointer-events-none">
                      {hotspot.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:hidden text-center py-2 bg-muted/30 border-b">
              <p className="text-[10px] text-muted-foreground italic flex items-center justify-center gap-2">
                <Maximize2 className="w-3 h-3" />
                Faites défiler pour explorer la carte
              </p>
            </div>

            <div className="bg-muted/50 p-6">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-primary" />
                  <span>
                    <EditableText path="interactiveMap.legend_accommodation" value={t.interactiveMap.legend_accommodation} />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trees className="w-4 h-4 text-accent" />
                  <span>
                    <EditableText path="interactiveMap.legend_poi" value={t.interactiveMap.legend_poi} />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-foreground" />
                  <span>
                    <EditableText path="interactiveMap.legend_space" value={t.interactiveMap.legend_space} />
                  </span>
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
                  src={overridePath(activeImages[selectedImage])}
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
                        src={overridePath(img)}
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
                      <EditableText path="interactiveMap.discover" value={t.interactiveMap.discover} />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1" size="lg">
                    <Link href="/contact">
                      <EditableText path="stay.contact_us" value={t.stay.contact_us} />
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
