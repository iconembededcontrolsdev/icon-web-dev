'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductImages } from '@/utils/productImages';

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
  ctaButtons?: Array<{
    text: string;
    link: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'soft';
  }>;
};

// Product data mapping - in a real app, this would come from an API or database
const productDataMap: Record<string, Partial<ProductData>> = {
  'digital-tyre-inflator': {
    id: 'digital-tyre-inflator',
    title: 'Digital Tyre Inflator',
    description: 'Reliable, durable and accurate electronic digital tyre inflators meeting tyre manufacturer pressure standards.',
    subtitle: 'Reliable, durable and accurate electronic digital tyre inflators meeting tyre manufacturer pressure standards. Used by major tyre and vehicle manufacturers in their production line.',
    fullDescription: 'Our Electronic Digital Tyre Inflator is reliable, durable and accurate, thus meet the requirement of each and every horizon related to vehicle tyre pressure inflation. Our Inflators are used by major tyre manufacturers as well as vehicle manufacturers in their production line up. Our Electronic Digital Tyre Inflator meets the accuracy suggested by tyre manufacturer\'s pressure standards. Our control panel Enclosure meets the Ingress Protection standard IP65.',
    features: [
      'Two digital readouts for set pressure and tyre pressure',
      'LCD display with LED backlight for good visibility',
      'Display remains at same set pressure value even after power on-off cycle',
      'Audible and visual end of cycle signal indicators',
      'Automatic tyre sensing system',
      'IP65 protection standard'
    ],
    applications: [
      'Wheel Alignment Shop',
      'Automotive Garage',
      'Small vehicle Depot',
      'Puncture Shop',
      'Apartments',
      'Commercial Parking Lot'
    ],
  },
  'digital-nitrogen-tyre-inflator': {
    id: 'digital-nitrogen-tyre-inflator',
    title: 'Digital Nitrogen Tyre Inflator',
    description: 'Reliable and accurate electronic digital nitrogen tyre inflators. Nitrogen production based on cost-efficient PSA technology with 95-99% purity suitable for vehicle nitrogen inflation.',
    subtitle: 'Reliable and accurate electronic digital nitrogen tyre inflators. Nitrogen production based on cost-efficient PSA technology with 95-99% purity suitable for vehicle nitrogen inflation.',
    fullDescription: 'We are the leading Manufacturer and supplier for Electronic Digital Nitrogen Tyre Inflator all over India since the year 2007. Our Electronic Digital Nitrogen Tyre Inflator is reliable, durable and accurate, thus meet the requirement of each and every horizon related to vehicle tyre pressure inflation. Nitrogen production is based on reliable and cost efficient PSA technology. Nitrogen Purity may vary from 95-99% suitable for vehicle nitrogen purity suggestions.',
    features: [
      'PSA Technology for nitrogen generation',
      '95-99% purity (adjustable)',
      'Automatic vacuum cum nitrogen inflation',
      'Pressure switch for automatic nitrogen generation cut-off',
      'Tyre counter and error codes available',
      'IP65 protection standard'
    ],
    applications: [
      'Fuel Station',
      'Wheel Alignment Shop',
      'Automotive Garage',
      'Puncture Shop',
      'Commercial Parking Lot'
    ],
  },
  'air-compressor': {
    id: 'air-compressor',
    title: 'Air Compressor',
    description: 'Single and two-stage oil lubricated reciprocating air compressors known for reliability and performance.',
    subtitle: 'Single and two-stage oil lubricated reciprocating air compressors known for reliability and performance. Preferred choice for fuel stations, automotive garages, and industrial applications.',
    fullDescription: 'The ICON EMBEDED CONTROLS single & two stage Oil Lubricated Reciprocating air compressors are known for their reliability and performance, making them the preferred choice for industrial applications.',
    features: [
      'Standard leak proof fittings',
      'Electrical Starter with stop switch latch for safety',
      'Belt/Fan Guard for Safety',
      'Pressure Switch with Differential Pressure Setting',
      'Auto Drain Valve Option available',
      'Safety Pressure Relief Valve'
    ],
    applications: [
      'Fuel Station',
      'Automotive Garages',
      'Textile Industries',
      'Food Processing Industries'
    ],
  },
  'nitrogen-generator': {
    id: 'nitrogen-generator',
    title: 'Nitrogen Generator',
    description: 'Easy to convert ordinary digital tyre inflator to digital nitrogen tyre inflator using this module.',
    subtitle: 'Easy to convert ordinary digital tyre inflator to digital nitrogen tyre inflator using this module. Reliable PSA method for nitrogen generation with 95-99% purity suitable for vehicle nitrogen inflation.',
    fullDescription: 'Easy to convert ordinary digital tyre inflator to digital nitrogen tyre inflator using this module. Reliable PSA method for nitrogen generation with 95-99% purity suitable for vehicle nitrogen inflation. Air and nitrogen input pressure option available in single machine.',
    features: [
      'PSA Technology for nitrogen generation',
      '95-99% purity (adjustable)',
      'Pressure switch for automatic nitrogen generation cut-off',
      'Safety pressure relief valve',
      'Wheel base option available',
      'Computer power chord adapter with fuse protection'
    ],
    applications: [
      'Wheel Alignment Shop',
      'Automotive Garage',
      'Depot',
      'Puncture Shop',
      'Apartments',
      'Commercial Parking Lot'
    ],
  },
  'panel-board': {
    id: 'panel-board',
    title: 'Panel Boards',
    description: 'PLC Control Panels, Automatic Power Factor Control Panels, and Switch Gear Panels.',
    subtitle: 'PLC Control Panels, Automatic Power Factor Control Panels, and Switch Gear Panels. Complete electrical solutions for automation, power factor correction, and industrial control.',
    fullDescription: 'We provide various PLC Control panel with automation solution for Industries. We offer Automatic Power Factor Control Panel for any loads. Power factor is the ratio between the KW and the KVA drawn by an electrical load where the KW is the actual load power and the KVA is the apparent load power.',
    features: [
      'PLC Control Panels with automation solutions',
      'Automatic Power Factor Control Panel',
      'Switch Gear Panels',
      'Custom electrical solutions',
      'RS-232 & RS-485 compatible',
      'Remote Panel operation available'
    ],
    applications: [
      'All Kind of Industries',
      'Hotels',
      'Banks',
      'Fuel Station',
      'Shopping Mall'
    ],
  },
  'garage-equipment': {
    id: 'garage-equipment',
    title: 'Garage Equipment',
    description: 'High quality two wheeler ramps, pneumatic grease pumps, and manual oil dispensers.',
    subtitle: 'High quality two wheeler ramps, pneumatic grease pumps, and manual oil dispensers. Professional tools and equipment for automotive workshops and garages.',
    fullDescription: 'We manufacture High Quality Two Wheeler Ramp suitable for all kind of two wheeler. We also manufacture Pneumatic Grease Pump of capacity 15kg, 25kg and 50kg, and manual 2T oil dispenser.',
    features: [
      'Two Wheeler Ramp with 300kg lifting capacity',
      'Foot operated hydraulic piston',
      'Pneumatic Grease Pump (15kg, 25kg, 50kg)',
      'Manual 2T Oil Dispenser',
      'Textured sheet metal for extra grip',
      'Zero oil spillage design'
    ],
    applications: [
      'Automotive Workshops',
      'Two Wheeler Service Stations',
      'Garages',
      'Depots'
    ],
  },
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get product data from map or try to fetch from API
  const productData = productDataMap[id as string];
  const images = getProductImages(id as string);
  
  // If product not in map, try to fetch from API
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productData) {
      setProduct({
        ...productData,
        images: images,
        description: productData.subtitle || productData.description || '',
      } as ProductData);
      setLoading(false);
      return;
    }

    // Fallback: try to fetch from API
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/content/products/${id}.json`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct({
          ...data,
          images: images.length > 0 ? images : data.images || [],
        });
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Link href="/products" className="text-accent hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const productImages = product.images || images || [];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 hover:text-accent transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Product Detail Content */}
      <div className="max-w-[1920px] mx-auto px-[40px] sm:px-[60px] lg:px-[80px] xl:px-[100px] pb-16">
        {/* Product Info Section */}
        <div className="bg-white rounded-[40px] shadow-lg p-8 sm:p-12 lg:p-16 mb-8">
          {/* Title - Clickable to expand */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-left mb-4 group"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="text-sm">{isExpanded ? 'Hide details' : 'Show details'}</span>
              <svg 
                className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {/* Short Description - Always visible */}
          <p className="text-gray-600 mb-6 text-xl">
            {product.subtitle || product.description}
          </p>

          {/* Expandable Details */}
          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-6 pt-4 border-t border-gray-200">
              {/* Full Description */}
              {product.fullDescription && (
                <div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {product.fullDescription}
                  </p>
                </div>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-700 text-lg">
                        <svg className="w-6 h-6 text-accent mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Specifications</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-600 text-lg">{key}</span>
                        <span className="text-gray-900 font-medium text-lg">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {product.applications && product.applications.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Applications</h3>
                  <ul className="space-y-3">
                    {product.applications.map((app, index) => (
                      <li key={index} className="text-gray-700 flex items-start text-lg">
                        <svg className="w-6 h-6 text-accent mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* User Interface */}
              {product.userInterface && product.userInterface.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">User Interface</h3>
                  <ul className="space-y-3">
                    {product.userInterface.map((item, index) => (
                      <li key={index} className="text-gray-700 flex items-start text-lg">
                        <svg className="w-6 h-6 text-accent mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Safety Features */}
              {product.safetyFeatures && product.safetyFeatures.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Safety Features</h3>
                  <ul className="space-y-3">
                    {product.safetyFeatures.map((feature, index) => (
                      <li key={index} className="text-gray-700 flex items-start text-lg">
                        <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200">
            <Link
              href={`/products/enquiry?product=${encodeURIComponent(product.title)}`}
              className="px-8 py-4 bg-accent text-white font-medium rounded-full hover:bg-accent-hover shadow-sm transition-all duration-200"
            >
              Product Enquiry
            </Link>
            {product.ctaButtons && product.ctaButtons.map((button, index) => (
              <Link
                key={index}
                href={button.link}
                className={`px-8 py-4 font-medium rounded-full transition-all duration-200 ${
                  button.variant === 'outline'
                    ? 'border-2 border-accent text-accent hover:bg-accent/5' 
                    : button.variant === 'secondary'
                    ? 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                    : button.variant === 'soft'
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    : 'bg-accent text-white hover:bg-accent-hover shadow-sm'
                }`}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Product Images Grid - 2 Columns */}
        {productImages.length > 0 && (
          <div className="bg-white rounded-[40px] shadow-lg p-8 sm:p-12 lg:p-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Product Images
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[12px] md:gap-[16px] lg:gap-[20px]">
              {productImages.map((image, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-[30px] overflow-hidden aspect-square"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
