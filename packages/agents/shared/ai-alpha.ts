type NotionRichText = {
  plain_text?: string;
};

type NotionTitleProperty = {
  title?: NotionRichText[];
};

type NotionBlock = {
  type: string;
  paragraph?: { rich_text?: NotionRichText[] };
  heading_1?: { rich_text?: NotionRichText[] };
  heading_2?: { rich_text?: NotionRichText[] };
  heading_3?: { rich_text?: NotionRichText[] };
  bulleted_list_item?: { rich_text?: NotionRichText[] };
  numbered_list_item?: { rich_text?: NotionRichText[] };
};

type AiAlphaArticle = {
  title: string;
  publishedAt: string;
  url: string;
  body: string;
};

const DEFAULT_AI_ALPHA_NOTION_DATABASE_ID = "21d90be5f44d80ffa169cbb40567085b";

function extractRichText(value: NotionRichText[] | undefined): string {
  return (value ?? []).map((item) => item.plain_text ?? "").join("").trim();
}

export function getTitleFromProperties(properties: Record<string, unknown>): string {
  const property = properties.Title as NotionTitleProperty | undefined;
  return extractRichText(property?.title);
}

export function extractPlainText(blocks: NotionBlock[]): string {
  const parts = blocks
    .map((block) => {
      const section = block[block.type as keyof NotionBlock] as
        | { rich_text?: NotionRichText[] }
        | undefined;
      return extractRichText(section?.rich_text);
    })
    .filter((value) => value.length > 0);

  return parts.join("\n\n");
}

export function formatAiAlphaContext(article: AiAlphaArticle): string {
  const trimmedBody = article.body.slice(0, 1000).trim();

  return [
    "Latest AI Alpha article:",
    `Title: ${article.title}`,
    `Published at: ${article.publishedAt}`,
    `URL: ${article.url}`,
    "Body:",
    trimmedBody,
  ].join("\n");
}

async function fetchNotion(pathname: string, body: unknown) {
  const notionApiKey = process.env.NOTION_API_KEY;

  if (!notionApiKey) {
    return null;
  }

  const response = await fetch(`https://api.notion.com/v1${pathname}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionApiKey}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Notion request failed: ${response.status}`);
  }

  return response.json();
}

async function fetchLatestAiAlphaPage() {
  const databaseId = process.env.AI_ALPHA_NOTION_DATABASE_ID ?? DEFAULT_AI_ALPHA_NOTION_DATABASE_ID;
  const data = await fetchNotion(`/databases/${databaseId}/query`, {
    page_size: 1,
    sorts: [{ property: "datetime", direction: "descending" }],
  });

  const page = data?.results?.[0];
  if (!page) {
    return null;
  }

  return {
    id: page.id as string,
    url: (page.url as string | undefined) ?? "",
    title: getTitleFromProperties((page.properties as Record<string, unknown>) ?? {}),
    publishedAt:
      (((page.properties as Record<string, unknown>)?.datetime as { date?: { start?: string } })?.date?.start ?? "").slice(0, 10),
  };
}

async function fetchPageBlocks(pageId: string) {
  const notionApiKey = process.env.NOTION_API_KEY;

  if (!notionApiKey) {
    return [];
  }

  const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`, {
    headers: {
      Authorization: `Bearer ${notionApiKey}`,
      "Notion-Version": "2022-06-28",
    },
  });

  if (!response.ok) {
    throw new Error(`Notion block request failed: ${response.status}`);
  }

  const data = await response.json();
  return (data.results ?? []) as NotionBlock[];
}

export async function readLatestAiAlphaContext(): Promise<string | null> {
  if (!process.env.NOTION_API_KEY) {
    return null;
  }

  const latestPage = await fetchLatestAiAlphaPage();

  if (!latestPage) {
    return null;
  }

  const blocks = await fetchPageBlocks(latestPage.id);
  const body = extractPlainText(blocks);

  return formatAiAlphaContext({
    title: latestPage.title || "Latest AI Alpha article",
    publishedAt: latestPage.publishedAt || "unknown",
    url: latestPage.url,
    body,
  });
}
