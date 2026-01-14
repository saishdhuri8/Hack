import React, { useState } from 'react';
import { Send, Sparkles, Zap, Mic } from 'lucide-react';

const NewPrompt = ({ onPromptSubmit, placeholder = "Ask AI anything..." }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (onPromptSubmit) {
      onPromptSubmit(prompt);
    }
    
    setIsLoading(false);
    setPrompt('');
  };

  const quickPrompts = [
    "Create a social media campaign",
    "Write marketing copy",
    "Generate content ideas",
    "Analyze target audience"
  ];

  return (
    <div className="w-full">
      {/* Quick Prompt Suggestions */}
      

      {/* Main Prompt Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 pl-12 pr-24 bg-gray-900/50 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none min-h-[60px] max-h-[120px] text-white placeholder-gray-500"
            rows="2"
          />
          
          {/* Left Icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>

          {/* Right Side Controls */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Character Counter */}
            <div className="text-xs text-gray-500">
              {prompt.length}/500
            </div>
            
            {/* Divider */}
            <div className="w-px h-6 bg-gray-800"></div>
            
            {/* Voice Input */}
            <button
              type="button"
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              title="Voice input"
            >
              <Mic className="w-4 h-4 text-gray-400" />
            </button>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium text-white flex items-center gap-2 transition-all"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between mt-2 px-2">
          <div className="text-xs text-gray-500">
            Press <kbd className="px-1.5 py-0.5 bg-gray-900 border border-gray-800 rounded text-xs">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-900 border border-gray-800 rounded text-xs">Enter</kbd> to send
          </div>
          <button
            type="button"
            onClick={() => setPrompt('')}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPrompt;