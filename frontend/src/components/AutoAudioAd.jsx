import { useState } from "react";
import { 
  Music, Volume2, Download, Play, Pause, Sparkles,
  Building2, Package, Loader2, Zap, Headphones,
  Share2, Copy, CheckCircle, Radio
} from "lucide-react";

export default function AutoAudioAd() {
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState("0:00");
  const [copied, setCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  
  let audioRef = null;

  const generateAd = async () => {
    if (!company || !product) {
      alert("Please enter both company and product name");
      return;
    }

    setLoading(true);
    setAudioUrl(null);
    setHasGenerated(true);
    setIsPlaying(false);

    try {
      const res = await fetch("http://localhost:4001/api/audio/auto-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, product }),
      });

      if (!res.ok) throw new Error("Failed to generate audio ad");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (e) {
      alert("Generation failed — check backend & API keys");
    }

    setLoading(false);
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `${company}_${product}_Ad.mp3`;
    a.click();
  };

  const togglePlay = () => {
    if (!audioRef) return;
    
    if (isPlaying) {
      audioRef.pause();
    } else {
      audioRef.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAudioLoaded = (e) => {
    const duration = e.target.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    setAudioDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
  };

  const copyPrompt = () => {
    const prompt = `Generate audio ad for ${company} - ${product}`;
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && company && product) {
      generateAd();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
              <Music className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI Audio Ad Generator
              </h1>
              <p className="text-gray-400">Create professional audio ads in seconds with AI voiceovers</p>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-800 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-blue-400" />
                Create Your Audio Ad
              </h2>
              <p className="text-gray-400 text-sm">Enter your brand details to generate a custom audio advertisement</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              AI-Powered Voice
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Building2 className="w-4 h-4" />
                Company Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-500"
                  placeholder="e.g. Nike, Apple, Starbucks..."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                <Package className="w-4 h-4" />
                Product / Service
              </label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-500"
                  placeholder="e.g. Running Shoes, iPhone 15, Coffee..."
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateAd}
            disabled={loading || !company || !product}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Audio Ad...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Generate Audio Ad
              </>
            )}
          </button>

          {/* Quick Examples */}
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-3">Try these examples:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setCompany("Nike");
                  setProduct("Running Shoes");
                }}
                className="px-4 py-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl text-sm transition-colors text-left"
              >
                <div className="font-medium">Nike Running Shoes</div>
                <div className="text-xs text-gray-400 mt-1">Sports & Fitness</div>
              </button>
              <button
                onClick={() => {
                  setCompany("Starbucks");
                  setProduct("Holiday Coffee");
                }}
                className="px-4 py-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl text-sm transition-colors text-left"
              >
                <div className="font-medium">Starbucks Holiday Coffee</div>
                <div className="text-xs text-gray-400 mt-1">Food & Beverage</div>
              </button>
            </div>
          </div>
        </div>

        {/* Audio Player Section */}
        {loading ? (
          <div className="text-center py-16 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-800">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-6"></div>
            <h3 className="text-xl font-semibold mb-2">Generating Your Audio Ad</h3>
            <p className="text-gray-400 mb-4">AI is creating a professional voiceover for {company} - {product}</p>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-150"></div>
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-300"></div>
            </div>
          </div>
        ) : hasGenerated && audioUrl ? (
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-800 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-blue-400">Your Audio Ad is Ready! 🎧</h2>
                <p className="text-gray-400">Generated for {company} - {product}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyPrompt}
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                    copied 
                      ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                      : 'bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300'
                  }`}
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
            </div>

            {/* Audio Player */}
            <div className="bg-gray-900/30 rounded-xl border border-gray-700 p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center justify-center transition-all hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{company} Audio Ad</h3>
                      <p className="text-sm text-gray-400">{product} Promotion</p>
                    </div>
                    <div className="text-sm text-gray-400">{audioDuration}</div>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-1/2"></div>
                  </div>
                </div>
              </div>

              <audio
                ref={ref => audioRef = ref}
                src={audioUrl}
                onLoadedMetadata={handleAudioLoaded}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={downloadAudio}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-xl font-medium flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
              >
                <Download className="w-5 h-5" />
                Download MP3
              </button>
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl font-medium flex items-center justify-center gap-3 transition-colors">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
        ) : hasGenerated && !audioUrl ? (
          <div className="text-center py-16 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-800">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center mx-auto mb-6">
              <Radio className="w-10 h-10 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Generation Failed</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              We couldn't generate the audio ad. Please check your backend server and API keys.
            </p>
            <button
              onClick={() => setHasGenerated(false)}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          /* Initial State */
          <div className="text-center py-16 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-800">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center mx-auto mb-6">
              <Headphones className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Your Audio Ad Awaits</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Fill in your brand details above and generate a professional audio advertisement with AI voiceover
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-5 bg-gray-900/30 rounded-xl border border-gray-800">
                <div className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-blue-400" />
                  Professional Voice
                </div>
                <p className="text-sm text-gray-400">AI-powered natural voiceovers</p>
              </div>
              <div className="p-5 bg-gray-900/30 rounded-xl border border-gray-800">
                <div className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Music className="w-5 h-5 text-purple-400" />
                  Background Music
                </div>
                <p className="text-sm text-gray-400">Royalty-free music integration</p>
              </div>
              <div className="p-5 bg-gray-900/30 rounded-xl border border-gray-800">
                <div className="text-lg font-bold mb-2 flex items-center gap-2">
                  <Download className="w-5 h-5 text-green-400" />
                  Instant Download
                </div>
                <p className="text-sm text-gray-400">MP3 format ready to use</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Footer */}
        {hasGenerated && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">30s</div>
                <div className="text-sm text-gray-400">Ad Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">HQ</div>
                <div className="text-sm text-gray-400">Audio Quality</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">5</div>
                <div className="text-sm text-gray-400">Voice Options</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">24/7</div>
                <div className="text-sm text-gray-400">Generation</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}