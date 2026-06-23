"use client";

import { useEffect, useState } from "react";

import type { DesktopPostView } from "@/app/lib/desktop-posts";

import styles from "./BlogWindowContent.module.css";

type BlogWindowContentProps = {
  posts: DesktopPostView[];
  initialSlug?: string;
};

export function BlogWindowContent({
  posts,
  initialSlug,
}: BlogWindowContentProps) {
  const [selectedSlug, setSelectedSlug] = useState(
    initialSlug ?? posts[0]?.slug ?? "",
  );
  const [addressBar, setAddressBar] = useState(selectedSlug);

  useEffect(() => {
    if (initialSlug) {
      setSelectedSlug(initialSlug);
      setAddressBar(initialSlug);
    }
  }, [initialSlug]);

  const selected =
    posts.find((post) => post.slug === selectedSlug) ?? posts[0] ?? null;

  const navigate = () => {
    const slug = addressBar.trim().replace(/^\/blog\/?/, "");
    if (posts.some((post) => post.slug === slug)) {
      setSelectedSlug(slug);
    }
  };

  return (
    <div className={styles.blog}>
      <div className={styles.toolbar}>
        <span className={styles.addressPrefix}>https://journey/blog/</span>
        <input
          type="text"
          value={addressBar}
          onChange={(event) => setAddressBar(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") navigate();
          }}
          className={styles.addressInput}
          aria-label="Address bar"
        />
        <button type="button" onClick={navigate} className={styles.goBtn}>
          Go
        </button>
      </div>
      <div className={styles.body}>
        <aside className={`${styles.sidebar} win98Scrollbar`}>
          <p className={styles.sidebarTitle}>Posts</p>
          {posts.length === 0 ? (
            <p className={styles.empty}>No posts yet.</p>
          ) : (
            posts.map((post) => (
              <button
                key={post.slug}
                type="button"
                className={`${styles.postBtn} ${post.slug === selectedSlug ? styles.postBtnActive : ""}`}
                onClick={() => {
                  setSelectedSlug(post.slug);
                  setAddressBar(post.slug);
                }}
              >
                <span className={styles.postTitle}>{post.title}</span>
                <span className={styles.postDate}>{post.dateLabel}</span>
              </button>
            ))
          )}
        </aside>
        <article className={`${styles.article} win98Scrollbar`}>
          {selected ? (
            <>
              <h1>{selected.title}</h1>
              <time>{selected.dateLabel}</time>
              {selected.excerpt ? <p>{selected.excerpt}</p> : null}
              <div
                className={styles.prose}
                dangerouslySetInnerHTML={{ __html: selected.html }}
              />
            </>
          ) : (
            <p className={styles.empty}>No posts yet.</p>
          )}
        </article>
      </div>
    </div>
  );
}
