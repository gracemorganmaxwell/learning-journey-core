import { BlogComposeForm } from "@/app/components/BlogComposeForm";
import styles from "./composeblog.module.css";

export function ComposeBlogNewPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>New post</h1>
        <nav className={styles.nav}>
          <a href="/composeblog">← All posts</a>
        </nav>
      </header>
      <BlogComposeForm mode="create" />
    </main>
  );
}
