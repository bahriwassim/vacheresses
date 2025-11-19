"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/hooks/use-locale";
import { User, Mail, Phone, Lock, LogOut, Calendar, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authService } from "@/lib/supabase";

export default function ProfilPage() {
  const { t } = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/compte');
      return;
    }

    // Charger les données utilisateur
    const parsedUser = JSON.parse(user);
    setUserData({
      firstName: parsedUser.firstName || "",
      lastName: parsedUser.lastName || "",
      email: parsedUser.email || "",
      phone: parsedUser.phone || "",
      address: parsedUser.address || "",
      city: parsedUser.city || "",
      postalCode: parsedUser.postalCode || "",
    });
  }, [router]);

  const handleLogout = async () => {
    await authService.signOut();
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Obtenir l'utilisateur actuel
      const currentUser = await authService.getCurrentUser();

      if (currentUser?.user) {
        // Préparer les données avec tous les champs
        const updates = {
          name: `${userData.firstName} ${userData.lastName}`,
          phone: userData.phone,
          email: userData.email,
          // Ajouter les champs d'adresse s'ils existent dans votre schéma
          updated_at: new Date().toISOString()
        };

        // Mettre à jour dans Supabase
        const updatedProfile = await authService.updateProfile(currentUser.user.id, updates);

        // Mettre à jour localStorage
        localStorage.setItem('user', JSON.stringify({
          ...updatedProfile,
          firstName: userData.firstName,
          lastName: userData.lastName,
          address: userData.address,
          city: userData.city,
          postalCode: userData.postalCode,
        }));

        setIsEditing(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde des modifications');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container max-w-6xl">
          {/* En-tête avec navigation */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold">Mon Compte</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  Gérez vos informations et réservations
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
                <Button variant="ghost" className="border-b-2 border-primary rounded-none">
                  <User className="w-4 h-4 mr-2" />
                  Profil
                </Button>
              </Link>
              <Link href="/compte/reservations">
                <Button variant="ghost" className="rounded-none">
                  <Calendar className="w-4 h-4 mr-2" />
                  Mes Réservations
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Carte de résumé */}
            <div className="lg:col-span-1">
              <Card className="animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                <CardHeader className="text-center pb-4">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">
                    {userData.firstName} {userData.lastName}
                  </CardTitle>
                  <CardDescription>{userData.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium truncate">{userData.email}</p>
                    </div>
                  </div>

                  {userData.phone && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">Téléphone</p>
                        <p className="text-sm font-medium">{userData.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Membre depuis</p>
                    <p className="text-sm font-medium">Novembre 2024</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulaire d'édition */}
            <div className="lg:col-span-2">
              <Card className="animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-headline text-2xl">
                        Informations personnelles
                      </CardTitle>
                      <CardDescription>
                        Modifiez vos informations de profil
                      </CardDescription>
                    </div>
                    {!isEditing && (
                      <Button onClick={() => setIsEditing(true)}>
                        <Settings className="w-4 h-4 mr-2" />
                        Modifier
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {saveSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-in fade-in slide-in-from-top-4 duration-500">
                      <p className="text-green-800 font-semibold">✓ Modifications enregistrées !</p>
                    </div>
                  )}

                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={userData.firstName}
                          onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                          disabled={!isEditing}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={userData.lastName}
                          onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                          disabled={!isEditing}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          disabled={!isEditing}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse</Label>
                      <Input
                        id="address"
                        value={userData.address}
                        onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        disabled={!isEditing}
                        placeholder="123 Rue de la Paix"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Ville</Label>
                        <Input
                          id="city"
                          value={userData.city}
                          onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                          disabled={!isEditing}
                          placeholder="Paris"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal</Label>
                        <Input
                          id="postalCode"
                          value={userData.postalCode}
                          onChange={(e) => setUserData({ ...userData, postalCode: e.target.value })}
                          disabled={!isEditing}
                          placeholder="75000"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 pt-4">
                        <Button
                          type="submit"
                          className="flex-1"
                          disabled={isLoading}
                        >
                          {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Annuler
                        </Button>
                      </div>
                    )}
                  </form>

                  {/* Section changement de mot de passe */}
                  <div className="mt-8 pt-8 border-t">
                    <h3 className="font-headline text-xl font-semibold mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Sécurité
                    </h3>
                    <Button variant="outline">
                      Changer le mot de passe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
