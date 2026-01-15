import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  ChevronDown, 
  Lightbulb,
  X,
  Zap,
  Captions,
  FileText
} from 'lucide-react';

const Input = ({ 
  onGenerate, 
  placeholder = "Describe what you want to create...", 
  savedIdeas = [],
  serviceType = "campaign", // New: campaign, captions, etc.
  generateButtonText = "Generate", // Customizable button text
  ideasTitle = "Select from your ideas"
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showIdeasDropdown, setShowIdeasDropdown] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowIdeasDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Get service-specific configuration
  const getServiceConfig = () => {
    const configs = {
      campaign: {
        icon: <Sparkles className="w-5 h-5 text-purple-400" />,
        buttonColor: "from-purple-600 to-pink-600",
        buttonHover: "from-purple-700 to-pink-700",
        ideasColor: "from-blue-600/20 to-cyan-600/20",
        ideasIcon: <Lightbulb className="w-4 h-4 text-blue-400" />
      },
      captions: {
        icon: <Captions className="w-5 h-5 text-green-400" />,
        buttonColor: "from-green-600 to-emerald-600",
        buttonHover: "from-green-700 to-emerald-700",
        ideasColor: "from-green-600/20 to-teal-600/20",
        ideasIcon: <FileText className="w-4 h-4 text-green-400" />
      }
    };

    return configs[serviceType] || configs.campaign;
  };

  const config = getServiceConfig();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await generateContent();
  };

  const generateContent = async () => {
    if (!prompt.trim() && !selectedIdea) return;
    
    setIsLoading(true);
    
    if (onGenerate) {
      const content = {
        prompt: selectedIdea ? selectedIdea.prompt : prompt,
        idea: selectedIdea,
        serviceType: serviceType,
        timestamp: new Date().toISOString()
      };
      await onGenerate(content);
    }
    
    setIsLoading(false);
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
            {config.icon}
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
      {savedIdeas.length > 0 && (
        <div className="flex items-center justify-center">
          <div className="h-px bg-gray-800 flex-1"></div>
          <div className="px-4 text-sm text-gray-500 font-medium">OR</div>
          <div className="h-px bg-gray-800 flex-1"></div>
        </div>
      )}

      {/* Saved Ideas Dropdown */}
      {savedIdeas.length > 0 && (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowIdeasDropdown(!showIdeasDropdown)}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 hover:border-gray-700 rounded-xl text-left flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${config.ideasColor} flex items-center justify-center`}>
                {config.ideasIcon}
              </div>
              <div>
                <div className="font-medium">{ideasTitle}</div>
                <div className="text-xs text-gray-400">
                  {selectedIdea 
                    ? selectedIdea.title
                    : savedIdeas.length > 0 ? `${savedIdeas.length} ideas available` : 'No saved ideas yet'}
                </div>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${showIdeasDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Selected Idea Badge */}
          {selectedIdea && (
            <div className={`mt-2 flex items-center justify-between bg-gradient-to-r ${config.buttonColor.replace('600', '900/20')} border ${config.buttonColor.replace('600', '800/30')} rounded-xl p-3`}>
              <div className="flex items-center gap-3">
                {config.ideasIcon}
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
              {savedIdeas.length > 0 ? (
                savedIdeas.map((idea) => (
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
                ))
              ) : (
                <div className="p-6 text-center">
                  <Lightbulb className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                  <div className="text-sm text-gray-500">No saved ideas yet</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Generate Button */}
      <form onSubmit={handleSubmit} className="pt-4">
        <button
          type="submit"
          disabled={(!prompt.trim() && !selectedIdea) || isLoading}
          className={`w-full px-6 py-3 bg-gradient-to-r ${config.buttonColor} hover:${config.buttonHover} disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white flex items-center justify-center gap-3 transition-all group`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Generating...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 group-hover:animate-pulse" />
              {generateButtonText}
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