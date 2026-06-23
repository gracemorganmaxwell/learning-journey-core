import { getPostBySlug, listPublishedPosts } from "@/db";
import { DesktopExperience } from "@/app/components/desktop/DesktopExperience";
import { formatDate, renderMarkdownToHtml } from "@/app/lib/markdown";
import type { DesktopPostView } from "@/app/lib/desktop-posts";

import { fetchChristchurchCurrent } from "@/app/lib/weather";

type DesktopPostPageProps = {
  params: { slug: string };
};

async function loadDesktopPosts(): Promise<DesktopPostView[]> {
  const rows = await listPublishedPosts();
  return rows.map((row) => ({
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    dateLabel: formatDate(row.created_at),
    html: renderMarkdownToHtml(row.body_md),
  }));
}

export async function DesktopPostPage({ params }: DesktopPostPageProps) {
  const post = await getPostBySlug(params.slug, { publishedOnly: true });

  if (!post) {
    return (
      <main style={{ padding: "2rem", fontFamily: "Tahoma, sans-serif" }}>
        <h1>Post not found</h1>
        <p>
          <a href="/desktop">Back to desktop</a>
        </p>
      </main>
    );
  }

  const [posts, weather] = await Promise.all([
    loadDesktopPosts(),
    fetchChristchurchCurrent(),
  ]);

  return (
    <DesktopExperience
      posts={posts}
      weather={weather}
      initialWindow="blog"
      initialBlogSlug={params.slug}
    />
  );
}
