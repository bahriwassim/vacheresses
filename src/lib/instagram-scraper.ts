// Simple Instagram web scraper - gets first 3 images from public profile
export async function scrapeInstagramImages(username: string, count: number = 3) {
  try {
    // Fetch Instagram profile page
    const response = await fetch(`https://www.instagram.com/${username}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Instagram page: ${response.status}`);
    }

    const html = await response.text();

    // Method 1: Extract from meta tags (most reliable)
    const metaImages: string[] = [];
    const metaRegex = /<meta property="og:image" content="([^"]+)"/g;
    let match;
    while ((match = metaRegex.exec(html)) !== null) {
      metaImages.push(match[1]);
    }

    // Method 2: Extract image URLs from embedded JSON
    const imageUrls: string[] = [];
    const shortcodes: string[] = [];

    // Look for display_url patterns
    const displayUrlRegex = /"display_url":"(https:[^"]+)"/g;
    while ((match = displayUrlRegex.exec(html)) !== null && imageUrls.length < count) {
      const url = match[1].replace(/\\u0026/g, '&').replace(/\\\//g, '/');
      if (!imageUrls.includes(url)) {
        imageUrls.push(url);
      }
    }

    // Look for shortcodes
    const shortcodeRegex = /"shortcode":"([A-Za-z0-9_-]+)"/g;
    while ((match = shortcodeRegex.exec(html)) !== null && shortcodes.length < count) {
      if (!shortcodes.includes(match[1])) {
        shortcodes.push(match[1]);
      }
    }

    // Combine results
    const posts = imageUrls.slice(0, count).map((url, index) => ({
      id: shortcodes[index] || `post-${index}`,
      mediaUrl: url,
      permalink: shortcodes[index]
        ? `https://www.instagram.com/p/${shortcodes[index]}/`
        : `https://www.instagram.com/${username}/`,
      caption: '',
      timestamp: new Date().toISOString()
    }));

    return posts;
  } catch (error) {
    console.error('Instagram scraping error:', error);
    return [];
  }
}
