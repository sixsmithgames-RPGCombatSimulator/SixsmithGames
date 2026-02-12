/**
 * MasterTyping - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MasterTyping - Game-Based Typing Practice | Sixsmith Games',
  description: 'Transform typing practice into an adventure with 10 unique characters, special abilities, and K-12 vocabulary. Make learning keyboard skills exciting for all ages.',
};

export default function MasterTypingPage() {
  const characters = [
    '🧙‍♂️ Wizard - Magic projectiles',
    '🦧 Ape - Banana slicks',
    '👵 Grandma - Yarn zones',
    '🦄 Unicorn - Rainbow bonuses',
    '🐲 Dragon - Fire zones',
    '🥷 Ninja - Vortex traps',
    '🤖 Robot - Magnetic clumps',
    '👨‍🍳 Chef - Food effects',
    '🧛 Vampire - Bat swarms',
    '👽 Alien - Abduction beams',
  ];

  const gameModes = [
    {
      name: 'Video Game Mode',
      description: 'Defeat words with projectiles, unlock characters, and collect coins',
      icon: '🎮',
    },
    {
      name: 'Pro Mode',
      description: 'Skill-focused practice with power-ups and strategic gameplay',
      icon: '🎯',
    },
    {
      name: 'Assessment Mode',
      description: 'Comprehensive typing evaluation with detailed metrics',
      icon: '📊',
    },
    {
      name: 'Practice Mode',
      description: 'Traditional typing practice with adjustable difficulty levels',
      icon: '📝',
    },
  ];

  return (
    <div>
      {/* Hero Section with MasterTyping theme */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ⌨️ GAME-BASED TYPING PRACTICE
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Turn Typing Practice Into an Epic Adventure
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                MasterTyping combines game-based learning with educational vocabulary for typing practice that
                actually engages students. Choose your character, defeat incoming words, and master K-12 vocabulary
                while having fun.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pricing"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow text-center"
                >
                  Start Playing
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Kids Love MasterTyping</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Practice feels like playtime, not homework</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>10 unique characters with special abilities</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Build vocabulary AND typing skills simultaneously</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>One purchase, unlimited practice—no subscriptions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Point Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              "My Child Hates Typing Practice"
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Traditional typing programs are boring and repetitive. Kids resist practice time, progress stalls,
              and homework becomes a battle.
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200">
              <p className="text-2xl font-bold text-green-700 mb-4">
                Finally, a typing program your kids will actually BEG to use.
              </p>
              <p className="text-gray-700">
                Turn practice time into game time with MasterTyping. Video game mode with wizards, dragons, unicorns,
                and special abilities makes kids ASK to practice instead of avoiding it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Multiple Game Modes for Every Learning Style
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gameModes.map((mode, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border-2 border-green-100">
                <div className="text-4xl mb-4">{mode.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{mode.name}</h3>
                <p className="text-gray-700">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              10 Unique Characters with Special Abilities
            </h2>
            <p className="text-xl text-gray-600">
              Each character has unique powers that slow, stop, push, or control incoming words
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {characters.map((character, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center border-2 border-green-100 hover:border-green-300 hover:shadow-lg transition-all"
              >
                <p className="text-gray-800 font-medium">{character}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Educational Content That Works
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900">13 Vocabulary Levels</h3>
                    <p className="text-gray-600">Kindergarten through Grade 12, with 200+ words per level</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900">Standards-Aligned Content</h3>
                    <p className="text-gray-600">Age-appropriate vocabulary complexity aligned with educational standards</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900">Progressive Difficulty</h3>
                    <p className="text-gray-600">5 difficulty levels from Super Easy to Impossible</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold text-gray-900">Real-Time Statistics</h3>
                    <p className="text-gray-600">Track WPM, accuracy, combo streaks, and progress</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Perfect For:</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Parents seeking engaging homework tools</li>
                <li>✓ K-12 Teachers needing classroom resources</li>
                <li>✓ Homeschool families</li>
                <li>✓ Adult learners improving professional skills</li>
                <li>✓ ESL/Language learners building vocabulary</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stop Paying Monthly for Typing Practice
            </h2>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div>
                <p className="text-sm text-gray-600 mb-2">Typical Typing Apps</p>
                <p className="text-4xl font-bold text-red-600 mb-2">$10-30</p>
                <p className="text-sm text-gray-600">per month, per user</p>
                <p className="text-2xl font-semibold text-gray-900 mt-4">$100+/year</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">MasterTyping</p>
                <p className="text-4xl font-bold text-green-600 mb-2">Included</p>
                <p className="text-sm text-gray-600">in subscription</p>
                <p className="text-2xl font-semibold text-gray-900 mt-4">+ 4 More Apps</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Turn Practice Time Into Game Time
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join families and teachers who've made typing practice fun with MasterTyping.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow"
          >
            Start Learning Today
          </Link>
        </div>
      </section>
    </div>
  );
}
