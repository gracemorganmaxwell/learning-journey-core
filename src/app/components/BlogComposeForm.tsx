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
            : `Saved draft. Publish to show on /desktop.`,
        );
        return;
      }

      setMessage(
        published
          ? `Published at /desktop/${result.slug}`
          : `Saved draft. Publish from edit or create again with Publish checked.`,
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
        <span>Published (visible on /desktop)</span>
      </label>

      {error ? <p className={styles.error}>{error}</p> : null}
      {message ? <p className={styles.success}>{message}</p> : null}

      <div className={styles.actions}>
        <button type="submit" disabled={loading || deleting}>
          {loading
            ? "Saving…"
            : mode === "edit"
              ? "Save changes"
              : "Create post"}
        </button>

        {mode === "edit" ? (
          <button
            type="button"
            className={styles.danger}
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
