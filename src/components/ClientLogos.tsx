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
];

export default function ClientLogos() {
  return (
    <section className="w-full py-6 sm:py-12 lg:py-16 overflow-hidden bg-background">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[40px] pt-4 pb-24 shadow-md overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="text-3xl font-bold text-primary">Our Trusted Clients</h2>
        <p className="text-muted mt-2">Partnering with industry leaders across the globe</p>
      </div>
      
      <div className="relative w-full overflow-hidden pause-on-hover">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set of logos */}
          <div className="flex items-center gap-12 mx-6">
            {LOGOS.map((logo, index) => (
              <div key={`logo-1-${index}`} className="relative w-32 h-20 flex-shrink-0 py-20 rounded-lg overflow-hidden">
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
          <div className="flex items-center gap-18 mx-6">
            {LOGOS.map((logo, index) => (
              <div key={`logo-2-${index}`} className="relative w-32 h-20 flex-shrink-0 py-20 rounded-lg overflow-hidden">
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
      </div>
    </section>
  );
}
