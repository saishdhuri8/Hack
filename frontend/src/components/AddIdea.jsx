import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  X, 
  TrendingUp, 
  Users, 
  Target,
  DollarSign,
  Mic,
  Globe,
  Plus,
  AlertCircle
} from 'lucide-react';

export default function AddIdea() {
  const [formData, setFormData] = useState({
    brandName: '',
    productService: '',
    targetAudience: '',
    goal: '',
    platforms: [],
    budgetRange: '',
    tone: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const platformOptions = ['Instagram', 'LinkedIn', 'YouTube', 'Facebook', 'Twitter/X', 'TikTok', 'Pinterest', 'WhatsApp', 'Email'];
  const goalOptions = ['Leads', 'Awareness', 'Sales', 'Engagement', 'Traffic', 'Conversions'];
  const toneOptions = ['Professional', 'Fun/Casual', 'Premium/Luxury', 'Youth/Gen-Z', 'Friendly', 'Bold/Edgy', 'Inspirational'];
  const budgetRanges = ['$100 - $500', '$500 - $2,000', '$2,000 - $5,000', '$5,000 - $10,000', '$10,000+', 'Custom'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePlatformToggle = (platform) => {
    setFormData(prev => {
      const platforms = prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform];
      return { ...prev, platforms };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!formData.brandName.trim()) newErrors.brandName = 'Brand name is required';
    if (!formData.productService.trim()) newErrors.productService = 'Product/Service is required';
    if (!formData.targetAudience.trim()) newErrors.targetAudience = 'Target audience is required';
    if (!formData.goal) newErrors.goal = 'Please select a goal';
    if (formData.platforms.length === 0) newErrors.platforms = 'Select at least one platform';
    if (!formData.budgetRange) newErrors.budgetRange = 'Budget range is required';
    if (!formData.tone) newErrors.tone = 'Please select a tone';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you would typically send data to your backend
    console.log('Form submitted:', formData);
    
    // Show success alert
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      brandName: '',
      productService: '',
      targetAudience: '',
      goal: '',
      platforms: [],
      budgetRange: '',
      tone: ''
    });
    
    // Hide success alert after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Alert */}
      {showSuccess && (
        <div className="mb-6 animate-slideDown">
          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-green-300">Idea Added Successfully!</div>
                <div className="text-sm text-green-400">Your business idea has been added to your profile. Great work! 🎉</div>
              </div>
            </div>
            <button 
              onClick={() => setShowSuccess(false)}
              className="text-green-400 hover:text-green-300 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Form Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Add New Business Idea</h1>
            <p className="text-gray-400">Fill in the details to create a new marketing campaign idea</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Brand Name & Product/Service Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Target className="w-4 h-4" />
              Brand Name *
            </label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              placeholder="Enter brand name"
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                errors.brandName ? 'border-red-500/50' : 'border-gray-800 hover:border-gray-700'
              }`}
            />
            {errors.brandName && (
              <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.brandName}
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <TrendingUp className="w-4 h-4" />
              Product / Service *
            </label>
            <input
              type="text"
              name="productService"
              value={formData.productService}
              onChange={handleChange}
              placeholder="What are you selling/offering?"
              className={`w-full px-4 py-3 bg-gray-900/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                errors.productService ? 'border-red-500/50' : 'border-gray-800 hover:border-gray-700'
              }`}
            />
            {errors.productService && (
              <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.productService}
              </div>
            )}
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Users className="w-4 h-4" />
            Target Audience *
          </label>
          <textarea
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            placeholder="Describe your ideal customers (age, interests, demographics, etc.)"
            rows="3"
            className={`w-full px-4 py-3 bg-gray-900/50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none ${
              errors.targetAudience ? 'border-red-500/50' : 'border-gray-800 hover:border-gray-700'
            }`}
          />
          {errors.targetAudience && (
            <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.targetAudience}
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2">Example: "Aged 25-35, tech-savvy professionals interested in productivity tools"</p>
        </div>

        {/* Goal Selection */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Target className="w-4 h-4" />
            Campaign Goal *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {goalOptions.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => handleChange({ target: { name: 'goal', value: goal } })}
                className={`
                  px-4 py-3 rounded-xl border transition-all duration-300
                  ${formData.goal === goal 
                    ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/20 border-purple-500 text-white' 
                    : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800/30 text-gray-300'
                  }
                  hover:scale-[1.02] active:scale-[0.98]
                `}
              >
                <div className="font-medium text-sm">{goal}</div>
              </button>
            ))}
          </div>
          {errors.goal && (
            <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.goal}
            </div>
          )}
        </div>

        {/* Platforms Selection */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
            <Globe className="w-4 h-4" />
            Platforms *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {platformOptions.map((platform) => (
              <button
                key={platform}
                type="button"
                onClick={() => handlePlatformToggle(platform)}
                className={`
                  relative px-4 py-3 rounded-xl border transition-all duration-300 group
                  ${formData.platforms.includes(platform)
                    ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border-blue-500' 
                    : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800/30'
                  }
                  hover:scale-[1.02] active:scale-[0.98]
                `}
              >
                <div className={`font-medium text-sm ${formData.platforms.includes(platform) ? 'text-white' : 'text-gray-300'}`}>
                  {platform}
                </div>
                {formData.platforms.includes(platform) && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            ))}
          </div>
          {errors.platforms && (
            <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.platforms}
            </div>
          )}
        </div>

        {/* Budget Range & Tone */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
              <DollarSign className="w-4 h-4" />
              Budget Range *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {budgetRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => handleChange({ target: { name: 'budgetRange', value: range } })}
                  className={`
                    px-4 py-3 rounded-xl border transition-all duration-300
                    ${formData.budgetRange === range 
                      ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/20 border-green-500 text-white' 
                      : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800/30 text-gray-300'
                    }
                    hover:scale-[1.02] active:scale-[0.98]
                  `}
                >
                  <div className="font-medium text-sm">{range}</div>
                </button>
              ))}
            </div>
            {errors.budgetRange && (
              <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.budgetRange}
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
              <Mic className="w-4 h-4" />
              Brand Tone *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {toneOptions.map((tone) => (
                <button
                  key={tone}
                  type="button"
                  onClick={() => handleChange({ target: { name: 'tone', value: tone } })}
                  className={`
                    px-4 py-3 rounded-xl border transition-all duration-300
                    ${formData.tone === tone 
                      ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/20 border-purple-500 text-white' 
                      : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800/30 text-gray-300'
                    }
                    hover:scale-[1.02] active:scale-[0.98]
                  `}
                >
                  <div className="font-medium text-sm">{tone}</div>
                </button>
              ))}
            </div>
            {errors.tone && (
              <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.tone}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-800">
          <button
            type="submit"
            className="
              w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4
              bg-gradient-to-r from-purple-600 to-pink-600
              hover:from-purple-700 hover:to-pink-700
              text-white font-semibold rounded-xl
              transition-all duration-300
              hover:scale-[1.02] active:scale-[0.98]
              shadow-lg hover:shadow-purple-900/40
              group
            "
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Add New Idea
            <Sparkles className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <p className="text-center text-gray-500 text-sm mt-4">
            Your idea will be processed by AI and added to your campaign dashboard
          </p>
        </div>
      </form>

      {/* Form Preview (Optional) */}
      {Object.values(formData).some(val => 
        typeof val === 'string' ? val.trim() !== '' : val.length > 0
      ) && (
        <div className="mt-12 p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl border border-gray-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Idea Preview</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {formData.brandName && (
              <div className="p-3 bg-gray-900/30 rounded-lg">
                <div className="text-sm text-gray-400">Brand</div>
                <div className="font-medium">{formData.brandName}</div>
              </div>
            )}
            {formData.productService && (
              <div className="p-3 bg-gray-900/30 rounded-lg">
                <div className="text-sm text-gray-400">Product/Service</div>
                <div className="font-medium">{formData.productService}</div>
              </div>
            )}
            {formData.goal && (
              <div className="p-3 bg-gray-900/30 rounded-lg">
                <div className="text-sm text-gray-400">Goal</div>
                <div className="font-medium">{formData.goal}</div>
              </div>
            )}
            {formData.platforms.length > 0 && (
              <div className="p-3 bg-gray-900/30 rounded-lg">
                <div className="text-sm text-gray-400">Platforms</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.platforms.map(p => (
                    <span key={p} className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}