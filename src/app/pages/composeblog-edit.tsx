import { getPostById } from "@/db";
import { BlogComposeForm } from "@/app/components/BlogComposeForm";
import styles from "./composeblog.module.css";

type ComposeBlogEditPageProps = {
  params: { id: string };
};

export async function ComposeBlogEditPage({ params }: ComposeBlogEditPageProps) {
  const postId = Number.parseInt(params.id, 10);
  if (!Number.isInteger(postId) || postId < 1) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <h1>Invalid post</h1>
          <nav className={styles.nav}>
            <a href="/composeblog">← All posts</a>
          </nav>
        </header>
      </main>
    );
  }

  const post = await getPostById(postId);
  if (!post) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <h1>Post not found</h1>
          <nav className={styles.nav}>
            <a href="/composeblog">← All posts</a>
          </nav>
        </header>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Edit post</h1>
        <nav className={styles.nav}>
          <a href="/composeblog">← All posts</a>
        </nav>
      </header>
      <BlogComposeForm
        mode="edit"
        postId={post.id}
        initialTitle={post.title}
        initialSlug={post.slug}
        initialExcerpt={post.excerpt}
        initialBodyMd={post.body_md}
        initialPublished={post.published === 1}
      />
    </main>
  );
}
