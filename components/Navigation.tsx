/**
 * Navigation Component
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const apps = [
    { name: 'VirtualCombatSimulator', href: '/apps/virtual-combat-simulator' },
    { name: 'ContentCraft', href: '/apps/contentcraft' },
    { name: 'MasterTyping', href: '/apps/mastertyping' },
    { name: 'Gravity', href: '/apps/gravity' },
    { name: 'FourStarGeneral', href: '/apps/fourstargeneral' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-200 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sixsmith Games
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Apps
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {apps.map((app) => (
                  <Link
                    key={app.href}
                    href={app.href}
                    className="block px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {app.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Pricing
            </Link>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-shadow">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Link
                href="/account"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                My Apps
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-1">
              <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase">
                Apps
              </div>
              {apps.map((app) => (
                <Link
                  key={app.href}
                  href={app.href}
                  className="block px-4 py-2 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {app.name}
                </Link>
              ))}
              <Link
                href="/pricing"
                className="block px-4 py-2 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="px-4 pt-3 space-y-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="block w-full text-center text-gray-700 hover:text-blue-600 font-medium py-2">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium">
                      Get Started
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/account"
                    className="block px-0 py-2 text-gray-700 hover:text-blue-600 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    My Apps
                  </Link>
                  <div className="flex items-center gap-2 py-2">
                    <UserButton afterSignOutUrl="/" />
                    <span className="text-gray-700 font-medium">Account</span>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
