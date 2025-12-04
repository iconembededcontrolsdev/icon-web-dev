'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import DynamicGrid from '@/components/DynamicGrid';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Block {
  type: 'hero' | 'grid-2' | 'grid-3' | 'hero-product';
  [key: string]: any;
}

const showcaseData: Block[] = [
  // Hero Section - Full Width
  {
    type: 'hero',
    // title: 'Welcome to Icon Embedded Controls',
    // subtitle: 'With some brilliant products and splendid services, we have carved a niche for ourselves in both domestic as well as international markets. Our range includes Digital Tyre Inflator, Digital Nitrogen Tyre Inflator, Nitrogen Generator, Air Compressor, and many more.',
    img: '/images/highres/7. Extras/logo.png',
    // ctaButtons: [
    //   { text: 'Learn more', link: '/about', variant: 'primary' },
    //   { text: 'View Products', link: '/products', variant: 'outline' }
    // ]
  },
  
  // Product Categories Grid
  {
    type: 'grid-3',
    items: [
      {
        id: 'digital-tyre-inflator',
        title: 'Digital Tyre Inflator',
        subtitle: 'Reliable, durable and accurate electronic digital tyre inflators meeting tyre manufacturer pressure standards. Used by major tyre and vehicle manufacturers in their production line.',
        img: '/images/highres/1. Digital Tyre Inflator/1A.jpg',
        ctaButtons: [
          { text: 'Learn more', link: '/products/digital-tyre-inflator', variant: 'primary' },
          { text: 'Buy', link: '/products/digital-tyre-inflator', variant: 'outline' }
        ]
      },
      {
        id: 'digital-nitrogen-tyre-inflator',
        title: 'Digital Nitrogen Tyre Inflator',
        subtitle: 'Reliable and accurate electronic digital nitrogen tyre inflators. Nitrogen production based on cost-efficient PSA technology with 95-99% purity suitable for vehicle nitrogen inflation.',
        img: '/images/highres/2. Digital Nitrogen Tyre Inflator/2A.jpg',
        ctaButtons: [
          { text: 'Learn more', link: '/products/digital-nitrogen-tyre-inflator', variant: 'primary' },
          { text: 'Buy', link: '/products/digital-nitrogen-tyre-inflator', variant: 'outline' }
        ]
      },
      {
        id: 'air-compressor',
        title: 'Air Compressor',
        subtitle: 'Single and two-stage oil lubricated reciprocating air compressors known for reliability and performance. Preferred choice for fuel stations, automotive garages, and industrial applications.',
        img: '/images/highres/3. Air Compressor/3A.jpg',
        ctaButtons: [
          { text: 'Learn more', link: '/products/air-compressor', variant: 'primary' },
          { text: 'Buy', link: '/products/air-compressor', variant: 'outline' }
        ]
      },
      {
        id: 'panel-board',
        title: 'Panel Boards',
        subtitle: 'PLC Control Panels, Automatic Power Factor Control Panels, and Switch Gear Panels. Complete electrical solutions for automation, power factor correction, and industrial control.',
        img: '/images/highres/5. Panel Board/5A.jpg',
        ctaButtons: [
          { text: 'Learn more', link: '/products/panel-board', variant: 'primary' },
          { text: 'Buy', link: '/products/panel-board', variant: 'outline' }
        ]
      },
      {
        id: 'nitrogen-generator',
        title: 'Nitrogen Generator',
        subtitle: 'Easy to convert ordinary digital tyre inflator to digital nitrogen tyre inflator using this module. Reliable PSA method for nitrogen generation with 95-99% purity suitable for vehicle nitrogen inflation.',
        img: '/images/highres/4. Nitrogen Generator/4A.jpg',
        ctaButtons: [
          { text: 'Learn more', link: '/products/nitrogen-generator', variant: 'primary' },
          { text: 'Buy', link: '/products/nitrogen-generator', variant: 'outline' }
        ]
      },
      {
        id: 'garage-equipment',
        title: 'Garage Equipment',
        subtitle: 'High quality two wheeler ramps, pneumatic grease pumps, and manual oil dispensers. Professional tools and equipment for automotive workshops and garages.',
        img: '/images/highres/6. Garage Equipment/6A.jpg',
        ctaButtons: [
          { text: 'Learn more', link: '/products/garage-equipment', variant: 'primary' },
          { text: 'Buy', link: '/products/garage-equipment', variant: 'outline' }
        ]
      }
    ]
  }
];

export default function Home() {
  const router = useRouter();

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
        return <DynamicGrid 
          key={index} 
          title={block.title}
          subtitle={block.subtitle}
          items={block.items}
          onItemClick={(item) => navigateToProduct(item)}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="pt-16 bg-background">
        {/* Hero Section */}
        {renderBlock(showcaseData[0], 0)}

        {/* Remaining Blocks */}
        {showcaseData.slice(1).map((block, index) => (
          <div key={index + 1} className="mt-0">
            {renderBlock(block, index + 1)}
          </div>
        ))}
        
        {/* Footer */}
        <footer className="bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Products</h3>
                <ul className="space-y-1">
                  <li><Link href="/products/digital-tyre-inflator" className="text-muted hover:text-accent transition-colors">Digital Tyre Inflator</Link></li>
                  <li><Link href="/products/digital-nitrogen-tyre-inflator" className="text-muted hover:text-accent transition-colors">Digital Nitrogen Tyre Inflator</Link></li>
                  <li><Link href="/products/nitrogen-generator" className="text-muted hover:text-accent transition-colors">Nitrogen Generator</Link></li>
                  <li><Link href="/products/air-compressor" className="text-muted hover:text-accent transition-colors">Air Compressor</Link></li>
                  <li><Link href="/products/panel-board" className="text-muted hover:text-accent transition-colors">Panel Boards</Link></li>
                  <li><Link href="/products/garage-equipment" className="text-muted hover:text-accent transition-colors">Garage Equipment</Link></li>
                </ul>
              </div>
              {/* <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-muted hover:text-accent transition-colors">About Us</Link></li>
                  <li><Link href="/products" className="text-muted hover:text-accent transition-colors">Our Products</Link></li>
                  <li><Link href="/contact" className="text-muted hover:text-accent transition-colors">Contact Us</Link></li>
                </ul>
              </div> */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Contact</h3>
                <ul className="space-y-1 text-muted">
                  <li>M/S. ICON EMBEDED CONTROLS</li>
                  <li>374/2, JothiNagar 2nd Street,<br />Ramnujam Nagar Extension,<br />Uppilipalayam Post,<br />Coimbatore - 641015, TamilNadu, India</li>
                  <li className="pt-2">
                    <Link href="/contact" className="text-accent hover:text-accent-hover transition-colors font-medium">View Full Details →</Link>
                  </li>
                </ul>
              </div>
              {/* <div>
                <h3 className="text-lg font-semibold text-primary mb-4">Our Valued Clients</h3>
                <ul className="space-y-3 text-muted text-sm">
                  <li>IOCL, BPCL, HPCL</li>
                  <li>Bridgestone, Michelin, MRF Tyres</li>
                  <li>Caterpillar, Mahindra & Mahindra</li>
                  <li>Apollo Tyres, BKT Tires</li>
                  <li>And many more...</li>
                </ul>
              </div> */}
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-muted text-sm">
              <p>© {new Date().getFullYear()} Icon Embedded Controls. All rights reserved.</p>
              <p className="mt-2">Established 2007 | Coimbatore, TamilNadu, India</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
