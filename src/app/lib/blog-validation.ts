export type PostFormInput = {
  title: string;
  slug: string;
  excerpt: string;
  bodyMd: string;
  published: boolean;
};

export function normalizeSlug(slug: string): string {
  return slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function validatePostInput(input: PostFormInput): string | null {
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

export function toPostPayload(input: PostFormInput) {
  return {
    title: input.title.trim(),
    slug: normalizeSlug(input.slug),
    excerpt: input.excerpt.trim(),
    bodyMd: input.bodyMd,
    published: input.published,
  };
}
