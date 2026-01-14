import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(cors());

// Proxy endpoint for pollinations.ai
app.get("/api/generate-image", async (req, res) => {
  const { prompt, width = 768, height = 1024 } = req.query;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt required" });
  }

  try {
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${Math.floor(Math.random() * 10000)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Pollinations API error: ${response.statusText}`);
    }

    // Get the image as a buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Set appropriate headers
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("Cache-Control", "no-cache");

    // Send the image
    res.send(buffer);
  } catch (err) {
    console.error("Error generating image:", err);
    res.status(500).json({ error: err.message || "Failed to generate image" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});