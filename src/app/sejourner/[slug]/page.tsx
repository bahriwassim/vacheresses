"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLocale } from "@/hooks/use-locale";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGallery } from "@/lib/gallery-maps";
import { CardImage } from "@/components/ui/animated-image";
import { EditableText } from "@/components/ui/editable-text";
import { EditableMedia } from "@/components/ui/editable-media";

export default function StayDetailPage() {
  const { t } = useLocale();
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const room = t.stay.rooms[slug as keyof typeof t.stay.rooms] as any;
  const images = getGallery(slug);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-sm md:text-base tracking-wider text-primary uppercase font-semibold">
              Séjourner
            </p>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">
              <EditableText path={`stay.rooms.${slug}.name`} value={room?.name || slug} />
            </h1>
            {room && (
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                <EditableText path={`stay.rooms.${slug}.description`} value={room.description} multiline />
              </p>
            )}
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="font-headline">Galerie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.slice(0, 4).map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                    <CardImage src={src} alt={`${room?.name || slug} ${i + 1}`} fill className="object-cover" overrideKey={src} />
                  </div>
                ))}
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <EditableMedia
                    type="video"
                    path={`stay.rooms.${slug}.videoId`}
                    value=""
                    className="w-full h-full"
                    render={(srcOrId) => (
                      <div className="relative w-full h-full bg-black/10 flex items-center justify-center">
                        {srcOrId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${srcOrId}`}
                            title="Mini vidéo"
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <p className="text-muted-foreground">Mini vidéo</p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
