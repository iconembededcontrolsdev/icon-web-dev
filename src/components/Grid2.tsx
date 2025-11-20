'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type GridLayout = '1x1' | '1x2' | '2x1';

export interface GridItem {
  title: string;
  img: string;
  link?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaButtons?: Array<{
    text: string;
    link: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'soft';
  }>;
}

export interface Grid2Props {
  items: GridItem[];
  title?: string;
  subtitle?: string;
  layout?: GridLayout;
  className?: string;
  onItemClick?: (item: GridItem) => void;
}

export default function Grid2({ 
  items, 
  title, 
  subtitle, 
  layout = '1x2',
  className = '',
  onItemClick
}: Grid2Props) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <section className={`w-full ${className}`}>
      {/* Container with premium padding and gap between rows - Full width utilization */}
      {/* <div className="w-full max-w-[1920px] mx-auto px-[40px] sm:px-[6px] lg:px-[10px] xl:px-[100px] py-[8px] sm:py-[12px] lg:py-[16px]">                             {/*   Change for 2 grid spacing - Minimal spacing */}
      <div className="w-full max-w-[1920px] mx-auto px-[40px] sm:px-[6px] lg:px-[10px] xl:px-[100px] py-[0px] sm:py-[4px] lg:py-[6px]">                                 {/* Change for 2 grid spacing - No Spacing spacing */}
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
      
        {/* 2-Box Side-by-Side Grid with small gaps between blocks - Full width filling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[12px] md:gap-[16px] lg:gap-[20px] w-full">
        {items.map((item, index) => (
          <div 
            key={index}
              className="group w-full cursor-pointer"
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
              onClick={() => onItemClick && onItemClick(item)}
            >
              {/* Clean card-like container with soft rounded corners (30-50px) - Full width filling */}
              <div className="bg-white rounded-[40px] p-[50px] sm:p-[60px] lg:p-[70px] xl:p-[80px] shadow-sm h-full flex flex-col w-full">
                {/* Vertical Flex Layout: Text Block at Top, then Buttons, then Image */}
                <div className="flex flex-col items-center text-center w-full">
                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  
                  {/* Subtitle/Description */}
                  {(item.subtitle || item.description) && (
                    <p className="text-lg md:text-xl text-gray-600 mb-4 max-w-md">
                      {item.subtitle || item.description}
                    </p>
                  )}

                  {/* Buttons Row - Directly below subtitle, above image */}
                  {(item.ctaButtons && item.ctaButtons.length > 0) ? (
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-4" onClick={(e) => e.stopPropagation()}>
                      {item.ctaButtons.map((button, btnIndex) => (
                        <Link
                          key={btnIndex}
                          href={button.link}
                          className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                            button.variant === 'outline'
                              ? 'border-2 border-accent text-accent hover:bg-accent/5' 
                              : button.variant === 'secondary'
                              ? 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                              : button.variant === 'soft'
                              ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                              : 'bg-accent text-white hover:bg-accent-hover shadow-sm'
                          }`}
                        >
                          {button.text}
                        </Link>
                      ))}
                    </div>
                  ) : item.link && (
                    <div className="mb-4" onClick={(e) => e.stopPropagation()}>
                      <Link
                        href={item.link}
                        className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-full bg-accent text-white hover:bg-accent-hover shadow-sm transition-all duration-200"
                      >
                        {item.ctaText || 'View Details'}
                      </Link>
                    </div>
                  )}

                  {/* Large Image Area - Below buttons, takes up remaining space */}
                  <div className="w-full mt-2">
                    <div className="relative aspect-square w-full rounded-[30px] overflow-hidden bg-gray-50">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className={`object-contain transition-transform duration-300 ${
                          hoveredItem === index ? 'scale-[1.02]' : ''
                  }`}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                />
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
