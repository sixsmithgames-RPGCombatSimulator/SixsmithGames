/**
 * Footer Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">
              Sixsmith Games
            </h3>
            <p className="text-gray-400 mb-4">
              Professional tools for game masters, content creators, and strategy enthusiasts.
              Transform your workflow with our suite of innovative applications.
            </p>
          </div>

          {/* Apps */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Apps</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/apps/virtual-combat-simulator"
                  className="hover:text-white transition-colors"
                >
                  VirtualCombatSimulator
                </Link>
              </li>
              <li>
                <Link
                  href="/apps/contentcraft"
                  className="hover:text-white transition-colors"
                >
                  ContentCraft
                </Link>
              </li>
              <li>
                <Link
                  href="/apps/mastertyping"
                  className="hover:text-white transition-colors"
                >
                  MasterTyping
                </Link>
              </li>
              <li>
                <Link
                  href="/apps/gravity"
                  className="hover:text-white transition-colors"
                >
                  Gravity
                </Link>
              </li>
              <li>
                <Link
                  href="/apps/fourstargeneral"
                  className="hover:text-white transition-colors"
                >
                  FourStarGeneral
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <a
                  href="https://www.sixsmithgames.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Visit Main Site
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {currentYear} Sixsmith Games. All rights reserved.</p>
            <p className="mt-2 text-xs">
              VirtualCombatSimulator, ContentCraft, MasterTyping, Gravity, and FourStarGeneral are trademarks of Sixsmith Games.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
