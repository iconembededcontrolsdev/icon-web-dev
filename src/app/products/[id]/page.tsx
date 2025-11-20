'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductImages } from '@/utils/productImages';
import DynamicGrid from '@/components/DynamicGrid';

type ProductData = {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  fullDescription?: string;
  modelName?: string;
  features?: string[];
  specifications?: Record<string, any>;
  applications?: string[];
  safetyFeatures?: string[];
  userInterface?: string[];
  images?: string[];
  types?: Array<{
    type: string;
    description?: string;
    features?: string[];
  }>;
  models?: Array<{
    model: string;
    type: string;
    description?: string;
  }>;
  ctaButtons?: Array<{
    text: string;
    link: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'soft';
  }>;
};


export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const images = getProductImages(id as string);
  
  // Fetch product from JSON file
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
          description: data.subtitle || data.description || '',
        } as ProductData);
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
                  <div className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => {
                      // Handle nested objects
                      if (value && typeof value === 'object' && !Array.isArray(value)) {
                        return (
                          <div key={key} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="text-xl font-semibold text-gray-900 mb-3 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <div className="space-y-2">
                              {Object.entries(value).map(([subKey, subValue]) => {
                                if (Array.isArray(subValue)) {
                                  return (
                                    <div key={subKey} className="mb-2">
                                      <span className="font-medium text-gray-700 capitalize">
                                        {subKey.replace(/([A-Z])/g, ' $1').trim()}: 
                                      </span>
                                      <ul className="mt-1 ml-4 list-disc space-y-1">
                                        {subValue.map((item: any, idx: number) => (
                                          <li key={idx} className="text-gray-600">{String(item)}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  );
                                } else if (subValue && typeof subValue === 'object') {
                                  return (
                                    <div key={subKey} className="ml-4 border-l-2 border-gray-200 pl-3">
                                      <span className="font-medium text-gray-700 capitalize">
                                        {subKey.replace(/([A-Z])/g, ' $1').trim()}: 
                                      </span>
                                      <div className="mt-1 space-y-1">
                                        {Object.entries(subValue).map(([nestedKey, nestedValue]) => (
                                          <div key={nestedKey} className="text-gray-600">
                                            <span className="font-medium capitalize">
                                              {nestedKey.replace(/([A-Z])/g, ' $1').trim()}: 
                                            </span>
                                            <span className="ml-2">{String(nestedValue)}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  );
                                }
                                return (
                                  <div key={subKey} className="flex justify-between py-1">
                                    <span className="text-gray-600 capitalize">
                                      {subKey.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                    <span className="text-gray-900 font-medium">{String(subValue)}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                      // Handle simple key-value pairs
                      return (
                        <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                          <span className="text-gray-600 text-lg capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-gray-900 font-medium text-lg">{String(value)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}


              {/* Types (for products like Panel Board) */}
              {product.types && Array.isArray(product.types) && product.types.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Product Types</h3>
                  <div className="space-y-6">
                    {product.types.map((type, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">{type.type}</h4>
                        {type.description && (
                          <p className="text-gray-700 mb-3">{type.description}</p>
                        )}
                        {type.features && Array.isArray(type.features) && type.features.length > 0 && (
                          <ul className="space-y-2">
                            {type.features.map((feature: string, featIndex: number) => (
                              <li key={featIndex} className="flex items-start text-gray-700">
                                <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
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

        {/* Product Images/Models as Grid2 Components */}
        {productImages.length > 0 && (() => {
          // Map images to models if available, otherwise use images with product descriptions
          const imageModelPairs: Array<{ img: string; title: string; subtitle: string }> = [];
          
          if (product.models && product.models.length > 0 && product.models.length === productImages.length) {
            // If we have matching number of models and images, pair them
            productImages.forEach((image, index) => {
              const model = product.models![index];
              imageModelPairs.push({
                img: image,
                title: model.model,
                subtitle: `${model.type ? model.type + ' - ' : ''}${model.description || ''}`
              });
            });
          } else if (productImages.length === 1) {
            // For single image products (variants), use the product's own title and description
            imageModelPairs.push({
              img: productImages[0],
              title: product.title,
              subtitle: product.subtitle || product.description || ''
            });
          } else {
            // Otherwise, use images with product title and generic descriptions
            productImages.forEach((image, index) => {
              imageModelPairs.push({
                img: image,
                title: product.modelName ? `${product.modelName} - Image ${index + 1}` : `${product.title} - Image ${index + 1}`,
                subtitle: product.subtitle || product.description || `Product image ${index + 1} of ${productImages.length}`
              });
            });
          }


          return (
            <DynamicGrid
              items={imageModelPairs.map(item => ({
                title: item.title,
                subtitle: item.subtitle,
                img: item.img
              }))}
            />
          );
        })()}
      </div>
    </div>
  );
}
