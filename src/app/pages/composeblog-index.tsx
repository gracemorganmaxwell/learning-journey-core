import { listAllPosts } from "@/db";
import { ComposeBlogLayout } from "@/app/components/ComposeBlogLayout";
import { formatDate } from "@/app/lib/markdown";
import styles from "./composeblog.module.css";

export async function ComposeBlogIndexPage() {
  const posts = await listAllPosts();

  return (
    <ComposeBlogLayout
      title="Compose blog"
      description="Create, edit, and publish posts. Only published posts appear on the public desktop."
    >
      <div className={styles.toolbar}>
        <p className={styles.postCount}>
          {posts.length === 0
            ? "No posts yet"
            : `${posts.length} post${posts.length === 1 ? "" : "s"}`}
        </p>
        <a href="/composeblog/new" className={styles.btn}>
          New post
        </a>
      </div>

      {posts.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Start your first post</p>
          <p>Drafts stay private until you check Published.</p>
          <a href="/composeblog/new" className={styles.btn}>
            Create post
          </a>
        </div>
      ) : (
        <div className={styles.tableWrap}>
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
                    <span className={styles.postTitle}>{post.title}</span>
                    <span className={styles.meta}>/{post.slug}</span>
                  </td>
                  <td>
                    {post.published ? (
                      <span className={styles.badgePublished}>Published</span>
                    ) : (
                      <span className={styles.badgeDraft}>Draft</span>
                    )}
                  </td>
                  <td>{formatDate(post.updated_at)}</td>
                  <td>
                    <div className={styles.rowActions}>
                      <a href={`/composeblog/edit/${post.id}`}>Edit</a>
                      {post.published ? (
                        <a
                          href={`/desktop/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View on desktop
                        </a>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ComposeBlogLayout>
  );
}
