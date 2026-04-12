'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import GoogleTranslate from './GoogleTranslate';

const PRODUCTS = [
  { id: 'digital-nitrogen-tyre-inflator', title: 'Digital Nitrogen Tyre Inflator' },
  { id: 'digital-tyre-inflator-pedestal', title: 'Digital Tyre Inflator Pedestals' },
  { id: 'digital-engine-oil-dispenser', title: 'Digital Engine Oil Dispenser' },
  { id: 'engine-oil-changer', title: 'Engine Oil Changer' },
  { id: 'digital-tyre-inflator', title: 'Digital Tyre Inflator' },
  { id: 'digital-def-adblue-dispenser', title: 'Digital DEF/AdBlue Dispenser' },
  { id: 'air-compressor', title: 'Air Compressor' },
  { id: 'nitrogen-generator', title: 'Nitrogen Generator' },
  { id: 'panel-board', title: 'Panel Boards' },
  { id: 'garage-equipment', title: 'Garage Equipment' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // Track Google Translate banner height
  const [bannerOffset, setBannerOffset] = useState(0);

  useEffect(() => {
    // Function to update offset based on body style (Google Translate sets top on body)
    const updateOffset = () => {
      const top = parseInt(document.body.style.top || '0', 10);
      setBannerOffset(top);
    };

    // Check immediately
    updateOffset();

    // Observe body for style changes
    const observer = new MutationObserver(updateOffset);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      style={{ top: bannerOffset ? `${bannerOffset}px` : '0px' }}
      className={`fixed w-full z-50 shadow-sm transition-all duration-300 ${isScrolled
        ? "bg-gray-800/90 backdrop-blur-md border-b border-white/10"
        : "bg-gray-800 border-b border-gray-700"
        }`}
      onMouseLeave={() => setIsProductsOpen(false)}
    >
      <div className="max-w-5xl mx-auto px-2">
        <div className="flex justify-between items-center h-12">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div>
                <Image
                  src="/images/lowres/logo.png"
                  alt="Icon Embeded Controls"
                  width={80}
                  height={32}
                  sizes="80px"
                  className="h-9 w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-1">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/"
                className={`px-3 py-1 rounded-full transition-all ${isActive("/")
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white hover:text-black"
                  }`}
              >
                Home
              </Link>
              <div
                className="relative"
                onMouseEnter={() => setIsProductsOpen(true)}
              >
                <Link
                  href="/products"
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 ${isActive("/products")
                    ? "bg-white text-black"
                    : "bg-transparent text-white hover:bg-white hover:text-black"
                    }`}
                >
                  Products
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>

                {/* Dropdown Menu */}
                {isProductsOpen && (
                  <div className="fixed left-0 right-0 top-[48px] bg-gray-800/95 backdrop-blur-xl border-b border-white/10 shadow-2xl pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-w-6xl mx-auto px-4 py-4">
                      <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                        {PRODUCTS.map((product, index) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="text-sm text-gray-300 hover:text-white transition-colors py-2 animate-in fade-in slide-in-from-left-2 duration-200"
                            style={{ animationDelay: `${index * 20}ms` }}
                            onClick={() => setIsProductsOpen(false)}
                          >
                            {product.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`px-3 py-1 rounded-full transition-all ${isActive("/about")
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white hover:text-black"
                  }`}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-1 rounded-full transition-all ${isActive("/contact")
                  ? "bg-white text-black"
                  : "bg-transparent text-white hover:bg-white hover:text-black"
                  }`}
              >
                Contact Us
              </Link>
            </div>

            {/* Google Translate - Persistent Widget (Replaces Desktop and Mobile instances) */}
            {/* On Desktop: Block. On Mobile: Hidden but mounted (Opacity 0 + No Pointer Events) */}
            {/* Using variant="icon" for actual widget, mobile menu will use a fake trigger */}
            <div className="md:block fixed top-[16px] right-[50px] opacity-0 pointer-events-none md:static md:opacity-100 md:pointer-events-auto">
              <GoogleTranslate id="google_translate_widget" variant="icon" />
            </div>

            {/* Theme Toggle Button */}
            <div className="hidden md:block">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 group"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <svg
                    className="w-5 h-5 text-white group-hover:text-black transition-transform group-hover:rotate-180 duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-white group-hover:text-black transition-transform group-hover:rotate-180 duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-300 focus:outline-none"
                aria-label="Toggle navigation menu"
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
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-xl border-t border-white/20 h-[calc(100vh-48px)] overflow-y-auto pb-20">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-white/10 active:bg-white/20 rounded-xl font-medium border border-white/20 mb-4 transition-colors"
              aria-label="Toggle theme"
            >
              <span className="text-base font-medium">Theme</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">
                  {theme === "light" ? "Light" : "Dark"}
                </span>
                {theme === "light" ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                )}
              </div>
            </button>

            {/* Google Translate - Mobile Fake Trigger */}
            <div className="px-4 mb-4">
              {/* 
                  This is a fake button that looks like the "variant=full" widget.
                  On click, it closes the menu and clicks the hidden persistent widget.
               */}
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors"
                onClick={() => {
                  setIsMenuOpen(false);
                  // Trigger the persistent widget click
                  // Use timeout to ensure menu closing logic implies DOM updates/re-renders are handled
                  // although since persistent widget is outside this block, it should be fine immediately.
                  setTimeout(() => {
                    const widget = document.getElementById('google_translate_widget');
                    if (widget) {
                      // The widget ID is on the overlay DIV which is clickable
                      widget.click();
                    }
                  }, 50);
                }}
              >
                <span className="text-base font-medium">Language</span>
                <div className="flex items-center gap-2 text-gray-300">
                  <span className="text-sm">Select</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Products Dropdown - Mobile */}
            <div className="space-y-1">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-white/10 active:bg-white/20 rounded-xl font-medium transition-colors"
              >
                <span className="flex-grow text-left text-base">Products</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isProductsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isProductsOpen && (
                <div className="ml-4 space-y-1 pl-4 border-l border-white/10">
                  {PRODUCTS.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-lg transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsProductsOpen(false);
                      }}
                    >
                      {product.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="block px-4 py-3 text-white hover:bg-white/10 active:bg-white/20 rounded-xl font-medium text-base transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>

            <Link
              href="/"
              className="block px-4 py-3 text-white hover:bg-white/10 active:bg-white/20 rounded-xl font-medium text-base transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/about"
              className="block px-4 py-3 text-white hover:bg-white/10 active:bg-white/20 rounded-xl font-medium text-base transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>

            <div className="pt-4">
              <Link
                href="/contact"
                className="block w-full text-center bg-white text-black px-6 py-4 rounded-xl font-bold hover:bg-gray-100 active:scale-95 transition-all text-base shadow-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
