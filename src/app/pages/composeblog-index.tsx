import { listAllPosts } from "@/db";
import { formatDate } from "@/app/lib/markdown";
import styles from "./composeblog.module.css";

export async function ComposeBlogIndexPage() {
  const posts = await listAllPosts();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Compose blog</h1>
        <p>Create, edit, and delete posts. Only published posts appear on /desktop.</p>
      </header>

      <div className={styles.toolbar}>
        <a href="/composeblog/new">New post</a>
      </div>

      {posts.length === 0 ? (
        <p className={styles.empty}>No posts yet.</p>
      ) : (
        <table className={styles.postTable}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <strong>{post.title}</strong>
                  <br />
                  <span className={styles.meta}>/{post.slug}</span>
                </td>
                <td>
                  {post.published ? (
                    <span className={styles.statusPublished}>Published</span>
                  ) : (
                    <span className={styles.statusDraft}>Draft</span>
                  )}
                </td>
                <td>{formatDate(post.updated_at)}</td>
                <td>
                  <div className={styles.rowActions}>
                    <a href={`/composeblog/edit/${post.id}`}>Edit</a>
                    {post.published ? (
                      <a href={`/desktop/${post.slug}`} target="_blank" rel="noreferrer">
                        View
                      </a>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
