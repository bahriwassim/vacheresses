"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import Link from "next/link";
import { EditableText } from "@/components/ui/editable-text";

export default function FAQPage() {
  const { t, locale } = useLocale();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-7xl">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <p className="text-sm md:text-base tracking-wider text-primary uppercase font-semibold">
              <EditableText path="faq.subtitle" value={t.faq?.subtitle || "FAQ"} />
            </p>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">
              <EditableText path="faq.title" value={t.faq?.title || "FAQ"} />
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              <EditableText path="faq.intro" value={t.faq?.intro || ""} />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {t.faq?.items?.map((item, index) => (
                      <AccordionItem key={item.id} value={item.id}>
                        <AccordionTrigger className="text-left hover:no-underline">
                          <EditableText path={`faq.items.${index}.question`} value={item.question} />
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="text-muted-foreground">
                            <EditableText path={`faq.items.${index}.answer`} value={item.answer} multiline />
                          </div>
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
                    <EditableText path="faq.sidebarTitle" value={t.faq?.sidebarTitle || ""} />
                  </CardTitle>
                  <CardDescription>
                    <EditableText path="faq.sidebarDesc" value={t.faq?.sidebarDesc || ""} />
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild className="w-full gap-2">
                    <Link href="mailto:contact@manoirdevacheresses.com">
                      <Mail className="h-4 w-4" />
                      <EditableText path="faq.emailButton" value={t.faq?.emailButton || "Email Us"} />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full gap-2">
                    <Link href="tel:+33611842021">
                      <Phone className="h-4 w-4" />
                      <EditableText path="faq.phoneButton" value={t.faq?.phoneButton || "Call Us"} />
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" className="w-full gap-2">
                    <Link href="/#packages">
                      <Calendar className="h-4 w-4" />
                      <EditableText path="faq.viewPackages" value={t.faq?.viewPackages || "View Packages"} />
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