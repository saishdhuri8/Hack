import express from "express";
import { GoogleGenAI } from "@google/genai";


const controller = express.Router();

const ai = new GoogleGenAI({
    apiKey:"AIzaSyCy1zNCkbw_qo1HUQOVl3F9dN4O4-WcLqg"
});

controller.post("/ai-text", async (req, res) => {
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

    console.log(req.body);
    // return res.status(200).json({success:true, message:"Test successful"});
    

    // Minimal validation
    if (!brandName || !productOrService || !goal) {
      return res.status(400).json({
        success: false,
        message: "brandName, productOrService, and goal are required"
      });
    }

    const prompt = `
You are a senior brand strategist.

Your task is to interpret the brand context, audience, and goal,
then formulate a detailed marketing campaign strategy.

IMPORTANT RULES:
- Do NOT generate ad copy
- Think strategically
- Infer missing details logically
- Respond ONLY in valid JSON
- All analytics values must be numeric only. Do not include %, +, or text.
- Include a detailed weekly timeline with specific tasks for each day of the week. for each day, list out the specific tasks to be done.

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

Return JSON with the following structure:
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
    "monday":[],
    "tuesday":[],
    "wednesday":[],
    "thursday":[],
    "friday":[],
    "saturday":[],
    "sunday":[]
  },
  "analytics": {
    "platformDistribution": {},
    "contentTypeSplit": {},
    "funnelFocus": {},
    "expectedKPIs": {}
  }
}
`;

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

    return res.status(200).json({
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

export default controller;

