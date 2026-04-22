import { readLatestAiAlphaContext } from "../shared/ai-alpha";

const context = await readLatestAiAlphaContext();

if (!context) {
  console.log("No AI Alpha article context available.");
  process.exit(0);
}

console.log(context);
