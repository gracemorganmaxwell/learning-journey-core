"use server";

import { serverAction } from "rwsdk/worker";

import {
  deletePost as deletePostRow,
  insertPost,
  updatePost,
  type InsertPostInput,
} from "@/db";
import {
  type PostFormInput,
  toPostPayload,
  validatePostInput,
} from "@/app/lib/blog-validation";
import { requireComposeAccessAction } from "@/app/middleware/requireComposeAccess";

export type PostActionResult =
  | { ok: true; slug: string }
  | { ok: false; error: string };

export type DeletePostResult =
  | { ok: true }
  | { ok: false; error: string };

function slugConflictMessage(error: unknown): string | null {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("UNIQUE constraint failed")) {
    return "A post with this slug already exists. Choose a different slug.";
  }
  return null;
}

export const submitPost = serverAction([
  requireComposeAccessAction,
  async (input: PostFormInput): Promise<PostActionResult> => {
    const validationError = validatePostInput(input);
    if (validationError) {
      return { ok: false, error: validationError };
    }

    const payload: InsertPostInput = toPostPayload(input);

    try {
      const post = await insertPost(payload);
      return { ok: true, slug: post.slug };
    } catch (error) {
      const conflict = slugConflictMessage(error);
      if (conflict) {
        return { ok: false, error: conflict };
      }
      throw error;
    }
  },
]);

export const updatePostAction = serverAction([
  requireComposeAccessAction,
  async (
    postId: number,
    input: PostFormInput,
  ): Promise<PostActionResult> => {
    if (!Number.isInteger(postId) || postId < 1) {
      return { ok: false, error: "Invalid post id." };
    }

    const validationError = validatePostInput(input);
    if (validationError) {
      return { ok: false, error: validationError };
    }

    const payload: InsertPostInput = toPostPayload(input);

    try {
      const post = await updatePost(postId, payload);
      return { ok: true, slug: post.slug };
    } catch (error) {
      const conflict = slugConflictMessage(error);
      if (conflict) {
        return { ok: false, error: conflict };
      }
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("not found")) {
        return { ok: false, error: "Post not found." };
      }
      throw error;
    }
  },
]);

export const deletePostAction = serverAction([
  requireComposeAccessAction,
  async (postId: number): Promise<DeletePostResult> => {
    if (!Number.isInteger(postId) || postId < 1) {
      return { ok: false, error: "Invalid post id." };
    }

    const deleted = await deletePostRow(postId);
    if (!deleted) {
      return { ok: false, error: "Post not found." };
    }

    return { ok: true };
  },
]);
