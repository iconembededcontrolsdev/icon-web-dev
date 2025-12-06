'use client';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description?: string;
}

interface ProductBenefitsProps {
  title?: string;
  benefits: Benefit[];
  className?: string;
}

export default function ProductBenefits({ title = "BENEFITS", benefits, className = '' }: ProductBenefitsProps) {
  return (
    <section className={`w-full py-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-2">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {title}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 mb-4 text-[#FF8C00] transform transition-transform duration-300 group-hover:scale-110">
                {benefit.icon}
              </div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 leading-tight">
                {benefit.title}
              </h3>
              {benefit.description && (
                <p className="text-xs text-gray-600 mt-1">
                  {benefit.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Benefit Icons as React Components
export const MileageIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10C30 10 15 25 15 45C15 60 30 75 50 85C70 75 85 60 85 45C85 25 70 10 50 10Z" stroke="currentColor" strokeWidth="3" fill="none"/>
    <path d="M50 35L55 45L65 47L57 55L59 65L50 60L41 65L43 55L35 47L45 45L50 35Z" fill="currentColor"/>
    <circle cx="50" cy="70" r="5" fill="currentColor"/>
  </svg>
);

export const TyreHeatIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" fill="none"/>
    <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M50 30V70M30 50H70M38 38L62 62M62 38L38 62" stroke="currentColor" strokeWidth="2"/>
    <path d="M35 15L40 25L30 25L35 15Z" fill="currentColor"/>
    <path d="M65 75L60 85L70 85L65 75Z" fill="currentColor"/>
    <circle cx="50" cy="50" r="8" fill="currentColor"/>
  </svg>
);

export const MaintenanceIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" fill="none"/>
    <path d="M50 20C50 20 35 35 35 50C35 65 50 80 50 80" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M65 35L55 45M65 65L55 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <rect x="60" y="40" width="8" height="20" rx="2" fill="currentColor"/>
    <path d="M45 45L50 50L45 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const TyreLifeIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" fill="none"/>
    <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M50 30V70M30 50H70M38 38L62 62M62 38L38 62" stroke="currentColor" strokeWidth="2"/>
    <path d="M70 25L75 30L70 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M75 30C75 30 80 35 80 45" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const CleanIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 70C30 70 35 50 50 50C65 50 70 70 70 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <circle cx="40" cy="35" r="5" fill="currentColor"/>
    <circle cx="50" cy="30" r="4" fill="currentColor"/>
    <circle cx="60" cy="35" r="5" fill="currentColor"/>
    <path d="M25 75H75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M45 50L50 65L55 50" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
  </svg>
);

export const TyrePressureIcon = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="3" fill="none"/>
    <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M50 30V70M30 50H70M38 38L62 62M62 38L38 62" stroke="currentColor" strokeWidth="2"/>
    <rect x="45" y="20" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="50" cy="50" r="5" fill="currentColor"/>
    <path d="M50 50L50 35" stroke="white" strokeWidth="2"/>
  </svg>
);
