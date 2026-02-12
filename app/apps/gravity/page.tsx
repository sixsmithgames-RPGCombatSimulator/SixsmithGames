/**
 * Gravity - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gravity - Asynchronous Multiplayer Strategy | Sixsmith Games',
  description: 'Deep, tactical turn-based sci-fi board game built for asynchronous multiplayer. Play with friends on your own schedule—no coordination required.',
};

export default function GravityPage() {
  const features = [
    {
      title: 'Asynchronous Multiplayer',
      description: 'Take your turn when you have time. No scheduling, no coordination, no waiting.',
    },
    {
      title: 'Deep Tactical Gameplay',
      description: 'Ship systems, crew roles, and high-impact actions create meaningful strategic depth.',
    },
    {
      title: 'Turn-Based Board Game',
      description: 'One great decision at a time. Clear board state, transparent rules, fair outcomes.',
    },
    {
      title: 'Ship Systems Management',
      description: 'Power routing, damage control, and repairs create real tradeoffs every turn.',
    },
    {
      title: 'Crew Roles & Abilities',
      description: 'Captain abilities and crew coordination change how you approach each match.',
    },
    {
      title: 'Cross-Platform Play',
      description: 'Web-based client with shared engine for consistency and portability.',
    },
  ];

  const actions = [
    { name: 'Repair', description: 'Fix damaged systems and restore ship functionality' },
    { name: 'Maneuver', description: 'Position your ship for tactical advantage' },
    { name: 'Scan/Acquire', description: 'Gather resources and intelligence' },
    { name: 'Combat', description: 'Attack opponents and defend your position' },
    { name: 'Assemble', description: 'Build and upgrade ship components' },
    { name: 'Power', description: 'Route power to critical systems' },
  ];

  return (
    <div>
      {/* Hero Section with Gravity theme */}
      <section className="bg-gradient-to-br from-blue-950 via-indigo-900 to-purple-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🚀 ASYNCHRONOUS STRATEGY
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Strategy Without Scheduling
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Gravity is a deep, tactical turn-based sci-fi board game built for asynchronous multiplayer.
                Take your turn when you have time, coordinate with your crew, and outplay opponents—without
                needing everyone online at once.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pricing"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow text-center"
                >
                  Join the Fleet
                </Link>
              </div>
            </div>
            <div className="bg-blue-900/50 backdrop-blur rounded-2xl shadow-2xl p-8 border-2 border-blue-500/30">
              <h3 className="text-2xl font-bold mb-4">Your crew. Your ship. Your move.</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-cyan-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Play with friends across time zones</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-cyan-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Deep tactics without the time commitment</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-cyan-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Every decision matters, every turn counts</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-cyan-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No scheduling, no waiting, no coordination needed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Your Group Loves Strategy Games. Your Schedules Don't.
            </h2>
            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Scheduling is the final boss. Your group wants deep games, but real-time sessions fall apart.
                Most "async" games feel shallow, removing tension and meaningful interaction.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-200">
                <p className="text-2xl font-bold text-blue-700 mb-4">
                  Gravity delivers serious tactical gameplay designed for async from day one.
                </p>
                <p className="text-gray-700">
                  Make one great decision at a time. See the board clearly. Trust the rules. Keep the game moving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Makes Gravity Compelling
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border-2 border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gameplay Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              High-Stakes Decision Loops
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every turn asks a hard question. Each action creates real tradeoffs that evolve across the match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actions.map((action, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{action.name}</h3>
                <p className="text-gray-700">{action.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-900 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Every Turn Matters</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Do you repair now or gamble for resources?</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Do you maneuver for position or power systems for defense?</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Do you scan/acquire to get ahead or attack to keep others from stabilizing?</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2">→</span>
                <span>Your ship is a living system with power, damage, and repair tradeoffs</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built For Strategic Minds
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Perfect For:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Busy adults who love strategy but can't guarantee a 2-4 hour session
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tabletop groups that want ongoing games across time zones
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Strategy gamers who want meaningful choices, not clicker progression
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Competitive friends who want clear rules and fair outcomes
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Gravity Over Alternatives:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Designed for async from day one (not real-time awkwardly slowed down)
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Crunchy strategy without the meeting invite
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Rules you can trust: deterministic logic and validation-focused design
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Modern web delivery: no installs, jump in fast
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            A Board Game That Fits Real Life
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join strategists who play serious games on their own schedule.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow"
          >
            Take Your First Turn
          </Link>
        </div>
      </section>
    </div>
  );
}
