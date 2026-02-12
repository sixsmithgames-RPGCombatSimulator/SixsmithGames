/**
 * Sixsmith Games - Pricing Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 *
 * This source code is licensed under the terms found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import SubscribeButton from '@/components/SubscribeButton';

export const metadata: Metadata = {
  title: 'Pricing - Sixsmith Games Subscription',
  description: 'Get unlimited access to all five Sixsmith Games applications with one simple monthly subscription.',
};

export default function PricingPage() {
  const apps = [
    {
      name: 'VirtualCombatSimulator',
      description: 'D&D battle management with virtual tabletop',
    },
    {
      name: 'ContentCraft',
      description: 'AI-powered content creation for game masters',
    },
    {
      name: 'MasterTyping',
      description: 'Game-based typing practice with K-12 vocabulary',
    },
    {
      name: 'Gravity',
      description: 'Asynchronous multiplayer strategy board game',
    },
    {
      name: 'FourStarGeneral',
      description: 'WWII strategic and tactical war game',
    },
  ];

  const features = [
    'Unlimited access to all 5 applications',
    'Regular updates and new features',
    'Professional-grade infrastructure',
    'Cloud-based data storage and sync',
    'Priority customer support',
    'No per-app fees or hidden costs',
    'Cancel anytime, no long-term commitment',
    'Works across all your devices',
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4">
              One subscription. Five powerful applications. Unlimited possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-8 px-8 text-center">
              <h2 className="text-3xl font-bold mb-2">All-Access Subscription</h2>
              <p className="text-blue-100">Everything you need, one simple price</p>
            </div>

            <div className="p-8 md:p-12">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl md:text-6xl font-bold text-gray-900">$29.99</span>
                  <span className="text-2xl text-gray-600 ml-3">/month</span>
                </div>
                <p className="text-gray-600 text-lg">
                  Less than $6 per app. Cancel anytime.
                </p>
              </div>

              {/* Included Apps */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Includes All Five Applications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {apps.map((app, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-blue-100"
                    >
                      <h4 className="font-bold text-gray-900 mb-1">{app.name}</h4>
                      <p className="text-sm text-gray-600">{app.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  What You Get
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5"
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
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <SubscribeButton className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow">
                  Subscribe Now
                </SubscribeButton>
                <p className="text-sm text-gray-500 mt-4">
                  Secure payment processing powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Exceptional Value
            </h2>
            <p className="text-xl text-gray-600">
              Compare buying similar tools separately vs. our all-inclusive subscription
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Buy Separately
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="flex justify-between text-gray-700">
                  <span>Virtual tabletop tool</span>
                  <span className="font-semibold">$10-15/mo</span>
                </li>
                <li className="flex justify-between text-gray-700">
                  <span>AI content tools</span>
                  <span className="font-semibold">$20-30/mo</span>
                </li>
                <li className="flex justify-between text-gray-700">
                  <span>Typing software</span>
                  <span className="font-semibold">$10-20/mo</span>
                </li>
                <li className="flex justify-between text-gray-700">
                  <span>Strategy games</span>
                  <span className="font-semibold">$15-25/mo</span>
                </li>
              </ul>
              <div className="border-t-2 border-gray-300 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-red-600">$55-90/mo</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-300 relative">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-bl-xl rounded-tr-xl text-sm font-semibold">
                BEST VALUE
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Sixsmith Games
              </h3>
              <ul className="space-y-3 mb-6">
                <li className="flex justify-between text-gray-700">
                  <span>VirtualCombatSimulator</span>
                  <span className="font-semibold text-green-600">✓ Included</span>
                </li>
                <li className="flex justify-between text-gray-700">
                  <span>ContentCraft</span>
                  <span className="font-semibold text-green-600">✓ Included</span>
                </li>
                <li className="flex justify-between text-gray-700">
                  <span>MasterTyping</span>
                  <span className="font-semibold text-green-600">✓ Included</span>
                </li>
                <li className="flex justify-between text-gray-700">
                  <span>Gravity + FourStarGeneral</span>
                  <span className="font-semibold text-green-600">✓ Included</span>
                </li>
              </ul>
              <div className="border-t-2 border-blue-300 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-green-600">$29.99/mo</span>
                </div>
              </div>
              <p className="text-center text-sm font-semibold text-purple-700 mt-4">
                Save $25-60 per month!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Yes! There's no long-term commitment. Cancel your subscription at any time, and you'll
                continue to have access until the end of your current billing period.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Do I get access to all apps immediately?
              </h3>
              <p className="text-gray-600">
                Absolutely! As soon as you subscribe, you'll have instant access to all five applications.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Are there any additional fees?
              </h3>
              <p className="text-gray-600">
                No hidden fees. The $29.99/month subscription includes everything: all apps, cloud storage,
                updates, and support.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards and payment methods through our secure Stripe integration.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                We're currently working on a free trial option. For now, you can subscribe risk-free and
                cancel within the first month if the apps don't meet your needs.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Can I use the apps on multiple devices?
              </h3>
              <p className="text-gray-600">
                Yes! Your subscription works across all your devices. Simply log in with your account
                credentials on any device to access your apps and data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join game masters, content creators, and strategy enthusiasts using Sixsmith Games today.
          </p>
          <SubscribeButton className="inline-block bg-white text-blue-600 px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-shadow">
            Subscribe Now - $29.99/month
          </SubscribeButton>
          <p className="text-sm text-blue-100 mt-4">
            Cancel anytime. No long-term commitment required.
          </p>
        </div>
      </section>
    </div>
  );
}
