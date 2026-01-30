
"use client";

import { useLocale } from "@/hooks/use-locale";
import { getImageById } from "@/lib/vacheresses-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { EditableText } from "@/components/ui/editable-text";

const InstagramIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363-.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218 1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zm0 1.623c-2.387 0-2.704.01-3.66.058-1.17.053-1.803.24-2.228.41a3.282 3.282 0 00-1.18 1.18c-.17.425-.357 1.058-.41 2.228-.048.956-.058 1.273-.058 3.66s.01 2.704.058 3.66c.053 1.17.24 1.803.41 2.228a3.282 3.282 0 001.18 1.18c.425.17 1.058.357 2.228.41.956.048 1.273.058 3.66.058s2.704-.01 3.66-.058c1.17-.053 1.803-.24 2.228-.41a3.282 3.282 0 001.18-1.18c.17-.425.357-1.058-.41-2.228.048-.956.058-1.273.058-3.66s-.01-2.704-.058-3.66c-.053-1.17-.24-1.803-.41-2.228a3.282 3.282 0 00-1.18-1.18c-.425-.17-1.058-.357-2.228-.41-.956-.048-1.273.058-3.66-.058zM12 8.118a3.882 3.882 0 100 7.764 3.882 3.882 0 000-7.764zm0 6.138a2.256 2.256 0 110-4.512 2.256 2.256 0 010 4.512zm5.338-7.838a.937.937 0 100-1.874.937.937 0 000 1.874z" clipRule="evenodd"></path></svg>
)

interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  thumbnailUrl?: string;
}

export function InstagramFeed() {
  const { t } = useLocale();
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  // Fallback images from database (only 3)
  const fallbackImages = [
    getImageById("testimonial-1"),
    getImageById("testimonial-2"),
    getImageById("testimonial-3"),
  ].filter(Boolean);

  useEffect(() => {
    async function fetchInstagramPosts() {
      try {
        const response = await fetch('/api/instagram');
        const data = await response.json();

        if (data.fallback || !data.posts || data.posts.length === 0) {
          setUseFallback(true);
        } else {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error('Error loading Instagram posts:', error);
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    }

    fetchInstagramPosts();
  }, []);

  if (loading) {
    return (
      <section id="instagram-feed" className="py-12 md:py-20 bg-secondary/50">
        <div className="container max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold flex items-center justify-center gap-3">
              <InstagramIcon />
              <EditableText path="instagram.title" value={t.instagram.title} />
            </h2>
          </div>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="instagram-feed" className="py-12 md:py-20 bg-secondary/50">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-3xl md:text-4xl font-headline font-bold flex items-center justify-center gap-3">
            <InstagramIcon />
            <EditableText path="instagram.title" value={t.instagram.title} />
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
             <Link href="https://www.instagram.com/manoirdevacheresses/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                <EditableText path="instagram.subtitle" value={t.instagram.subtitle} />
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {useFallback ? (
            // Fallback: Display images from database
            fallbackImages.map((image, index) => (
              <Link
                key={image!.id}
                href="https://www.instagram.com/manoirdevacheresses/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden rounded-lg group animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <Image
                  src={image!.imageUrl}
                  alt={image!.description}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <InstagramIcon />
                </div>
              </Link>
            ))
          ) : (
            // Real Instagram posts
            posts.slice(0, 3).map((post, index) => (
              <Link
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square overflow-hidden rounded-lg group animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <Image
                  src={post.mediaUrl}
                  alt={post.caption || 'Instagram post'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <InstagramIcon />
                  </div>
                  {post.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs line-clamp-2">
                        {post.caption.substring(0, 80)}{post.caption.length > 80 ? '...' : ''}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="text-center mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Button asChild size="lg" className="group">
                <Link href="https://www.instagram.com/manoirdevacheresses/" target="_blank" rel="noopener noreferrer">
                    <EditableText path="instagram.button" value={t.instagram.button} />
                    <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
