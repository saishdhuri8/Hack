import React, { useState, useEffect } from 'react';
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
  AlertCircle,
  Trash2,
  Edit,
  Eye,
  Calendar,
  Filter,
  Search,
  ChevronDown,
  MessageSquare,
  BarChart
} from 'lucide-react';

export default function Ideas() {
  // Load ideas from localStorage on initial render
  const [ideas, setIdeas] = useState(() => {
    const saved = localStorage.getItem('campaignIdeas');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        brandName: 'TechFlow',
        productService: 'AI Productivity Tool',
        targetAudience: 'Tech professionals aged 25-40, remote workers',
        goal: 'Leads',
        platforms: ['LinkedIn', 'Twitter/X'],
        budgetRange: 'INR.2,000 - INR.5,000',
        tone: 'Professional',
        date: '2024-01-15',
        status: 'Active'
      },
      {
        id: 2,
        brandName: 'Bloom Beauty',
        productService: 'Organic Skincare',
        targetAudience: 'Women 18-35 interested in natural products',
        goal: 'Awareness',
        platforms: ['Instagram', 'TikTok', 'YouTube'],
        budgetRange: 'INR.5,000 - INR.10,000',
        tone: 'Youth/Gen-Z',
        date: '2024-01-10',
        status: 'Pending'
      },
      {
        id: 3,
        brandName: 'FitFuel',
        productService: 'Protein Supplements',
        targetAudience: 'Fitness enthusiasts, gym-goers 20-45',
        goal: 'Sales',
        platforms: ['Instagram', 'Facebook', 'Email'],
        budgetRange: 'INR.500 - INR2,000',
        tone: 'Friendly',
        date: '2024-01-05',
        status: 'Completed'
      }
    ];
  });

  // Save to localStorage whenever ideas change
  useEffect(() => {
    localStorage.setItem('campaignIdeas', JSON.stringify(ideas));
  }, [ideas]);

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  const platformOptions = ['Instagram', 'LinkedIn', 'YouTube', 'Facebook', 'Twitter/X', 'TikTok', 'Pinterest', 'WhatsApp', 'Email'];
  const goalOptions = ['Leads', 'Awareness', 'Sales', 'Engagement', 'Traffic', 'Conversions'];
  const toneOptions = ['Professional', 'Fun/Casual', 'Premium/Luxury', 'Youth/Gen-Z', 'Friendly', 'Bold/Edgy', 'Inspirational'];
  const budgetRanges = ['INR.100 - INR.500', 'INR.500 - INR.2,000', 'INR.2,000 - INR.5,000', 'INR.5,000 - INR.10,000', 'INR.10,000+', 'Custom'];
  const statusOptions = ['All', 'Active', 'Pending', 'Completed'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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

    // Add new idea to the list
    const newIdea = {
      id: ideas.length + 1,
      ...formData,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    setIdeas([newIdea, ...ideas]);
    
    // Show success alert
    setShowSuccess(true);
    
    // Reset form and close it
    setFormData({
      brandName: '',
      productService: '',
      targetAudience: '',
      goal: '',
      platforms: [],
      budgetRange: '',
      tone: ''
    });
    setShowAddForm(false);
    
    // Hide success alert after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleDeleteIdea = (id) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = 
      idea.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.productService.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || idea.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-900/30 text-green-400 border-green-800';
      case 'Pending': return 'bg-yellow-900/30 text-yellow-400 border-yellow-800';
      case 'Completed': return 'bg-blue-900/30 text-blue-400 border-blue-800';
      default: return 'bg-gray-900/30 text-gray-400 border-gray-800';
    }
  };
  const formatIdeasForInput = () => {
    return ideas.map(idea => ({
      id: idea.id,
      title: idea.brandName,
      description: `${idea.productService} • ${idea.goal} • ${idea.budgetRange}`,
      prompt: `Create a marketing campaign for ${idea.brandName}, which offers ${idea.productService}. Target audience: ${idea.targetAudience}. Primary goal: ${idea.goal}. Recommended platforms: ${idea.platforms.join(', ')}. Brand tone: ${idea.tone}. Budget range: ${idea.budgetRange}.`
    }));
  };

  return (
    <div className="max-w-7xl mx-auto">
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
                <div className="text-sm text-green-400">Your business idea has been added to your ideas list. Great work! 🎉</div>
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

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Business Ideas</h1>
            <p className="text-gray-400">Manage and create new marketing campaign ideas</p>
          </div>
        </div>
      </div>

      {/* Add Idea Button */}
      <div className="mb-8">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
        >
          <Plus className="w-5 h-5" />
          {showAddForm ? 'Cancel' : 'Add New Idea'}
        </button>
      </div>

      {/* Add Idea Form (Conditional) */}
      {showAddForm && (
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl border border-gray-800 p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Create New Idea</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                rows="2"
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
            </div>

            {/* Goal Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-3">
                <Target className="w-4 h-4" />
                Campaign Goal *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {goalOptions.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => handleChange({ target: { name: 'goal', value: goal } })}
                    className={`
                      px-3 py-2 rounded-lg border transition-all duration-300 text-sm
                      ${formData.goal === goal 
                        ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/20 border-purple-500 text-white' 
                        : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800/30 text-gray-300'
                      }
                    `}
                  >
                    {goal}
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
              <div className="flex flex-wrap gap-2">
                {platformOptions.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => handlePlatformToggle(platform)}
                    className={`
                      px-3 py-2 rounded-lg border transition-all duration-300 text-sm flex items-center gap-2
                      ${formData.platforms.includes(platform)
                        ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border-blue-500 text-white' 
                        : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800/30 text-gray-300'
                      }
                    `}
                  >
                    {platform}
                    {formData.platforms.includes(platform) && <Check className="w-3 h-3" />}
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
                <div className="grid grid-cols-2 gap-2">
                  {budgetRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => handleChange({ target: { name: 'budgetRange', value: range } })}
                      className={`
                        px-3 py-2 rounded-lg border transition-all duration-300 text-sm
                        ${formData.budgetRange === range 
                          ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/20 border-green-500 text-white' 
                          : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800/30 text-gray-300'
                        }
                      `}
                    >
                      {range}
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
                <div className="grid grid-cols-2 gap-2">
                  {toneOptions.slice(0, 6).map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => handleChange({ target: { name: 'tone', value: tone } })}
                      className={`
                        px-3 py-2 rounded-lg border transition-all duration-300 text-sm
                        ${formData.tone === tone 
                          ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/20 border-purple-500 text-white' 
                          : 'bg-gray-900/50 border-gray-800 hover:border-gray-700 hover:bg-gray-800/30 text-gray-300'
                        }
                      `}
                    >
                      {tone}
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

            {/* Form Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-800">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
                Save Idea
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 bg-gray-900/50 hover:bg-gray-800 border border-gray-800 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl border border-gray-800 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search ideas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white"
            />
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Ideas List */}
      <div className="space-y-4">
        {filteredIdeas.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl border border-gray-800">
            <Sparkles className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No ideas found</h3>
            <p className="text-gray-400 mb-6">Start by adding your first business idea!</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all"
            >
              <Plus className="w-5 h-5 inline mr-2" />
              Add First Idea
            </button>
          </div>
        ) : (
          filteredIdeas.map(idea => (
            <div 
              key={idea.id}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl border border-gray-800 hover:border-purple-500/30 transition-all p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Left Column */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">{idea.brandName}</h3>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(idea.status)}`}>
                          {idea.status}
                        </span>
                      </div>
                      <p className="text-gray-400">{idea.productService}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDeleteIdea(idea.id)}
                        className="p-2 hover:bg-red-900/20 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Target Audience</div>
                      <p className="text-sm">{idea.targetAudience}</p>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Campaign Goal</div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-400" />
                        <span className="font-medium">{idea.goal}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Platforms</div>
                      <div className="flex flex-wrap gap-2">
                        {idea.platforms.map((platform, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-900/20 text-blue-300 rounded text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Tone & Budget</div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm">{idea.tone}</span>
                        <span className="text-lg font-bold">{idea.budgetRange}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Stats & Actions */}
                <div className="md:w-48 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    Created: {idea.date}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-gray-900/50 hover:bg-gray-800 border border-gray-800 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg text-sm text-white transition-all flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Discuss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl p-4 border border-gray-800">
          <div className="text-2xl font-bold mb-1">{ideas.length}</div>
          <div className="text-sm text-gray-400">Total Ideas</div>
        </div>
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl p-4 border border-gray-800">
          <div className="text-2xl font-bold mb-1">{ideas.filter(i => i.status === 'Active').length}</div>
          <div className="text-sm text-gray-400">Active</div>
        </div>
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl p-4 border border-gray-800">
          <div className="text-2xl font-bold mb-1">{ideas.filter(i => i.status === 'Pending').length}</div>
          <div className="text-sm text-gray-400">Pending</div>
        </div>
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl p-4 border border-gray-800">
          <div className="text-2xl font-bold mb-1">{ideas.filter(i => i.status === 'Completed').length}</div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>
      </div>
    </div>
  );
} 