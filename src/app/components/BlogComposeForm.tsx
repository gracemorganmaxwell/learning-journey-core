"use client";

import { useState } from "react";

import { submitPost } from "@/app/actions/blog";
import styles from "../pages/blog-compose.module.css";

export function BlogComposeForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [bodyMd, setBodyMd] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const result = await submitPost({
        title,
        slug,
        excerpt,
        bodyMd,
        published,
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setMessage(
        published
          ? `Published "${title}" at /desktop/${result.slug}`
          : `Saved draft "${title}". Check "Publish" and submit again to make it visible.`,
      );
      setTitle("");
      setSlug("");
      setExcerpt("");
      setBodyMd("");
      setPublished(false);
    } catch (submitError) {
      console.error(submitError);
      setError("Something went wrong while saving the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.field}>
        <span>Title</span>
        <input
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </label>

      <label className={styles.field}>
        <span>Slug</span>
        <input
          name="slug"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder="my-first-post"
          required
        />
      </label>

      <label className={styles.field}>
        <span>Excerpt</span>
        <textarea
          name="excerpt"
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          rows={3}
        />
      </label>

      <label className={styles.field}>
        <span>Body (Markdown)</span>
        <textarea
          name="bodyMd"
          value={bodyMd}
          onChange={(event) => setBodyMd(event.target.value)}
          rows={16}
          required
        />
      </label>

      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={published}
          onChange={(event) => setPublished(event.target.checked)}
        />
        <span>Publish immediately</span>
      </label>

      {error ? <p className={styles.error}>{error}</p> : null}
      {message ? <p className={styles.success}>{message}</p> : null}

      <button type="submit" disabled={loading}>
        {loading ? "Saving…" : "Save post"}
      </button>
    </form>
  );
}
