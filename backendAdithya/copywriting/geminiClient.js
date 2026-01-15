import { GoogleGenAI } from "@google/genai";

let aiInstance = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    aiInstance = new GoogleGenAI({
      apiKey: apiKey
    });
  }
  return aiInstance;
}

export const ai = {
  get models() {
    return getAI().models;
  }
};
