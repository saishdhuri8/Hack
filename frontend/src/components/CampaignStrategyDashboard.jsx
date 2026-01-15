import React from 'react';
import { Target } from 'lucide-react';

/* -------------------- COMPONENT -------------------- */

export default function CampaignStrategyDashboard({ strategy }) {
  if (!strategy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200">
        <p>No strategy generated yet</p>
      </div>
    );
  }

  /* -------------------- RENDER -------------------- */

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <header className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-purple-400">
              AI Campaign Strategy
            </h1>
            <p className="text-gray-400 mt-1">
              Generated marketing plan
            </p>
          </div>
        </header>

        {/* CAMPAIGN THEME */}
        <Section title="Campaign Theme">
          <div className="text-xl font-semibold text-white">{strategy.campaignTheme}</div>
        </Section>

        {/* OBJECTIVE */}
        <Section title="Campaign Objective">
          <div className="text-lg">{strategy.campaignObjective}</div>
        </Section>

        {/* CORE MESSAGE */}
        <Section title="Core Message">
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/10 border border-purple-800/30 rounded-xl p-6">
            <p className="text-xl italic text-center">"{strategy.coreMessage}"</p>
          </div>
        </Section>

        {/* TARGET AUDIENCE */}
        <Section title="Target Audience">
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-purple-300 mb-2">Age Range</h3>
                <p className="text-lg">{strategy.targetAudienceProfile?.ageRange}</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-purple-300 mb-2">Primary Interests</h3>
                <ul className="space-y-1">
                  {strategy.targetAudienceProfile?.interests?.slice(0, 3).map((i, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-purple-300 mb-2">Psychographics</h3>
                <ul className="space-y-1">
                  {strategy.targetAudienceProfile?.psychographics?.slice(0, 3).map((p, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* BRAND POSITIONING */}
        <Section title="Brand Positioning">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
              <h3 className="font-semibold text-purple-300 mb-2">Market Position</h3>
              <p>{strategy.brandPositioning?.marketPosition}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
              <h3 className="font-semibold text-purple-300 mb-2">Emotional Appeal</h3>
              <p>{strategy.brandPositioning?.emotionalAppeal}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
              <h3 className="font-semibold text-purple-300 mb-2">Differentiation</h3>
              <p>{strategy.brandPositioning?.differentiation}</p>
            </div>
          </div>
        </Section>

        {/* PLATFORMS */}
        <Section title="Recommended Platforms">
          <div className="grid md:grid-cols-3 gap-4">
            {strategy.recommendedPlatforms?.map((p, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-xl text-purple-300">
                    {p.platform}
                  </h3>
                  <div className="text-xs px-2 py-1 bg-purple-900/30 text-purple-300 rounded">
                    {idx + 1}
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  {p.role}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="text-xs text-gray-500">
                    Platform Weight: {strategy.analytics?.platformDistribution?.[p.platform] || "N/A"}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CONTENT STYLE */}
        <Section title="Content Style">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Tone & Voice</h3>
              <div className="bg-gray-800/30 p-4 rounded-lg">
                <div className="text-xl font-semibold text-white">{strategy.contentStyle?.tone}</div>
                <p className="text-gray-400 mt-2">
                  Consistent {strategy.contentStyle?.tone?.toLowerCase()} voice across all platforms
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">Content Formats</h3>
              <div className="flex flex-wrap gap-2">
                {strategy.contentStyle?.formats?.map((f, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-2 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-800/30 rounded-lg"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-400">
                Distribution: Video {strategy.analytics?.contentTypeSplit?.Video}%, 
                Blog {strategy.analytics?.contentTypeSplit?.Blog}%, 
                Social {strategy.analytics?.contentTypeSplit?.Social}%
              </div>
            </div>
          </div>
        </Section>

        {/* CONSTRAINTS */}
        <Section title="Key Constraints & Considerations">
          <div className="grid md:grid-cols-2 gap-4">
            {strategy.keyConstraints?.map((c, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                <div>{c}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* TIMELINE */}
        <Section title="Weekly Timeline">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strategy.timeline && Object.entries(strategy.timeline).map(([day, tasks]) => (
              <div
                key={day}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold capitalize text-purple-300">
                    {day}
                  </h4>
                  <div className="text-xs px-2 py-1 bg-gray-700 rounded">
                    {tasks.length} tasks
                  </div>
                </div>
                <ul className="space-y-2">
                  {tasks.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ANALYTICS */}
        <Section title="Analytics & Expected Performance">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
              <h3 className="font-semibold text-purple-300 mb-2">Engagement</h3>
              <div className="text-2xl font-bold">{strategy.analytics?.expectedKPIs?.Engagement}</div>
              <p className="text-sm text-gray-400 mt-1">Expected rate</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
              <h3 className="font-semibold text-purple-300 mb-2">Conversion</h3>
              <div className="text-2xl font-bold">{strategy.analytics?.expectedKPIs?.Conversion}</div>
              <p className="text-sm text-gray-400 mt-1">Expected rate</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
              <h3 className="font-semibold text-purple-300 mb-2">ROAS</h3>
              <div className="text-2xl font-bold">{strategy.analytics?.expectedKPIs?.ROAS}</div>
              <p className="text-sm text-gray-400 mt-1">Return on ad spend</p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
              <h3 className="font-semibold text-purple-300 mb-2">Funnel Focus</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Awareness</span>
                  <span>{strategy.analytics?.funnelFocus?.Awareness}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Consideration</span>
                  <span>{strategy.analytics?.funnelFocus?.Consideration}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Conversion</span>
                  <span>{strategy.analytics?.funnelFocus?.Conversion}%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Platform Distribution Chart */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Platform Distribution</h3>
            <div className="bg-gray-900/50 p-4 rounded-xl">
              <div className="flex flex-wrap gap-4">
                {strategy.analytics?.platformDistribution && 
                  Object.entries(strategy.analytics.platformDistribution).map(([platform, percentage]) => (
                    <div key={platform} className="flex-1 min-w-[120px]">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{platform}</span>
                        <span className="text-sm font-semibold">{percentage}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}

/* -------------------- SECTION COMPONENT -------------------- */

function Section({ title, children }) {
  return (
    <section className="bg-gradient-to-br from-gray-900/80 to-gray-950/80 p-6 rounded-2xl border border-gray-800 hover:border-purple-900/30 transition-all">
      <h2 className="text-xl font-bold text-purple-400 mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}