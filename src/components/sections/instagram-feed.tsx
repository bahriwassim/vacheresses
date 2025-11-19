
"use client";

import { useLocale } from "@/hooks/use-locale";
import { getImageById } from "@/lib/vacheresses-images";
import { CardImage } from "@/components/ui/animated-image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const InstagramIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363-.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm0 1.623c-2.387 0-2.704.01-3.66.058-1.17.053-1.803.24-2.228.41a3.282 3.282 0 00-1.18 1.18c-.17.425-.357 1.058-.41 2.228-.048.956-.058 1.273-.058 3.66s.01 2.704.058 3.66c.053 1.17.24 1.803.41 2.228a3.282 3.282 0 001.18 1.18c.425.17 1.058.357 2.228.41.956.048 1.273.058 3.66.058s2.704-.01 3.66-.058c1.17-.053 1.803-.24 2.228-.41a3.282 3.282 0 001.18-1.18c.17-.425.357-1.058-.41-2.228.048-.956.058-1.273.058-3.66s-.01-2.704-.058-3.66c-.053-1.17-.24-1.803-.41-2.228a3.282 3.282 0 00-1.18-1.18c-.425-.17-1.058-.357-2.228-.41-.956-.048-1.273.058-3.66-.058zM12 8.118a3.882 3.882 0 100 7.764 3.882 3.882 0 000-7.764zm0 6.138a2.256 2.256 0 110-4.512 2.256 2.256 0 010 4.512zm5.338-7.838a.937.937 0 100-1.874.937.937 0 000 1.874z" clipRule="evenodd"></path></svg>
)

export function InstagramFeed() {
  const { t } = useLocale();

  const feedImages = [
    getImageById("testimonial-1"),
    getImageById("testimonial-2"),
    getImageById("testimonial-3"),
  ].filter(Boolean); // Filter out any undefined images

  return (
    <section id="instagram-feed" className="py-16 md:py-24 bg-secondary/50">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            {t.locale === 'fr' ? 'Suivez-nous sur Instagram' : 'Follow us on Instagram'}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
             <Link href="https://www.instagram.com/manoirdevacheresses/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                @manoirdevacheresses
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {feedImages.map((image, index) => (
            <Link
              key={image!.id}
              href="https://www.instagram.com/manoirdevacheresses/"
              target="_blank"
              rel="noopener noreferrer"
              className="block animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${200 + index * 150}ms` }}
            >
              <CardImage
                src={image!.imageUrl}
                alt={image!.description}
                width={600}
                height={600}
                dataAiHint={image!.imageHint}
                aspectRatio="square"
                overlay={true}
                overlayContent={
                  <div className="text-white">
                    <InstagramIcon />
                  </div>
                }
              />
            </Link>
          ))}
        </div>
        <div className="text-center mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Button asChild size="lg" className="group">
                <Link href="https://www.instagram.com/manoirdevacheresses/" target="_blank" rel="noopener noreferrer">
                    {t.locale === 'fr' ? 'Voir sur Instagram' : 'View on Instagram'}
                    <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

