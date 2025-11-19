
"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, PlusCircle } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { Separator } from "@/components/ui/separator";
import { getServiceImages, getImageById } from "@/lib/vacheresses-images";
import { CardImage } from "@/components/ui/animated-image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";

export default function ServicesPage() {
  const { t } = useLocale();
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const includedServices = [
    t.services.included_1,
    t.services.included_2,
    t.services.included_3,
    t.services.included_4,
    t.services.included_5,
    t.services.included_6,
  ];

  const optionalServices = [
    { imageId: "service-preau-1", title: t.services.option_rolls_title, description: t.services.option_rolls_desc },
    { imageId: "service-preau-2", title: t.services.option_lanterns_title, description: t.services.option_lanterns_desc },
    { imageId: "service-preau-3", title: t.services.option_chairs_title, description: t.services.option_chairs_desc },
    { imageId: "service-preau-4", title: t.services.option_bbq_title, description: t.services.option_bbq_desc },
    { imageId: "service-preau-5", title: t.services.option_flowers_title, description: t.services.option_flowers_desc },
    { imageId: "service-preau-verger-1", title: t.services.option_balloon_title, description: t.services.option_balloon_desc },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {t.services.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              {t.services.subtitle}
            </p>
          </div>

          <Card className="shadow-lg mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <CardHeader>
              <CardTitle className="font-headline">{t.services.included_title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {includedServices.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{service}</p>
                  </li>
                ))}
              </ul>
              <Separator className="my-8"/>
              <div className="flex items-center">
                 <PlusCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                 <div>
                    <h3 className="font-semibold">{t.services.caterer_title}</h3>
                    <p className="text-muted-foreground">{t.services.caterer_desc}</p>
                 </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              {t.services.optional_title}
            </h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
              {t.services.optional_subtitle}
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
                              <p className="text-sm font-medium">{t.services.learn_more}</p>
                            </div>
                          }
                          className="mb-4"
                        />
                      )}
                      <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground line-clamp-3">{service.description}</p>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm font-semibold text-primary">{t.services.on_request}</p>
                    </CardFooter>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-headline text-3xl">{service.title}</DialogTitle>
                  </DialogHeader>

                  {/* Image en grand dans le popup */}
                  {image && (
                    <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Description complète */}
                  <DialogDescription className="text-base text-foreground space-y-4">
                    <p className="text-lg leading-relaxed">{service.description}</p>

                    <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <p className="text-sm font-semibold text-primary text-center">
                        {t.services.on_request}
                      </p>
                    </div>
                  </DialogDescription>
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
