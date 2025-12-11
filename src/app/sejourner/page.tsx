
"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, Users, Home, BedDouble } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface RoomData {
  id: string;
  name: string;
  type: string;
  capacity: string;
  bedding: string;
  surface: string;
  description: string;
  equipment: string[];
  hasReservation?: boolean;
  image: string;
  gallery: string[];
  location: 'potager' | 'loge';
}

export default function SejournerPage() {
  const { t } = useLocale();
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [highlightedRoom, setHighlightedRoom] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Vérifier si on arrive avec un hash dans l'URL
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setHighlightedRoom(hash);
      // Retirer le highlight après 3 secondes
      setTimeout(() => setHighlightedRoom(null), 3000);
    }
  }, []);

  const allRooms: RoomData[] = [
    {
      id: "heures_du_jour",
      location: "potager",
      name: t.stay.rooms.heures_du_jour.name,
      type: t.stay.rooms.heures_du_jour.type,
      capacity: t.stay.rooms.heures_du_jour.capacity,
      bedding: t.stay.rooms.heures_du_jour.bedding,
      surface: t.stay.rooms.heures_du_jour.surface,
      description: t.stay.rooms.heures_du_jour.description,
      image: "/espace_1.jpg",
      gallery: ["/espace_1.jpg", "/espace_2_(1).jpg", "/espace_9.jpg"],
      equipment: [
        t.stay.equipment.bathroom,
        t.stay.equipment.bed_queen,
        `2 ${t.stay.equipment.bed_single}`,
        t.stay.equipment.curtains,
        t.stay.equipment.wifi,
        t.stay.equipment.tv,
        t.stay.equipment.linens,
        t.stay.equipment.mirror,
        t.stay.equipment.hairdryer,
      ],
    },
    {
      id: "ruines_antiques",
      location: "potager",
      name: t.stay.rooms.ruines_antiques.name,
      type: t.stay.rooms.ruines_antiques.type,
      capacity: t.stay.rooms.ruines_antiques.capacity,
      bedding: t.stay.rooms.ruines_antiques.bedding,
      surface: t.stay.rooms.ruines_antiques.surface,
      description: t.stay.rooms.ruines_antiques.description,
      image: "/espace_15.jpg",
      gallery: ["/espace_15.jpg", "/salle_reception_6.jpg", "/salle_reception_7.jpg"],
      equipment: [
        t.stay.equipment.bathroom,
        t.stay.equipment.bed_queen,
        `2 ${t.stay.equipment.bed_single}`,
        t.stay.equipment.curtains,
        t.stay.equipment.courtesy_tray,
        t.stay.equipment.tv,
        t.stay.equipment.toiletries,
        t.stay.equipment.mirror,
        t.stay.equipment.hairdryer,
      ],
      hasReservation: true,
    },
    {
      id: "jardins_tivoli",
      location: "potager",
      name: t.stay.rooms.jardins_tivoli.name,
      type: t.stay.rooms.jardins_tivoli.type,
      capacity: t.stay.rooms.jardins_tivoli.capacity,
      bedding: t.stay.rooms.jardins_tivoli.bedding,
      surface: t.stay.rooms.jardins_tivoli.surface,
      description: t.stay.rooms.jardins_tivoli.description,
      image: "/espace_4.jpg",
      gallery: ["/espace_4.jpg", "/espace_8.jpg", "/salle_reception_8.jpg"],
      equipment: [
        t.stay.equipment.bathroom,
        t.stay.equipment.bed_queen,
        t.stay.equipment.curtains,
        t.stay.equipment.wifi,
        t.stay.equipment.tv,
        t.stay.equipment.linens,
        t.stay.equipment.mirror,
        t.stay.equipment.hairdryer,
      ],
    },
    {
      id: "petit_trianon",
      location: "potager",
      name: t.stay.rooms.petit_trianon.name,
      type: t.stay.rooms.petit_trianon.type,
      capacity: t.stay.rooms.petit_trianon.capacity,
      bedding: t.stay.rooms.petit_trianon.bedding,
      surface: t.stay.rooms.petit_trianon.surface,
      description: t.stay.rooms.petit_trianon.description,
      image: "/espace_5.jpg",
      gallery: ["/espace_5.jpg", "/salle_reception_9.jpg", "/salle_reception_10.jpg"],
      equipment: [
        t.stay.equipment.bathroom,
        t.stay.equipment.bed_queen,
        t.stay.equipment.curtains,
        t.stay.equipment.courtesy_tray,
        t.stay.equipment.tv,
        t.stay.equipment.toiletries,
        t.stay.equipment.mirror,
        t.stay.equipment.hairdryer,
      ],
      hasReservation: true,
    },
    {
      id: "voyage_ballon",
      location: "potager",
      name: t.stay.rooms.voyage_ballon.name,
      type: t.stay.rooms.voyage_ballon.type,
      capacity: t.stay.rooms.voyage_ballon.capacity,
      bedding: t.stay.rooms.voyage_ballon.bedding,
      surface: t.stay.rooms.voyage_ballon.surface,
      description: t.stay.rooms.voyage_ballon.description,
      image: "/espace_6.jpg",
      gallery: ["/espace_6.jpg", "/dynastiedenoailles.jpg", "/2020-06-30_Dans_les_bois-29.jpg"],
      equipment: [
        t.stay.equipment.bathroom,
        t.stay.equipment.bed_queen,
        t.stay.equipment.curtains,
        t.stay.equipment.courtesy_tray,
        t.stay.equipment.tv,
        t.stay.equipment.toiletries,
        t.stay.equipment.mirror,
        t.stay.equipment.hairdryer,
      ],
      hasReservation: true,
    },
    {
      id: "la_loge",
      location: "loge",
      name: t.stay.rooms.la_loge.name,
      type: t.stay.rooms.la_loge.type,
      capacity: t.stay.rooms.la_loge.capacity,
      bedding: t.stay.rooms.la_loge.bedding,
      surface: t.stay.rooms.la_loge.surface,
      description: t.stay.rooms.la_loge.description,
      image: "/espace_7.jpg",
      gallery: ["/espace_7.jpg", "/mariage_Véronique__Florian_-959.jpg", "/salle_reception_10.jpg", "/vacheresses_13.jpg"],
      equipment: [
        t.stay.equipment.bathroom,
        t.stay.equipment.bed_queen,
        `4 ${t.stay.equipment.bed_single}`,
        t.stay.equipment.curtains,
        t.stay.equipment.courtesy_tray,
        t.stay.equipment.tv,
        t.stay.equipment.toiletries,
        t.stay.equipment.mirror,
        t.stay.equipment.hairdryer,
      ],
    },
  ];

  const potagerRooms = allRooms.filter(r => r.location === 'potager');
  const laLoge = allRooms.find(r => r.location === 'loge');

  const renderRoomCard = (room: RoomData) => (
      <Card
        key={room.id}
        id={room.id}
        className={`flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 animate-in fade-in slide-in-from-bottom-8 overflow-hidden group scroll-mt-24 ${
          highlightedRoom === room.id ? 'ring-4 ring-primary ring-offset-4 shadow-2xl shadow-primary/50' : ''
        }`}
      >
        {/* Image de la chambre */}
        <div className="relative h-56 overflow-hidden">
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge "Réserver en ligne" */}
          {room.hasReservation && (
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              {t.stay.reserve_online.split(' ')[0]}
            </div>
          )}
        </div>

        <CardHeader>
          <CardTitle className="font-headline text-2xl">{room.name}</CardTitle>
          <CardDescription className="text-base">{room.type}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BedDouble className="h-4 w-4 text-primary" />
            <span>{room.bedding}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Home className="h-4 w-4 text-primary" />
            <span>{room.surface}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>{room.capacity}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 line-clamp-3">{room.description}</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full" onClick={() => setSelectedRoom(room)}>
                {t.stay.view_details}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-headline text-3xl">{room.name}</DialogTitle>
                <DialogDescription className="text-base">{room.type}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Galerie de photos */}
                <div className="grid grid-cols-3 gap-2 rounded-lg overflow-hidden">
                  {room.gallery.map((img, idx) => (
                    <div key={idx} className="relative h-40 md:h-56 overflow-hidden group rounded-lg">
                      <Image
                        src={img}
                        alt={`${room.name} - Photo ${idx + 1}`}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold mb-1">{t.stay.equipment.bed_queen.includes("Literie") ? "Literie :" : "Bedding:"}</p>
                    <p className="text-muted-foreground">{room.bedding}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">{t.stay.equipment.bathroom.includes("Surface") ? "Surface :" : "Surface:"}</p>
                    <p className="text-muted-foreground">{room.surface}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold mb-1">{t.stay.equipment.bathroom.includes("Capacité") ? "Capacité :" : "Capacity:"}</p>
                    <p className="text-muted-foreground">{room.capacity}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold text-sm mb-2 uppercase tracking-wide">
                    {t.stay.subtitle.includes("MANOIR") ? "L'ESPRIT" : "THE SPIRIT"}
                  </h4>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                    {t.stay.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">{room.description}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">{t.stay.equipment.title}</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {room.equipment.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          {room.hasReservation ? (
            <Button className="w-full">{t.stay.reserve_online}</Button>
          ) : (
            <Button className="w-full" variant="secondary">{t.stay.contact_us}</Button>
          )}
        </CardFooter>
      </Card>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <Image
            src="/potager_3.jpg"
            alt="Maison du Potager"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-4xl text-white">
            <h1 className="text-5xl md:text-7xl font-headline font-bold drop-shadow-2xl">
              {t.stay.intro_title}
            </h1>
            <p className="text-xl md:text-2xl tracking-wider uppercase drop-shadow-lg mt-4 mb-6">
              {t.stay.subtitle}
            </p>
            <p className="text-lg md:text-xl max-w-2xl mx-auto whitespace-pre-line drop-shadow-lg">
              {t.stay.intro_description.split('\n\n')[0]}
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 -mt-16 relative z-10 pb-20">
        <div className="container max-w-7xl">

          {/* La Maison du Potager Section */}
          <section id="maison-potager" className="mb-20">
            <Card className="shadow-2xl border-primary/20 overflow-hidden backdrop-blur-sm bg-card/95 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                  <CardTitle className="font-headline text-3xl md:text-4xl text-primary mb-6">
                    {t.stay.maison_potager_title}
                  </CardTitle>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                    {t.stay.maison_potager_description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {t.stay.maison_potager_common_area}
                  </p>
                  <Separator className="my-6" />
                  <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                    <h3 className="font-semibold text-xl text-primary mb-3">{t.stay.privatize_title}</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {t.stay.privatize_description}
                    </p>
                  </div>
                </div>
                <div className="relative h-[400px] md:h-auto overflow-hidden group order-1 md:order-2">
                  <Image
                    src="/potager_4.jpg"
                    alt="Maison du Potager"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </Card>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {potagerRooms.map(renderRoomCard)}
            </div>
          </section>

          {/* La Loge Section */}
          <section id="la-loge">
            <Separator className="my-16" />
            <h2 className="text-4xl font-headline font-bold text-center mb-12">{laLoge?.name}</h2>
            <Card className="shadow-2xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{laLoge?.description}</p>
                        {laLoge && renderRoomCard(laLoge)}
                    </div>
                    <div className="grid grid-cols-2 gap-2 p-4">
                        <div className="relative h-64 rounded-lg overflow-hidden group">
                             <Image src="/mariage_Véronique__Florian_-959.jpg" alt="La Loge photo 1" fill className="object-cover transition-transform duration-500 group-hover:scale-110"/>
                        </div>
                        <div className="relative h-64 rounded-lg overflow-hidden group">
                            <Image src="/salle_reception_10.jpg" alt="La Loge photo 2" fill className="object-cover transition-transform duration-500 group-hover:scale-110"/>
                        </div>
                        <div className="relative h-64 col-span-2 rounded-lg overflow-hidden group">
                           <Image src="/vacheresses_13.jpg" alt="La Loge photo 3" fill className="object-cover transition-transform duration-500 group-hover:scale-110"/>
                        </div>
                    </div>
                </div>
            </Card>
          </section>

          {/* Partner Accommodations Section */}
          <section id="partenaires" className="mt-20">
            <Separator className="my-16" />
            <div className="text-center mb-12">
              <h2 className="text-4xl font-headline font-bold mb-4">Hébergements Partenaires</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Nous collaborons avec des hébergements à proximité pour offrir plus d'options à nos invités. 
                Nous pouvons faciliter les réservations pour ces établissements partenaires.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Partner 1 */}
              <Card className="flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src="/espace_1.jpg" 
                    alt="Hôtel Partenaire 1" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">Hôtel du Centre</CardTitle>
                  <CardDescription>À 5 minutes en voiture</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm mb-4">
                    Hôtel 3 étoiles avec piscine et spa. Chambres confortables et restaurant gastronomique.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <BedDouble className="h-4 w-4 mr-2 text-primary" />
                    <span>30 chambres</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>Capacité jusqu'à 60 personnes</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer">
                      Voir le site
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* Partner 2 */}
              <Card className="flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src="/espace_4.jpg" 
                    alt="Chambres d'Hôtes Partenaire" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">Chambres d'Hôtes Les Glycines</CardTitle>
                  <CardDescription>À 3 minutes en voiture</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm mb-4">
                    Charmantes chambres d'hôtes dans un cadre bucolique. Petit-déjeuner inclus.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <BedDouble className="h-4 w-4 mr-2 text-primary" />
                    <span>8 chambres</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>Capacité jusqu'à 16 personnes</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer">
                      Voir le site
                    </a>
                  </Button>
                </CardFooter>
              </Card>

              {/* Partner 3 */}
              <Card className="flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src="/espace_5.jpg" 
                    alt="Gîte Partenaire" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline">Gîte de Campagne La Grange</CardTitle>
                  <CardDescription>À 7 minutes en voiture</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm mb-4">
                    Gîte entier pouvant accueillir jusqu'à 12 personnes. Idéal pour les familles.
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Home className="h-4 w-4 mr-2 text-primary" />
                    <span>300 m² de surface</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>Capacité jusqu'à 12 personnes</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://www.booking.com" target="_blank" rel="noopener noreferrer">
                      Voir le site
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card className="mt-12 bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-headline font-bold mb-4">Besoin d'aide pour les réservations ?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Nous pouvons vous accompagner dans l'organisation des réservations externes en tant que facilitateurs. 
                  Contactez-nous pour obtenir des tarifs préférentiels auprès de nos partenaires.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild>
                    <Link href="/contact">Nous Contacter</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="mailto:contact@manoirdevacheresses.com">Envoyer un Email</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
