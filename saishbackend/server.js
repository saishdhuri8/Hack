import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Gemini Client (API KEY AUTH — IMPORTANT)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// ================================
// AI STRATEGY ENDPOINT (DYNAMIC)
// ================================
app.post("/ai-text", async (req, res) => {
  try {
    const {
      brandName,
      description,
      productOrService,
      targetAudience,
      goal,
      platforms,
      budgetRange,
      tone,
      uniqueValue,
      callToAction
    } = req.body;

    if (!brandName || !productOrService || !goal) {
      return res.status(400).json({
        success: false,
        message: "brandName, productOrService, and goal are required"
      });
    }

    const prompt = `
You are a senior brand strategist.

Your task is to analyze the brand information and produce a COMPLETE marketing strategy.
Use abstract reasoning.
Do NOT generate ad copy.
Return ONLY valid JSON.
ALL analytics values must be NUMERIC ONLY (no %, no text).

Brand Brief:
Brand Name: ${brandName}
Description: ${description}
Product / Service: ${productOrService}
Target Audience: ${targetAudience}
Goal: ${goal}
Platforms: ${platforms?.join(", ")}
Budget Range: ${budgetRange}
Tone: ${tone}
Unique Value: ${uniqueValue}
Call To Action: ${callToAction}

Return JSON with EXACT structure:
{
  "campaignTheme": "",
  "campaignObjective": "",
  "coreMessage": "",
  "targetAudienceProfile": {
    "ageRange": "",
    "interests": [],
    "psychographics": []
  },
  "brandPositioning": {
    "marketPosition": "",
    "emotionalAppeal": "",
    "differentiation": ""
  },
  "recommendedPlatforms": [
    { "platform": "", "role": "" }
  ],
  "contentStyle": {
    "tone": "",
    "formats": []
  },
  "keyConstraints": [],
  "timeline": {
    "monday": [],
    "tuesday": [],
    "wednesday": [],
    "thursday": [],
    "friday": [],
    "saturday": [],
    "sunday": []
  },
  "analytics": {
    "platformDistribution": {},
    "contentTypeSplit": {},
    "funnelFocus": {},
    "expectedKPIs": {
      "engagementRate": 0,
      "mauGrowth": 0,
      "clickThroughRate": 0,
      "retentionRate": 0,
      "costPerAcquisition": 0
    }
  }
}
`;

    // Gemini Call
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt
    });

    const aiText = response.text || "{}";

    let strategy;
    try {
      strategy = JSON.parse(aiText);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response",
        rawResponse: aiText
      });
    }

    return res.json({
      success: true,
      message: "Campaign strategy generated successfully",
      data: strategy
    });

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while generating campaign strategy"
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📋 Health: http://localhost:${PORT}/health`);
  console.log(`🤖 AI Endpoint: http://localhost:${PORT}/ai-text`);
});
