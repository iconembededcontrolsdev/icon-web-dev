'use client';

import Image from 'next/image';

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
  '/images/highres/8. Logos/11.png',
];

export default function ClientLogos() {
  return (
    <div className="w-full mx-auto py-8 overflow-hidden pointer-events-none">
      <div className="text-center mb-6 pointer-events-auto">
        <h2 className="text-2xl font-bold text-primary">Our Trusted Clients</h2>
        <p className="text-muted mt-1 text-sm">
          Partnering with industry leaders across the globe
        </p>
      </div>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_128px,black_calc(100%-128px),transparent)]">
        <div className="flex gap-12 w-max animate-marquee hover:pause-on-hover">
          {/* We render the logos 3 times to ensure smooth infinite scrolling without gaps */}
          {[...Array(3)].map((_, setIndex) => (
            <div key={setIndex} className="flex gap-12 items-center">
              {LOGOS.map((logo, index) => (
                <div
                  key={`logo-${setIndex}-${index}`}
                  className="relative w-32 h-20 flex-shrink-0 transition-all duration-300 transform hover:scale-110"
                >
                  <Image
                    unoptimized
                    src={logo}
                    alt={`Client Logo ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
