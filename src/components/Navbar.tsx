'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-15">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center gap-2">
                <div className="relative h-12 w-12">
                  <Image src="/images/highres/7. Extras/logo.png" alt="Icon Embedded Controls" fill className="object-contain" />
                </div>

              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/products"
              className={`bg-transparent px-4 py-2 rounded-none transition-all ${isActive("/products")
                ? "bg-primary text-white"
                : "text-primary hover:bg-primary hover:text-white"
                }`}
            >
              Products
            </Link>
            <Link
              href="/about"
              className={`border border-primary px-6 py-2 rounded-full transition-all ${
                isActive("/about")
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`border border-primary px-6 py-2 rounded-full transition-all ${
                isActive("/contact")
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              Contact Us
            </Link>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-primary group-hover:text-white transition-transform group-hover:rotate-180 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-primary group-hover:text-white transition-transform group-hover:rotate-180 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary hover:text-accent focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
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
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-2 text-primary hover:bg-card rounded-md font-medium border border-primary mb-2"
            >
              <span>Theme</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted">{theme === 'light' ? 'Light' : 'Dark'}</span>
                {theme === 'light' ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </div>
            </button>
            <Link
              href="/products"
              className="block px-3 py-2 text-primary hover:bg-gray-100 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-primary hover:bg-gray-100 rounded-md font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block w-full text-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
