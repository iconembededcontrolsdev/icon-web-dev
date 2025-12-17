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
}

export default function GoogleTranslate({ id = 'google_translate_element' }: Props) {
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
      initWidget();
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
      <div id={id} className="translate-container" />
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
      <style jsx global>{`
        /* Minimalist styling for the Google Translate widget */
        .translate-container {
          display: inline-block;
          margin-left: 4px; /* Slight spacing matches nav items */
          vertical-align: middle;
          position: relative;
        }
        
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: none !important;
          border-radius: 9999px !important;
          padding: 8px 16px !important; /* Match px-3 py-1 approx from Navbar Links */
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          height: auto !important;
          box-sizing: border-box !important;
          font-family: inherit !important;
        }

        /* Hover state matching Navbar links: bg-white text-black */
        .goog-te-gadget-simple:hover {
          background-color: white !important;
        }
        
        /* The text span inside */
        .goog-te-menu-value {
          margin: 0 !important;
          padding: 0 !important;
          color: white !important;
          font-family: inherit !important;
          font-weight: 500 !important;
          font-size: 16px !important;
          display: flex !important;
          align-items: center !important;
        }

        .goog-te-menu-value span {
          color: white !important;
          text-decoration: none !important;
          border: none !important;
          font-family: inherit !important;
        }

        /* On hover, text turns black */
        .goog-te-gadget-simple:hover .goog-te-menu-value span,
        .goog-te-gadget-simple:hover .goog-te-menu-value {
          color: black !important;
        }

        /* Hide the annoying google arrow and extra styling */
        .goog-te-menu-value span:nth-child(1) {
           /* This is the language text */
        }
        .goog-te-menu-value span:nth-child(3),
        .goog-te-menu-value span:nth-child(5) {
           display: none !important; /* Hide Separator "|" and "▼" if google renders them specifically */
        }
        
        /* Hide the Google logo and "Powered by" text details */
        .goog-logo-link {
          display: none !important;
        }
        
        .goog-te-gadget {
          color: transparent !important;
          font-size: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        /* Clean up the dropdown arrow to look like ours or hide it */
        .goog-te-gadget-icon {
          display: none !important;
        }

        /* Mobile specific overrides */
        .md\\:hidden .translate-container {
           margin-left: 0;
           width: 100%;
        }
        .md\\:hidden .goog-te-gadget-simple {
           width: 100% !important;
           justify-content: flex-start !important;
           padding: 12px 16px !important;
           border-radius: 12px !important;
        }
        .md\\:hidden .goog-te-menu-value span {
           font-size: 1rem !important;
        }
        .md\\:hidden .goog-te-gadget-simple:hover {
           background-color: rgba(255,255,255,0.1) !important;
        }
        .md\\:hidden .goog-te-gadget-simple:hover .goog-te-menu-value span {
           color: white !important;
        }
      `}</style>
    </>
  );
}
