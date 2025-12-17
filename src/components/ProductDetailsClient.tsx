'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductImages } from '@/utils/productImages';
import ZoomableImage from './ZoomableImage';

export type ProductModel = {
  model: string;
  type?: string;
  description?: string;
  subtitle?: string;
  fullDescription?: string;
  image?: string;
  images?: string[];
  specifications?: Record<string, any>;
  features?: string[];
  applications?: string[];
};

export type ProductData = {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  fullDescription?: string;
  features?: string[];
  specifications?: Record<string, any>;
  applications?: string[];
  safetyFeatures?: string[];
  userInterface?: string[];
  images?: string[];
  models?: ProductModel[];
  brochure?: string;
};

const brochureMap: Record<string, string> = {
  'digital-tyre-inflator': '/brochures/1. Digital Tyre Inflator/Digital Tyre Inflator.pdf',
  'digital-nitrogen-tyre-inflator': '/brochures/2. Digital Nitrogen Tyre Inflator/Digital Nitrogen Tyre Inflator.pdf',
  'air-compressor': '/brochures/3. Air Compressor/Reciprocating Air Compressor.pdf',
  'garage-equipment': '/brochures/6. Garage Equipment/Hydraulic Two Wheeler Ramp.pdf',
  'digital-def-adblue-dispenser': '/brochures/9. Digital DEF/Digital DEF- AdBlue Despenser.pdf',
  'digital-engine-oil-dispenser': '/brochures/10. Digital Engine Oil Dispenser/Digital Engine Oil Dispenser.pdf',
  'engine-oil-changer': '/brochures/11. Engine Oil Changer/Engine Oil Changer.pdf',
  'digital-tyre-inflator-pedestal': '/brochures/1. Digital Tyre Inflator/Digital Tyre Inflator.pdf',
};

const AccordionItem = ({
  title,
  isOpen,
  onClick,
  children
}: {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="border border-border rounded-[20px] overflow-hidden mb-4 bg-card shadow-lg">
      <button
        className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-transparent text-primary hover:bg-primary/5'
          }`}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-7 h-7 rounded-full border-2 transition-colors ${isOpen ? 'border-white bg-white/10' : 'border-primary bg-primary/5'
            }`}>
            <span className="text-lg leading-none font-bold" style={{ marginTop: '-2px' }}>{isOpen ? '-' : '+'}</span>
          </div>
          <span className="font-semibold text-base">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="p-6 text-foreground border-t border-border bg-card/50">
          {children}
        </div>
      </div>
    </div>
  );
};

interface ProductDetailsClientProps {
  initialProduct: ProductData | null;
}

