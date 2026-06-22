import styles from "./landing.module.css";

export function LandingPage() {
  return (
    <main className={styles.page}>
      <h1>Learning Journey</h1>
      <p>Phase A: minimal blog CMS on Cloudflare Workers.</p>
      <ul className={styles.links}>
        <li>
          <a href="/desktop">Desktop — read published posts</a>
        </li>
        <li>
          <a href="/blogcompose">Blog Compose — author posts</a>
        </li>
      </ul>
    </main>
  );
}
