"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadAndOverrideMedia } from "@/lib/supabase";

interface AnimatedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  dataAiHint?: string;
  aspectRatio?: "square" | "video" | "portrait" | "landscape";
  animation?: "fade" | "slide" | "zoom" | "blur" | "none";
  hoverEffect?: "scale" | "brightness" | "grayscale" | "none";
  delay?: number;
  sizes?: string;
  unoptimized?: boolean;
  overrideKey?: string;
  editable?: boolean;
}

export function AnimatedImage({
  src,
  alt,
  width = 800,
  height = 600,
  fill = false,
  className,
  priority = false,
  dataAiHint,
  aspectRatio = "landscape",
  animation = "fade",
  hoverEffect = "scale",
  delay = 0,
  sizes = "100vw",
  unoptimized = true,
  overrideKey,
  editable = true,
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [userRole] = useState<string | null>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      const u = raw ? JSON.parse(raw) : null;
      return u?.role || null;
    } catch {
      return null;
    }
  });

  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  const animationClasses = {
    fade: "animate-in fade-in duration-1000",
    slide: "animate-in slide-in-from-bottom-8 duration-1000",
    zoom: "animate-in zoom-in-95 duration-1000",
    blur: "animate-in duration-1000",
    none: "",
  };

  const hoverClasses = {
    scale: "transition-transform duration-300 hover:scale-105",
    brightness: "transition-all duration-300 hover:brightness-110",
    grayscale: "transition-all duration-300 hover:grayscale-0 grayscale",
    none: "",
  };

  const isAdmin = userRole === "super_admin";
  const key = overrideKey || (typeof src === "string" && src.startsWith("/") ? src : null);

  function getOverriddenSrc(original: string): string {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("imageOverridesByPath") : null;
      const map = raw ? JSON.parse(raw) as Record<string, string> : null;
      if (map && original && map[original]) return map[original];
    } catch {}
    return original;
  }

  useEffect(() => {
    setCurrentSrc(getOverriddenSrc(src));
  }, [src]);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        fill ? "w-full h-full" : aspectRatioClasses[aspectRatio],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Image
        src={currentSrc}
        alt={alt}
        {...(fill ? { fill: true } : { width, height })}
        {...(fill ? { sizes } : {})}
        unoptimized={unoptimized}
        priority={priority}
        data-ai-hint={dataAiHint}
        className={cn(
          "object-cover transition-all duration-500",
          fill ? "w-full h-full" : "w-full h-full",
          isLoaded ? cn("opacity-100", animationClasses[animation]) : "opacity-0",
          hoverClasses[hoverEffect]
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        loading={priority ? "eager" : "lazy"}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out opacity-0 hover:opacity-100" />

      {editable && isAdmin && key && (
        <div className="absolute top-2 right-2 flex gap-2 z-20">
          {!isEditing && (
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEditing(true);
              }}
            >
              Changer
            </Button>
          )}
        </div>
      )}

      {editable && isAdmin && isEditing && key && (
        <div
          className="absolute inset-0 bg-black/60 flex items-center justify-center p-4 z-30"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div className="bg-white rounded-lg p-4 w-full max-w-sm space-y-3">
            <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <div className="flex gap-2">
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!file) return;
                  try {
                    setIsUploading(true);
                    const url = await uploadAndOverrideMedia(key, "image", file);
                    setCurrentSrc(url);
                    setIsEditing(false);
                  } finally {
                    setIsUploading(false);
                  }
                }}
                disabled={!file || isUploading}
              >
                {isUploading ? "Upload..." : "Uploader"}
              </Button>
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsEditing(false);
                }}
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Composant spécialisé pour les galeries
interface GalleryImageProps extends Omit<AnimatedImageProps, 'animation' | 'hoverEffect'> {
  index: number;
  totalImages: number;
}

export function GalleryImage({
  index,
  totalImages,
  ...props
}: GalleryImageProps) {
  const delay = index * 100; // Délai progressif pour l'animation
  
  return (
    <AnimatedImage
      {...props}
      animation="fade"
      hoverEffect="scale"
      delay={delay}
      className={cn(
        "group cursor-pointer",
        props.className
      )}
    />
  );
}

// Composant pour les images hero avec effet parallax
interface HeroImageProps extends Omit<AnimatedImageProps, 'animation' | 'hoverEffect'> {
  parallax?: boolean;
}

export function HeroImage({
  parallax = true,
  fill,
  ...props
}: HeroImageProps) {
  return (
    <div className={cn(
      "relative overflow-hidden",
      parallax && "transform-gpu"
    )}>
      <AnimatedImage
        {...props}
        fill={fill}
        animation="zoom"
        hoverEffect="none"
        className={cn(
          fill ? "w-full h-full" : "w-full h-full",
          parallax && "hover:scale-110 transition-transform duration-&lsqb;2000ms&rsqb; ease-out"
        )}
      />
    </div>
  );
}

// Composant pour les cartes avec images
interface CardImageProps extends AnimatedImageProps {
  cardClassName?: string;
  overlay?: boolean;
  overlayContent?: React.ReactNode;
}

export function CardImage({
  cardClassName,
  overlay = false,
  overlayContent,
  ...props
}: CardImageProps) {
  return (
    <div className={cn("relative group h-full w-full", cardClassName)}>
      <AnimatedImage
        {...props}
        animation="fade"
        hoverEffect="scale"
        className={cn("transition-all duration-500 group-hover:brightness-75", props.className)}
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
          {overlayContent}
        </div>
      )}
    </div>
  );
}
