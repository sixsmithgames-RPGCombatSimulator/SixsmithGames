/**
 * VirtualCombatSimulator - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VirtualCombatSimulator - D&D Battle Management | Sixsmith Games',
  description: 'A modern battle management system combining responsive virtual tabletop, initiative tracking, and real-time multiplayer for faster, clearer D&D combats.',
};

export default function VirtualCombatSimulatorPage() {
  const features = [
    {
      title: 'Virtual Tabletop & Map',
      items: [
        'Interactive battle map with zoom and pan',
        'Grid snapping for precise token placement',
        'Tokens for characters, monsters, and objects',
        'Support for custom map images',
      ],
    },
    {
      title: 'Combat Management',
      items: [
        'Initiative tracker with automatic sorting',
        'Turn-based combat flow with visual indicators',
        'Action panel for attacks, spells, and movement',
        'Token-linked HP tracking with multiple displays',
      ],
    },
    {
      title: 'Sheets & Stats',
      items: [
        'Character sheet viewer',
        'Monster sheet viewer',
        'Combat stats visible when needed',
        'Notes and custom fields for context',
      ],
    },
    {
      title: 'Multiplayer & Persistence',
      items: [
        'WebSocket-based multiplayer support',
        'Session persistence with save/load',
        'Asset management for maps/tokens/characters',
        'JWT-based authentication',
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section with VCS theme */}
      <section className="bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ⚔️ D&D BATTLE MANAGEMENT
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Run D&D Combats at Full Speed
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                A modern battle map and initiative tracker built for real play. VirtualCombatSimulator keeps
                the table aligned with grid-snapped maps, token control, and turn tracking—online or in-person.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pricing"
                  className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-red-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your encounter control room</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Run combats faster with automatic initiative tracking</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Make positioning obvious with grid-snapped maps</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Keep turns, HP, and stats in one place</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Play together in real-time with WebSocket multiplayer</span>
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
              Stop Asking "Whose Turn Is It?"
            </h2>
            <p className="text-xl text-gray-600">
              Combat stalls when positioning and turns aren't crystal clear. VirtualCombatSimulator centralizes
              the map, tokens, initiative, and sheets so the GM can keep pace and players stay engaged.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Tactical Combat
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <ul className="space-y-3">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-700">
                      <svg
                        className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Built with Modern Technology
            </h2>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 border-2 border-red-100">
              <ul className="grid grid-cols-2 gap-4 text-gray-700">
                <li>✓ React + TypeScript frontend</li>
                <li>✓ Express + TypeScript backend</li>
                <li>✓ MongoDB persistence</li>
                <li>✓ Socket.IO multiplayer</li>
                <li>✓ JWT authentication</li>
                <li>✓ Stripe integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Running Better Combats Today
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join game masters who've transformed their D&D sessions with VirtualCombatSimulator.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow"
          >
            Subscribe Now
          </Link>
        </div>
      </section>
    </div>
  );
}
