import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import OpenAI from "openai";

type GenerateMarkdownParams = {
  title: string;
  description: string;
  tags: string[];
  destinationDirectory: string;
  promptPath: string;
  fallbackBody: string;
};

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(packageRoot, "../..");

function todayIsoString() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Sofia",
  }).format(new Date());
}

async function readResearchSource() {
  return readFile(
    path.join(repositoryRoot, ".sisyphus/research/executive-ai-market-research.md"),
    "utf8",
  );
}

async function readPrompt(promptPath: string) {
  return readFile(path.join(packageRoot, promptPath), "utf8");
}

async function generateWithOpenAI(prompt: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const client = new OpenAI({ apiKey });
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
    input: prompt,
  });

  return response.output_text.trim();
}

function buildFrontmatter(params: {
  title: string;
  description: string;
  tags: string[];
}) {
  const tags = params.tags.map((tag) => `  - ${tag}`).join("\n");

  return `---\ntitle: ${params.title}\ndescription: ${params.description}\npublishedAt: ${todayIsoString()}\ntags:\n${tags}\nreadingTime: 4 min read\n---`;
}

export async function generateMarkdownFile({
  title,
  description,
  tags,
  destinationDirectory,
  promptPath,
  fallbackBody,
}: GenerateMarkdownParams) {
  const [research, promptTemplate] = await Promise.all([
    readResearchSource(),
    readPrompt(promptPath),
  ]);

  const fullPrompt = `${promptTemplate}\n\nResearch source:\n${research}`;
  const generatedBody = await generateWithOpenAI(fullPrompt);
  const body = generatedBody || fallbackBody.trim();
  const frontmatter = buildFrontmatter({ title, description, tags });
  const output = `${frontmatter}\n\n${body}\n`;
  const outputDirectory = path.join(repositoryRoot, destinationDirectory);
  const outputPath = path.join(outputDirectory, `${todayIsoString()}.md`);

  await mkdir(outputDirectory, { recursive: true });
  await writeFile(outputPath, output, "utf8");

  return outputPath;
}
