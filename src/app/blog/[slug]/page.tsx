
"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLocale } from "@/hooks/use-locale";
import { blogPosts, BlogPost } from "@/lib/blog-posts";
import { getImageById, VacheressesImage } from "@/lib/vacheresses-images";
import { HeroImage, CardImage } from "@/components/ui/animated-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t, locale } = useLocale();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }
  
  const suggestedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3);
  const image = getImageById(post.imageId);
  const galleryImages = post.galleryImageIds?.map(id => getImageById(id)).filter((img): img is VacheressesImage => !!img);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <article>
          <header className="relative py-24 md:py-48">
            {image && (
              <HeroImage
                src={image.imageUrl}
                alt={image.description}
                fill
                priority={true}
                className="brightness-50"
              />
            )}
            <div className="relative z-10 container max-w-4xl text-center text-white">
              <CardTitle className="text-4xl md:text-6xl font-headline font-bold drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {post.title[locale]}
              </CardTitle>
              <p className="mt-4 text-lg md:text-xl text-white/80 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 max-w-2xl mx-auto">{post.summary[locale]}</p>
            </div>
          </header>

          <div className="py-12 md:py-20">
            <div className="container max-w-3xl">
              <div className="mb-8">
                <Button asChild variant="ghost">
                  <Link href="/blog" className="flex items-center text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    {t.blog.backToBlog}
                  </Link>
                </Button>
              </div>

              <div className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-headline prose-headings:text-primary prose-headings:text-3xl prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-p:leading-relaxed prose-p:text-muted-foreground"
                   dangerouslySetInnerHTML={{ __html: post.content[locale] }}>
              </div>
              
              {galleryImages && galleryImages.length > 0 && (
                <div className="my-12">
                    <div className="grid grid-cols-2 gap-4">
                        {galleryImages.map((img, i) => (
                            <div key={i} className="relative h-64 md:h-96 overflow-hidden rounded-lg group">
                                <Image
                                src={img.imageUrl}
                                alt={img.description}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
              )}

            </div>
          </div>
          
          {/* Suggested Articles */}
          <Separator />
          <div className="py-12 md:py-20 bg-secondary/30">
            <div className="container max-w-7xl">
              <h3 className="text-3xl font-headline font-bold text-center mb-8">Vous aimerez aussi...</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {suggestedPosts.map((suggestedPost) => {
                  const suggestedImage = getImageById(suggestedPost.imageId);
                  return (
                    <Card key={suggestedPost.slug} className="flex flex-col overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2 group">
                      {suggestedImage && (
                        <Link href={`/blog/${suggestedPost.slug}`} className="block overflow-hidden">
                          <CardImage
                            src={suggestedImage.imageUrl}
                            alt={suggestedImage.description}
                            width={600}
                            height={400}
                            dataAiHint={suggestedImage.imageHint}
                            aspectRatio="landscape"
                            className="h-56 transition-transform duration-500 group-hover:scale-105"
                          />
                        </Link>
                      )}
                      <div className="flex flex-col flex-grow p-6">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="font-headline text-2xl">
                            <Link href={`/blog/${suggestedPost.slug}`} className="hover:text-primary transition-colors">
                              {suggestedPost.title[locale]}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 flex-1">
                          <p className="text-muted-foreground line-clamp-2">{suggestedPost.summary[locale]}</p>
                        </CardContent>
                        <div className="pt-4 mt-auto">
                          <Button asChild variant="link" className="p-0">
                            <Link href={`/blog/${suggestedPost.slug}`}>{t.blog.readMore}</Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

        </article>
      </main>
      <Footer />
    </div>
  );
}

    