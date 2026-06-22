"use server";

import { serverAction } from "rwsdk/worker";

import { insertPost, type InsertPostInput } from "@/db";

export type SubmitPostInput = {
  title: string;
  slug: string;
  excerpt: string;
  bodyMd: string;
  published: boolean;
};

export type SubmitPostResult =
  | { ok: true; slug: string }
  | { ok: false; error: string };

function normalizeSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function validateInput(input: SubmitPostInput): string | null {
  if (!input.title.trim()) {
    return "Title is required.";
  }

  const slug = normalizeSlug(input.slug);
  if (!slug) {
    return "Slug is required.";
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return "Slug must use lowercase letters, numbers, and hyphens only.";
  }

  if (!input.bodyMd.trim()) {
    return "Post body is required.";
  }

  return null;
}

export const submitPost = serverAction(
  async (input: SubmitPostInput): Promise<SubmitPostResult> => {
    const validationError = validateInput(input);
    if (validationError) {
      return { ok: false, error: validationError };
    }

    const payload: InsertPostInput = {
      title: input.title.trim(),
      slug: normalizeSlug(input.slug),
      excerpt: input.excerpt.trim(),
      bodyMd: input.bodyMd,
      published: input.published,
    };

    try {
      const post = await insertPost(payload);
      return { ok: true, slug: post.slug };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("UNIQUE constraint failed")) {
        return {
          ok: false,
          error: "A post with this slug already exists. Choose a different slug.",
        };
      }
      throw error;
    }
  },
);
