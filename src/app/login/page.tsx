
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

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (email.toLowerCase() === "admin@example.com" && password === "password") {
      toast({ title: t.login.admin_success_title, description: t.login.admin_success_desc });
      router.push("/admin");
    } else if (email && password) {
       toast({ title: t.login.client_success_title, description: t.login.client_success_desc });
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: t.login.invalid_credentials_title,
        description: t.login.invalid_credentials_desc,
      });
    }
  };

  const handleSignUp = () => {
    if (name && email && password) {
      toast({ title: t.login.signup_success_title, description: t.login.signup_success_desc });
      router.push("/dashboard");
    } else {
       toast({
        variant: "destructive",
        title: t.login.missing_info_title,
        description: t.login.missing_info_desc,
      });
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
                <div className="grid gap-2">
                  <Label htmlFor="email">{t.login.email_label}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">{t.login.password_label}</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" onClick={handleLogin}>
                  {t.login.login_button}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  {t.login.admin_hint}
                </p>
              </CardFooter>
            </TabsContent>
            <TabsContent value="signup">
               <CardContent className="grid gap-4 pt-6">
                <div className="grid gap-2">
                    <Label htmlFor="name-signup">{t.login.name_label}</Label>
                    <Input id="name-signup" placeholder="Samantha & Chloe" required onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email-signup">{t.login.email_label}</Label>
                  <Input id="email-signup" type="email" placeholder="m@example.com" required onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password-signup">{t.login.password_label}</Label>
                  <Input id="password-signup" type="password" required onChange={(e) => setPassword(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSignUp}>{t.login.signup_button}</Button>
              </CardFooter>
            </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
