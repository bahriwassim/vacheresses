"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

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

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        !fill && aspectRatioClasses[aspectRatio],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true } : { width, height })}
        priority={priority}
        data-ai-hint={dataAiHint}
        className={cn(
          "object-cover transition-all duration-500",
          fill ? "w-full h-full" : "w-full h-full",
          isLoaded ? cn("opacity-100", animationClasses[animation]) : "opacity-0",
          hoverClasses[hoverEffect]
        )}
        onLoadingComplete={() => setIsLoaded(true)}
        loading={priority ? "eager" : "lazy"}
      />
      
      {/* Overlay pour effet de chargement */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
      )}
      
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out opacity-0 hover:opacity-100" />
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
    <div className={cn("relative group", cardClassName)}>
      <AnimatedImage
        {...props}
        animation="fade"
        hoverEffect="scale"
        className="transition-all duration-500 group-hover:brightness-75"
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {overlayContent}
        </div>
      )}
    </div>
  );
}
