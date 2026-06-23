import { ComposeBlogLayout } from "@/app/components/ComposeBlogLayout";
import styles from "./composeblog.module.css";

export function BlogComposeRedirectPage() {
  return (
    <ComposeBlogLayout title="Moved" backToList>
      <p className={styles.redirect}>
        This URL moved to <a href="/composeblog">/composeblog</a>.
      </p>
    </ComposeBlogLayout>
  );
}
