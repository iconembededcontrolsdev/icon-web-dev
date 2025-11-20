'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface GridItem {
  title: string;
  img: string;
  link?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  id?: string;
  ctaButtons?: Array<{
    text: string;
    link: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'soft';
  }>;
}

export interface DynamicGridProps {
  items: GridItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  onItemClick?: (item: GridItem) => void;
}

export default function DynamicGrid({ 
  items, 
  title, 
  subtitle, 
  className = '',
  onItemClick
}: DynamicGridProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section className={`w-full ${className}`}>
      {/* Container with premium padding */}
      <div className="w-full max-w-[1920px] mx-auto px-[40px] sm:px-[60px] lg:px-[80px] xl:px-[100px] py-[0px] sm:py-[4px] lg:py-[6px]">
        {/* Optional section title/subtitle */}
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-[60px]">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
        )}
      
        {/* Dynamic Grid: 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[6px] sm:gap-[8px] lg:gap-[12px] w-full">
          {items.map((item, index) => (
            <div 
              key={item.id || index}
              className="group w-full cursor-pointer"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => onItemClick && onItemClick(item)}
            >
              {/* Card container */}
              <div className="relative bg-white rounded-[40px] overflow-hidden shadow-sm h-full w-full">
                {/* Desktop: Side-by-side layout (image | details) */}
                <div className="hidden lg:flex h-full">
                  {/* Image - Left half */}
                  <div className="relative w-1/2 min-h-[400px]">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  
                  {/* Details - Right half */}
                  <div className="w-1/2 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    
                    {(item.subtitle || item.description) && (
                      <p className="text-base text-gray-600 mb-6">
                        {item.subtitle || item.description}
                      </p>
                    )}

                    <div>
                      <div className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-full bg-accent text-white hover:bg-accent-hover shadow-sm transition-all duration-200">
                        View All Products
                        <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile: Image with hover overlay */}
                <div className="lg:hidden relative aspect-square w-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="100vw"
                  />
                  
                  {/* Overlay - Only visible on hover/tap */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 transition-opacity duration-300 ${
                    hoveredItem === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                        {item.title}
                      </h3>
                      
                      {(item.subtitle || item.description) && (
                        <p className="text-base md:text-lg text-white/90 mb-6 max-w-md">
                          {item.subtitle || item.description}
                        </p>
                      )}

                      <div>
                        <div className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-full bg-white text-gray-900 hover:bg-gray-100 shadow-lg transition-all duration-200">
                          View All Products
                          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
