"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocale } from "@/hooks/use-locale";
import { LogIn, UserPlus, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/supabase";

export default function ComptePage() {
  const { t } = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Formulaire de connexion
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Formulaire d'inscription
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { user, profile } = await authService.signIn(
        loginData.email,
        loginData.password
      );

      // Stocker le profil dans localStorage pour accès rapide
      localStorage.setItem('user', JSON.stringify(profile));

      router.push('/compte/profil');
    } catch (err: any) {
      setError(err.message || "Erreur lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (signupData.password !== signupData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (signupData.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setIsLoading(true);

    try {
      const { user, profile } = await authService.signUp(
        signupData.email,
        signupData.password,
        `${signupData.firstName} ${signupData.lastName}`,
        signupData.phone
      );

      // Stocker le profil dans localStorage
      localStorage.setItem('user', JSON.stringify(profile));

      router.push('/compte/profil');
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container max-w-4xl">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">
              {t.account?.title || "Mon Compte"}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.account?.subtitle || "Connectez-vous pour gérer vos réservations et vos informations"}
            </p>
          </div>

          <Card className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <CardContent className="p-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="login" className="text-base">
                    <LogIn className="w-4 h-4 mr-2" />
                    Connexion
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-base">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Inscription
                  </TabsTrigger>
                </TabsList>

                {/* Onglet Connexion */}
                <TabsContent value="login">
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-headline font-bold">Bon retour !</h2>
                      <p className="text-muted-foreground mt-2">
                        Connectez-vous à votre compte
                      </p>
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          required
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          placeholder="votre@email.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password">Mot de passe</Label>
                        <Input
                          id="login-password"
                          type="password"
                          required
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          placeholder="••••••••"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <a href="#" className="text-sm text-primary hover:underline">
                          Mot de passe oublié ?
                        </a>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? "Connexion en cours..." : "Se connecter"}
                      </Button>
                    </form>
                  </div>
                </TabsContent>

                {/* Onglet Inscription */}
                <TabsContent value="signup">
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-headline font-bold">Créer un compte</h2>
                      <p className="text-muted-foreground mt-2">
                        Rejoignez-nous pour profiter de tous nos services
                      </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="signup-firstName">Prénom</Label>
                          <Input
                            id="signup-firstName"
                            type="text"
                            required
                            value={signupData.firstName}
                            onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                            placeholder="Jean"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-lastName">Nom</Label>
                          <Input
                            id="signup-lastName"
                            type="text"
                            required
                            value={signupData.lastName}
                            onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                            placeholder="Dupont"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          required
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          placeholder="votre@email.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-phone">Téléphone</Label>
                        <Input
                          id="signup-phone"
                          type="tel"
                          value={signupData.phone}
                          onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                          placeholder="+33 6 12 34 56 78"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Mot de passe</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          required
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          placeholder="••••••••"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signup-confirmPassword">Confirmer le mot de passe</Label>
                        <Input
                          id="signup-confirmPassword"
                          type="password"
                          required
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                          placeholder="••••••••"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        size="lg"
                        disabled={isLoading}
                      >
                        {isLoading ? "Création en cours..." : "Créer mon compte"}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
