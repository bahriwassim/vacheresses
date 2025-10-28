"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Afficher le bouton après 300px de scroll
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed left-8 bottom-8 z-50 h-12 w-12 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-primary/50 animate-in fade-in slide-in-from-bottom-4"
          size="icon"
          aria-label="Retour en haut"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
}
