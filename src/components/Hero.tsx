'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface CTAButton {
  text: string;
  link: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'soft';
  icon?: string;
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  img: string;
  ctaButtons?: CTAButton[];
  className?: string;
}

export default function Hero({ 
  title, 
  subtitle, 
  img, 
  ctaButtons = [],
  className = ''
}: HeroProps) {
  return (
    <section className={`w-full ${className}`}>
      {/* Container with premium padding - Full width hero with max-width centered */}
      <div className="w-full max-w-[1920px] mx-auto px-[40px] sm:px-[60px] lg:px-[80px] xl:px-[100px] py-[40px] sm:py-[50px] lg:py-[60px]">
        {/* Clean card-like container with soft rounded corners (30-50px) */}
        <div className="bg-white rounded-[40px] p-[60px] sm:p-[80px] lg:p-[100px] shadow-sm">
          {/* Vertical Flex Layout: Text Block at Top */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            {/* Title - Large and prominent */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              {title}
            </h1>
            
            {/* Subtitle */}
            {subtitle && (
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl">
                {subtitle}
              </p>
            )}

            {/* Buttons Row - Directly below subtitle, above image */}
            {ctaButtons.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mb-4" onClick={(e) => e.stopPropagation()}>
                {ctaButtons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.link}
                    className={`px-8 py-4 text-base font-medium rounded-full transition-all duration-200 ${
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
            )}

            {/* Large Image Area - Below buttons */}
            <div className="w-full max-w-5xl mx-auto mt-2">
              {img.includes('logo.png') ? (
                // Logo with fixed height
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-[30px] overflow-hidden bg-transparent flex items-center justify-center">
                  <Image
                    src={img}
                    alt={title}
                    width={600}
                    height={600}
                    className="object-contain w-auto h-full transition-transform duration-300 hover:scale-[1.02]"
                    priority
                  />
                </div>
              ) : (
                // Product image with aspect-square
                <div className="relative aspect-square w-full rounded-[30px] overflow-hidden bg-gray-50">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-[1.02]"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
