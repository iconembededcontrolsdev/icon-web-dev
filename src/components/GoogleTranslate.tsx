'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
    // To track if we've already defined the callback
    isGoogleTranslateScriptLoaded: boolean;
  }
}

interface Props {
  id?: string;
  variant?: 'icon' | 'full';
}

export default function GoogleTranslate({ id = 'google_translate_element', variant = 'full' }: Props) {
  const isInitialized = useRef(false);

  useEffect(() => {
    // Function to initialize this specific widget
    const initWidget = () => {
      if (window.google && window.google.translate && document.getElementById(id) && !isInitialized.current) {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,zh-CN,zh-TW,ja,ko,hi,ta,te,ml,kn,bn,gu,mr,pa,ur,th,vi,id,ms',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            id
          );
          isInitialized.current = true;
        } catch (e) {
          console.error('Google Translate init error:', e);
        }
      }
    };

    // 1. If google translate is already loaded, init immediately
    if (window.google && window.google.translate) {
      setTimeout(initWidget, 100); // Slight delay for DOM
    }
    // 2. Otherwise, check if we need to hook into the callback
    else {
      // We wrap the existing callback (or create one) to ensure OUR widget gets initialized
      // whenever the script finally loads.
      const originalCb = window.googleTranslateElementInit;

      window.googleTranslateElementInit = () => {
        if (originalCb) originalCb();
        initWidget();
      };
    }
  }, [id]);

  return (
    <>
      <div className={`relative ${variant === 'icon' ? 'inline-block align-middle group' : 'block w-full'}`}>
        {/* Custom UI Trigger */}
        <div className="pointer-events-none">
          {variant === 'icon' ? (
            // Desktop Icon Style with Text
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-transparent text-white group-hover:bg-white group-hover:text-black transition-all duration-300">
              <span>Translate</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S12 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S12 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
          ) : (
            // Mobile Full Width Style
            <div className="w-full flex items-center justify-between px-4 py-3 text-white bg-white/5 border border-white/10 rounded-xl">
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
            </div>
          )}
        </div>

        {/* Incorrect opacity handling in dev tools sometimes, using a strict class for the widget */}
        <div id={id} className={`absolute inset-0 z-20 w-full h-full opacity-[0.001] overflow-hidden cursor-pointer ${variant === 'full' ? 'min-h-[50px]' : ''}`} />
      </div>

      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
      <style jsx global>{`
        .goog-te-gadget-simple {
           width: 100% !important;
           height: 100% !important;
           display: block !important;
           position: absolute !important;
           top: 0 !important;
           left: 0 !important;
           opacity: 0 !important;
           cursor: pointer !important;
        }
        
        /* Just in case google injects an iframe for the menu, style it */
        iframe.goog-te-menu-frame {
            box-shadow: 0 4px 20px rgba(0,0,0,0.5) !important;
            border-radius: 12px !important;
            z-index: 2147483647 !important; /* Max Z-index */
            position: fixed !important;
        }
        
        /* Ensure dropdowns appear on top */
        .goog-te-menu-frame, .goog-te-menu2 {
           z-index: 2147483647 !important;
        }
        
        /* Ensure the container itself can be clicked */
        .translate-container {
            pointer-events: auto !important;
        }
      `}</style>
    </>
  );
}
