/**
 * ContentCraft - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ContentCraft - AI Content Engine for Game Masters | Sixsmith Games',
  description: 'AI-powered content creation platform for game masters and authors. Generate D&D content that fits together, track canon automatically, and never contradict yourself again.',
};

export default function ContentCraftPage() {
  const painPoints = [
    {
      title: 'The Consistency Nightmare',
      problem: 'AI tools have no memory. Every generation is isolated, leading to contradictions.',
      solution: 'Built-in canon management tracks every NPC, location, and item automatically.',
    },
    {
      title: 'The Stat Block Hell',
      problem: 'Copy-pasting and formatting AI-generated stat blocks takes forever.',
      solution: 'Native D&D 5e support generates properly formatted, balanced stat blocks instantly.',
    },
    {
      title: 'The Relationship Web',
      problem: 'Creating interconnected NPCs manually becomes a spreadsheet nightmare.',
      solution: 'Automatic relationship generation creates natural social networks.',
    },
  ];

  const features = [
    {
      title: 'AI-Powered D&D Content Generation',
      description: 'Generate complete D&D 5e NPCs, monsters, locations, and encounters in seconds.',
    },
    {
      title: 'Canon Management & Consistency Engine',
      description: 'Automatic tracking of characters, locations, items, and relationships.',
    },
    {
      title: 'Relationship & Connection Mapping',
      description: 'NPCs automatically know each other and create living social networks.',
    },
    {
      title: 'Multi-AI Provider Support',
      description: 'Use OpenAI, Anthropic Claude, or Google Gemini—your choice.',
    },
    {
      title: 'Version History & Change Tracking',
      description: 'See every edit, roll back mistakes, and track content evolution.',
    },
    {
      title: 'Fact-Checking & Source Verification',
      description: 'Flag uncertain claims, verify facts, and track sources.',
    },
  ];

  return (
    <div>
      {/* Hero Section with ContentCraft theme */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✨ AI CONTENT ENGINE
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Stop Fighting Your AI. Start Creating Your World.
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                ContentCraft is the AI-powered content engine for game masters and authors who need more than
                scattered chat messages. Generate D&D content that actually fits together, track canon automatically,
                and never contradict yourself again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pricing"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow text-center"
                >
                  Start Creating
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">From Idea to Stat Block in 60 Seconds</h3>
              <div className="space-y-4 text-gray-700">
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="font-semibold text-purple-900">ChatGPT Approach:</p>
                  <p className="text-sm mt-1">45 minutes of generating, formatting, balancing, and organizing</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="font-semibold text-green-900">ContentCraft Approach:</p>
                  <p className="text-sm mt-1">5 minutes: generate → done. Complete stat block, balanced and ready.</p>
                </div>
                <p className="text-center font-bold text-2xl text-purple-600">Save 75% of prep time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Creating Consistent D&D Content Shouldn't Feel Like a Part-Time Job
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You open ChatGPT. Copy. Paste. Format. Fix stat math. Cross-reference your wiki. Realize the new
              NPC contradicts the old NPC. Start over. Six hours later, you've made three NPCs and a headache.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{point.title}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-red-600 mb-1">Problem:</p>
                    <p className="text-gray-700">{point.problem}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-600 mb-1">Solution:</p>
                    <p className="text-gray-700">{point.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              From Idea to Playable Content in Three Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-600">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Describe What You Need</h3>
              <p className="text-gray-600 italic mb-2">"I need a gruff blacksmith in Waterdeep who used to adventure with the party's cleric"</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-600">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Generates Structured Content</h3>
              <ul className="text-gray-600 text-left space-y-1">
                <li>✓ Full stat block (CR-appropriate)</li>
                <li>✓ Personality & background</li>
                <li>✓ Relationships to other NPCs</li>
                <li>✓ Plot hooks and secrets</li>
                <li>✓ VTT-ready format</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-600">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Edit, Use, Expand</h3>
              <ul className="text-gray-600 text-left space-y-1">
                <li>✓ Tweak anything you want</li>
                <li>✓ Export to your VTT</li>
                <li>✓ Generate related content</li>
                <li>✓ Everything stays connected</li>
              </ul>
            </div>
          </div>

          <p className="text-center text-xl font-semibold text-purple-600 mt-12">
            No copy-paste. No reformatting. No continuity nightmares.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border-2 border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stop Spending 6 Hours on Session Prep
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join game masters and authors who've transformed their content creation workflow.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow"
          >
            Start Creating with ContentCraft
          </Link>
        </div>
      </section>
    </div>
  );
}
