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
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-muted">
                {subtitle}
              </p>
            )}
          </div>
        )}
      
        {/* Dynamic Grid: 1 column on mobile, 2 columns on desktop (2x2 max) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[6px] sm:gap-[8px] lg:gap-[12px] w-full">
          {items.map((item, index) => {
            const isLastItem = index === items.length - 1;
            const isOddCount = items.length % 2 !== 0;
            const shouldCenter = isLastItem && isOddCount;

            return (
              <div 
                key={item.id || index}
                className={`group w-full cursor-pointer ${
                  shouldCenter ? 'lg:col-span-2 lg:max-w-[50%] lg:mx-auto' : ''
                }`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => onItemClick && onItemClick(item)}
              >
              {/* Card container with image stacked on top */}
              <div className="relative bg-card rounded-[40px] overflow-hidden shadow-lg h-full w-full flex flex-col">
                {/* Image - Top section with light background */}
                <div className="relative w-full aspect-[4/3] bg-card-light">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105 p-6"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                
                {/* Details - Bottom section with dark background */}
                <div className="p-6 lg:p-8 flex flex-col flex-grow bg-card">
                  <h3 className="text-xl lg:text-2xl font-bold text-primary mb-3">
                    {item.title}
                  </h3>
                  
                  {(item.subtitle || item.description) && (
                    <p className="text-sm lg:text-base text-muted mb-6 line-clamp-3 flex-grow">
                      {item.subtitle || item.description}
                    </p>
                  )}

                  {/* CTA Buttons */}
                  {item.ctaButtons && item.ctaButtons.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {item.ctaButtons.map((button, btnIndex) => (
                        <a
                          key={btnIndex}
                          href={button.link}
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                            button.variant === 'primary' 
                              ? 'bg-primary text-white hover:opacity-90 shadow-md' 
                              : button.variant === 'outline'
                              ? 'border-2 border-accent text-accent hover:bg-accent hover:text-white shadow-sm'
                              : 'bg-accent text-primary hover:bg-accent-hover hover:text-white shadow-sm'
                          }`}
                        >
                          {button.text}
                          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
