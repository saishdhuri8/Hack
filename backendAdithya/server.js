import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import express from "express";
import { generateCopywriting } from "./copywriting/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "BRANDPULSE Main Server"
  });
});

/**
 * COPYWRITING API
 * Expects an APPROVED STRATEGY
 */
app.post("/api/copywriting/generate", async (req, res) => {
  try {
    const strategy = req.body;

    const copywritingResult = await generateCopywriting(strategy);

    res.json({
      status: "SUCCESS",
      data: copywritingResult
    });

  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: error.message
    });
  }
});

/**
 * CONTENT GENERATOR API
 * Generates complete marketing content package
 */
app.post("/api/captions/generate", async (req, res) => {
  try {
    const { prompt, serviceType, tone = "professional" } = req.body;

    console.log("Content generation requested:", { prompt, serviceType, tone });

    // Generate complete content package based on prompt
    const content = generateCompleteContent(prompt, tone);

    res.json({
      status: "SUCCESS",
      data: content
    });

  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: error.message
    });
  }
});

// Helper function to generate complete content package
function generateCompleteContent(prompt, tone) {
  // Extract brand name from prompt (simple extraction)
  const brandMatch = prompt.match(/brand\s+called\s+(\w+)/i) || 
                    prompt.match(/called\s+(\w+)/i) ||
                    prompt.match(/for\s+an?\s+(\w+)/i);
  
  const brandName = brandMatch ? brandMatch[1] : "Your Brand";
  
  // Generate content based on prompt analysis
  const isEco = prompt.toLowerCase().includes('eco') || 
                prompt.toLowerCase().includes('sustainable') || 
                prompt.toLowerCase().includes('green');
  
  const isFitness = prompt.toLowerCase().includes('fitness') || 
                    prompt.toLowerCase().includes('workout') || 
                    prompt.toLowerCase().includes('health');
  
  const isTech = prompt.toLowerCase().includes('tech') || 
                 prompt.toLowerCase().includes('ai') || 
                 prompt.toLowerCase().includes('app') || 
                 prompt.toLowerCase().includes('software');

  // Generate content based on category
  if (isEco) {
    return generateEcoContent(brandName, tone);
  } else if (isFitness) {
    return generateFitnessContent(brandName, tone);
  } else if (isTech) {
    return generateTechContent(brandName, tone);
  } else {
    return generateGenericContent(brandName, tone);
  }
}

function generateEcoContent(brandName, tone) {
  return {
    instagram_captions: [
      `Your home is your sanctuary, and now it can be a sanctuary for the planet too. Every piece at ${brandName} is carbon-neutral certified, and we plant a tree for every order you place. It's about making conscious choices that look as good as they feel. Join 50K+ eco-warriors making a difference today. 🌿`,
      `Sustainability isn't about being perfect; it's about being intentional. From recycled materials to plastic-free shipping, we've vetted every product so you can shop with confidence. Join 50K+ eco-warriors making a difference and elevate your space responsibly. #${brandName}Life`,
      `Did you know your home décor can help reforestation efforts? 🌲 At ${brandName}, every single purchase plants a tree and carries a carbon-neutral certification. Better for your home, better for the earth. Join 50K+ eco-warriors making a difference.`,
      `Ready to curate a space that reflects your values? We've built a community of 50K+ eco-warriors making a difference, one carbon-neutral product at a time. Let's build a greener future together, starting in the living room.`,
      `Real impact starts at home. By choosing carbon-neutral essentials, you're reducing your footprint while helping us plant thousands of trees. Join 50K+ eco-warriors making a difference and browse our latest curated collections. ✨`
    ],
    ad_copy: [
      {
        headline: `Build a Beautiful, Carbon-Neutral Home`,
        description: `Every purchase plants a tree. Join 50K+ eco-warriors making a difference with sustainable goods that don't compromise on style.`
      },
      {
        headline: `Shop Sustainable. Plant a Tree.`,
        description: `${brandName} is your marketplace for certified carbon-neutral home goods. Join 50K+ eco-warriors making a difference for the planet today.`
      },
      {
        headline: `Join the 50K+ Eco-Warrior Community`,
        description: `Upgrade your home with vetted, sustainable products. Carbon-neutral certified and tree-planting with every order. Shop ${brandName} now.`
      }
    ],
    blog_content: {
      titles: [
        `The Roadmap to a Carbon-Neutral Home`,
        `Why Planting Trees is Just the Beginning of Your Sustainable Journey`
      ],
      intro: `Creating a sustainable home often feels like a daunting task, but it doesn't have to be. At ${brandName}, we believe that every intentional choice adds up to a global impact. That is why we have built a community-driven marketplace where every single product is carbon-neutral certified. We take the guesswork out of green living so you can focus on building a space that inspires you. Beyond just products, every order you place directly contributes to reforestation efforts, planting a tree where the earth needs it most. By joining 50K+ eco-warriors making a difference, you are proving that mindful consumption is the key to a healthier, more vibrant planet.`
    },
    ctas: [
      `Join 50K+ eco-warriors making a difference`,
      `Become one of 50K+ eco-warriors making a difference`,
      `Start your journey with 50K+ eco-warriors making a difference`,
      `Join our community of 50K+ eco-warriors making a difference`,
      `Connect with 50K+ eco-warriors making a difference today`
    ]
  };
}

