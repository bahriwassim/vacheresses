
"use client";

export function VideoSection() {
  const videoId = "II3mIKxM_JI";
  
  return (
    <section className="py-12 md:py-20 bg-secondary/50">
      <div className="container max-w-5xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Découvrez le Domaine en Vidéo</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Laissez-vous transporter par la magie des Vacheresses.
          </p>
        </div>
        <div className="aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&showinfo=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
