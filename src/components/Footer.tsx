'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import LogoFrame from './LogoFrame';

export default function Footer() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/content/products.json');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        }
      } catch (error) {
        // Silently fail
      }
    };
    fetchProducts();
  }, []);

  return (
    <footer className="bg-background">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Products</h3>
            <ul className="space-y-1">
              {products.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-muted hover:text-accent transition-colors text-sm"
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
              {products.length === 0 && (
                <li className="text-muted italic text-sm">Loading products...</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Contact</h3>
            <ul className="space-y-2 text-muted">
              <li>
                <a href="tel:+914222596032" className="hover:text-accent transition-colors flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 422-2596032
                </a>
              </li>
              <li>
                <a href="mailto:info@iconembededcontrols.com" className="hover:text-accent transition-colors flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@iconembededcontrols.com
                </a>
              </li>
              <li className="flex items-start gap-2 pt-2">
                <svg className="w-4 h-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm">GST No. 33AACFI3490A1ZX</span>
              </li>
              <li className="pt-4">
                <a href="https://www.linkedin.com/company/icon-embeded-controls/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2 text-sm">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  Connect on LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Address</h3>
            <ul className="space-y-1 text-muted text-sm">
              <li className="font-semibold text-card-foreground">Icon Embeded Controls</li>
              <li>No. 374/2, Jyothi Nagar 2nd Street,<br />Ramanuja Nagar Extension,<br />Uppilipalayam Post,<br />Coimbatore - 641015,<br />Tamil Nadu, India</li>
              <li className="pt-2">
                <Link href="/contact" className="text-accent hover:text-accent-hover transition-colors font-medium">View Full Details →</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="relative w-40 h-16 mb-4">
              <LogoFrame
                src="/images/lowres/7. Extras/logo-low.png"
                alt="Icon Embeded Controls"
                fill
                wrapperClassName="w-40 h-16 p-3"
                imgClassName="object-contain"
                sizes="160px"
              />
            </div>
            <div className="w-full h-48 rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <iframe
                title="Icon Embeded Controls Location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1980.284721862546!2d77.02629303656019!3d11.019608060235385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba85765ea8ff1e3%3A0x297b424b515ef933!2sIcon%20Embeded%20Controls!5e0!3m2!1sen!2sin!4v1765110091224!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 flex flex-col gap-4 text-muted text-sm">
          <p className="text-[11px] leading-relaxed text-muted/75 text-center max-w-4xl mx-auto">
            Disclaimer: Icon Embeded Controls is an independent private platform and is not officially associated with, representing, or endorsed by the Government of India or any of its ministries/agencies.
          </p>
          <div className="flex flex-col md:flex-row justify-between items-center pt-2">
            <p>© {new Date().getFullYear()} Icon Embeded Controls. All rights reserved.</p>
            <p className="mt-2 md:mt-0">India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
