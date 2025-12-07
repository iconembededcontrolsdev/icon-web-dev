'use client';

import { useState, useEffect } from 'react';
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
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPos = (prev + 1) % (LOGOS.length * 120);
        return newPos;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Our Trusted Clients</h2>
        <p className="text-muted mt-1 text-sm">Partnering with industry leaders across the globe</p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-12 px-8"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            transition: 'none',
          }}
        >
          {[...Array(3)].map((_, setIndex) =>
            LOGOS.map((logo, index) => (
              <div
                key={`logo-${setIndex}-${index}`}
                className="relative w-32 h-20 flex-shrink-0"
              >
                <Image
                  src={logo}
                  alt={`Client Logo ${index + 1}`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
