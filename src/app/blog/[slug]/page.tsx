
"use client";

import { useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLocale } from "@/hooks/use-locale";
import { blogPosts, BlogPost } from "@/lib/blog-posts";
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
      <main className="flex-1 py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <Button asChild variant="ghost">
                <Link href="/blog" className="flex items-center text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    {t.blog.backToBlog}
                </Link>
            </Button>
          </div>
          <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <CardHeader>
              {image && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <HeroImage
                    src={image.imageUrl}
                    alt={image.description}
                    width={1200}
                    height={675}
                    dataAiHint={image.imageHint}
                    priority={true}
                    aspectRatio="video"
                    parallax={false}
                  />
                </div>
              )}
              <CardTitle className="text-3xl md:text-4xl font-headline font-bold">{post.title[locale]}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none"
                   dangerouslySetInnerHTML={{ __html: post.content[locale] }}>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
