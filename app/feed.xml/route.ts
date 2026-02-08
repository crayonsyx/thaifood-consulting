import { siteConfig } from "@/lib/constants";
import { getPublishedPosts } from "@/lib/content";

export const revalidate = 60;

export async function GET() {
  let posts: { title: string; slug: string; date: string; excerpt: string | null }[] = [];

  try {
    const allPosts = await getPublishedPosts();
    posts = allPosts.map((p) => ({
      title: p.title,
      slug: p.slug,
      date: p.date,
      excerpt: p.excerpt ?? null,
    }));
  } catch {
    // Content not yet built
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name}</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en</language>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || ""}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