function generateFitnessContent(brandName, tone) {
  return {
    instagram_captions: [
      `Your fitness journey starts with a single step, but it's the consistency that transforms your life. Track every rep, every mile, every victory with ${brandName}. Join our community of 100K+ active members changing their lives one workout at a time. 💪`,
      `What if your workout app understood you as well as your favorite coach? ${brandName}'s AI-powered tracking adapts to your progress, celebrates your wins, and keeps you motivated. The future of fitness is here. #${brandName}Fitness`,
      `Stop guessing, start growing. With personalized workout plans and real-time feedback, ${brandName} turns your fitness goals into reality. Join 100K+ members who've found their fitness home. 🏋️‍♀️`,
      `Your body is capable of incredible things. ${brandName} helps you unlock that potential with science-backed workouts and a supportive community. Ready to meet your strongest self?`,
      `Fitness isn't just about looking good—it's about feeling unstoppable. ${brandName} gives you the tools, tracking, and community to build lasting habits. Your transformation starts today. ✨`
    ],
    ad_copy: [
      {
        headline: `Your Personal AI Fitness Coach`,
        description: `Get personalized workout plans, real-time feedback, and join 100K+ active members. Transform your fitness journey with ${brandName}.`
      },
      {
        headline: `Stop Wishing, Start Achieving`,
        description: `${brandName}'s smart tracking adapts to your progress and keeps you motivated. Join the future of fitness today.`
      },
      {
        headline: `Join 100K+ Fitness Enthusiasts`,
        description: `Science-backed workouts, community support, and AI-powered tracking. Your fitness transformation begins with ${brandName}.`
      }
    ],
    blog_content: {
      titles: [
        `The Science of Sustainable Fitness Habits`,
        `How AI is Personalizing Your Workout Experience`
      ],
      intro: `In today's fast-paced world, finding time for fitness can feel like an impossible challenge. But what if technology could remove the barriers between you and your health goals? At ${brandName}, we've developed an AI-powered platform that understands your unique fitness journey. Our smart algorithms analyze your progress, adapt your workouts, and provide the motivation you need to stay consistent. With a community of over 100,000 active members, you're never working out alone. Whether you're taking your first steps or training for a marathon, ${brandName} provides the personalized guidance and support system to make every workout count towards a healthier, stronger you.`
    },
    ctas: [
      `Start your free trial today`,
      `Join 100K+ fitness enthusiasts`,
      `Download and transform your workouts`,
      `Get your personalized fitness plan`,
      `Begin your transformation journey`
    ]
  };
}

function generateGenericContent(brandName, tone) {
  return {
    instagram_captions: [
      `Great things never come from comfort zones. Step out, take the leap, and watch your brand soar with ${brandName}. Together, we're building something extraordinary. 🚀`,
      `Quality isn't an act, it's a habit. At ${brandName}, we're committed to delivering excellence in every product, every service, every interaction. Join our community of satisfied customers. ✨`,
      `Your vision deserves to be realized. With ${brandName}'s innovative solutions and dedicated support, turn your ideas into impactful reality. Let's create something amazing together.`,
      `Progress isn't about perfection—it's about direction. Every day, we're moving forward, improving, and helping our customers achieve their goals. Welcome to the ${brandName} journey.`,
      `Behind every great brand is a story of dedication, innovation, and community. At ${brandName}, we're writing that story together with our customers. Join us in creating something memorable. 💫`
    ],
    ad_copy: [
      {
        headline: `Elevate Your Brand with ${brandName}`,
        description: `Innovative solutions, dedicated support, and proven results. Join thousands of satisfied customers who trust ${brandName}.`
      },
      {
        headline: `Where Vision Meets Execution`,
        description: `${brandName} transforms your ideas into impactful reality. Experience the difference of working with industry leaders.`
      },
      {
        headline: `Join Our Growing Community`,
        description: `Quality products, exceptional service, and a commitment to excellence. Discover why customers choose ${brandName} again and again.`
      }
    ],
    blog_content: {
      titles: [
        `The Future of Innovation: How ${brandName} is Leading the Way`,
        `Building Brands That Last: Lessons from Our Journey`
      ],
      intro: `In an ever-changing market landscape, standing out requires more than just a great product—it demands vision, innovation, and unwavering commitment to excellence. At ${brandName}, we've spent years refining our approach to deliver not just solutions, but transformative experiences for our clients. Our journey has been shaped by countless collaborations, challenges overcome, and successes celebrated alongside our growing community. We believe that true innovation happens at the intersection of technology, creativity, and human connection. As we look to the future, we remain dedicated to pushing boundaries, setting new standards, and helping our partners achieve their most ambitious goals. Join us as we continue to build, create, and innovate together.`
    },
    ctas: [
      `Discover our solutions`,
      `Join our community`,
      `Start your journey with us`,
      `Get in touch today`,
      `Learn more about ${brandName}`
    ]
  };
}

function generateTechContent(brandName, tone) {
  // Similar structure for tech content
  return generateGenericContent(brandName, tone);
}

app.listen(PORT, () => {
  console.log(`🚀 Main server running on port ${PORT}`);
  console.log(`📝 Copywriting: POST /api/copywriting/generate`);
  console.log(`🎬 Content Generation: POST /api/captions/generate`);
});