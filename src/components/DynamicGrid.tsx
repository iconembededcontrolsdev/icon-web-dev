'use client';

import { useState } from 'react';
import Image from 'next/image';
import LogoFrame from './LogoFrame';
import {
  MileageIcon,
  TyreHeatIcon,
  MaintenanceIcon,
  TyreLifeIcon,
  CleanIcon,
  TyrePressureIcon
} from './ProductBenefits';

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
  benefits?: string[];
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
      <div className="w-full mx-auto px-0 py-0">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
          {items.map((item, index) => {
            const totalSlots = items.reduce((acc, curr) => acc + (curr.benefits ? 2 : 1), 0);
            const isLastItem = index === items.length - 1;
            const shouldCenter = isLastItem && !item.benefits && (totalSlots % 2 !== 0);

            return (
              <div
                key={item.id || index}
                className={`group w-full cursor-pointer ${shouldCenter ? 'lg:col-span-2 lg:max-w-[50%] lg:mx-auto' : ''} ${item.benefits ? 'lg:col-span-2' : ''}`}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => onItemClick && onItemClick(item)}
              >
                {/* Card container */}
                <div className={`relative bg-card rounded-[12px] overflow-hidden shadow-sm w-full flex flex-col ${item.benefits ? 'h-screen' : 'h-full'}`}>
                  {item.benefits ? (
                    // Split Layout for items with benefits - Full Screen
                    <div className="flex flex-col lg:flex-row h-full">
                      {/* Left: Benefits & Details */}
                      <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-card z-10">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="relative w-20 h-8 lg:w-24 lg:h-10 flex-shrink-0 flex items-center justify-center">
                            <LogoFrame
                              src="/images/lowres/7.%20Extras/logo-low.png"
                              alt="Icon Logo"
                              width={96}
                              height={96}
                              wrapperClassName="w-20 h-8 p-2 lg:w-24 lg:h-10"
                              imgClassName="object-contain"
                            />
                          </div>
                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                            {item.title}
                          </h3>
                        </div>

                        <div className="mb-8 flex-grow">
                          <div className="flex items-center justify-start gap-1 mb-6 flex-wrap leading-none">
                            <h4 className="text-sm md:text-base font-bold text-accent uppercase tracking-wider whitespace-nowrap">BENEFITS OF</h4>
                            <div className="relative w-20 h-8">
                              <LogoFrame
                                src="/images/lowres/7.%20Extras/logo-low.png"
                                alt="Icon Logo"
                                width={64}
                                height={24}
                                wrapperClassName="w-20 h-8 p-2 rounded-[12px]"
                                imgClassName="object-contain"
                                sizes="64px"
                              />
                            </div>
                            <h4 className="text-sm md:text-base font-bold text-accent uppercase tracking-wider whitespace-nowrap">NITROGEN</h4>
                          </div>
                          <ul className="grid grid-cols-2 gap-x-2 gap-y-4">
                            {item.benefits.map((benefit, idx) => {
                              let Icon = null;
                              if (benefit.includes('Mileage')) Icon = MileageIcon;
                              else if (benefit.includes('Heat')) Icon = TyreHeatIcon;
                              else if (benefit.includes('Maintenance')) Icon = MaintenanceIcon;
                              else if (benefit.includes('Life')) Icon = TyreLifeIcon;
                              else if (benefit.includes('Dry')) Icon = CleanIcon;
                              else if (benefit.includes('Pressure')) Icon = TyrePressureIcon;

                              return (
                                <li key={idx} className="flex items-start text-xs sm:text-sm md:text-base text-muted group leading-tight">
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-accent flex-shrink-0 mt-0.5">
                                    {Icon && <Icon />}
                                  </div>
                                  <span className="font-medium">{benefit}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        {(item.subtitle || item.description) && (
                          <p className="text-base md:text-lg text-muted mb-8">
                            {item.subtitle || item.description}
                          </p>
                        )}

                        {/* CTA Buttons */}
                        {item.ctaButtons && item.ctaButtons.length > 0 && (
                          <div className="flex flex-wrap gap-4 mt-auto">
                            {item.ctaButtons.map((button, btnIndex) => (
                              <a
                                key={btnIndex}
                                href={button.link}
                                onClick={(e) => e.stopPropagation()}
                                className={`inline-flex items-center px-6 py-3 text-base font-medium rounded-full transition-all duration-200 ${button.variant === 'primary'
                                  ? 'bg-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                                  : button.variant === 'outline'
                                    ? 'border-2 border-accent text-accent hover:bg-accent hover:text-white shadow-md'
                                    : 'bg-accent text-primary hover:bg-accent-hover hover:text-white shadow-md'
                                  }`}
                              >
                                {button.text}
                                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Right: Image */}
                      <div className="w-full lg:w-1/2 relative h-full bg-white flex items-center justify-center p-12">
                        <div className="relative w-full h-full">
                          <Image
                            src={item.img}
                            alt={item.title}
                            fill
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Standard Vertical Layout
                    <>
                      {/* Image - Top section */}
                      <div className="relative w-full aspect-[4/3] bg-white">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>

                      {/* Details - Bottom section */}
                      <div className="p-6 lg:p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="relative w-20 h-8 flex-shrink-0 flex items-center justify-center">
                            <LogoFrame
                              src="/images/lowres/7.%20Extras/logo-low.png"
                              alt="Icon Logo"
                              width={80}
                              height={32}
                              wrapperClassName="w-20 h-8 p-2"
                              imgClassName="object-contain"
                            />
                          </div>
                          <h3 className="text-xl lg:text-2xl font-bold text-primary">
                            {item.title}
                          </h3>
                        </div>

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
                                className={`inline-flex items-center px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${button.variant === 'primary'
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
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
