import { ai } from "./geminiClient.js";
import { COPYWRITING_PROMPT } from "./copyPrompt.js";

export async function generateCopywriting(strategy) {
  const prompt = COPYWRITING_PROMPT.replace(
    "{{STRATEGY}}",
    JSON.stringify(strategy, null, 2)
  );

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });

  const text = response.text;

  if (!text) {
    throw new Error("No text response from Gemini API");
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}") + 1;

  if (start === -1 || end === -1) {
    throw new Error("Invalid JSON returned by Gemini");
  }

  return JSON.parse(text.slice(start, end));
}
