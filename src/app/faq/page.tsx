"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import Link from "next/link";

export default function FAQPage() {
  const { t, locale } = useLocale();

  const faqItems = [
    {
      id: "booking",
      question: {
        en: "How do I book a wedding date at the Manor?",
        fr: "Comment réserver une date de mariage au Manoir ?"
      },
      answer: {
        en: "To book a wedding date, please contact us directly via email or phone. We recommend booking at least 12-18 months in advance for popular dates. A 50% deposit is required to secure your date, with the balance due 30 days before the event.",
        fr: "Pour réserver une date de mariage, veuillez nous contacter directement par email ou téléphone. Nous recommandons de réserver au moins 12-18 mois à l'avance pour les dates prisées. Un acompte de 50% est requis pour sécuriser votre date, le solde étant dû 30 jours avant l'événement."
      }
    },
    {
      id: "packages",
      question: {
        en: "What's included in your wedding packages?",
        fr: "Que comprennent vos forfaits de mariage ?"
      },
      answer: {
        en: "Our wedding packages include venue rental, seating arrangements, basic floral decorations, and access to all estate facilities for your event duration. Premium and Luxury packages include additional services like catering coordination, enhanced floral design, and entertainment options. All packages include accommodation for 21 guests in the estate.",
        fr: "Nos forfaits de mariage comprennent la location du lieu, les aménagements de sièges, les décorations florales de base et l'accès à toutes les installations du domaine pendant la durée de votre événement. Les forfaits Premium et Luxe incluent des services supplémentaires comme la coordination du traiteur, une conception florale améliorée et des options de divertissement. Tous les forfaits incluent l'hébergement pour 21 invités dans le domaine."
      }
    },
    {
      id: "guests",
      question: {
        en: "How many guests can the Manor accommodate?",
        fr: "Combien d'invités le Manoir peut-il accueillir ?"
      },
      answer: {
        en: "Our estate can comfortably accommodate up to 200 guests for a seated dinner. The exact capacity depends on your chosen package and layout preferences. We can also arrange additional accommodations at nearby partner hotels for larger groups.",
        fr: "Notre domaine peut accueillir confortablement jusqu'à 200 invités pour un dîner assis. La capacité exacte dépend de votre forfait choisi et de vos préférences d'aménagement. Nous pouvons également organiser des hébergements supplémentaires dans des hôtels partenaires à proximité pour des groupes plus importants."
      }
    },
    {
      id: "catering",
      question: {
        en: "Do you provide catering services?",
        fr: "Proposez-vous des services de restauration ?"
      },
      answer: {
        en: "We work with a curated list of experienced caterers who specialize in wedding events. While we don't provide catering directly, we coordinate with our preferred vendors to ensure seamless service. You're also welcome to work with your own caterer if you prefer.",
        fr: "Nous travaillons avec une liste sélectionnée de traiteurs expérimentés spécialisés dans les événements de mariage. Bien que nous ne fournissions pas directement la restauration, nous coordonnons avec nos fournisseurs préférés pour garantir un service sans faille. Vous pouvez également travailler avec votre propre traiteur si vous préférez."
      }
    },
    {
      id: "decor",
      question: {
        en: "Can I bring my own decorations?",
        fr: "Puis-je apporter mes propres décorations ?"
      },
      answer: {
        en: "Absolutely! We encourage personal touches that reflect your style. However, we ask that you coordinate with our team to ensure your decorations align with our venue guidelines and won't damage the historic property. Our team can also provide advice on what works best in our spaces.",
        fr: "Absolument ! Nous encourageons les touches personnelles qui reflètent votre style. Cependant, nous vous demandons de coordonner avec notre équipe pour vous assurer que vos décorations respectent les directives de notre lieu et n'endommageront pas la propriété historique. Notre équipe peut également vous conseiller sur ce qui fonctionne le mieux dans nos espaces."
      }
    },
    {
      id: "weather",
      question: {
        en: "What happens if it rains on my wedding day?",
        fr: "Que se passe-t-il s'il pleut le jour de mon mariage ?"
      },
      answer: {
        en: "Our estate offers both indoor and outdoor spaces, providing flexibility for weather changes. The Reception Hall, Exhibition Hall, and Courtyard can accommodate your ceremony or reception in case of rain. We also provide marquees that can be set up for additional covered areas if needed.",
        fr: "Notre domaine offre à la fois des espaces intérieurs et extérieurs, offrant une flexibilité pour les changements de temps. La Salle de Réception, la Salle d'Exposition et la Cour d'Honneur peuvent accueillir votre cérémonie ou votre réception en cas de pluie. Nous fournissons également des chapiteaux qui peuvent être installés pour des zones couvertes supplémentaires si nécessaire."
      }
    },
    {
      id: "accommodation",
      question: {
        en: "What accommodation options are available for guests?",
        fr: "Quelles options d'hébergement sont disponibles pour les invités ?"
      },
      answer: {
        en: "The Manor offers accommodation for 21 guests in our beautifully appointed rooms. For larger groups, we partner with nearby hotels and guesthouses. We can facilitate bookings at these partner accommodations and often secure preferential rates for our wedding parties.",
        fr: "Le Manoir offre un hébergement pour 21 invités dans nos chambres magnifiquement aménagées. Pour des groupes plus importants, nous collaborons avec des hôtels et des chambres d'hôtes à proximité. Nous pouvons faciliter les réservations dans ces hébergements partenaires et obtenir souvent des tarifs préférentiels pour nos groupes de mariage."
      }
    },
    {
      id: "accessibility",
      question: {
        en: "Is the Manor accessible for guests with mobility issues?",
        fr: "Le Manoir est-il accessible aux invités ayant des problèmes de mobilité ?"
      },
      answer: {
        en: "We have made efforts to accommodate guests with mobility issues. The Jardins Tivoli room is specifically designed for wheelchair access. Other areas of the estate have varying levels of accessibility due to the historic nature of the buildings. Please contact us to discuss specific requirements, and we'll do our best to accommodate your needs.",
        fr: "Nous avons fait des efforts pour accueillir les invités ayant des problèmes de mobilité. La chambre Jardins Tivoli est spécifiquement conçue pour l'accès en fauteuil roulant. D'autres zones du domaine ont des niveaux d'accessibilité variables en raison de la nature historique des bâtiments. Veuillez nous contacter pour discuter d'exigences spécifiques, et nous ferons de notre mieux pour répondre à vos besoins."
      }
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-7xl">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <p className="text-sm md:text-base tracking-wider text-primary uppercase font-semibold">
              {locale === 'en' ? 'Frequently Asked Questions' : 'Questions Fréquentes'}
            </p>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">
              {locale === 'en' ? 'FAQ' : 'FAQ'}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              {locale === 'en' 
                ? 'Find answers to common questions about weddings at Domaine des Vacheresses.' 
                : 'Trouvez les réponses aux questions courantes sur les mariages au Domaine des Vacheresses.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          {item.question[locale as keyof typeof item.question]}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">
                            {item.answer[locale as keyof typeof item.answer]}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="font-headline">
                    {locale === 'en' ? 'Still have questions?' : 'Vous avez d\'autres questions ?'}
                  </CardTitle>
                  <CardDescription>
                    {locale === 'en' 
                      ? 'Our team is here to help you plan your perfect day.' 
                      : 'Notre équipe est là pour vous aider à planifier votre journée parfaite.'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full gap-2">
                    <Link href="mailto:contact@manoirdevacheresses.com">
                      <Mail className="h-4 w-4" />
                      {locale === 'en' ? 'Email Us' : 'Nous Écrire'}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link href="tel:+33611842021">
                      <Phone className="h-4 w-4" />
                      {locale === 'en' ? 'Call Us' : 'Nous Appeler'}
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" className="w-full gap-2">
                    <Link href="/#packages">
                      <Calendar className="h-4 w-4" />
                      {locale === 'en' ? 'View Packages' : 'Voir les Forfaits'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}