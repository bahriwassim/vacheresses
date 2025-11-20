import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

// Instagram username to scrape
const INSTAGRAM_USERNAME = 'manoirdevacheresses';

interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
}

export async function GET() {
  try {
    // Fetch Instagram profile page
    const response = await fetch(`https://www.instagram.com/${INSTAGRAM_USERNAME}/?__a=1&__d=dis`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Instagram fetch failed:', response.status);
      throw new Error(`Instagram fetch error: ${response.status}`);
    }

    const html = await response.text();

    // Extract JSON data from the HTML
    // Instagram embeds data in <script type="application/ld+json">
    const jsonMatch = html.match(/<script type="application\/ld\+json">({.*?})<\/script>/);

    let posts: InstagramPost[] = [];

    if (jsonMatch) {
      try {
        const data = JSON.parse(jsonMatch[1]);

        // Extract image posts
        if (data['@type'] === 'ProfilePage' && data.mainEntity?.interactionStatistic) {
          // Try to find recent posts in the data
          // Note: Instagram's structure may vary, this is a fallback
        }
      } catch (e) {
        console.error('Error parsing LD+JSON:', e);
      }
    }

    // Alternative: Try to extract from shared data
    const sharedDataMatch = html.match(/window\._sharedData = ({.*?});<\/script>/);

    if (sharedDataMatch) {
      try {
        const sharedData = JSON.parse(sharedDataMatch[1]);
        const userPosts = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user?.edge_owner_to_timeline_media?.edges;

        if (userPosts && Array.isArray(userPosts)) {
          posts = userPosts.slice(0, 6).map((edge: any) => {
            const node = edge.node;
            return {
              id: node.id || node.shortcode,
              caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
              mediaUrl: node.display_url || node.thumbnail_src,
              permalink: `https://www.instagram.com/p/${node.shortcode}/`,
              timestamp: new Date(node.taken_at_timestamp * 1000).toISOString(),
            };
          });
        }
      } catch (e) {
        console.error('Error parsing shared data:', e);
      }
    }

    // If we couldn't extract posts, try another method
    if (posts.length === 0) {
      // Extract image URLs directly from HTML
      const imageRegex = /"display_url":"(https:\\\/\\\/[^"]+)"/g;
      const shortcodeRegex = /"shortcode":"([^"]+)"/g;

      const imageUrls: string[] = [];
      const shortcodes: string[] = [];

      let match;
      while ((match = imageRegex.exec(html)) !== null && imageUrls.length < 6) {
        const url = match[1].replace(/\\\//g, '/');
        imageUrls.push(url);
      }

      while ((match = shortcodeRegex.exec(html)) !== null && shortcodes.length < 6) {
        shortcodes.push(match[1]);
      }

      posts = imageUrls.slice(0, 6).map((url, index) => ({
        id: shortcodes[index] || `post-${index}`,
        caption: '',
        mediaUrl: url,
        permalink: shortcodes[index] ? `https://www.instagram.com/p/${shortcodes[index]}/` : `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
        timestamp: new Date().toISOString(),
      }));
    }

    if (posts.length === 0) {
      throw new Error('No posts found');
    }

    return NextResponse.json({
      posts,
      fallback: false
    });

  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to fetch Instagram posts',
        fallback: true,
        posts: []
      },
      { status: 200 } // Return 200 to allow fallback
    );
  }
}
