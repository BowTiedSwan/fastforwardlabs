import path from "node:path";

import matter from "gray-matter";

export type ContentCollection =
  | "blog"
  | "strategy"
  | "linkedin-ideas"
  | "seo-geo";

export type ContentDocument = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  collection: ContentCollection;
  href: string;
  tags: string[];
  readingTime: string;
  body: string;
  excerpt: string;
};

type BuildDocumentInput = Partial<ContentDocument> & {
  title: string;
  publishedAt: string;
};

type Frontmatter = {
  title: string;
  description?: string;
  publishedAt: string | Date;
  tags?: string[];
  readingTime?: string;
};

function normalizePublishedAt(value: string | Date): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}

export function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildExcerpt(value: string, maxLength = 160): string {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

export function sortByPublishedAtDesc<T extends { publishedAt: string }>(
  documents: T[],
): T[] {
  return [...documents].sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
}

export function buildDocument(input: BuildDocumentInput): ContentDocument {
  const slug = input.slug ?? toSlug(input.title);
  const collection = input.collection ?? "blog";
  const href =
    input.href ??
    (collection === "strategy" ? `/strategy/${slug}` : `/${collection}/${slug}`);
  const body = input.body ?? "";
  const description = input.description ?? buildExcerpt(body);

  return {
    slug,
    title: input.title,
    description,
    publishedAt: input.publishedAt,
    collection,
    href,
    tags: input.tags ?? [],
    readingTime: input.readingTime ?? "4 min read",
    body,
    excerpt: input.excerpt ?? buildExcerpt(body || description),
  };
}

export function parseDocument(
  source: string,
  options: {
    collection: ContentCollection;
    fileName: string;
    hrefBase?: string;
  },
): ContentDocument {
  const { content, data } = matter(source);
  const frontmatter = data as Frontmatter;
  const slug = path.basename(options.fileName, path.extname(options.fileName));
  const hrefBase = options.hrefBase ?? `/${options.collection}`;

  return buildDocument({
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    publishedAt: normalizePublishedAt(frontmatter.publishedAt),
    tags: frontmatter.tags ?? [],
    readingTime: frontmatter.readingTime,
    collection: options.collection,
    href:
      options.collection === "strategy"
        ? `/strategy/${slug}`
        : `${hrefBase}/${slug}`,
    body: content.trim(),
  });
}
