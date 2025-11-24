'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              {/* Using a placeholder or the actual logo if available. 
                  The image shows "Icon Embedded Controls" text. 
                  I'll keep the image if it exists, otherwise just text. */}
              {/* Logo / Brand Name */}
              <div className="flex items-center gap-2">
                 {/* If you have a logo image, uncomment below and adjust width/height */}
                 {/* <div className="relative h-10 w-10">
                    <Image src="/images/highres/7. Extras/logo.png" alt="Logo" fill className="object-contain" />
                 </div> */}
                 <span className="text-xl font-bold text-primary whitespace-nowrap">
                    Icon Embedded Controls
                 </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/products" 
              className={`bg-transparent border border-primary px-6 py-2 rounded-full transition-all ${isActive('/products') ? 'bg-primary text-white' : 'text-primary hover:bg-primary hover:text-white'}`}
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className={`bg-transparent border border-primary px-6 py-2 rounded-full transition-all ${isActive('/about') ? 'bg-primary text-white' : 'text-primary hover:bg-primary hover:text-white'}`}
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className={`bg-transparent border border-primary px-6 py-2 rounded-full transition-all ${isActive('/contact') ? 'bg-primary text-white' : 'text-primary hover:bg-primary hover:text-white'}`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary hover:text-accent focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
