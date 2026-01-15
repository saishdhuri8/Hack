import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic CORS
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  console.log("Health check called");
  res.json({ 
    status: "ok", 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Helper functions
function generateInterestsBasedOnProduct(product) {
  if (!product) return ["General interests"];
  const productLower = product.toLowerCase();
  if (productLower.includes('tech') || productLower.includes('ai') || productLower.includes('software')) 
    return ["Technology", "Innovation", "Gadgets", "Digital Tools"];
  if (productLower.includes('beauty') || productLower.includes('skincare') || productLower.includes('cosmetic')) 
    return ["Skincare", "Wellness", "Lifestyle", "Self-care"];
  if (productLower.includes('fitness') || productLower.includes('health') || productLower.includes('gym')) 
    return ["Fitness", "Health", "Nutrition", "Exercise"];
  if (productLower.includes('food') || productLower.includes('restaurant') || productLower.includes('culinary'))
    return ["Food", "Cooking", "Dining", "Recipes"];
  if (productLower.includes('fashion') || productLower.includes('clothing') || productLower.includes('apparel'))
    return ["Fashion", "Style", "Trends", "Shopping"];
  return ["General interests", "Quality products", "Value"];
}

function getPlatformRole(platform) {
  const roles = {
    'Instagram': 'Visual storytelling & engagement',
    'LinkedIn': 'Professional networking & B2B',
    'YouTube': 'Video content & tutorials',
    'Facebook': 'Community building & awareness',
    'Twitter/X': 'Real-time engagement & updates',
    'TikTok': 'Short-form viral content',
    'Pinterest': 'Visual inspiration & discovery',
    'WhatsApp': 'Direct communication',
    'Email': 'Personalized marketing & leads'
  };
  return roles[platform] || 'Content distribution';
}

function generatePlatformDistribution(platforms) {
  const distribution = {};
  if (!platforms || platforms.length === 0) {
    return { Instagram: 50, LinkedIn: 50 };
  }
  const slice = Math.round(100 / platforms.length);
  platforms.forEach((platform, index) => {
    // Adjust last platform to ensure total equals 100
    const percentage = (index === platforms.length - 1) 
      ? 100 - (slice * (platforms.length - 1))
      : slice;
    distribution[platform] = percentage;
  });
  return distribution;
}

function generateTimeline(goal, tone) {
  const baseTimeline = {
    monday: ["Planning session", "Market research", "Competitor analysis"],
    tuesday: ["Content creation", "Asset development", "Copywriting"],
    wednesday: ["Review & editing", "Team feedback", "Quality check"],
    thursday: ["Publishing content", "Platform distribution", "Community engagement"],
    friday: ["Performance analysis", "Metrics review", "ROI calculation"],
    saturday: ["Optimization", "A/B testing", "Engagement boost"],
    sunday: ["Rest day", "Weekly review", "Next week planning"]
  };

  // Customize based on goal
  if (goal === 'Leads') {
    baseTimeline.monday.push("Lead magnet creation");
    baseTimeline.tuesday.push("Email campaign setup");
    baseTimeline.wednesday.push("Landing page optimization");
  } else if (goal === 'Sales') {
    baseTimeline.wednesday.push("Sales funnel optimization");
    baseTimeline.thursday.push("Promotional content", "Discount strategy");
    baseTimeline.friday.push("Sales tracking", "Conversion analysis");
  } else if (goal === 'Awareness') {
    baseTimeline.monday.push("Brand awareness research");
    baseTimeline.tuesday.push("Educational content creation");
    baseTimeline.thursday.push("Influencer outreach", "PR activities");
  } else if (goal === 'Engagement') {
    baseTimeline.monday.push("Engagement strategy planning");
    baseTimeline.tuesday.push("Interactive content creation");
    baseTimeline.thursday.push("Community management", "Q&A sessions");
  }

  // Customize based on tone
  if (tone === 'Professional') {
    baseTimeline.tuesday.push("Whitepaper/research creation");
    baseTimeline.thursday.push("Webinar preparation");
  } else if (tone === 'Youth/Gen-Z') {
    baseTimeline.tuesday.push("Trend research", "Meme creation");
    baseTimeline.thursday.push("Influencer collaborations");
  } else if (tone === 'Fun/Casual') {
    baseTimeline.tuesday.push("Entertainment content", "Humor integration");
  }

  return baseTimeline;
}

function calculateEngagement(budgetRange) {
  const ranges = {
    "$100 - $500": 2,
    "$500 - $2,000": 5,
    "$2,000 - $5,000": 8,
    "$5,000 - $10,000": 12,
    "$10,000+": 20,
    "Low": 3,
    "Medium": 7,
    "High": 15,
    "Custom": 5
  };
  return ranges[budgetRange] || 5;
}

function calculateConversion(budgetRange) {
  const ranges = {
    "$100 - $500": 1,
    "$500 - $2,000": 3,
    "$2,000 - $5,000": 5,
    "$5,000 - $10,000": 8,
    "$10,000+": 15,
    "Low": 2,
    "Medium": 4,
    "High": 10,
    "Custom": 3
  };
  return ranges[budgetRange] || 3;
}

function calculateROAS(budgetRange) {
  const ranges = {
    "$100 - $500": 2.5,
    "$500 - $2,000": 3.0,
    "$2,000 - $5,000": 3.5,
    "$5,000 - $10,000": 4.0,
    "$10,000+": 4.5,
    "Low": 2.8,
    "Medium": 3.2,
    "High": 4.2,
    "Custom": 3.0
  };
  return ranges[budgetRange] || 3.0;
}

function generateCampaignTheme(brandName, productService, goal) {
  const themes = {
    'Awareness': `"${brandName} Discovery" - Introducing ${productService} to New Audiences`,
    'Leads': `"${brandName} Connection" - Building Relationships for ${productService}`,
    'Sales': `"${brandName} Impact" - Driving Results for ${productService}`,
    'Engagement': `"${brandName} Community" - Fostering Interaction Around ${productService}`,
    'Traffic': `"${brandName} Gateway" - Directing Attention to ${productService}`,
    'Conversions': `"${brandName} Results" - Optimizing Performance for ${productService}`
  };
  return themes[goal] || `"${brandName} Excellence" - Premier ${productService} Campaign`;
}

function generateCoreMessage(brandName, productService, tone) {
  const messages = {
    'Professional': `Experience unparalleled ${productService} with ${brandName}'s industry-leading expertise.`,
    'Fun/Casual': `Get ready to love ${productService} like never before with ${brandName}!`,
    'Youth/Gen-Z': `${brandName} brings the vibes to ${productService} - no cap!`,
    'Friendly': `Join the ${brandName} family and discover amazing ${productService}.`,
    'Premium/Luxury': `Indulge in the exquisite ${productService} experience only ${brandName} can provide.`,
    'Bold/Edgy': `${brandName} redefines ${productService} - dare to be different.`,
    'Inspirational': `Transform your experience with ${productService} through ${brandName}'s vision.`
  };
  return messages[tone] || `Discover exceptional ${productService} with ${brandName}.`;
}

// Dynamic AI endpoint
app.post("/ai-text", (req, res) => {
  console.log("AI endpoint called with:", req.body);
  
  try {
    // Use the incoming data to create a dynamic response
    const {
      brandName = "Unknown Brand",
      description = "",
      productOrService = "Product/Service",
      targetAudience = "General audience",
      goal = "Awareness",
      platforms = ["Instagram", "LinkedIn"],
      budgetRange = "Medium",
      tone = "Professional",
      uniqueValue = "Quality and innovation",
      callToAction = "Get started today"
    } = req.body;

    const formattedPlatforms = Array.isArray(platforms) ? platforms : 
                              (typeof platforms === 'string' ? platforms.split(',').map(p => p.trim()) : ["Instagram", "LinkedIn"]);

    // Generate dynamic strategy based on input
    const dynamicResponse = {
      success: true,
      message: `Campaign strategy generated for ${brandName}`,
      data: {
        campaignTheme: generateCampaignTheme(brandName, productOrService, goal),
        campaignObjective: `Increase ${goal.toLowerCase()} by 40% for ${brandName}'s ${productOrService} within 30 days`,
        coreMessage: generateCoreMessage(brandName, productOrService, tone),
        targetAudienceProfile: {
          ageRange: targetAudience.includes('25') ? "25-45" : 
                   targetAudience.includes('18') ? "18-35" : 
                   targetAudience.includes('40') ? "40-60" : "25-45",
          interests: generateInterestsBasedOnProduct(productOrService),
          psychographics: ["Value-conscious", "Quality-focused", "Innovation-seeking", "Community-oriented"]
        },
        brandPositioning: {
          marketPosition: `${tone} leader in ${productOrService.toLowerCase()}`,
          emotionalAppeal: `Connecting through ${tone.toLowerCase()} messaging and authentic experiences`,
          differentiation: `${uniqueValue} combined with ${brandName}'s unique approach`
        },
        recommendedPlatforms: formattedPlatforms.map(platform => ({
          platform,
          role: getPlatformRole(platform)
        })),
        contentStyle: {
          tone: tone,
          formats: tone === 'Professional' ? ["Whitepapers", "Case studies", "Webinars"] :
                  tone === 'Youth/Gen-Z' ? ["Short videos", "Memes", "Stories", "Challenges"] :
                  ["Blog posts", "Videos", "Social media content", "Email newsletters"]
        },
        keyConstraints: [
          `${budgetRange} budget allocation`,
          "30-day campaign timeline",
          "Resource optimization",
          "Platform algorithm changes"
        ],
        timeline: generateTimeline(goal, tone),
        analytics: {
          platformDistribution: generatePlatformDistribution(formattedPlatforms),
          contentTypeSplit: { 
            Video: 40, 
            Blog: tone === 'Professional' ? 35 : 25, 
            Social: tone === 'Professional' ? 25 : 35 
          },
          funnelFocus: { 
            Awareness: goal === 'Awareness' ? 60 : 40, 
            Consideration: 30, 
            Conversion: goal === 'Sales' ? 30 : 20 
          },
          expectedKPIs: { 
            Engagement: `${calculateEngagement(budgetRange)}%`, 
            Conversion: `${calculateConversion(budgetRange)}%`, 
            ROAS: `${calculateROAS(budgetRange)}x` 
          }
        }
      }
    };
    
    console.log("Generated dynamic response for:", brandName);
    res.json(dynamicResponse);
    
  } catch (error) {
    console.error("Error generating strategy:", error);
    res.status(500).json({
      success: false,
      message: "Error generating campaign strategy",
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 AI endpoint: http://localhost:${PORT}/ai-text`);
});

console.log("Server script loaded successfully");