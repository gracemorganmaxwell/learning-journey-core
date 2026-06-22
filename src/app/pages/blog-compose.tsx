import { BlogComposeForm } from "@/app/components/BlogComposeForm";
import styles from "./blog-compose.module.css";

export function BlogComposePage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Blog Compose</h1>
        <p>Author and publish learning journey posts.</p>
        <nav className={styles.nav}>
          <a href="/desktop">View published posts</a>
          {" · "}
          <a href="/">Home</a>
        </nav>
      </header>
      <BlogComposeForm />
    </main>
  );
}
