import styles from "@/app/pages/composeblog.module.css";

type ComposeBlogLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  backToList?: boolean;
};

export function ComposeBlogLayout({
  title,
  description,
  children,
  backToList = false,
}: ComposeBlogLayoutProps) {
  return (
    <div className={styles.shell}>
      <header className={styles.topBar}>
        <div className={styles.topBarInner}>
          <a href="/" className={styles.brand}>
            <img src="/logo.png" alt="" className={styles.brandLogo} width={28} height={28} />
            <span className={styles.brandText}>Learning Journey</span>
          </a>
          <nav className={styles.topNav} aria-label="Admin">
            <a href="/desktop">Desktop</a>
            <a href="/composeblog" aria-current={backToList ? undefined : "page"}>
              Compose
            </a>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div>
            {backToList ? (
              <a href="/composeblog" className={styles.backLink}>
                ← All posts
              </a>
            ) : null}
            <h1>{title}</h1>
            {description ? <p className={styles.lead}>{description}</p> : null}
          </div>
        </div>

        <div className={styles.card}>{children}</div>
      </main>
    </div>
  );
}
