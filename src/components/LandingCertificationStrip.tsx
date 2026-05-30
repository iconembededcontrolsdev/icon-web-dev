'use client';

import Image from 'next/image';
import iecLogo from '../../public/images/highres/logos/iec-logo-registered.png';

const MsmeStampLogo = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 sm:w-20 sm:h-20" aria-hidden="true">
    <circle cx="60" cy="60" r="54" fill="none" stroke="#2e1065" strokeWidth="3"/>
    <circle cx="60" cy="60" r="48" fill="none" stroke="#2e1065" strokeWidth="1.5" strokeDasharray="3,3"/>
    
    <path id="curve-top" d="M 20 60 A 40 40 0 0 1 100 60" fill="none"/>
    <path id="curve-bottom" d="M 100 60 A 40 40 0 0 1 20 60" fill="none"/>
    
    <text fontFamily="sans-serif" fontWeight="900" fontSize="9.5" fill="#2e1065">
      <textPath href="#curve-top" startOffset="50%" textAnchor="middle">
        MSME REGISTRATION
      </textPath>
    </text>
    
    <text fontFamily="sans-serif" fontWeight="900" fontSize="8" fill="#2e1065">
      <textPath href="#curve-bottom" startOffset="50%" textAnchor="middle">
        OUR STRENGTH
      </textPath>
    </text>
    
    <circle cx="60" cy="60" r="24" fill="#22c55e"/>
    <circle cx="60" cy="60" r="28" fill="none" stroke="#22c55e" strokeWidth="1"/>
    
    <path d="M 50 60 L 57 67 L 72 52" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function LandingCertificationStrip() {
  return (
    <section className="w-full bg-[#eef2f6] border-y border-slate-300 py-6 sm:py-8">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 text-slate-950">
          
          {/* Left: Certification Logos Row (No text labels, no square background frames for MSME/NSIC) */}
          <div className="flex flex-wrap justify-center items-center gap-5 sm:gap-8 flex-shrink-0">
            {/* Logo 1: MSME Registration Stamp */}
            <div className="flex items-center justify-center">
              <MsmeStampLogo />
            </div>

            {/* Logo 2: MSME Block Logo */}
            <div className="relative w-36 h-18 sm:w-44 sm:h-22 lg:w-48 lg:h-24 flex items-center justify-center">
              <Image
                src="/images/highres/logos/msme-registration.png"
                alt="Ministry of MSME"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 144px, 192px"
              />
            </div>

            {/* Logo 3: NSIC Logo */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <Image
                src="/images/highres/logos/NSIC.png"
                alt="NSIC certified"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 64px, 80px"
              />
            </div>
          </div>

          {/* Center: Certification Statement */}
          <div className="text-center max-w-3xl flex-grow px-2">
            <h2 className="text-[clamp(1.15rem,2.1vw,1.9rem)] font-extrabold leading-tight text-slate-950">
              A Government Recognized, NSIC Certified & MSME Registered firm.
            </h2>
            <p className="mx-auto mt-2.5 max-w-2xl text-xs sm:text-sm font-medium leading-relaxed text-slate-700">
              Operating in full compliance with Central Procurement Policies for seamless PSU & B2B Supply operations.
            </p>
          </div>

          {/* Right: Registered ICON Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Image
              src={iecLogo}
              alt="ICON Embeded Controls Logo"
              priority
              className="h-auto w-[180px] sm:w-[220px]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}