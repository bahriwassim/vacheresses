
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
import { EditableText } from "@/components/ui/editable-text";

export default function BlogPage() {
  const { t, locale } = useLocale();
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  const featuredImage = getImageById(featuredPost.imageId);
  const overridePath = (path: string) => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('imageOverridesByPath') : null;
      const map = raw ? JSON.parse(raw) as Record<string,string> : null;
      return map && map[path] ? map[path] : path;
    } catch {
      return path;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-7xl">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <p className="text-sm md:text-base tracking-wider text-primary uppercase font-semibold">
              <EditableText path="blog.title" value={t.blog.title} />
            </p>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">
              <EditableText path="blog.title" value={t.blog.title} />
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              <EditableText path="blog.subtitle" value={t.blog.subtitle} />
            </p>
          </div>

          {/* Featured Post */}
          {featuredImage && (
            <div className="mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Card className="grid md:grid-cols-2 overflow-hidden shadow-xl border-primary/10 hover:shadow-primary/20 transition-all duration-500 group">
                <div className="order-2 md:order-1 flex flex-col justify-center p-8 md:p-12">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="font-headline text-3xl md:text-4xl">
                      <Link href={`/blog/${featuredPost.slug}`} className="hover:text-primary transition-colors duration-300">
                        {featuredPost.title[locale]}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <p className="text-muted-foreground text-lg line-clamp-3">{featuredPost.summary[locale]}</p>
                  </CardContent>
                  <div className="pt-6">
                    <Button asChild variant="link" className="p-0 text-base group-hover:text-primary transition-colors duration-300">
                      <Link href={`/blog/${featuredPost.slug}`}>{t.blog.readMore} &rarr;</Link>
                    </Button>
                  </div>
                </div>
                <div className="order-1 md:order-2 overflow-hidden">
                   <Link href={`/blog/${featuredPost.slug}`} className="block h-full min-h-[300px]">
                      <CardImage
                        src={featuredImage.imageUrl}
                        alt={featuredImage.description}
                        fill
                        dataAiHint={featuredImage.imageHint}
                        className="h-full transition-transform duration-500 group-hover:scale-105"
                      />
                  </Link>
                </div>
              </Card>
            </div>
          )}

          {/* Press Section Link */}
          <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Card className="inline-block max-w-2xl mx-auto p-8 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="font-headline text-2xl mb-2">{t.blog.pressTitle}</CardTitle>
                <CardDescription>
                  {t.blog.pressSubtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/blog/press">{t.blog.pressButton}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Photo Gallery */}
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-4">{t.blog.momentsTitle}</h2>
            <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
              {t.blog.momentsSubtitle}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                '/vacheresses_7.jpg', '/vacheresses_13.jpg', '/vacheresses_17.jpg', '/vacheresses_20.jpg',
                '/salle_reception_6.jpg', '/salle_reception_7.jpg', '/salle_reception_8.jpg', '/salle_reception_9.jpg',
                '/Parc_1.jpg', '/Parc_2.jpg', '/Parc_3.jpg', '/preau_verger_1.jpg',
                '/espace_1.jpg', '/espace_2_(1).jpg', '/espace_4.jpg', '/espace_5.jpg'
              ].map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                  <CardImage
                    src={overridePath(img)}
                    alt={`Mariage ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Other Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => {
              const image = getImageById(post.imageId);
              return (
                <Card 
                  key={post.slug} 
                  className="flex flex-col overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 group"
                  style={{ animationDelay: `${500 + index * 150}ms` }}
                >
                  {image && (
                     <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
                        <CardImage
                          src={image.imageUrl}
                          alt={image.description}
                          width={600}
                          height={400}
                          dataAiHint={image.imageHint}
                          aspectRatio="landscape"
                          className="h-56 transition-transform duration-500 group-hover:scale-105"
                        />
                    </Link>
                  )}
                  <div className="flex flex-col flex-grow p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="font-headline text-2xl">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title[locale]}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-1">
                      <p className="text-muted-foreground line-clamp-2">{post.summary[locale]}</p>
                    </CardContent>
                    <div className="pt-4 mt-auto">
                      <Button asChild variant="link" className="p-0">
                        <Link href={`/blog/${post.slug}`}>
                          <EditableText path="blog.readMore" value={t.blog.readMore} />
                        </Link>
                      </Button>
                    </div>
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
