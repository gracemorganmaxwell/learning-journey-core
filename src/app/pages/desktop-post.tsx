import { getPostBySlug } from "@/db";
import { formatDate, renderMarkdownToHtml } from "@/app/lib/markdown";
import styles from "./desktop.module.css";

type DesktopPostPageProps = {
  params: { slug: string };
};

export async function DesktopPostPage({ params }: DesktopPostPageProps) {
  const post = await getPostBySlug(params.slug, { publishedOnly: true });

  if (!post) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <h1>Post not found</h1>
          <nav className={styles.nav}>
            <a href="/desktop">Back to posts</a>
          </nav>
        </header>
      </main>
    );
  }

  const html = renderMarkdownToHtml(post.body_md);

  return (
    <main className={styles.page}>
      <nav className={styles.nav}>
        <a href="/desktop">← All posts</a>
      </nav>
      <article className={styles.article}>
        <h1>{post.title}</h1>
        <p className={styles.meta}>{formatDate(post.created_at)}</p>
        {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
        <div
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </main>
  );
}
