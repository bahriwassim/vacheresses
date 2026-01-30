
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/use-locale";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EditableText } from "@/components/ui/editable-text";

export function DomainTeaser() {
  const { t } = useLocale();

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-background to-secondary/30">
      <div className="container max-w-6xl">
        <Card className="shadow-2xl border-primary/20 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h2 className="text-3xl md:text-5xl font-headline font-bold text-primary">
                  <EditableText path="domain.spirit_title" value={t.domain.spirit_title} />
                </h2>
                <p className="text-sm md:text-base tracking-wider text-muted-foreground uppercase">
                  <EditableText path="domain.subtitle" value={t.domain.subtitle} />
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  <EditableText path="domain.spirit_content_1" value={t.domain.spirit_content_1} multiline />
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  <EditableText path="domain.spirit_content_2" value={t.domain.spirit_content_2} multiline />
                </p>
              </div>

              <div className="pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                <Button asChild size="lg" className="group">
                  <Link href="/domaine" className="flex items-center gap-2">
                    <EditableText path="domain.discover_more" value={t.domain.discover_more} />
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
