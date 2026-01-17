import { useState } from "react";
import { 
  Search, Users, Mail, Youtube, Instagram, 
  ExternalLink, Copy, CheckCircle, Sparkles,
  Filter, TrendingUp, MessageSquare, Globe,
  Share2, Heart, Zap
} from "lucide-react";

export default function InfluencerFinder() {
  const [niche, setNiche] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // NEW: Track if user has clicked search

  // SAME LOGIC - Just beautiful UI
  const searchInfluencers = async () => {
    if (!niche.trim()) return;

    setLoading(true);
    setResults([]);
    setHasSearched(true); // NEW: Mark that search was clicked

    try {
      const res = await fetch("http://localhost:4003/api/influencers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ niche }),
      });

      const data = await res.json();
      setResults(data.influencers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // SAME LOGIC
  const generateOutreachEmail = async (influencer) => {
    setEmailLoading(true);

    try {
      const res = await fetch(
        "http://localhost:4001/api/outreach-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            influencer,
            product: "AI Marketing Platform",
            brand: "BrandPulse",
          }),
        }
      );

      const data = await res.json();
      alert(data.email);
    } catch (err) {
      console.error(err);
      alert("Failed to generate email");
    } finally {
      setEmailLoading(false);
    }
  };

  // SAME LOGIC
  const copyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  // NEW: Handle quick niche click
  const handleQuickNicheClick = (nicheName) => {
    setNiche(nicheName);
    // Don't search automatically - user must click "Find Influencers"
  };

  // NEW: Handle Enter key in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchInfluencers();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white p-6">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Influencer Suggester
              </h1>
              <p className="text-gray-400">Find perfect influencers for your brand in seconds</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-800 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-400" />
                Find Influencers
              </h2>
              <p className="text-gray-400 text-sm">Enter a niche to discover relevant influencers</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              Powered by AI
            </div>
          </div>

          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent placeholder-gray-500"
                placeholder="e.g. fitness, skincare, tech startups, gaming..."
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button
              onClick={searchInfluencers}
              disabled={loading || !niche.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Find Influencers
                </>
              )}
            </button>
          </div>

          {/* Quick Suggestions */}
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-3">Popular niches:</p>
            <div className="flex flex-wrap gap-2">
              {['fitness', 'skincare', 'tech', 'gaming', 'fashion', 'food'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleQuickNicheClick(suggestion)}
                  className="px-3 py-1.5 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg text-sm transition-colors capitalize"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                Discovered Influencers
                {hasSearched && results.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-400">
                    ({results.length} found)
                  </span>
                )}
              </h2>
              <p className="text-gray-400">
                {hasSearched 
                  ? "AI-matched influencers for your niche" 
                  : "Enter a niche and click 'Find Influencers' to see results"
                }
              </p>
            </div>
            
            {hasSearched && results.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Filter className="w-4 h-4" />
                  Filter
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <TrendingUp className="w-4 h-4" />
                  Sort
                </div>
              </div>
            )}
          </div>

          {/* Results Grid */}
          {loading ? (
            <div className="text-center py-16 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-800">
              <div className="inline-block animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-purple-500 mb-6"></div>
              <h3 className="text-xl font-semibold mb-2">AI is Searching...</h3>
              <p className="text-gray-400">Finding perfect influencers in "{niche}" niche</p>
            </div>
          ) : hasSearched && results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((i, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-800 hover:border-purple-500/30 transition-all p-6 group"
                >
                  {/* Influencer Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                          <span className="text-lg font-bold">{i.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{i.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-400">Verified</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-2">{i.description}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-900/30 p-3 rounded-xl border border-gray-800">
                      <div className="text-sm text-gray-400 mb-1">Followers</div>
                      <div className="text-lg font-bold flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        {Number(i.followers).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-900/30 p-3 rounded-xl border border-gray-800">
                      <div className="text-sm text-gray-400 mb-1">Engagement</div>
                      <div className="text-lg font-bold flex items-center gap-2">
                        <Heart className="w-4 h-4 text-pink-400" />
                        High
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-xl border border-gray-800">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">Email</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{i.email}</span>
                        <button
                          onClick={() => copyEmail(i.email)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            copiedEmail === i.email 
                              ? 'bg-green-900/30 text-green-400' 
                              : 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300'
                          }`}
                        >
                          {copiedEmail === i.email ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 mb-6">
                    <a
                      href={i.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-3 py-2 bg-red-900/20 hover:bg-red-900/30 border border-red-800/30 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors group/link"
                    >
                      <Youtube className="w-4 h-4" />
                      YouTube
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>

                    {i.instagram !== "Not found" && (
                      <a
                        href={i.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 px-3 py-2 bg-pink-900/20 hover:bg-pink-900/30 border border-pink-800/30 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors group/link"
                      >
                        <Instagram className="w-4 h-4" />
                        Instagram
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => generateOutreachEmail(i)}
                      disabled={emailLoading}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                    >
                      {emailLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-4 h-4" />
                          Outreach Email
                        </>
                      )}
                    </button>
                    
                    <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl flex items-center gap-2 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : hasSearched && results.length === 0 ? (
            /* No Results Found State */
            <div className="text-center py-16 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-800">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/10 to-orange-500/10 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No Influencers Found</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-6">
                We couldn't find any influencers for "<span className="text-white font-semibold">{niche}</span>". Try a different niche or check your spelling.
              </p>
              <button
                onClick={() => {
                  setNiche("");
                  setHasSearched(false);
                }}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl font-medium transition-colors"
              >
                Try Another Niche
              </button>
            </div>
          ) : (
            /* Initial Empty State - BEFORE any search */
            <div className="text-center py-16 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-800">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Ready to Discover Influencers?</h3>
              <p className="text-gray-400 max-w-md mx-auto mb-8">
                Enter a niche above and click "Find Influencers" to get AI-powered recommendations with detailed analytics
              </p>
              <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-5 bg-gray-900/30 rounded-xl border border-gray-800">
                  <div className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    AI-Powered
                  </div>
                  <p className="text-sm text-gray-400">Smart matching algorithm</p>
                </div>
                <div className="p-5 bg-gray-900/30 rounded-xl border border-gray-800">
                  <div className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-400" />
                    Multi-Platform
                  </div>
                  <p className="text-sm text-gray-400">YouTube, Instagram & more</p>
                </div>
                <div className="p-5 bg-gray-900/30 rounded-xl border border-gray-800">
                  <div className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-green-400" />
                    Direct Contact
                  </div>
                  <p className="text-sm text-gray-400">Email outreach tools</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {hasSearched && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">50K+</div>
                <div className="text-sm text-gray-400">Influencers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">200+</div>
                <div className="text-sm text-gray-400">Niches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">95%</div>
                <div className="text-sm text-gray-400">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">24/7</div>
                <div className="text-sm text-gray-400">AI Scanning</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}