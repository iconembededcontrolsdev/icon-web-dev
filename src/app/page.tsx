'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import DynamicGrid from '@/components/DynamicGrid';
import NitrogenShowcase from '@/components/NitrogenShowcase';
import Link from 'next/link';
import LogoFrame from '@/components/LogoFrame';
import { useRouter } from 'next/navigation';
import StructuredData from '@/components/StructuredData';
import { generateOrganizationSchema, organizationData } from '@/utils/seo';
import bannerImage from '../../public/images/highres/extras/banner-front.jpg';
import LandingCertificationStrip from '@/components/LandingCertificationStrip';
import ClientLogos from '@/components/ClientLogos';
import Footer from '@/components/Footer';

interface Block {
  type: 'hero' | 'grid-2' | 'grid-3' | 'hero-product' | 'nitrogen-showcase';
  items?: any[];
  product?: any;
  [key: string]: any;
}

export default function Home() {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [blocks, setBlocks] = useState<Block[]>([
    {
      type: 'hero',
      title: 'Icon Embeded Controls',
      subtitle: 'Industrial Equipment & Digital Tyre Inflators',
      img: bannerImage,
      variant: 'landing',
    },
    {
      type: 'nitrogen-showcase'
    },
    {
      type: 'grid-3',
      items: []
    }
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/content/products.json');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        const products = data.products || [];
        setAllProducts(products);

        // Identify the Nitrogen product for the showcase
        const nitrogenProduct = products.find((p: any) => p.id === 'digital-nitrogen-tyre-inflator');

        // Filter out the nitrogen product from the grid if it's shown in the showcase
        const gridProducts = products.filter((p: any) => p.id !== 'digital-nitrogen-tyre-inflator');

        const gridItems = gridProducts.map((p: any) => ({
          id: p.id,
          title: p.title,
          subtitle: p.subtitle || p.description,
          description: p.fullDescription || p.description,
          img: p.mainImage || p.images?.[0] || '/images/placeholder.svg',
          ctaButtons: [
            { text: 'Learn More', link: `/products/${p.id}`, variant: 'primary' },
            { text: 'Product Enquiry', link: `/products/enquiry?product=${encodeURIComponent(p.title)}`, variant: 'outline' }
          ]
        }));

        setBlocks([
          {
            type: 'hero',
            title: 'Icon Embeded Controls',
            subtitle: 'Industrial Equipment & Digital Tyre Inflators',
            img: bannerImage,
            variant: 'landing',
          },
          {
            type: 'nitrogen-showcase',
            product: nitrogenProduct
          },
          {
            type: 'grid-3',
            items: gridItems
          }
        ]);

      } catch (error) {
        // Silently fail if products can't be fetched
      }
    };

    fetchProducts();
  }, []);

  const navigateToProduct = (product: any) => {
    const productId = product.id || product.title.toLowerCase().replace(/\s+/g, '-');
    router.push(`/products/${productId}`);
  };

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'hero':
        return <Hero
          key={index}
          title={block.title}
          subtitle={block.subtitle}
          img={block.img}
          ctaButtons={block.ctaButtons}
          variant={block.variant}
        />;
      case 'hero-product':
        return (
          <div
            key={index}
            onClick={() => navigateToProduct(block)}
            className="cursor-pointer"
          >
            <Hero
              title={block.title}
              subtitle={block.subtitle}
              img={block.img}
              ctaButtons={block.ctaButtons}
            />
          </div>
        );
      case 'grid-2':
      case 'grid-3':
        if (!block.items || block.items.length === 0) return null;
        return <DynamicGrid
          key={index}
          title={block.title}
          subtitle={block.subtitle}
          items={block.items}
          onItemClick={(item) => navigateToProduct(item)}
        />;
      case 'nitrogen-showcase':
        return <NitrogenShowcase key={index} product={block.product} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Structured Data */}
      <StructuredData data={generateOrganizationSchema(organizationData)} />

      {/* Main Content */}
      <main className={`bg-background transition-all duration-300 ${isScrolled ? "pt-12" : "pt-[84px]"}`}>
        {/* Hero Section */}
        {renderBlock(blocks[0], 0)}

        <LandingCertificationStrip />

        {/* Client Logos Section */}
        <section className="w-full bg-white dark:bg-slate-100 border-y border-slate-200">
          <ClientLogos />
        </section>

        {/* Remaining Blocks */}
        <div className="mt-1">
          {blocks.slice(1).map((block, index) => (
            <div key={index + 1} className="mt-0">
              {renderBlock(block, index + 1)}
            </div>
          ))}
        </div>



        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
