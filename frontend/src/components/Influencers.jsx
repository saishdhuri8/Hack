import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook,
  Star,
  DollarSign,
  TrendingUp,
  Target,
  MessageSquare,
  Globe,
  Calendar,
  Phone,
  Mail,
  Award,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  X
} from 'lucide-react';

export default function Influencers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const categories = [
    'all', 'fashion', 'beauty', 'tech', 'lifestyle', 'fitness', 'food', 'travel', 'business'
  ];

  const platforms = ['Instagram', 'YouTube', 'TikTok', 'Twitter', 'Facebook', 'LinkedIn'];

  const advertisingTypes = ['Posts', 'Reels', 'Stories', 'Videos', 'Blogs', 'Lives', 'Giveaways'];

  const influencers = [
    {
      id: 1,
      name: 'Alexandra Chen',
      handle: '@alexchen',
      category: 'fashion',
      followers: '2.4M',
      engagement: '4.8%',
      rating: 4.9,
      verified: true,
      phone: '+1 (555) 123-4567',
      email: 'alex@influencer.com',
      location: 'Los Angeles, USA',
      platforms: [
        { name: 'Instagram', icon: <Instagram className="w-4 h-4" />, followers: '2.4M' },
        { name: 'YouTube', icon: <Youtube className="w-4 h-4" />, followers: '800K' }
      ],
      pricing: {
        posts: 2500,
        reels: 3500,
        stories: 1200,
        videos: 5000,
        blogs: 1800
      },
      specialties: ['Streetwear', 'Luxury Brands', 'Sustainable Fashion'],
      previousBrands: ['Nike', 'Gucci', 'Zara'],
      minBudget: 1200,
      availability: 'Available in 2 weeks'
    },
    {
      id: 2,
      name: 'Marco Rodriguez',
      handle: '@techwithmarco',
      category: 'tech',
      followers: '1.8M',
      engagement: '5.2%',
      rating: 4.8,
      verified: true,
      phone: '+1 (555) 987-6543',
      email: 'marco@techreview.com',
      location: 'San Francisco, USA',
      platforms: [
        { name: 'YouTube', icon: <Youtube className="w-4 h-4" />, followers: '1.8M' },
        { name: 'Twitter', icon: <Twitter className="w-4 h-4" />, followers: '450K' }
      ],
      pricing: {
        posts: 3200,
        reels: 4200,
        stories: 1500,
        videos: 6500,
        blogs: 2200
      },
      specialties: ['Gadgets', 'Software Reviews', 'Tech Tutorials'],
      previousBrands: ['Apple', 'Samsung', 'Google'],
      minBudget: 1500,
      availability: 'Available next week'
    },
    {
      id: 3,
      name: 'Sophie Williams',
      handle: '@sophiefitness',
      category: 'fitness',
      followers: '3.2M',
      engagement: '6.1%',
      rating: 4.7,
      verified: true,
      phone: '+1 (555) 456-7890',
      email: 'sophie@fitlife.com',
      location: 'Miami, USA',
      platforms: [
        { name: 'Instagram', icon: <Instagram className="w-4 h-4" />, followers: '2.1M' },
        { name: 'TikTok', icon: <Facebook className="w-4 h-4" />, followers: '1.1M' }
      ],
      pricing: {
        posts: 2800,
        reels: 3800,
        stories: 1400,
        videos: 5800,
        blogs: 2000
      },
      specialties: ['Workout Plans', 'Nutrition', 'Wellness'],
      previousBrands: ['Nike', 'Gymshark', 'MyProtein'],
      minBudget: 1400,
      availability: 'Available now'
    },
    {
      id: 4,
      name: 'Kenji Tanaka',
      handle: '@kenjifoodie',
      category: 'food',
      followers: '1.5M',
      engagement: '7.3%',
      rating: 4.9,
      verified: true,
      phone: '+81 80-1234-5678',
      email: 'kenji@foodblog.com',
      location: 'Tokyo, Japan',
      platforms: [
        { name: 'YouTube', icon: <Youtube className="w-4 h-4" />, followers: '1.5M' },
        { name: 'Instagram', icon: <Instagram className="w-4 h-4" />, followers: '900K' }
      ],
      pricing: {
        posts: 2200,
        reels: 3200,
        stories: 1000,
        videos: 4500,
        blogs: 1600
      },
      specialties: ['Japanese Cuisine', 'Restaurant Reviews', 'Cooking Tutorials'],
      previousBrands: ['Sushi Daily', 'KitchenAid', 'Local Markets'],
      minBudget: 1000,
      availability: 'Available in 3 weeks'
    },
    {
      id: 5,
      name: 'Olivia Parker',
      handle: '@oliviatravels',
      category: 'travel',
      followers: '2.8M',
      engagement: '5.9%',
      rating: 4.6,
      verified: true,
      phone: '+44 7911 123456',
      email: 'olivia@wanderlust.com',
      location: 'London, UK',
      platforms: [
        { name: 'Instagram', icon: <Instagram className="w-4 h-4" />, followers: '2.8M' },
        { name: 'YouTube', icon: <Youtube className="w-4 h-4" />, followers: '950K' }
      ],
      pricing: {
        posts: 3000,
        reels: 4000,
        stories: 1300,
        videos: 5500,
        blogs: 2100
      },
      specialties: ['Luxury Travel', 'Budget Tips', 'Cultural Experiences'],
      previousBrands: ['Airbnb', 'Skyscanner', 'Lonely Planet'],
      minBudget: 1300,
      availability: 'Available in 1 week'
    },
    {
      id: 6,
      name: 'David Miller',
      handle: '@davidbiz',
      category: 'business',
      followers: '1.2M',
      engagement: '8.2%',
      rating: 4.8,
      verified: true,
      phone: '+1 (555) 789-0123',
      email: 'david@businesscoach.com',
      location: 'New York, USA',
      platforms: [
        { name: 'LinkedIn', icon: <Facebook className="w-4 h-4" />, followers: '900K' },
        { name: 'YouTube', icon: <Youtube className="w-4 h-4" />, followers: '300K' }
      ],
      pricing: {
        posts: 3500,
        reels: 4500,
        stories: 1600,
        videos: 7000,
        blogs: 2500
      },
      specialties: ['Startup Advice', 'Leadership', 'Digital Marketing'],
      previousBrands: ['Microsoft', 'HubSpot', 'Salesforce'],
      minBudget: 1600,
      availability: 'Available in 2 weeks'
    }
  ];

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         influencer.category.includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || influencer.category === selectedCategory;
    
    const matchesPrice = influencer.minBudget >= priceRange[0] && influencer.minBudget <= priceRange[1];
    
    const matchesPlatforms = selectedPlatforms.length === 0 || 
      influencer.platforms.some(platform => selectedPlatforms.includes(platform.name));

    return matchesSearch && matchesCategory && matchesPrice && matchesPlatforms;
  });

  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Influencer Directory</h1>
            <p className="text-gray-400">Find and collaborate with top influencers across all platforms</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl border border-gray-800 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search influencers by name, category, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 bg-gray-900/50 border border-gray-800 hover:border-gray-700 rounded-xl flex items-center gap-2 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filters
            {showFilters ? <X className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-800 space-y-6">
            {/* Category Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-lg capitalize text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                        : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {platforms.map(platform => (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                      selectedPlatforms.includes(platform)
                        ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/20 border border-blue-500 text-white'
                        : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-800'
                    }`}
                  >
                    {platform}
                    {selectedPlatforms.includes(platform) && <CheckCircle className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-3">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </h3>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$0</span>
                <span>$5,000</span>
                <span>$10,000+</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="text-gray-400">
            Showing <span className="text-white font-semibold">{filteredInfluencers.length}</span> influencers
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-400">Sort by:</span>
            <select className="bg-gray-900/50 border border-gray-800 rounded-lg px-3 py-1.5 text-white">
              <option>Highest Engagement</option>
              <option>Lowest Price</option>
              <option>Most Followers</option>
              <option>Highest Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Influencers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInfluencers.map(influencer => (
          <div 
            key={influencer.id}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 group overflow-hidden"
          >
            {/* Influencer Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{influencer.name}</h3>
                      {influencer.verified && (
                        <Award className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{influencer.handle}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{influencer.rating}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-sm text-green-400">{influencer.engagement} engagement</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Platforms */}
              <div className="flex items-center gap-2 mb-4">
                {influencer.platforms.map((platform, index) => (
                  <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-900/50 rounded-lg">
                    {platform.icon}
                    <span className="text-xs">{platform.name}</span>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Phone className="w-4 h-4" />
                  {influencer.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Mail className="w-4 h-4" />
                  {influencer.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Globe className="w-4 h-4" />
                  {influencer.location}
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Pricing (per content)
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(influencer.pricing).map(([type, price]) => (
                    <div key={type} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 capitalize">{type}:</span>
                      <span className="font-medium">${price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {influencer.specialties.map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-900/20 text-blue-300 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Previous Brands */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Previous Brands</h4>
                <div className="flex flex-wrap gap-2">
                  {influencer.previousBrands.map((brand, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-900/50 text-gray-300 rounded text-xs">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <div className="text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {influencer.availability}
                  </div>
                  <div className="text-lg font-bold mt-1">
                    Min: ${influencer.minBudget.toLocaleString()}
                  </div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-medium text-white text-sm transition-all flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredInfluencers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No influencers found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setPriceRange([0, 10000]);
              setSelectedPlatforms([]);
            }}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}