
"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/hooks/use-locale";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { getImageById } from "@/lib/vacheresses-images";
import { Button } from "@/components/ui/button";
import { CardImage } from "@/components/ui/animated-image";

export default function BlogPage() {
  const { t, locale } = useLocale();
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  const featuredImage = getImageById(featuredPost.imageId);

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

          {/* Featured Post */}
          {featuredImage && (
            <div className="mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Card className="grid md:grid-cols-2 overflow-hidden shadow-xl border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                <div className="order-2 md:order-1 flex flex-col justify-center p-8 md:p-12">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="font-headline text-3xl md:text-4xl">
                      <Link href={`/blog/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                        {featuredPost.title[locale]}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <p className="text-muted-foreground text-lg">{featuredPost.summary[locale]}</p>
                  </CardContent>
                  <div className="pt-6">
                    <Button asChild variant="link" className="p-0 text-base">
                      <Link href={`/blog/${featuredPost.slug}`}>{t.blog.readMore} &rarr;</Link>
                    </Button>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                   <Link href={`/blog/${featuredPost.slug}`} className="block h-full min-h-[300px]">
                      <CardImage
                        src={featuredImage.imageUrl}
                        alt={featuredImage.description}
                        width={600}
                        height={400}
                        fill
                        dataAiHint={featuredImage.imageHint}
                        aspectRatio="video"
                        hoverEffect="scale"
                        className="h-full"
                      />
                  </Link>
                </div>
              </Card>
            </div>
          )}


          {/* Other Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => {
              const image = getImageById(post.imageId);
              return (
                <Card 
                  key={post.slug} 
                  className="flex flex-col overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl animate-in fade-in slide-in-from-bottom-8"
                  style={{ animationDelay: `${500 + index * 150}ms` }}
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
                          className="h-56"
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

    