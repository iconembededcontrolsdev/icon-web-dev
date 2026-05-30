'use client';

import Image, { type StaticImageData } from 'next/image';

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
  img: string | StaticImageData;
  ctaButtons?: CTAButton[];
  className?: string;
  variant?: 'default' | 'landing';
}

export default function Hero({
  title,
  subtitle,
  img,
  ctaButtons = [],
  className = '',
  variant = 'default'
}: HeroProps) {
  if (variant === 'landing') {
    const isStatic = typeof img === 'object';
    return (
      <section className={`w-full ${className}`}>
        <div className="w-full overflow-hidden bg-[#eaf2fb]">
          {isStatic ? (
            <Image
              src={img}
              alt={title || 'Icon Embeded Controls banner'}
              width={(img as StaticImageData).width}
              height={(img as StaticImageData).height}
              priority
              className="w-full h-auto object-contain block"
              sizes="100vw"
            />
          ) : (
            <div className="relative aspect-[16/5] w-full">
              <Image
                src={img}
                alt={title || 'Icon Embeded Controls banner'}
                fill
                priority
                className="object-contain"
                sizes="100vw"
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className={`w-full ${className}`}>
      {/* Container with premium padding - Full width hero with max-width centered */}
      <div className="w-full mx-auto px-0 py-0">
        {/* Clean card-like container with soft rounded corners */}
        <div className="bg-card text-card-foreground rounded-[12px] p-8 sm:p-5 lg:p-1 shadow-md border border-border">
          {/* Vertical Flex Layout: Text Block at Top */}
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-card-foreground mb-6">
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
              {typeof img === 'string' && img.includes("logo-low.png") ? (
                // Logo with fixed height (no rounded white frame)
                <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px] rounded-[30px] overflow-hidden bg-white flex items-center justify-center">
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
                <div className="relative aspect-square w-full rounded-[30px] overflow-hidden bg-white">
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
          </div>
        </div>
      </div>
    </section>
  );
}
