'use client';

import Image from 'next/image';
import LogoFrame from './LogoFrame';
import { useRouter } from 'next/navigation';
import {
    MileageIcon,
    TyreHeatIcon,
    MaintenanceIcon,
    TyreLifeIcon,
    CleanIcon,
    TyrePressureIcon
} from './ProductBenefits';

export default function NitrogenShowcase({ product }: { product?: any }) {
    const router = useRouter();
    const benefits = [
        'More Mileage',
        'Prevents Tyre Over Heat',
        'Maintenance Repair',
        'Increased Tyre Life',
        '100 % Dry and Clean',
        'Consistent Tyre Pressure'
    ];

    // Use product data if available, otherwise fallback (though fallback shouldn't be needed if parent passes it)
    const title = product?.title || 'Digital Nitrogen Tyre Inflator';
    const description = product?.subtitle || product?.description || 'Reliable and accurate electronic digital nitrogen tyre inflators. Nitrogen production based on cost-efficient PSA technology with 95-99% purity suitable for vehicle nitrogen inflation.';
    const img = product?.mainImage || product?.images?.[0] || '/images/highres/digital-nitrogen-tyre-inflator/nitrojet-1000-lcv-p.jpg';
    const link = product?.id ? `/products/${product?.id}` : '/products/digital-nitrogen-tyre-inflator';

    const ctaButtons = [
        { text: 'Learn More', link: link, variant: 'primary' },
        { text: 'Product Enquiry', link: `/products/enquiry?product=${encodeURIComponent(title)}`, variant: 'outline' }
    ];

    return (
        <section className="w-full mb-4">
            <div className="w-full mx-auto">
                <div
                    onClick={() => router.push(link)}
                    className="relative bg-card rounded-[12px] overflow-hidden shadow-sm w-full flex flex-col lg:flex-row min-h-screen lg:h-screen cursor-pointer transition-transform hover:scale-[1.01] duration-300"
                >

                    {/* Image Section - First on Mobile, Right on Desktop */}
                    {/* On Mobile: Order 1 (default html order). On Desktop: Order 2 (swapped manually or using flex-row-reverse if needed, but here we want Content Left/Image Right on Desktop)
              
              Wait, the standard is:
              Mobile: Image Top
              Desktop: Content Left, Image Right.

              If I write HTML:
              <ImageDiv />
              <ContentDiv />

              Mobile: Flex-Col
              ImageDiv (Top)
              ContentDiv (Bottom)
              
              Desktop: Flex-Row
              ImageDiv (Left)
              ContentDiv (Right) -> This is wrong. We want Content Left.

              So on Desktop we need flex-row-reverse? 
              HTML:
              <ImageDiv />
              <ContentDiv />
              
              lg:flex-row-reverse
              Result: ContentDiv(Left) | ImageDiv(Right)
          */}

                    <div className="w-full lg:w-1/2 relative bg-white flex items-center justify-center p-8 lg:p-12 h-[50vh] lg:h-full lg:order-2">
                        <div className="relative w-full h-full">
                            <Image
                                src={img}
                                alt={title}
                                fill
                                className="object-contain" // removed hover scale for cleanliness
                                priority
                            />
                        </div>
                    </div>

                    {/* Content Section - Second on Mobile, Left on Desktop */}
                    <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-card z-10 lg:order-1">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 flex items-center justify-center">
                                <LogoFrame
                                    src="/images/lowres/logo.png"
                                    alt="Icon Logo"
                                    width={80}
                                    height={80}
                                    wrapperClassName="w-16 h-16 lg:w-20 lg:h-20 p-2"
                                    imgClassName="object-contain"
                                />
                            </div>
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                {title}
                            </h3>
                        </div>

                        <div className="mb-8 flex-grow">
                            <div className="flex items-center justify-start gap-1 mb-6 flex-wrap leading-none">
                                <h4 className="text-sm md:text-base font-bold text-accent uppercase tracking-wider whitespace-nowrap">BENEFITS OF</h4>
                                <div className="relative w-16 h-6">
                                    <LogoFrame
                                        src="/images/lowres/logo.png"
                                        alt="Icon Logo"
                                        fill
                                        wrapperClassName="w-16 h-6 p-0"
                                        imgClassName="object-contain"
                                        sizes="64px"
                                    />
                                </div>
                                <h4 className="text-sm md:text-base font-bold text-accent uppercase tracking-wider whitespace-nowrap">NITROGEN</h4>
                            </div>
                            <ul className="grid grid-cols-2 gap-x-2 gap-y-4">
                                {benefits.map((benefit, idx) => {
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

                        <p className="text-base md:text-lg text-muted mb-8">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-auto">
                            {ctaButtons.map((button, btnIndex) => (
                                <a
                                    key={btnIndex}
                                    href={button.link}
                                    onClick={(e) => e.stopPropagation()}
                                    className={`inline-flex items-center px-6 py-3 text-base font-medium rounded-full transition-all duration-200 ${button.variant === 'primary' // eslint-disable-next-line
                                        ? 'bg-primary text-white hover:opacity-90 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                                        : 'border-2 border-accent text-accent hover:bg-accent hover:text-white shadow-md'
                                        }`}
                                >
                                    {button.text}
                                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section >
    );
}
