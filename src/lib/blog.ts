import { getCollection } from "astro:content";

export async function getAllPosts() {
  const localPosts = await getCollection("blog");

  // Calculate reading time and prepare data
  const enhancedLocalPosts = localPosts.map((post) => {
    // If post.body exists (Astro v2/v3 collection entry), we calculate it.
    // Astro v4+ changes this slightly, but we can fallback if body isn't there.
    const bodyText = post.body || "";
    const wordCount = bodyText.split(/\s+/g).length;
    const readingTime = Math.ceil(wordCount / 200); // ~200 words per minute
    const slug = post.id.replace(/\.md$/, "");
    return {
      id: post.id.replace(/\.md$/, ""),
      slug: slug,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      heroImage: post.data.heroImage,
      tags: post.data.tags || [],
      readingTime: `${readingTime || 1} min read`,
      isExternal: false,
    };
  });

  return enhancedLocalPosts.sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
  );
}