export default function ProductDetailsClient({ initialProduct }: ProductDetailsClientProps) {
  const { id } = useParams<{ id: string }>();

  // Use initial product from props directly to avoid state sync issues
  const product = initialProduct;

  // State for gallery images: map of model index -> active image URL
  const [activeImages, setActiveImages] = useState<Record<number, string>>({});
  const [openSections, setOpenSections] = useState<Record<string, string>>({});

  const toggleSection = (modelIndex: number, section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [modelIndex]: prev[modelIndex] === section ? '' : section
    }));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Product not found</h2>
          <Link href="/products" className="text-primary hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Enrich images
  const images = getProductImages(product.id);
  const enrichedProduct = {
    ...product,
    images: (images && images.length > 0) ? images : (product.images || [])
  };

  const models = enrichedProduct.models && enrichedProduct.models.length > 0 ? enrichedProduct.models : [{
    model: enrichedProduct.title,
    type: '',
    description: enrichedProduct.description,
    fullDescription: enrichedProduct.fullDescription,
    features: enrichedProduct.features,
    specifications: enrichedProduct.specifications,
    applications: enrichedProduct.applications,
    images: enrichedProduct.images
  }];

  const brochureLink = enrichedProduct.brochure || brochureMap[id as string];

  return (
    <div className="pt-12 min-h-screen bg-background">
      {/* Page Header Removed */}

      {/* Models Gallery */}
      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-background">
        {models.map((model, index) => {
          // Determine the list of images for this model
          // Priority:
          // 1. model.images (if declared in JSON model)
          // 2. enrichedProduct.images (if declared in JSON product or from image utils)
          // 3. Fallback to single image logic
          const modelImages =
            model.images && model.images.length > 0
              ? model.images
              : enrichedProduct.images && enrichedProduct.images.length > 0
                ? enrichedProduct.images
                : model.image
                  ? [model.image]
                  : ["/images/placeholder.svg"];

          // If images are missing entirely, ensure at least one placeholder
          const displayImages =
            modelImages.length > 0
              ? modelImages
              : ["/images/placeholder.svg"];

          // Determine active image: state specific to this model index OR default to the first available image
          const activeImage = activeImages[index] || displayImages[0];

          const features = model.features || enrichedProduct.features || [];
          const applications =
            model.applications || enrichedProduct.applications || [];
          const specifications =
            model.specifications || enrichedProduct.specifications || {};

          return (
            <section
              key={index}
              className="h-screen w-full snap-start flex flex-col pt-12 overflow-hidden relative"
            >
              <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row gap-8 lg:gap-12 py-4 lg:py-8">
                {/* Left Column: Image Gallery */}
                {/* Left Column: Image Gallery */}
                <div className="w-full lg:w-1/2 h-[50vh] lg:h-[70vh] flex items-center justify-center p-4">
                  <div className="w-full max-w-2xl h-full flex flex-row gap-4">
                    {/* Main Image Area */}
                    <div className="relative flex-1 bg-white border border-gray-300 shadow-sm flex items-center justify-center overflow-hidden">
                      <ZoomableImage
                        src={activeImage}
                        alt={model.model || enrichedProduct.title}
                        priority={index === 0}
                        className="p-4"
                      />
                    </div>

                    {/* Thumbnails Sidebar */}
                    {displayImages.length > 1 && (
                      <div className="w-20 lg:w-24 flex flex-col gap-3 h-full overflow-y-auto pr-1 scrollbar-hide pb-2">
                        {displayImages.map((img, imgIdx) => (
                          <button
                            key={imgIdx}
                            onClick={() =>
                              setActiveImages((prev) => ({
                                ...prev,
                                [index]: img,
                              }))
                            }
                            className={`relative w-full aspect-square bg-white border transition-all flex-shrink-0 ${activeImage === img
                              ? "border-primary ring-1 ring-primary"
                              : "border-gray-200 hover:border-gray-400"
                              }`}
                          >
                            <Image
                              src={img}
                              alt={`${model.model || enrichedProduct.title
                                } view ${imgIdx + 1}`}
                              fill
                              className="object-contain p-1"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="w-full lg:w-1/2 h-full overflow-y-auto pr-2 custom-scrollbar pb-20">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        {model.model}
                      </h2>
                      {model.type && (
                        <p className="text-base md:text-lg text-accent font-medium">
                          {model.type}
                        </p>
                      )}
                    </div>

                    <p className="text-foreground/90 text-sm md:text-base leading-relaxed">
                      {model.fullDescription ||
                        model.description ||
                        enrichedProduct.fullDescription}
                    </p>

                    <div className="space-y-4">
                      {features.length > 0 && (
                        <AccordionItem
                          title="Key Features"
                          isOpen={openSections[index] === "features"}
                          onClick={() => toggleSection(index, "features")}
                        >
                          <ul className="space-y-3">
                            {features.map((feature, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="mr-3 text-accent font-bold text-lg">
                                  •
                                </span>
                                <span className="text-sm text-foreground/90">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </AccordionItem>
                      )}

                      {applications.length > 0 && (
                        <AccordionItem
                          title="Applications"
                          isOpen={openSections[index] === "applications"}
                          onClick={() => toggleSection(index, "applications")}
                        >
                          <ul className="space-y-3">
                            {applications.map((app, idx) => (
                              <li
                                key={idx}
                                className="flex items-center text-sm text-foreground/90"
                              >
                                <svg
                                  className="w-4 h-4 mr-3 text-accent"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                                {app}
                              </li>
                            ))}
                          </ul>
                        </AccordionItem>
                      )}

                      {Object.keys(specifications).length > 0 && (
                        <AccordionItem
                          title="Technical Specifications"
                          isOpen={openSections[index] === "specifications"}
                          onClick={() =>
                            toggleSection(index, "specifications")
                          }
                        >
                          <div className="space-y-2">
                            {Object.entries(specifications).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  className="grid grid-cols-2 gap-4 py-3 border-b border-border/30 last:border-0"
                                >
                                  <span className="font-semibold text-sm text-muted capitalize">
                                    {key.replace(/([A-Z])/g, " $1").trim()}
                                  </span>
                                  <span className="text-sm text-foreground">
                                    {String(value)}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </AccordionItem>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Link
                        href={`/products/enquiry?product=${encodeURIComponent(model.model || enrichedProduct.title)}`}
                        className="flex-1 py-3 px-6 text-center bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Product Enquiry
                      </Link>

                      {brochureLink && (
                        <a
                          href={brochureLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-3 px-6 text-center border-2 border-primary text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          Download Brochure
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll Indicator (Up) - Show if not first item */}
              {index > 0 && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -ml-2.5 lg:ml-0 z-10 animate-bounce text-primary/50">
                  <svg
                    className="w-8 h-8 rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7-7-7m14-8l-7 7-7-7"
                    />
                  </svg>
                </div>
              )}

              {/* Scroll Indicator (Down) - Show if not last item */}
              {index < models.length - 1 && (
                <div className="absolute bottom-20 lg:bottom-8 left-1/2 transform -translate-x-1/2 -ml-2.5 lg:ml-0 animate-bounce text-primary/50">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7-7-7m14-8l-7 7-7-7"
                    />
                  </svg>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
