
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

          {/* Other Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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

          {/* Press & Media Section */}
          <div className="mt-24 pt-16 border-t border-primary/10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Press & Media</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Discover the press features highlighting Domaine des Vacheresses
              </p>
              <Button asChild size="lg" className="shadow-lg">
                <Link href="/blog/press">View press articles</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => {
                const imgMap: Record<number, string> = { 1: '/vacheresses_7.jpg', 2: '/vacheresses_20.jpg', 3: '/espace_1.jpg', 4: '/potager_4.jpg' };
                return (
                  <Card key={i} className="overflow-hidden flex flex-col h-full shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 w-full">
                      <CardImage 
                        src={imgMap[i]} 
                        alt={`Press Article ${i}`} 
                        fill 
                        className="object-cover" 
                        overrideKey={`press_article_${i}`}
                      />
                    </div>
                    <CardContent className="flex-1 p-6 flex flex-col bg-card">
                      <div className="flex justify-between items-center mb-3 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        <EditableText path={`press.article_${i}_pub`} value={(t.press as any)[`article_${i}_pub`]} />
                        <EditableText path={`press.article_${i}_date`} value={(t.press as any)[`article_${i}_date`]} />
                      </div>
                      <h3 className="text-lg font-bold mb-3 leading-tight line-clamp-2 text-primary">
                        <EditableText path={`press.article_${i}_title`} value={(t.press as any)[`article_${i}_title`]} />
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1 italic">
                        <EditableText path={`press.article_${i}_excerpt`} value={(t.press as any)[`article_${i}_excerpt`]} multiline />
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
