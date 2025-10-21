
"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/hooks/use-locale";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { getBlogImages, getImageById } from "@/lib/vacheresses-images";
import { Button } from "@/components/ui/button";
import { CardImage } from "@/components/ui/animated-image";

export default function BlogPage() {
  const { t, locale } = useLocale();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {t.blog.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              {t.blog.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => {
              const image = getImageById(post.imageId);
              return (
                <Card 
                  key={post.slug} 
                  className="flex flex-col overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl animate-in fade-in slide-in-from-bottom-8"
                  style={{ animationDelay: `${300 + index * 200}ms` }}
                >
                  {image && (
                     <Link href={`/blog/${post.slug}`} className="block">
                        <CardImage
                          src={image.imageUrl}
                          alt={image.description}
                          width={600}
                          height={400}
                          dataAiHint={image.imageHint}
                          aspectRatio="landscape"
                          hoverEffect="scale"
                          className="h-64"
                        />
                    </Link>
                  )}
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title[locale]}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">{post.summary[locale]}</p>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0">
                      <Link href={`/blog/${post.slug}`}>{t.blog.readMore}</Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
