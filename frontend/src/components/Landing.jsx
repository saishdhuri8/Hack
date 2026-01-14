import React from 'react';
import { 
  Sparkles, 
  Target, 
  Users, 
  BarChart, 
  Globe, 
  Zap, 
  CheckCircle, 
  Rocket,
  Palette,
  MessageSquare,
  Search,
  Calendar,
  Eye,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Cpu
} from 'lucide-react';

export default function Landing() {
  const stats = [
    { value: '10K+', label: 'Campaigns Launched', icon: <Rocket className="w-4 h-4" /> },
    { value: '95%', label: 'Client Satisfaction', icon: <Star className="w-4 h-4" /> },
    { value: '3x', label: 'Faster Creation', icon: <Zap className="w-4 h-4" /> },
    { value: '40%', label: 'Avg. Growth', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const features = [
    {
      category: 'AI Strategy',
      items: [
        { icon: <Cpu className="w-5 h-5" />, title: 'Smart Brief Analyzer', desc: 'Transform ideas into structured strategy' },
        { icon: <Target className="w-5 h-5" />, title: 'Campaign Engine', desc: 'Autonomous theme & positioning' },
        { icon: <Users className="w-5 h-5" />, title: 'Multi-Agent AI', desc: 'Coordinated specialized agents' },
      ]
    },
    {
      category: 'Creative Generation',
      items: [
        { icon: <Palette className="w-5 h-5" />, title: 'Visual Identity', desc: 'Mood boards & brand assets' },
        { icon: <MessageSquare className="w-5 h-5" />, title: 'AI Copywriting', desc: 'Platform-specific content' },
        { icon: <Search className="w-5 h-5" />, title: 'Influencer Discovery', desc: 'Personalized outreach' },
      ]
    },
    {
      category: 'Advanced Tools',
      items: [
        { icon: <BarChart className="w-5 h-5" />, title: 'Competitor Insights', desc: 'Strategic differentiation' },
        { icon: <Shield className="w-5 h-5" />, title: 'Brand Guardrails', desc: 'Consistency checks' },
        { icon: <Globe className="w-5 h-5" />, title: 'Multi-Language', desc: 'Global campaign support' },
      ]
    }
  ];

  const processSteps = [
    { number: '01', title: 'Describe Your Vision', desc: 'Share your business story, goals, and audience.' },
    { number: '02', title: 'AI Strategy Session', desc: 'Our AI analyzes and crafts your unique growth plan.' },
    { number: '03', title: 'Launch & Scale', desc: 'Deploy ready-to-use campaigns and watch growth happen.' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-blue-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-pink-900/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Rocket className="w-6 h-6" />
            </div>
            <span className="text-2xl font-light tracking-tight">Campaign<span className="font-bold">AI</span></span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Features</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Case Studies</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Pricing</a>
          </div>
          
          <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium flex items-center gap-2 group">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-800/30 mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">AI-Powered Growth Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
            Describe your <span className="font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">business</span>
            <br />
            <span className="text-gray-300">Watch our AI</span> grow it
          </h1>
          
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            We transform your vision into complete marketing strategies, creative assets, and growth campaigns—all powered by artificial intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl hover:shadow-purple-900/30 transition-all duration-300 text-lg font-medium flex items-center gap-3 group">
              <Sparkles className="w-5 h-5" />
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3.5 rounded-full border border-gray-800 hover:border-gray-600 transition-colors duration-300 text-lg">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="relative container mx-auto px-6 -mt-10 mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-900/50 to-gray-800/20 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-purple-400">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <section className="relative container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Everything you need to
            <span className="font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> scale smarter</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From strategy to execution, our AI handles every aspect of campaign creation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="bg-gradient-to-br from-gray-900/40 to-gray-800/10 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-500"
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-300">{category.category}</h3>
              <div className="space-y-6">
                {category.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-800/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="text-purple-400">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="relative container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-16">
            How it <span className="font-bold text-white">works</span>
          </h2>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-gray-800 to-transparent hidden lg:block"></div>
            
            <div className="grid lg:grid-cols-3 gap-8 relative">
              {processSteps.map((step, index) => (
                <div 
                  key={index}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 border-4 border-gray-800 flex items-center justify-center text-2xl font-bold text-purple-400 mx-auto mb-6 relative">
                    {step.number}
                    <div className="absolute -inset-2 rounded-full border border-purple-900/30 animate-pulse"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-light mb-6">
                Ready to <span className="font-bold">transform</span> your growth?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join forward-thinking businesses already accelerating with AI-powered campaigns.
              </p>
              
              <button className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-2xl hover:shadow-purple-900/40 transition-all duration-300 text-lg font-medium flex items-center gap-3 mx-auto group">
                <Rocket className="w-5 h-5" />
                Start Your 14-Day Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <p className="text-gray-500 mt-8 text-sm">
                No credit card required • Full platform access • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-900 mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl font-light">Campaign<span className="font-bold">AI</span></div>
                <div className="text-sm text-gray-500">AI-powered business growth</div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="text-gray-500 text-sm mb-2">© 2024 CampaignAI. All rights reserved.</div>
              <div className="flex gap-6 text-gray-400 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}