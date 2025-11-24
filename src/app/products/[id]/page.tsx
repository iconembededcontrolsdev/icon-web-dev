'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProductImages } from '@/utils/productImages';

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
    <div className="border border-primary rounded-[30px] overflow-hidden mb-4 bg-white">
      <button
        className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
          isOpen ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-gray-50'
        }`}
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-6 h-6 rounded-full border ${isOpen ? 'border-white' : 'border-primary'}`}>
            <span className="text-lg leading-none mb-0.5">{isOpen ? '−' : '+'}</span>
          </div>
          <span className="font-medium text-lg">{title}</span>
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
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 bg-white text-foreground border-t border-gray-100">
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
  const modelParam = searchParams.get('model');
  
  const images = getProductImages(id as string);
  
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeModel, setActiveModel] = useState<ProductModel | null>(null);
  const [openSection, setOpenSection] = useState<string>('applications');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/content/products.json');
        if (!response.ok) throw new Error('Products file not found');
        
        const data = await response.json();
        const products = data.products || [];
        const foundProduct = products.find((p: ProductData) => p.id === id);
        
        if (!foundProduct) throw new Error('Product not found');
        
        const productData = {
          ...foundProduct,
          images: images.length > 0 ? images : foundProduct.images || [],
        };
        
        setProduct(productData);

        // Set active model based on URL param or default to first model
        if (productData.models && productData.models.length > 0) {
          const model = modelParam 
            ? productData.models.find((m: ProductModel) => m.model === modelParam)
            : productData.models[0];
          setActiveModel(model || productData.models[0]);
        }
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, modelParam]);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? '' : section);
  };

  const handleModelChange = (modelName: string) => {
    router.push(`/products/${id}?model=${encodeURIComponent(modelName)}`);
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
          <h2 className="text-2xl font-bold text-primary mb-4">Product not found</h2>
          <Link href="/products" className="text-primary hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Use active model data or fallback to product data
  const currentData = activeModel || product;
  const features = activeModel?.features || product.features || [];
  const applications = activeModel?.applications || product.applications || [];
  const specifications = activeModel?.specifications || product.specifications || {};
  const currentImage = activeModel?.images?.[0] || activeModel?.image || product.images?.[0] || '/images/placeholder.svg';

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            {product.title}
          </h1>
          {activeModel && (
            <>
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
                  {activeModel.model}
                </h2>
                
                {/* Model Selector if multiple models exist */}
                {product.models && product.models.length > 1 && (
                  <div className="relative inline-block">
                    <select 
                      value={activeModel.model}
                      onChange={(e) => handleModelChange(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-primary cursor-pointer text-sm"
                    >
                      {product.models.map((m) => (
                        <option key={m.model} value={m.model}>
                          {m.model}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                )}
              </div>
              
              {activeModel.type && (
                <p className="text-lg text-gray-600 mb-4">{activeModel.type}</p>
              )}
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Accordions */}
          <div className="space-y-4">
            <AccordionItem 
              title="Key Features" 
              isOpen={openSection === 'features'} 
              onClick={() => toggleSection('features')}
            >
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </AccordionItem>

            <AccordionItem 
              title="Applications" 
              isOpen={openSection === 'applications'} 
              onClick={() => toggleSection('applications')}
            >
              <ul className="space-y-3">
                {applications.map((app, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {app}
                  </li>
                ))}
              </ul>
            </AccordionItem>

            <AccordionItem 
              title="Technical Specifications" 
              isOpen={openSection === 'specifications'} 
              onClick={() => toggleSection('specifications')}
            >
              <div className="space-y-2">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b border-gray-100 last:border-0">
                    <span className="font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-gray-800">{String(value)}</span>
                  </div>
                ))}
              </div>
            </AccordionItem>

            {/* Enquiry Button */}
            <div className="mt-8">
              <Link
                href={`/products/enquiry?product=${encodeURIComponent(activeModel?.model || product.title)}`}
                className="block w-full py-4 px-6 text-center border-2 border-gray-300 rounded-full text-gray-600 font-medium hover:border-primary hover:text-primary transition-colors bg-white"
              >
                Product Enquiry
              </Link>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="bg-white rounded-[40px] p-8 shadow-sm min-h-[500px] flex items-center justify-center relative">
            <div className="relative w-full h-full min-h-[400px]">
              <Image
                src={currentImage}
                alt={activeModel?.model || product.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
