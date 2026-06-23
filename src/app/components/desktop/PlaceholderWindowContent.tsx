"use client";

import styles from "./PlaceholderWindowContent.module.css";

type PlaceholderWindowContentProps = {
  title: string;
  body: string;
};

export function PlaceholderWindowContent({
  title,
  body,
}: PlaceholderWindowContentProps) {
  return (
    <div className={styles.placeholder}>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
}
