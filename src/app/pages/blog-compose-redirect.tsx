import styles from "./composeblog.module.css";

export function BlogComposeRedirectPage() {
  return (
    <main className={styles.page}>
      <p>
        This URL moved to <a href="/composeblog">/composeblog</a>.
      </p>
    </main>
  );
}
