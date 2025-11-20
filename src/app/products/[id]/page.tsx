'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductImages } from '@/utils/productImages';

type ProductModel = {
  model: string;
  type?: string;
  description?: string;
  image?: string;
  specifications?: Record<string, any>;
  features?: string[];
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
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const images = getProductImages(id as string);
  
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ProductModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (model: ProductModel) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedModel(null), 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Product not found</h2>
          <Link href="/products" className="text-accent hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const productModels = product.models || [];

  return (
    <div className="min-h-screen bg-bg pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link 
          href="/products" 
          className="inline-flex items-center text-primary hover:text-accent transition-colors font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>
      </div>

      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            {product.title}
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto">
            {product.description || product.subtitle}
          </p>
        </div>

        {/* Product Models Grid */}
        {productModels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productModels.map((model, index) => (
              <div
                key={index}
                onClick={() => openModal(model)}
                className="group relative bg-card rounded-[30px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                  <Image
                    src={model.image || product.images?.[0] || '/images/placeholder.svg'}
                    alt={model.model}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay with Model Number */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                    <div className="text-center bg-primary/80 backdrop-blur-sm rounded-2xl px-6 py-4">
                      <p className="text-white text-lg font-semibold mb-1">Model</p>
                      <p className="text-accent text-2xl font-bold">{model.model}</p>
                    </div>
                  </div>
                </div>

                {/* Model Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-2">{model.model}</h3>
                  {model.type && (
                    <p className="text-sm text-muted mb-2">{model.type}</p>
                  )}
                  {model.description && (
                    <p className="text-sm text-muted line-clamp-2">{model.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted text-lg">No models available for this product.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedModel && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-card rounded-[40px] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-card/80 backdrop-blur-md border-b border-gray-200 px-8 py-6 flex justify-between items-center rounded-t-[40px] z-10">
              <div>
                <h2 className="text-3xl font-bold text-primary">{selectedModel.model}</h2>
                {selectedModel.type && (
                  <p className="text-muted mt-1">{selectedModel.type}</p>
                )}
              </div>
              <button
                onClick={closeModal}
                className="text-muted hover:text-primary transition-colors p-2"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              {/* Image */}
              {(selectedModel.image || product.images?.[0]) && (
                <div className="relative aspect-video w-full rounded-[20px] overflow-hidden bg-gray-100">
                  <Image
                    src={selectedModel.image || product.images?.[0] || '/images/placeholder.svg'}
                    alt={selectedModel.model}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              {/* Description */}
              {selectedModel.description && (
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">Description</h3>
                  <p className="text-muted text-lg leading-relaxed">{selectedModel.description}</p>
                </div>
              )}

              {/* Features */}
              {(selectedModel.features || product.features) && (
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {(selectedModel.features || product.features)?.map((feature, index) => (
                      <li key={index} className="flex items-start text-muted text-lg">
                        <svg className="w-6 h-6 text-accent mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {(selectedModel.specifications || product.specifications) && (
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">Specifications</h3>
                  <div className="bg-bg rounded-[20px] p-6 space-y-4">
                    {Object.entries(selectedModel.specifications || product.specifications || {}).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center border-b border-gray-200 pb-3 last:border-0">
                        <span className="text-muted font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                        <span className="text-primary font-semibold">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {product.applications && (
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">Applications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.applications.map((app, index) => (
                      <div key={index} className="bg-bg rounded-lg p-4 text-center">
                        <p className="text-muted font-medium">{app}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-4">
                <Link
                  href={`/products/enquiry?product=${encodeURIComponent(selectedModel.model)}`}
                  className="flex-1 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors text-center shadow-md"
                >
                  Enquire Now
                </Link>
                <button
                  onClick={closeModal}
                  className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
