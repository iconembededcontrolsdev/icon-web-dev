'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface ProductDetail {
  title: string;
  subtitle: string;
  images: string[];
  shortDescription: string;
  fullDescription?: string;
  features?: string[];
  specifications?: Record<string, any>;
  applications?: string[];
  ctaButtons?: Array<{
    text: string;
    link: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'soft';
  }>;
}

interface ProductDetailModalProps {
  product: ProductDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      setCurrentImageIndex(0);
      setIsExpanded(false);
    }
  }, [isOpen, product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full h-full max-w-7xl mx-auto bg-gray-900 rounded-[40px] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Side - Image Carousel */}
          <div className="flex-1 relative bg-black flex items-center justify-center p-8 lg:p-12">
            {product.images.length > 0 && (
              <>
                {/* Main Image */}
                <div className="relative w-full h-full max-w-4xl mx-auto">
                  <div className="relative aspect-square w-full rounded-[30px] overflow-hidden bg-gray-800">
                    <Image
                      src={product.images[currentImageIndex]}
                      alt={`${product.title} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-contain transition-opacity duration-300"
                      priority
                      sizes="(max-width: 1024px) 100vw, 80vw"
                    />
                  </div>

                  {/* Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                      >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image Indicators */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {product.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'w-8 bg-white'
                              : 'w-2 bg-white/40 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Image Counter */}
                  {product.images.length > 1 && (
                    <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
                      {currentImageIndex + 1} / {product.images.length}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right Side - Product Info */}
          <div className="lg:w-[500px] bg-gray-800 border-l border-gray-700 overflow-y-auto">
            <div className="p-8 lg:p-12">
              {/* Title - Clickable to expand */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-left mb-4 group"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                  {product.title}
                </h2>
                <div className="flex items-center gap-2 text-gray-400">
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
              <p className="text-gray-300 mb-6 text-lg">
                {product.subtitle}
              </p>

              {/* Expandable Details */}
              <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-6 pt-4 border-t border-gray-700">
                  {/* Full Description */}
                  {product.fullDescription && (
                    <div>
                      <p className="text-gray-300 leading-relaxed">
                        {product.fullDescription}
                      </p>
                    </div>
                  )}

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      <h3 className="text-xl font-semibold text-white mb-3">Specifications</h3>
                      <div className="space-y-2">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b border-gray-700">
                            <span className="text-gray-400">{key}</span>
                            <span className="text-white">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Applications */}
                  {product.applications && product.applications.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">Applications</h3>
                      <ul className="space-y-2">
                        {product.applications.map((app, index) => (
                          <li key={index} className="text-gray-300 flex items-start">
                            <svg className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span>{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Buttons */}
              {product.ctaButtons && product.ctaButtons.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-700">
                  {product.ctaButtons.map((button, index) => (
                    <Link
                      key={index}
                      href={button.link}
                      className={`px-6 py-3 text-sm font-medium rounded-full transition-all duration-200 ${
                        button.variant === 'outline'
                          ? 'border-2 border-white/30 text-white hover:bg-white/10' 
                          : button.variant === 'secondary'
                          ? 'border-2 border-gray-500 text-gray-300 hover:bg-gray-700'
                          : button.variant === 'soft'
                          ? 'bg-gray-700 text-white hover:bg-gray-600'
                          : 'bg-accent text-white hover:bg-accent-hover shadow-sm'
                      }`}
                    >
                      {button.text}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

