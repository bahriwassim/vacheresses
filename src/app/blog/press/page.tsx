"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/hooks/use-locale";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardImage } from "@/components/ui/animated-image";

export default function PressPage() {
  const { t, locale } = useLocale();

  // Sample press articles data
  const pressArticles = [
    {
      id: 1,
      title: {
        fr: "Un mariage de conte de fées au Manoir de Vacheresses",
        en: "A Fairytale Wedding at Manoir de Vacheresses",
      },
      publication: { fr: "Vogue Mariages", en: "Vogue Weddings" },
      date: { fr: "15 Juin 2024", en: "June 15, 2024" },
      excerpt: {
        fr: "Découvrez comment ce couple a célébré leur union dans l'un des plus beaux domaines de France.",
        en: "Discover how this couple celebrated their union at one of France’s most beautiful estates.",
      },
      image: "/vacheresses_7.jpg"
    },
    {
      id: 2,
      title: {
        fr: "Les 10 plus beaux lieux de mariage en Île-de-France",
        en: "Top 10 Wedding Venues in Île-de-France",
      },
      publication: { fr: "Elle Décoration", en: "Elle Decoration" },
      date: { fr: "3 Mars 2024", en: "March 3, 2024" },
      excerpt: {
        fr: "Le Manoir de Vacheresses figure parmi les destinations les plus prisées pour les mariages élégants.",
        en: "Manoir de Vacheresses ranks among the most sought-after destinations for elegant weddings.",
      },
      image: "/vacheresses_20.jpg"
    },
    {
      id: 3,
      title: {
        fr: "Destination Wedding: Le charme français à l'état pur",
        en: "Destination Wedding: Pure French Charm",
      },
      publication: { fr: "Bridal Magazine", en: "Bridal Magazine" },
      date: { fr: "22 Janvier 2024", en: "January 22, 2024" },
      excerpt: {
        fr: "Pourquoi les couples internationaux choisissent le Manoir de Vacheresses pour leurs unions.",
        en: "Why international couples choose Manoir de Vacheresses for their unions.",
      },
      image: "/espace_1.jpg"
    },
    {
      id: 4,
      title: {
        fr: "Mariages Intimes: Une tendance en pleine expansion",
        en: "Intimate Weddings: A Growing Trend",
      },
      publication: { fr: "Marie Claire", en: "Marie Claire" },
      date: { fr: "8 Novembre 2023", en: "November 8, 2023" },
      excerpt: {
        fr: "Comment le Manoir de Vacheresses réinvente le mariage intimiste avec élégence.",
        en: "How Manoir de Vacheresses reinvents intimate weddings with elegance.",
      },
      image: "/potager_4.jpg"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-7xl">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <p className="text-sm md:text-base tracking-wider text-primary uppercase font-semibold">
              {t.blog.title}
            </p>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">
              {t.blog.pressTitle}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t.blog.pressSubtitle}
            </p>
          </div>

          {/* Press Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {pressArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative h-48">
                  <CardImage
                    src={article.image}
                    alt={article.title[locale]}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="text-sm text-primary font-medium mb-2">{article.publication[locale]} • {article.date[locale]}</div>
                  <CardTitle className="font-headline text-xl">{article.title[locale]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{article.excerpt[locale]}</p>
                  <Button variant="outline" size="sm">
                    {t.blog.readMore}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild>
              <Link href="/blog">← {t.blog.backToBlog}</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
