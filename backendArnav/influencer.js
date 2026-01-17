import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ================= KEYS =================
const YT_KEY = process.env.YOUTUBE_API_KEY;

// Gemini client (API key auto-loaded from env)
const ai = new GoogleGenAI({});

// ================= HELPERS =================
function extractInstagram(description = "") {
  const urlMatch = description.match(/instagram\.com\/([a-zA-Z0-9._]+)/);
  const atMatch = description.match(/@([a-zA-Z0-9._]{3,})/);
  return urlMatch?.[1] || atMatch?.[1] || null;
}

function extractEmail(description = "") {
  const emailMatch = description.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
  );
  return emailMatch ? emailMatch[0] : "Not public";
}

// ================= ROUTES =================

/**
 * Influencer Discovery
 */
app.post("/api/influencers", async (req, res) => {
  const { niche } = req.body;
  if (!niche) {
    return res.status(400).json({ error: "Niche is required" });
  }

  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=10&q=${encodeURIComponent(
      niche
    )}&key=${YT_KEY}`;

    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();

    const channelIds = searchData.items
      .map((item) => item.snippet.channelId)
      .join(",");

    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${YT_KEY}`;
    const channelRes = await fetch(channelUrl);
    const channelData = await channelRes.json();

    const influencers = channelData.items.map((c) => {
      const desc = c.snippet.description || "";

      const instagram = extractInstagram(desc);
      const email = extractEmail(desc);

      return {
        name: c.snippet.title,
        youtube: `https://youtube.com/channel/${c.id}`,
        followers: c.statistics.subscriberCount,
        email,
        instagram: instagram
          ? `https://instagram.com/${instagram}`
          : "Not found",
        description: desc.slice(0, 160),
      };
    });

    res.json({ influencers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch influencers" });
  }
});

/**
 * ✅ Outreach Email Generator (NEW GEMINI SDK)
 */
app.post("/api/outreach-email", async (req, res) => {
  const { influencer, product, brand } = req.body;

  if (!influencer || !product || !brand) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const prompt = `
Write a short, personalized influencer outreach email.

Brand: ${brand}
Product: ${product}
Influencer name: ${influencer.name}
Platform: YouTube / Instagram

Tone:
- Friendly
- Professional
- Non-salesy
- Collaborative

End with a soft call to action.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    res.json({ email: response.text });
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Failed to generate outreach email" });
  }
});

// ================= SERVER =================
app.listen(4003, () => {
  console.log("🚀 Influencer backend running on port 4003");
});