
"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLocale } from "@/hooks/use-locale";
import { blogPosts } from "@/lib/blog-posts";
import { getImageById } from "@/lib/vacheresses-images";
import { HeroImage } from "@/components/ui/animated-image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t, locale } = useLocale();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const image = getImageById(post.imageId);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-background">
        <article>
          <header className="relative py-24 md:py-40">
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
              <p className="mt-4 text-lg text-white/80 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">{post.summary[locale]}</p>
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

              <div className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-headline prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-p:leading-relaxed"
                   dangerouslySetInnerHTML={{ __html: post.content[locale] }}>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

    