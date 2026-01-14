import { useState } from "react";

function PosterGenerator() {
  const [prompt, setPrompt] = useState(
    `subtle marketing poster for apple brand campaign,
bold energetic style, neon green and black,
sharp cinematic lighting, high contrast,
professional graphic design, instagram ad poster`
  );
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [width, setWidth] = useState(768);
  const [height, setHeight] = useState(1024);

  const generatePoster = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
      const url = `${backendUrl}/api/generate-image?prompt=${encodeURIComponent(
        prompt
      )}&width=${width}&height=${height}`;

      const res = await fetch(url);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(errorData.error || "Failed to generate image");
      }

      const blob = await res.blob();
      setImageUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message || "Server error on port 4000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white/5 dark:bg-white/5 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-indigo-500 mb-6">Image Generator</h2>

      <div className="flex flex-col gap-4 mb-6">
        {/* Prompt */}
        <div className="flex flex-col gap-2">
          <label className="font-medium text-left">Enter your prompt:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            disabled={loading}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:border-indigo-500 disabled:opacity-50"
          />
        </div>

        {/* Dimensions */}
        <div className="flex gap-4">
          <div className="flex flex-col flex-1 gap-1">
            <label className="text-sm font-medium">Width</label>
            <input
              type="number"
              value={width}
              min={256}
              max={2048}
              step={64}
              onChange={(e) => setWidth(parseInt(e.target.value) || 768)}
              disabled={loading}
              className="p-2 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <label className="text-sm font-medium">Height</label>
            <input
              type="number"
              value={height}
              min={256}
              max={2048}
              step={64}
              onChange={(e) => setHeight(parseInt(e.target.value) || 1024)}
              disabled={loading}
              className="p-2 rounded-xl bg-white/5 border border-white/20 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={generatePoster}
          disabled={loading}
          className="mt-4 py-3 text-lg font-semibold rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 transition"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-400/30 rounded-xl text-red-400 mb-4">
          ❌ {error}
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div className="flex flex-col items-center gap-3 py-10">
          <div className="w-12 h-12 border-4 border-indigo-400/20 border-t-indigo-500 rounded-full animate-spin" />
          <p>Generating your image...</p>
        </div>
      )}

      {/* Image */}
      {imageUrl && !loading && (
        <div className="flex flex-col items-center gap-4 mt-6">
          <img
            src={imageUrl}
            className="max-w-full rounded-xl shadow-2xl border border-white/10"
          />
          <a
            href={imageUrl}
            download="poster.png"
            className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition"
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  );
}

export default PosterGenerator;
