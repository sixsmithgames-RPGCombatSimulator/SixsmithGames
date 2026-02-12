/**
 * FourStarGeneral - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FourStarGeneral - WWII Strategic War Game | Sixsmith Games',
  description: 'Command your forces in this strategic and tactical turn-based war game set in the WWII era. Plan operations, manage resources, and outmaneuver your opponents.',
};

export default function FourStarGeneralPage() {
  const features = [
    {
      title: 'Strategic Campaign Management',
      description: 'Plan large-scale operations across multiple theaters of war',
      icon: '🗺️',
    },
    {
      title: 'Tactical Combat Resolution',
      description: 'Command units in detailed turn-based battles',
      icon: '⚔️',
    },
    {
      title: 'Historical WWII Setting',
      description: 'Authentic units, equipment, and historical scenarios',
      icon: '📜',
    },
    {
      title: 'Resource Management',
      description: 'Balance production, supply lines, and force deployment',
      icon: '⚙️',
    },
    {
      title: 'Command Structure',
      description: 'Organize your forces with realistic military hierarchies',
      icon: '🎖️',
    },
    {
      title: 'Multiple Victory Conditions',
      description: 'Achieve victory through conquest, economic dominance, or strategic objectives',
      icon: '🏆',
    },
  ];

  const unitTypes = [
    'Infantry Divisions',
    'Armored Units',
    'Artillery Battalions',
    'Air Forces',
    'Naval Fleets',
    'Special Operations',
  ];

  return (
    <div>
      {/* Hero Section with FourStarGeneral theme */}
      <section className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🎖️ WWII STRATEGIC WAR GAME
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                Command Your Forces in WWII
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                FourStarGeneral is a strategic and tactical turn-based war game set in the WWII era. Plan
                complex operations, manage resources and supply lines, and outmaneuver your opponents in
                historically authentic campaigns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pricing"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow text-center"
                >
                  Take Command
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-amber-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lead Your Nation to Victory</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-amber-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Plan strategic operations across multiple fronts</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-amber-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Command diverse military units with authentic capabilities</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-amber-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Manage supply lines, production, and logistics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-amber-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Engage in historically inspired scenarios and campaigns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Depth Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Strategic Depth Meets Tactical Precision
            </h2>
            <p className="text-xl text-gray-600">
              FourStarGeneral combines grand strategy with detailed tactical combat. Make high-level
              decisions about resource allocation and theater management, then execute tactical battles
              with precision and skill.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border-2 border-amber-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Strategic Layer</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2 font-bold">→</span>
                  <span>Plan multi-theater campaigns and operations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2 font-bold">→</span>
                  <span>Manage production, research, and economic development</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2 font-bold">→</span>
                  <span>Establish and maintain critical supply lines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2 font-bold">→</span>
                  <span>Deploy forces to achieve strategic objectives</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border-2 border-amber-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tactical Layer</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2 font-bold">→</span>
                  <span>Command units in turn-based tactical battles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2 font-bold">→</span>
                  <span>Utilize terrain and weather for tactical advantage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2 font-bold">→</span>
                  <span>Coordinate combined arms operations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2 font-bold">→</span>
                  <span>Execute flanking maneuvers and defensive strategies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive War Game Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg border-2 border-amber-100 hover:border-amber-300 hover:shadow-xl transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Unit Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Diverse Military Forces
            </h2>
            <p className="text-xl text-gray-600">
              Command historically authentic units across all branches of military service
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {unitTypes.map((unit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all"
              >
                <p className="font-bold text-gray-900 text-lg">{unit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historical Authenticity Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Rooted in History
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                FourStarGeneral brings the complexity and challenge of WWII-era warfare to your screen
                with historically researched units, authentic equipment capabilities, and inspired scenarios
                from actual military operations.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Authentic WWII military units and equipment
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Historically inspired campaign scenarios
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Realistic supply and logistics systems
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Accurate combat resolution based on historical performance
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-amber-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">For Strategy Enthusiasts</h3>
              <p className="text-gray-700 mb-4">
                Whether you're a history buff, a strategy game veteran, or new to war gaming,
                FourStarGeneral offers depth and challenge that rewards thoughtful planning and
                tactical execution.
              </p>
              <div className="bg-amber-50 rounded-lg p-4 border-2 border-amber-200">
                <p className="font-semibold text-amber-900 mb-2">Perfect for players who enjoy:</p>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Grand strategy and military history</li>
                  <li>• Complex tactical decision-making</li>
                  <li>• Resource and logistics management</li>
                  <li>• Turn-based competitive gameplay</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            History Awaits Your Command
          </h2>
          <p className="text-xl text-amber-100 mb-8">
            Lead your forces to victory in the most challenging conflict of the 20th century.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-amber-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow"
          >
            Begin Your Campaign
          </Link>
        </div>
      </section>
    </div>
  );
}
