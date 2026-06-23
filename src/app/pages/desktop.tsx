import { listPublishedPosts } from "@/db";
import { DesktopExperience } from "@/app/components/desktop/DesktopExperience";
import { formatDate, renderMarkdownToHtml } from "@/app/lib/markdown";
import type { DesktopPostView } from "@/app/lib/desktop-posts";
import { fetchChristchurchCurrent } from "@/app/lib/weather";

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

export async function DesktopPage() {
  const [posts, weather] = await Promise.all([
    loadDesktopPosts(),
    fetchChristchurchCurrent(),
  ]);

  return <DesktopExperience posts={posts} weather={weather} />;
}
