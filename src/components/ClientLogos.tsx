'use client';

import AdaptiveImage from './AdaptiveImage';

const LOGOS = [
  '/images/highres/8. Logos/1.svg',
  '/images/highres/8. Logos/2.svg',
  '/images/highres/8. Logos/3.svg',
  '/images/highres/8. Logos/4.svg',
  '/images/highres/8. Logos/5.svg',
  '/images/highres/8. Logos/6.svg',
  '/images/highres/8. Logos/7.svg',
  '/images/highres/8. Logos/8.svg',
  '/images/highres/8. Logos/9.svg',
  '/images/highres/8. Logos/10.svg',
  '/images/highres/8. Logos/11.svg',
];

export default function ClientLogos() {
  return (
    <div className="w-full pt-8 pb-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <h2 className="text-2xl font-bold text-primary">Our Trusted Clients</h2>
        <p className="text-muted mt-1 text-sm">Partnering with industry leaders across the globe</p>
      </div>
      
      <div className="relative w-full overflow-hidden pause-on-hover">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set of logos */}
          <div className="flex items-center gap-12 mx-6">
            {LOGOS.map((logo, index) => (
              <div key={`logo-1-${index}`} className="relative w-24 h-16 flex-shrink-0 overflow-hidden">
                <AdaptiveImage
                  src={logo}
                  alt={`Client Logo ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Duplicate set for seamless scrolling */}
          <div className="flex items-center gap-12 mx-6">
            {LOGOS.map((logo, index) => (
              <div key={`logo-2-${index}`} className="relative w-24 h-16 flex-shrink-0 overflow-hidden">
                <AdaptiveImage
                  src={logo}
                  alt={`Client Logo ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
