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
        let productIds: string[] = [];

        // First, try to get the list of all product IDs from the API
        try {
          const productsResponse = await fetch('/api/products');
          if (productsResponse.ok) {
            const data = await productsResponse.json();
            productIds = data.products || [];
          }
        } catch (apiError) {
          console.warn('API route failed, trying index.json fallback:', apiError);
        }

        // Fallback: if API failed or returned no products, try index.json
        if (!productIds || productIds.length === 0) {
          try {
            const indexResponse = await fetch('/content/products/index.json');
            if (indexResponse.ok) {
              const indexData = await indexResponse.json();
              productIds = indexData.products || [];
            }
          } catch (indexError) {
            console.error('Failed to fetch index.json:', indexError);
          }
        }

        if (!productIds || productIds.length === 0) {
          console.warn('No products found');
          setLoading(false);
          return;
        }

        // Then fetch each product's JSON file
        const productPromises = productIds.map((id: string) => 
          fetch(`/content/products/${id}.json`)
            .then(res => {
              if (!res.ok) {
                console.warn(`Failed to fetch product ${id}`);
                return null;
              }
              return res.json();
            })
            .catch(error => {
              console.error(`Error fetching product ${id}:`, error);
              return null;
            })
        );

        const productData = await Promise.all(productPromises);
        // Filter out any null values (failed fetches)
        const validProducts = productData.filter(product => product !== null);
        setProducts(validProducts);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="w-full max-w-[1920px] mx-auto px-[40px] sm:px-[60px] lg:px-[80px] xl:px-[100px] py-[40px] sm:py-[50px] lg:py-[60px]">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            High-quality equipment and solutions for all your industrial needs
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border-2 border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
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
