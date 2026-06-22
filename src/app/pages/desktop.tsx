import { listPublishedPosts } from "@/db";
import { formatDate } from "@/app/lib/markdown";
import styles from "./desktop.module.css";

export async function DesktopPage() {
  const posts = await listPublishedPosts();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Learning Journey</h1>
        <p>Published posts from your learning journey.</p>
        <nav className={styles.nav}>
          <a href="/blogcompose">Compose a post</a>
          {" · "}
          <a href="/">Home</a>
        </nav>
      </header>

      {posts.length === 0 ? (
        <p className={styles.empty}>
          No published posts yet.{" "}
          <a href="/blogcompose">Write your first post</a>.
        </p>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.slug} className={styles.item}>
              <h2>
                <a href={`/desktop/${post.slug}`}>{post.title}</a>
              </h2>
              <p className={styles.meta}>{formatDate(post.created_at)}</p>
              {post.excerpt ? (
                <p className={styles.excerpt}>{post.excerpt}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
