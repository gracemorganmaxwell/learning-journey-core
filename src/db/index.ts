import { env } from "cloudflare:workers";

export type BlogPostRow = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body_md: string;
  published: number;
  created_at: string;
  updated_at: string;
};

export type InsertPostInput = {
  slug: string;
  title: string;
  excerpt: string;
  bodyMd: string;
  published: boolean;
};

export async function insertPost(input: InsertPostInput): Promise<BlogPostRow> {
  const published = input.published ? 1 : 0;
  const result = await env.DB.prepare(
    `INSERT INTO BlogPost (slug, title, excerpt, body_md, published, updated_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'))
     RETURNING *`,
  )
    .bind(input.slug, input.title, input.excerpt, input.bodyMd, published)
    .first<BlogPostRow>();

  if (!result) {
    throw new Error("Failed to insert blog post");
  }

  return result;
}

export async function listPublishedPosts(): Promise<BlogPostRow[]> {
  const result = await env.DB.prepare(
    `SELECT id, slug, title, excerpt, body_md, published, created_at, updated_at
     FROM BlogPost
     WHERE published = 1
     ORDER BY created_at DESC`,
  ).all<BlogPostRow>();

  return result.results ?? [];
}

export async function getPostBySlug(
  slug: string,
  options?: { publishedOnly?: boolean },
): Promise<BlogPostRow | null> {
  const publishedOnly = options?.publishedOnly ?? true;
  const query = publishedOnly
    ? `SELECT id, slug, title, excerpt, body_md, published, created_at, updated_at
       FROM BlogPost
       WHERE slug = ? AND published = 1`
    : `SELECT id, slug, title, excerpt, body_md, published, created_at, updated_at
       FROM BlogPost
       WHERE slug = ?`;

  const result = await env.DB.prepare(query).bind(slug).first<BlogPostRow>();
  return result ?? null;
}
