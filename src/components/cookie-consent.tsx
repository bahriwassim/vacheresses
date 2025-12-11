"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";
import Link from "next/link";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show banner after a small delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-8 duration-500">
      <Card className="max-w-4xl mx-auto shadow-2xl border-2 bg-card/95 backdrop-blur-sm">
        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <Cookie className="h-8 w-8 text-primary" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">
                Respect de votre vie privée
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Nous utilisons des cookies pour améliorer votre expérience sur notre site.
                Ces cookies nous permettent d'analyser le trafic et de personnaliser le contenu.
                En continuant, vous acceptez notre utilisation des cookies.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <Button
                  onClick={acceptCookies}
                  className="font-semibold"
                  size="lg"
                >
                  Tout accepter
                </Button>
                <Button
                  onClick={rejectCookies}
                  variant="outline"
                  size="lg"
                >
                  Tout refuser
                </Button>
                <Link
                  href="/mentions-legales"
                  className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
                >
                  Mentions légales
                </Link>
                <Link
                  href="/politique-confidentialite"
                  className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </div>
            </div>

            <button
              onClick={rejectCookies}
              className="flex-shrink-0 p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
