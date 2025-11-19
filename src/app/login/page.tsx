
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocale } from "@/hooks/use-locale";
import { authService } from "@/lib/supabase";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { user, profile } = await authService.signIn(email, password);

      // Vérifier si c'est un admin
      if (profile?.role === "admin") {
        toast({
          title: t.login?.admin_success_title || "Connexion admin réussie",
          description: t.login?.admin_success_desc || "Bienvenue administrateur"
        });
        localStorage.setItem('user', JSON.stringify(profile));
        router.push("/admin");
      } else {
        toast({
          title: t.login?.client_success_title || "Connexion réussie",
          description: t.login?.client_success_desc || "Bienvenue"
        });
        localStorage.setItem('user', JSON.stringify(profile));
        router.push("/compte/profil");
      }
    } catch (err: any) {
      setError(err.message || "Identifiants invalides");
      toast({
        variant: "destructive",
        title: t.login?.invalid_credentials_title || "Erreur",
        description: err.message || t.login?.invalid_credentials_desc || "Identifiants invalides",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError(null);

    if (!name || !email || !password) {
      setError("Veuillez remplir tous les champs requis");
      toast({
        variant: "destructive",
        title: t.login?.missing_info_title || "Information manquante",
        description: t.login?.missing_info_desc || "Veuillez remplir tous les champs",
      });
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setIsLoading(true);

    try {
      const { user, profile } = await authService.signUp(email, password, name, phone);

      toast({
        title: t.login?.signup_success_title || "Inscription réussie",
        description: t.login?.signup_success_desc || "Votre compte a été créé"
      });

      localStorage.setItem('user', JSON.stringify(profile));
      router.push("/compte/profil");
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: err.message || "Une erreur est survenue",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
       <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo_white.png" alt="Vacheresses Logo" width={32} height={32} className="h-8 w-8" />
              <span className="text-2xl font-bold font-headline">Vacheresses</span>
            </Link>
          </div>
          <CardTitle className="font-headline text-2xl">{t.login.title}</CardTitle>
          <CardDescription>{t.login.description}</CardDescription>
        </CardHeader>
        <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t.login.login_tab}</TabsTrigger>
              <TabsTrigger value="signup">{t.login.signup_tab}</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <CardContent className="grid gap-4 pt-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-800">{error}</p>
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">{t.login?.email_label || "Email"}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">{t.login?.password_label || "Mot de passe"}</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" onClick={handleLogin} disabled={isLoading}>
                  {isLoading ? "Connexion..." : (t.login?.login_button || "Se connecter")}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  {t.login?.admin_hint || "Admin: admin@example.com / password"}
                </p>
              </CardFooter>
            </TabsContent>
            <TabsContent value="signup">
               <CardContent className="grid gap-4 pt-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-800">{error}</p>
                  </div>
                )}
                <div className="grid gap-2">
                    <Label htmlFor="name-signup">{t.login?.name_label || "Nom complet"}</Label>
                    <Input
                      id="name-signup"
                      placeholder="John Smith"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone-signup">Téléphone (optionnel)</Label>
                  <Input
                    id="phone-signup"
                    type="tel"
                    placeholder="+1 555 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email-signup">{t.login?.email_label || "Email"}</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-signup">{t.login?.password_label || "Mot de passe"}</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground">Minimum 6 caractères</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSignUp} disabled={isLoading}>
                  {isLoading ? "Création..." : (t.login?.signup_button || "S'inscrire")}
                </Button>
              </CardFooter>
            </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
