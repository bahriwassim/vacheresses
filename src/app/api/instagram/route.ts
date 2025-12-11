import { NextResponse } from 'next/server';
import { scrapeInstagramImages } from '@/lib/instagram-scraper';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

// Instagram username
const INSTAGRAM_USERNAME = 'manoirdevacheresses';

export async function GET() {
  try {
    // Scrape 3 images directly from Instagram
    const posts = await scrapeInstagramImages(INSTAGRAM_USERNAME, 3);

    if (posts.length === 0) {
      throw new Error('No posts found');
    }

    return NextResponse.json({
      posts,
      fallback: false
    });

  } catch (error) {
    console.error('Error fetching Instagram posts:', error);

    // Return fallback mode
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch Instagram posts',
        fallback: true,
        posts: []
      },
      { status: 200 }
    );
  }
}
