'use client';

import Image from 'next/image';

import Link from 'next/link';
import ClientLogos from '@/components/ClientLogos';

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
      <div className="w-full mx-auto px-0 py-0">
        {/* Clean card-like container with soft rounded corners */}
        <div className="bg-white rounded-[12px] p-8 sm:p-5 lg:p-1 shadow-md">
          {/* Vertical Flex Layout: Text Block at Top */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-6">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl md:text-2xl text-muted mb-12 max-w-2xl">
                {subtitle}
              </p>
            )}

            {ctaButtons.length > 0 && (
              <div
                className="flex flex-wrap justify-center gap-4 mb-8"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                {ctaButtons.map((button, index) => (
                  <Link
                    key={index}
                    href={button.link}
                    className={`px-4 py-2 rounded-full text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${button.variant === "primary"
                      ? "bg-primary text-white hover:opacity-90"
                      : button.variant === "secondary"
                        ? "bg-accent text-primary hover:bg-accent-hover hover:text-white"
                        : button.variant === "outline"
                          ? "border-2 border-accent text-accent hover:bg-accent hover:text-white"
                          : button.variant === "soft"
                            ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                            : "bg-primary text-white hover:opacity-90"
                      }`}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            )}

            {/* Large Image Area - Below buttons */}
            <div className="w-full max-w-5xl mx-auto mt-2">
              {img.includes("logo.png") ? (
                // Logo with fixed height
                <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] rounded-[30px] overflow-hidden bg-transparent flex items-center justify-center">
                  <Image
                    src={img}
                    alt={title || 'Icon Logo'}
                    width={600}
                    height={600}
                    className="object-contain w-auto h-full transition-transform duration-300 hover:scale-[1.02]"
                    priority
                  />
                </div>
              ) : (
                // Product image with aspect-square
                <div className="relative aspect-square w-full rounded-[30px] overflow-hidden bg-transparent">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-[1.02]"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
            </div>

            {img.includes("logo.png") && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <a
                  href="https://www.msme.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm transition-transform hover:scale-105"
                  aria-label="Visit MSME website"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                    <Image
                      src="/images/highres/logos/MSME.jpeg"
                      alt="MSME certified"
                      width={40}
                      height={40}
                      className="h-8 w-8 rounded-full object-contain"
                    />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-700">
                    MSME
                  </span>
                </a>

                <a
                  href="https://www.nsic.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm transition-transform hover:scale-105"
                  aria-label="Visit NSIC website"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                    <Image
                      src="/images/highres/logos/NSIC.png"
                      alt="NSIC certified"
                      width={40}
                      height={40}
                      className="h-8 w-8 rounded-full object-contain"
                    />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-700">
                    NSIC
                  </span>
                </a>
              </div>
            )}
          </div>

          {/* Client Logos Section - Merged into Hero but full width */}
          <div className="w-full mt-8 border-t border-gray-100">
            <ClientLogos />
          </div>
        </div>
      </div>
    </section>
  );
}
