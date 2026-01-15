import React, { useState } from 'react';
import Input from './Input';
import { 
  Captions, Sparkles, Copy, Download, RefreshCw, 
  CheckCircle, AlertCircle, Hash, Volume2, 
  Instagram, Youtube, Facebook, FileText, 
  Type, MessageSquare, ChevronDown, ChevronUp,
  ExternalLink, BarChart, HashIcon, Globe
} from 'lucide-react';

export default function CaptionGenerator() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [copiedItem, setCopiedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('instagram');
  
  // Mock saved templates
  const savedCaptionTemplates = [
    {
      id: 1,
      title: 'Eco-Friendly Home Brand',
      description: 'Sustainable products • Tree planting • Professional tone',
      prompt: 'Generate marketing content for an eco-friendly home decor brand called EcoNest. Focus on sustainability, carbon-neutral products, and tree planting with every purchase.',
      serviceType: 'captions'
    },
    {
      id: 2,
      title: 'Fitness App Launch',
      description: 'Workout tracking • Community • Inspirational',
      prompt: 'Create content for launching a new fitness app. Focus on workout tracking, community features, and health transformation stories.',
      serviceType: 'captions'
    }
  ];

  const handleGenerateContent = async (inputData) => {
    if (!inputData.prompt) {
      setError("Please enter a prompt or select a template");
      return;
    }

    setLoading(true);
    setError(null);
    setContent(null);
    setCopiedItem(null);

    try {
      // CALL YOUR ACTUAL BACKEND ENDPOINT
      const response = await fetch('http://localhost:5000/api/captions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: inputData.prompt,
          serviceType: 'captions',
          tone: selectedTone
          // Add any other parameters your backend expects
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === 'SUCCESS') {
        console.log("Received content:", result.data); // Debug log
        setContent(result.data);
      } else {
        throw new Error(result.message || 'Failed to generate content');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error('Error generating content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (text, type, index = null) => {
    navigator.clipboard.writeText(text);
    const key = index !== null ? `${type}-${index}` : type;
    setCopiedItem(key);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleDownloadAll = () => {
    if (content) {
      const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `content-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleRegenerate = () => {
    if (savedCaptionTemplates[0]?.prompt) {
      handleGenerateContent({ prompt: savedCaptionTemplates[0].prompt });
    }
  };

  const tones = [
    { id: 'professional', name: 'Professional', color: 'from-blue-500 to-cyan-500' },
    { id: 'inspirational', name: 'Inspirational', color: 'from-purple-500 to-pink-500' },
    { id: 'conversational', name: 'Conversational', color: 'from-green-500 to-emerald-500' },
    { id: 'urgent', name: 'Urgent', color: 'from-red-500 to-orange-500' }
  ];

  const tabs = [
    { id: 'instagram', name: 'Instagram Captions', icon: <Instagram className="w-4 h-4" />, count: content?.instagram_captions?.length || 0 },
    { id: 'adcopy', name: 'Ad Copy', icon: <Type className="w-4 h-4" />, count: content?.ad_copy?.length || 0 },
    { id: 'blog', name: 'Blog Content', icon: <FileText className="w-4 h-4" />, hasContent: !!content?.blog_content },
    { id: 'ctas', name: 'CTAs', icon: <HashIcon className="w-4 h-4" />, count: content?.ctas?.length || 0 }
  ];

  // Calculate statistics
  const calculateStats = () => {
    if (!content) return { totalItems: 0, totalChars: 0, totalWords: 0 };
    
    let totalItems = 0;
    let totalChars = 0;
    let totalWords = 0;
    
    // Instagram captions
    if (content.instagram_captions) {
      content.instagram_captions.forEach(caption => {
        totalChars += caption.length;
        totalWords += caption.split(/\s+/).length;
      });
      totalItems += content.instagram_captions.length;
    }
    
    // Ad copy
    if (content.ad_copy) {
      content.ad_copy.forEach(ad => {
        if (ad.headline) {
          totalChars += ad.headline.length;
          totalWords += ad.headline.split(/\s+/).length;
        }
        if (ad.description) {
          totalChars += ad.description.length;
          totalWords += ad.description.split(/\s+/).length;
        }
        totalItems += 1;
      });
    }
    
    // Blog content
    if (content.blog_content?.intro) {
      totalChars += content.blog_content.intro.length;
      totalWords += content.blog_content.intro.split(/\s+/).length;
      totalItems += 1;
    }
    
    // CTAs
    if (content.ctas) {
      content.ctas.forEach(cta => {
        totalChars += cta.length;
        totalWords += cta.split(/\s+/).length;
      });
      totalItems += content.ctas.length;
    }
    
    return { totalItems, totalChars, totalWords };
  };

  const stats = calculateStats();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
            <Captions className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Content Generator</h1>
            <p className="text-gray-400">AI-powered marketing content creation</p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl border border-gray-800 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Generate Content</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Tone:</span>
            <div className="flex gap-2">
              {tones.map(tone => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`px-3 py-1 rounded-lg text-xs transition-all ${
                    selectedTone === tone.id 
                      ? 'bg-gradient-to-r bg-gray-800 text-white border border-gray-700' 
                      : 'bg-gray-900/50 text-gray-400 hover:text-gray-300 hover:bg-gray-800/30'
                  }`}
                >
                  {tone.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <Input 
          onGenerate={handleGenerateContent}
          placeholder="Describe your brand, product, or campaign idea..."
          savedIdeas={savedCaptionTemplates}
          serviceType="captions"
          generateButtonText="Generate Marketing Content"
          ideasTitle="Select from templates"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-16 bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl border border-gray-800 mb-8">
          <div className="inline-block animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-green-500 mb-6"></div>
          <h3 className="text-2xl font-bold mb-3">AI is Generating Your Content</h3>
          <p className="text-gray-400 max-w-md mx-auto">Creating Instagram captions, ad copy, blog content, and CTAs tailored to your brand</p>
          <div className="mt-6 flex justify-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-300"></div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-gradient-to-br from-red-900/20 to-rose-900/10 border border-red-800/30 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <div>
              <h3 className="text-xl font-semibold">Error Generating Content</h3>
              <p className="text-gray-300 mt-1">{error}</p>
            </div>
          </div>
          <button 
            onClick={() => setError(null)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Generated Content */}
      {content && !loading && !error && (
        <div className="space-y-8">
          {/* Header with Stats */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl border border-gray-800 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-green-400">Generated Content</h2>
                <p className="text-gray-400">Complete marketing package ready to use</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadAll}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download All (JSON)
                </button>
                <button
                  onClick={handleRegenerate}
                  className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                <div className="text-2xl font-bold">{stats.totalItems}</div>
                <div className="text-sm text-gray-400">Total Content Items</div>
              </div>
              <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                <div className="text-2xl font-bold">{stats.totalWords}</div>
                <div className="text-sm text-gray-400">Total Words</div>
              </div>
              <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                <div className="text-2xl font-bold">{stats.totalChars}</div>
                <div className="text-sm text-gray-400">Total Characters</div>
              </div>
              <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-700">
                <div className="text-2xl font-bold">{tabs.reduce((sum, tab) => sum + (tab.count || 0), 0)}</div>
                <div className="text-sm text-gray-400">Variations</div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl border border-gray-800 overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-800 overflow-x-auto">
              {tabs.map(tab => {
                const hasContent = tab.hasContent !== undefined ? tab.hasContent : (tab.count > 0);
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    disabled={!hasContent}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                      !hasContent ? 'opacity-50 cursor-not-allowed' : ''
                    } ${
                      activeTab === tab.id 
                        ? 'border-green-500 text-green-400' 
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    {tab.icon}
                    {tab.name}
                    {tab.count > 0 && (
                      <span className="px-1.5 py-0.5 text-xs bg-gray-800 rounded">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* Instagram Captions Tab */}
              {activeTab === 'instagram' && content.instagram_captions && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                        <Instagram className="w-5 h-5 text-pink-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Instagram Captions</h3>
                        <p className="text-sm text-gray-400">{content.instagram_captions.length} captions ready to post</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {content.instagram_captions.map((caption, index) => {
                      const charCount = caption.length;
                      const wordCount = caption.split(/\s+/).length;
                      const hashtagCount = (caption.match(/#/g) || []).length;
                      
                      return (
                        <div key={index} className="bg-gray-900/30 p-5 rounded-xl border border-gray-800 hover:border-green-500/20 transition-all">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
                                <span className="text-sm font-semibold text-green-400">#{index + 1}</span>
                              </div>
                              <div className="text-sm text-gray-400">
                                <span className="font-medium">{wordCount} words</span> • <span>{charCount} chars</span> • <span>{hashtagCount} hashtags</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleCopyText(caption, 'instagram', index)}
                              className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                                copiedItem === `instagram-${index}` 
                                  ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                                  : 'bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300'
                              }`}
                            >
                              {copiedItem === `instagram-${index}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              {copiedItem === `instagram-${index}` ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                          
                          <div className="prose prose-invert max-w-none">
                            <p className="text-gray-200 whitespace-pre-wrap leading-relaxed text-lg">
                              {caption}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Ad Copy Tab */}
              {activeTab === 'adcopy' && content.ad_copy && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                        <Type className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Ad Copy</h3>
                        <p className="text-sm text-gray-400">{content.ad_copy.length} ad variations</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {content.ad_copy.map((ad, index) => (
                      <div key={index} className="bg-gray-900/30 p-5 rounded-xl border border-gray-800 hover:border-blue-500/20 transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-blue-900/20 flex items-center justify-center">
                              <span className="text-xs font-semibold text-blue-400">{index + 1}</span>
                            </div>
                            <span className="text-sm text-gray-400">Ad Variation</span>
                          </div>
                          <button
                            onClick={() => handleCopyText(`${ad.headline}\n\n${ad.description}`, 'adcopy', index)}
                            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                              copiedItem === `adcopy-${index}` 
                                ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' 
                                : 'bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300'
                            }`}
                          >
                            {copiedItem === `adcopy-${index}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedItem === `adcopy-${index}` ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="text-xs text-gray-500 mb-2 font-medium">HEADLINE</div>
                            <h4 className="text-xl font-bold text-white leading-tight">{ad.headline}</h4>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-2 font-medium">DESCRIPTION</div>
                            <p className="text-gray-300 leading-relaxed">{ad.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Content Tab */}
              {activeTab === 'blog' && content.blog_content && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Blog Content</h3>
                        <p className="text-sm text-gray-400">Intro and title suggestions</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Blog Titles */}
                    {content.blog_content.titles && content.blog_content.titles.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-4 text-gray-300">Suggested Titles</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {content.blog_content.titles.map((title, index) => (
                            <div key={index} className="bg-gray-900/30 p-4 rounded-xl border border-gray-700 flex items-start gap-3">
                              <div className="w-6 h-6 rounded-lg bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-semibold text-purple-400">{index + 1}</span>
                              </div>
                              <span className="text-gray-200 font-medium">{title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Blog Intro */}
                    {content.blog_content.intro && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-300">Blog Introduction</h4>
                          <button
                            onClick={() => handleCopyText(content.blog_content.intro, 'blog-intro')}
                            className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                              copiedItem === 'blog-intro' 
                                ? 'bg-purple-900/30 text-purple-400 border border-purple-800/50' 
                                : 'bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300'
                            }`}
                          >
                            {copiedItem === 'blog-intro' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copiedItem === 'blog-intro' ? 'Copied!' : 'Copy Intro'}
                          </button>
                        </div>
                        <div className="bg-gray-900/30 p-5 rounded-xl border border-gray-700">
                          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                            {content.blog_content.intro}
                          </p>
                          <div className="mt-5 pt-5 border-t border-gray-800 text-sm text-gray-500 flex justify-between">
                            <span>{content.blog_content.intro.length} characters</span>
                            <span>{content.blog_content.intro.split(/\s+/).length} words</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* CTAs Tab */}
              {activeTab === 'ctas' && content.ctas && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                        <HashIcon className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Call-to-Actions</h3>
                        <p className="text-sm text-gray-400">{content.ctas.length} CTA variations</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {content.ctas.map((cta, index) => (
                      <div key={index} className="bg-gray-900/30 p-5 rounded-xl border border-gray-800 hover:border-orange-500/20 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-orange-900/20 flex items-center justify-center">
                              <span className="text-xs font-semibold text-orange-400">{index + 1}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleCopyText(cta, 'cta', index)}
                            className={`p-2 rounded-lg transition-colors ${
                              copiedItem === `cta-${index}` 
                                ? 'bg-orange-900/30 text-orange-400' 
                                : 'bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-gray-300 opacity-0 group-hover:opacity-100'
                            }`}
                          >
                            {copiedItem === `cta-${index}` ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                        
                        <p className="text-gray-200 text-lg font-medium leading-relaxed">{cta}</p>
                        <div className="mt-4 pt-4 border-t border-gray-800 text-sm text-gray-500">
                          {cta.length} characters
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!content && !loading && !error && (
        <div className="text-center py-16 bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl border border-gray-800">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <Captions className="w-10 h-10 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Ready to Create Amazing Content?</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-8">Describe your brand or product, and our AI will generate Instagram captions, ad copy, blog content, and CTAs tailored to your needs.</p>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-5 bg-gray-900/30 rounded-xl border border-gray-800">
              <div className="text-lg font-bold mb-2">1. Describe</div>
              <p className="text-sm text-gray-400">Tell us about your brand or product</p>
            </div>
            <div className="p-5 bg-gray-900/30 rounded-xl border border-gray-800">
              <div className="text-lg font-bold mb-2">2. Customize</div>
              <p className="text-sm text-gray-400">Choose your preferred tone and style</p>
            </div>
            <div className="p-5 bg-gray-900/30 rounded-xl border border-gray-800">
              <div className="text-lg font-bold mb-2">3. Generate</div>
              <p className="text-sm text-gray-400">Get complete marketing content package</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}