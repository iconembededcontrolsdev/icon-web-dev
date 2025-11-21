'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DynamicGrid from '@/components/DynamicGrid';

type ProductPreview = {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  fullDescription?: string;
  features?: string[];
  image?: string;
  mainImage?: string;
  images?: string[];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch from the consolidated products.json file
        const response = await fetch('/content/products.json');
        
        if (!response.ok) {
          console.error('Failed to fetch products.json');
          setLoading(false);
          return;
        }

        const data = await response.json();
        const productsData = data.products || [];
        
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.subtitle && product.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (product.features && product.features.some(feature => 
      feature.toLowerCase().includes(searchQuery.toLowerCase())
    ))
  );

  // Convert products to GridItem format and group into pairs for 2-column grid
  const convertToGridItems = (products: ProductPreview[]) => {
    return products.map(product => {
      // Use subtitle if available, otherwise use description, with fallback
      const displayDescription = product.subtitle || product.description || product.fullDescription || '';
      
      return {
        title: product.title,
        subtitle: displayDescription,
        description: product.fullDescription || product.description || product.subtitle || '',
        img: product.mainImage || product.images?.[0] || '/images/placeholder.svg',
        ctaButtons: [
          { text: 'Learn more', link: `/products/${product.id}`, variant: 'primary' as const },
          { text: 'Product Enquiry', link: `/products/enquiry?product=${encodeURIComponent(product.title)}`, variant: 'outline' as const }
        ],
        // Store id for navigation
        id: product.id
      } as any;
    });
  };

  // Group products into pairs for 2-column grid
  const groupProductsIntoPairs = (items: any[]) => {
    const pairs: any[][] = [];
    for (let i = 0; i < items.length; i += 2) {
      pairs.push(items.slice(i, i + 2));
    }
    return pairs;
  };

  const gridItems = convertToGridItems(filteredProducts);
  const productPairs = groupProductsIntoPairs(gridItems);

  const handleProductClick = (item: any) => {
    // Get product ID from item (stored in the converted grid item)
    const productId = item.id || item.title.toLowerCase().replace(/\s+/g, '-');
    router.push(`/products/${productId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pt-20">
      {/* Header */}
      <div className="w-full max-w-[1920px] mx-auto px-[40px] sm:px-[60px] lg:px-[80px] xl:px-[100px] py-[40px] sm:py-[50px] lg:py-[60px]">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Our Products
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto">
            High-quality equipment and solutions for all your industrial needs
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-muted" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Products Grid - Using DynamicGrid component */}
      {filteredProducts.length > 0 ? (
        <DynamicGrid
          items={gridItems}
          onItemClick={handleProductClick}
        />
      ) : (
        <div className="w-full max-w-[1920px] mx-auto px-[40px] sm:px-[60px] lg:px-[80px] xl:px-[100px] pb-16">
          <div className="text-center py-12 bg-white rounded-[40px] shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-gray-500">
              We couldn't find any products matching your search.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                Clear search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
