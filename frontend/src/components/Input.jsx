import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  ChevronDown, 
  Lightbulb,
  X,
  Zap
} from 'lucide-react';

const Input = ({ onGenerate, placeholder = "Describe what you want to create..." }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showIdeasDropdown, setShowIdeasDropdown] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const dropdownRef = useRef(null);

  // Sample saved ideas
  const savedIdeas = [
    {
      id: 1,
      title: 'TechFlow AI Tool Launch',
      description: 'Launch campaign for AI productivity tool',
      prompt: "Create a marketing campaign for TechFlow, an AI productivity tool targeting tech professionals aged 25-40. Focus on LinkedIn and Twitter/X."
    },
    {
      id: 2,
      title: 'Bloom Beauty Skincare',
      description: 'Organic skincare campaign',
      prompt: "Develop a social media campaign for Bloom Beauty organic skincare targeting women 18-35. Use Instagram and TikTok."
    },
    {
      id: 3,
      title: 'FitFuel Protein Launch',
      description: 'Fitness supplement campaign',
      prompt: "Create marketing content for FitFuel protein supplements targeting fitness enthusiasts 20-45. Use Instagram and Facebook."
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowIdeasDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generateContent();
  };

  const generateContent = async () => {
    if (!prompt.trim() && !selectedIdea) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (onGenerate) {
      const content = {
        prompt: selectedIdea ? selectedIdea.prompt : prompt,
        idea: selectedIdea,
        timestamp: new Date().toISOString()
      };
      onGenerate(content);
    }
    
    setIsLoading(false);
    setPrompt('');
    setSelectedIdea(null);
  };

  const handleSelectIdea = (idea) => {
    setSelectedIdea(idea);
    setPrompt(idea.prompt);
    setShowIdeasDropdown(false);
  };

  const handleClearIdea = () => {
    setSelectedIdea(null);
    setPrompt('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      generateContent();
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Main Prompt Input */}
      <div>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full px-4 py-3 pl-12 bg-gray-900/50 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none min-h-[60px] max-h-[120px] text-white placeholder-gray-500"
            rows="2"
          />
          
          {/* Left Icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>

          {/* Clear Button */}
          {prompt && (
            <button
              type="button"
              onClick={() => setPrompt('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* OR Separator */}
      <div className="flex items-center justify-center">
        <div className="h-px bg-gray-800 flex-1"></div>
        <div className="px-4 text-sm text-gray-500 font-medium">OR</div>
        <div className="h-px bg-gray-800 flex-1"></div>
      </div>

      {/* Saved Ideas Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setShowIdeasDropdown(!showIdeasDropdown)}
          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 hover:border-gray-700 rounded-xl text-left flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="font-medium">Select from your ideas</div>
              <div className="text-xs text-gray-400">
                {selectedIdea 
                  ? selectedIdea.title
                  : 'Choose a saved idea'}
              </div>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showIdeasDropdown ? 'rotate-180' : ''}`} />
        </button>

        {/* Selected Idea Badge */}
        {selectedIdea && (
          <div className="mt-2 flex items-center justify-between bg-gradient-to-r from-blue-900/20 to-cyan-900/10 border border-blue-800/30 rounded-xl p-3">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-4 h-4 text-blue-400" />
              <div className="flex-1">
                <div className="font-medium text-sm">{selectedIdea.title}</div>
                <div className="text-xs text-gray-400 truncate">{selectedIdea.description}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClearIdea}
              className="text-gray-400 hover:text-gray-300 p-1 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Ideas Dropdown */}
        {showIdeasDropdown && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
            {savedIdeas.map((idea) => (
              <button
                key={idea.id}
                type="button"
                onClick={() => handleSelectIdea(idea)}
                className={`w-full px-4 py-3 hover:bg-gray-800/50 border-b border-gray-800 last:border-b-0 transition-colors text-left ${
                  selectedIdea?.id === idea.id ? 'bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium mb-1">{idea.title}</div>
                    <div className="text-sm text-gray-400">{idea.description}</div>
                  </div>
                </div>
              </button>
            ))}
            
            {savedIdeas.length === 0 && (
              <div className="p-6 text-center">
                <Lightbulb className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                <div className="text-sm text-gray-500">No saved ideas yet</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Generate Button - Now below both options */}
      <form onSubmit={handleSubmit} className="pt-4">
        <button
          type="submit"
          disabled={(!prompt.trim() && !selectedIdea) || isLoading}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all group"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Generating...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 group-hover:animate-pulse" />
              Generate Campaign
            </>
          )}
        </button>
        
        {/* Keyboard Shortcut Hint */}
        <div className="text-center mt-3 text-xs text-gray-500">
          Press <kbd className="px-1.5 py-0.5 bg-gray-900 border border-gray-800 rounded text-xs mx-1">Ctrl</kbd> + 
          <kbd className="px-1.5 py-0.5 bg-gray-900 border border-gray-800 rounded text-xs mx-1">Enter</kbd> to generate
        </div>
      </form>
    </div>
  );
};

export default Input;