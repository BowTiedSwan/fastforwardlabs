import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import {
  parseDocument,
  sortByPublishedAtDesc,
  type ContentCollection,
  type ContentDocument,
} from "./content-utils";

const packageRoot = path.resolve(process.cwd(), "..", "..", "packages", "content");

async function readCollection(
  directoryName: string,
  collection: ContentCollection,
): Promise<ContentDocument[]> {
  const absoluteDirectory = path.join(packageRoot, directoryName);
  const fileNames = (await readdir(absoluteDirectory)).filter((fileName) =>
    fileName.endsWith(".md") || fileName.endsWith(".mdx"),
  );

  const documents = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(absoluteDirectory, fileName);
      const source = await readFile(filePath, "utf8");

      return parseDocument(source, {
        collection,
        fileName,
      });
    }),
  );

  return sortByPublishedAtDesc(documents);
}

async function readBySlug(
  directoryName: string,
  collection: ContentCollection,
  slug: string,
): Promise<ContentDocument | null> {
  const documents = await readCollection(directoryName, collection);

  return documents.find((document) => document.slug === slug) ?? null;
}

export async function getBlogPosts(): Promise<ContentDocument[]> {
  return readCollection("blog", "blog");
}

export async function getBlogPost(slug: string): Promise<ContentDocument | null> {
  return readBySlug("blog", "blog", slug);
}

export async function getStrategyDocuments(): Promise<ContentDocument[]> {
  return readCollection("strategy", "strategy");
}

export async function getStrategyDocument(
  slug: string,
): Promise<ContentDocument | null> {
  return readBySlug("strategy", "strategy", slug);
}

export async function getLinkedInIdeaDocuments(): Promise<ContentDocument[]> {
  return readCollection("linkedin-ideas", "linkedin-ideas");
}

export async function getSeoGeoIdeaDocuments(): Promise<ContentDocument[]> {
  return readCollection("seo-geo", "seo-geo");
}

export type { ContentDocument } from "./content-utils";
