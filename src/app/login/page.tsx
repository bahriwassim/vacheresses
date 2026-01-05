
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
import { EditableText } from "@/components/ui/editable-text";

export default function LoginPage() {
  const router = useRouter();
  const search = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const next = search?.get('next') || null;
  const { toast } = useToast();
  const { t } = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { user, profile } = await authService.signIn(email, password);

      if (!profile) {
        throw new Error("Profil utilisateur non trouvé.");
      }
      
      // Stocker le profil dans localStorage pour accès rapide
      localStorage.setItem('user', JSON.stringify(profile));

      if (profile?.role === "admin" || profile?.role === "super_admin") {
        toast({
          title: t.login?.admin_success_title || "Connexion admin réussie",
          description: t.login?.admin_success_desc || "Bienvenue administrateur"
        });
        router.push(next || "/admin");
      } else {
        toast({
          title: t.login?.client_success_title || "Connexion réussie",
          description: t.login?.client_success_desc || "Bienvenue"
        });
        router.push(next || "/dashboard");
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

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
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
      const { user } = await authService.signUp(email, password, name, phone);
      const cu = user ? await authService.getCurrentUser() : null;
      
      if (!cu || !cu.profile) {
        throw new Error("La création du profil a échoué.");
      }

      toast({
        title: t.login?.signup_success_title || "Inscription réussie",
        description: t.login?.signup_success_desc || "Votre compte a été créé"
      });

      localStorage.setItem('user', JSON.stringify(cu.profile));
      router.push(next || "/dashboard");
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
          <CardTitle className="font-headline text-2xl">
            <EditableText path="login.title" value={t.login.title} />
          </CardTitle>
          <CardDescription>
            <EditableText path="login.description" value={t.login.description} />
          </CardDescription>
        </CardHeader>
        <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">
                <EditableText path="login.login_tab" value={t.login.login_tab} />
              </TabsTrigger>
              <TabsTrigger value="signup">
                <EditableText path="login.signup_tab" value={t.login.signup_tab} />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
             <form onSubmit={handleLogin}>
              <CardContent className="grid gap-4 pt-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-800">{error}</p>
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    <EditableText path="login.email_label" value={t.login?.email_label || "Email"} />
                  </Label>
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
                  <Label htmlFor="password">
                    <EditableText path="login.password_label" value={t.login?.password_label || "Mot de passe"} />
                  </Label>
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Connexion..." : (
                    <EditableText path="login.login_button" value={t.login?.login_button || "Se connecter"} />
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Super Admin: contact@startindev.com / password
                </p>
              </CardFooter>
             </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
               <CardContent className="grid gap-4 pt-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-red-800">{error}</p>
                  </div>
                )}
                <div className="grid gap-2">
                    <Label htmlFor="name-signup">
                      <EditableText path="login.name_label" value={t.login?.name_label || "Nom complet"} />
                    </Label>
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
                  <Label htmlFor="email-signup">
                    <EditableText path="login.email_label" value={t.login?.email_label || "Email"} />
                  </Label>
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
                  <Label htmlFor="password-signup">
                    <EditableText path="login.password_label" value={t.login?.password_label || "Mot de passe"} />
                  </Label>
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Création..." : (
                    <EditableText path="login.signup_button" value={t.login?.signup_button || "S'inscrire"} />
                  )}
                </Button>
              </CardFooter>
              </form>
            </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

    
