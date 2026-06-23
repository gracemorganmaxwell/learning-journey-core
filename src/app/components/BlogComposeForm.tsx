"use client";

import { useState } from "react";

import {
  deletePostAction,
  submitPost,
  updatePostAction,
} from "@/app/actions/blog";
import styles from "../pages/composeblog.module.css";

export type BlogComposeFormProps = {
  mode: "create" | "edit";
  postId?: number;
  initialTitle?: string;
  initialSlug?: string;
  initialExcerpt?: string;
  initialBodyMd?: string;
  initialPublished?: boolean;
};

export function BlogComposeForm({
  mode,
  postId,
  initialTitle = "",
  initialSlug = "",
  initialExcerpt = "",
  initialBodyMd = "",
  initialPublished = false,
}: BlogComposeFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [slug, setSlug] = useState(initialSlug);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [bodyMd, setBodyMd] = useState(initialBodyMd);
  const [published, setPublished] = useState(initialPublished);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const input = { title, slug, excerpt, bodyMd, published };

    try {
      const result =
        mode === "edit" && postId
          ? await updatePostAction(postId, input)
          : await submitPost(input);

      if (!result.ok) {
        setError(result.error);
        return;
      }

      if (mode === "edit") {
        setMessage(
          published
            ? `Updated and published at /desktop/${result.slug}`
            : "Saved as draft. Check Published to show on the desktop.",
        );
        return;
      }

      setMessage(
        published
          ? `Published at /desktop/${result.slug}`
          : "Saved as draft. Edit the post and check Published when ready.",
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

  const onDelete = async () => {
    if (mode !== "edit" || !postId) {
      return;
    }

    if (!window.confirm(`Delete "${title || "this post"}"? This cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    setError(null);

    try {
      const result = await deletePostAction(postId);
      if (!result.ok) {
        setError(result.error);
        setDeleting(false);
        return;
      }

      window.location.href = "/composeblog";
    } catch (deleteError) {
      console.error(deleteError);
      setError("Something went wrong while deleting the post.");
      setDeleting(false);
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
        <p className={styles.hint}>URL path on the desktop: /desktop/your-slug</p>
      </label>

      <label className={styles.field}>
        <span>Excerpt</span>
        <textarea
          name="excerpt"
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          rows={3}
          placeholder="Short summary shown in the blog window"
        />
      </label>

      <label className={`${styles.field} ${styles.bodyField}`}>
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
        <span>
          Published
          <span className={styles.checkboxHint}>
            Visible on the public desktop at /desktop
          </span>
        </span>
      </label>

      {error ? <p className={styles.alertError}>{error}</p> : null}
      {message ? <p className={styles.alertSuccess}>{message}</p> : null}

      <div className={styles.actions}>
        <button type="submit" className={styles.btn} disabled={loading || deleting}>
          {loading
            ? "Saving…"
            : mode === "edit"
              ? "Save changes"
              : "Create post"}
        </button>

        {mode === "edit" ? (
          <button
            type="button"
            className={styles.btnDanger}
            disabled={loading || deleting}
            onClick={onDelete}
          >
            {deleting ? "Deleting…" : "Delete post"}
          </button>
        ) : null}
      </div>
    </form>
  );
}
