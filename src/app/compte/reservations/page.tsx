"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/hooks/use-locale";
import { User, Calendar, LogOut, MapPin, Clock, Download, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ReservationsPage() {
  const { t } = useLocale();
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  // Données de réservations d'exemple
  const reservations = [
    {
      id: "RES-001",
      type: "Mariage",
      room: "Les Heures du Jour",
      date: "2025-06-15",
      status: "confirmed",
      guests: 4,
      nights: 3,
      total: "1200€",
    },
    {
      id: "RES-002",
      type: "Weekend",
      room: "Jardins Tivoli",
      date: "2025-03-20",
      status: "pending",
      guests: 2,
      nights: 2,
      total: "450€",
    },
    {
      id: "RES-003",
      type: "Séminaire",
      room: "La Loge",
      date: "2024-12-10",
      status: "completed",
      guests: 6,
      nights: 1,
      total: "800€",
    },
  ];

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/compte');
      return;
    }
    setUserData(JSON.parse(user));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/compte');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmée";
      case "pending":
        return "En attente";
      case "completed":
        return "Terminée";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  if (!userData) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container max-w-6xl">
          {/* En-tête avec navigation */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Mes Réservations</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  Consultez et gérez vos réservations
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex gap-4 border-b">
              <Link href="/compte/profil">
                <Button variant="ghost" className="rounded-none">
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </Button>
              </Link>
              <Link href="/compte/reservations">
                <Button variant="ghost" className="border-b-2 border-primary rounded-none">
                  <Calendar className="w-4 h-4 mr-2" />
                  Mes Réservations
                </Button>
              </Link>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total réservations</p>
                    <p className="text-3xl font-bold mt-1">{reservations.length}</p>
                  </div>
                  <Calendar className="w-10 h-10 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">À venir</p>
                    <p className="text-3xl font-bold mt-1">
                      {reservations.filter(r => r.status === "confirmed" || r.status === "pending").length}
                    </p>
                  </div>
                  <Clock className="w-10 h-10 text-green-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Terminées</p>
                    <p className="text-3xl font-bold mt-1">
                      {reservations.filter(r => r.status === "completed").length}
                    </p>
                  </div>
                  <MapPin className="w-10 h-10 text-blue-500 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des réservations */}
          <div className="space-y-6">
            {reservations.map((reservation, index) => (
              <Card
                key={reservation.id}
                className="animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="font-headline text-xl">
                          {reservation.room}
                        </CardTitle>
                        <Badge className={getStatusColor(reservation.status)}>
                          {getStatusText(reservation.status)}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <span className="font-semibold">{reservation.id}</span>
                        <span>•</span>
                        <span>{reservation.type}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Date d'arrivée</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(reservation.date).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Voyageurs</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.guests} personne{reservation.guests > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Durée</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.nights} nuit{reservation.nights > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 flex items-center justify-center text-primary mt-0.5 font-bold">€</div>
                      <div>
                        <p className="text-sm font-medium">Total</p>
                        <p className="text-sm text-muted-foreground font-semibold">
                          {reservation.total}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    {reservation.status === "confirmed" && (
                      <>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger la confirmation
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4 mr-2" />
                          Contacter l'établissement
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Annuler
                        </Button>
                      </>
                    )}
                    {reservation.status === "pending" && (
                      <Button size="sm">
                        Compléter la réservation
                      </Button>
                    )}
                    {reservation.status === "completed" && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger la facture
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Nouvelle réservation */}
          <Card className="mt-8 bg-primary/5 border-primary/20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-600">
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-headline text-2xl font-bold mb-2">
                Planifier une nouvelle réservation ?
              </h3>
              <p className="text-muted-foreground mb-6">
                Découvrez nos forfaits et hébergements disponibles
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/sejourner">Voir les hébergements</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/forfaits">Voir les forfaits</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
