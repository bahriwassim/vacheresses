
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useLocale } from "@/hooks/use-locale";
import { EditableText } from "@/components/ui/editable-text";

const testimonialsData = (t: any) => [
  {
    name: "Alex & Jordan",
    avatar: "AJ",
    image: "/se_marier_3.jpg",
    quote: t.testimonials.quote_1,
  },
  {
    name: "Alex & Jordan",
    avatar: "SC",
    image: "/vacheresses_7.jpg",
    quote: t.testimonials.quote_2,
  },
  {
    name: "Michael & David",
    avatar: "MD",
    image: "/vacheresses_20.jpg",
    quote: t.testimonials.quote_3,
  },
  {
    name: "Emma & Lucas",
    avatar: "EL",
    image: "/espace_4.jpg",
    quote: t.testimonials.quote_4,
  },
  {
    name: "Sophie & Claire",
    avatar: "SC",
    image: "/espace_1.jpg",
    quote: t.testimonials.quote_5,
  },
  {
    name: "Marie & Thomas",
    avatar: "MT",
    image: "/espace_5.jpg",
    quote: t.testimonials.quote_6,
  },
];

export function Testimonials() {
    const { t } = useLocale();
    const testimonials = testimonialsData(t);

  return (
    <section id="testimonials" className="py-12 md:py-20">
      <div className="container max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <EditableText path="testimonials.title" value={t.testimonials.title} />
          </h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <EditableText path="testimonials.subtitle" value={t.testimonials.subtitle} />
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col justify-between transition-all duration-500 hover-lift hover-glow hover:border-primary/30 animate-in fade-in slide-in-from-bottom-8"
                        style={{ animationDelay: `${index * 200}ms` }}>
                    <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                      <p className="text-muted-foreground italic mb-6">
                        “<EditableText path={`testimonials.quote_${index + 1}`} value={testimonial.quote} />”
                      </p>
                      <div className="flex items-center gap-4">
                        <Avatar className="ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-4 group-hover:ring-primary/40 hover:scale-110">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} className="object-cover" />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
