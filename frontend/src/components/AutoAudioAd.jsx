import { useState } from "react";

export default function AutoAudioAd() {
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateAd = async () => {
    if (!company || !product) return alert("Enter company & product");

    setLoading(true);
    setAudioUrl(null);

    try {
      const res = await fetch("http://localhost:4001/api/audio/auto-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, product }),
      });

      if (!res.ok) throw new Error("Failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (e) {
      alert("Generation failed — check backend & keys");
    }

    setLoading(false);
  };

  const downloadAudio = () => {
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "Audio_Ad.mp3";
    a.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">AI Audio Ad Generator 🎤</h1>

      <input
        className="w-full max-w-xl p-3 mb-3 rounded bg-gray-800 outline-none"
        placeholder="Company Name e.g. Nike"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        className="w-full max-w-xl p-3 rounded bg-gray-800 outline-none"
        placeholder="Product e.g. Running Shoes"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />

      <button
        onClick={generateAd}
        disabled={loading}
        className="mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg disabled:opacity-50"
      >
        {loading ? "Generating Ad..." : "Generate Audio Ad"}
      </button>

      {audioUrl && (
        <div className="mt-6 text-center">
          <audio controls src={audioUrl} className="w-full max-w-xl" />
          <button
            onClick={downloadAudio}
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
          >
            Download MP3
          </button>
        </div>
      )}
    </div>
  );
}