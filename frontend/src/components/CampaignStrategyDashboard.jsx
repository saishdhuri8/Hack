import { useEffect, useState } from "react";

/* -------------------- REQUEST BODY -------------------- */

const REQUEST_BODY = {
  brandName: "EcoNest",
  description:
    "EcoNest is a sustainable home goods marketplace connecting eco-conscious consumers with verified green products and zero-waste alternatives.",
  productOrService: "E-commerce platform for sustainable home products",
  targetAudience:
    "Environmentally conscious millennials and Gen Z homeowners aged 25-40",
  goal: "Build community engagement and increase monthly active users",
  platforms: ["TikTok", "Instagram", "Pinterest"],
  budgetRange: "Medium",
  tone: "Authentic, educational, inspiring",
  uniqueValue:
    "Every purchase plants a tree and all products are carbon-neutral certified",
  callToAction: "Join 50K+ eco-warriors making a difference",
};

/* -------------------- COMPONENT -------------------- */

export default function CampaignStrategyDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [strategy, setStrategy] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStrategy = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://localhost:3000/ai-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(REQUEST_BODY),
          signal: controller.signal,
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        if (!json.success) throw new Error(json.message);

        setStrategy(json.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStrategy();
    return () => controller.abort();
  }, []);

  /* -------------------- STATES -------------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200">
        <p className="animate-pulse text-lg">Generating campaign strategy…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  if (!strategy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200">
        <p>No strategy received</p>
      </div>
    );
  }

  /* -------------------- RENDER -------------------- */

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <header>
          <h1 className="text-4xl font-bold text-purple-400">
            AI Campaign Strategy
          </h1>
          <p className="text-gray-400 mt-1">
            Generated marketing plan
          </p>
        </header>

        {/* CAMPAIGN THEME */}
        <Section title="Campaign Theme">
          {strategy.campaignTheme}
        </Section>

        {/* OBJECTIVE */}
        <Section title="Campaign Objective">
          {strategy.campaignObjective}
        </Section>

        {/* CORE MESSAGE */}
        <Section title="Core Message">
          <p className="italic">"{strategy.coreMessage}"</p>
        </Section>

        {/* TARGET AUDIENCE */}
        <Section title="Target Audience">
          <p className="mb-2">
            <span className="font-semibold">Age Range:</span>{" "}
            {strategy.targetAudienceProfile.ageRange}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Interests</h3>
              <ul className="list-disc list-inside space-y-1">
                {strategy.targetAudienceProfile.interests.map((i, idx) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Psychographics</h3>
              <ul className="list-disc list-inside space-y-1">
                {strategy.targetAudienceProfile.psychographics.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* BRAND POSITIONING */}
        <Section title="Brand Positioning">
          <ul className="space-y-2">
            <li>
              <span className="font-semibold">Market Position:</span>{" "}
              {strategy.brandPositioning.marketPosition}
            </li>
            <li>
              <span className="font-semibold">Emotional Appeal:</span>{" "}
              {strategy.brandPositioning.emotionalAppeal}
            </li>
            <li>
              <span className="font-semibold">Differentiation:</span>{" "}
              {strategy.brandPositioning.differentiation}
            </li>
          </ul>
        </Section>

        {/* PLATFORMS */}
        <Section title="Recommended Platforms">
          <div className="grid md:grid-cols-3 gap-4">
            {strategy.recommendedPlatforms.map((p, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700"
              >
                <h3 className="font-semibold text-purple-300">
                  {p.platform}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {p.role}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* CONTENT STYLE */}
        <Section title="Content Style">
          <p className="mb-2">
            <span className="font-semibold">Tone:</span>{" "}
            {strategy.contentStyle.tone}
          </p>
          <ul className="list-disc list-inside space-y-1">
            {strategy.contentStyle.formats.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </Section>

        {/* CONSTRAINTS */}
        <Section title="Key Constraints">
          <ul className="list-disc list-inside space-y-1">
            {strategy.keyConstraints.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </Section>

        {/* TIMELINE */}
        <Section title="Weekly Timeline">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(strategy.timeline).map(([day, tasks]) => (
              <div
                key={day}
                className="bg-gray-800 p-4 rounded-lg border border-gray-700"
              >
                <h4 className="font-semibold capitalize text-purple-300 mb-2">
                  {day}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {tasks.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ANALYTICS */}
        <Section title="Analytics & KPIs">
          <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto">
            {JSON.stringify(strategy.analytics, null, 2)}
          </pre>
        </Section>

      </div>
    </div>
  );
}

/* -------------------- SECTION COMPONENT -------------------- */

function Section({ title, children }) {
  return (
    <section className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <h2 className="text-xl font-bold text-purple-400 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}
