
"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle, Music, Utensils, ExternalLink } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { Separator } from "@/components/ui/separator";
import { getImageById } from "@/lib/vacheresses-images";
import { CardImage } from "@/components/ui/animated-image";
import { EditableText } from "@/components/ui/editable-text";
import { useState } from "react";
import { AnimatedImage } from "@/components/ui/animated-image";

export default function ServicesPage() {
  const { t } = useLocale();
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const includedServices = [
    { key: 'included_1', value: t.services.included_1 },
    { key: 'included_2', value: t.services.included_2 },
    { key: 'included_3', value: t.services.included_3 },
    { key: 'included_4', value: t.services.included_4 },
    { key: 'included_5', value: t.services.included_5 },
    { key: 'included_6', value: t.services.included_6 },
  ];

  const optionalServices = [
    { imageId: "service-preau-1", keyPrefix: "option_rolls", title: t.services.option_rolls_title, description: t.services.option_rolls_desc },
    { imageId: "service-preau-2", keyPrefix: "option_lanterns", title: t.services.option_lanterns_title, description: t.services.option_lanterns_desc },
    { imageId: "service-preau-3", keyPrefix: "option_chairs", title: t.services.option_chairs_title, description: t.services.option_chairs_desc },
    { imageId: "service-preau-4", keyPrefix: "option_bbq", title: t.services.option_bbq_title, description: t.services.option_bbq_desc },
    { imageId: "service-preau-5", keyPrefix: "option_flowers", title: t.services.option_flowers_title, description: t.services.option_flowers_desc },
    { imageId: "service-preau-verger-1", keyPrefix: "option_balloon", title: t.services.option_balloon_title, description: t.services.option_balloon_desc },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <EditableText path="services.title" value={t.services.title} />
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              <EditableText path="services.subtitle" value={t.services.subtitle} />
            </p>
          </div>

          <Card className="shadow-lg mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <CardHeader>
              <CardTitle className="font-headline">
                <EditableText path="services.included_title" value={t.services.included_title} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {includedServices.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                    <div className="text-muted-foreground w-full">
                      <EditableText path={`services.${service.key}`} value={service.value} />
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <h2 className="text-3xl font-headline font-bold mb-8 text-center">
              <EditableText path="services.imposed_title" value={t.services.imposed_title} />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DJ Section */}
              <Card className="shadow-lg border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">
                    <EditableText path="services.imposed_dj_title" value={t.services.imposed_dj_title} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    <EditableText path="services.imposed_dj_desc" value={t.services.imposed_dj_desc} />
                  </p>
                  <Button variant="outline" className="w-full group" asChild>
                    <a href="https://evidanseparis.com/" target="_blank" rel="noopener noreferrer">
                      Evidanse Paris
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Caterers Section */}
              <Card className="shadow-lg border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Utensils className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline text-2xl">
                    <EditableText path="services.imposed_caterer_title" value={t.services.imposed_caterer_title} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    <EditableText path="services.imposed_caterer_desc" value={t.services.imposed_caterer_desc} />
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <a href="https://www.gauthier-traiteur.fr/" target="_blank" rel="noopener noreferrer" 
                       className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group text-sm">
                      <span>Gauthier Traiteur</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a href="https://grandchemintraiteur.fr/" target="_blank" rel="noopener noreferrer"
                       className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group text-sm">
                      <span>Grand Chemin Traiteur</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a href="https://www.epicura-receptions.fr/" target="_blank" rel="noopener noreferrer"
                       className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group text-sm">
                      <span>Epicura Réceptions</span>
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              <EditableText path="services.optional_title" value={t.services.optional_title} />
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              <EditableText path="services.optional_subtitle" value={t.services.optional_subtitle} />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {optionalServices.map((service, index) => {
              const image = getImageById(service.imageId);
              return(
              <Dialog key={service.title} open={openDialog === service.title} onOpenChange={(open) => setOpenDialog(open ? service.title : null)}>
                <DialogTrigger asChild>
                  <Card
                    className="flex flex-col transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer animate-in fade-in slide-in-from-bottom-8"
                    style={{ animationDelay: `${600 + index * 200}ms` }}
                  >
                    <CardHeader>
                      {image && (
                        <CardImage
                          src={image.imageUrl}
                          alt={image.description}
                          width={600}
                          height={400}
                          dataAiHint={image.imageHint}
                          aspectRatio="landscape"
                          overlay={true}
                          overlayContent={
                            <div className="text-center text-white">
                              <p className="text-sm font-medium">
                                <EditableText path="services.learn_more" value={t.services.learn_more} />
                              </p>
                            </div>
                          }
                          className="mb-4"
                        />
                      )}
                      <CardTitle className="font-headline text-2xl">
                        <EditableText path={`services.${service.keyPrefix}_title`} value={service.title} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground line-clamp-3">
                         <EditableText path={`services.${service.keyPrefix}_desc`} value={service.description} />
                      </p>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-headline text-3xl">
                      <EditableText path={`services.${service.keyPrefix}_title`} value={service.title} />
                    </DialogTitle>
                  </DialogHeader>

                  {/* Image en grand dans le popup */}
                  {image && (
                    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                      <AnimatedImage
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        overrideKey={image.id}
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Description complète */}
                  <div className="text-base text-foreground space-y-4">
                    <div className="text-lg leading-relaxed">
                      <EditableText path={`services.${service.keyPrefix}_desc`} value={service.description} multiline />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
