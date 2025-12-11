'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductImages } from '@/utils/productImages';
import ProductBenefits, {
  MileageIcon,
  TyreHeatIcon,
  MaintenanceIcon,
  TyreLifeIcon,
  CleanIcon,
  TyrePressureIcon
} from '@/components/ProductBenefits';

type ProductModel = {
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

type ProductData = {
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

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const images = getProductImages(id as string);

  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, string>>({});
  const [imageIndex, setImageIndex] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/content/products.json");
        if (!response.ok) throw new Error("Products file not found");

        const data = await response.json();
        const products = data.products || [];
        const foundProduct = products.find((p: ProductData) => p.id === id);

        if (!foundProduct) throw new Error("Product not found");

        const productData = {
          ...foundProduct,
          images: images.length > 0 ? images : foundProduct.images || [],
        };

        setProduct(productData);
      } catch (err) {
        setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const toggleSection = (modelIndex: number, section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [modelIndex]: prev[modelIndex] === section ? "" : section,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Product not found
          </h2>
          <Link href="/products" className="text-primary hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const models =
    product.models && product.models.length > 0
      ? product.models
      : [
          {
            model: product.title,
            type: "",
            description: product.description,
            fullDescription: product.fullDescription,
            features: product.features,
            specifications: product.specifications,
            applications: product.applications,
            images: product.images,
          },
        ];

  const brochureLink = product.brochure || brochureMap[id as string];

  // Nitrogen benefits configuration
  const nitrogenBenefits = [
    { icon: <MileageIcon />, title: "More Mileage" },
    { icon: <TyreHeatIcon />, title: "Prevents Tyre Over Heat" },
    { icon: <MaintenanceIcon />, title: "Maintenance Repair" },
    { icon: <TyreLifeIcon />, title: "Increased Tyre Life" },
    { icon: <CleanIcon />, title: "100 % Dry and Clean" },
    { icon: <TyrePressureIcon />, title: "Consistent Tyre Pressure" },
  ];

  const isNitrogenProduct =
    id === "digital-nitrogen-tyre-inflator" || id === "nitrogen-generator";

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-background">
      {models.map((model, index) => {
        const modelImages =
          model.images && model.images.length > 0
            ? model.images
            : model.image
              ? [model.image]
              : product.images || ["/images/placeholder.svg"];
        const currentImageIdx = imageIndex[index] ?? 0;
        const currentImage = modelImages[currentImageIdx];
        const features = model.features || product.features || [];
        const applications = model.applications || product.applications || [];
        const specifications =
          model.specifications || product.specifications || {};

        const handleNextImage = () => {
          setImageIndex((prev) => ({
            ...prev,
            [index]: (prev[index] ?? 0 + 1) % modelImages.length,
          }));
        };

        const handlePrevImage = () => {
          setImageIndex((prev) => ({
            ...prev,
            [index]:
              (prev[index] ?? 0 - 1 + modelImages.length) % modelImages.length,
          }));
        };

        return (
          <section
            key={index}
            className="h-screen w-full snap-start flex flex-col pt-12 overflow-hidden relative"
          >
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col lg:flex-row gap-8 lg:gap-12 py-4 lg:py-8">
              {/* Left Column: Image Carousel */}
              <div className="w-full lg:w-1/2 h-[40vh] lg:h-full flex items-center justify-center relative">
                <div className="relative w-full h-full max-h-[600px] lg:max-h-none bg-white rounded-[40px] p-8 shadow-sm flex items-center justify-center">
                  <Image
                    src={currentImage}
                    alt={`${model.model || product.title} - Image ${currentImageIdx + 1}`}
                    fill
                    className="object-contain p-4"
                    priority={index === 0}
                  />

                  {/* Image Navigation */}
                  {modelImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-white p-2 rounded-full transition-colors z-10"
                        aria-label="Previous image"
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
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={handleNextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-white p-2 rounded-full transition-colors z-10"
                        aria-label="Next image"
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>

                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {currentImageIdx + 1} / {modelImages.length}
                      </div>

                      {/* Image Indicators */}
                      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
                        {modelImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              setImageIndex((prev) => ({
                                ...prev,
                                [index]: idx,
                              }))
                            }
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentImageIdx
                                ? "bg-primary w-6"
                                : "bg-primary/40 hover:bg-primary/60"
                            }`}
                            aria-label={`Go to image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
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
                      product.fullDescription}
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
                        onClick={() => toggleSection(index, "specifications")}
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
                      href={`/products/enquiry?product=${encodeURIComponent(model.model || product.title)}`}
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

            {/* Scroll Indicator (only show if not last item) */}
            {index < models.length - 1 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-primary/50 hidden lg:block">
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
  );
}
