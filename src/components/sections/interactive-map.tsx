"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { useLocale } from "@/hooks/use-locale";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, X, Users, Maximize2, Bed, Wifi, Droplet } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

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
    potager: ["/potager_4.jpg", "/preau_verger_3.jpg", "/preau_verger_4.jpg"]
  };
  
  const activeRoomDetails = activeHotspot && activeHotspot.id !== "potager" 
    ? t.stay.rooms[activeHotspot.id as keyof typeof t.stay.rooms] 
    : null;
    
  const activeImages = activeHotspot ? roomImageGalleries[activeHotspot.id] || ["/vacheresses_4-1.jpg"] : [];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
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
                    <span className="absolute inset-0 w-12 h-12 -ml-6 -mt-6 bg-primary/30 rounded-full animate-ping" />
                    <span className="absolute inset-0 w-8 h-8 -ml-4 -mt-4 bg-primary/50 rounded-full animate-pulse" />
                    <span className="relative flex items-center justify-center w-8 h-8 -ml-4 -mt-4 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300 group-hover/hotspot:scale-125 group-hover/hotspot:shadow-2xl">
                      <MapPin className="w-5 h-5" />
                    </span>
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 p-6">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{t.interactiveMap.legend}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {activeHotspot && (
          <Dialog open={!!activeHotspotId} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
              <DialogHeader className="sr-only">
                <DialogTitle>{activeHotspot.name}</DialogTitle>
                <DialogDescription>{activeHotspot.description}</DialogDescription>
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
                  {activeRoomDetails && (
                    <p className="text-white/90 text-lg mt-2 drop-shadow">
                      {activeRoomDetails.type}
                    </p>
                  )}
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
                    <div className="space-y-3">
                      <h4 className="font-headline text-xl font-semibold">Équipements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Droplet className="w-5 h-5 text-primary" />
                          <span className="text-sm">{t.stay.equipment.bathroom}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bed className="w-5 h-5 text-primary" />
                          <span className="text-sm">{activeRoomDetails.bedding}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Wifi className="w-5 h-5 text-primary" />
                          <span className="text-sm">{t.stay.equipment.wifi}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span className="text-sm">{t.stay.equipment.curtains}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <h4 className="font-headline text-xl font-semibold">La Maison du Potager</h4>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {t.stay.maison_potager_description}
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-base mt-4">
                      {t.stay.maison_potager_common_area}
                    </p>
                  </div>
                )}
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
