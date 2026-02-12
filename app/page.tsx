/**
 * Sixsmith Games - Home Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 *
 * This source code is licensed under the terms found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from 'next/link';

export default function Home() {
  const apps = [
    {
      name: 'VirtualCombatSimulator',
      tagline: 'Your D&D combat control room',
      description:
        'A modern battle management system combining responsive virtual tabletop, initiative tracking, and real-time multiplayer for faster, clearer D&D combats.',
      href: '/apps/virtual-combat-simulator',
      color: 'from-red-500 to-orange-500',
      icon: '⚔️',
    },
    {
      name: 'ContentCraft',
      tagline: 'Stop Fighting Your AI. Start Creating Your World.',
      description:
        'AI-powered content engine for game masters and authors. Generate D&D content that fits together, track canon automatically, and never contradict yourself again.',
      href: '/apps/contentcraft',
      color: 'from-purple-500 to-pink-500',
      icon: '✨',
    },
    {
      name: 'MasterTyping',
      tagline: 'Turn typing practice into an epic adventure',
      description:
        'Game-based typing practice with 10 unique characters, special abilities, and K-12 vocabulary. Make learning keyboard skills exciting and engaging.',
      href: '/apps/mastertyping',
      color: 'from-green-500 to-emerald-500',
      icon: '⌨️',
    },
    {
      name: 'Gravity',
      tagline: 'Strategy without scheduling',
      description:
        'Deep, tactical turn-based sci-fi board game built for asynchronous multiplayer. Play with friends on your own schedule—no coordination required.',
      href: '/apps/gravity',
      color: 'from-blue-500 to-cyan-500',
      icon: '🚀',
    },
    {
      name: 'FourStarGeneral',
      tagline: 'Command your forces in WWII',
      description:
        'Strategic and tactical turn-based war game set in the WWII era. Plan operations, manage resources, and outmaneuver your opponents.',
      href: '/apps/fourstargeneral',
      color: 'from-amber-500 to-yellow-500',
      icon: '🎖️',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Professional Tools for Game Masters & Creators
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Transform your workflow with our suite of innovative applications. From D&D battle
              management to AI-powered content creation, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow"
              >
                Start Your Subscription
              </Link>
              <a
                href="#apps"
                className="bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-300 hover:border-gray-400 transition-colors"
              >
                Explore Our Apps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Apps Showcase */}
      <section id="apps" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Applications
            </h2>
            <p className="text-xl text-gray-600">
              Professional solutions designed for game masters, content creators, and strategy enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app) => (
              <Link
                key={app.name}
                href={app.href}
                className="group bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-transparent hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`inline-block bg-gradient-to-r ${app.color} p-4 rounded-xl mb-4 text-4xl`}
                >
                  {app.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  {app.name}
                </h3>
                <p className="text-sm font-semibold text-gray-600 mb-3">
                  {app.tagline}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {app.description}
                </p>
                <div className="mt-4 text-blue-600 font-semibold group-hover:translate-x-2 transition-transform inline-flex items-center">
                  Learn more →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Sixsmith Games?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Professional Quality
              </h3>
              <p className="text-gray-600">
                Enterprise-grade applications built with modern technology stacks, deployed on reliable infrastructure.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                All-Access Subscription
              </h3>
              <p className="text-gray-600">
                One monthly subscription gives you unlimited access to all five applications.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Continuous Innovation
              </h3>
              <p className="text-gray-600">
                Regular updates and new features based on user feedback and emerging needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join game masters, content creators, and strategy enthusiasts who trust Sixsmith Games.
          </p>
          <Link
            href="/pricing"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow"
          >
            View Pricing & Subscribe
          </Link>
        </div>
      </section>
    </div>
  );
}
